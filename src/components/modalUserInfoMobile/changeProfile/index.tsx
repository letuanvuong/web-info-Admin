/* eslint-disable react-hooks/exhaustive-deps */
import { DeclineSapIcon, SaveSapIcon } from '@digihcs/icons/lib/sap'
import {
  Button,
  FieldForm as Form,
  messageToast,
  Option,
  Select
} from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { FormLabelAlign } from '@digihcs/util/lib/enums/FormLabelAlign'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useRef } from 'react'
import { LocalStorageItemKeys } from 'src/constant'
import { AppConfigContext, AuthContext } from 'src/context'
import { CONTEXT_AUTH } from 'src/graphql-definition'
import { useMyInfoLazyQuery } from 'src/graphql-definition/auth-service.generated'
import { checkDoubleClick, filterOptsDefault, parseError } from 'src/utils/function'

export type TRefs = {
  handleOpen: () => void
}

interface Props {
  closeModal: () => void
}

const ChangeProfile = forwardRef<TRefs, Props>(({ closeModal }, ref) => {
  const { authState, dispatchAuthAction } = useContext(AuthContext)
  const { dispatchAppConfigAction } = useContext(AppConfigContext)

  const [formChangeProfile] = Form.useForm()
  const checkDoubleClickRef = useRef(null)

  const [queryMyInfo, { data, error }] = useMyInfoLazyQuery({
    context: CONTEXT_AUTH,
    fetchPolicy: 'no-cache'
  })

  // handle data
  useEffect(() => {
    if (data) {
      const profiles = data?.myInfo?.profiles || []
      const permissions = data?.myInfo?.permissions || []
      let profile: any = {}
      if (data?.myInfo?.currentProfile) {
        const tmp = JSON.parse(JSON.stringify(data?.myInfo?.currentProfile))
        tmp.permissionByNodes = tmp.permissionByNodes?.reduce(
          (accumulator: any, currentValue: any) => {
            accumulator[currentValue.idNode] = currentValue
            return accumulator
          },
          {}
        )
        profile = tmp
      }

      const idCurrentNode = window.localStorage.getItem(
        LocalStorageItemKeys.CURRENT_NODE
      )

      if (idCurrentNode) {
        const [currentNode] = profile.nodes
          ? profile.nodes?.filter((node: any) => node._id === idCurrentNode)
          : []
        if (currentNode) {
          dispatchAppConfigAction({
            type: 'CHANGE_CURRENT_NODE',
            payload: {
              currentNode
            }
          })
        } else {
          window.localStorage.setItem(
            LocalStorageItemKeys.CURRENT_NODE,
            profile.nodes?.[0]?._id
          )
          dispatchAppConfigAction({
            type: 'CHANGE_CURRENT_NODE',
            payload: {
              currentNode: profile.nodes?.[0] || {}
            }
          })
        }
      } else {
        window.localStorage.setItem(
          LocalStorageItemKeys.CURRENT_NODE,
          profile.nodes?.[0]?._id
        )
        dispatchAppConfigAction({
          type: 'CHANGE_CURRENT_NODE',
          payload: {
            currentNode: profile.nodes?.[0] || {}
          }
        })
      }
      window.localStorage.setItem(
        LocalStorageItemKeys.CURRENT_PROFILE,
        profile._id
      )
      dispatchAuthAction({
        type: 'CHANGE_CURRENT_PROFILE',
        payload: {
          currentProfile: profile
        }
      })
      dispatchAuthAction({
        type: 'CHANGE_CURRENT_USER',
        payload: {
          currentUser: {
            _id: data?.myInfo?._id,
            username: data?.myInfo?.username,
            isOnline: data?.myInfo?.isOnline,
            isLocked: data?.myInfo?.isLocked,
            employee: data?.myInfo?.employee || {}
          }
        }
      })
      dispatchAuthAction({
        type: 'CHANGE_CURRENT_PROFILES',
        payload: {
          currentProfiles: profiles
        }
      })
      dispatchAuthAction({
        type: 'CHANGE_CURRENT_PERMISSIONS',
        payload: {
          currentPermissions: permissions
        }
      })
      formChangeProfile.resetFields()
    }
  }, [data])

  // handle error
  useEffect(() => {
    if (error) {
      messageToast.error({
        message: parseError(error),
        description: 'Có lỗi xảy ra'
      })
    }
  }, [error])

  const saveForm = () => {
    formChangeProfile.validateFields().then((values) => {
      if (!values.idProfile) {
        messageToast.error({ message: 'Vui lòng chọn hồ sơ' })
        return
      }
      window.localStorage.setItem(
        LocalStorageItemKeys.CURRENT_PROFILE,
        values.idProfile
      )
      closeModal()
      messageToast.success({ duration: 2, message: 'Cập nhật thành công' })
      queryMyInfo()
    })
    // .catch((errorInfo) => {
    //   messageToast.error({
    //     message: parseError(errorInfo),
    //     description: 'Vui lòng điền đầy đủ thông tin'
    //   })
    // })
  }

  const handleCancel = useCallback(() => {
    formChangeProfile.resetFields()
    closeModal()
  }, [formChangeProfile])

  const handleOpen = () => {
    formChangeProfile.setFieldsValue({
      idProfile: window.localStorage.getItem(LocalStorageItemKeys.CURRENT_PROFILE)
    })
  }

  useImperativeHandle(ref, () => ({
    handleOpen
  }))

  return (
    <div className='form-change-profile'>
      <Form
        useColumnLayout={false}
        form={formChangeProfile}
        layout={FormLayout.Vertical}
        labelAlign={FormLabelAlign.Left}
      >
        <Form.Item
          label='Hồ sơ'
          name='idProfile'
          controlWidth='100%'
          // rules={[{ required: true, message: 'Hồ sơ không được để trống' }]}
        >
          <Select
            showSearch
            optionLabelProp='label'
            filterOption={filterOptsDefault}
          >
            {authState?.currentProfiles?.map((item: any) => (
              <Option
                key={item.profile?._id}
                value={item.profile?._id}
                label={item.profile?.name}
              >
                <div>{item.profile?.name}</div>
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <div style={{ flex: 1 }} />
      <div className='group-btn'>
        <div className='wrapper-btn'>
          <Button
            onClick={handleCancel}
            className='cancel-btn'
            iconName={<DeclineSapIcon />}
            buttonType={ButtonType.Negative}
          >
            Hủy
          </Button>
        </div>

        <div className='wrapper-btn'>
          <Button
            iconName={<SaveSapIcon />}
            onClick={() => checkDoubleClick(checkDoubleClickRef, saveForm)}
          >
            Lưu
          </Button>
        </div>
      </div>
    </div>
  )
})

export default ChangeProfile
