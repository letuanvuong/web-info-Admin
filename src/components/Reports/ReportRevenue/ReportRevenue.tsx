import MoneyManagementHisIcon from '@digihcs/icons/lib/his/MoneyManagementHisIcon'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FilterReportInput,
  useReportRevenueQuery
} from 'src/graphql-definition/webinfo-service.generated'

import CardColumn from '../CardColumn/CardColumn'
import { EnumCardType } from '../CardColumn/CardColumn.d'

interface ReportRevenueProps {
  filter: FilterReportInput
  refresh: boolean
}

const ReportRevenue: React.FC<ReportRevenueProps> = ({ filter, refresh }) => {
  const { data, loading, refetch } = useReportRevenueQuery({
    fetchPolicy: 'no-cache',
    variables: {
      filter
    }
  })
  const { t } = useTranslation()

  useEffect(() => {
    refetch({
      filter
    })
  }, [filter, refetch, refresh])

  return (
    <CardColumn
      title={t('dashboard.reportRevenue.textRevenue')}
      icon={<MoneyManagementHisIcon />}
      mainColor='#FFBC10'
      cardType={EnumCardType.List}
      description={null}
      chart={null}
      chartRing={null}
      chartList={null}
      growth={null}
      total={data?.reportRevenue?.totalRevenue || 0}
      isLoading={loading}
    />
  )
}

export default ReportRevenue
