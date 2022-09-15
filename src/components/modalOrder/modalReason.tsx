import DeclineSapIcon from '@digihcs/icons/lib/sap/DeclineSapIcon'
import {
  Button,
  FieldForm as Form,
  Footer,
  Modal,
  TextArea
} from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import React, {
  forwardRef,
  useImperativeHandle,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'

export interface ModalReasonRef {
  openModalReason: (type?: any) => void
  closeModal: () => void
}

interface ModalReasonProps {
  callbackFunc?: () => void
  handleCancelOrder?: (value?: any) => void
  handleConfirmFailedOrder?: (value?: any) => void
  dataOrder?: any
}

const ModalReason = React.memo(forwardRef<ModalReasonRef, ModalReasonProps>((props, ref) => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [type, setType] = useState('')
  const { dataOrder, handleCancelOrder, handleConfirmFailedOrder } = props

  const openModalReason = (val: string) => {
    setVisible(true)
    setType(val)
  }

  const closeModal = () => {
    form.resetFields()
    setType('')
    setVisible(false)
  }

  const handleSubmit = () => {
    const fieldReason = form.getFieldValue('reason')
    if (type === t('manageOrder.modal.orderInfomation.textCancelOrder')) {
      handleCancelOrder(fieldReason)
    }
    if (type === t('manageOrder.modal.orderInfomation.textDeliveryFailed')) {
      handleConfirmFailedOrder(fieldReason)
    }
  }

  useImperativeHandle(ref, () => ({
    openModalReason,
    closeModal
  }))

  return (
    <Modal
      centered
      width={600}
      visible={visible}
      onCancel={closeModal}
      title={`${type} ${dataOrder?.code}`}
      maskClosable={false}
      className='modal-reason-order'
      footer={
        <Footer visible>
          <Button
            iconName='accept'
            buttonType={ButtonType.Negative}
            onClick={handleSubmit}
          >
            {type === t('manageOrder.modal.orderInfomation.textCancelOrder') ? t('manageOrder.modal.orderInfomation.textCancellationConfirmation') : t('manageOrder.modal.orderInfomation.textDeliveryConfirmationFailed')}
          </Button>
          <Button
            buttonType={ButtonType.Neutral}
            iconName={<DeclineSapIcon />}
            onClick={closeModal}
          >
            {t('manageOrder.modal.orderInfomation.btnClose')}
          </Button>
        </Footer>
      }
    >
      <span style={{ fontSize: 16, fontWeight: 'bold' }}>{t('manageOrder.modal.orderInfomation.textReason')} <span style={{ textTransform: 'lowercase' }}>{type}</span></span>
      <div className='content-form-reason-order' style={{ marginTop: 5 }}>
        <Form
          form={form}
          className='form-reason-order'
        >
          <Form.Item
            name='reason'
            labelStyle={{ width: 100, marginRight: 5 }}
          >
            <TextArea style={{ height: 128, resize: 'none' }} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}))

export default ModalReason