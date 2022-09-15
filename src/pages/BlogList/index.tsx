import { ERPGrid } from '@digihcs/grid2'
import {
  ColumnDefs,
  PaginationFunctionParams
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import { DeleteSapIcon, EditSapIcon, MenuHisIcon } from '@digihcs/icons'
import {
  Button,
  Checkbox,
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
import { memo, useCallback, useEffect, useReducer, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import {
  useChangePriorityBlogMutation,
  useDeleteBlogMutation,
  useGetBlogPaginationQuery,
  useGetBlogPaginationTotalQuery,
  useUnChangePriorityMultiBlogMutation,
  useUpdateFeatureBlogMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { getValueOffilter, reducer } from 'src/utils/function'
import { getUrlImage } from 'src/utils/uploadFile'

import {
  IPaginationState,
  OverrideServerSideStoreType,
  PAGINATION
} from '../../constant'
import dataBlogsGroup from '../ManageBlog/directories.json'
import { BlogsType } from '../ManageBlog/type'
import { formatPopoverData } from '../SettingUser/utils'

import './styles.less'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Blogs = {
  _id: string
}

const BlogList = memo(() => {
  const history: any = useHistory()
  const { t } = useTranslation()
  const { push } = useHistory()
  const gridApi = useRef<any>(null)
  let currentQuery = 0
  // let nextPriority = 1
  const [paginationState, setPaginationState] = useReducer<
    (prev: IPaginationState, state: IPaginationState) => IPaginationState
  >(reducer, {
    currentPage: PAGINATION.DEFAULT_CURRENT_PAGE,
    totalPages: 0,
    totalRows: 0,
    sizePage: PAGINATION.DEFAULT_PAGE_SIZE
  })

  const {
    refetch,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: dataBlogs,
    loading
  } = useGetBlogPaginationQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: paginationState?.currentPage,
      limit: paginationState?.sizePage,
      filter: [],
      sort: [{ fieldSort: 'publishAt', sort: -1 }]
    }
  })

  const { refetch: refetchTotal } = useGetBlogPaginationTotalQuery({
    fetchPolicy: 'no-cache',
    variables: {
      limit: paginationState?.sizePage,
      filter: []
    }
  })

  const [callDelete]: any = useDeleteBlogMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.deleteBlog) {
        messageToast.success({
          message: t('manageBlog.notiDeleteSuccess'),
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
  const [callChangePriority]: any = useChangePriorityBlogMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.changePriorityBlog) {
        messageToast.success({
          message: t('Change Priority Success'),
          duration: 2
        })
        loadDataGrid()
      } else {
        messageToast.warning({
          description: t('category.notiCategoryRelevant'),
          message: (
            <span className='text-danger' style={{ fontWeight: 'bold' }}>
              {t('Can not change Priority')}
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
  const [callUnchangePriorityMulti]: any = useUnChangePriorityMultiBlogMutation(
    {
      fetchPolicy: 'no-cache',
      onCompleted: async (data: any) => {
        if (data?.unChangePriorityMultiBlog[0]?._id) {
          messageToast.success({
            message: t('Change Priority Success'),
            duration: 2
          })
          loadDataGrid()
          gridApi.current.deselectAll()
        } else {
          messageToast.warning({
            description: t('category.notiCategoryRelevant'),
            message: (
              <span className='text-danger' style={{ fontWeight: 'bold' }}>
                {t('Can not change Priority')}
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
    }
  )
  const [callUpdateFeatureBlog]: any = useUpdateFeatureBlogMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.updateFeatureBlog?._id) {
        messageToast.success({
          message: t('manageBlog.notiFeatureBlogSuccess'),
          duration: 2
        })
        loadGrid()
      } else {
        messageToast.warning({
          description: t('category.notiCategoryRelevant'),
          message: (
            <span className='text-danger' style={{ fontWeight: 'bold' }}>
              {t('manageBlog.notiFeatureBlogFailed')}
            </span>
          ),
          duration: 6
        })
      }
    },
    onError: (error) => {
      const errorApollo: any = error?.graphQLErrors?.[0]
      messageToast.error({
        message: errorApollo?.code
          ? t(`errorCode.${errorApollo?.code}`)
          : error?.message,
        duration: 2
      })
      loadDataGrid()
    }
  })

  const handleRemove: any = (ids: string[] = []) => {
    callDelete({
      variables: {
        ids
      }
    })
  }

  const handleUpdateFeatureBlog: any = (ids: string[] = []) => {
    callUpdateFeatureBlog({
      variables: {
        ids
      }
    })
  }

  const onClickRemove = useCallback(async (selectedRow) => {
    const data = [{ key: selectedRow._id, label: selectedRow.title }]
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('manageBlog.msgDelete'),
      centered: true,
      type: ConfirmType.Error,
      okText: t('category.btnDelete'),
      cancelText: t('category.btnExit'),
      tags: data,
      onOk: () => handleRemove(selectedRow._id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangePriority: any = (ids: string[] = []) => {
    callChangePriority({
      variables: {
        ids
      }
    })
  }
  const onClickPriority = useCallback(async (selectedRow) => {
    const data = [{ key: selectedRow._id, label: selectedRow.title }]
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('manageBlog.msgPriority'),
      centered: true,
      type: ConfirmType.Confirm,
      okText: t('manageBlog.btnOk'),
      cancelText: t('category.btnExit'),
      tags: data,
      onOk: () => handleChangePriority(selectedRow._id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleUnChangePriorityMulti: any = (ids: string[] = []) => {
    callUnchangePriorityMulti({
      variables: {
        ids
      }
    })
  }
  const onClickChangePriorityMulti = (selectedRows: any) => {
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('manageBlog.textConfirmUnPriority'),
      // content: 'Bạn có chắc chắn muốn xóa những bệnh nhân đã chọn?',
      centered: true,
      type: ConfirmType.Information,
      tags: selectedRows,
      okText: t('manageBlog.btnOk'),
      cancelText: t('category.btnExit'),
      onOk: () =>
        handleUnChangePriorityMulti(selectedRows.map((item: any) => item.key))
    })
  }
  const handleCreate = () => {
    let finded = null
    const findedCT_Blogs = dataBlogsGroup.find(
      (i: BlogsType) => i.route === '/blog-create'
    )

    finded = findedCT_Blogs
    if (finded?.type === 'his') {
      history.push(`/manage-blog${finded.route}`)
    } else {
      window.location.href = `${window.location.origin}/manage-blog${finded?.route}`
    }
  }
  const handleEdit = (id: string) => {
    let finded = null
    const findedCT_Blogs = dataBlogsGroup.find(
      (i: BlogsType) => i.route === '/blog-detail'
    )

    finded = findedCT_Blogs
    if (finded?.type === 'his') {
      history.push(`/manage-blog${finded.route}/${id}`)
    } else {
      window.location.href = `${window.location.origin}/manage-blog${finded?.route}`
    }
  }

  useEffect(() => {
    if (!loading) gridApi.current?.hideOverlay()
    else gridApi.current?.showLoadingOverlay()
  }, [loading])

  const loadGrid = useCallback(async () => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onClickUpdateFeatureBlog = useCallback(async (selectedRow) => {
    handleUpdateFeatureBlog(selectedRow._id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  function SortWithPriority(ascending: any) {
    // eslint-disable-next-line func-names
    return function (a: any, b: any) {
      // equal items sort equally
      if (a.priority === b.priority) {
        return 0
      }

      // nulls sort after anything else
      if (a.priority === null) {
        return 1
      }
      if (b.priority === null) {
        return -1
      }

      // otherwise, if we're ascending, lowest sorts first
      if (ascending) {
        return a.priority < b.priority ? -1 : 1
      }

      // if descending, highest sorts first
      return a.priority < b.priority ? 1 : -1
    }
  }
  const columnDefs: ColumnDefs = [
    {
      field: 'cardinalNumber',
      headerName: t('manageBlog.gridBlogNo'),
      filter: false,
      flex: 1,
      pinned: 'left',
      maxWidth: 60,
      cellStyle: { display: 'flex', 'justify-content': 'center' }
    },
    {
      flex: 1,
      maxWidth: 153,
      filter: false,
      sortable: false,
      autoHeight: true,
      field: 'mainPhoto',
      headerName: t('manageBlog.textImage'),
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
                height: 70,
                border: '1px solid #ddd'
              }}
            >
              <img
                alt='img'
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
      field: 'title',
      headerName: t('manageBlog.gridBlogTitle'),
      filter: 'agTextColumnFilter',
      flex: 2,
      wrapText: true,
      minWidth: 180,
      autoHeight: true
    },
    {
      field: 'sortContent',
      headerName: t('manageBlog.textSortContent'),
      filter: false,
      flex: 2,
      minWidth: 180,
      wrapText: true,
      autoHeight: true
    },
    {
      field: 'url',
      filter: false,
      sortable: false,
      headerName: t('manageBlog.gridURL'),
      minWidth: 170,
      wrapText: true,
      autoHeight: true
    },
    {
      field: 'isFeatureBlog',
      headerName: t('manageBlog.gridFeatured'),
      filter: true,
      flex: 1,
      filterParams: {
        values: [
          t('manageBlog.textFeatureTrue'),
          t('manageBlog.textFeatureFalse')
        ]
      },
      cellStyle: { justifyContent: 'center' },
      cellRendererFramework: (params: any) => {
        if (params?.data) {
          return (
            <Checkbox
              defaultChecked={params?.data?.isFeatureBlog}
              onClick={() => {
                onClickUpdateFeatureBlog(params?.data)
              }}
            />
          )
        }
        return ''
      }
    },
    {
      field: 'priority',
      headerName: t('manageBlog.textPriority'),
      filter: false,
      flex: 1,
      cellStyle: { justifyContent: 'center' }
    },
    {
      flex: 1,
      field: 'createdAt',
      headerName: t('manageBlog.gridCreatedAt'),
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
      field: 'createdBy.username',
      headerName: t('manageBlog.gridCreatedBy'),
      filter: 'agTextColumnFilter'
    },
    {
      flex: 1,
      headerName: t('manageBlog.gridAction'),
      field: 'Manipulation',
      filter: false,
      sortable: false,
      pinned: 'right',
      minWidth: 100,
      width: 100,
      maxWidth: 100,
      cellStyle: { display: 'flex', 'justify-content': 'center' },
      cellRendererFramework: (params: any) => {
        if (params.data) {
          return (
            <>
              <Button
                noFill
                iconName={<EditSapIcon />}
                onClick={() => {
                  handleEdit(params?.data?._id)
                }}
                className='btn-edit-item-grid'
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
                content={
                  <List
                    fullHeight
                    forceClosePopover
                    data={[
                      {
                        title:
                          params?.data?.priority == null
                            ? `${t('manageBlog.textPriority')}`
                            : t('manageBlog.textUnPriority'),
                        type: 'multi',
                        'data-ci': 'deleteCategories',
                        onClick: () => {
                          onClickPriority(params?.data)
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
      }
    }
  ]

  const popoverData = [
    {
      icon: (
        <DeleteSapIcon className='icon-custom' style={{ color: '#BB0000' }} />
      ),
      text: t('manageBlog.textUnPriority'),
      type: 'multi',
      'data-ci': 'downloadFileMau',
      onClick: (selectedRows: any) => {
        onClickChangePriorityMulti(
          selectedRows.map((item: any) => ({
            key: item._id,
            label: item.title
          }))
        )
      }
    }
  ]

  const fetchDatasource = (page: number, paginationPageSize: number) => ({
    // called by the grid when more rows are required

    getRows: async (params: any) => {
      try {
        const filterParams = params.request.filterModel
        // params.api.setFilterModel(filter)
        const queryId = Date.now()
        currentQuery = queryId
        const filter: { fieldFilter: string; values: any[] }[] = []
        const search: { fieldSearch: string; textSearch: any }[] = []
        let sort = params?.request?.sortModel?.map((s: any) => ({
          sort: s?.sort === 'asc' ? 1 : -1,
          fieldSort: s?.colId || null
        }))

        if (isEmpty(sort)) {
          sort = [
            { fieldSort: 'priority', sort: 1 },
            { fieldSort: 'createdAt', sort: -1 }
          ]
        }

        Object.keys(filterParams).forEach((key: string) => {
          const new_key = key

          if (['set'].includes(filterParams[key]?.filterType)) {
            const newInputFilter = {
              fieldFilter: new_key,
              values: flattenDeep([getValueOffilter(filterParams[key])])
            }
            // if (key === 'status') {
            //   newInputFilter.values = newInputFilter.values.map((x) => {
            //     if (x === t('category.textNotPublic'))
            //       return EnumBlogStatus.NotPublic
            //     if (x === t('category.textPublic')) return EnumBlogStatus.Public
            //     return EnumBlogStatus.Public
            //   })
            // }
            if (key === 'isFeatureBlog') {
              // eslint-disable-next-line array-callback-return
              newInputFilter.values = newInputFilter.values.map((x) => {
                if (x === t('manageBlog.textFeatureTrue')) return 'true'
                if (x === t('manageBlog.textFeatureFalse')) return 'false'
              })

              if (newInputFilter.values.length > 0) {
                filter.push(newInputFilter)
              }
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
            const items = data?.getBlogPagination?.data || []
            const currentPage = data?.getBlogPagination.currentPage || 0
            const rowData: any[] = []
            items.forEach((value: any, index: number) => {
              const newValue: any = {
                index: (currentPage - 1) * paginationPageSize + index + 1,
                ...value
              }

              rowData.push(newValue)
            })
            if (sort[0].fieldSort === 'priority' && sort[0].sort === 1) {
              params.successCallback(
                rowData.sort(SortWithPriority(true)) || [],
                (rowData.sort(SortWithPriority(true)) || []).length
              )
            } else if (
              sort[0].fieldSort === 'priority' &&
              sort[0].sort === -1
            ) {
              params.successCallback(
                rowData.sort(SortWithPriority(false)) || [],
                (rowData.sort(SortWithPriority(false)) || []).length
              )
            } else {
              params.successCallback(
                rowData.sort(SortWithPriority(true)) || [],
                (rowData.sort(SortWithPriority(true)) || []).length
              )
            }
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
              totalPages: Number(data?.getBlogPaginationTotal?.totalPages),
              totalRows: Number(data?.getBlogPaginationTotal?.totalRows),
              currentPage: Number(data?.getBlogPaginationTotal?.currentPage)
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
    gridName: 'BlogList',
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
    headerDefs: [
      {
        key: 'addMoreData',
        text: t('product.btnAdd'),
        type: 'default',
        noFill: false,
        iconName: 'add',
        tooltip: t('component.common.label.addNew'),
        onClick: () => push('/manage-blog/blog-create')
      },
      {
        key: 'menu',
        iconName: <MenuHisIcon />,
        popover: {
          placement: TooltipPlacement.BottomRight,
          content: formatPopoverData(popoverData)
        },
        type: 'default'
      }
    ],
    rowModelType: 'serverSide',
    enableServerSideSorting: true,
    serverSideStoreType: OverrideServerSideStoreType.Partial
  }

  return (
    <>
      <div style={{ height: 'calc(100vh - 70px)' }}>
        <ERPGrid
          title={t('manageBlog.titleName')}
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
    </>
  )
})

export default BlogList
