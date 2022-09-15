import { AddSapIcon, SysMinusSapIcon } from '@digihcs/icons'
import { Button, Col, FieldForm as Form, Input, Row } from '@digihcs/innos-ui3'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UploadImage from 'src/components/UploadImage'
import i18n from 'src/config/i18n'
import {
  EnumLanguage,
  GetContentHomePageQuery
} from 'src/graphql-definition/webinfo-service.generated'

import ButtonAction from '../ButtonAction'
import ButtonHidden from '../ButtonHidden'

import '../styles.less'

interface PartnerProps {
  data: GetContentHomePageQuery['getContentHomePage']
  callCreateOrUpdateCMSHome: Function
}

function FormPartner({ data, callCreateOrUpdateCMSHome }: PartnerProps) {
  const [formPartner] = Form.useForm()
  const { t } = useTranslation()
  const content = document.querySelector('.form-row')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [heightButton, setHeightButton] = useState('100%')
  const [isCheckPartner, setIsCheckPartner] = useState<boolean>(true)
  const handleSwitchPartner = useCallback(
    (checked: boolean) => {
      setIsCheckPartner(checked)

      const oldValues = data
      delete oldValues._id

      callCreateOrUpdateCMSHome({
        variables: {
          input: {
            ...oldValues,
            language:
              i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
            sectionOurPartners: {
              ...oldValues.sectionOurPartners,
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
      setIsCheckPartner(data?.sectionOurPartners?.isActive)
    }
  }, [data])
  useEffect(() => {
    setHeightButton(`${content?.clientHeight - 20}px`)
  }, [content, window.innerWidth])
  const onSubmitCMSHome = () =>
    formPartner
      .validateFields()
      .then((values: any) => {
        const sectionOurPartners = {
          ...values,
          isActive: true
        }
        const oldValues = data
        if (oldValues._id) delete oldValues._id
        callCreateOrUpdateCMSHome({
          variables: {
            input: {
              ...oldValues,
              language:
                i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
              sectionOurPartners
            }
          }
        })
      })
      .catch((err) => console.error(err, 'err'))

  const INIT_VALUES = {
    title: data?.sectionOurPartners?.title || '',
    imagePartner: data?.sectionOurPartners?.imagePartner?.map((item) => ({
      linkImage: item?.linkImage,
      title: item?.title,
      link: item?.link,
      altTextImage: item?.altTextImage
    }))
  }

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <Form
        form={formPartner}
        name='form-cms-home'
        className='form-cms-home pb-5'
        layout={FormLayout.Horizontal}
        initialValues={INIT_VALUES}
      >
        <Row>
          {/* //style = {{ border: '0.5px solid', marginTop: 1 }} */}
          <Col span='XL6 L6 M6 S6' style={{ marginTop: 15, marginBottom: 34 }}>
            <Form.Item>
              <Input hidden style={{ display: 'none' }} />
            </Form.Item>
            <Form.Item
              style={{ alignItems: 'flex-start' }}
              name='title'
              label={t('manageHome.Partner.labelTitle')}
              rules={[
                {
                  required: true,
                  message: t('manageHome.Partner.msgTitleMissing')
                }
              ]}
              labelStyle={{ width: 70, marginRight: 5 }}
            >
              <Input placeholder={t('manageHome.Partner.holderEnterTitle')} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.List name='imagePartner'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Col key={key} span='XL10 L10 M10 S10'>
                    <Row
                      key={`${name}-${index}`}
                      style={{
                        border: '1px solid #D9D9D9',
                        marginTop: 2,
                        borderRadius: 4
                      }}
                    >
                      <div className='form-row' style={{ marginTop: 15 }}>
                        <Row>
                          <Col span='XL1 L1 M1 S1'>
                            <p>Logo {index + 1}</p>
                          </Col>

                          <Col span='XL3 L3 M3 S3'>
                            <Form.Item
                              name={[name, 'linkImage']}
                              rules={[
                                {
                                  required: true,
                                  message: t(
                                    'manageHome.Partner.msgImagesMissing'
                                  )
                                }
                              ]}
                            >
                              <UploadImage
                                linkImage={formPartner.getFieldValue([
                                  'imagePartner',
                                  index,
                                  'linkImage'
                                ])}
                                handleUploadCallback={(file: any) => {
                                  formPartner.setFields([
                                    {
                                      name: [
                                        'imagePartner',
                                        index,
                                        'linkImage'
                                      ],
                                      value: file
                                    }
                                  ])
                                  formPartner.validateFields()
                                }}
                              />
                            </Form.Item>
                            <Form.Item
                              style={{ alignItems: 'flex-start' }}
                              labelStyle={{ width: 0 }}
                              name={[name, 'linkImage']}
                              rules={[
                                {
                                  required: true,
                                  message: t(
                                    'manageHome.Partner.msgImagesMissing'
                                  )
                                }
                              ]}
                            >
                              <Input style={{ display: 'none' }} />
                            </Form.Item>
                            {/* <p
                              style={{
                                fontSize: 10,
                                fontFamily: 'Roboto',
                                fontStyle: 'italic',
                                fontWeight: 400,
                                textAlign: 'center'
                              }}
                            >
                              {t('manageHome.Partner.textStandardSize')}
                            </p> */}
                          </Col>
                          <Col span='XL7 L7 M7 S7'>
                            <Form.Item>
                              <Input hidden style={{ display: 'none' }} />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              style={{ alignItems: 'flex-start' }}
                              label={t('manageHome.Partner.labelDescription')}
                              name={[name, 'title']}
                              rules={[
                                {
                                  required: true,
                                  message: t(
                                    'manageHome.Partner.msgDescriptionMissing'
                                  )
                                }
                              ]}
                              labelStyle={{ width: 105, marginRight: 5 }}
                            >
                              <Input
                                placeholder={t(
                                  'manageHome.Partner.holderEnterDescription'
                                )}
                              />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              style={{ alignItems: 'flex-start' }}
                              label={t('manageHome.Partner.link')}
                              name={[name, 'link']}
                              rules={[
                                {
                                  required: true,
                                  message: t(
                                    'manageHome.Partner.msgLinkMissing'
                                  )
                                }
                              ]}
                              labelStyle={{ width: 105, marginRight: 5 }}
                            >
                              <Input
                                placeholder={t('manageHome.Partner.holderLink')}
                              />
                            </Form.Item>
                          </Col>
                          <Col
                            span='XL1 L1 M1 S1'
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <div
                              style={{ cursor: 'pointer' }}
                              onClick={() => remove(name)}
                            >
                              <SysMinusSapIcon style={{ color: 'red' }} />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Row>
                  </Col>
                ))}
                <Col span='XL2 L2 M2 S2' style={{ marginTop: 136 }}>
                  <Form.Item>
                    <Input hidden style={{ display: 'none' }} />
                  </Form.Item>
                  <Form.Item>
                    <Button iconName={<AddSapIcon />} onClick={() => add()}>
                      {t('manageHome.Partner.textNewPartner')}
                    </Button>
                  </Form.Item>
                </Col>
              </>
            )}
          </Form.List>
        </Row>
        <div
          className='w-100 position-absolute bg-white  shadow-lg p-2'
          style={{ left: 0, bottom: 0 }}
        >
          <div className='wrapper-button'>
            <ButtonHidden
              isCheck={isCheckPartner}
              handleSwitch={handleSwitchPartner}
              textOnOff='OurPartner'
            />
            <ButtonAction
              onSubmit={() => onSubmitCMSHome()}
              onCancel={() => formPartner.resetFields()}
            />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default FormPartner
