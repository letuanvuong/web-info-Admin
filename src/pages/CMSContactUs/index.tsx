import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Col,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FieldForm as Form,
  IconTabBar,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Input,
  messageToast,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Row
} from '@digihcs/innos-ui3'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from 'src/config/i18n'
import {
  EnumLanguage,
  useCreateOrUpdateContentContactMutation,
  useGetContentContactQuery
} from 'src/graphql-definition/webinfo-service.generated'

import FormContentContact from './FormContentContact'
import FormSEOContact from './FormSEOContact'
import { EnumTrangQuanLyContactUs, ITabStateContactUs } from './interface'

import './styles.less'

function CMSContactUs() {
  const { t } = useTranslation()
  const language = i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En

  const { data, loading, refetch } = useGetContentContactQuery({
    fetchPolicy: 'no-cache',
    variables: {
      language
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [callCreateOrUpdate, { loading: loadingCreateOrUpdate }] =
    useCreateOrUpdateContentContactMutation({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        if (data?.createOrUpdateContentContact?._id) {
          messageToast.success({
            duration: 2,
            message: t('manageContactUs.notiUpdateSuccess')
          })
          refetch()
        }
      },
      onError: (error) => {
        messageToast.error({
          duration: 2,
          message: t('manageContactUs.notiUpdateFailed')
        })
      }
    })

  const [currentTab, setCurrentTab] = useState<ITabStateContactUs>(
    EnumTrangQuanLyContactUs.Content
  )
  const handleChangeTab = useCallback(
    (tab: EnumTrangQuanLyContactUs) => setCurrentTab(tab),
    []
  )
  const listTabs_i18n: Array<{
    code: EnumTrangQuanLyContactUs | 'All'
    name: string
  }> = [
    {
      code: EnumTrangQuanLyContactUs.Content,
      name: t('manageContactUs.textPageContent')
    },
    {
      code: EnumTrangQuanLyContactUs.Info,
      name: t('manageContactUs.textSEOInfo')
    }
  ]

  if (loading) return <div>Loading...</div>

  return (
    <div className='cms_page'>
      <div className='cms_title'>{t('manageContactUs.textTitle')}</div>
      <IconTabBar activeKey={currentTab} onTabClick={handleChangeTab}>
        {listTabs_i18n.map((tab) => (
          <IconTabBar.Filter key={tab.code} text={tab.name}>
            {tab.name}
          </IconTabBar.Filter>
        ))}

        <IconTabBar.Content>
          <div
            className='grid-wrapper'
            style={{
              flex: 1,
              backgroundColor: '#fff',
              height: window.innerHeight - 150
            }}
          >
            {currentTab === EnumTrangQuanLyContactUs.Info && (
              <div style={{ paddingTop: '30px', height: '100%' }}>
                <FormSEOContact
                  data={data?.getContentContact}
                  callCreateOrUpdateContentContact={callCreateOrUpdate}
                />
              </div>
            )}
            {currentTab === EnumTrangQuanLyContactUs.Content && (
              <div
                style={{ paddingTop: '30px', height: '100%', overflow: 'auto' }}
              >
                <FormContentContact
                  data={data?.getContentContact}
                  callCreateOrUpdateContentContact={callCreateOrUpdate}
                />
              </div>
            )}
          </div>
        </IconTabBar.Content>
      </IconTabBar>
    </div>
  )
}
export default CMSContactUs
