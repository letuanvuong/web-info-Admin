import DeclineSapIcon from '@digihcs/icons/lib/sap/DeclineSapIcon'
import {
  Button,
  FieldForm as Form,
  Footer,
  IconTabBar,
  Modal
} from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import moment from 'moment'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UsersWithPaginateQuery } from 'src/graphql-definition/webinfo-service.generated'

import FormProfile from './FormProfile'
import OrderHistory from './OrderHistory'

import './index.less'

type Props = {}

type Customer = UsersWithPaginateQuery['usersWithPaginate']['users'][number]
type ITabState = 'profile' | 'order-history'

export type ModalCustomerRef = {
  openModalCustomer: () => void
  setCurrentCustomer: (data: Customer) => void
}

const ModalCustomer = forwardRef<ModalCustomerRef, Props>((props, ref) => {
  const { t } = useTranslation()
  const [currentCustomer, setCurrentCustomer] = useState<Customer>()
  const [currentTab, setCurrentTab] = useState<ITabState>('profile')

  const [visible, setVisible] = useState<boolean>(false)
  const [form] = Form.useForm()
  const { resetFields } = form

  useImperativeHandle(ref, () => ({ openModalCustomer, setCurrentCustomer }))

  const closeModal = () => {
    resetFields()
    setCurrentCustomer(undefined)
    setVisible(false)
    setCurrentTab('profile')
  }

  const openModalCustomer = () => setVisible(true)

  /** used when outside change currentCustomer => auto set values into form */
  useEffect(() => {
    if (currentCustomer?.customer?._id) {
      const {
        fullName,
        gender,
        dateOfBirth,
        address,
        identityCard = {},
        phoneNumber
      } = currentCustomer.customer

      const newFormValue = {
        fullName,
        gender,
        dateOfBirth: dateOfBirth ? moment(dateOfBirth) : '',
        address,
        identityCard,
        phoneNumber
      }
      if (newFormValue.identityCard?.issuedOn) {
        newFormValue.identityCard.issuedOn = moment(
          newFormValue.identityCard.issuedOn
        ) as any
      }
      form.setFieldsValue(newFormValue)
    }
  }, [currentCustomer, form])

  return (
    <Modal
      centered
      width={687}
      footer={
        <Footer visible>
          <Button
            buttonType={ButtonType.Neutral}
            size='large'
            iconName={<DeclineSapIcon />}
            onClick={() => closeModal()}
          >
            {t('manageCustomer.modalDetailCustomer.btnClose')}
          </Button>
        </Footer>
      }
      visible={visible}
      onCancel={closeModal}
      title={t('manageCustomer.modalDetailCustomer.textCustomerDetail')}
    >
      <div className='modal-customer-content'>
        <IconTabBar
          activeKey={currentTab}
          defaultActiveKey={currentTab}
          onTabClick={(key: ITabState) => setCurrentTab(key)}
        >
          <IconTabBar.Filter
            key='profile'
            text={t('manageCustomer.modalDetailCustomer.textFile')}
          >
            <IconTabBar.Content>
              <FormProfile form={form} closeModal={closeModal} />
            </IconTabBar.Content>
          </IconTabBar.Filter>

          <IconTabBar.Filter
            key='order-history'
            text={t('manageCustomer.modalDetailCustomer.textOrderHistory')}
          >
            <IconTabBar.Content>
              <OrderHistory
                closeModal={closeModal}
                idCustomer={currentCustomer?.customer?._id}
              />
            </IconTabBar.Content>
          </IconTabBar.Filter>
        </IconTabBar>
      </div>
    </Modal>
  )
})

export default ModalCustomer
