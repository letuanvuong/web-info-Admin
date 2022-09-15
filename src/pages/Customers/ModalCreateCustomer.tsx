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
import i18n from 'src/config/i18n'
import {
  NewUserInfo,
  useCreateUserMutation
} from 'src/graphql-definition/webinfo-service.generated'

type FormContent = {
  username: string
  displayName: string
  email: string
  password: string
}

export type ModalCreateCustomerRef = {
  openModalCreateCustomer: () => void
}

interface ModalCreateCustomerProps {
  callbackFunc?: () => void
}

const ModalCreateCustomer = forwardRef<
  ModalCreateCustomerRef,
  ModalCreateCustomerProps
>(({ callbackFunc }, ref) => {
  const { t } = useTranslation()

  const [visible, setVisible] = useState<boolean>(false)
  const [form] = Form.useForm<FormContent>()
  const { resetFields, validateFields } = form

  useImperativeHandle(ref, () => ({ openModalCreateCustomer }))

  const [createUserMutate] = useCreateUserMutation({
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data?.createUser?._id) {
        messageToast.success({
          message: t(
            'manageCustomer.modalCreateCustomer.textCreateAccountSuccess'
          )
        })
        closeModal()
        callbackFunc?.()
      }
    },
    onError: (error) => {
      messageToast.error({
        message: t(
          'manageCustomer.modalCreateCustomer.textCreateAccountFailed'
        ),
        description: error.message || ''
      })
    }
  })

  const closeModal = () => {
    resetFields()
    setVisible(false)
  }

  const openModalCreateCustomer = () => setVisible(true)

  const onSubmit = () => {
    validateFields()
      .then((values) => {
        values.username = values.email
        handleCreateUser(values)
      })
      .catch((err) => {
        messageToast.error({
          message: t('manageCustomer.modalCreateCustomer.msgAnErrorOccurred')
        })
      })
  }

  const handleCreateUser = (input: NewUserInfo) =>
    createUserMutate({ variables: { input, language: i18n.language } })

  return (
    <Modal
      centered
      width={508}
      visible={visible}
      onCancel={closeModal}
      title={t('manageCustomer.modalCreateCustomer.textNewAccount')}
      footer={
        <Footer visible>
          <Button
            size='large'
            iconName={<SaveSapIcon />}
            style={{ marginRight: '16px' }}
            buttonType={ButtonType.Default}
            onClick={() => onSubmit()}
          >
            {t('manageCustomer.modalCreateCustomer.btnSave')}
          </Button>

          <Button
            size='large'
            onClick={() => closeModal()}
            iconName={<DeclineSapIcon />}
            buttonType={ButtonType.Neutral}
          >
            {t('manageCustomer.modalCreateCustomer.btnExit')}
          </Button>
        </Footer>
      }
    >
      <div className='modal-create-customer'>
        <Form
          form={form}
          layout={FormLayout.Vertical}
          labelAlign={FormLabelAlign.Left}
          className='form-create-customer'
        >
          <Form.Item
            name='displayName'
            className='form-item'
            label={t('manageCustomer.modalCreateCustomer.textNewFullName')}
            rules={[
              {
                required: true,
                message: t(
                  'manageCustomer.modalCreateCustomer.msgUsernameCannotBeBlank'
                )
              }
            ]}
          >
            <Input
              placeholder={t(
                'manageCustomer.modalCreateCustomer.textEnterNewAccount'
              )}
            />
          </Form.Item>

          <Form.Item
            name='email'
            className='form-item'
            label={t('Email')}
            rules={[
              {
                required: true,
                message: t(
                  'manageCustomer.modalCreateCustomer.msgEmailCannotBeBlank'
                )
              },
              {
                type: 'email',
                message: t(
                  'manageCustomer.modalCreateCustomer.msgEmailInvalidate'
                )
              }
            ]}
          >
            <Input
              placeholder={t(
                'manageCustomer.modalCreateCustomer.textEnterNewEmail'
              )}
            />
          </Form.Item>

          <Form.Item
            name='password'
            className='form-item'
            label={t('manageCustomer.modalCreateCustomer.textPassword')}
            rules={[
              {
                required: true,
                message: t(
                  'manageCustomer.modalCreateCustomer.msgPasswordCannotBeBlank'
                )
              }
            ]}
          >
            <Input.Password
              placeholder={t(
                'manageCustomer.modalCreateCustomer.textEnterNewPassword'
              )}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
})

export default ModalCreateCustomer
