import {
  Col,
  FieldForm as Form,
  Input,
  messageToast,
  Row
} from '@digihcs/innos-ui3'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UploadImage from 'src/components/UploadImage'
import i18n from 'src/config/i18n'
import {
  EnumLanguage,
  GetContentHomePageQuery,
  LinkImage
} from 'src/graphql-definition/webinfo-service.generated'

import ButtonAction from '../ButtonAction'
import ButtonHidden from '../ButtonHidden'

import '../styles.less'

interface FormBannerProps {
  data: GetContentHomePageQuery['getContentHomePage']
  callCreateOrUpdateCMSHome: Function
}

function FormBanner({ data, callCreateOrUpdateCMSHome }: FormBannerProps) {
  const [formBanner] = Form.useForm()
  const { t } = useTranslation()
  const [isCheckBanner, setIsCheckBanner] = useState<boolean>(true)
  const handleSwitchBanner = useCallback(
    (checked: boolean) => {
      setIsCheckBanner(checked)

      const oldValues = data
      delete oldValues._id

      callCreateOrUpdateCMSHome({
        variables: {
          input: {
            ...oldValues,
            language:
              i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
            sectionBanner: {
              ...oldValues.sectionBanner,
              ...{ isActive: checked }
            }
          }
        }
      })
    },
    [callCreateOrUpdateCMSHome, data]
  )
  useEffect(() => {
    if (data) {
      setIsCheckBanner(data?.sectionBanner?.isActive)
    }
  }, [data])
  const onSubmitCMSHome = () =>
    formBanner
      .validateFields()
      .then((values: any) => {
        const oldValues = data
        delete oldValues._id
        values.isActive = oldValues?.sectionBanner?.isActive

        const sectionBanner = { ...values }

        callCreateOrUpdateCMSHome({
          variables: {
            input: {
              ...oldValues,
              language:
                i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
              sectionBanner
            }
          }
        })
      })
      .catch((error: any) => {
        messageToast.error({
          duration: 2,
          message: t('error.error_update')
        })
      })

  const INIT_VALUES = {
    imageBanner1: {
      linkImage: data?.sectionBanner?.imageBanner1?.linkImage || null,
      altTextImage: data?.sectionBanner?.imageBanner1?.altTextImage || '',
      link: data?.sectionBanner?.imageBanner1?.link || '',
      isActive: true
    },
    imageBanner2: {
      linkImage: data?.sectionBanner?.imageBanner2?.linkImage || null,
      altTextImage: data?.sectionBanner?.imageBanner2?.altTextImage || '',
      link: data?.sectionBanner?.imageBanner2?.link || '',
      isActive: true
    },
    imageBanner3: {
      linkImage: data?.sectionBanner?.imageBanner3?.linkImage || null,
      altTextImage: data?.sectionBanner?.imageBanner3?.altTextImage || '',
      link: data?.sectionBanner?.imageBanner3?.link || '',
      isActive: true
    }
  }

  return (
    <Form
      form={formBanner}
      name='form-cms-home'
      className='form-cms-home'
      layout={FormLayout.Horizontal}
      initialValues={INIT_VALUES}
    >
      {['Banner 1', 'Banner 2', 'Banner 3'].map((item, index) => {
        let linkImage = {}
        if (index + 1 === 1) {
          linkImage = data?.sectionBanner?.imageBanner1?.linkImage || null
        }
        if (index + 1 === 2) {
          linkImage = data?.sectionBanner?.imageBanner2?.linkImage || null
        }
        if (index + 1 === 3) {
          linkImage = data?.sectionBanner?.imageBanner3?.linkImage || null
        }

        return (
          <Row style={{ marginBottom: 20 }} key={index}>
            <Col span='XL10 L10 M10 S10'>
              <Row>
                <Col span='XL1 L1 M1 S1'>
                  <b>{item}</b>
                  <Form.Item>
                    <Input hidden style={{ display: 'none' }} />
                  </Form.Item>

                  <Form.Item
                    labelStyle={{ width: 0 }}
                    name={[`imageBanner${index + 1}`, 'isActive']}
                  >
                    <Input hidden style={{ display: 'none' }} />
                  </Form.Item>
                </Col>

                <Col span='XL3 L3 M3 S3'>
                  <Form.Item>
                    <Input hidden style={{ display: 'none' }} />
                  </Form.Item>
                  <UploadImage
                    linkImage={linkImage}
                    handleUploadCallback={(linkImage: LinkImage) => {
                      formBanner.setFields([
                        {
                          name: [`imageBanner${index + 1}`, 'linkImage'],
                          value: linkImage
                        }
                      ])
                    }}
                  />
                  <Form.Item
                    labelStyle={{ width: 0 }}
                    name={[`imageBanner${index + 1}`, 'linkImage']}
                  >
                    <Input hidden style={{ display: 'none' }} />
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
                    {t('manageHome.subBanner.textStandardSize')}
                  </p>
                </Col>

                <Col span='XL6 L6 M6 S6' style={{ marginTop: 30 }}>
                  <Form.Item>
                    <Input hidden style={{ display: 'none' }} />
                  </Form.Item>
                  <Form.Item
                    label={t('manageHome.subBanner.labelDescription')}
                    name={[`imageBanner${index + 1}`, 'altTextImage']}
                    labelStyle={{ width: 120, marginRight: 5 }}
                  >
                    <Input
                      placeholder={t(
                        'manageHome.subBanner.holderEnterDescription'
                      )}
                    />
                  </Form.Item>

                  <Form.Item
                    label={t('manageHome.subBanner.labelLink')}
                    name={[`imageBanner${index + 1}`, 'link']}
                    labelStyle={{ width: 120, marginRight: 5 }}
                  >
                    <Input
                      placeholder={t('manageHome.subBanner.holderEnterLink')}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        )
      })}
      <div
        className='w-100 position-absolute bg-white  shadow-lg p-2'
        style={{ left: 0, bottom: 0 }}
      >
        <div className='wrapper-button'>
          <ButtonHidden
            isCheck={isCheckBanner}
            handleSwitch={handleSwitchBanner}
            textOnOff='Banner'
          />
          <ButtonAction
            onSubmit={() => onSubmitCMSHome()}
            onCancel={() => formBanner.resetFields()}
          />
        </div>
      </div>
    </Form>
  )
}

export default FormBanner
