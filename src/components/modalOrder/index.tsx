import DeclineSapIcon from '@digihcs/icons/lib/sap/DeclineSapIcon'
import { Button, Footer, messageToast, Modal } from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import moment from 'moment'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  EnumOrderStatus,
  InputOrder,
  InputProducts,
  useCancelOrder2Mutation,
  useConfirmFailedOrderMutation,
  useConfirmOrderMutation,
  useConfirmSuccessOrderMutation,
  useCreateOrder2Mutation,
  useGetOrderByIdLazyQuery,
  useShipOrderMutation,
  useUpdateOrder2Mutation
} from 'src/graphql-definition/webinfo-service.generated'
import { checkDoubleClick } from 'src/utils/function'

import FormDeliveryInformation from './formDeliveryInformation'
import FormInfo from './FormInfo'
import FormReasonCancel from './formReasonCancel'
import FormReasonFailed from './formReasonFailed'
import ModalReason from './modalReason'
import TabProducts, { TabProductsRefs } from './TabProducts'

import './index.less'

export interface ModalOrderRef {
  openModalOrder: (data?: any) => void
}

interface ModalOrderProps {
  callbackFunc?: () => void
}

const ModalOrder = React.memo(
  forwardRef<ModalOrderRef, ModalOrderProps>(({ callbackFunc }, ref) => {
    const { t } = useTranslation()

    const [visible, setVisible] = useState<boolean>(false)
    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [isView, setIsView] = useState(false)

    const [rowData, setRowData] = useState<any>([])

    const checkDoubleClickRef = useRef(null)
    const deliveryInfoRef = useRef(null)
    const formInfoRef = useRef(null)
    const formReasonCancelRef = useRef(null)
    const formReasonFailedRef = useRef(null)
    const modalReasonRef = useRef(null)
    const tabProductsRef = useRef<TabProductsRefs>(null)

    const [GetOrderById, { data }] = useGetOrderByIdLazyQuery({
      fetchPolicy: 'no-cache'
    })

    useEffect(() => {
      if (data) {
        const dataOrder = data?.getOrderById
        setSelectedOrder(dataOrder?._id ? dataOrder : {})
        if (dataOrder?.orderDetail) {
          const tempArr = dataOrder?.orderDetail?.map((item: any) => ({
            _id: item?.idStockModel,
            code: item?.stockModel?.code,
            name: item?.stockModel?.name,
            prices: item?.stockModel?.prices,
            count: item?.count,
            note: item?.note
          }))

          setRowData(tempArr)
        } else {
          setRowData([])
        }
        setTimeout(() => {
          deliveryInfoRef.current?.setDateFields(
            dataOrder?._id ? dataOrder : {}
          )
          formInfoRef.current?.setDateFields(dataOrder?._id ? dataOrder : {})
          formReasonCancelRef.current?.setDateFields(
            dataOrder?._id ? dataOrder : {}
          )
          formReasonFailedRef.current?.setDateFields(
            dataOrder?._id ? dataOrder : {}
          )
        }, 100)
      }
    }, [data])

    useImperativeHandle(ref, () => ({
      openModalOrder
    }))

    const [createOrder] = useCreateOrder2Mutation({
      onCompleted: (data) => {
        if (data?.createOrder2?._id) {
          messageToast.success({
            message: t('manageOrder.modal.msgOrderSuccess')
          })
          GetOrderById({
            variables: {
              id: data?.createOrder2?._id
            }
          })
          setIsView(true)
          callbackFunc()
        }
      },
      onError: (err) =>
        messageToast.error({
          description: t(err.message || 'manageOrder.modal.msgAnErrorOccurred'),
          message: t('manageOrder.modal.msgOrderFailed')
        })
    })

    const [updateOrder] = useUpdateOrder2Mutation({
      onCompleted: (data) => {
        if (data?.updateOrder2?._id) {
          messageToast.success({
            message: t('manageOrder.modal.msgOrderUpdateSuccessful')
          })
          GetOrderById({
            variables: {
              id: data?.updateOrder2?._id
            }
          })
          setIsView(true)
          callbackFunc()
        }
      },
      onError: (err) =>
        messageToast.error({
          description: t(err.message || 'manageOrder.modal.msgAnErrorOccurred'),
          message: t('manageOrder.modal.msgOrderUpdateFailed')
        })
    })

    const [cancelOrder] = useCancelOrder2Mutation({
      onCompleted: (data) => {
        if (data?.cancelOrder2) {
          messageToast.success({
            message: t('manageOrder.modal.msgOrderCanceledSuccessfully')
          })
          GetOrderById({
            variables: {
              id: selectedOrder?._id
            }
          })
          callbackFunc()
          modalReasonRef.current.closeModal()
        }
      },
      onError: (err) =>
        messageToast.error({
          description: t(err.message || 'manageOrder.modal.msgAnErrorOccurred'),
          message: t('manageOrder.modal.msgCancellationFailedOrder')
        })
    })

    const [confirmOrder] = useConfirmOrderMutation({
      onCompleted: (data) => {
        if (data?.confirmOrder?._id) {
          messageToast.success({
            message: t('manageOrder.modal.msgOrderConfirmSuccessfully')
          })
          GetOrderById({
            variables: {
              id: data?.confirmOrder?._id
            }
          })
          callbackFunc()
        }
      },
      onError: (err) =>
        messageToast.error({
          description: t(err.message || 'manageOrder.modal.msgAnErrorOccurred'),
          message: t('manageOrder.modal.msgOrderConfirmFailed')
        })
    })

    const [shipOrder] = useShipOrderMutation({
      onCompleted: (data) => {
        if (data?.shipOrder) {
          messageToast.success({
            message: t('manageOrder.modal.msgOrderDeliverySuccessfully')
          })
          GetOrderById({
            variables: {
              id: selectedOrder?._id
            }
          })
          callbackFunc()
        }
      },
      onError: (err) => {
        const errorApollo: any = err?.graphQLErrors?.[0]
        messageToast.error({
          description: errorApollo?.code
            ? t(`errorCode.${errorApollo?.code}`)
            : t('manageOrder.modal.msgAnErrorOccurred'),
          message: t('manageOrder.modal.msgDeliveryFailedOrder')
        })
      }
    })

    const [confirmFailedOrder] = useConfirmFailedOrderMutation({
      onCompleted: (data) => {
        if (data?.confirmFailedOrder?._id) {
          messageToast.success({
            message: t('manageOrder.modal.msgOrderUpdateSuccessful')
          })
          GetOrderById({
            variables: {
              id: selectedOrder?._id
            }
          })
          callbackFunc()
          modalReasonRef.current.closeModal()
        }
      },
      onError: (err) =>
        messageToast.error({
          description: t(err.message || 'manageOrder.modal.msgAnErrorOccurred'),
          message: t('manageOrder.modal.msgOrderUpdateFailed')
        })
    })

    const [confirmSuccessOrder] = useConfirmSuccessOrderMutation({
      onCompleted: (data) => {
        if (data?.confirmSuccessOrder?._id) {
          messageToast.success({
            message: t('manageOrder.modal.msgSuccessfulDeliveryConfirmation')
          })
          GetOrderById({
            variables: {
              id: selectedOrder?._id
            }
          })
          callbackFunc()
        }
      },
      onError: (err) =>
        messageToast.error({
          description: t(err.message || 'manageOrder.modal.msgAnErrorOccurred'),
          message: t('manageOrder.modal.msgFailedDeliveryConfirmation')
        })
    })

    const getDataFormDelivery = (value: any) => {
      checkDoubleClick(checkDoubleClickRef, handleCreateOrder, [value])
    }

    const getDataFormInfo = (value: any) => {
      const { estimatedDeliveryAt, shippingUnit, transportFee } = value
      if (estimatedDeliveryAt && shippingUnit && transportFee) {
        const input = {
          estimatedDeliveryAt: moment(estimatedDeliveryAt).valueOf(),
          shippingUnit,
          transportFee
        }
        shipOrder({
          variables: {
            _id: selectedOrder?._id,
            input: JSON.stringify(input)
          }
        })
      }
    }

    const openModalOrder = (data?: any) => {
      setVisible(true)
      setIsView(!!data?._id)
      if (data?._id) {
        setTimeout(() => {
          tabProductsRef.current.resetColumnDef()
          GetOrderById({
            variables: {
              id: data?._id
            }
          })
        }, 200)
      }
    }

    const closeModal = () => {
      setVisible(false)
      setIsView(false)
      setTimeout(() => {
        deliveryInfoRef.current.resetData()
        if (selectedOrder?._id) {
          formInfoRef.current.resetData()
          if (selectedOrder?.status === EnumOrderStatus.Canceled) {
            formReasonCancelRef.current.resetData()
          }
          if (selectedOrder?.status === EnumOrderStatus.Failed) {
            formReasonFailedRef.current.resetData()
          }
        }
        tabProductsRef.current.resetData()
        setRowData([])
        setSelectedOrder(null)
      }, 500)
    }

    const handleCreateOrder = (value: any) => {
      const products: InputProducts[] = rowData?.map((item: any) => {
        const { _id: idStockModel = '', count = 0, note = '' } = item
        return { idStockModel, count, note }
      })

      const { fullName, phoneNumber, detailAddress } = value
      if (fullName && phoneNumber && detailAddress) {
        const input: InputOrder = {
          idCustomer: value?.idCustomer,
          products,
          infoDelivery: JSON.stringify(value || {})
        }
        createOrder({ variables: { input } })
      }
    }

    const handleUpdateOrder = () => {
      const products: InputProducts[] = rowData?.map((item: any) => {
        const { _id: idStockModel = '', count = 0, note = '' } = item
        return { idStockModel, count, note }
      })

      const input: InputOrder = {
        idCustomer: selectedOrder?.idCustomer,
        products
      }

      updateOrder({ variables: { _id: selectedOrder?._id, input } })
    }

    const handleCancelOrder = (reasonCancel: string) => {
      cancelOrder({ variables: { _id: selectedOrder?._id, reasonCancel } })
    }

    const handleConfirmFailedOrder = (reasonFailed: string) => {
      confirmFailedOrder({
        variables: { id: selectedOrder?._id, reasonFailed }
      })
    }

    const handleConfirmSuccessOrder = () => {
      confirmSuccessOrder({ variables: { id: selectedOrder?._id } })
    }

    const renderOrderStatus: any = {
      AWAIT_CONFIRMATION: t('manageOrder.textAwaitConfirmation'),
      IN_PROGRESS: t('manageOrder.textInProgress'),
      SHIPPING: t('manageOrder.textShipping'),
      CANCELED: t('manageOrder.textCanceled'),
      SUCCESS: t('manageOrder.textSuccess'),
      FAILED: t('manageOrder.textFailed')
    }

    const onCreateOrder = () => {
      deliveryInfoRef.current.setDataToIndex()
    }

    const handleBtnSaveOrUpdate = () => {
      if (isView) {
        setIsView(false)
        tabProductsRef.current.resetFieldsProductTab()
      } else {
        handleUpdateOrder()
      }
    }

    const handleConfirmOrder = () => {
      confirmOrder({
        variables: {
          id: selectedOrder?._id
        }
      })
    }

    const handleCancel = () => {
      if (selectedOrder?._id) {
        deliveryInfoRef.current?.setDateFields(selectedOrder)
        formInfoRef.current?.setDateFields(selectedOrder)
        formReasonCancelRef.current?.setDateFields(selectedOrder)
        formReasonFailedRef.current?.setDateFields(selectedOrder)
        if (selectedOrder?.orderDetail) {
          const tempArr = selectedOrder?.orderDetail?.map((item: any) => ({
            _id: item?.idStockModel,
            code: item?.stockModel?.code,
            name: item?.stockModel?.name,
            prices: item?.stockModel?.prices,
            count: item?.count,
            note: item?.note
          }))
          setRowData(tempArr)
        } else {
          setRowData([])
        }
      } else {
        deliveryInfoRef.current.resetData()
        formInfoRef.current?.resetData()
        formReasonCancelRef.current?.resetData()
        formReasonFailedRef.current?.resetData()
        setSelectedOrder(null)
        setRowData([])
      }
    }

    const handleShipOrder = () => {
      formInfoRef.current.setDataToIndex()
    }

    const handleOpenModalReasonCancel = () => {
      modalReasonRef.current.openModalReason(
        t('manageOrder.modal.orderInfomation.textCancelOrder')
      )
    }

    const handleOpenModalReasonFailed = () => {
      modalReasonRef.current.openModalReason(
        t('manageOrder.modal.orderInfomation.textDeliveryFailed')
      )
    }

    const footerBtn: any = (value: any) => {
      switch (value) {
        case EnumOrderStatus.AwaitConfirmation:
          return (
            <Footer visible>
              {isView && (
                <>
                  <Button
                    iconName='decline'
                    buttonType={ButtonType.Negative}
                    onClick={handleOpenModalReasonCancel}
                  >
                    {t('manageOrder.modal.orderInfomation.btnOrderCancel')}
                  </Button>
                  <Button onClick={handleConfirmOrder}>
                    {t(
                      'manageOrder.modal.orderInfomation.btnOrderConfirmation'
                    )}
                  </Button>
                </>
              )}
              {!isView && (
                <>
                  <Button
                    iconName='decline'
                    buttonType={ButtonType.Negative}
                    onClick={handleCancel}
                  >
                    {t('manageOrder.modal.orderInfomation.btnCancel')}
                  </Button>
                </>
              )}
              <Button
                iconName={isView ? 'edit' : 'save'}
                onClick={handleBtnSaveOrUpdate}
              >
                {isView
                  ? t('manageOrder.modal.orderInfomation.btnUpdate')
                  : t('manageOrder.modal.orderInfomation.btnSave')}
              </Button>
              <Button
                buttonType={ButtonType.Neutral}
                iconName={<DeclineSapIcon />}
                onClick={closeModal}
              >
                {t('manageOrder.modal.orderInfomation.btnClose')}
              </Button>
            </Footer>
          )
        case EnumOrderStatus.InProgress:
          return (
            <Footer visible>
              <Button
                iconName='decline'
                buttonType={ButtonType.Negative}
                onClick={handleOpenModalReasonCancel}
              >
                {t('manageOrder.modal.orderInfomation.btnOrderCancel')}
              </Button>
              <Button onClick={handleShipOrder}>
                {t('manageOrder.modal.orderInfomation.btnSendShipping')}
              </Button>
              <Button
                buttonType={ButtonType.Neutral}
                iconName={<DeclineSapIcon />}
                onClick={closeModal}
              >
                {t('manageOrder.modal.orderInfomation.btnClose')}
              </Button>
            </Footer>
          )
        case EnumOrderStatus.Shipping:
          return (
            <Footer visible>
              <Button
                buttonType={ButtonType.Critical}
                onClick={handleOpenModalReasonFailed}
              >
                {t('manageOrder.modal.orderInfomation.btnDeliveryFailed')}
              </Button>
              <Button
                buttonType={ButtonType.Success}
                onClick={handleConfirmSuccessOrder}
              >
                {t('manageOrder.modal.orderInfomation.btnDeliverySuccessful')}
              </Button>
              <Button
                buttonType={ButtonType.Neutral}
                iconName={<DeclineSapIcon />}
                onClick={closeModal}
              >
                {t('manageOrder.modal.orderInfomation.btnClose')}
              </Button>
            </Footer>
          )
        case EnumOrderStatus.Success:
          return (
            <Footer visible>
              <Button
                buttonType={ButtonType.Neutral}
                iconName={<DeclineSapIcon />}
                onClick={closeModal}
              >
                {t('manageOrder.modal.orderInfomation.btnClose')}
              </Button>
            </Footer>
          )
        case EnumOrderStatus.Canceled:
          return (
            <Footer visible>
              <Button
                buttonType={ButtonType.Neutral}
                iconName={<DeclineSapIcon />}
                onClick={closeModal}
              >
                {t('manageOrder.modal.orderInfomation.btnClose')}
              </Button>
            </Footer>
          )
        case EnumOrderStatus.Failed:
          return (
            <Footer visible>
              <Button
                buttonType={ButtonType.Neutral}
                iconName={<DeclineSapIcon />}
                onClick={closeModal}
              >
                {t('manageOrder.modal.orderInfomation.btnClose')}
              </Button>
            </Footer>
          )
        default:
          return (
            <Footer visible>
              <Button
                iconName='decline'
                buttonType={ButtonType.Negative}
                onClick={handleCancel}
              >
                {t('manageOrder.modal.orderInfomation.btnCancel')}
              </Button>
              <Button iconName='save' onClick={onCreateOrder}>
                {t('manageOrder.modal.orderInfomation.btnCreateOrder')}
              </Button>
              <Button
                buttonType={ButtonType.Neutral}
                iconName={<DeclineSapIcon />}
                onClick={closeModal}
              >
                {t('manageOrder.modal.orderInfomation.btnClose')}
              </Button>
            </Footer>
          )
      }
    }

    return (
      <Modal
        centered
        width={1250}
        visible={visible}
        onCancel={closeModal}
        title={
          selectedOrder?._id
            ? `${t('manageOrder.textOrder')} ${selectedOrder?.code} - ${
                renderOrderStatus[selectedOrder?.status]
              }`
            : t('manageOrder.modal.textNewOrder')
        }
        maskClosable={false}
        footer={footerBtn(selectedOrder?.status)}
        className={
          selectedOrder?.status &&
          (selectedOrder?.status === EnumOrderStatus.Failed ||
            selectedOrder?.status === EnumOrderStatus.Canceled)
            ? 'modal-order-special'
            : 'modal-order-normal'
        }
      >
        <div className='modal-order-content'>
          {selectedOrder?.status === EnumOrderStatus.Canceled && (
            <div
              className='form-reason-cancel-parent'
              style={{ paddingBottom: 20 }}
            >
              <FormReasonCancel
                ref={formReasonCancelRef}
                dataOrder={selectedOrder}
              />
            </div>
          )}
          {selectedOrder?.status === EnumOrderStatus.Failed && (
            <div
              className='form-reason-failed-parent'
              style={{ paddingBottom: 20 }}
            >
              <FormReasonFailed
                ref={formReasonFailedRef}
                dataOrder={selectedOrder}
              />
            </div>
          )}
          <div className='form-delivery-infomation-parent'>
            <FormDeliveryInformation
              ref={deliveryInfoRef}
              dataOrder={selectedOrder}
              getDataFormDelivery={getDataFormDelivery}
            />
          </div>
          {selectedOrder?._id && (
            <div style={{ marginTop: 10, marginBottom: 10 }}>
              <FormInfo
                ref={formInfoRef}
                dataOrder={selectedOrder}
                getDataFormInfo={getDataFormInfo}
              />
            </div>
          )}
          <div className='list-order-product'>
            <TabProducts
              ref={tabProductsRef}
              rowData={rowData}
              setRowData={setRowData}
              status={selectedOrder?.status}
              isView={isView}
            />
          </div>
        </div>
        <ModalReason
          ref={modalReasonRef}
          dataOrder={selectedOrder}
          handleCancelOrder={handleCancelOrder}
          handleConfirmFailedOrder={handleConfirmFailedOrder}
        />
      </Modal>
    )
  })
)

export default ModalOrder
