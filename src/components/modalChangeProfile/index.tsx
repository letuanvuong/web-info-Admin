import { AcceptSapIcon, DeclineSapIcon } from '@digihcs/icons/lib/sap'
import { Button, Option, Select } from '@digihcs/innos-ui3'
import Modal from '@digihcs/innos-ui3/lib/modal/Modal'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { useCallback, useContext, useState } from 'react'
import { LocalStorageItemKeys } from 'src/constant'
import { AuthContext } from 'src/context'

interface Props {
  profiles: any
  visible: boolean
  hideModal: () => void
}

const ModalChangeProfile: React.FC<Props> = ({
  profiles,
  visible,
  hideModal
}) => {
  const [idProfile, setIdProfile] = useState<string>()
  const { authState } = useContext(AuthContext)
  const currentIdProfile = localStorage.getItem(
    LocalStorageItemKeys.CURRENT_PROFILE
  )

  const changeProfile = useCallback((idProfile: string) => {
    setIdProfile(idProfile)
  }, [])

  const saveProfile = useCallback(() => {
    const oldIdProfile = localStorage.getItem(
      LocalStorageItemKeys.CURRENT_PROFILE
    )
    const newIdProfile = profiles?.find(
      (item: { idProfile: string }) => item.idProfile === idProfile
    )?.idProfile
    if (newIdProfile !== oldIdProfile) {
      localStorage.setItem(LocalStorageItemKeys.CURRENT_PROFILE, newIdProfile)
      authState.queryMyInfo()
    }
    hideModal()
  }, [profiles, hideModal, idProfile, authState])

  const footerBtn = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px 10px 0',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        iconName={<AcceptSapIcon />}
        style={{ marginRight: 10 }}
        onClick={() => saveProfile()}
      >
        Xác nhận
      </Button>
      <Button
        iconName={<DeclineSapIcon />}
        style={{ marginRight: 10 }}
        onClick={() => hideModal()}
        buttonType={ButtonType.Neutral}
      >
        Thoát
      </Button>
    </div>
  )

  return (
    <Modal
      centered
      width={460}
      visible={visible}
      footer={footerBtn}
      onCancel={hideModal}
      title='Chuyển đổi hồ sơ'
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingBottom: '.5rem'
        }}
      >
        <span style={{ fontSize: 12, width: '20%' }}>Chọn hồ sơ</span>
        <Select
          onChange={changeProfile}
          placeholder='Chọn hồ sơ'
          defaultValue={currentIdProfile}
        >
          {profiles?.map((item: any) => (
            <Option key={item.profile?._id} value={item.profile?._id}>
              {item.profile?.name}
            </Option>
          ))}
        </Select>
      </div>
    </Modal>
  )
}

export default ModalChangeProfile
