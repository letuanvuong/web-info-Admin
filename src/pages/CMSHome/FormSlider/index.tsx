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

interface FormSliderProps {
  data: GetContentHomePageQuery['getContentHomePage']
  callCreateOrUpdateCMSHome: Function
}

function FormSlider({ data, callCreateOrUpdateCMSHome }: FormSliderProps) {
  const [formSlider] = Form.useForm()
  const { t } = useTranslation()
  const [isCheckSlider, setIsCheckSlider] = useState<boolean>(true)
  const handleSwitchSlider = useCallback(
    (checked: boolean) => {
      setIsCheckSlider(checked)

      const oldValues = data
      delete oldValues._id

      callCreateOrUpdateCMSHome({
        variables: {
          input: {
            ...oldValues,
            language:
              i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
            sectionSlider: {
              ...oldValues.sectionSlider,
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
      setIsCheckSlider(data?.sectionSlider?.isActive)
    }
  }, [data])
  const content = document.querySelector('.form-row')
  const [heightButton, setHeightButton] = useState('100%')
  useEffect(() => {
    setHeightButton(`${content?.clientHeight - 10}px`)
  }, [content, window.innerWidth])

  const onSubmitCMSHome = () =>
    formSlider
      .validateFields()
      .then((values) => {
        const sectionSlider = { ...values, isActive: true }
        const oldValues = data
        if (oldValues._id) delete oldValues._id
        callCreateOrUpdateCMSHome({
          variables: {
            input: {
              ...oldValues,
              language:
                i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
              sectionSlider
            }
          }
        })
      })
      .catch((err) => console.error(err, 'err'))

  const INIT_VALUES = {
    imageSlider: data?.sectionSlider?.imageSlider?.map((item) => ({
      linkImage: item?.linkImage,
      title: item?.title,
      subTitle: item?.subTitle,
      altTextImage: item?.altTextImage,
      nameLink: item?.nameLink,
      link: item?.link
    }))
  }

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <Form
        form={formSlider}
        name='form-cms-home'
        className='form-cms-home pb-5'
        layout={FormLayout.Horizontal}
        initialValues={INIT_VALUES}
      >
        <Row style={{ marginTop: 15 }}>
          <Form.List name='imageSlider'>
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
                            <p>Slider {index + 1}</p>
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
                                linkImage={formSlider.getFieldValue([
                                  'imageSlider',
                                  index,
                                  'linkImage'
                                ])}
                                handleUploadCallback={(file: any) => {
                                  formSlider.setFields([
                                    {
                                      name: ['imageSlider', index, 'linkImage'],
                                      value: file
                                    }
                                  ])
                                  formSlider.validateFields()
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
                          </Col>

                          <Col span='XL7 L7 M7 S7'>
                            <Row>
                              <Col span='XL12 L12 M12 S12'>
                                <Form.Item>
                                  <Input hidden style={{ display: 'none' }} />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  style={{ alignItems: 'flex-start' }}
                                  name={[name, 'title']}
                                  label={t('manageHome.Slider.labelTitle')}
                                  rules={[
                                    {
                                      required: true,
                                      message: t(
                                        'manageHome.Slider.msgLabelTitle'
                                      )
                                    }
                                  ]}
                                  labelStyle={{ width: 117, marginRight: 5 }}
                                >
                                  <Input
                                    placeholder={t(
                                      'manageHome.Slider.holderEnterTitle'
                                    )}
                                  />
                                </Form.Item>

                                <Form.Item
                                  {...restField}
                                  style={{ alignItems: 'flex-start' }}
                                  label={t(
                                    'manageHome.Slider.labelDescription'
                                  )}
                                  name={[name, 'subTitle']}
                                  rules={[
                                    {
                                      required: true,
                                      message: t(
                                        'manageHome.Slider.msgDescription'
                                      )
                                    }
                                  ]}
                                  labelStyle={{ width: 117, marginRight: 5 }}
                                >
                                  <Input
                                    placeholder={t(
                                      'manageHome.Slider.holderEnterDescription'
                                    )}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                            <div className='row-slider'>
                              <Row>
                                <Col span='XL6 L6 M6 S6'>
                                  <Form.Item>
                                    <Input hidden style={{ display: 'none' }} />
                                  </Form.Item>
                                  <Form.Item
                                    {...restField}
                                    style={{ alignItems: 'flex-start' }}
                                    label={t('manageHome.Slider.nameLink')}
                                    name={[name, 'nameLink']}
                                    rules={[
                                      {
                                        required: true,
                                        message: t(
                                          'manageHome.Slider.msgButtonTitleMissing'
                                        )
                                      }
                                    ]}
                                    labelStyle={{ width: 145, marginRight: 5 }}
                                  >
                                    <Input
                                      placeholder={t(
                                        'manageHome.Slider.holderNameLink'
                                      )}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span='XL6 L6 M6 S6'>
                                  <Form.Item>
                                    <Input hidden style={{ display: 'none' }} />
                                  </Form.Item>
                                  <Form.Item
                                    {...restField}
                                    style={{ alignItems: 'flex-start' }}
                                    label={t('manageHome.Slider.link')}
                                    name={[name, 'link']}
                                    rules={[
                                      {
                                        required: true,
                                        message: t(
                                          'manageHome.Slider.msgButtonLinkMissing'
                                        )
                                      }
                                    ]}
                                    labelStyle={{ width: 145, marginRight: 5 }}
                                  >
                                    <Input
                                      placeholder={t(
                                        'manageHome.Slider.holderLink'
                                      )}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                          <Col
                            span='XL1 L1 M1 S1'
                            style={{
                              display: 'flex',
                              alignItems: 'flex-end',
                              justifyContent: 'flex-end'
                            }}
                          >
                            <div onClick={() => remove(name)}>
                              <SysMinusSapIcon style={{ color: 'red' }} />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Row>
                  </Col>
                ))}
                <Col
                  span='XL2 L2 M2 S2'
                  style={{ marginTop: heightButton, marginBottom: 10 }}
                >
                  <Form.Item>
                    <Button iconName={<AddSapIcon />} onClick={() => add()}>
                      {t('manageHome.Slider.textNewSlider')}
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
              isCheck={isCheckSlider}
              handleSwitch={handleSwitchSlider}
              textOnOff='Slider'
            />
            <ButtonAction
              onSubmit={() => onSubmitCMSHome()}
              onCancel={() => formSlider.resetFields()}
            />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default FormSlider
