import {
  Calendar,
  FieldForm as Form,
  Input,
  Option,
  Select
} from '@digihcs/innos-ui3'
import moment from 'moment'
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  EnumOrderStatus,
  useSearchStaffLazyQuery
} from 'src/graphql-definition/webinfo-service.generated'

import './index.less'

interface FormInfoProps {
  dataOrder?: any
  getDataFormInfo?: (value?: any) => void
}

interface FormInfoRefs {
  setDataToIndex?: () => void
  setDateFields?: (value?: any) => void
  resetData?: () => void
}

const FormInfo = memo(
  forwardRef<FormInfoRefs, FormInfoProps>((props, ref) => {
    const { t } = useTranslation()
    const [form] = Form.useForm()
    const [staffs, setStaff] = useState([])
    const waitingStaff = useRef(null)
    const { dataOrder, getDataFormInfo } = props

    const [SearchStaff, { data }] = useSearchStaffLazyQuery({
      fetchPolicy: 'no-cache'
    })

    useEffect(() => {
      if (data) {
        setStaff(data?.searchStaff?.length ? data.searchStaff : [])
      }
    }, [data])

    const onSearchStaff = async (val: string) => {
      if (waitingStaff.current) clearTimeout(waitingStaff.current)
      waitingStaff.current = setTimeout(async () => {
        SearchStaff({
          variables: {
            keyWord: val,
            idDefault: null,
            limit: 50,
            MaChucVu: null,
            idDefaults: []
          }
        })
      }, 300)
    }

    const resetData = () => {
      form.resetFields()
    }

    const setDataToIndex = async () => {
      await form.validateFields().then((values) => {
        const { estimatedDeliveryAt, shippingUnit, transportFee } = values
        const dataFormInfo = {
          estimatedDeliveryAt,
          shippingUnit,
          transportFee
        }
        getDataFormInfo(dataFormInfo)
      })
    }

    const setDateFields = (value: any) => {
      form.setFieldsValue({
        estimatedDeliveryAt: value?.estimatedDeliveryAt
          ? moment(value?.estimatedDeliveryAt).locale('vi')
          : undefined,
        shippingUnit: value?.shippingUnit || '',
        transportFee: value?.transportFee || ''
      })
    }

    useImperativeHandle(ref, () => ({
      resetData,
      setDataToIndex,
      setDateFields
    }))

    return (
      <Form
        form={form}
        className='form-order'
        initialValues={{
          estimatedDeliveryAt: moment().locale('vi')
        }}
      >
        <div className='content-form-order-info'>
          <div className='content-order-info'>
            <div className='title-order-info'>
              <span>
                {t('manageOrder.modal.orderInfomation.textInfomationOrder')}
              </span>
            </div>
            <div
              className='title-order-date'
              style={{ marginTop: 2, height: 32 }}
            >
              <span>
                {t('manageOrder.modal.orderInfomation.textOrderDate')}{' '}
                {dataOrder.orderedAt
                  ? moment(dataOrder.orderedAt).format('DD/MM/YYYY')
                  : ''}
              </span>
            </div>
            <div
              className='title-order-ship'
              style={{ marginTop: 1, height: 32 }}
            >
              <span>
                {t('manageOrder.modal.orderInfomation.textDeliveryDate')}{' '}
                {dataOrder.deliveryAt
                  ? moment(dataOrder.deliveryAt).format('DD/MM/YYYY')
                  : ''}
              </span>
            </div>
            <div style={{ marginTop: 1, display: 'none' }}>
              <Form.Item
                label={t('manageOrder.modal.orderInfomation.textHandlingStaff')}
                name='idStaff'
                controlWidth={245}
                labelStyle={{ width: 96, marginRight: 12 }}
              >
                <Select
                  showSearch
                  filterOption={false}
                  optionLabelProp='label'
                  style={{ width: 245 }}
                  onSearch={onSearchStaff}
                  onClick={() => {
                    const idDefault = form.getFieldValue('idStaff')
                    SearchStaff({
                      variables: {
                        keyWord: '',
                        idDefault: idDefault || null,
                        limit: 50,
                        MaChucVu: null,
                        idDefaults: []
                      }
                    })
                  }}
                  readOnly={!(dataOrder?.status === EnumOrderStatus.InProgress)}
                >
                  {staffs?.map((i: any, idx: number) => (
                    <Option key={idx} value={i._id} label={i.TenNhanVien}>
                      <div>{i.TenNhanVien}</div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className='content-shipping-info'>
            <div className='title-shipping-info'>
              <span>
                {t('manageOrder.modal.orderInfomation.textShippingInformation')}
              </span>
            </div>
            <div className='title-order-date' style={{ marginTop: 2 }}>
              <Form.Item
                label={t(
                  'manageOrder.modal.orderInfomation.textEstimatedDeliveryDate'
                )}
                name='estimatedDeliveryAt'
                controlWidth={130}
                labelStyle={{ width: 115, marginRight: 5 }}
                rules={[
                  {
                    required: true,
                    message: t(
                      'manageOrder.modal.orderInfomation.msgEstimatedDeliveryDateCanNotBeLeftBlank'
                    )
                  }
                ]}
              >
                <Calendar.DatePicker
                  showTime
                  format='DD/MM/YYYY'
                  placeholder=''
                  style={{ width: 130 }}
                  readOnly={!(dataOrder?.status === EnumOrderStatus.InProgress)}
                />
              </Form.Item>
            </div>
            <div className='title-order-ship' style={{ marginTop: 1 }}>
              <Form.Item
                label={t('manageOrder.modal.orderInfomation.textShippingUnit')}
                name='shippingUnit'
                controlWidth={485}
                labelStyle={{ width: 115, marginRight: 5 }}
                rules={[
                  {
                    required: true,
                    message: t(
                      'manageOrder.modal.orderInfomation.msgShippingUnitCanNotBeLeftBlank'
                    )
                  }
                ]}
              >
                <Input
                  style={{ width: 485 }}
                  readOnly={!(dataOrder?.status === EnumOrderStatus.InProgress)}
                />
              </Form.Item>
            </div>
            <div style={{ marginTop: 1 }}>
              <Form.Item
                label={t('manageOrder.modal.orderInfomation.textTransportFee')}
                name='transportFee'
                controlWidth={485}
                labelStyle={{ width: 115, marginRight: 5 }}
                rules={[
                  {
                    required: true,
                    message: t(
                      'manageOrder.modal.orderInfomation.msgTransportFeeCanNotBeLeftBlank'
                    )
                  }
                ]}
              >
                <Input.Number
                  style={{ width: 485 }}
                  readOnly={!(dataOrder?.status === EnumOrderStatus.InProgress)}
                  min={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    )
  })
)

export default FormInfo
