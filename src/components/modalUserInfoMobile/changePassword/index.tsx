import { DeclineSapIcon, SaveSapIcon } from '@digihcs/icons/lib/sap'
import {
  Button,
  FieldForm as Form,
  Input,
  messageToast
} from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { FormLabelAlign } from '@digihcs/util/lib/enums/FormLabelAlign'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { useCallback, useContext, useRef } from 'react'
import { AuthContext } from 'src/context'
import { CONTEXT_AUTH } from 'src/graphql-definition'
import {
  InputChangePassword,
  useChangePasswordMutation
} from 'src/graphql-definition/auth-service.generated'
import { checkDevices, checkDoubleClick, parseError } from 'src/utils/function'

import './index.less'

interface Props {
  closeModal: () => void
}

interface ITempFieldForm {
  confirmPassword?: string
}

const ChangePassword: React.FC<Props> = ({ closeModal }) => {
  const { authState } = useContext(AuthContext)
  const checkDoubleClickRef = useRef(null)
  const [changePasswordForm] = Form.useForm()

  const [changePassword] = useChangePasswordMutation({
    context: CONTEXT_AUTH,
    fetchPolicy: 'no-cache'
  })

  const { currentUser } = authState

  const saveForm = () => {
    changePasswordForm
      .validateFields()
      .then((values: InputChangePassword & ITempFieldForm) => {
        if (values.confirmPassword) delete values.confirmPassword
        handleChangePassword(values)
      })
      .catch((errorInfo) => {
        messageToast.error({
          message: parseError(errorInfo),
          description: 'Vui lòng điền đầy đủ thông tin'
        })
      })
  }

  const handleChangePassword = (values: InputChangePassword) => {
    const idUser = currentUser._id || ''
    changePassword({ variables: { idUser, input: { ...values } } })
      .then(() => {
        changePasswordForm.resetFields()
        closeModal()
        messageToast.success({ duration: 2, message: 'Cập nhật thành công' })
      })
      .catch((error) => {
        let formatError = parseError(error)
        // NOTE: sửa info error thành tiếng việt bên backend auth
        if (formatError === 'Your current password is missing or incorrect.')
          formatError = 'Mật khẩu hiện tại không đúng'

        if (
          formatError ===
          'Your new password must be different from your previous password.'
        )
          formatError = 'Mật khẩu mới của bạn phải khác với mật khẩu trước đó'

        messageToast.error({ duration: 2, message: formatError })
      })
  }

  const handleCancel = useCallback(() => {
    changePasswordForm.resetFields()
    closeModal()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changePasswordForm])

  return (
    <form className='form-change-password'>
      <Form
        useColumnLayout={false}
        form={changePasswordForm}
        layout={FormLayout.Vertical}
        labelAlign={FormLabelAlign.Left}
      >
        <div>
          <Form.Item
            controlWidth='100%'
            name='currentPassword'
            label='Mật khẩu hiện tại'
            rules={[
              { required: true, message: 'Mật khẩu hiện tại không được trống' }
            ]}
          >
            <Input.Password placeholder='nhập mật khẩu hiện tại' />
          </Form.Item>
        </div>

        <div style={{ paddingTop: checkDevices() !== 'web' ? 20 : 60 }}>
          <Form.Item
            name='newPassword'
            controlWidth='100%'
            label='Mật khẩu mới'
            rules={[
              { required: true, message: 'Mật khẩu mới không được trống' }
            ]}
          >
            <Input.Password placeholder='nhập mật khẩu mới' />
          </Form.Item>
        </div>

        <div style={{ paddingTop: checkDevices() !== 'web' ? 20 : 60 }}>
          <Form.Item
            controlWidth='100%'
            name='confirmPassword'
            label='Xác nhận mật khẩu mới'
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Xác nhận mật khẩu không được trống' },
              ({ getFieldValue }) => ({
                validator(_, value: any) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('Mật khẩu đã nhập không trùng khớp')
                  )
                }
              })
            ]}
          >
            <Input.Password placeholder='nhập lại mật khẩu mới' />
          </Form.Item>
        </div>
      </Form>
      <div style={{ flex: 1 }} />
      <div className='group-btn'>
        <div className='wrapper-btn'>
          <Button
            onClick={handleCancel}
            className='cancel-btn'
            iconName={<DeclineSapIcon />}
            buttonType={ButtonType.Negative}
            type='button'
          >
            Hủy
          </Button>
        </div>

        <div className='wrapper-btn'>
          <Button
            iconName={<SaveSapIcon />}
            onClick={() => checkDoubleClick(checkDoubleClickRef, saveForm)}
            type='button'
          >
            Lưu
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ChangePassword
