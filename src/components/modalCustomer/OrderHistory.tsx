import { ERPGrid } from '@digihcs/grid2'
import {
  ColumnDefs,
  ERPGridProps
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import { messageToast } from '@digihcs/innos-ui3'
import {
  GridApi,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  IServerSideGetRowsRequest,
  ServerSideStoreType
} from 'ag-grid-community'
import moment from 'moment'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  EnumOrderStatus,
  OrdersWithPaginateQuery,
  useOrdersWithPaginateQuery
} from 'src/graphql-definition/webinfo-service.generated'
import { formatNumber } from 'src/utils/function'

import './index.less'

type IOrders = OrdersWithPaginateQuery['ordersWithPaginate']['orders']

interface OrderHistoryProps {
  idCustomer: string
  closeModal: () => void
}

const OrderHistory = ({ idCustomer, closeModal }: OrderHistoryProps) => {
  const { t } = useTranslation()
  const gridApi = useRef<GridApi>(null)
  const [orders, setOrders] = useState<IOrders>([])

  const { refetch: queryOrders } = useOrdersWithPaginateQuery({
    skip: true,
    variables: { filterOptions: {} }
  })

  const columnDefs: ColumnDefs = [
    {
      field: 'code',
      headerName: t('manageCustomer.modalDetailCustomer.textCodeOrder')
    },
    {
      field: 'orderDetail',
      headerName: t('manageCustomer.modalDetailCustomer.textProductNumber'),
      filter: false,
      sortable: false,
      valueFormatter: ({ value }: any) => value?.length || 0
    },
    {
      field: 'orderedAt',
      filter: false,
      headerName: t('manageCustomer.modalDetailCustomer.textOrderDate'),
      valueFormatter: ({ value }: any) => {
        if (value) {
          return `${moment(value).format('DD/MM/YYYY')}`
        }
        return ''
      }
    },
    {
      field: 'total',
      filter: false,
      sortable: false,
      headerName: t('manageCustomer.modalDetailCustomer.textTotal'),
      cellRenderer: (params: any) => {
        const orderDetail = params?.data?.orderDetail
        const total = orderDetail?.reduce(
          (prev: any, current: any) => prev + +current?.total,
          0
        )
        return total ? formatNumber(total) : '0'
      }
    },
    {
      field: 'status',
      headerName: t('manageCustomer.modalDetailCustomer.textStatus'),
      filter: false,
      cellStyle: (params) => {
        if (params.data?.status === EnumOrderStatus.Shipping)
          return { color: '#FFA001', fontWeight: 600 }
        if (params.data?.status === EnumOrderStatus.AwaitConfirmation)
          return { color: '#90969C', fontWeight: 600 }
        if (params.data?.status === EnumOrderStatus.Success)
          return { color: '#107F3E', fontWeight: 600 }
        if (params.data?.status === EnumOrderStatus.Failed)
          return { color: '#BB0000', fontWeight: 600 }
        if (params.data?.status === EnumOrderStatus.Canceled)
          return { color: '#BB0000', fontWeight: 600 }
        if (params.data?.status === EnumOrderStatus.InProgress)
          return { color: '#E9730C', fontWeight: 600 }
        return { color: '#90969C', fontWeight: 600 }
      },
      valueFormatter: (params) => {
        if (params.data?.status === EnumOrderStatus.Shipping)
          return t('manageCustomer.modalDetailCustomer.textShipping')
        if (params.data?.status === EnumOrderStatus.Success)
          return t('manageCustomer.modalDetailCustomer.textSuccess')
        if (params.data?.status === EnumOrderStatus.Failed)
          return t('manageCustomer.modalDetailCustomer.textFailed')
        if (params.data?.status === EnumOrderStatus.InProgress)
          return t('manageCustomer.modalDetailCustomer.textInProgress')
        if (params.data?.status === EnumOrderStatus.Canceled)
          return t('manageCustomer.modalDetailCustomer.textCanceled')
        return t('manageCustomer.modalDetailCustomer.textAwaitConfirmation')
      }
    }
  ]

  const getLastRowIndex = (
    request: IServerSideGetRowsRequest,
    results: unknown[]
  ): number => {
    if (!results || results.length === 0) {
      return 0
    }
    const currentLastRow = request.startRow + results.length
    return currentLastRow <= request.endRow ? currentLastRow : -1
  }

  const createServerSideDataSource: () => IServerSideDatasource = useCallback(
    () => ({
      getRows: (params: IServerSideGetRowsParams) => {
        queryOrders({
          filterOptions: { idCustomer: [idCustomer] },
          gridOptions: params.request
        })
          .then(({ data }) => {
            const ordersFound = data.ordersWithPaginate.orders || []
            setOrders(ordersFound)

            params.success({
              rowData: ordersFound,
              rowCount: getLastRowIndex(params.request, ordersFound)
            })
          })
          .catch(() => {
            messageToast.error({ message: t('error.error_load_data') })
            params.fail()
          })
      }
    }),
    [idCustomer, queryOrders, t]
  )

  const setServerSideDatasourceToGrid = useCallback(
    (gridApiDefault: GridApi = null) => {
      const dataSource = createServerSideDataSource()
      if (gridApiDefault) {
        gridApiDefault?.setServerSideDatasource(dataSource)
      } else {
        gridApi?.current?.setServerSideDatasource(dataSource)
      }
    },
    [createServerSideDataSource]
  )

  const gridOptions: ERPGridProps = {
    columnDefs,
    onGridReady: (gridOpts) => {
      gridApi.current = gridOpts.api
      gridOpts.api.sizeColumnsToFit()
      setServerSideDatasourceToGrid(gridOpts.api)
    },
    gridName: 'gridManageOrder',
    animateRows: true,
    pagination: true,
    rowModelType: 'serverSide',
    serverSideStoreType: ServerSideStoreType.Partial,
    hideCheckbox: true,
    floatingFilter: true,
    paginationAutoPageSize: true
  }

  const orderSuccess = orders?.filter(
    (order) => order.status === EnumOrderStatus.Success
  )

  const orderDetail = orderSuccess?.map((order) => {
    const total = order?.orderDetail?.reduce(
      (prev: any, current: any) => prev + +current?.total,
      0
    )
    return { ...order, total }
  })
  const total = orderDetail.reduce(
    (prev: any, current: any) => prev + +current?.total,
    0
  )

  /** Mỗi lần mở profile mới thì query lại data order SSR */
  useEffect(() => {
    setServerSideDatasourceToGrid()
  }, [idCustomer, setServerSideDatasourceToGrid])

  return (
    <div style={{ height: '100%' }}>
      <div
        className='grid-top'
        style={{
          padding: 25,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fff'
        }}
      >
        <span
          style={{
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontWeight: 400
          }}
        >
          {t('manageCustomer.modalDetailCustomer.textTotalOrder')}:{' '}
          <span style={{ color: '#0A6ED1', fontSize: 20, fontWeight: 'bold' }}>
            {orders.length}
          </span>
        </span>

        <span
          style={{
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontWeight: 400,
            marginLeft: 60
          }}
        >
          {t('manageCustomer.modalDetailCustomer.textRevenue')}:{' '}
          <span style={{ color: '#0A6ED1', fontSize: 20, fontWeight: 'bold' }}>
            {total ? formatNumber(total) : 0}
          </span>{' '}
          đ
        </span>
      </div>

      <div
        className='grid-wrapper'
        style={{ flex: 1, backgroundColor: '#fff', height: 370, padding: 25 }}
      >
        <ERPGrid {...gridOptions} />
      </div>
    </div>
  )
}

export default OrderHistory
