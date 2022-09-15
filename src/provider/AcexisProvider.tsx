import { Provider as ChartProvider } from '@digihcs/chart'
import { Provider as GridProvider } from '@digihcs/grid2'
import {
  Button,
  Checkbox,
  Label,
  Popover,
  Provider as UIProvider,
  Radio,
  Text,
  Title,
  Toolbar,
  Tooltip
} from '@digihcs/innos-ui3'
import en_US from '@digihcs/util/lib/locale/lang/en_US'
import enData from '@digihcs/util/lib/locale/lang/format/en'
import viData from '@digihcs/util/lib/locale/lang/format/vi'
import vi_VN from '@digihcs/util/lib/locale/lang/vi_VN'
import { UtilProvider } from '@digihcs/util/lib/provider'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const AcexisProvider: FC = ({ children }) => {
  const { i18n } = useTranslation()
  return (
  <UtilProvider locale={ i18n.language === 'vi' ? { ...vi_VN, data: viData } : {...en_US, data: enData}}>
    <UIProvider>
      <ChartProvider
        ToolbarComponent={Toolbar}
        LabelComponent={Label}
        PopoverComponent={Popover}
        ButtonComponent={Button}
        CheckboxComponent={Checkbox}
        TitleComponent={Title}
        RadioComponent={Radio}
      >
        <GridProvider
          ButtonComponent={Button}
          ToolbarComponent={Toolbar}
          TextComponent={Text}
          TooltipComponent={Tooltip}
        >
          {children}
        </GridProvider>
      </ChartProvider>
    </UIProvider>
  </UtilProvider>
)
}

export default AcexisProvider
