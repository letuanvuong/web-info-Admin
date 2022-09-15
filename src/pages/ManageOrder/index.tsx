import { ERPGrid } from '@digihcs/grid2'
import {
  ColumnDefs,
  ERPGridProps
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import { FormSapIcon } from '@digihcs/icons'
import MenuHisIcon from '@digihcs/icons/lib/his/MenuHisIcon'
import AddSapIcon from '@digihcs/icons/lib/sap/AddSapIcon'
import {
  Button,
  IconTabBar,
  List,
  messageToast,
  Popover,
  StandardListItem
} from '@digihcs/innos-ui3'
import { ListItemType } from '@digihcs/util/lib/enums/ListItemType'
import { TooltipPlacement } from '@digihcs/util/lib/enums/TooltipPlacement'
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
import ModalOrder, { ModalOrderRef } from 'src/components/modalOrder'
import {
  EnumOrderStatus,
  useGetQuantityOderForTypeQuery,
  useOrdersWithPaginateQuery
} from 'src/graphql-definition/webinfo-service.generated'
import { formatNumber } from 'src/utils/function'

import { ITabState } from './interface'

const ManageOrder: React.FC = () => {
  const { t } = useTranslation()
  const [currentTab, setCurrentTab] = useState<ITabState>(
    EnumOrderStatus.AwaitConfirmation
  )

  const gridApi = useRef<GridApi>(null)
  const modalOrderRef = useRef<ModalOrderRef>(null)

  const { refetch: queryOrders } = useOrdersWithPaginateQuery({
    skip: true,
    variables: { filterOptions: {} }
  })

  const {
    data: quantityOrder,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loading: loadingQuantityOrder,
    refetch: refetchQuantityOrder
  } = useGetQuantityOderForTypeQuery({
    fetchPolicy: 'no-cache'
  })

  const listTabs_i18n: Array<{
    code: EnumOrderStatus | 'All'
    name: string
  }> = [
    {
      code: EnumOrderStatus.AwaitConfirmation,
      name: t('manageOrder.textAwaitConfirmation')
    },
    { code: EnumOrderStatus.InProgress, name: t('manageOrder.textInProgress') },
    { code: EnumOrderStatus.Shipping, name: t('manageOrder.textShipping') },
    { code: EnumOrderStatus.Success, name: t('manageOrder.textSuccess') },
    { code: EnumOrderStatus.Failed, name: t('manageOrder.textFailed') },
    { code: EnumOrderStatus.Canceled, name: t('manageOrder.textCanceled') },
    { code: 'All', name: t('manageOrder.textAllOrders') }
  ]

  const columnDefs: ColumnDefs = [
    { field: 'code', headerName: t('manageOrder.grid.textCode') },
    {
      field: 'orderedAt',
      headerName: t('manageOrder.grid.textOrderDate'),
      filter: 'agDateColumnFilter',
      filterParams: {
        filterOptions: ['equals']
      },
      valueFormatter: ({ value }) => {
        if (value) {
          return moment(value).format('DD/MM/YYYY')
        }
        return '--/--/----'
      }
    },
    {
      field: 'customer.fullName',
      headerName: t('manageOrder.grid.textOrderer')
    },
    {
      field: 'customer.phoneNumber',
      headerName: t('manageOrder.grid.textPhoneNumber')
    },
    {
      field: 'deliveryAddress.fullName',
      headerName: t('manageOrder.grid.textReceiver')
    },
    {
      field: 'deliveryAddress.phoneNumber',
      headerName: t('manageOrder.grid.textPhoneNumber')
    },
    {
      filter: false,
      sortable: false,
      field: 'deliveryAddress.detailAddress',
      headerName: t('manageOrder.grid.textDeliveryAddress')
    },
    {
      field: 'note',
      filter: false,
      sortable: false,
      headerName: t('manageOrder.grid.textNote')
    },
    {
      filter: false,
      sortable: false,
      field: 'orderDetail',
      maxWidth: 100,
      headerName: t('manageOrder.grid.textProductNumber'),
      cellStyle: { justifyContent: 'center' },
      valueFormatter: ({ value }: any) => value?.length || 0
    },
    {
      field: 'total',
      filter: false,
      sortable: false,
      maxWidth: 100,
      headerName: t('manageOrder.grid.textTotal'),
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
      filter: false,
      hide: currentTab !== 'All',
      headerName: t('Trạng thái'),
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
    },
    {
      field: '',
      headerName: t(''),
      filter: false,
      sortable: false,
      pinned: 'right',
      minWidth: 95,
      width: 95,
      maxWidth: 95,
      cellRendererFramework: (params: any) => {
        if (params.data) {
          return (
            <>
              <Button
                onClick={() =>
                  modalOrderRef.current?.openModalOrder(params.data)
                }
                noFill
                iconName={<FormSapIcon />}
                className='btn-view-item-grid'
              />

              <Popover
                key={1}
                placement={TooltipPlacement.BottomRight}
                overlayClassName='pop-option'
                content={
                  <List fullHeight forceClosePopover data={[]} itemKey='key'>
                    {(item: any) => (
                      <StandardListItem
                        data={item}
                        title={item.title}
                        type={ListItemType.Active}
                        onClick={item.onClick}
                      />
                    )}
                  </List>
                }
              >
                <Button
                  data-ci='popover-button-item-grid'
                  iconName={<MenuHisIcon />}
                  noFill
                />
              </Popover>
            </>
          )
        }
        return ''
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
        const status = currentTab === 'All' ? [] : [currentTab]

        /** call backend query */
        refetchQuantityOrder()
        queryOrders({
          filterOptions: { status },
          gridOptions: params.request
        })
          .then(({ data }) => {
            const foundOrders = data.ordersWithPaginate.orders || []
            params.success({
              rowData: foundOrders,
              rowCount: getLastRowIndex(params.request, foundOrders)
            })
          })
          .catch(() => {
            messageToast.error({ message: t('error.error_load_data') })
            params.fail()
          })
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryOrders, t, currentTab]
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

  const handleChangeTab = useCallback(
    (tab: EnumOrderStatus) => setCurrentTab(tab),
    []
  )

  useEffect(() => {
    setServerSideDatasourceToGrid()
  }, [currentTab, setServerSideDatasourceToGrid])

  return (
    <div
      className='manage-order'
      style={{
        height: '100%',
        backgroundColor: '#F2F2F2',
        padding: '5px 5px 0 5px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        className='title_bar'
        style={{
          height: '80px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px',
          backgroundColor: '#fff',
          borderBottom: 'solid 1px #e5e5e5'
        }}
      >
        <h3 style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 400 }}>
          {t('manageOrder.textOrder')}
        </h3>

        <div style={{ display: 'flex', alignItems: 'end' }}>
          <Button
            style={{ display: 'flex', alignItems: 'center' }}
            size='large'
            iconName={<AddSapIcon />}
            onClick={() => modalOrderRef.current?.openModalOrder()}
          >
            {t('manageOrder.textNewOder')}
          </Button>
        </div>
      </div>

      <div style={{}}>
        <IconTabBar activeKey={currentTab} onTabClick={handleChangeTab}>
          {listTabs_i18n.map((tab) => {
            const quantity =
              quantityOrder?.getQuantityOderForType?.find(
                (item) => item.type === tab.code
              )?.quantity || 0
            return (
              <IconTabBar.Filter
                key={tab.code}
                text={`${tab.name} ${
                  tab.code !== 'All' ? `(${quantity})` : ''
                }`}
              >
                {tab.name}
              </IconTabBar.Filter>
            )
          })}

          <IconTabBar.Content>
            <div
              className='grid-wrapper'
              style={{
                flex: 1,
                backgroundColor: '#fff',
                height: window.innerHeight - 150
              }}
            >
              <ERPGrid {...gridOptions} />
            </div>
          </IconTabBar.Content>
        </IconTabBar>
      </div>

      <ModalOrder
        ref={modalOrderRef}
        callbackFunc={setServerSideDatasourceToGrid}
      />
    </div>
  )
}

export default ManageOrder
