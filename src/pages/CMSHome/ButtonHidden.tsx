import { Switch } from '@digihcs/innos-ui3'
import { SwitchChangeEventHandler } from '@digihcs/innos-ui3/lib/switch/interface'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface ButtonHiddenProps {
  isCheck: boolean
  handleSwitch: SwitchChangeEventHandler
  textOnOff: string
}

const ButtonHidden = memo(
  ({ isCheck, handleSwitch, textOnOff }: ButtonHiddenProps) => {
    const { t } = useTranslation()
    return (
      <div style={{ backgroundColor: '#FFF' }}>
        <div style={{ display: 'flex', columnGap: 10 }}>
          <Switch checked={isCheck} onChange={handleSwitch} />
          <h3 style={{ fontSize: 18, fontWeight: 400 }}>
            {t(`manageHome.textOnOffSub${textOnOff}`)}
          </h3>
        </div>
      </div>
    )
  }
)

export default ButtonHidden
