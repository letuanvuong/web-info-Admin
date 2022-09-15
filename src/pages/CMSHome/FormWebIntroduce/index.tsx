import { AddSapIcon, SysMinusSapIcon } from '@digihcs/icons'
import {
  Button,
  Col,
  FieldForm as Form,
  Input,
  Option,
  Row,
  Select,
  TextArea
} from '@digihcs/innos-ui3'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Icons from 'react-icons/all.d'
import i18n from 'src/config/i18n'
import {
  EnumLanguage,
  GetContentHomePageQuery,
  LinkImage
} from 'src/graphql-definition/webinfo-service.generated'
import iconNames from 'src/utils/icons'

import ButtonAction from '../ButtonAction'
import ButtonHidden from '../ButtonHidden'
import UploadImage from '../UploadImage'

import '../styles.less'

interface FormWebIntroduceProps {
  data: GetContentHomePageQuery['getContentHomePage']
  refetch: Function
  callCreateOrUpdateCMSHome: Function
}

function FormEstimonial({
  data,
  refetch,
  callCreateOrUpdateCMSHome
}: FormWebIntroduceProps) {
  const [formWebIntroduce] = Form.useForm()
  const { t } = useTranslation()
  const [imageUrl, setImageUrl] = useState<LinkImage>(null)
  const content = document.querySelector('.form-row')
  const [heightButton, setHeightButton] = useState('100%')
  const [isCheckIntroduce, setIsCheckIntroduce] = useState<boolean>(true)
  const handleSwitchIntroduce = useCallback(
    (checked: boolean) => {
      setIsCheckIntroduce(checked)

      const oldValues = data
      delete oldValues._id

      callCreateOrUpdateCMSHome({
        variables: {
          input: {
            ...oldValues,
            language:
              i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
            sectionWebIntrodution: {
              ...oldValues.sectionWebIntrodution,
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
      setIsCheckIntroduce(data?.sectionWebIntrodution?.isActive)
    }
  }, [data])
  useEffect(() => {
    setHeightButton(`${content?.clientHeight - 30}px`)
  }, [content, window.innerWidth])

  useEffect(() => {
    setImageUrl(data?.sectionWebIntrodution?.linkImage)
  }, [])
  const onSubmitWebIntroduce = () =>
    formWebIntroduce
      .validateFields()
      .then((values: any) => {
        const sectionWebIntrodution = { ...values, isActive: true }
        const oldValues = data
        if (oldValues?._id) delete oldValues._id
        callCreateOrUpdateCMSHome({
          variables: {
            input: {
              ...oldValues,
              language:
                i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
              sectionWebIntrodution
            }
          }
        })
      })
      .catch((err) => console.error(err, 'err'))

  const INIT_VALUES = {
    linkImage: data?.sectionWebIntrodution?.linkImage,
    webIntrodutionItems: data?.sectionWebIntrodution?.webIntrodutionItems?.map(
      (item) => ({
        iconName: item?.iconName,
        title: item?.title,
        description: item?.description
      })
    ),
    title: data?.sectionWebIntrodution?.title || '',
    description: data?.sectionWebIntrodution?.description || ''
  }
  interface iconProps {
    name: any
    color: string
  }
  const iconTemp: any = Icons

  const CustomIcon = ({ name, color }: iconProps) => {
    const Icon: any = iconTemp[name]
    if (!Icon) return <p>Icon not found!</p>

    return <Icon color={color} />
  }

  const setAllForm = async () => {
    if (data?.sectionWebIntrodution) {
      refetch()
        .then(() => {
          setImageUrl(data?.sectionWebIntrodution.linkImage || null)
          formWebIntroduce.resetFields()
        })
        .catch((err: any) => {})
    } else {
      formWebIntroduce.resetFields()
      setImageUrl(null)
    }
  }
  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <Form
        form={formWebIntroduce}
        name='form-cms-home'
        className='form-cms-home pb-5'
        layout={FormLayout.Horizontal}
        initialValues={INIT_VALUES}
      >
        <Row>
          <Col span='XL11 L11 M11 S11'>
            <Row>
              <Col span='XL9 L9 M9 S9'>
                <Row>
                  <Col span='XL10 L10 M10 S10'>
                    <Form.Item>
                      <Input hidden style={{ display: 'none' }} />
                    </Form.Item>
                    <Form.Item
                      style={{ alignItems: 'flex-start' }}
                      name='title'
                      label={t('manageHome.WebIntroduce.labelTitle')}
                      labelStyle={{
                        width: 100,
                        marginRight: 5,
                        textAlign: 'left'
                      }}
                      rules={[
                        {
                          required: true,
                          message: t('manageHome.WebIntroduce.msgTitleMissing')
                        }
                      ]}
                    >
                      <Input
                        placeholder={t(
                          'manageHome.WebIntroduce.holderEnterTitle'
                        )}
                      />
                    </Form.Item>

                    <Form.Item
                      style={{ alignItems: 'flex-start' }}
                      label={t('manageHome.WebIntroduce.labelDescription')}
                      name='description'
                      labelStyle={{
                        width: 100,
                        marginRight: 5,
                        textAlign: 'left'
                      }}
                      rules={[
                        {
                          required: true,
                          message: t(
                            'manageHome.WebIntroduce.msgDescriptionMissing'
                          )
                        }
                      ]}
                    >
                      <TextArea
                        placeholder={t(
                          'manageHome.WebIntroduce.holderEnterDescription'
                        )}
                        rows={6}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Form.List name='webIntrodutionItems'>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }, index) => (
                          <Col key={key} span='XL10 L10 M10 S10'>
                            <Row
                              key={`${name}-${index}`}
                              style={{
                                border: '1px solid #D9D9D9',
                                borderRadius: 4
                              }}
                            >
                              <div className='form-row'>
                                <Row>
                                  <Col
                                    span='XL11 L11 M11 S11'
                                    style={{
                                      marginTop: 30,
                                      marginBottom: 30,
                                      padding: 1
                                    }}
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
                                      name={[name, 'title']}
                                      // label={t(
                                      //   'manageHome.WebIntroduce.labelTitle'
                                      // )}
                                      label={`${t(
                                        'manageHome.WebIntroduce.labelTitle'
                                      )} ${index + 1} `}
                                      rules={[
                                        {
                                          required: true,
                                          message: t(
                                            'manageHome.WebIntroduce.msgTitleMissing'
                                          )
                                        }
                                      ]}
                                      labelStyle={{
                                        width: 100,
                                        marginRight: 5,
                                        textAlign: 'left'
                                      }}
                                    >
                                      <Input
                                        placeholder={t(
                                          'manageHome.WebIntroduce.holderEnterTitle'
                                        )}
                                      />
                                    </Form.Item>

                                    <Form.Item
                                      {...restField}
                                      label={t(
                                        'manageHome.WebIntroduce.labelDescription'
                                      )}
                                      name={[name, 'description']}
                                      rules={[
                                        {
                                          required: true,
                                          message: t(
                                            'manageHome.WebIntroduce.msgDescriptionMissing'
                                          )
                                        }
                                      ]}
                                      labelStyle={{
                                        width: 100,
                                        marginRight: 5,
                                        textAlign: 'left'
                                      }}
                                    >
                                      <Input
                                        placeholder={t(
                                          'manageHome.WebIntroduce.holderEnterDescription'
                                        )}
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      {...restField}
                                      label='Icon'
                                      name={[name, 'iconName']}
                                      labelStyle={{
                                        width: 100,
                                        marginRight: 5,
                                        textAlign: 'left'
                                      }}
                                    >
                                      <Select
                                        showSearch
                                        placeholder={t(
                                          'manageHome.WebIntroduce.textChosenIcon'
                                        )}
                                      >
                                        {iconNames?.map(
                                          (item: any, index: number) => (
                                            <Option
                                              key={index}
                                              value={item?.name}
                                            >
                                              {item?.name}{' '}
                                              <CustomIcon
                                                name={item?.name}
                                                color='#d35e62'
                                              />
                                            </Option>
                                          )
                                        )}
                                      </Select>
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
                                      <SysMinusSapIcon
                                        style={{ color: 'red' }}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </Row>
                          </Col>
                        ))}
                        <Col
                          span='XL2 L2 M2 S2'
                          style={{ marginTop: heightButton }}
                        >
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
                      </>
                    )}
                  </Form.List>
                </Row>
              </Col>
              <Col span='XL3 L3 M3 S3'>
                <UploadImage
                  sizeHeight={180}
                  linkImage={imageUrl}
                  setImageUrl={setImageUrl}
                  handleUploadCallback={(file: any) => {
                    formWebIntroduce.setFields([
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
                  {t('manageHome.WebIntroduce.labelBanner')}
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
              isCheck={isCheckIntroduce}
              handleSwitch={handleSwitchIntroduce}
              textOnOff='Introduce'
            />
            <ButtonAction
              onSubmit={() => onSubmitWebIntroduce()}
              onCancel={() => {
                setAllForm()
              }}
            />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default FormEstimonial
