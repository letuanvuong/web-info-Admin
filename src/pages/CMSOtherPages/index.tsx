import { ERPGrid } from '@digihcs/grid2'
import {
  ColumnDefs,
  PaginationFunctionParams
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import { DeleteSapIcon, EditSapIcon, MenuHisIcon } from '@digihcs/icons'
import { Button, messageToast, Modal, Popover } from '@digihcs/innos-ui3'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
import { TooltipPlacement } from '@digihcs/util/lib/enums/TooltipPlacement'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GridReadyEvent } from 'ag-grid-community/dist/lib/events'
import { flattenDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { memo, useCallback, useReducer, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import {
  EnumPageStatus,
  useDeletePageMutation,
  useGetPagePaginationQuery,
  useGetPagePaginationTotalQuery
} from 'src/graphql-definition/webinfo-service.generated'
import { getValueOffilter, reducer } from 'src/utils/function'

import {
  IPaginationState,
  OverrideServerSideStoreType,
  PAGINATION
} from '../../constant'
import dataPagesGroup from '../ManagePage/directories.json'
import { PagesType } from '../ManagePage/type'

import './index.less'

const pageList = memo(() => {
  const history: any = useHistory()
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

  const { refetch } = useGetPagePaginationQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: paginationState?.currentPage,
      limit: paginationState?.sizePage,
      search: [],
      filter: [],
      sort: [{ fieldSort: 'createdAt', sort: -1 }]
    }
  })

  const { refetch: refetchTotal } = useGetPagePaginationTotalQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: paginationState?.currentPage,
      limit: paginationState?.sizePage,
      search: [],
      filter: []
    }
  })

  const [callDelete] = useDeletePageMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.deletePage) {
        messageToast.success({
          message: t('managePages.notiDeleteSuccess'),
          duration: 2
        })
        loadDataGrid()
      } else {
        messageToast.warning({
          message: (
            <span className='text-danger' style={{ fontWeight: 'bold' }}>
              {t('managePages.notiCannotDelete')}
            </span>
          ),
          duration: 0
        })
      }
    },
    onError: (error) => {
      messageToast.error({
        message: error?.message ? error?.message : t('error.can_not_delete'),
        duration: 2
      })
    }
  })

  // const [callCancelPublic]: any = useUpdateCancelPublicpagesMutation({
  //   fetchPolicy: 'no-cache',
  //   onCompleted: async (data) => {
  //     if (data?.updateCancelPublicpages) {
  //       messageToast.success({
  //         message: t('category.notiCancelPublicSuccess'),
  //         duration: 2
  //       })
  //       loadDataGrid()
  //       modalFormpagesRef.current?.refetchDatapagesParent()
  //     } else {
  //       messageToast.warning({
  //         description: t('.notiCancelPublicRelevant'),
  //         message: (
  //           <span className='text-danger' style={{ fontWeight: 'bold' }}>
  //             {t('category.notiCancelPublicFailed')}
  //           </span>
  //         ),
  //         duration: 6
  //       })
  //     }
  //   },
  //   onError: (error) => {
  //     messageToast.error({
  //       message: error?.message
  //         ? error?.message
  //         : t('category.notiCancelPublicFailed'),
  //       duration: 2
  //     })
  //   }
  // })

  const handleRemove: any = (id: string) => {
    callDelete({
      variables: {
        id
      }
    })
  }

  const handleCreate = () => {
    let finded = null
    const findedCT_Pages = dataPagesGroup.find(
      (i: PagesType) => i.route === '/page-create'
    )

    finded = findedCT_Pages
    if (finded?.type === 'his') {
      history.push(`/manage-page${finded.route}`)
    } else {
      window.location.href = `${window.location.origin}/manage-page${finded?.route}`
    }
  }
  const handleEdit = (id: string) => {
    let finded = null
    const findedCT_Pages = dataPagesGroup.find(
      (i: PagesType) => i.route === '/page-detail'
    )

    finded = findedCT_Pages
    if (finded?.type === 'his') {
      history.push(`/manage-page${finded.route}/${id}`)
    } else {
      window.location.href = `${window.location.origin}/manage-page${finded?.route}`
    }
  }

  const onClickRemove = useCallback(async (selectedRow) => {
    const data = [{ key: selectedRow._id, label: selectedRow.title }]
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('managePages.msgDeletePage'),
      centered: true,
      type: ConfirmType.Error,
      okText: t('managePages.btnDelete'),
      cancelText: t('managePages.btnExit'),
      tags: data,
      onOk: () => handleRemove(selectedRow._id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columnDefs: ColumnDefs = [
    {
      maxWidth: 60,
      field: 'cardinalNumber',
      headerName: t('managePages.gridNumericalOrder'),
      filter: false,
      sortable: false,
      cellStyle: { display: 'flex', justifyContent: 'center' }
    },
    {
      maxWidth: 290,
      field: 'title',
      headerName: t('managePages.gridTitle'),
      filter: 'agTextColumnFilter',
      flex: 2,
      wrapText: true,
      autoHeight: true
    },
    // {
    //   field: 'slug',
    //   headerName: t('managePages.gridSlug'),
    //   filter: 'agTextColumnFilter',
    //   flex: 2
    // },
    {
      field: 'description',
      headerName: t('managePages.gridDescription'),
      filter: false,
      sortable: false,
      flex: 2,
      wrapText: true,
      autoHeight: true
    },
    {
      field: 'url',
      headerName: t('managePages.gridURL'),
      filter: false,
      sortable: false,
      wrapText: true,
      flex: 2,
      minWidth: 300
    },
    {
      flex: 1,
      field: 'createdAt',
      maxWidth: 130,
      minWidth: 130,
      headerName: t('managePages.gridCreatedAt'),
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
      headerName: t('managePages.textCreatedBy'),
      filter: 'agTextColumnFilter',
      flex: 1,
      maxWidth: 130,
      minWidth: 130
    },
    // {
    //   flex: 1,
    //   field: 'status',
    //   headerName: t('managePages.gridStatus'),
    //   filter: 'agSetColumnFilter',
    //   filterParams: { values: [t('managePages.textPublic'), t('managePages.textNotPublic'), t('managePages.textDeleted')] },
    //   cellStyle: ({ value }) => {
    //     if (value === EnumPageStatus.Public)
    //       return { color: '#1B66FF', fontWeight: 600 }
    //     if (value === EnumPageStatus.Deleted)
    //       return { color: '#DC3545', fontWeight: 600 }
    //     return { color: '#8E8E8E', fontWeight: 600 }
    //   },
    //   valueFormatter: ({ value }) => {
    //     if (value === EnumPageStatus.Public) return t('category.textPublic')
    //     if (value === EnumPageStatus.Deleted) return t('category.textDeleted')
    //     if (value === EnumPageStatus.NotPublic) return t('category.textNotPublic')
    //     return t('category.textNotPublic')
    //   }
    // },
    {
      maxWidth: 100,
      flex: 2,
      headerName: t('managePages.gridAction'),
      field: 'Manipulation',
      filter: false,
      sortable: false,
      pinned: 'right',
      cellRendererFramework: (params: any) => {
        if (params.data) {
          return (
            <>
              <Button
                noFill
                // onClick={() => {
                //   modalFormPagesRef.current?.setCurrentPages({
                //     currentPages: params.data || null
                //   })
                //   modalFormPagesRef.current?.openModalFormPages()
                // }}
                onClick={() => {
                  handleEdit(params?.data?._id)
                }}
                iconName={<EditSapIcon />}
                className='btn-edit-item-grid'
                disabled={params?.data?.status === EnumPageStatus.Deleted}
              />
              <Button
                noFill
                onClick={() => {
                  onClickRemove(params?.data)
                }}
                iconName={<DeleteSapIcon style={{ color: '#BB0000' }} />}
                className={
                  params?.data?.status === EnumPageStatus.Deleted
                    ? 'cancel-public'
                    : ''
                }
                disabled={params?.data?.status === EnumPageStatus.Deleted}
              />
              <Popover
                key={1}
                placement={TooltipPlacement.BottomRight}
                overlayClassName='popDelete'
                // content={
                //   <List
                //     fullHeight
                //     forceClosePopover
                // data={[
                // {
                //   title: t('category.btnDelete'),
                //   type: 'multi',
                //   'data-ci': 'deletePages',
                //   onClick: () => {
                //     onClickRemove(params?.data)
                //   },
                //   disabled: params?.data?.status === EnumPageStatus.Deleted,
                //   className:
                //     params?.data?.status === EnumPageStatus.Deleted
                //       ? 'cancel-public'
                //       : ''
                // },
                // {
                //   title: t('category.btnCancelPublic'),
                //   type: 'multi',
                //   'data-ci': 'cancelPublicCategories',
                //   onClick: () => {

                //   },
                //   disabled: params?.data?.status === EnumPageStatus.Deleted,
                //   className: params?.data?.status === EnumPageStatus.Deleted ? 'cancel-public' : ''
                // }
                // ]}
                //   itemKey='key'
                // >
                //   {(item: any) => (
                //     <StandardListItem
                //       data={item}
                //       iconName={item.iconName}
                //       title={item.title}
                //       type={
                //         item.disabled
                //           ? ListItemType.Inactive
                //           : ListItemType.Active
                //       }
                //       onClick={item.onClick}
                //       className={item.className}
                //     />
                //   )}
                // </List>
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
        const filter = params.request.filterModel
        // params.api.setFilterModel(filter)
        const queryId = Date.now()
        currentQuery = queryId
        const filterInput: { fieldFilter: string; values: any[] }[] = []
        const searchInput: { fieldSearch: string; textSearch: any }[] = []
        let sortInput = params?.request?.sortModel?.map((s: any) => ({
          sort: s?.sort === 'asc' ? 1 : -1,
          fieldSort: s?.colId || null
        }))
        if (isEmpty(sortInput)) {
          sortInput = [{ fieldSort: 'createdAt', sort: -1 }]
        }

        Object.keys(filter).forEach((key: string) => {
          if (['set'].includes(filter[key]?.filterType)) {
            const newInputFilter = {
              fieldFilter: key,
              values: flattenDeep([getValueOffilter(filter[key])])
            }
            if (key === 'status') {
              newInputFilter.values = newInputFilter.values.map((x) => {
                if (x === t('managePages.textNotPublic'))
                  return EnumPageStatus.NotPublic
                if (x === t('managePages.textPublic'))
                  return EnumPageStatus.Public
                if (x === t('managePages.textDeleted'))
                  return EnumPageStatus.Deleted
                return EnumPageStatus.NotPublic
              })
            }
            filterInput.push(newInputFilter)
          } else if (params?.request?.filterModel[key]?.filterType === 'date') {
            searchInput.push({
              textSearch: params?.request?.filterModel[key]?.dateFrom || '',
              fieldSearch: key || ''
            })
          } else {
            searchInput.push({
              textSearch: params?.request?.filterModel[key].filter || '',
              fieldSearch: key || ''
            })
          }
        })
        const variables = {
          page,
          limit: paginationPageSize,
          filter: [...filterInput],
          search: searchInput,
          sort: sortInput
        }

        refetch(variables)
          .then(({ data, errors }) => {
            if (errors || queryId !== currentQuery) {
              return
            }

            const items = data?.getPagePagination?.data || []
            const currentPage = data?.getPagePagination.currentPage || 0
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
              totalPages: Number(data?.getPagePaginationTotal?.totalPages),
              totalRows: Number(data?.getPagePaginationTotal?.totalRows),
              currentPage: Number(data?.getPagePaginationTotal?.currentPage)
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
    gridName: 'pageList',
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
            {t('managePages.titleName')}
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
              // onClick={() => {
              //   modalFormPagesRef.current?.setCurrentPages({
              //     currentPages: null
              //   })
              //   modalFormPagesRef.current?.openModalFormPages()
              // }}
              onClick={() => {
                handleCreate()
              }}
            >
              {t('managePages.btnAddPage')}
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
            floatingFilter
          />
        </div>
      </div>
    </div>
  )
})

export default pageList
