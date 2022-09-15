import {
  Col,
  FieldForm as Form,
  Input,
  Row,
  TextArea
} from '@digihcs/innos-ui3'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from 'src/config/i18n'
import {
  EnumLanguage,
  GetContentHomePageQuery
} from 'src/graphql-definition/webinfo-service.generated'

import ButtonAction from '../ButtonAction'
import ButtonHidden from '../ButtonHidden'

import '../styles.less'

interface FormServiceProps {
  data: GetContentHomePageQuery['getContentHomePage']
  callCreateOrUpdateCMSHome: Function
}

function FormService({ data, callCreateOrUpdateCMSHome }: FormServiceProps) {
  const [formService] = Form.useForm()
  const { t } = useTranslation()
  const onSubmitService = () =>
    formService
      .validateFields()
      .then((values: any) => {
        const sectionService = {
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
              sectionService
            }
          }
        })
      })
      .catch((err) => console.error(err, 'err'))
  const [isCheckServices, setIsCheckServices] = useState<boolean>(true)
  const handleSwitchServices = useCallback(
    (checked: boolean) => {
      setIsCheckServices(checked)

      const oldValues = data
      delete oldValues._id

      callCreateOrUpdateCMSHome({
        variables: {
          input: {
            ...oldValues,
            language:
              i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
            sectionService: {
              ...oldValues.sectionService,
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
      setIsCheckServices(data?.sectionService?.isActive)
    }
  }, [data])
  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <Form
        form={formService}
        name='form-cms-home'
        className='form-cms-home'
        layout={FormLayout.Horizontal}
        initialValues={{
          title: data?.sectionService?.title || '',
          description: data?.sectionService?.description || ''
        }}
      >
        <Row>
          <Row>
            <Col span='XL10 L10 M10 S10'>
              <Form.Item>
                <Input hidden style={{ display: 'none' }} />
              </Form.Item>
              <Form.Item
                style={{ alignItems: 'flex-start' }}
                name='title'
                label={t('manageHome.Service.labelTitle')}
                labelStyle={{ width: 100, marginRight: 5, textAlign: 'left' }}
                rules={[
                  {
                    required: true,
                    message: t('manageHome.Service.msgTitleMissing')
                  }
                ]}
              >
                <Input placeholder={t('manageHome.Service.holderEnterTitle')} />
              </Form.Item>

              <Form.Item
                style={{ marginTop: 10, alignItems: 'flex-start' }}
                label={t('manageHome.Service.labelDescription')}
                name='description'
                labelStyle={{ width: 100, marginRight: 5, textAlign: 'left' }}
                rules={[
                  {
                    required: true,
                    message: t('manageHome.Service.msgDescriptionMissing')
                  }
                ]}
              >
                <TextArea
                  placeholder={t('manageHome.Service.holderEnterDescription')}
                  rows={3}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span='XL10 L10 M10 S10'>
              <Form.Item>
                <Input hidden style={{ display: 'none' }} />
              </Form.Item>
            </Col>
          </Row>
        </Row>
        <div
          className='w-100 position-absolute bg-white  shadow-lg p-2'
          style={{ left: 0, bottom: 0 }}
        >
          <div className='wrapper-button'>
            <ButtonHidden
              isCheck={isCheckServices}
              handleSwitch={handleSwitchServices}
              textOnOff='Services'
            />
            <ButtonAction
              onSubmit={() => onSubmitService()}
              onCancel={() => formService.resetFields()}
            />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default FormService
