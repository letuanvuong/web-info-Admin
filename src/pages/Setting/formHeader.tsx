import { DeclineSapIcon, SaveSapIcon } from '@digihcs/icons'
import {
  Button,
  Col,
  FieldForm as Form,
  Input,
  messageToast,
  Row
} from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import React, { forwardRef, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from 'src/config/i18n'
import {
  EnumLanguage,
  useCreateOrUpdateContentMenuMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { reducer } from 'src/utils/function'

import { SettingProps, SettingRef } from './interface'
import UploadImage from './uploadImage'

const FormHeader = React.memo(
  forwardRef<SettingRef, SettingProps>((props) => {
    const [state, setState] = useReducer(reducer, {
      dataContentMenu: {}
    })
    const [form] = Form.useForm()
    const { t } = useTranslation()
    const { dataFormHeader, callBack } = props

    useEffect(() => {
      if (dataFormHeader?.getContentMenu) {
        form.setFieldsValue({
          imageLogoContentMenu: dataFormHeader.getContentMenu?.linkLogo || {},
          imageFaviconContentMenu:
            dataFormHeader.getContentMenu?.linkFavicon || {},
          description: dataFormHeader.getContentMenu?.description || ''
        })
        setState({
          dataContentMenu: dataFormHeader.getContentMenu?._id
            ? dataFormHeader.getContentMenu
            : {}
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataFormHeader])

    const [callCreateOrUpdateContentMenu] =
      useCreateOrUpdateContentMenuMutation({
        fetchPolicy: 'no-cache',
        onCompleted: async (data) => {
          if (data?.createOrUpdateContentMenu?._id) {
            messageToast.success({
              duration: 2,
              message: t('common.notiUpdateSuccess')
            })
            callBack()
          }
        },
        onError: (error) => {
          messageToast.error({
            duration: 2,
            message: t('common.notiUpdateFailed')
          })
        }
      })

    const onSubmitContentMenu = () =>
      form
        .validateFields()
        .then((values: any) => {
          const input = {
            linkLogo: values.imageLogoContentMenu || {},
            linkFavicon: values.imageFaviconContentMenu || {},
            language:
              i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
            description: values.description || ''
          }
          callCreateOrUpdateContentMenu({
            variables: {
              input
            }
          })
        })
        .catch(() => {
          messageToast.error({
            duration: 2,
            message: t('error.error_appear')
          })
        })

    const handleCancel = () => {
      form.setFieldsValue({
        imageLogoContentMenu: state.dataContentMenu?.linkLogo || {},
        imageFaviconContentMenu: state.dataContentMenu?.linkFavicon || {},
        description: state.dataContentMenu?.description || ''
      })
      setState({
        dataContentMenu: state.dataContentMenu?._id ? state.dataContentMenu : {}
      })
    }

    return (
      <Form
        form={form}
        name='form-cms-setting'
        className='form-cms-setting'
        layout={FormLayout.Horizontal}
        initialValues={{
          imageLogoContentMenu: state.dataContentMenu?.linkLogo || {},
          imageFaviconContentMenu: state.dataContentMenu?.linkFavicon || {}
        }}
      >
        <Row>
          <Col span='XL3 L3 M3 S3'>
            <Row>
              <Col span='XL1 L1 M1 S1'>
                <h6
                  style={{
                    fontWeight: 400,
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  Logo
                </h6>
                <Form.Item
                  labelStyle={{ width: 0 }}
                  name='imageLogoContentMenu'
                >
                  <Input hidden style={{ display: 'none' }} />
                </Form.Item>
              </Col>

              <Col span='XL2 L2 M2 S2'>
                <UploadImage
                  linkImage={form.getFieldValue(['imageLogoContentMenu'])}
                  handleUploadCallback={(file: any) => {
                    form.setFields([
                      {
                        name: 'imageLogoContentMenu',
                        value: file
                      }
                    ])
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span='XL1 L1 M1 S1'>
                <h6
                  style={{
                    fontWeight: 400,
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  Favicon
                </h6>
                <Form.Item
                  labelStyle={{ width: 0 }}
                  name='imageFaviconContentMenu'
                >
                  <Input hidden style={{ display: 'none' }} />
                </Form.Item>
              </Col>

              <Col span='XL2 L2 M2 S2'>
                <UploadImage
                  linkImage={form.getFieldValue(['imageFaviconContentMenu'])}
                  handleUploadCallback={(file: any) => {
                    form.setFields([
                      {
                        name: 'imageFaviconContentMenu',
                        value: file
                      }
                    ])
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col span='XL7 L7 M7 S7'>
            <Row>
              <Form.Item
                label={t('generalInformation.textImageDescription')}
                name='description'
                controlWidth={40}
                labelStyle={{ width: 80, marginRight: 5 }}
              >
                <Input
                  placeholder={t(
                    'generalInformation.textEnterImageDescription'
                  )}
                />
              </Form.Item>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span='XL10 L10 M10 S10'>
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
                  onClick={handleCancel}
                >
                  {t('setting.btnCancel')}
                </Button>

                <Button
                  style={{ minWidth: 70 }}
                  iconName={<SaveSapIcon />}
                  onClick={onSubmitContentMenu}
                >
                  {t('setting.btnSave')}
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  })
)

export default FormHeader
