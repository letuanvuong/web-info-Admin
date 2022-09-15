import { ERPGrid } from '@digihcs/grid2'
import {
  ColumnDefs,
  PaginationFunctionParams
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import { DeleteSapIcon } from '@digihcs/icons'
import { Button, messageToast, Modal } from '@digihcs/innos-ui3'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
import { GridReadyEvent } from 'ag-grid-community/dist/lib/events'
import { flattenDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { memo, useCallback, useReducer, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useGetEmailOnSubsPaginationQuery,
  useGetEmailOnSubsPaginationTotalQuery,
  useUnSubscribeEmailMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { getValueOffilter, reducer } from 'src/utils/function'

import {
  IPaginationState,
  OverrideServerSideStoreType,
  PAGINATION
} from '../../constant'

import './styles.less'

const SubscriberList = memo(() => {
  const { t } = useTranslation()
  const gridApi = useRef<any>(null)
  let currentQuery = 0

  const [paginationState, setPaginationState] = useReducer<
    (prev: IPaginationState, state: IPaginationState) => IPaginationState
  >(reducer, {
    currentPage: PAGINATION.DEFAULT_CURRENT_PAGE,
    totalPages: 0,
    totalRows: 0,
    sizePage: PAGINATION.DEFAULT_PAGE_SIZE
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { refetch, data: dataSubscriber } = useGetEmailOnSubsPaginationQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: paginationState?.currentPage,
      limit: paginationState?.sizePage,
      search: [],
      filter: [],
      sort: [{ fieldSort: 'createdAt', sort: -1 }]
    }
  })

  const { refetch: refetchTotal } = useGetEmailOnSubsPaginationTotalQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: paginationState?.currentPage,
      limit: paginationState?.sizePage,
      search: [],
      filter: []
    }
  })

  const [callDelete]: any = useUnSubscribeEmailMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.unSubscribeEmail) {
        messageToast.success({
          message: t('subscriber.notiDeleteSuccess'),
          duration: 2
        })
        loadDataGrid()
      } else {
        messageToast.warning({
          description: t('subscriber.haveProblem'),
          message: (
            <span className='text-danger' style={{ fontWeight: 'bold' }}>
              {t('subscriber.notiCannotDelete')}
            </span>
          ),
          duration: 2
        })
      }
    },
    onError: (error) => {
      messageToast.error({
        message: error?.message
          ? error?.message
          : t('subscriber.notiDeleteFailed'),
        duration: 2
      })
    }
  })

  const handleRemove: any = (ids: string[] = []) => {
    callDelete({
      variables: {
        ids
      }
    })
  }

  const onClickRemove = useCallback(async (selectedRow) => {
    const data = [{ key: selectedRow._id, label: selectedRow.email }]
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('subscriber.msgDelete'),
      centered: true,
      type: ConfirmType.Error,
      okText: t('subscriber.btnDelete'),
      cancelText: t('subscriber.btnExit'),
      tags: data,
      onOk: () => handleRemove(selectedRow._id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columnDefs: ColumnDefs = [
    {
      field: 'cardinalNumber',
      headerName: t('subscriber.textNumberOder'),
      filter: false,
      maxWidth: 70,
      flex: 1,
      cellStyle: { display: 'flex', justifyContent: 'center' }
    },
    {
      cellStyle: { display: 'flex', justifyContent: 'flex-start' },
      field: 'email',
      headerName: t('subscriber.textEmail'),
      filter: 'agTextColumnFilter',
      flex: 4
    },
    {
      field: 'createdAt',
      headerName: t('subscriber.textSubscribedDate'),
      filter: 'agDateColumnFilter',
      flex: 1,
      maxWidth: 140,
      filterParams: {
        filterOptions: ['equals']
      },
      valueGetter: (params) => {
        if (params.data) {
          if (params.node.rowPinned) {
            return ''
          }
          return params.data?.createdAt
            ? moment(params.data.createdAt).format('DD/MM/YYYY')
            : '--/--/----'
        }
        return ''
      }
    },
    {
      headerName: t('subscriber.gridAction'),
      field: 'Manipulation',
      filter: false,
      sortable: false,
      pinned: 'center',
      maxWidth: 70,
      cellStyle: { display: 'flex', justifyContent: 'center' },
      cellRendererFramework: (params: any) => {
        if (params.data) {
          return (
            <>
              <Button
                noFill
                onClick={() => {
                  onClickRemove(params?.data)
                }}
                iconName={<DeleteSapIcon style={{ color: '#BB0000' }} />}
              />
            </>
          )
        }
        return ''
      }
    }
  ]

  const fetchDatasource = (page: number, paginationPageSize: number) => ({
    // called by the grid when more rows are required
    getRows: async (params: any) => {
      try {
        const filterParams = params.request.filterModel

        const queryId = Date.now()
        currentQuery = queryId
        const filter: { fieldFilter: string; values: any[] }[] = []
        const search: { fieldSearch: string; textSearch: any }[] = []
        let sort = params?.request?.sortModel?.map((s: any) => ({
          sort: s?.sort === 'asc' ? 1 : -1,
          fieldSort: s?.colId || null
        }))
        if (isEmpty(sort)) {
          sort = [{ fieldSort: 'createdAt', sort: -1 }]
        }
        Object.keys(filterParams).forEach((key: string) => {
          // const new_key = key
          if (['set'].includes(filterParams[key]?.filterType)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const newInputFilter = {
              fieldFilter: key,
              values: flattenDeep([getValueOffilter(filterParams[key])])
            }
          } else if (params?.request?.filterModel[key]?.filterType === 'date') {
            search.push({
              textSearch: params?.request?.filterModel[key]?.dateFrom || '',
              fieldSearch: key || ''
            })
          } else {
            search.push({
              textSearch: params?.request?.filterModel[key].filter || '',
              fieldSearch: key || ''
            })
          }
        })

        const variables = {
          page,
          limit: paginationPageSize,
          filter: [...filter],
          search,
          sort
        }
        refetch(variables)
          .then(({ data, errors }) => {
            if (errors || queryId !== currentQuery) {
              return
            }
            const items = data?.getEmailOnSubsPagination?.data || []
            const currentPage = data?.getEmailOnSubsPagination.currentPage || 0
            const rowData: any[] = []
            items.forEach((value: any, index: number) => {
              const newValue: any = {
                index: (currentPage - 1) * paginationPageSize + index + 1,
                ...value
              }

              rowData.push(newValue)
            })

            params.successCallback(rowData || [], (rowData || []).length)
          })
          .catch((err) => {
            params.fail()
            if (err.message.includes('Failed to fetch')) {
              messageToast.error({
                message: t('error.can_not_delete'),
                description: t('error.connection_fail')
              })
              return
            }
            messageToast.error({
              message: t('error.error_update')
            })
          })

        refetchTotal(variables)
          .then(({ errors, data }) => {
            if (errors || queryId !== currentQuery) {
              return
            }
            setPaginationState({
              totalPages: Number(
                data?.getEmailOnSubsPaginationTotal?.totalPages
              ),
              totalRows: Number(data?.getEmailOnSubsPaginationTotal?.totalRows),
              currentPage: Number(
                data?.getEmailOnSubsPaginationTotal?.currentPage
              )
            })
          })
          .catch((err) => {
            params.fail()
            if (err.message.includes('Failed to fetch')) {
              messageToast.error({
                message: t('error.can_not_update'),
                description: t('error.connection_fail')
              })
              return
            }
            messageToast.error({
              message: t('error.error_update')
            })
          })
      } catch (error) {
        params.fail()
        if (error.message.includes('Failed to fetch')) {
          messageToast.error({
            message: t('error.can_not_update'),
            description: t('error.connection_fail')
          })
          return
        }
        messageToast.error({
          message: t('error.error_update')
        })
      }
    }
  })

  const updateGrid = (api: any, dataSource: any) => {
    api?.setServerSideDatasource(dataSource)
  }

  const loadDataGrid = async (args?: {
    api?: any
    page?: number
    limit?: number
  }) => {
    let { page, limit } = args || {
      page: paginationState.currentPage,
      limit: paginationState.sizePage
    }
    const { api } = args || { api: null }
    if (!page) page = paginationState.currentPage
    if (!limit) limit = paginationState.sizePage
    if (!api) updateGrid(gridApi?.current, fetchDatasource(page, limit))
    else updateGrid(api, fetchDatasource(page, limit))
  }

  const nextPage = (params: PaginationFunctionParams) => {
    updateGrid(
      params.gridOptions.api,
      fetchDatasource(params.currentPage + 1, params.pageSize)
    )
  }

  const prevPage = (params: PaginationFunctionParams) => {
    updateGrid(
      params.gridOptions.api,
      fetchDatasource(params.currentPage - 1, params.pageSize)
    )
  }

  const changeSizePage = (params: PaginationFunctionParams) => {
    params.gridOptions.api.paginationSetPageSize(Number(params.pageSize))
    setPaginationState({
      sizePage: params.pageSize
    })
    updateGrid(
      params.gridOptions.api,
      fetchDatasource(params.currentPage, params.pageSize)
    )
  }

  const goToPage = (params: PaginationFunctionParams) => {
    updateGrid(
      params.gridOptions.api,
      fetchDatasource(params.gotoPage, params.pageSize)
    )
  }

  const gridOption: any = {
    gridName: 'SubscriberList',
    onGridReady: (gridOpts: GridReadyEvent) => {
      gridApi.current = gridOpts.api
      loadDataGrid({
        api: gridOpts.api,
        page: paginationState.currentPage,
        limit: paginationState.sizePage
      })
    },
    height: '100%',
    columnDefs,
    rowModelType: 'serverSide',
    enableServerSideSorting: true,
    serverSideStoreType: OverrideServerSideStoreType.Partial
  }

  return (
    <div className='ecommerce'>
      <div>
        <div className='title_bar'>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>
            {t('subscriber.textAllSubscriber')}
          </h3>
        </div>

        <div style={{ height: 'calc(100vh - 110px)' }}>
          <ERPGrid
            {...gridOption}
            serverSidePagination={{
              onNextPageClicked: nextPage,
              onPreviousPageClicked: prevPage,
              onPageSizeChanged: changeSizePage,
              onGotoPageChanged: goToPage,
              currentPage: paginationState.currentPage,
              totalPages: paginationState.totalPages,
              totalRows: paginationState.totalRows
            }}
            // hideCheckbox
            defaultPageSize={paginationState?.sizePage || 50}
            floatingFilter
          />
        </div>
      </div>
    </div>
  )
})

export default SubscriberList
