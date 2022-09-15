import {
  Col,
  FieldForm as Form,
  Input,
  Row,
  TextArea
} from '@digihcs/innos-ui3'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { useTranslation } from 'react-i18next'
import i18n from 'src/config/i18n'
import {
  EnumLanguage,
  GetContentContactQuery
} from 'src/graphql-definition/webinfo-service.generated'

import ButtonAction from '../ButtonAction'

import '../styles.less'

interface FormSEOContactProps {
  data: GetContentContactQuery['getContentContact']
  callCreateOrUpdateContentContact: Function
}

function FormSEOContact({
  data,
  callCreateOrUpdateContentContact
}: FormSEOContactProps) {
  const [formSEOContact] = Form.useForm()
  const { t } = useTranslation()

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
      className='form-cms-home'
      layout={FormLayout.Horizontal}
      initialValues={{
        SEOTitle: data?.SEOTitle || '',
        SEODescription: data?.SEODescription || '',
        SEOKeywords: data?.SEOKeywords || ''
      }}
    >
      <Row>
        <Col span='XL10 L10 M10 S10'>
          <Form.Item>
            <Input hidden style={{ display: 'none' }} />
          </Form.Item>
          <Form.Item
            style={{ alignItems: 'flex-start' }}
            name='SEOTitle'
            label={t('manageContactUs.labelTitle')}
            labelStyle={{ width: 100, marginRight: 5, textAlign: 'left' }}
            rules={[
              {
                required: true,
                message: t('manageContactUs.msgPageTitleMissing')
              }
            ]}
          >
            <Input placeholder={t('manageContactUs.holderTitle')} />
          </Form.Item>

          <Form.Item
            style={{ alignItems: 'flex-start' }}
            label={t('manageContactUs.labelDescription')}
            name='SEODescription'
            labelStyle={{ width: 100, marginRight: 5, textAlign: 'left' }}
            rules={[
              {
                required: true,
                message: t('manageContactUs.msgDescriptionMissing')
              }
            ]}
          >
            <TextArea
              placeholder={t('manageContactUs.holderDescription')}
              rows={2}
            />
          </Form.Item>

          <Form.Item
            style={{ alignItems: 'flex-start' }}
            name='SEOKeywords'
            label={t('manageContactUs.labelKeyWork')}
            labelStyle={{ width: 100, marginRight: 5, textAlign: 'left' }}
          >
            <Input placeholder={t('manageContactUs.holderKeyWork')} />
          </Form.Item>
          <Form.Item>
            <ButtonAction
              onSubmit={() => onSubmitSEOContact()}
              onCancel={() => formSEOContact.resetFields()}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default FormSEOContact
