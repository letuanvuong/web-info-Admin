import {
  AddSapIcon,
  DeclineSapIcon,
  SaveSapIcon,
  SysMinusSapIcon
} from '@digihcs/icons'
import {
  Button,
  Col,
  FieldForm as Form,
  Input,
  messageToast,
  Option,
  Row,
  Select
} from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import React, { forwardRef, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import * as Icons from 'react-icons/all.d'
import i18n from 'src/config/i18n'
import {
  EnumLanguage,
  useCreateOrUpdateContentContactMutation,
  useCreateOrUpdateContentFooterMutation,
  useCreateOrUpdateContentMenuMutation,
  useGetContentContactQuery,
  useGetContentFooterQuery,
  useGetContentMenuQuery
} from 'src/graphql-definition/webinfo-service.generated'
import { reducer } from 'src/utils/function'
import iconNames from 'src/utils/icons'

import { SettingProps, SettingRef } from './interface'
import UploadImage from './uploadImage'

import './index.less'

const FormContact = React.memo(
  forwardRef<SettingRef, SettingProps>(() => {
    const [state, setState] = useReducer(reducer, {
      data: []
    })
    const [form] = Form.useForm()
    const { t } = useTranslation()

    const { data: dataContentFooter, refetch: refetchContentFooter } =
      useGetContentFooterQuery({
        fetchPolicy: 'network-only',
        variables: {
          language: i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En
        }
      })
    const { data: dataContentMenu, refetch: refetchContentMenu } =
      useGetContentMenuQuery({
        fetchPolicy: 'network-only',
        variables: {
          language: i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En
        }
      })

    const { data, refetch } = useGetContentContactQuery({
      fetchPolicy: 'network-only',
      variables: {
        language: i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En
      }
    })

    useEffect(() => {
      if (
        data?.getContentContact &&
        dataContentFooter?.getContentFooter &&
        dataContentMenu?.getContentMenu
      ) {
        form.setFieldsValue({
          ...data?.getContentContact,
          description: dataContentFooter?.getContentFooter?.description || '',
          linkLogo: dataContentFooter?.getContentFooter?.linkLogo || {},
          linkLogoMenu: dataContentMenu?.getContentMenu?.linkLogo || {},
          linkFavicon: dataContentMenu?.getContentMenu?.linkFavicon || {}
        })
        setState({
          dataContentContact: data?.getContentContact?._id
            ? data?.getContentContact
            : {},
          dataContentFooter: dataContentFooter?.getContentFooter?._id
            ? dataContentFooter?.getContentFooter
            : {},
          dataContentMenu: dataContentMenu?.getContentMenu?._id
            ? dataContentMenu?.getContentMenu
            : {}
        })
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      data?.getContentContact,
      dataContentFooter?.getContentFooter,
      dataContentMenu?.getContentMenu
    ])

    const [callCreateOrUpdateContentContact] =
      useCreateOrUpdateContentContactMutation({
        fetchPolicy: 'no-cache'
      })
    const [callCreateOrUpdateContentFooter] =
      useCreateOrUpdateContentFooterMutation({
        fetchPolicy: 'no-cache'
      })
    const [callCreateOrUpdateContentMenu] =
      useCreateOrUpdateContentMenuMutation({
        fetchPolicy: 'no-cache'
      })

    const onSubmitContentContact = () =>
      form
        .validateFields()
        .then((values: any) => {


          const inputContentContact = {
            language:
              i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
            detailAddress: values?.detailAddress.map((item: string) => item) || '',
            hotline: values?.hotline || '',
            phoneNumber: values?.phoneNumber || '',
            email: values?.email || '',
            socials:
              values?.socials.map((item: any) => {
                item.iconNameFooter = item.iconNameHeader
                return item
              }) || {}
          }

          const inputContentFooter = {
            language:
              i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
            description: values.description,
            linkLogo: values.linkLogo
          }
          const inputContentMenu = {
            language:
              i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
            linkLogo: values.linkLogoMenu,
            linkFavicon: values.linkFavicon
          }
          Promise.all([
            callCreateOrUpdateContentContact({
              variables: {
                input: inputContentContact
              }
            }),
            callCreateOrUpdateContentFooter({
              variables: {
                input: inputContentFooter
              }
            }),
            callCreateOrUpdateContentMenu({
              variables: {
                input: inputContentMenu
              }
            })
          ])
            .then(async (values: any) => {
              const dataValue: any = values?.map((item: any) => item?.data)

              if (
                dataValue[0]?.createOrUpdateContentContact?._id &&
                dataValue[1]?.createOrUpdateContentFooter?._id &&
                dataValue[2]?.createOrUpdateContentMenu?._id
              ) {
                messageToast.success({
                  duration: 2,
                  message: t('setting.msgUpdateSuccess')
                })
                refetchContentMenu()
                refetch()
                refetchContentFooter()
              }
            })
            .catch((error: any) => {
              messageToast.error({
                duration: 2,
                message: t('setting.msgUpdateFailed')
              })
            })
        })
        .catch((err) => console.error(err, 'err'))

    const handleCancel = async () => {
      form.setFieldsValue({
        ...state.dataContentContact,
        description: state?.dataContentFooter?.description || '',
        linkLogo: state?.dataContentFooter?.linkLogo || {},
        linkLogoMenu: state?.dataContentMenu?.linkLogo || {},
        linkFavicon: state?.dataContentMenu?.linkFavicon || {}
      })
      setState({
        dataContentContact: state?.dataContentContact?._id
          ? state?.dataContentContact
          : {},
        dataContentFooter: state?.dataContentFooter?._id
          ? state?.dataContentFooter
          : {},
        dataContentMenu: state?.dataContentMenu?._id
          ? state?.dataContentMenu
          : {}
      })
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
    return (
      <div>
        <Form
          form={form}
          name='form-cms-setting'
          className='form-cms-setting pb-5'
          layout={FormLayout.Horizontal}
        >
          <Row>
            <Col span='XL11 L11 M11 S11'>
              <Row>
                <Col span='XL12 L12 M12 S12'>
                  <Form.Item
                    label={t('generalInformation.textTitleInfo')}
                    labelStyle={{
                      width: 80,
                      marginRight: 5,
                      textAlign: 'left'
                    }}
                  >
                    <Input style={{ display: 'none' }} />
                  </Form.Item>
                </Col>
                <Col span='XL12 L12 M12 S12'>
                  <Form.Item>
                    <Input hidden style={{ display: 'none' }} />
                  </Form.Item>
                  <Form.Item
                    name='email'
                    label={t('generalInformation.textEmail')}
                    labelStyle={{
                      width: 80,
                      marginRight: 5,
                      textAlign: 'left'
                    }}
                    rules={[
                      {
                        required: true,
                        message: t('generalInformation.msgEmailMissing')
                      }
                    ]}
                  >
                    <Input
                      placeholder={t('generalInformation.textEnterEmail')}
                    />
                  </Form.Item>

                  <Form.Item
                    name='phoneNumber'
                    label={t('generalInformation.textPhoneNumber')}
                    labelStyle={{
                      width: 80,
                      marginRight: 5,
                      textAlign: 'left'
                    }}
                    rules={[
                      {
                        required: true,
                        message: t('generalInformation.msgPhoneNumberMissing')
                      }
                    ]}
                  >
                    <Input
                      placeholder={t('generalInformation.textEnterPhoneNumber')}
                    />
                  </Form.Item>


                  <Form.Item
                    name='hotline'
                    label={t('generalInformation.textHotline')}
                    labelStyle={{
                      width: 80,
                      marginRight: 5,
                      textAlign: 'left'
                    }}
                    rules={[
                      {
                        required: true,
                        message: t('generalInformation.msgHotlineMissing')
                      }
                    ]}
                  >
                    <Input
                      placeholder={t('generalInformation.textEnterHotline')}
                    />
                  </Form.Item>
                </Col>



                <Col span='XL12 L12 M12 S12'>
                  <Form.Item
                    label={t('generalInformation.textAddress')}
                    labelStyle={{
                      width: 100,
                      marginRight: 5,
                      textAlign: 'left'
                    }}
                  >
                    <Input style={{ display: 'none' }} />
                  </Form.Item>
                </Col>

                <Col span='XL12 L12 M12 S12' style={{ marginBottom: 0 }}>

                  <Form.List name='detailAddress'>
                    {(fields, { add, remove }) => (
                      <Row>
                        {fields.map(({ key, name, ...restField }, index) => (<Col
                          key={key}
                          style={{
                            marginLeft: -8,
                            marginRight: -8,
                            marginBottom: 0
                          }}
                          span='XL10 L10 M10 S10'
                        >
                          <Row key={`${name}-${index}`}>
                            <Col
                              style={{
                                padding: 1,
                                marginLeft: -8,
                                marginBottom: 0
                              }}
                              span='XL11 L11 M11 S11'
                            >
                              <Form.Item>
                                <Input hidden style={{ display: 'none' }} />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={name}
                                label={t('generalInformation.textAddress')}
                                labelStyle={{
                                  width: 80,
                                  marginRight: 5,
                                  textAlign: 'left'
                                }}
                                rules={[
                                  {
                                    required: true,
                                    message: t('generalInformation.msgAddressMissing')
                                  }
                                ]}
                              >
                                <Input
                                  placeholder={t('generalInformation.textEnterAddress')}
                                />
                              </Form.Item>
                            </Col>

                            <Col
                              span='XL1 L1 M1 S1'
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 0
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

                        </Col>)
                        )}

                        <Col span='XL2 L2 M2 S2' style={{ marginTop: 5 }}>
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

                </Col>




                <Col span='XL12 L12 M12 S12'>
                  <Form.Item
                    label={t('generalInformation.textTitleSocials')}
                    labelStyle={{
                      width: 100,
                      marginRight: 5,
                      textAlign: 'left'
                    }}
                  >
                    <Input style={{ display: 'none' }} />
                  </Form.Item>
                </Col>

                <Col span='XL12 L12 M12 S12' style={{ marginBottom: 0 }}>
                  <Form.Item>
                    <Input hidden style={{ display: 'none' }} />
                  </Form.Item>
                  <Form.List name='socials'>

                    {(fields, { add, remove }) => (
                      <Row>
                        {fields.map(({ key, name, ...restField }, index) => (
                          <Col
                            style={{
                              marginLeft: -8,
                              marginRight: -8,
                              marginBottom: 0
                            }}
                            key={key}
                            span='XL10 L10 M10 S10'
                          >
                            <Row key={`${name}-${index}`}>
                              <Col
                                span='XL6 L6 M6 S6'
                                style={{
                                  padding: 1,
                                  marginLeft: -8,
                                  marginBottom: 0
                                }}
                              >
                                <Form.Item>
                                  <Input hidden style={{ display: 'none' }} />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  label='Icon'
                                  name={[name, 'iconNameHeader']}
                                  labelStyle={{
                                    width: 100,
                                    marginRight: 5,
                                    textAlign: 'left'
                                  }}
                                >
                                  <Select showSearch placeholder='Icon'>
                                    {iconNames?.map(
                                      (item: any, index: number) => (
                                        <Option key={index} value={item?.name}>
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
                                style={{
                                  marginLeft: -8,
                                  marginBottom: 0
                                }}
                                span='XL5 L5 M5 S5'
                              >
                                <Form.Item>
                                  <Input hidden style={{ display: 'none' }} />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'link']}
                                  // label={t(
                                  //   'manageHome.WebIntroduce.labelTitle'
                                  // )}
                                  label={`${t('generalInformation.textLink')} 
                                  `}
                                  rules={[
                                    {
                                      required: true,
                                      message: t(
                                        'generalInformation.msgLinkMissing'
                                      )
                                    }
                                  ]}
                                  labelStyle={{
                                    width: 40,
                                    marginRight: 5,
                                    textAlign: 'left',
                                    marginLeft: 30
                                  }}
                                >
                                  <Input
                                    placeholder={t(
                                      'generalInformation.holderLink'
                                    )}
                                  />
                                </Form.Item>
                              </Col>

                              <Col
                                span='XL1 L1 M1 S1'
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginBottom: 0
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
                          </Col>
                        ))}
                        <Col span='XL2 L2 M2 S2' style={{ marginTop: 5 }}>
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
                </Col>

                <Col span='XL12 L12 M12 S12'>
                  <Form.Item
                    label={t('generalInformation.textFooterIntro')}
                    labelStyle={{
                      width: 150,
                      marginRight: 5,
                      textAlign: 'left'
                    }}
                  >
                    <Input style={{ display: 'none' }} />
                  </Form.Item>
                </Col>
                <Col span='XL12 L12 M12 S12'>
                  <Form.Item>
                    <Input hidden style={{ display: 'none' }} />
                  </Form.Item>
                  <Form.Item
                    name='description'
                    label={t('generalInformation.textDescription')}
                    labelStyle={{
                      width: 80,
                      marginRight: 5,
                      textAlign: 'left'
                    }}
                  >
                    <Input
                      placeholder={t('generalInformation.textEnterDescription')}
                    />
                  </Form.Item>
                </Col>
                <Col span='XL12 L12 M12 S12'>
                  <Form.Item
                    label={t('generalInformation.textTitleLogo')}
                    labelStyle={{
                      width: 100,
                      marginRight: 5,
                      textAlign: 'left'
                    }}
                  >
                    <Input style={{ display: 'none' }} />
                  </Form.Item>
                </Col>
                <Col span='XL12 L12 M12 S12'>
                  <Form.Item>
                    <Input hidden style={{ display: 'none' }} />
                  </Form.Item>
                  <Form.Item
                    labelStyle={{
                      width: 100,
                      marginRight: 5
                    }}
                  >
                    <Row style={{ paddingLeft: 68 }}>
                      <Col span='XL4 L4 M4 S4'>
                        <UploadImage
                          linkImage={form.getFieldValue(['linkLogoMenu'])}
                          handleUploadCallback={(file: any) => {
                            form.setFields([
                              {
                                name: 'linkLogoMenu',
                                value: file
                              }
                            ])
                          }}
                        />
                        <Form.Item
                          style={{ alignItems: 'flex-start' }}
                          labelStyle={{ width: 0 }}
                          name='linkLogoMenu'
                          rules={[
                            {
                              required: true,
                              message: t(
                                'generalInformation.msgLogoMenuMissing'
                              )
                            }
                          ]}
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
                          {t('generalInformation.textHeaderLogo')}
                        </p>
                      </Col>
                      <Col span='XL4 L4 M4 S4'>
                        <UploadImage
                          linkImage={form.getFieldValue(['linkLogo'])}
                          handleUploadCallback={(file: any) => {
                            form.setFields([
                              {
                                name: 'linkLogo',
                                value: file
                              }
                            ])
                          }}
                        />
                        <Form.Item
                          style={{ alignItems: 'flex-start' }}
                          labelStyle={{ width: 0 }}
                          name='linkLogo'
                          rules={[
                            {
                              required: true,
                              message: t(
                                'generalInformation.msgHeaderLogoMissing'
                              )
                            }
                          ]}
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
                          {t('generalInformation.textFooterLogo')}
                        </p>
                      </Col>
                      <Col span='XL4 L4 M4 S4'>
                        <UploadImage
                          linkImage={form.getFieldValue(['linkFavicon'])}
                          handleUploadCallback={(file: any) => {
                            form.setFields([
                              {
                                name: 'linkFavicon',
                                value: file
                              }
                            ])
                          }}
                        />
                        <Form.Item
                          style={{ alignItems: 'flex-start' }}
                          labelStyle={{ width: 0 }}
                          name='linkFavicon'
                          rules={[
                            {
                              required: true,
                              message: t(
                                'generalInformation.msgFooterLogoMissing'
                              )
                            }
                          ]}
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
                          {t('generalInformation.textFavLogo')}
                        </p>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <div
            className='w-100 position-absolute bg-white  shadow-lg p-2'
            style={{
              left: 0,
              bottom: 0,
              display: 'flex',

              marginTop: 20,
              justifyContent: 'flex-end'
            }}
          >
            <div>
              <Button
                iconName={<DeclineSapIcon />}
                buttonType={ButtonType.Negative}
                style={{ marginRight: 10, minWidth: 70 }}
                onClick={handleCancel}
              >
                {t('setting.btnCancel')}
              </Button>

              <Button
                style={{ minWidth: 70 }}
                iconName={<SaveSapIcon />}
                onClick={onSubmitContentContact}
              >
                {t('setting.btnSave')}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    )
  })
)

export default FormContact
