import DeclineSapIcon from '@digihcs/icons/lib/sap/DeclineSapIcon'
import SaveSapIcon from '@digihcs/icons/lib/sap/SaveSapIcon'
import {
  Button,
  FieldForm as Form,
  Footer,
  Input,
  messageToast,
  Modal
} from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { FormLabelAlign } from '@digihcs/util/lib/enums/FormLabelAlign'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  UsersWithPaginateQuery,
  useUpdateUserOverrideMutation
} from 'src/graphql-definition/webinfo-service.generated'

type Customer = UsersWithPaginateQuery['usersWithPaginate']['users'][number]

type FormContent = {
  newPassword: string
  confirmNewPassword: string
}

export type ModalChangePassCustomerRef = {
  openModalCustomer: (data: Customer) => void
}

const ModalChangePassCustomer = forwardRef<ModalChangePassCustomerRef, {}>(
  (props, ref) => {
    const { t } = useTranslation()
    const [currentCustomer, setCurrentCustomer] = useState<Customer>()

    const [visible, setVisible] = useState<boolean>(false)
    const [form] = Form.useForm<FormContent>()
    const { resetFields } = form

    useImperativeHandle(ref, () => ({
      openModalCustomer
    }))

    const [mutateUpdateOverrideUser] = useUpdateUserOverrideMutation({
      onError: (error) => {
        // eslint-disable-next-line no-console
        console.log('update password error', error)
      }
    })

    const closeModal = () => {
      resetFields()
      setCurrentCustomer(undefined)
      setVisible(false)
    }

    const openModalCustomer = (data: Customer) => {
      setCurrentCustomer(data)
      setVisible(true)
    }

    const mutateChangePassword = async (
      idUser: string,
      newPassword: string,
      confirmNewPassword: string
    ) => {
      const { data } = await mutateUpdateOverrideUser({
        variables: {
          idUser,
          input: { newPassword, confirmNewPassword }
        }
      })
      if (data?.updateUserOverride?._id) {
        messageToast.success({
          message: t('C???p nh???t m???t kh???u th??nh c??ng')
        })
      }
    }

    const onSubmitHandle = async () => {
      const formContent = await form.validateFields().catch((reason) => {
        // eslint-disable-next-line no-console
        console.error('form error', reason)
      })
      if (formContent) {
        mutateChangePassword(
          currentCustomer._id,
          formContent.newPassword,
          formContent.confirmNewPassword
        )
      }
    }

    return (
      <Modal
        centered
        width={341}
        footer={
          <Footer visible>
            <Button
              buttonType={ButtonType.Default}
              size='large'
              iconName={<SaveSapIcon />}
              onClick={() => onSubmitHandle()}
              style={{ marginRight: '16px' }}
            >
              {t('manageCustomer.btnSave')}
            </Button>
            <Button
              buttonType={ButtonType.Neutral}
              size='large'
              iconName={<DeclineSapIcon />}
              onClick={() => closeModal()}
            >
              {t('manageCustomer.btnExit')}
            </Button>
          </Footer>
        }
        visible={visible}
        onCancel={closeModal}
        title={t('?????i m???t kh???u')}
      >
        <div className='modal-change-customer-password-content'>
          <Form
            form={form}
            layout={FormLayout.Vertical}
            labelAlign={FormLabelAlign.Left}
            className='form-change-customer-password-content'
          >
            <Form.Item
              className='form-item'
              name='newPassword'
              label={t('Nh???p m???t kh???u m???i')}
              rules={[
                {
                  required: true,
                  message: t('M???t kh???u kh??ng ???????c ????? tr???ng')
                }
              ]}
            >
              <Input placeholder={t('nh???p m???t kh???u m???i')} />
            </Form.Item>

            <Form.Item
              className='form-item'
              name='confirmNewPassword'
              label={t('Nh???p l???i m???t kh???u m???i')}
              rules={[
                {
                  required: true,
                  message: t('Vui l??ng nh???p l???i m???t kh???u')
                },
                // custom validator check confirm match password
                ({ getFieldValue }) => ({
                  validator(_, value: string = '') {
                    if (getFieldValue('newPassword') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(t('M???t kh???u kh??ng tr??ng kh???p'))
                    )
                  }
                })
              ]}
            >
              <Input placeholder={t('nh???p l???i m???t kh???u m???i')} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    )
  }
)

export default ModalChangePassCustomer
