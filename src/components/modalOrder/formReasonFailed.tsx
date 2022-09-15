import {
  FieldForm as Form,
  TextArea
} from '@digihcs/innos-ui3'
import { forwardRef, memo, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'

import './index.less'

interface FormReasonFailedProps {
  dataOrder?: any
}

interface FormReasonFailedRefs {
  setDateFields?: (value?: any) => void
  resetData?: () => void
}

const FormReasonFailed = memo(forwardRef<FormReasonFailedRefs, FormReasonFailedProps>((props, ref) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const setDateFields = (value: any) => {
    form.setFieldsValue({
      reasonFailed: value?.reasonFailed || ''
    })
  }

  const resetData = () => {
    form.resetFields()
  }

  useImperativeHandle(ref, () => ({
    setDateFields,
    resetData
  }))

  return (
    <Form
      form={form}
      className='form-reason-failed-order'
    >
      <div className='title-reason-failed-order'>
        <span>{t('manageOrder.modal.orderInfomation.textReasonForDeliveryFailure')}</span>
      </div>
      <div className='content-reason-failed-order' style={{ paddingTop: 5 }}>
        <Form.Item
          name='reasonFailed'
        >
          <TextArea
            style={{ height: 128, resize: 'none' }}
            readOnly
          />
        </Form.Item>
      </div>
    </Form>
  )
}))

export default FormReasonFailed
