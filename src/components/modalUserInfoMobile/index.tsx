import { IconTabBar, Modal } from '@digihcs/innos-ui3'
import { forwardRef, useCallback, useImperativeHandle, useReducer, useRef } from 'react'
import { reducer } from 'src/utils/function'

import ChangePassword from './changePassword'
import ChangeProfile, { TRefs } from './changeProfile'
import { TAB_INFO_USER } from './interface'

import './style.less'

interface Props {}
interface Ref {}

const ModalUserInfoMobile = forwardRef<Ref, Props>((_, ref) => {
  const modalChangeProfileRef = useRef<TRefs>()
  const [state, setState] = useReducer(reducer, {
    visible: false,
    currentTab: TAB_INFO_USER.DOI_MAT_KHAU
  })
  const { visible, currentTab } = state

  useImperativeHandle(ref, () => ({ handleOpen }))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOpen = useCallback(() => setState({ visible: true }), [visible])
  const closeModal = useCallback(() => {
    setState({ visible: false, currentTab: TAB_INFO_USER.DOI_MAT_KHAU })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const handleChangeTab = useCallback(
    (currentTab: string) => {
      setState({ currentTab })
      if (currentTab === TAB_INFO_USER.THIET_LAP_HO_SO) {
        setTimeout(() => {
          modalChangeProfileRef?.current?.handleOpen()
        }, 100)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentTab]
  )

  return (
    <Modal
      centered
      width='90%'
      footer={null}
      visible={visible}
      maskClosable={false}
      onCancel={closeModal}
      title='Thông tin cá nhân'
      className='m-modal-user-info'
      style={{ height: 450 }}
    >
      <IconTabBar
        activeKey={currentTab}
        onTabClick={handleChangeTab}
        defaultActiveKey={currentTab}
      >
        <IconTabBar.Filter key={TAB_INFO_USER.DOI_MAT_KHAU} text='Đổi mật khẩu'>
          <IconTabBar.Content>
            <ChangePassword closeModal={closeModal} />
          </IconTabBar.Content>
        </IconTabBar.Filter>

        <IconTabBar.Filter
          text='Thiết lập hồ sơ'
          key={TAB_INFO_USER.THIET_LAP_HO_SO}
        >
          <IconTabBar.Content>
            <ChangeProfile ref={modalChangeProfileRef} closeModal={closeModal} />
          </IconTabBar.Content>
        </IconTabBar.Filter>
      </IconTabBar>
    </Modal>
  )
})

export default ModalUserInfoMobile
