import { ERPGrid } from '@digihcs/grid2'
import {
  ColumnDefs,
  PaginationFunctionParams
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import { EditSapIcon, MenuHisIcon } from '@digihcs/icons'
import {
  Button,
  List,
  messageToast,
  Modal,
  Popover,
  StandardListItem
} from '@digihcs/innos-ui3'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
import { ListItemType } from '@digihcs/util/lib/enums/ListItemType'
import { TooltipPlacement } from '@digihcs/util/lib/enums/TooltipPlacement'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GridReadyEvent } from 'ag-grid-community/dist/lib/events'
import { flattenDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { memo, useCallback, useReducer, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import FormCategoriesModal, {
  ModalFormCategoriesRefs
} from 'src/components/formCategoriesModal'
import {
  EnumCategoriesStatus,
  useGetEcomCategoriesPaginationQuery,
  useGetEcomCategoriesPaginationTotalQuery,
  useRemoveEcomCategoriesMutation,
  useUpdateCancelPublicCategoriesMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { getValueOffilter, reducer } from 'src/utils/function'

import {
  IPaginationState,
  OverrideServerSideStoreType,
  PAGINATION
} from '../../constant'

import './styles.less'

const ProductCategoryList = memo(() => {
  const { t } = useTranslation()
  const gridApi = useRef<any>(null)
  let currentQuery = 0

  const modalFormCategoriesRef = useRef<ModalFormCategoriesRefs>(null)

  const [paginationState, setPaginationState] = useReducer<
    (prev: IPaginationState, state: IPaginationState) => IPaginationState
  >(reducer, {
    currentPage: PAGINATION.DEFAULT_CURRENT_PAGE,
    totalPages: 0,
    totalRows: 0,
    sizePage: PAGINATION.DEFAULT_PAGE_SIZE
  })

  const { refetch } = useGetEcomCategoriesPaginationQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: paginationState?.currentPage,
      limit: paginationState?.sizePage,
      filterInput: [],
      sortInput: [{ fieldSort: 'createdAt', sort: -1 }]
    }
  })

  const { refetch: refetchTotal } = useGetEcomCategoriesPaginationTotalQuery({
    fetchPolicy: 'no-cache',
    variables: {
      limit: paginationState?.sizePage,
      filterInput: []
    }
  })

  const [callDelete]: any = useRemoveEcomCategoriesMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.removeEcomCategories) {
        messageToast.success({
          message: t('category.notiDeleteSuccess'),
          duration: 2
        })
        loadDataGrid()
        modalFormCategoriesRef.current?.refetchDataCategoriesParent()
      } else {
        messageToast.warning({
          description: t('category.notiCategoryRelevant'),
          message: (
            <span className='text-danger' style={{ fontWeight: 'bold' }}>
              {t('category.notiCannotDelete')}
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
          : t('category.notiDeleteFailed'),
        duration: 2
      })
    }
  })

  const [callCancelPublic]: any = useUpdateCancelPublicCategoriesMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.updateCancelPublicCategories) {
        messageToast.success({
          message: t('category.notiCancelPublicSuccess'),
          duration: 2
        })
        loadDataGrid()
        modalFormCategoriesRef.current?.refetchDataCategoriesParent()
      } else {
        messageToast.warning({
          description: t('category.notiCancelPublicRelevant'),
          message: (
            <span className='text-danger' style={{ fontWeight: 'bold' }}>
              {t('category.notiCancelPublicFailed')}
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
          : t('category.notiCancelPublicFailed'),
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
    const data = [{ key: selectedRow._id, label: selectedRow.CategoryName }]
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('category.msgDelete'),
      centered: true,
      type: ConfirmType.Error,
      okText: t('category.btnDelete'),
      cancelText: t('category.btnExit'),
      tags: data,
      onOk: () => handleRemove(selectedRow._id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCancelPublic = (id: string) => {
    callCancelPublic({
      variables: {
        id
      }
    })
  }

  const columnDefs: ColumnDefs = [
    {
      field: 'CategoryName',
      headerName: t('category.textName'),
      filter: 'agTextColumnFilter',
      flex: 2
    },
    {
      field: 'CategoryParent.CategoryName',
      headerName: t('category.gridCategoryParent'),
      filter: 'agTextColumnFilter',
      flex: 2,
      sortable: false
    },
    {
      field: 'Slug',
      headerName: 'Slug',
      filter: 'agTextColumnFilter',
      flex: 2
    },
    {
      flex: 1,
      field: 'createdAt',
      headerName: t('category.gridCreated'),
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
      flex: 1,
      field: 'Status',
      headerName: t('category.gridStatus'),
      filter: 'agSetColumnFilter',
      filterParams: {
        values: [t('category.textPublic'), t('category.textNotPublic')]
      },
      cellStyle: ({ value }) => {
        if (value === EnumCategoriesStatus.Public)
          return { color: '#1B66FF', fontWeight: 600 }

        return { color: '#8E8E8E', fontWeight: 600 }
      },
      valueFormatter: ({ value }) => {
        if (value === EnumCategoriesStatus.Public)
          return t('category.textPublic')
        if (value === EnumCategoriesStatus.Deleted)
          return t('category.textDeleted')
        return t('category.textNotPublic')
      }
    },
    {
      flex: 1,
      headerName: t('category.gridAction'),
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
                onClick={() => {
                  modalFormCategoriesRef.current?.setCurrentCategories({
                    currentCategories: params.data || null
                  })
                  modalFormCategoriesRef.current?.openModalFormCategories()
                }}
                iconName={<EditSapIcon />}
                className='btn-edit-item-grid'
                disabled={params?.data?.Status === EnumCategoriesStatus.Public}
              />
              <Popover
                key={1}
                placement={TooltipPlacement.BottomRight}
                overlayClassName='popDelete'
                content={
                  <List
                    fullHeight
                    forceClosePopover
                    data={[
                      {
                        title: t('category.btnDelete'),
                        type: 'multi',
                        'data-ci': 'deleteCategories',
                        onClick: () => {
                          onClickRemove(params?.data)
                        },
                        disabled:
                          params?.data?.Status === EnumCategoriesStatus.Public,
                        className:
                          params?.data?.Status === EnumCategoriesStatus.Public
                            ? 'cancel-public'
                            : ''
                      },
                      {
                        title: t('category.btnCancelPublic'),
                        type: 'multi',
                        'data-ci': 'deleteCategories',
                        onClick: () => {
                          handleCancelPublic(params?.data?._id)
                        },
                        disabled:
                          params?.data?.Status ===
                          EnumCategoriesStatus.Notpublic,
                        className:
                          params?.data?.Status ===
                          EnumCategoriesStatus.Notpublic
                            ? 'cancel-public'
                            : ''
                      }
                    ]}
                    itemKey='key'
                  >
                    {(item: any) => (
                      <StandardListItem
                        data={item}
                        iconName={item.iconName}
                        title={item.title}
                        type={
                          item.disabled
                            ? ListItemType.Inactive
                            : ListItemType.Active
                        }
                        onClick={item.onClick}
                        className={item.className}
                      />
                    )}
                  </List>
                }
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
      },
      maxWidth: 77
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
          let new_key = key
          if (new_key === 'CategoryParent.CategoryName')
            new_key = 'CategoryParent'
          if (['set'].includes(filter[key]?.filterType)) {
            const newInputFilter = {
              fieldFilter: new_key,
              values: flattenDeep([getValueOffilter(filter[key])])
            }
            if (key === 'Status') {
              newInputFilter.values = newInputFilter.values.map((x) => {
                if (x === t('category.textNotPublic'))
                  return EnumCategoriesStatus.Notpublic
                if (x === t('category.textPublic'))
                  return EnumCategoriesStatus.Public
                return EnumCategoriesStatus.Public
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
          filterInput: [...filterInput],
          searchInput,
          sortInput
        }

        refetch(variables)
          .then(({ data, errors }) => {
            if (errors || queryId !== currentQuery) {
              return
            }
            const items = data?.getEcomCategoriesPagination?.data || []
            const currentPage =
              data?.getEcomCategoriesPagination.currentPage || 0
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
                data?.getEcomCategoriesPaginationTotal?.totalPages
              ),
              totalRows: Number(
                data?.getEcomCategoriesPaginationTotal?.totalRows
              ),
              currentPage: Number(
                data?.getEcomCategoriesPaginationTotal?.currentPage
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
    gridName: 'ProductCategoryList',
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
            {t('category.titleName')}
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
                modalFormCategoriesRef.current?.setCurrentCategories({
                  currentCategories: null
                })
                modalFormCategoriesRef.current?.openModalFormCategories()
              }}
            >
              {t('category.btnAdd')}
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
            hideCheckbox
            defaultPageSize={paginationState?.sizePage || 50}
            floatingFilter
          />
        </div>
      </div>

      <FormCategoriesModal
        ref={modalFormCategoriesRef}
        refetchGridData={loadDataGrid}
      />
    </div>
  )
})

export default ProductCategoryList
