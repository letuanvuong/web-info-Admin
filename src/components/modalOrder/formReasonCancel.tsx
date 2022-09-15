import {
  Checkbox,
  FieldForm as Form,
  Input,
  TextArea
} from '@digihcs/innos-ui3'
import { forwardRef, memo, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'

import './index.less'

interface FormReasonCancelProps {
  dataOrder?: any
}

interface FormReasonCancelRefs {
  setDateFields?: (value?: any) => void
  resetData?: () => void
}

const FormReasonCancel = memo(forwardRef<FormReasonCancelRefs, FormReasonCancelProps>((props, ref) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const setDateFields = (value: any) => {
    if (value?.updatedBy?._id) {
      form.setFieldsValue({
        staff: value?.updatedBy?.fullName
      })
    }
    form.setFieldsValue({
      customerCancel: !!value?.customerCancelBy?._id,
      reasonCancel: value?.customerReasonCancel || value?.reasonCancel || ''
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
      className='form-reason-cancel-order'
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
          <div className='title-reason-cancel-order' style={{ width: 130, height: 32 }}>
            <span>{t('manageOrder.modal.orderInfomation.textResonOrderCancel')}</span>
          </div>
          <div>
            <Form.Item
              name='customerCancel'
              valuePropName='checked'
            >
              <Checkbox readOnly>
                {t('manageOrder.modal.orderInfomation.textCustomerCancelsOrder')}
              </Checkbox>
            </Form.Item>
          </div>
        </div>
        <div className='info-employee-cancel-order' style={{ width: '50%' }}>
          <Form.Item
            label={t('manageOrder.modal.orderInfomation.textTheStaffCancelsTheOrder')}
            name='staff'
            controlWidth={485}
            labelStyle={{ width: 118, marginRight: 5 }}
          >
            <Input style={{ width: 485 }} readOnly />
          </Form.Item>
        </div>
      </div>
      <div className='content-reason-cancel-order' style={{ paddingTop: 5 }}>
        <Form.Item
          name='reasonCancel'
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

export default FormReasonCancel
