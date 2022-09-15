import { AddSapIcon, SysMinusSapIcon } from '@digihcs/icons'
import {
  Button, Col,
  FieldForm as Form,
  Input,
  Row,
  TextArea
} from '@digihcs/innos-ui3'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from 'src/config/i18n'
import {
  EnumLanguage,
  GetContentContactQuery,
  OurAddress
} from 'src/graphql-definition/webinfo-service.generated'

import ButtonAction from '../ButtonAction'

import '../styles.less'

interface FormSEOContactProps {
  data: GetContentContactQuery['getContentContact']
  callCreateOrUpdateContentContact: Function
}

function FormContentContact({
  data,
  callCreateOrUpdateContentContact
}: FormSEOContactProps) {
  const [formSEOContact] = Form.useForm()
  const { t } = useTranslation()

  const [defaultValueMap, setValueMap] = useState<string[]>(() => {
    const result: string[] = []
    data?.ourAddress.forEach(data => result.push(data.googleFrameAddress))
    return result
  })

  const [dataInput, setDataInput] = useState<string>('')
  const [dataMapShowState, setDataMapShowState] = useState<string[]>([...defaultValueMap])
  const [isMatch, setIsMatch] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const regex = /https:\/\/www\.google\.com\/maps\/embed\?[^"]+/

  const onChangeMap = (e: any) => {
    setDataInput(e.target.value)
    setIsMatch(!!e.target.value.match(regex))
  }
  const onInput = (e: any) => {
    if (e.code === 'Backspace' || e.code === 'Space') {
      setIsDelete(true)
    }
  }
  const onBlurMap = (index: number) => {
    if (isDelete && !dataInput) {
      setDataMapShowState(prev => [...prev.slice(0, index), '', ...prev.slice(index + 1)])
      setDataInput('')
      setIsDelete(false)
    }
    if (!dataInput) return
    setDataMapShowState(prev => [...prev.slice(0, index), isMatch ? dataInput : '', ...prev.slice(index + 1)])
    setDataInput('')
  }
  const addNewMap = () => {
    setDataMapShowState(prev => [...prev, ''])
  }
  const deleteNewMap = (index: number) => {
    setDataMapShowState(prev => prev.filter((_, id) => id !== index))
  }


  const onSubmitSEOContact = () =>
    formSEOContact
      .validateFields()
      .then((values: any) => {
        const oldValues = data
        if (oldValues?._id) delete oldValues._id
        callCreateOrUpdateContentContact({
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

  return (
    <Form
      form={formSEOContact}
      name='form-cms-home'
      className='form-cms-home pb-5'
      layout={FormLayout.Horizontal}
      initialValues={{
        ourAddress: data?.ourAddress || '',
        ourPhone: data?.ourPhone || '',
        ourMailBox: data?.ourMailBox || '',
        detailAddress: data?.detailAddress || '',
        googleAddress: data?.googleAddress || '',
        googleFrame: data?.googleFrame || '',
        phoneNumber: data?.phoneNumber || '',
        introduce: data?.introduce || '',
        email: data?.email || ''
      }}
    >

      <Row>
        <Col span='XL10 L10 M10 S10'>
          <Row>
            <Col span='XL12 L12 M12 S12'>

              <Form.Item>
                <Input hidden style={{ display: 'none' }} />
              </Form.Item>

              <Form.Item
                style={{ alignItems: 'flex-start' }}
                name='introduce'
                label={t('manageContactUs.labelDescription')}
                labelStyle={{ width: 119, marginRight: 5, textAlign: 'left' }}
                rules={[
                  {
                    required: true,
                    message: t('manageContactUs.msgDescriptionMissing')
                  }
                ]}
              >
                <TextArea
                  placeholder={t('manageContactUs.holderDescription')}
                  rows={10}
                />
              </Form.Item>
            </Col>
          </Row>


          {/* start address */}

          <Row>
            <Col span='XL12 L12 M12 S12'>
              <Form.Item>
                <Input hidden style={{ display: 'none' }} />
              </Form.Item>

              <Form.Item
                style={{ alignItems: 'flex-start', marginTop: 15 }}
                name='ourMailBox'
                label={t('manageContactUs.email')}
                labelStyle={{ width: 115, marginRight: 5, textAlign: 'left' }}
                rules={[
                  {
                    required: true,
                    message: t('manageContactUs.msgMailBoxMissing')
                  }
                ]}
              >
                <Input
                  placeholder={t('manageContactUs.holderEmail')} />
              </Form.Item>
              <Form.Item
                style={{ alignItems: 'flex-start', marginTop: 15 }}
                name='ourPhone'
                label={t('manageContactUs.phoneNumber')}
                labelStyle={{ width: 115, marginRight: 5, textAlign: 'left' }}
                rules={[
                  {
                    required: true,
                    message: t('manageContactUs.msgPhoneNumberMissing')
                  }
                ]}
              >
                <Input
                  placeholder={t('manageContactUs.holderPhoneNumber')} />
              </Form.Item>
            </Col>

          </Row>
        </Col>
      </Row>

      {/* address */}
      <Row>
        <Col span='XL12 L12 M12 S12'>
          <Row>
            <Col span='XL12 L12 M12 S12' style={{ marginBottom: 0 }}>
              <Form.Item>
                <Input hidden style={{ display: 'none' }} />
              </Form.Item>
              <Form.List name='ourAddress'>
                {(fields, { add, remove }) => (
                  <Row style={{
                    position: 'relative'
                  }}>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Col
                        style={{
                          marginLeft: -8,
                          marginRight: -8,
                          marginBottom: '15px',
                          width: '84%',
                          overflow: 'unset'
                        }}
                        key={key}
                        span='XL10 L10 M10 S10'
                      >
                        <Row
                          key={`${name}-${index}`}
                          style={{
                            border: '1px solid #D9D9D9',
                            // marginTop: 2,
                            padding: '10px 30px 10px 10px',
                            borderRadius: 4,
                            position: 'relative'
                          }}
                        >

                          <Col
                            span='XL6 L6 M6 S6'
                            style={{
                              padding: 1,
                              marginLeft: -8,
                              marginBottom: 0,
                              width: '50%'
                            }}
                          >
                            <Form.Item>
                              <Input hidden style={{ display: 'none' }} />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              label={t('manageContactUs.detailAddress')}
                              name={[name, 'address']}
                              rules={[
                                {
                                  required: true,
                                  message: t('manageContactUs.msgOurAddressMissing')
                                }
                              ]}
                              labelStyle={{
                                width: '155px', marginRight: '-14px', textAlign: 'center'
                              }}
                            >
                              <Input
                                style={{ width: '100%' }}
                                placeholder={t('generalInformation.textEnterAddress')}
                              />
                            </Form.Item>
                          </Col>

                          <Col
                            style={{
                              marginLeft: -8,
                              marginBottom: 0,
                              width: '50%'
                            }}
                            span='XL6 L6 M6 S6'
                          >

                            <Form.Item>
                              <Input hidden style={{ display: 'none' }} />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'googleAddress']}
                              label={t('manageContactUs.textLinkGGMap')}
                              style={{
                                paddingRight: '10px'
                              }}
                              rules={[
                                {
                                  required: true,
                                  message: t(
                                    'generalInformation.msgLinkMissing'
                                  )
                                }
                              ]}
                              labelStyle={{
                                width: 150, marginRight: 1, textAlign: 'left', marginLeft: 5
                              }}
                            >
                              <Input
                                style={{ width: '100%' }}
                                placeholder={t('manageContactUs.holderGoogleAddress')}
                              />
                            </Form.Item>
                          </Col>

                          <Col
                            style={{
                              marginLeft: -8,
                              marginBottom: 0,
                              width: '100%'
                            }}
                            span='XL12 L12 M12 S12'
                          >

                            <Form.Item>
                              <Input hidden style={{ display: 'none' }} />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'googleFrameAddress']}
                              label={t('manageContactUs.embedMap')}
                              style={{ alignItems: 'flex-start', marginTop: 15, paddingRight: '8px' }}
                              labelStyle={{
                                width: '138px', textAlign: 'center', marginRight: '-12px'
                              }}
                              rules={[
                                {
                                  pattern: /https:\/\/www\.google\.com\/maps\/embed\?[^"]+/,
                                  message: t('manageContactUs.msgEmbedMapWrong')
                                }
                              ]}
                            >
                              <Input
                                onChange={onChangeMap}
                                onKeyDown={onInput}
                                onBlur={(e) => {
                                  onBlurMap(name)
                                }}
                                placeholder={t('manageContactUs.holderEmbedMap')}
                                style={{
                                  marginBottom: '10px'
                                }}
                              />

                            </Form.Item>

                          </Col>

                          <Row>
                            <Col span='XL12 L12 M12 S12'
                              style={{
                                position: dataMapShowState[name] ? 'relative' : 'absolute'
                              }}>
                              <div className='google-map'
                                style={{
                                  position: dataMapShowState[name] ? 'relative' : 'absolute'
                                }}
                              >
                                <iframe
                                  title='newmap'
                                  src={dataMapShowState[name]}
                                  allowFullScreen
                                />
                              </div>
                            </Col>
                          </Row>


                          <div
                            style={{
                              cursor: 'pointer',
                              display: `${fields.length === 1 ? 'none' : 'flex'}`,
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '40px',
                              height: '30px',
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              transform: 'translate(0px,5px)'
                            }}
                            onClick={() => {
                              console.log(name)
                              remove(name)
                              deleteNewMap(name)
                            }}
                          >
                            <SysMinusSapIcon style={{ color: 'red' }} />
                          </div>


                        </Row>
                      </Col>
                    ))}

                    <Col span='XL2 L2 M2 S2' style={{ marginTop: 5, position: 'absolute', bottom: 0, right: 0 }}>
                      <Form.Item>
                        <Button
                          iconName={<AddSapIcon />}
                          onClick={(e) => {
                            add()
                            addNewMap()
                          }}
                        >
                          {t('manageHome.Slider.textNewSlider')}
                        </Button>
                      </Form.Item>
                    </Col>

                  </Row>
                )
                }
              </Form.List>
            </Col>
          </Row>
        </Col>
      </Row>


      {/* end address */}

      <div
        className='w-100 position-absolute bg-white  shadow-lg p-2'
        style={{ left: 0, bottom: 0 }}
      >
        <div>
          <ButtonAction
            onSubmit={() => onSubmitSEOContact()}
            onCancel={() => {
              formSEOContact.resetFields()
              setDataMapShowState(defaultValueMap)
            }
            }
          />
        </div>
      </div>
    </Form >
  )
}

export default FormContentContact
