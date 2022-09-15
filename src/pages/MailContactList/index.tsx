import { ERPGrid } from '@digihcs/grid2'
import {
  ColumnDefs,
  PaginationFunctionParams
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import { DeleteSapIcon, FormSapIcon } from '@digihcs/icons'
import { Button, messageToast, Modal } from '@digihcs/innos-ui3'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
import { GridReadyEvent } from 'ag-grid-community/dist/lib/events'
import { flattenDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { memo, useCallback, useReducer, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  EnumTopicContact,
  useDeleteMailContactMutation,
  useGetMailContactPaginationQuery,
  useGetMailContactPaginationTotalQuery
} from 'src/graphql-definition/webinfo-service.generated'
import { getValueOffilter, reducer } from 'src/utils/function'

import {
  IPaginationState,
  OverrideServerSideStoreType,
  PAGINATION
} from '../../constant'
// import { MessageModalRef } from './interface'
import MessageModal, { ModalMessageRefs } from './modal'

import './styles.less'

const MailContactList = memo(() => {
  const { t } = useTranslation()
  const gridApi = useRef<any>(null)
  let currentQuery = 0
  const modalMessageRef = useRef<ModalMessageRefs>(null)

  const [paginationState, setPaginationState] = useReducer<
    (prev: IPaginationState, state: IPaginationState) => IPaginationState
  >(reducer, {
    currentPage: PAGINATION.DEFAULT_CURRENT_PAGE,
    totalPages: 0,
    totalRows: 0,
    sizePage: PAGINATION.DEFAULT_PAGE_SIZE
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { refetch, data } = useGetMailContactPaginationQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: paginationState?.currentPage,
      limit: paginationState?.sizePage,
      search: [],
      filter: [],
      sort: [{ fieldSort: 'createdAt', sort: -1 }]
    }
  })

  const { refetch: refetchTotal } = useGetMailContactPaginationTotalQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: paginationState?.currentPage,
      limit: paginationState?.sizePage,
      search: [],
      filter: []
    }
  })

  const [callDelete]: any = useDeleteMailContactMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.deleteMailContact) {
        messageToast.success({
          message: t('mailContact.notiDeleteSuccess'),
          duration: 2
        })
        loadDataGrid()
      } else {
        messageToast.warning({
          description: t('mailContact.haveProblem'),
          message: (
            <span className='text-danger' style={{ fontWeight: 'bold' }}>
              {t('mailContact.notiCannotDelete')}
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
          : t('mailContact.notiDeleteFailed'),
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
      title: t('mailContact.msgDelete'),
      centered: true,
      type: ConfirmType.Error,
      okText: t('mailContact.btnDelete'),
      cancelText: t('mailContact.btnExit'),
      tags: data,
      onOk: () => handleRemove(selectedRow._id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columnDefs: ColumnDefs = [
    {
      field: 'cardinalNumber',
      headerName: t('mailContact.textNumberOder'),
      filter: false,
      pinned: 'left',
      maxWidth: 70,
      flex: 1,
      cellStyle: { display: 'flex', justifyContent: 'center' }
    },
    {
      cellStyle: { display: 'flex', justifyContent: 'flex-start' },
      field: 'email',
      headerName: t('mailContact.textEmail'),
      filter: 'agTextColumnFilter',
      minWidth: 250
    },
    {
      cellStyle: { display: 'flex', justifyContent: 'flex-start' },
      field: 'phoneNumber',
      headerName: t('mailContact.textPhone'),
      filter: 'agTextColumnFilter',
      flex: 1
    },
    {
      cellStyle: { display: 'flex', justifyContent: 'flex-start' },
      field: 'fullName',
      headerName: t('mailContact.textCustomerName'),
      filter: 'agTextColumnFilter'
    },
    {
      cellStyle: { display: 'flex', justifyContent: 'flex-start' },
      field: 'subject',
      headerName: t('mailContact.textSubject'),
      filter: 'agTextColumnFilter',
      minWidth: 170
    },
    {
      cellStyle: { display: 'flex', justifyContent: 'flex-start' },
      field: 'service.title',
      headerName: t('mailContact.textService'),
      filter: 'agTextColumnFilter',
      flex: 1
    },
    {
      cellStyle: { display: 'flex', justifyContent: 'flex-start' },
      field: 'topic',
      headerName: t('mailContact.textTopic'),
      filter: 'agSetColumnFilter',
      filterParams: {
        values: [
          t('mailContact.valueTopic.GeneralEnquires'),
          t('mailContact.valueTopic.Sale'),
          t('mailContact.valueTopic.Support')
        ]
      },
      flex: 1
    },
    {
      cellStyle: { display: 'flex', justifyContent: 'flex-start' },
      field: 'message',
      headerName: t('mailContact.textMessage'),
      filter: false,
      flex: 2
    },
    {
      field: 'createdAt',
      headerName: t('mailContact.textMailContactDate'),
      filter: 'agDateColumnFilter',
      flex: 1,
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
      headerName: t('mailContact.gridAction'),
      field: 'Manipulation',
      filter: false,
      sortable: false,
      pinned: 'right',
      maxWidth: 70,
      cellStyle: { display: 'flex', justifyContent: 'center' },
      cellRendererFramework: (params: any) => {
        if (params.data) {
          return (
            <>
              <Button
                noFill
                onClick={() => {
                  modalMessageRef.current.setCurrentMessage(params.data)
                  modalMessageRef.current.openModalMessage()
                }}
                iconName={<FormSapIcon />}
              />
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
            const newInputFilter = {
              fieldFilter: key,
              values: flattenDeep([getValueOffilter(filterParams[key])])
            }
            if (key === 'topic') {
              newInputFilter.values = newInputFilter.values.map((x) => {
                if (x === t('mailContact.valueTopic.GeneralEnquires'))
                  return EnumTopicContact.GeneralEnquires
                if (x === t('mailContact.valueTopic.Sale'))
                  return EnumTopicContact.Sale
                return EnumTopicContact.Support
              })
            }
            filter.push(newInputFilter)
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
            const items = data?.getMailContactPagination?.data || []
            const currentPage = data?.getMailContactPagination.currentPage || 0
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
                data?.getMailContactPaginationTotal?.totalPages
              ),
              totalRows: Number(data?.getMailContactPaginationTotal?.totalRows),
              currentPage: Number(
                data?.getMailContactPaginationTotal?.currentPage
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
    gridName: 'MailContactList',
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
            {t('mailContact.textAllMailContact')}
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
            rowSelection='single'
            // onRowSelected={(e) => console.log('row selected', e.data, e.type)}
            // onRowClicked={(e: any) => {
            //   if(e.data)
            //   {
            //     modalMessageRef.current.setCurrentMessage(e.data)
            //     modalMessageRef.current.openModalMessage()
            //   }
            // }}
          />
        </div>
        <MessageModal ref={modalMessageRef} refetchGridData={loadDataGrid} />
      </div>
    </div>
  )
})

export default MailContactList
