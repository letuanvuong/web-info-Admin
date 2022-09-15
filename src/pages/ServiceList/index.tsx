import { ERPGrid } from '@digihcs/grid2'
import {
  ColumnDefs,
  PaginationFunctionParams
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import { DeleteSapIcon, EditSapIcon, MenuHisIcon } from '@digihcs/icons'
import {
  Button,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  List,
  messageToast,
  Modal,
  Popover,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  StandardListItem
} from '@digihcs/innos-ui3'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ListItemType } from '@digihcs/util/lib/enums/ListItemType'
import { TooltipPlacement } from '@digihcs/util/lib/enums/TooltipPlacement'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GridReadyEvent } from 'ag-grid-community/dist/lib/events'
import { flattenDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { memo, useCallback, useReducer, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { ModalFormServicesRefs } from 'src/components/formServiceModal'
import {
  Service,
  useDeleteServiceMutation,
  useGetServicePaginationQuery,
  useGetServicePaginationTotalQuery
} from 'src/graphql-definition/webinfo-service.generated'
import { getValueOffilter, reducer } from 'src/utils/function'
import { getUrlImage } from 'src/utils/uploadFile'

import {
  IPaginationState,
  OverrideServerSideStoreType,
  PAGINATION
} from '../../constant'
import dataServicesGroup from '../ManageService/directories.json'
import { ServicesType } from '../ManageService/type'

import './styles.less'

const ServiceList = memo(() => {
  const { t } = useTranslation()
  const history: any = useHistory()
  const gridApi = useRef<any>(null)
  let currentQuery = 0
  const modalFormServicesRef = useRef<ModalFormServicesRefs>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type ServicesPassing = {
    currentServices: Service | null
  }
  const [paginationState, setPaginationState] = useReducer<
    (prev: IPaginationState, state: IPaginationState) => IPaginationState
  >(reducer, {
    currentPage: PAGINATION.DEFAULT_CURRENT_PAGE,
    totalPages: 0,
    totalRows: 0,
    sizePage: PAGINATION.DEFAULT_PAGE_SIZE
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { refetch, data: dataServices } = useGetServicePaginationQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: paginationState?.currentPage,
      limit: paginationState?.sizePage,
      search: [],
      filter: [],
      sort: [{ fieldSort: 'createdAt', sort: -1 }]
    }
  })

  const { refetch: refetchTotal } = useGetServicePaginationTotalQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: paginationState?.currentPage,
      limit: paginationState?.sizePage,
      search: [],
      filter: []
    }
  })

  const [callDelete]: any = useDeleteServiceMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.deleteService) {
        messageToast.success({
          message: t('service.notiDeleteSuccess'),
          duration: 2
        })
        loadDataGrid()
        modalFormServicesRef.current?.refetchDataServicesParent()
      } else {
        messageToast.warning({
          description: t('service.notiCategoryRelevant'),
          message: (
            <span className='text-danger' style={{ fontWeight: 'bold' }}>
              {t('service.notiCannotDelete')}
            </span>
          ),
          duration: 6
        })
      }
    },
    onError: (error) => {
      messageToast.error({
        message: error?.message
          ? error?.message
          : t('service.notiDeleteFailed'),
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
  const handleCreate = () => {
    let finded = null
    const findedCT_Services = dataServicesGroup.find(
      (i: ServicesType) => i.route === '/service-create'
    )

    finded = findedCT_Services
    if (finded?.type === 'his') {
      history.push(`/manage-service${finded.route}`)
    } else {
      window.location.href = `${window.location.origin}/manage-service${finded?.route}`
    }
  }
  const handleEdit = (id: string) => {
    let finded = null
    const findedCT_Services = dataServicesGroup.find(
      (i: ServicesType) => i.route === '/service-detail'
    )

    finded = findedCT_Services
    if (finded?.type === 'his') {
      history.push(`/manage-service${finded.route}/${id}`)
    } else {
      window.location.href = `${window.location.origin}/manage-service${finded?.route}`
    }
  }
  const onClickRemove = useCallback(async (selectedRow) => {
    const data = [{ key: selectedRow._id, label: selectedRow.title }]
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('service.msgDelete'),
      centered: true,
      type: ConfirmType.Error,
      okText: t('service.btnDelete'),
      cancelText: t('service.btnExit'),
      tags: data,
      onOk: () => handleRemove(selectedRow._id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columnDefs: ColumnDefs = [
    {
      field: 'cardinalNumber',
      headerName: t('service.textNumberOder'),
      filter: false,
      maxWidth: 70,
      flex: 1,
      pinned: 'left',
      cellStyle: { display: 'flex', justifyContent: 'center' }
    },
    {
      maxWidth: 150,
      filter: false,
      sortable: false,
      autoHeight: true,
      field: 'mainPhoto',
      headerName: t('service.imageTitle'),
      cellStyle: { justifyContent: 'center' },
      cellRendererFramework: (params: any) => {
        const linkImage = params?.data?.mainPhoto

        if (linkImage) {
          params?.node?.setRowHeight(90)
          gridApi.current.onRowHeightChanged()
          return (
            <div
              style={{
                width: 62,
                height: 70
              }}
            >
              <img
                alt='link'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill'
                }}
                src={getUrlImage(linkImage)}
              />
            </div>
          )
        }
        return ''
      }
    },
    {
      flex: 2,
      maxWidth: 300,
      minWidth: 200,
      autoHeight: true,
      wrapText: true,
      field: 'title',
      headerName: t('service.title'),
      filter: 'agTextColumnFilter'
    },
    {
      field: 'sortDescription',
      sortable: true,
      headerName: t('service.textShortDescription'),
      filter: false,
      autoHeight: true,
      wrapText: true,
      flex: 1,
      minWidth: 200
    },
    {
      field: 'url',
      headerName: t('service.textUrl'),
      filter: false,
      autoHeight: true,
      wrapText: true,
      sortable: false,
      flex: 1
    },
    {
      maxWidth: 116,
      field: 'createdAt',
      headerName: t('service.gridCreated'),
      filter: 'agDateColumnFilter',
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
      field: 'createdBy.username',
      headerName: t('service.textCreatedBy'),
      filter: 'agTextColumnFilter',
      maxWidth: 116
    },
    {
      headerName: t('service.gridAction'),
      field: 'Manipulation',
      filter: false,
      sortable: false,
      pinned: 'right',
      minWidth: 100,
      width: 100,
      maxWidth: 100,
      flex: 1,
      cellStyle: {
        display: 'flex',
        justifyContent: 'center'
      },
      cellRendererFramework: (params: any) => {
        if (params.data) {
          return (
            <>
              <Button
                noFill
                onClick={() => {
                  handleEdit(params?.data?._id)
                }}
                iconName={<EditSapIcon />}
              />
              <Button
                noFill
                onClick={() => {
                  onClickRemove(params?.data)
                }}
                iconName={<DeleteSapIcon style={{ color: '#BB0000' }} />}
              />
              <Popover
                key={1}
                placement={TooltipPlacement.BottomRight}
                overlayClassName='popDelete'
                // content={
                //   <List
                //     fullHeight
                //     forceClosePopover
                //     data={[
                //       {
                //         title: t('service.btnDelete'),
                //         type: 'multi',
                //         'data-ci': 'deleteServices',
                //         onClick: () => {
                //           onClickRemove(params?.data)
                //         },
                //         disabled: params?.data?.isDeleted === true,
                //         className:
                //           params?.data?.isDeleted === true
                //             ? 'cancel-delete'
                //             : ''
                //       }
                //     ]}
                //     itemKey='key'
                //   >
                //     {(item: any) => (
                //       <StandardListItem
                //         data={item}
                //         iconName={item.iconName}
                //         title={item.title}
                //         type={
                //           item.disabled
                //             ? ListItemType.Inactive
                //             : ListItemType.Active
                //         }
                //         onClick={item.onClick}
                //         className={item.className}
                //       />
                //     )}
                //   </List>
                // }
              >
                <Button
                  data-ci='popoverButton-item-grid'
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
            const items = data?.getServicePagination?.data || []
            const currentPage = data?.getServicePagination.currentPage || 0
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
              totalPages: Number(data?.getServicePaginationTotal?.totalPages),
              totalRows: Number(data?.getServicePaginationTotal?.totalRows),
              currentPage: Number(data?.getServicePaginationTotal?.currentPage)
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
    gridName: 'ServiceList',
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
    hideCheckbox: false,
    rowModelType: 'serverSide',
    enableServerSideSorting: true,
    serverSideStoreType: OverrideServerSideStoreType.Partial
    // rowHeight: 90
  }

  return (
    <div className='ecommerce'>
      <div>
        <div className='title_bar'>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>
            {t('service.textAllService')}
          </h3>

          <div style={{ display: 'flex', alignItems: 'end' }}>
            <Button
              style={{ display: 'flex', alignItems: 'center' }}
              iconName={
                <FontAwesomeIcon
                  icon={faPlus}
                  width={14}
                  height={14}
                  style={{ marginRight: 5 }}
                />
              }
              onClick={() => {
                handleCreate()
              }}
            >
              {t('service.btnAdd')}
            </Button>
          </div>
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
          />
        </div>
      </div>
    </div>
  )
})

export default ServiceList
