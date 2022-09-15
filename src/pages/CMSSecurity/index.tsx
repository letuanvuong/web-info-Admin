import { DeclineSapIcon, SaveSapIcon } from '@digihcs/icons'
import {
  Button,
  Col,
  FieldForm as Form,
  IconTabBar,
  Input,
  messageToast,
  Row
} from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from 'src/config/i18n'
import { editorConfig } from 'src/constant'
import {
  EnumLanguage,
  InputContentSecurity,
  useCreateOrUpdateContentSecurityMutation,
  useGetContentSecurityQuery
} from 'src/graphql-definition/webinfo-service.generated'

import { EnumTrangQuanLyAboutUs } from '../CMSAboutUs/interface'
import { EnumTrangQuanLySecurity, ITabStateSecurity } from './interface'

import './styles.less'

function CMSSecurity() {
  const { t } = useTranslation()
  const [formInfo] = Form.useForm()
  const { validateFields: validateFieldsInfo } = formInfo
  const [formCK] = Form.useForm()
  const editorRef = useRef<any>(null)
  const { CKEditor, Editor } = editorRef.current || {}
  const language = i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En
  const [content, setContent] = useState('')

  const { data, loading, refetch } = useGetContentSecurityQuery({
    fetchPolicy: 'no-cache',
    variables: {
      language
    }
  })

  const [callCreateOrUpdate, { loading: loadingCreateOrUpdate }] =
    useCreateOrUpdateContentSecurityMutation({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        if (data?.createOrUpdateContentSecurity?._id) {
          messageToast.success({
            duration: 2,
            message: t('common.notiUpdateSuccess')
          })
          refetch()
        }
      },
      onError: (error) => {
        messageToast.error({
          duration: 2,
          message: t('common.notiUpdateFailed')
        })
      }
    })

  const [currentTab, setCurrentTab] = useState<ITabStateSecurity>(
    EnumTrangQuanLySecurity.Info
  )
  const handleChangeTab = useCallback(
    (tab: EnumTrangQuanLySecurity) => setCurrentTab(tab),
    []
  )
  const listTabs_i18n: Array<{
    code: EnumTrangQuanLyAboutUs | 'SEO Information'
    name: string
  }> = [
    { code: EnumTrangQuanLyAboutUs.Info, name: t('manageAboutUs.textSEOInfo') },
    {
      code: EnumTrangQuanLyAboutUs.Content,
      name: t('manageAboutUs.textPageContent')
    }
  ]

  useEffect(() => {
    editorRef.current = {
      // eslint-disable-next-line global-require
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      // eslint-disable-next-line global-require
      Editor: require('@digihcs/ckeditor5-all-plugin').Editor
    }
  }, [])

  const onSubmitCK = () => {
    if (content) {
      const input: InputContentSecurity = {
        Content: content
      }

      callCreateOrUpdate({
        variables: {
          language,
          input
        }
      })
    }
  }

  const onSubmitInfo = async () => {
    validateFieldsInfo()
      .then((values) => {
        const { SEOTitle, SEODescription, SEOKeywords } = values

        if (SEOTitle || SEODescription || SEOKeywords) {
          const input: InputContentSecurity = {
            SEOTitle,
            SEODescription,
            SEOKeywords,
            SEO_OGTitle: SEOTitle,
            SEO_OGDescription: SEODescription
          }

          callCreateOrUpdate({
            variables: {
              language,
              input
            }
          })
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error: ', error)
      })
  }

  const setFieldInfoData = () => {
    if (data?.getContentSecurity) {
      const { SEODescription, SEOKeywords, SEOTitle } = data?.getContentSecurity
      formInfo.setFieldsValue({
        SEODescription,
        SEOKeywords,
        SEOTitle
      })
    }
  }

  const setFieldCKData = () => {
    if (data?.getContentSecurity) {
      setContent(data?.getContentSecurity?.Content || '')
    }
  }

  useEffect(() => {
    setFieldInfoData()
    setFieldCKData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (loading) return <div>Loading...</div>

  return (
    <div className='cms_page'>
      <div className='cms_title'>{t('manageSecurity.textTitle')}</div>
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
            {currentTab === EnumTrangQuanLySecurity.Info && (
              <div style={{ paddingTop: '30px' }}>
                <Form
                  form={formInfo}
                  layout={FormLayout.Horizontal}
                  className='cms_form'
                >
                  <Row>
                    <Col span='XL8 L8 M8 S8'>
                      <Form.Item
                        label={t('manageAboutUs.labelTitle')}
                        name='SEOTitle'
                        labelStyle={{ width: 95, marginRight: 5 }}
                      >
                        <Input placeholder={t('manageAboutUs.holderTitle')} />
                      </Form.Item>
                      <Form.Item
                        label={t('manageAboutUs.labelDescription')}
                        name='SEODescription'
                        labelStyle={{ width: 95, marginRight: 5 }}
                      >
                        <Input
                          placeholder={t('manageAboutUs.holderDescription')}
                        />
                      </Form.Item>
                      <Form.Item
                        label={t('manageAboutUs.labelKeyWork')}
                        name='SEOKeywords'
                        labelStyle={{ width: 95, marginRight: 5 }}
                      >
                        <Input placeholder={t('manageAboutUs.holderKeyWork')} />
                      </Form.Item>
                      <Form.Item>
                        <div
                          style={{
                            display: 'flex',
                            marginBottom: 10,
                            marginTop: 20,
                            justifyContent: 'flex-end'
                          }}
                        >
                          <Button
                            iconName={<DeclineSapIcon />}
                            buttonType={ButtonType.Negative}
                            style={{ marginRight: 10, minWidth: 70 }}
                            onClick={() => setFieldInfoData()}
                          >
                            {t('manageAboutUs.btnCancel')}
                          </Button>

                          <Button
                            style={{ minWidth: 70 }}
                            iconName={<SaveSapIcon />}
                            onClick={() => onSubmitInfo()}
                            disabled={loadingCreateOrUpdate}
                          >
                            {t('manageAboutUs.btnSave')}
                          </Button>
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            )}
            {currentTab === EnumTrangQuanLySecurity.Content && (
              //         <>
              // <div className='cms_content'>{t('manageAboutUs.textContent')}</div>
              <div
                className='cms_ck'
                style={{ position: 'relative', height: '100%' }}
              >
                <Form form={formCK} layout={FormLayout.Vertical}>
                  <Form.Item name='content' style={{ width: '100%' }}>
                    <CKEditor
                      type=''
                      name='ContentEditor'
                      editor={Editor}
                      data={content || ''}
                      config={editorConfig}
                      width='100%'
                      onChange={(event: any, editor: any) => {
                        setContent(editor.getData())
                      }}
                    />
                  </Form.Item>
                  <div
                    className='w-100 position-absolute bg-white d-flex justify-content-end shadow-lg p-2'
                    style={{ right: 0, bottom: 0 }}
                  >
                    <Button
                      iconName={<DeclineSapIcon />}
                      buttonType={ButtonType.Negative}
                      style={{ marginRight: 10, minWidth: 70 }}
                      onClick={() => setFieldCKData()}
                    >
                      {t('manageAboutUs.btnCancel')}
                    </Button>

                    <Button
                      style={{ minWidth: 70 }}
                      iconName={<SaveSapIcon />}
                      onClick={() => onSubmitCK()}
                      disabled={loadingCreateOrUpdate}
                    >
                      {t('manageAboutUs.btnSave')}
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </div>
        </IconTabBar.Content>
      </IconTabBar>
    </div>
  )
}

export default CMSSecurity
