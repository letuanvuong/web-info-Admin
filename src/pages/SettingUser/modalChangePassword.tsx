import { DeclineSapIcon, SaveSapIcon } from '@digihcs/icons/lib/sap'
import {
  Button,
  FieldForm as Form,
  Input,
  messageToast,
  Modal,
  Option,
  Select
} from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateUsersOverrideMutation } from 'src/graphql-definition/webinfo-service.generated'

import { parseError } from './utils'

const MODAL_CHANGE_PASSWORD_WIDTH = 450

interface Props {
  user: any
  gridRef: any
  visible: boolean
  hideModal: () => void
  refetchUsers: () => void
}

const ModalChangePassword: React.FC<Props> = ({
  user,
  visible,
  gridRef,
  hideModal,
  refetchUsers
}) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true)

  const [changePassword] = useUpdateUsersOverrideMutation({
    onCompleted: (data) => {
      if (data?.updateUsersOverride) {
        messageToast.success({
          duration: 2,
          message: t('staff.msgChangePassSuccess')
        })
        gridRef.current?.api?.deselectAll()
        refetchUsers()
        hideModal()
      }
    },
    onError: (error) =>
      messageToast.error({
        duration: 2,
        message: t('staff.msgChangePassSuccess'),
        description: parseError(error)
      })
  })

  const { _id } = user

  const getSelectedRows = _id ? [user] : gridRef.current?.api?.getSelectedRows()

  const handleChangePassword = () => {
    form
      .validateFields()
      .then((values: any) => {
        const { idUsers, password } = values
        changePassword({ variables: { idUsers, input: { password } } })
      })
      .catch(() =>
        messageToast.error({
          duration: 2,
          message: t('manageCustomer.modalCreateCustomer.msgAnErrorOccurred'),
          description: t('staff.textInputRequired')
        })
      )
  }

  const footerBtn = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px 12px 0',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        iconName={<SaveSapIcon />}
        disabled={isDisabledButton}
        style={{ marginRight: 10 }}
        onClick={() => handleChangePassword()}
      >
        {t('staff.btnSave')}
      </Button>

      <Button
        iconName={<DeclineSapIcon />}
        onClick={() => hideModal()}
        buttonType={ButtonType.Neutral}
      >
        {t('staff.btnExit')}
      </Button>
    </div>
  )

  return (
    <Modal
      centered
      visible={visible}
      title={t('staff.textChangePassword')}
      width={MODAL_CHANGE_PASSWORD_WIDTH}
      onCancel={() => hideModal()}
      className='modal-change-password'
      footer={getSelectedRows.length > 0 ? footerBtn : null}
    >
      {_id || getSelectedRows.length > 0 ? (
        <div style={{ paddingBottom: 12 }}>
          <Form
            form={form}
            emptyWidth='3%'
            name='change_password_form'
            useColumnLayout={false}
            initialValues={{
              idUsers: getSelectedRows?.map((item: any) => item._id)
            }}
            onFieldsChange={() => {
              setIsDisabledButton(
                !form.isFieldsTouched(['password', 'confirmPassword'], true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
              )
            }}
          >
            <Form.Item label={t('staff.textAccount')} name='idUsers'>
              <Select mode='tags' disabled>
                {getSelectedRows?.map((item: any) => (
                  <Option key={item._id} value={item._id}>
                    {item.username}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='password'
              label={t('staff.textNewPass')}
              rules={[
                {
                  required: true,
                  message: t('staff.textNewPass')
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='confirmPassword'
              label={t('staff.textConfirmPassword')}
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: t('staff.textEnterConfirmPassword')
                },
                ({ getFieldValue }) => ({
                  validator(_, value: any) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error(t('staff.textNotSamePass')))
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </div>
      ) : (
        t('staff.textNotSelectAcc')
      )}
    </Modal>
  )
}

export default ModalChangePassword
