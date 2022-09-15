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
  useCreateOrUpdateContentFooterMutation,
  useGetContentFooterQuery
} from 'src/graphql-definition/webinfo-service.generated'
import { reducer } from 'src/utils/function'

import { SettingProps, SettingRef } from './interface'
import UploadImage from './uploadImage'

const FormFooter = React.memo(
  forwardRef<SettingRef, SettingProps>(() => {
    const [state, setState] = useReducer(reducer, {
      dataContentFooter: {}
    })
    const [form] = Form.useForm()
    const { t } = useTranslation()

    const { data, refetch } = useGetContentFooterQuery({
      fetchPolicy: 'network-only',
      variables: {
        language: i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En
      }
    })

    useEffect(() => {
      if (data?.getContentFooter) {
        form.setFieldsValue({
          imageLogoContentFooter: data?.getContentFooter?.linkLogo || {},
          description: data?.getContentFooter?.description
        })
        setState({
          dataContentFooter: data?.getContentFooter?._id
            ? data?.getContentFooter
            : {}
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.getContentFooter])

    const [callCreateOrUpdateContentFooter] =
      useCreateOrUpdateContentFooterMutation({
        fetchPolicy: 'no-cache',
        onCompleted: async (data) => {
          if (data?.createOrUpdateContentFooter?._id) {
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

    const onSubmitContentFooter = () =>
      form
        .validateFields()
        .then((values: any) => {
          const input = {
            linkLogo: values.imageLogoContentFooter || {},
            description: values.description || '',
            language: i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En
          }
          callCreateOrUpdateContentFooter({
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

    const handleCancel = async () => {
      form.setFieldsValue({
        imageLogoContentFooter: state.dataContentFooter?.linkLogo || {},
        description: state.dataContentFooter?.description
      })
      setState({
        dataContentFooter: state.dataContentFooter?._id
          ? state.dataContentFooter
          : {}
      })
    }

    return (
      <Form
        form={form}
        name='form-cms-setting'
        className='form-cms-setting'
        layout={FormLayout.Horizontal}
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
                  labelStyle={{ width: 50, marginRight: 5 }}
                  name='imageLogoContentFooter'
                >
                  <Input hidden style={{ display: 'none' }} />
                </Form.Item>
              </Col>

              <Col span='XL2 L2 M2 S2'>
                <UploadImage
                  linkImage={form.getFieldValue(['imageLogoContentFooter'])}
                  handleUploadCallback={(file: any) => {
                    form.setFields([
                      {
                        name: 'imageLogoContentFooter',
                        value: file
                      }
                    ])
                  }}
                />
              </Col>
            </Row>
          </Col>

          <Col span='XL7 L7 M7 S7'>
            <Form.Item
              label={t('generalInformation.textImageDescription')}
              name='description'
              controlWidth={40}
              labelStyle={{ width: 80, marginRight: 5 }}
            >
              <Input
                placeholder={t('generalInformation.textEnterImageDescription')}
              />
            </Form.Item>
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
                  onClick={onSubmitContentFooter}
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

export default FormFooter
