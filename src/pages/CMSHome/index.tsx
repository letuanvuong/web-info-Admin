import { IconTabBar, messageToast } from '@digihcs/innos-ui3'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from 'src/config/i18n'
import {
  EnumLanguage,
  useCreateOrUpdateContentHomePageMutation,
  useGetContentHomePageQuery
} from 'src/graphql-definition/webinfo-service.generated'

import FormBanner from './FormBanner'
import FormBlogNew from './FormBlog'
import FormCMSHome from './FormCMSHome'
import FormEstimonial from './FormEstimonial'
import FormOurClient from './FormOurClient'
import FormPartner from './FormPartner'
import FormService from './FormService'
import FormSlider from './FormSlider'
import FormWebIntroduce from './FormWebIntroduce'
import { EnumTrangQuanLyHome, ITabStateHome } from './interface'
import LatestProducts from './LatestProducts'

import './styles.less'

function CMSHome() {
  const { t } = useTranslation()

  const { data, loading, refetch } = useGetContentHomePageQuery({
    fetchPolicy: 'no-cache',
    variables: {
      language: i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En
    }
  })

  const [callCreateOrUpdateCMSHome] = useCreateOrUpdateContentHomePageMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.createOrUpdateContentHomePage?._id) {
        messageToast.success({
          duration: 2,
          message: t('manageHome.subBanner.notiUpdateSuccess')
        })
        refetch()
      }
    },
    onError: (error) => {
      console.error(error)

      messageToast.error({
        duration: 2,
        message: t('manageHome.subBanner.notiUpdateFailed')
      })
    }
  })
  const [currentTab, setCurrentTab] = useState<ITabStateHome>(
    EnumTrangQuanLyHome.Slider
  )
  const handleChangeTab = useCallback(
    (tab: EnumTrangQuanLyHome) => setCurrentTab(tab),
    []
  )
  const listTabs_i18n: Array<{
    code: EnumTrangQuanLyHome | 'All'
    name: string
  }> = [
    { code: EnumTrangQuanLyHome.Slider, name: t('manageHome.textSlider') },
    {
      code: EnumTrangQuanLyHome.Partner,
      name: t('manageHome.textPartner')
    },
    {
      code: EnumTrangQuanLyHome.WebIntroduce,
      name: t('manageHome.textWebIntroduce')
    },
    {
      code: EnumTrangQuanLyHome.Service,
      name: t('manageHome.textService')
    },
    {
      code: EnumTrangQuanLyHome.Estimonial,
      name: t('manageHome.textEstimonial')
    },
    {
      code: EnumTrangQuanLyHome.OurClient,
      name: t('manageHome.textOurClient')
    },
    {
      code: EnumTrangQuanLyHome.Blog,
      name: t('manageHome.textBlog')
    },

    // { code: EnumTrangQuanLyHome.Banner, name: t('manageHome.textSubBanner') },
    // {
    //   code: EnumTrangQuanLyHome.NewProduct,
    //   name: t('manageHome.textLatestProduct')
    // },
    { code: EnumTrangQuanLyHome.SEO, name: t('manageAboutUs.textSEOInfo') }
  ]

  if (loading) return <div>Loading...</div>

  return (
    <div className='cms_page'>
      <div className='cms_title'>{t('manageHome.textTitle')}</div>
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
            {currentTab === EnumTrangQuanLyHome.Slider && (
              <div className='position-relative' style={{ height: '100%' }}>
                <FormSlider
                  data={data?.getContentHomePage}
                  callCreateOrUpdateCMSHome={callCreateOrUpdateCMSHome}
                />
              </div>
            )}
            {currentTab === EnumTrangQuanLyHome.SEO && (
              <div style={{ paddingTop: '20px' }}>
                <FormCMSHome
                  data={data?.getContentHomePage}
                  refetch={refetch}
                  callCreateOrUpdateCMSHome={callCreateOrUpdateCMSHome}
                />
              </div>
            )}

            {currentTab === EnumTrangQuanLyHome.NewProduct && (
              <div style={{ paddingTop: '20px', height: '100%' }}>
                <LatestProducts />
              </div>
            )}

            {currentTab === EnumTrangQuanLyHome.Estimonial && (
              <div
                className='position-relative'
                style={{ paddingTop: '20px', height: '100%' }}
              >
                <FormEstimonial
                  data={data?.getContentHomePage}
                  refetch={refetch}
                  callCreateOrUpdateCMSHome={callCreateOrUpdateCMSHome}
                />
              </div>
            )}

            {currentTab === EnumTrangQuanLyHome.Banner && (
              <div
                className='position-relative'
                style={{ paddingTop: '20px', height: '100%' }}
              >
                <div style={{ height: '100%', overflow: 'auto' }}>
                  <FormBanner
                    data={data?.getContentHomePage}
                    callCreateOrUpdateCMSHome={callCreateOrUpdateCMSHome}
                  />
                </div>
              </div>
            )}
            {currentTab === EnumTrangQuanLyHome.Partner && (
              <div className='position-relative' style={{ height: '100%' }}>
                <FormPartner
                  data={data?.getContentHomePage}
                  callCreateOrUpdateCMSHome={callCreateOrUpdateCMSHome}
                />
              </div>
            )}
            {currentTab === EnumTrangQuanLyHome.OurClient && (
              <div className='position-relative' style={{ height: '100%' }}>
                <FormOurClient
                  data={data?.getContentHomePage}
                  callCreateOrUpdateCMSHome={callCreateOrUpdateCMSHome}
                />
              </div>
            )}
            {currentTab === EnumTrangQuanLyHome.WebIntroduce && (
              <div
                className='position-relative'
                style={{ paddingTop: '20px', height: '100%' }}
              >
                <FormWebIntroduce
                  data={data?.getContentHomePage}
                  refetch={refetch}
                  callCreateOrUpdateCMSHome={callCreateOrUpdateCMSHome}
                />
              </div>
            )}
            {currentTab === EnumTrangQuanLyHome.Service && (
              <div
                className='position-relative'
                style={{ paddingTop: '20px', height: '100%' }}
              >
                <FormService
                  data={data?.getContentHomePage}
                  callCreateOrUpdateCMSHome={callCreateOrUpdateCMSHome}
                />
              </div>
            )}
            {currentTab === EnumTrangQuanLyHome.Blog && (
              <div
                className='position-relative'
                style={{ paddingTop: '20px', height: '100%' }}
              >
                <FormBlogNew
                  data={data?.getContentHomePage}
                  callCreateOrUpdateCMSHome={callCreateOrUpdateCMSHome}
                />
              </div>
            )}
          </div>
        </IconTabBar.Content>
      </IconTabBar>
    </div>
  )
}

export default CMSHome
