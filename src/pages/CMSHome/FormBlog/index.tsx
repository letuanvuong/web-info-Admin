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

interface FormBlogNewProps {
  data: GetContentHomePageQuery['getContentHomePage']
  callCreateOrUpdateCMSHome: Function
}

function FormBlogNew({ data, callCreateOrUpdateCMSHome }: FormBlogNewProps) {
  const [formBlogNew] = Form.useForm()
  const { t } = useTranslation()
  const [isCheckLastest, setIsCheckLastest] = useState<boolean>(true)
  const handleSwitchLastest = useCallback(
    (checked: boolean) => {
      setIsCheckLastest(checked)

      const oldValues = data
      delete oldValues._id

      callCreateOrUpdateCMSHome({
        variables: {
          input: {
            ...oldValues,
            language:
              i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En,
            sectionBlogNew: {
              ...oldValues.sectionBlogNew,
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
      setIsCheckLastest(data?.sectionBlogNew?.isActive)
    }
  }, [data])
  const onSubmitBlogNew = () =>
    formBlogNew
      .validateFields()
      .then((values: any) => {
        const sectionBlogNew = {
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
              sectionBlogNew
            }
          }
        })
      })
      .catch((err) => console.error(err, 'err'))

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <Form
        form={formBlogNew}
        name='form-cms-home'
        className='form-cms-home'
        layout={FormLayout.Horizontal}
        initialValues={{
          title: data?.sectionBlogNew?.title || '',
          description: data?.sectionBlogNew?.description || ''
        }}
      >
        <Row>
          <Col span='XL10 L10 M10 S10'>
            <Form.Item>
              <Input hidden style={{ display: 'none' }} />
            </Form.Item>
            <Form.Item
              style={{ alignItems: 'flex-start' }}
              name='title'
              label={t('manageHome.Blog.labelTitle')}
              labelStyle={{ width: 100, marginRight: 5, textAlign: 'left' }}
              rules={[
                {
                  required: true,
                  message: t('manageHome.Blog.msgTitleMissing')
                }
              ]}
            >
              <Input placeholder={t('manageHome.Blog.holderEnterTitle')} />
            </Form.Item>

            <Form.Item
              style={{ marginTop: 10, alignItems: 'flex-start' }}
              label={t('manageHome.Blog.labelDescription')}
              name='description'
              labelStyle={{ width: 100, marginRight: 5, textAlign: 'left' }}
              rules={[
                {
                  required: true,
                  message: t('manageHome.Blog.msgDescriptionMissing')
                }
              ]}
            >
              <TextArea
                placeholder={t('manageHome.Blog.holderEnterDescription')}
                rows={3}
              />
            </Form.Item>
          </Col>
          <Col span='XL10 L10 M10 S10'>
            <Form.Item>
              <Input hidden style={{ display: 'none' }} />
            </Form.Item>
          </Col>
        </Row>
        <div
          className='w-100 position-absolute bg-white  shadow-lg p-2'
          style={{ left: 0, bottom: 0 }}
        >
          <div className='wrapper-button'>
            <ButtonHidden
              isCheck={isCheckLastest}
              handleSwitch={handleSwitchLastest}
              textOnOff='LatestNews'
            />
            <ButtonAction
              onSubmit={() => onSubmitBlogNew()}
              onCancel={() => formBlogNew.resetFields()}
            />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default FormBlogNew
