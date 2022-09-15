import { ERPGrid } from '@digihcs/grid2'
import {
  ColumnDefs,
  PaginationFunctionParams
} from '@digihcs/grid2/es/e-r-p-grid/interface'
import MenuHisIcon from '@digihcs/icons/lib/his/MenuHisIcon'
import DeleteSapIcon from '@digihcs/icons/lib/sap/DeleteSapIcon'
import EditSapIcon from '@digihcs/icons/lib/sap/EditSapIcon'
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
import { flattenDeep, isEmpty } from 'lodash'
import moment from 'moment'
import React, {
  memo,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  IPaginationState,
  OverrideServerSideStoreType,
  PAGINATION
} from 'src/constant'
import {
  EnumGender,
  useGetStaffPaginationQuery,
  useGetStaffPaginationTotalQuery,
  useRemoveStaffMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { getValueOffilter, reducer } from 'src/utils/function'

import { StaffModalRef } from './interface'
import StaffModal from './modal'

import './index.less'

const Staff = memo(() => {
  const { t } = useTranslation()
  const gridApi = useRef(null)
  let currentQuery = 0

  const modalRef: RefObject<StaffModalRef> = useRef()

  const [paginationState, setPaginationState] = useReducer<
    (prev: IPaginationState, state: IPaginationState) => IPaginationState
  >(reducer, {
    currentPage: PAGINATION.DEFAULT_CURRENT_PAGE,
    totalPages: 0,
    totalRows: 0,
    sizePage: PAGINATION.DEFAULT_PAGE_SIZE
  })

  const { refetch } = useGetStaffPaginationQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: paginationState?.currentPage,
      limit: paginationState?.sizePage,
      filterInput: [],
      sortInput: [{ fieldSort: 'createdAt', sort: -1 }]
    }
  })

  const { refetch: refetchTotal } = useGetStaffPaginationTotalQuery({
    fetchPolicy: 'no-cache',
    variables: {
      limit: paginationState?.sizePage,
      filterInput: []
    }
  })

  const [callDelete] = useRemoveStaffMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.removeStaff) {
        messageToast.success({
          message: t('success.notiSuccess'),
          duration: 2
        })
        loadDataGrid()
      } else {
        messageToast.warning({
          description: t('category.notiCategoryRelevant'),
          message: (
            <span className='text-danger' style={{ fontWeight: 'bold' }}>
              {t('category.notiCannotDelete')}
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

  const handleRemove: any = (ids: string[] = []) => {
    callDelete({
      variables: {
        ids
      }
    })
  }

  const onClickRemove = useCallback(async (selectedRow) => {
    const data = [{ key: selectedRow._id, label: selectedRow.TenNhanVien }]
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

  const handleEdit = useCallback((rowSelect) => {
    modalRef.current.setSelectedRow(rowSelect)
    modalRef.current.onOpenModal()
  }, [])

  const columnDefs: ColumnDefs = [
    {
      headerName: t('staff.gridStaffCode'),
      field: 'MaNhanVien',
      maxWidth: 120
    },
    {
      headerName: t('staff.gridName'),
      field: 'TenNhanVien',
      minWidth: 200,
      flex: 1
    },
    {
      headerName: t('staff.gridGender'),
      field: 'GioiTinh',
      filter: 'agSetColumnFilter',
      filterParams: {
        values: [t('common.male'), t('common.otherGender'), t('common.female')],
        comparator: (a: string, b: string) => (a > b ? -1 : 1)
      },
      valueFormatter: ({ value }) => {
        if (value === EnumGender.Male) return t('common.male')
        if (value === EnumGender.Female) return t('common.female')
        if (value === EnumGender.Other) return t('common.otherGender')
        return ''
      },
      maxWidth: 75
    },
    {
      headerName: t('staff.gridDOB'),
      field: 'NgaySinh',
      filter: 'agDateColumnFilter',
      filterParams: {
        filterOptions: ['equals']
      },
      valueFormatter: ({ value }) => {
        if (value) {
          return moment(value).format('DD/MM/YYYY')
        }
        return '--/--/----'
      },
      maxWidth: 90
    },
    {
      headerName: 'Email',
      field: 'Email',
      maxWidth: 150
    },
    {
      headerName: t('staff.gridPhone'),
      field: 'SoDienThoai',
      maxWidth: 150
    },
    {
      headerName: t('staff.gridAddress'),
      field: 'fullAddress',
      valueGetter: (params) => {
        if (params.data?.fullAddress !== 'undefined') {
          return params.data?.fullAddress
        }
        return ''
      },
      minWidth: 200,
      flex: 1,
      filter: false
    },
    {
      headerName: t('staff.gridID'),
      field: 'CMNDHoacHoChieu',
      maxWidth: 150
    },
    {
      headerName: t('staff.gridTaxCode'),
      field: 'TaxCode',
      minWidth: 100,
      flex: 1
    },
    {
      headerName: t('staff.gridStatus'),
      field: 'TamNgung',
      minWidth: 100,
      flex: 1,
      filter: 'agSetColumnFilter',
      filterParams: {
        values: [t('staff.textActive'), t('staff.textUnActive')]
      },
      cellStyle: ({ value }) => {
        if (value) return { color: '#8E8E8E', fontWeight: 600 }

        return { color: '#1B66FF', fontWeight: 600 }
      },
      valueFormatter: ({ value }) => {
        if (value) return t('staff.textUnActive')
        return t('staff.textActive')
      }
    },
    {
      headerName: t('staff.gridAction'),
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
                onClick={() => handleEdit(params.data)}
                iconName={<EditSapIcon />}
                className='btn-edit-item-grid'
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
                        iconName: (
                          <DeleteSapIcon style={{ color: '#BB0000' }} />
                        ),
                        title: t('staff.textDeleteStaff'),
                        type: 'multi',
                        'data-ci': 'deleteStaff',
                        onClick: () => {
                          onClickRemove(params.data)
                        }
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
          if (['set'].includes(filter[key]?.filterType)) {
            const newInputFilter = {
              fieldFilter: key,
              values: flattenDeep([getValueOffilter(filter[key])])
            }
            if (key === 'TamNgung') {
              newInputFilter.values = newInputFilter.values.map((x) =>
                String(x === t('staff.textUnActive'))
              )
            }
            if (key === 'GioiTinh') {
              newInputFilter.values = newInputFilter.values.map((x) => {
                if (x === t('common.male')) return EnumGender.Male
                if (x === t('common.female')) return EnumGender.Female
                return EnumGender.Other
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
            const items = data?.getStaffPagination?.data || []
            const currentPage = data?.getStaffPagination.currentPage || 0
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
              totalPages: Number(data?.getStaffPaginationTotal?.totalPages),
              totalRows: Number(data?.getStaffPaginationTotal?.totalRows),
              currentPage: Number(data?.getStaffPaginationTotal?.currentPage)
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

  const updateGrid = useCallback((api: any, dataSource: any) => {
    api?.setServerSideDatasource(dataSource)
  }, [])

  const loadDataGrid = useCallback(
    async (args?: { api?: any; page?: number; limit?: number }) => {
      let { page, limit } = args || {
        page: paginationState.currentPage,
        limit: paginationState.sizePage
      }
      const { api } = args || { api: null }
      if (!page) page = paginationState.currentPage
      if (!limit) limit = paginationState.sizePage
      if (!api) updateGrid(gridApi?.current, fetchDatasource(page, limit))
      else updateGrid(api, fetchDatasource(page, limit))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationState, gridApi]
  )

  const nextPage = useCallback(
    (params: PaginationFunctionParams) => {
      updateGrid(
        params.gridOptions.api,
        fetchDatasource(params.currentPage + 1, params.pageSize)
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const prevPage = useCallback(
    (params: PaginationFunctionParams) => {
      updateGrid(
        params.gridOptions.api,
        fetchDatasource(params.currentPage - 1, params.pageSize)
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const changeSizePage = useCallback(
    (params: PaginationFunctionParams) => {
      params.gridOptions.api.paginationSetPageSize(Number(params.pageSize))
      setPaginationState({
        sizePage: params.pageSize
      })
      updateGrid(
        params.gridOptions.api,
        fetchDatasource(params.currentPage, params.pageSize)
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const goToPage = useCallback(
    (params: PaginationFunctionParams) => {
      updateGrid(
        params.gridOptions.api,
        fetchDatasource(params.gotoPage, params.pageSize)
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const gridOptions: any = useMemo(
    () => ({
      gridName: 'StaffManagement',
      onGridReady: (gridOpts: any) => {
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
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    const prevTitle = window.document.title
    window.document.title = t('staff.textStaff')

    return () => {
      window.document.title = prevTitle
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='staff'>
      <div>
        <div className='title_bar'>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>
            {t('staff.titleName')}
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
                modalRef.current.onOpenModal()
              }}
            >
              {t('staff.btnAddStaff')}
            </Button>
          </div>
        </div>

        <div style={{ height: 'calc(100vh - 110px)' }}>
          <ERPGrid
            {...gridOptions}
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

      <StaffModal ref={modalRef} callBack={loadDataGrid} />
    </div>
  )
})

export default Staff
