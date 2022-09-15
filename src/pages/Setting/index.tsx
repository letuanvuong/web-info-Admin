import { IconTabBar } from '@digihcs/innos-ui3'
import React, { forwardRef, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from 'src/config/i18n'
import {
  EnumLanguage,
  useGetContentMenuQuery
} from 'src/graphql-definition/webinfo-service.generated'

import FormContact from './formContact'
import {
  EnumGeneralInfomation,
  ITabStateGeneral,
  SettingProps,
  SettingRef
} from './interface'

import './index.less'

const Setting = React.memo(
  forwardRef<SettingRef, SettingProps>(() => {
    const { t } = useTranslation()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, refetch } = useGetContentMenuQuery({
      fetchPolicy: 'network-only',
      variables: {
        language: i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const listTabs_i18n: Array<{
      code: EnumGeneralInfomation
      name: string
    }> = [
      {
        code: EnumGeneralInfomation.ContactInFormation,
        name: t('generalInformation.textContactInformation')
      }
    ]

    const [currentTab, setCurrentTab] = useState<ITabStateGeneral>(
      EnumGeneralInfomation.ContactInFormation
    )
    const handleChangeTab = useCallback(
      (tab: EnumGeneralInfomation) => setCurrentTab(tab),
      []
    )
    return (
      <div className='page-cms-setting'>
        <div style={{ borderBottom: '1px solid gray', paddingBottom: 40 }}>
          <h3
            style={{ fontSize: 18, fontWeight: 'bold', padding: '10px 12px' }}
          >
            {t('setting.textGeneralSetting')}
          </h3>
        </div>
        <div style={{}}>
          <IconTabBar activeKey={currentTab} onTabClick={handleChangeTab}>
            <IconTabBar.Content>
              <div
                className='grid-wrapper'
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  height: window.innerHeight - 150
                }}
              >
                {EnumGeneralInfomation.ContactInFormation === currentTab && (
                  <>
                    <div
                      style={{
                        paddingTop: '14px',
                        height: '100%',
                        overflow: 'auto'
                      }}
                    >
                      <FormContact />
                    </div>
                  </>
                )}
              </div>
            </IconTabBar.Content>
          </IconTabBar>
        </div>
      </div>
    )
  })
)

export default Setting
