import {
  Col,
  FieldForm as Form,
  Input,
  Row,
  TextArea
} from '@digihcs/innos-ui3'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from 'src/config/i18n'
import {
  EnumLanguage,
  GetContentHomePageQuery
} from 'src/graphql-definition/webinfo-service.generated'

import ButtonAction from '../ButtonAction'
import UploadImage from './UploadImage'

import '../styles.less'

interface FormCMSHomeProps {
  data: GetContentHomePageQuery['getContentHomePage']
  refetch: Function
  callCreateOrUpdateCMSHome: Function
}

function FormCMSHome({
  data,
  refetch,
  callCreateOrUpdateCMSHome
}: FormCMSHomeProps) {
  const [formCMSHome] = Form.useForm()
  const { t } = useTranslation()
  const [imageUrl, setImageUrl] = useState<string>(null)
  const onSubmitCMSHome = () =>
    formCMSHome
      .validateFields()
      .then((values: any) => {
        const oldValues = data
        if (oldValues?._id) delete oldValues._id
        callCreateOrUpdateCMSHome({
          variables: {
            input: {
              ...oldValues,
              language:
                i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
              ...values
            }
          }
        })
      })
      .catch((err) => console.error(err, 'err'))
  useEffect(() => {
    if (data && data?.SEO_OGImage) {
      setImageUrl(data?.SEO_OGImage)
    }
  }, [data])

  const setAllForm = async () => {
    if (data?.SEO_OGImage) {
      refetch()
        .then(() => {
          setImageUrl(data?.SEO_OGImage || null)
          formCMSHome.resetFields()
        })
        .catch((err: any) => {})
    } else {
      formCMSHome.resetFields()
      setImageUrl(null)
    }
  }
  return (
    <div>
      <Form
        form={formCMSHome}
        name='form-cms-home'
        className='form-cms-home'
        layout={FormLayout.Horizontal}
        initialValues={{
          SEOTitle: data?.SEOTitle || '',
          SEODescription: data?.SEODescription || '',
          SEOKeywords: data?.SEOKeywords || '',
          SEO_OGImage: data?.SEO_OGImage || ''
        }}
      >
        <Row>
          <Col span='XL11 L11 M11 S11'>
            <Row>
              <Col span='XL9 L9 M9 S9'>
                <Form.Item>
                  <Input hidden style={{ display: 'none' }} />
                </Form.Item>
                <Form.Item
                  style={{ alignItems: 'flex-start' }}
                  name='SEOTitle'
                  label={t('manageHome.labelTitle')}
                  labelStyle={{ width: 120, marginRight: 10 }}
                  rules={[
                    {
                      required: true,
                      message: t('manageHome.SEO.msgPageNameMissing')
                    }
                  ]}
                >
                  <Input
                    placeholder={t('manageHome.SEO.holderEnterPageName')}
                  />
                </Form.Item>
                <Form.Item
                  style={{ alignItems: 'flex-start' }}
                  label={t('manageHome.SEO.textDescription')}
                  name='SEODescription'
                  labelStyle={{ width: 120, marginRight: 10 }}
                  rules={[
                    {
                      required: true,
                      message: t('manageHome.SEO.msgDescriptionMissing')
                    }
                  ]}
                >
                  <TextArea
                    placeholder={t('manageHome.SEO.holderEnterDescription')}
                    rows={3}
                  />
                </Form.Item>
                <Form.Item
                  style={{ alignItems: 'flex-start' }}
                  name='SEOKeywords'
                  label={t('manageHome.keywords')}
                  labelStyle={{ width: 120, marginRight: 10 }}
                >
                  <Input
                    placeholder={t('manageHome.SEO.holderEnterKeywords')}
                  />
                </Form.Item>
              </Col>
              <Col span='XL3 L3 M3 S10'>
                <Form.Item
                  name='SEO_OGImage'
                  rules={[
                    {
                      required: true,
                      message: t('manageBlog.msgImagetMissing')
                    }
                  ]}
                >
                  <UploadImage
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    handleUploadCallback={(file: any) => {
                      formCMSHome.setFields([
                        {
                          name: 'SEO_OGImage',
                          value: file
                        }
                      ])
                    }}
                  />
                </Form.Item>
                <p
                  style={{
                    fontSize: 10,
                    fontFamily: 'Roboto',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    textAlign: 'center'
                  }}
                >
                  {t('manageHome.textImg')}
                </p>
              </Col>
            </Row>
          </Col>
          <Col span='XL10 L10 M10 S10'>
            <Form.Item>
              <Input hidden style={{ display: 'none' }} />
            </Form.Item>
            <Form.Item>
              <ButtonAction
                onSubmit={() => onSubmitCMSHome()}
                onCancel={() => {
                  setAllForm()
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default FormCMSHome
