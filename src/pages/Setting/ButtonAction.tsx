import { DeclineSapIcon, SaveSapIcon } from '@digihcs/icons'
import { Button } from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface ButtonActionProps {
  onCancel: Function
  onSubmit: Function
}

const ButtonAction = memo(({ onCancel, onSubmit }: ButtonActionProps) => {
  const { t } = useTranslation()
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'white'
      }}
    >
      <Button
        iconName={<DeclineSapIcon />}
        buttonType={ButtonType.Negative}
        style={{ marginRight: 10, minWidth: 70 }}
        onClick={() => onCancel()}
      >
        {t('manageAboutUs.btnCancel')}
      </Button>

      <Button
        style={{ minWidth: 70 }}
        onClick={() => onSubmit()}
        iconName={<SaveSapIcon />}
      >
        {t('manageAboutUs.btnSave')}
      </Button>
    </div>
  )
})

export default ButtonAction
