import FormSapIcon from '@digihcs/icons/lib/sap/FormSapIcon'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  EnumOrderStatus,
  FilterReportInput,
  useReportTotalOrderQuery
} from 'src/graphql-definition/webinfo-service.generated'

import CardColumn from '../CardColumn/CardColumn'
import { EnumCardType } from '../CardColumn/CardColumn.d'

interface ReportTotalOrderProps {
  filter: FilterReportInput
  refresh: boolean
}

const ReportTotalOrder: React.FC<ReportTotalOrderProps> = ({
  filter,
  refresh
}) => {
  const { data, loading, refetch } = useReportTotalOrderQuery({
    fetchPolicy: 'no-cache',
    variables: {
      filter
    }
  })
  const { t } = useTranslation()

  const chartList = () => {
    const newOder = {
      title: t('dashboard.reportTotalOrder.textNewOrder'),
      quantity: 0,
      quantityColor: '#FF1010'
    }
    const deliveringOder = {
      title: t('dashboard.reportTotalOrder.textShipping'),
      quantity: 0,
      quantityColor: '#FFBC10'
    }
    const deliveredOder = {
      title: t('dashboard.reportTotalOrder.textSuccess'),
      quantity: 0,
      quantityColor: '#28A745'
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const orderType of data?.reportTotalOrder?.totalOrderForType || []) {
      switch (orderType.type) {
        case EnumOrderStatus.AwaitConfirmation:
        case EnumOrderStatus.InProgress:
          newOder.quantity += orderType.quantity
          break
        case EnumOrderStatus.Shipping:
          deliveringOder.quantity += orderType.quantity
          break
        case EnumOrderStatus.Success:
          deliveredOder.quantity += orderType.quantity
          break
        default:
          break
      }
    }
    return [newOder, deliveringOder, deliveredOder]
  }

  useEffect(() => {
    refetch({
      filter
    })
  }, [filter, refetch, refresh])

  return (
    <CardColumn
      title={t('dashboard.reportTotalOrder.textTotalOrders')}
      icon={<FormSapIcon />}
      mainColor='#48ABF7'
      cardType={EnumCardType.List}
      description={null}
      chart={null}
      chartRing={null}
      chartList={chartList() || []}
      growth={null}
      total={data?.reportTotalOrder?.totalQuantity || 0}
      isLoading={loading}
    />
  )
}

export default ReportTotalOrder
