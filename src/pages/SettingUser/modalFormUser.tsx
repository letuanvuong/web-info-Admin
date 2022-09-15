import {
  LockHisIcon,
  ResetPasswordHisIcon,
  UnlockHisIcon
} from '@digihcs/icons/lib/his'
import {
  DeclineSapIcon,
  EditSapIcon,
  SaveSapIcon
} from '@digihcs/icons/lib/sap'
import {
  Button,
  Col,
  FieldForm as Form,
  Input,
  messageToast,
  Modal,
  Row
} from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useCreateUserTypeAdminMutation,
  useUpdateUserMutation,
  useUpdateUsersOverrideMutation
} from 'src/graphql-definition/webinfo-service.generated'

import { parseError } from './utils'

const DEFAULT_WIDTH = 500

interface Props {
  user: any
  visible: boolean
  hideModal: () => void
  refetchUsers: () => void
  openModalChangePassword: (visible: boolean) => void
}

const ModalFormUser: React.FC<Props> = ({
  user,
  visible,
  hideModal,
  refetchUsers,
  openModalChangePassword
}) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true)
  const [isHideModal, setIsHideModal] = useState<boolean>(false)
  const [createUser] = useCreateUserTypeAdminMutation({
    onCompleted: (data) => {
      if (data?.createUserTypeAdmin) {
        if (isHideModal) {
          hideModal()
          resetFields()
          messageToast.success({
            duration: 2,
            message: t(
              'manageCustomer.modalCreateCustomer.textCreateAccountSuccess'
            )
          })
          refetchUsers()
        } else {
          resetFields()
          messageToast.success({
            duration: 2,
            message: t(
              'manageCustomer.modalCreateCustomer.textCreateAccountSuccess'
            )
          })
          refetchUsers()
        }
      }
    },
    onError: (error) => {
      messageToast.error({
        duration: 2,
        message: t(
          'manageCustomer.modalCreateCustomer.textCreateAccountFailed'
        ),
        description: parseError(error)
      })
    }
  })

  const [updateUser] = useUpdateUserMutation({
    onCompleted: (data) => {
      if (data?.updateUser) {
        hideModal()
        resetFields()
        messageToast.success({
          duration: 2,
          message: t('staff.msgUpdateSuccess')
        })
        refetchUsers()
      }
    },
    onError: (error) =>
      messageToast.error({
        duration: 2,
        message: t('staff.msgUpdateFailed'),
        description: parseError(error)
      })
  })

  const [lockUsers] = useUpdateUsersOverrideMutation({
    onCompleted: (data) => {
      if (data?.updateUsersOverride) {
        messageToast.success({
          duration: 2,
          message: isLocked
            ? t('staff.msgUnLockSuccess')
            : t('staff.msgLockSuccess')
        })
        refetchUsers()
        hideModal()
      }
    },
    onError: (error) =>
      messageToast.error({
        duration: 2,
        description: parseError(error),
        message: isLocked
          ? t('staff.msgUnLockFailed')
          : t('staff.msgLockFailed')
      })
  })

  const { resetFields } = form

  const { _id, username, isLocked, email, phoneNumber, note } = user

  const handleOk = () => {
    form
      .validateFields()
      .then((values: any) => {
        if (_id) {
          handleUpdate(_id, values)
          return
        }
        handleCreate(values)
      })
      .catch(() => {
        messageToast.error({
          duration: 2,
          message: t('manageCustomer.modalCreateCustomer.msgAnErrorOccurred'),
          description: t('staff.textInputRequired')
        })
      })
  }

  const handleCreate = (values: any) =>
    createUser({ variables: { input: { ...values, displayName: '' } } })

  const handleUpdate = (idUser: string, values: any) =>
    updateUser({ variables: { idUser, input: { ...values } } })

  const handleLockUsers = (idUsers: string[]) =>
    lockUsers({
      variables: { idUsers, input: { isLocked: !isLocked } }
    })

  const groupBtnEdit = _id ? (
    <>
      <Button
        style={{ marginRight: 10 }}
        onClick={() => handleLockUsers([_id])}
        iconName={isLocked ? <UnlockHisIcon /> : <LockHisIcon />}
      >
        {isLocked ? t('staff.textOpen') : t('staff.textLock')}
      </Button>

      <Button
        disabled={isLocked}
        style={{ marginRight: 10 }}
        iconName={<ResetPasswordHisIcon />}
        onClick={() => openModalChangePassword(true)}
      >
        {t('staff.textChangePassword')}
      </Button>
    </>
  ) : (
    <></>
  )

  const footerBtn = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px 10px 0',
        justifyContent: 'flex-end'
      }}
    >
      {groupBtnEdit}

      {_id ? (
        <Button
          disabled={isLocked || isEdit}
          iconName={<EditSapIcon />}
          style={{ marginRight: 10 }}
          onClick={() => {
            setIsEdit(true)
            setIsDisabledButton(false)
          }}
        >
          {t('manageCustomer.modalCreateCustomer.btnEdit')}
        </Button>
      ) : (
        <Button
          disabled={isDisabledButton || isLocked}
          onClick={() => {
            handleOk()
            setIsHideModal(() => isHideModal === true)
          }}
          iconName={<SaveSapIcon />}
          style={{ marginRight: 10 }}
        >
          {t('manageCustomer.modalCreateCustomer.btnSaveAdd')}
        </Button>
      )}

      <Button
        iconName={<SaveSapIcon />}
        style={{ marginRight: 10 }}
        disabled={
          isEdit
            ? (!!_id && !isEdit) || isDisabledButton || isLocked
            : isDisabledButton || isLocked
        }
        onClick={() => {
          handleOk()
          setIsHideModal(() => isHideModal === false)
        }}
      >
        {t('manageCustomer.modalCreateCustomer.btnSave')}
      </Button>

      <Button
        onClick={() => {
          hideModal()
          resetFields()
        }}
        iconName={<DeclineSapIcon />}
        buttonType={ButtonType.Neutral}
      >
        {t('manageCustomer.modalCreateCustomer.btnExit')}
      </Button>
    </div>
  )

  return (
    <Modal
      centered
      onCancel={() => {
        hideModal()
        resetFields()
      }}
      visible={visible}
      footer={footerBtn}
      width={DEFAULT_WIDTH}
      className='modal-form-user'
      title={
        _id ? username : t('manageCustomer.modalCreateCustomer.textNewAccount')
      }
    >
      <div style={{ padding: 10 }}>
        <Form
          form={form}
          emptyWidth='2%'
          name='user_form'
          useColumnLayout={false}
          className='global-form'
          initialValues={{
            note: _id ? note : '',
            email: _id ? email : '',
            username: _id ? username : '',
            phoneNumber: _id ? phoneNumber : '',
            password: _id ? null : '12345678'
          }}
          onFieldsChange={() => {
            setIsDisabledButton(
              (!isEdit && !form.isFieldsTouched(['username'], true)) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
            )
          }}
        >
          <Row>
            <Col span='XL12 L12 M12 S12'>
              <Form.Item
                name='username'
                label={t('manageCustomer.modalCreateCustomer.textAccount')}
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
                  placeholder={t('staff.holderAccount')}
                  disabled={_id}
                  readOnly={_id && !isEdit}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            {!_id && (
              <Col span='XL12 L12 M12 S12'>
                <Form.Item
                  name='password'
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
                  <Input.Password autoComplete='new-password' />
                </Form.Item>
              </Col>
            )}
          </Row>
          <Row>
            <Col span='XL12 L12 M12 S12'>
              <Form.Item
                label='Email'
                name='email'
                warningPlacement='top'
                rules={[
                  {
                    pattern: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi,
                    message: 'Invalid email'
                  }
                ]}
              >
                <Input
                  placeholder={t('staff.holderEmailUser')}
                  type='email'
                  readOnly={_id && !isEdit}
                />
              </Form.Item>
            </Col>

            <Col span='XL12 L12 M12 S12'>
              <Form.Item label={t('staff.gridPhone')} name='phoneNumber'>
                <Input
                  placeholder={t('staff.holderPhoneUser')}
                  readOnly={_id && !isEdit}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span='XL12 L12 M12 S12'>
              <Form.Item
                label={t('manageCustomer.modalCreateCustomer.textNote')}
                name='note'
              >
                <Input readOnly={_id && !isEdit} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  )
}

export default ModalFormUser
