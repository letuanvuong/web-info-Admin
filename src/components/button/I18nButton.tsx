import { GlobeSapIcon } from '@digihcs/icons/lib/sap'
import { Button, Menu, NavigationList } from '@digihcs/innos-ui3'
import { NavigationListEventParam } from '@digihcs/innos-ui3/lib/navigation-list/interface'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { AppConfigContext, Language } from '../../context'

const { Item } = NavigationList

const languages = {
  vi: 'Tiếng Việt',
  en: 'English',
  zh: '中 文'
}

const I18nButton = () => {
  const { i18n } = useTranslation()
  const { dispatchAppConfigAction } = useContext(AppConfigContext)
  const handleLanguageChange = (e: NavigationListEventParam) => {
    dispatchAppConfigAction({
      type: 'CHANGE_LANGUAGE_PREFERENCE',
      payload: { language: e.key }
    })
    i18n.changeLanguage(e.key)
  }
  const menu = (
    <NavigationList onClick={handleLanguageChange}>
      {Object.keys(languages).map((key: Language) => (
        <Item key={key}>{languages[key]}</Item>
      ))}
    </NavigationList>
  )
  return (
    <Menu overlay={menu}>
      <Button iconName={<GlobeSapIcon />} />
    </Menu>
  )
}

export default I18nButton
