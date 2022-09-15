import { AddSapIcon, SysMinusSapIcon } from '@digihcs/icons'
import {
  Button,
  Col,
  FieldForm as Form,
  Input,
  Row,
  TextArea
} from '@digihcs/innos-ui3'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { InputNumber } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from 'src/config/i18n'
import {
  EnumLanguage,
  GetContentHomePageQuery,
  LinkImage
} from 'src/graphql-definition/webinfo-service.generated'

import ButtonAction from '../ButtonAction'
import ButtonHidden from '../ButtonHidden'
import UploadImage from '../UploadImage'

import '../styles.less'

interface FormEstimonialProps {
  data: GetContentHomePageQuery['getContentHomePage']
  refetch: Function
  callCreateOrUpdateCMSHome: Function
}

function FormEstimonial({
  data,
  refetch,
  callCreateOrUpdateCMSHome
}: FormEstimonialProps) {
  const [formEstimonial] = Form.useForm()
  const { t } = useTranslation()
  const [imageUrl, setImageUrl] = useState<LinkImage>(null)
  const [isCheckTestimonial, setIsCheckTestimonial] = useState<boolean>(true)
  const handleSwitchTestimonial = useCallback(
    (checked: boolean) => {
      setIsCheckTestimonial(checked)

      const oldValues = data
      delete oldValues._id

      callCreateOrUpdateCMSHome({
        variables: {
          input: {
            ...oldValues,
            language:
              i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
            sectionEstimonial: {
              ...oldValues.sectionEstimonial,
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
      setIsCheckTestimonial(data?.sectionEstimonial?.isActive)
    }
  }, [data])
  useEffect(() => {
    setImageUrl(data?.sectionEstimonial?.linkImage)
  }, [])
  const onSubmitEstimonial = (loadingCheck: boolean = false) =>
    formEstimonial
      .validateFields()
      .then((values: any) => {
        const sectionEstimonial = {
          ...values,

          isActive: true
        }
        const oldValues = data
        if (oldValues?._id) delete oldValues._id
        callCreateOrUpdateCMSHome({
          variables: {
            input: {
              ...oldValues,
              language:
                i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
              sectionEstimonial
            }
          }
        })
        // eslint-disable-next-line no-console
        if (loadingCheck) console.log('-----------------------s')
      })
      .catch((err) => console.error(err, 'err'))

  const init_values = {
    linkImage: data?.sectionEstimonial?.linkImage || {},
    nameLink: data?.sectionEstimonial?.nameLink || '',
    link: data?.sectionEstimonial?.link || '',
    title: data?.sectionEstimonial?.title || '',
    description: data?.sectionEstimonial?.description || '',
    estimonialItems: data?.sectionEstimonial?.estimonialItems?.map((item) => ({
      number: item?.number || 0,
      description: item?.description || ''
    }))
  }
  const setAllForm = async () => {
    if (data?.sectionEstimonial) {
      refetch()
        .then(() => {
          setImageUrl(data?.sectionEstimonial.linkImage || null)
          formEstimonial.resetFields()
        })
        .catch((err: any) => {})
    } else {
      formEstimonial.resetFields()
      setImageUrl(null)
    }
  }
  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <Form
        form={formEstimonial}
        name='form-cms-home'
        className='form-cms-home pb-5'
        layout={FormLayout.Horizontal}
        initialValues={init_values}
      >
        <Row>
          <Col span='XL11 L11 M12 S12'>
            <Row>
              <Col span='XL8 L8 M10 S10'>
                <Row>
                  <Row>
                    <Col span='XL12 L12 M12 S12'>
                      <Form.Item>
                        <Input hidden style={{ display: 'none' }} />
                      </Form.Item>
                      <Form.Item
                        style={{ alignItems: 'flex-start' }}
                        name='title'
                        label={t('manageHome.Estimonial.labelTitle')}
                        labelStyle={{
                          width: 86,
                          marginRight: 5,
                          textAlign: 'left'
                        }}
                        rules={[
                          {
                            required: true,
                            message: t('manageHome.Estimonial.msgTitleMissing')
                          }
                        ]}
                      >
                        <Input
                          placeholder={t(
                            'manageHome.Estimonial.holderEnterTitle'
                          )}
                        />
                      </Form.Item>

                      <Form.Item
                        style={{ alignItems: 'flex-start' }}
                        label={t('manageHome.Estimonial.labelDescription')}
                        name='description'
                        labelStyle={{
                          width: 86,
                          marginRight: 5,
                          textAlign: 'left'
                        }}
                        rules={[
                          {
                            required: true,
                            message: t(
                              'manageHome.Estimonial.msgDescriptionMissing'
                            )
                          }
                        ]}
                      >
                        <TextArea
                          placeholder={t(
                            'manageHome.Estimonial.holderEnterDescription'
                          )}
                          rows={10}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Row>

                <Row>
                  <Row>
                    <Col span='XL6 L6 M6 S6'>
                      <Form.Item>
                        <Input hidden style={{ display: 'none' }} />
                      </Form.Item>
                      <Form.Item
                        style={{ alignItems: 'flex-start' }}
                        name='nameLink'
                        label={t('manageHome.Estimonial.buttonName')}
                        labelStyle={{
                          width: 100,
                          marginRight: 5,
                          textAlign: 'left'
                        }}
                        rules={[
                          {
                            required: true,
                            message: t(
                              'manageHome.Estimonial.msgButtonTitleMissing'
                            )
                          }
                        ]}
                      >
                        <Input
                          placeholder={t(
                            'manageHome.Estimonial.holderEnterButtonTitle'
                          )}
                        />
                      </Form.Item>
                    </Col>
                    <Col span='XL6 L6 M6 S6'>
                      <Form.Item>
                        <Input hidden style={{ display: 'none' }} />
                      </Form.Item>
                      <Form.Item
                        style={{ alignItems: 'flex-start' }}
                        name='link'
                        label={t('manageHome.Estimonial.buttonLink')}
                        labelStyle={{
                          width: 41,
                          marginRight: 5,
                          textAlign: 'left'
                        }}
                        rules={[
                          {
                            required: true,
                            message: t('manageHome.Estimonial.msgLinkMissing')
                          }
                        ]}
                      >
                        <Input
                          placeholder={t(
                            'manageHome.Estimonial.holderEnterLink'
                          )}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Row>

                <Row>
                  <Form.Item>
                    <Input hidden style={{ display: 'none' }} />
                  </Form.Item>
                  <Form.Item
                    style={{ alignItems: 'flex-start' }}
                    label={t('manageHome.Estimonial.indicators')}
                    labelStyle={{
                      width: 84,
                      marginRight: 2,
                      paddingLeft: 16,
                      textAlign: 'left'
                    }}
                  >
                    <Form.List name='estimonialItems'>
                      {(fields, { add, remove }) => (
                        <Row>
                          {fields.map(({ key, name, ...restField }, index) => (
                            <Col key={key} span='XL6 L6 M6 S6'>
                              <Row
                                key={`${name}-${index}`}
                                style={{
                                  border: '1px solid #D9D9D9',
                                  marginTop: 2,
                                  borderRadius: 4
                                }}
                              >
                                <Row
                                  style={{ display: 'flex', margin: '16px 0' }}
                                >
                                  <Col
                                    style={{ margin: 0 }}
                                    span='XL4 L4 M4 S4'
                                  >
                                    <Form.Item>
                                      <Input
                                        hidden
                                        style={{ display: 'none' }}
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      {...restField}
                                      style={{ alignItems: 'flex-start' }}
                                      name={[name, 'number']}
                                      rules={[
                                        {
                                          type: 'number',
                                          required: true,
                                          message: t(
                                            'manageHome.Estimonial.msgNumberMissing'
                                          )
                                        }
                                      ]}
                                    >
                                      <InputNumber
                                        style={{ width: 62 }}
                                        min={0}
                                        controls={false}
                                        placeholder={t(
                                          'manageHome.Estimonial.holderEnterNumber'
                                        )}
                                      />
                                    </Form.Item>
                                  </Col>

                                  <Col
                                    span='XL6 L6 M6 S6'
                                    style={{ margin: 0, flex: 1 }}
                                  >
                                    <Form.Item>
                                      <Input
                                        hidden
                                        style={{ display: 'none' }}
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      {...restField}
                                      style={{ alignItems: 'flex-start' }}
                                      name={[name, 'description']}
                                      rules={[
                                        {
                                          required: true,
                                          message: t(
                                            'manageHome.Estimonial.msgDescriptionMissing'
                                          )
                                        }
                                      ]}
                                      labelStyle={{}}
                                    >
                                      <Input
                                        placeholder={t(
                                          'manageHome.Estimonial.holderEnterDescription'
                                        )}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col
                                    span='XL2 L2 M2 S2'
                                    style={{
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      justifyContent: 'flex-end',
                                      margin: 0
                                    }}
                                  >
                                    <div onClick={() => remove(name)}>
                                      <SysMinusSapIcon
                                        style={{ color: 'red' }}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </Row>
                            </Col>
                          ))}
                          <Col span='XL6 L6 M6 S6' style={{ marginTop: 39 }}>
                            <Form.Item>
                              <Input hidden style={{ display: 'none' }} />
                            </Form.Item>
                            <Form.Item>
                              <Button
                                iconName={<AddSapIcon />}
                                onClick={() => add()}
                              >
                                {t('manageHome.Slider.textNewSlider')}
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>
                      )}
                    </Form.List>
                  </Form.Item>
                </Row>
              </Col>
              <Col span='XL4 L4 M2 S2'>
                <Form.Item>
                  <Input hidden style={{ display: 'none' }} />
                </Form.Item>
                <UploadImage
                  linkImage={imageUrl}
                  setImageUrl={setImageUrl}
                  handleUploadCallback={(file: any) => {
                    formEstimonial.setFields([
                      {
                        name: 'linkImage',
                        value: file
                      }
                    ])
                  }}
                />
                <Form.Item
                  style={{ alignItems: 'flex-start' }}
                  labelStyle={{ width: 0 }}
                  name='linkImage'
                  rules={[{ required: true }]}
                >
                  <Input style={{ display: 'none' }} />
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
                  {t('manageHome.Estimonial.backgroundTitle')}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <div
          className='w-100 position-absolute bg-white  shadow-lg p-2'
          style={{ left: 0, bottom: 0 }}
        >
          <div className='wrapper-button'>
            <ButtonHidden
              isCheck={isCheckTestimonial}
              handleSwitch={handleSwitchTestimonial}
              textOnOff='Testimonial'
            />
            <ButtonAction
              onSubmit={() => onSubmitEstimonial()}
              onCancel={() => setAllForm()}
            />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default FormEstimonial
