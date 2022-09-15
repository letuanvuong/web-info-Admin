import { Calendar, FieldForm as Form, Input, Radio } from '@digihcs/innos-ui3'
import { FormInstance } from '@digihcs/innos-ui3/lib/field-form/interface'
import { FormLabelAlign } from '@digihcs/util/lib/enums/FormLabelAlign'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { useTranslation } from 'react-i18next'
import { EnumGender } from 'src/graphql-definition/webinfo-service.generated'

import './index.less'

interface FormProfileProps {
  form: FormInstance
  closeModal: () => void
}

const FormProfile = ({ form, closeModal }: FormProfileProps) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form
        form={form}
        layout={FormLayout.Vertical}
        labelAlign={FormLabelAlign.Left}
        className='form-customer-profile'
      >
        <Form.Item
          className='form-item'
          name='fullName'
          label={t('manageCustomer.modalDetailCustomer.textFullName')}
        >
          <Input readOnly />
        </Form.Item>

        <div className='two-col'>
          <Form.Item
            style={{ width: '40%' }}
            className='form-item'
            name='gender'
            label={t('manageCustomer.modalDetailCustomer.textGender')}
          >
            <Radio.Group disabled>
              <Radio value={EnumGender.Male}>
                {t('manageCustomer.modalDetailCustomer.textMale')}
              </Radio>
              <Radio value={EnumGender.Female}>
                {t('manageCustomer.modalDetailCustomer.textFemale')}
              </Radio>
              <Radio value={EnumGender.Other}>
                {t('manageCustomer.modalDetailCustomer.textOther')}
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            style={{ width: '55%' }}
            className='form-item'
            name='dateOfBirth'
            label={t('manageCustomer.modalDetailCustomer.textDateOfBirth')}
          >
            <Calendar.DatePicker readOnly placeholder='' />
          </Form.Item>
        </div>

        <Form.Item
          className='form-item'
          name='address'
          label={t('manageCustomer.modalDetailCustomer.textAddress')}
        >
          <Input readOnly />
        </Form.Item>

        <div className='two-col'>
          <Form.Item
            style={{ width: '40%' }}
            className='form-item'
            name={['identityCard', 'idNo']}
            label={t(
              'manageCustomer.modalDetailCustomer.textIdentityCardNumber'
            )}
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            style={{ width: '55%' }}
            className='form-item'
            name={['identityCard', 'issuedOn']}
            label={t('manageCustomer.modalDetailCustomer.textDateOfIssue')}
          >
            <Calendar.DatePicker readOnly placeholder='' />
          </Form.Item>
        </div>

        <Form.Item
          className='form-item'
          name={['identityCard', 'issuedBy']}
          label={t('manageCustomer.modalDetailCustomer.textPlaceOfIssue')}
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          className='form-item'
          name='phoneNumber'
          label={t('manageCustomer.modalDetailCustomer.textPhoneNumber')}
        >
          <Input readOnly />
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormProfile
