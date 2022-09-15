import { AddSapIcon, SysMinusSapIcon } from '@digihcs/icons'
import {
  Button,
  Col,
  FieldForm as Form,
  Input,
  messageToast,
  Row
} from '@digihcs/innos-ui3'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

interface OurClientProps {
  data: GetContentHomePageQuery['getContentHomePage']
  callCreateOrUpdateCMSHome: Function
}

function FormOurClient({ data, callCreateOrUpdateCMSHome }: OurClientProps) {
  const [formOurClient] = Form.useForm()
  const { t } = useTranslation()
  const [isCheckOurClient, setIsCheckOurClient] = useState<boolean>(true)
  const handleSwitchOurClient = useCallback(
    (checked: boolean) => {
      setIsCheckOurClient(checked)

      const oldValues = data
      delete oldValues._id

      callCreateOrUpdateCMSHome({
        variables: {
          input: {
            ...oldValues,
            language:
              i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
            sectionOurClient: {
              ...oldValues.sectionOurClient,
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
      setIsCheckOurClient(data?.sectionOurClient?.isActive)
    }
  }, [data])
  const onSubmitCMSHome = () =>
    formOurClient
      .validateFields()
      .then((values: any) => {
        const sectionOurClient = {
          ...values,
          isActive: true
        }
        const oldValues = data
        delete oldValues._id
        // console.log(sectionPartner)
        callCreateOrUpdateCMSHome({
          variables: {
            input: {
              ...oldValues,
              language:
                i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
              sectionOurClient
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
    title: data?.sectionOurClient?.title || '',
    ourClient: data?.sectionOurClient?.ourClient?.map((item) => ({
      isActive: true,
      avatar: item?.avatar,
      reference: item?.reference,
      fullName: item?.fullName,
      profession: item?.profession
    }))
  }

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <Form
        form={formOurClient}
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
              label={t('manageHome.OurClient.labelTitle')}
              rules={[{ required: true }]}
              labelStyle={{ width: 70, marginRight: 5 }}
            >
              <Input placeholder={t('manageHome.OurClient.holderEnterTitle')} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.List name='ourClient'>
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
                      <Row style={{ marginTop: 15 }}>
                        <Col span='XL1 L1 M1 S1'>
                          <p>Client {index + 1}</p>
                        </Col>

                        <Col span='XL2 L2 M2 S2'>
                          <UploadImage
                            linkImage={formOurClient.getFieldValue([
                              'ourClient',
                              index,
                              'avatar'
                            ])}
                            handleUploadCallback={(file: any) => {
                              formOurClient.setFields([
                                {
                                  name: ['ourClient', index, 'avatar'],
                                  value: file
                                }
                              ])
                            }}
                          />

                          <Form.Item
                            style={{ alignItems: 'flex-start' }}
                            labelStyle={{ width: 0 }}
                            name={[name, 'avatar']}
                            rules={[{ required: true }]}
                          >
                            <Input style={{ display: 'none' }} />
                          </Form.Item>
                        </Col>
                        <Col span='XL8 L8 M8 S8'>
                          <Form.Item>
                            <Input hidden style={{ display: 'none' }} />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            style={{ alignItems: 'flex-start' }}
                            label={t('manageHome.OurClient.labelReference')}
                            name={[name, 'reference']}
                            rules={[{ required: true }]}
                            labelStyle={{ width: 105, marginRight: 5 }}
                          >
                            <Input
                              placeholder={t(
                                'manageHome.OurClient.holderEnterReference'
                              )}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            style={{ alignItems: 'flex-start' }}
                            label={t('manageHome.OurClient.fullName')}
                            name={[name, 'fullName']}
                            rules={[{ required: true }]}
                            labelStyle={{ width: 105, marginRight: 5 }}
                          >
                            <Input
                              placeholder={t(
                                'manageHome.OurClient.holderFullName'
                              )}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            style={{ alignItems: 'flex-start' }}
                            label={t('manageHome.OurClient.labbelProfession')}
                            name={[name, 'profession']}
                            rules={[{ required: true }]}
                            labelStyle={{ width: 105, marginRight: 5 }}
                          >
                            <Input
                              placeholder={t(
                                'manageHome.OurClient.holderProfession'
                              )}
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
                    </Row>
                  </Col>
                ))}
                <Col span='XL2 L2 M2 S2' style={{ marginTop: 137 }}>
                  <Form.Item>
                    <Input hidden style={{ display: 'none' }} />
                  </Form.Item>
                  <Form.Item>
                    <Button iconName={<AddSapIcon />} onClick={() => add()}>
                      {t('manageHome.OurClient.textNewOurClient')}
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
              isCheck={isCheckOurClient}
              handleSwitch={handleSwitchOurClient}
              textOnOff='OurClient'
            />
            <ButtonAction
              onSubmit={() => onSubmitCMSHome()}
              onCancel={() => formOurClient.resetFields()}
            />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default FormOurClient
