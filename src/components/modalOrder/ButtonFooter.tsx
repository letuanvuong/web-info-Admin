import {
  AcceptSapIcon,
  PrintSapIcon,
  SaveSapIcon,
  SendHisIcon
} from '@digihcs/icons'
import DeclineSapIcon from '@digihcs/icons/lib/sap/DeclineSapIcon'
import {
  Button,
  Col,
  FieldForm as Form,
  Input,
  messageToast,
  Modal,
  Row
} from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
import { FormLabelAlign } from '@digihcs/util/lib/enums/FormLabelAlign'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { forwardRef, memo, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'
import {
  EnumOrderStatus,
  OrdersWithPaginateQuery
} from 'src/graphql-definition/webinfo-service.generated'

import './index.less'

type IData = OrdersWithPaginateQuery['ordersWithPaginate']['orders'][number]

interface IFormValues {
  reasonCancel: string
}
interface ButtonFooterProps {
  isEdit: boolean
  selectedOrder: IData
  onSubmit: () => void
  closeModal: () => void
  onSuccess: () => void
  onShipping: () => void
  onCancel: (_id: string, reasonCancel: string) => void
}

export interface ButtonFooterRefs {
  resetFieldCancelReason: Function
}

const ButtonFooter = memo(
  forwardRef<ButtonFooterRefs, ButtonFooterProps>(
    (
      {
        isEdit,
        onCancel,
        onSubmit,
        closeModal,
        onSuccess,
        onShipping,
        selectedOrder
      },
      ref
    ) => {
      const { t } = useTranslation()
      const [cancelForm] = Form.useForm()

      const { validateFields, resetFields } = cancelForm

      /** TODO: refactor */
      const isShipping = selectedOrder?.status === EnumOrderStatus.Shipping
      const isSuccess = selectedOrder?.status === EnumOrderStatus.Success
      const isCancel = selectedOrder?.status === EnumOrderStatus.Canceled

      useImperativeHandle(ref, () => ({ resetFieldCancelReason: resetFields }))

      const openModalWarningUpdateOrderStatus = () =>
        Modal.confirm({
          cancelText: t('manageOrder.modal.product.btnCancel'),
          okText: t('manageOrder.modal.product.btnConfirm'),
          onOk: onSuccess,
          type: ConfirmType.Warning,
          title: t(
            'manageOrder.modal.product.msgConfirmDeliveryOfThisOrderToTheCustomer'
          ),
          content: t(
            'manageOrder.modal.product.msgMakeSureTheCustomerHasFullyReceivedThisOrderBeforeUpdatingTheStatus'
          )
        })

      const _renderGroupButtonDefault = (
        <>
          <Button
            size='large'
            onClick={onSubmit}
            iconName={<SaveSapIcon />}
            style={{ marginRight: '16px' }}
            buttonType={ButtonType.Default}
          >
            {t('manageOrder.modal.product.btnCreateOrder')}
          </Button>

          <Button
            size='large'
            onClick={closeModal}
            iconName={<DeclineSapIcon />}
            buttonType={ButtonType.Neutral}
          >
            {t('manageOrder.modal.product.btnClose')}
          </Button>
        </>
      )

      const _renderGroupButtonEdit = (
        <>
          {/* TODO: In đơn */}
          <Button
            size='large'
            onClick={() =>
              Modal.confirm({
                title: t('manageOrder.modal.product.textNotitfication'),
                content: t(
                  'manageOrder.modal.product.textThisFunctionIsNotAvailableYet'
                )
              })
            }
            iconName={<PrintSapIcon />}
            style={{ marginRight: '16px' }}
            buttonType={ButtonType.Default}
          >
            {t('manageOrder.modal.product.textOrderPrint')}
          </Button>

          <Button
            size='large'
            iconName={<AcceptSapIcon />}
            style={{ marginRight: '16px' }}
            buttonType={ButtonType.Default}
            onClick={openModalWarningUpdateOrderStatus}
            disabled={isSuccess || isCancel}
          >
            {t('manageOrder.modal.product.textDelivered')}
          </Button>

          {/* TODO: Gửi vận chuyển */}
          <Button
            size='large'
            // onClick={() =>
            //   Modal.confirm({
            //     title: 'Thống báo',
            //     content: 'Chức năng hiện chưa có'
            //   })
            // }
            onClick={onShipping}
            iconName={<SendHisIcon />}
            style={{ marginRight: '16px' }}
            buttonType={ButtonType.Default}
            disabled={isShipping || isSuccess || isCancel}
          >
            {t('manageOrder.modal.product.textSendShipping')}
          </Button>

          <Button
            size='large'
            onClick={() =>
              Modal.confirm({
                title: t('manageOrder.modal.product.textNotitfication'),
                type: ConfirmType.Warning,
                onOk: handleCancelOrder,
                cancelText: t('manageOrder.modal.product.btnCancel'),
                okText: t('manageOrder.modal.product.btnConfirm'),
                content: (
                  <div
                    style={{
                      gap: 15,
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    <span>
                      {t(
                        'manageOrder.modal.product.textEnterAReasonIfYouWantToCancelYourOrder'
                      )}
                    </span>

                    <Form
                      form={cancelForm}
                      className='form-order'
                      layout={FormLayout.Vertical}
                      labelAlign={FormLabelAlign.Left}
                      initialValues={{ reasonCancel: '' }}
                    >
                      <Row>
                        <Col span='XL12 L12 M12 S12'>
                          <Form.Item
                            name='reasonCancel'
                            className='form-item'
                            labelStyle={{ width: 0 }}
                          >
                            <Input
                              placeholder={t(
                                'manageOrder.modal.product.textEnterReasone'
                              )}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                ) as any
              })
            }
            iconName={<SaveSapIcon />}
            style={{ marginRight: '16px' }}
            buttonType={ButtonType.Negative}
            disabled={isShipping || isSuccess || isCancel}
          >
            {t('manageOrder.modal.product.btnOrderCancel')}
          </Button>

          <Button
            size='large'
            onClick={onSubmit}
            iconName={<SaveSapIcon />}
            style={{ marginRight: '16px' }}
            buttonType={ButtonType.Default}
            disabled={isShipping || isSuccess || isCancel}
          >
            {t('manageOrder.modal.product.btnSave')}
          </Button>

          <Button
            size='large'
            onClick={closeModal}
            iconName={<DeclineSapIcon />}
            buttonType={ButtonType.Neutral}
          >
            {t('manageOrder.modal.product.btnClose')}
          </Button>
        </>
      )

      const handleCancelOrder = () => {
        validateFields()
          .then((values: IFormValues) =>
            onCancel(selectedOrder?._id, values?.reasonCancel)
          )
          .catch(() =>
            messageToast.error({
              message: t('manageOrder.modal.msgAnErrorOccurred')
            })
          )
      }

      return (
        <div className='btn-footer'>
          {isEdit ? _renderGroupButtonEdit : _renderGroupButtonDefault}
        </div>
      )
    }
  )
)

export default ButtonFooter
