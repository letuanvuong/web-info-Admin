import {
  Button,
  FieldForm as Form,
  Input,
  Option,
  Select
} from '@digihcs/innos-ui3'
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
  useSearchUserLazyQuery
} from 'src/graphql-definition/webinfo-service.generated'

import ModalCreateCustomer from './ModalCreateCustomer'

import './index.less'

interface FormDeliveryInformationProps {
  status?: EnumOrderStatus
  getDataFormDelivery?: (value: any) => void
  dataOrder?: any
}

interface FormDeliveryInformationRefs {
  setDataToIndex?: () => void
  setDateFields?: (value?: any) => void
  resetData?: () => void
}

const FormDeliveryInformation = memo(
  forwardRef<FormDeliveryInformationRefs, FormDeliveryInformationProps>(
    (props, ref) => {
      const { t } = useTranslation()
      const waitingUser = useRef(null)
      const modalCreateCustomer = useRef(null)
      const [users, setUser] = useState([])
      const [form] = Form.useForm()
      const { getDataFormDelivery, dataOrder } = props
      const [userSelected, setUserSelected]: any = useState({})
      const [userNew, setUserNew]: any = useState({})

      const [SearhUser, { data }] = useSearchUserLazyQuery({
        fetchPolicy: 'no-cache'
      })

      useEffect(() => {
        if (data) {
          setUser(data?.searchUser?.length ? data.searchUser : [])
        }
      }, [data])

      const onSearchUser = async (val: string) => {
        if (waitingUser.current) clearTimeout(waitingUser.current)
        waitingUser.current = setTimeout(async () => {
          SearhUser({
            variables: {
              keyword: val,
              idDefault: null,
              limit: 50
            }
          })
        }, 300)
      }

      const onChangeUser = (idUser: string) => {
        const findUser = users?.find((e) => e?._id === idUser)
        if (findUser?._id) {
          form.setFieldsValue({
            fullName:
              findUser?.customer?.deliveryAddress_Default?.fullName || '',
            phoneNumber:
              findUser?.customer?.deliveryAddress_Default?.phoneNumber || '',
            detailAddress:
              findUser?.customer?.deliveryAddress_Default?.detailAddress || ''
          })
        }
        setUserSelected(findUser?._id ? findUser : {})
      }

      const setDataToIndex = async () => {
        await form.validateFields().then((values) => {
          const { user_Id, fullName, phoneNumber, detailAddress, note } = values
          const getUserNew = users?.find((e) => e?._id === userNew?._id)
          const dataFormDelivery = {
            user_Id,
            idCustomer:
              userSelected?.customer?._id || getUserNew?.customer?._id,
            fullName,
            phoneNumber,
            detailAddress,
            note,
            deliveryOld: JSON.stringify({
              fullName:
                userSelected?.customer?.deliveryAddress_Default?.fullName || '',
              phoneNumber:
                userSelected?.customer?.deliveryAddress_Default?.phoneNumber ||
                '',
              detailAddress:
                userSelected?.customer?.deliveryAddress_Default
                  ?.detailAddress || ''
            })
          }
          getDataFormDelivery(dataFormDelivery)
        })
      }

      const setDateFields = (value: any) => {
        if (value?.customer?.user_Id) {
          SearhUser({
            variables: {
              keyword: '',
              idDefault: value?.customer?.user_Id,
              limit: 50
            }
          })
        }
        form.setFieldsValue({
          user_Id: value?.customer?.user_Id,
          fullName: value?.deliveryAddress?.fullName || '',
          phoneNumber: value?.deliveryAddress?.phoneNumber || '',
          detailAddress: value?.deliveryAddress?.detailAddress || '',
          note: value?.note || ''
        })
      }

      const resetData = () => {
        form.resetFields()
        setUser([])
        setUserSelected({})
        setUserNew({})
      }

      const handleOpenModalCreateCustomer = () => {
        modalCreateCustomer.current.openModalCreateCustomer()
      }

      const getDataUserFromModalCustomer = (value: any) => {
        SearhUser({
          variables: {
            keyword: '',
            idDefault: value?._id,
            limit: 50
          }
        })
        form.setFieldsValue({
          user_Id: value?._id
        })
        setUserNew(value)
      }

      useImperativeHandle(ref, () => ({
        setDataToIndex,
        setDateFields,
        resetData
      }))

      return (
        <>
          <Form form={form} className='form-delivery-infomation-children'>
            <div style={{ display: 'flex' }}>
              <div className='title-form-delivery-infomation'>
                <span>
                  {t('manageOrder.modal.orderInfomation.textInformation')}{' '}
                  {dataOrder?._id
                    ? t('manageOrder.modal.orderInfomation.textReceive')
                    : t('manageOrder.modal.orderInfomation.textOrder')}
                </span>
              </div>
              <div className='content-form-delivery-infomation'>
                <div className='info-account-order'>
                  <div style={{ width: 484 }}>
                    <Form.Item
                      label={t(
                        'manageOrder.modal.orderInfomation.textOrderAccount'
                      )}
                      name='user_Id'
                      controlWidth={375}
                      labelStyle={{ width: 100, marginRight: 5 }}
                    >
                      <Select
                        showSearch
                        filterOption={false}
                        optionLabelProp='label'
                        style={{ width: 375 }}
                        onSearch={onSearchUser}
                        onChange={onChangeUser}
                        onClick={() => {
                          const idDefault = form.getFieldValue('user_Id')
                          SearhUser({
                            variables: {
                              keyword: '',
                              idDefault: idDefault || null,
                              limit: 50
                            }
                          })
                        }}
                        readOnly={!!dataOrder?._id}
                      >
                        {users?.map((i: any, idx: number) => (
                          <Option
                            key={idx}
                            value={i._id}
                            label={`${i?.email} ${
                              i?.customer?.fullName
                                ? `(${i.customer.fullName})`
                                : ''
                            }`}
                          >
                            <div>{`${i?.email} ${
                              i?.customer?.fullName
                                ? `(${i.customer.fullName})`
                                : ''
                            }`}</div>
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  {!dataOrder?._id && (
                    <div>
                      <Button
                        iconName='add'
                        onClick={handleOpenModalCreateCustomer}
                      >
                        {t(
                          'manageOrder.modal.orderInfomation.textCreateAccount'
                        )}
                      </Button>
                    </div>
                  )}
                </div>
                <div style={{ marginTop: 1 }}>
                  <Form.Item
                    label={t(
                      'manageOrder.modal.orderInfomation.textNameOfConsignee'
                    )}
                    name='fullName'
                    controlWidth={490}
                    labelStyle={{ width: 100, marginRight: 5 }}
                    rules={[
                      {
                        required: true,
                        message: t(
                          'manageOrder.modal.orderInfomation.msgConsigneeNameCanNotBeLeftBlank'
                        )
                      }
                    ]}
                  >
                    <Input style={{ width: 490 }} readOnly={!!dataOrder?._id} />
                  </Form.Item>
                </div>
                <div style={{ marginTop: 1 }}>
                  <Form.Item
                    label={t(
                      'manageOrder.modal.orderInfomation.textPhoneNumber'
                    )}
                    name='phoneNumber'
                    controlWidth={490}
                    labelStyle={{ width: 100, marginRight: 5 }}
                    rules={[
                      {
                        required: true,
                        message: t(
                          'manageOrder.modal.orderInfomation.msgPhoneNumberCanNotBeLeftBlank'
                        )
                      }
                    ]}
                  >
                    <Input style={{ width: 490 }} readOnly={!!dataOrder?._id} />
                  </Form.Item>
                </div>
                <div style={{ marginTop: 1 }}>
                  <Form.Item
                    label={t('manageOrder.modal.orderInfomation.textAddress')}
                    name='detailAddress'
                    controlWidth={490}
                    labelStyle={{ width: 100, marginRight: 5 }}
                    rules={[
                      {
                        required: true,
                        message: t(
                          'manageOrder.modal.orderInfomation.msgAddressCanNotBeLeftBlank'
                        )
                      }
                    ]}
                  >
                    <Input style={{ width: 490 }} readOnly={!!dataOrder?._id} />
                  </Form.Item>
                </div>
                <div style={{ marginTop: 1 }}>
                  <Form.Item
                    label={t('manageOrder.modal.orderInfomation.textNote')}
                    name='note'
                    controlWidth={490}
                    labelStyle={{ width: 100, marginRight: 5 }}
                  >
                    <Input style={{ width: 490 }} readOnly={!!dataOrder?._id} />
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
          <ModalCreateCustomer
            ref={modalCreateCustomer}
            setDataUserFromModalCustomer={getDataUserFromModalCustomer}
          />
        </>
      )
    }
  )
)

export default FormDeliveryInformation
