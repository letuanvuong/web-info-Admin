import { ERPGrid } from '@digihcs/grid2'
import {
  ColumnDefs,
  PaginationFunctionParams
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import {
  DeleteSapIcon,
  DownloadSapIcon,
  EditSapIcon,
  MenuHisIcon,
  UploadSapIcon
} from '@digihcs/icons'
import {
  Button,
  Footer,
  messageToast,
  Modal,
  Popover
} from '@digihcs/innos-ui3'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
import { TooltipPlacement } from '@digihcs/util/lib/enums/TooltipPlacement'
import { GridReadyEvent } from 'ag-grid-community/dist/lib/events'
import { flattenDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { memo, useCallback, useReducer, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import ImportModal from 'src/components/importModal/importModal'
import {
  EnumStockModelStatus,
  useDeleteStockModelMutation,
  useGetStockModelPaginationNameQuery,
  useGetStockModelPaginationQuery,
  useGetStockModelPaginationTotalQuery,
  useImportFileStockModelMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { getValueOffilter, reducer } from 'src/utils/function'
import { getUrlImage } from 'src/utils/uploadFile'
import * as XLSX from 'xlsx'

import {
  IPaginationState,
  OverrideServerSideStoreType,
  PAGINATION
} from '../../constant'
import { formatPopoverData } from '../SettingUser/utils'

import './styles.less'

const ProductList = memo(() => {
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
  const { data: dataProduct, refetch } = useGetStockModelPaginationQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: paginationState?.currentPage,
      limit: paginationState?.sizePage,
      filter: [],
      sort: [{ fieldSort: 'createdAt', sort: -1 }]
    }
  })

  const { data: dataName, refetch: refetchName } =
    useGetStockModelPaginationNameQuery({
      fetchPolicy: 'no-cache',
      variables: {
        page: 1
      }
    })

  const [importFileStockModelMutation] = useImportFileStockModelMutation()

  const listNameProduct = dataName?.getStockModelPagination?.data || []

  const { refetch: refetchTotal } = useGetStockModelPaginationTotalQuery({
    fetchPolicy: 'no-cache',
    variables: {
      limit: paginationState?.sizePage,
      filter: []
    }
  })

  const [callDelete]: any = useDeleteStockModelMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data: any) => {
      if (data?.deleteStockModel) {
        messageToast.success({
          message: t('product.notiDeleteSuccess'),
          duration: 2
        })
        loadDataGrid()
      } else {
        messageToast.warning({
          description: t('product.notiCategoryRelevant'),
          message: (
            <span className='text-danger' style={{ fontWeight: 'bold' }}>
              {t('product.notiCannotDelete')}
            </span>
          ),
          duration: 6
        })
      }
    },
    onError: (error: any) => {
      messageToast.error({
        message: error?.message
          ? error?.message
          : t('product.notiDeleteFailed'),
        duration: 2
      })
    }
  })

  const handleRemove: any = (id: string) => {
    callDelete({
      variables: {
        id
      }
    })
  }

  const onClickRemove = useCallback(async (selectedRow) => {
    const data = [{ key: selectedRow._id, label: selectedRow.name }]
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('product.msgDelete'),
      centered: true,
      type: ConfirmType.Error,
      okText: t('product.btnDelete'),
      cancelText: t('product.btnExit'),
      tags: data,
      onOk: () => handleRemove(selectedRow._id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [visibleImport, setVisibleImport] = useState(false)
  const { push } = useHistory()
  const paramProduct = '/manage-product/product-list'
  const stateReducer = (currentState: any, newState: any) => ({
    ...currentState,
    ...newState
  })

  const ColumnDefImport: ColumnDefs = [
    {
      field: 'ecomImages',
      headerName: t('product.image'),
      filter: false,
      sortable: false,
      autoHeight: true,
      cellStyle: { justifyContent: 'center' },
      cellRendererFramework: (params: any) => {
        const linkImage =
          (params?.data?.ecomImages &&
            (params?.data?.ecomImages.length > 0 &&
              params?.data?.ecomImages.filter(
                (img: any) => img?.linkImage !== null
              ))[0]?.linkImage) ||
          ''

        if (linkImage) {
          params?.node?.setRowHeight(120)
          gridApi.current.onRowHeightChanged()
          return (
            <div
              style={{
                width: 90,
                height: 100,
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
      },
      flex: 1
    },
    {
      field: 'name',
      headerName: t('product.textName'),
      filter: false,
      sortable: false,
      flex: 2
    },
    {
      field: 'upc',
      headerName: t('product.textUpc'),
      filter: false,
      sortable: false,
      flex: 1
    },
    {
      field: 'sku',
      headerName: t('product.textSku'),
      filter: false,
      sortable: false,
      flex: 1
    },
    {
      flex: 1,
      field: 'ecomStatus',
      headerName: t('product.gridStatus'),
      filter: false,
      sortable: false
    }
  ]

  const [state, setState] = useReducer(stateReducer, {
    rowSelection: 'multiple',
    currentPage: 1,
    pageSize: 50,
    rowCount: 0,
    pageCount: 0,
    rowDataImport: null,
    hasImportError: false,
    visibleImport: false
  })
  const { rowDataImport, hasImportError } = state

  const readXLSXFile = useCallback(
    ({ target }) => {
      const reader = new FileReader()
      if (!target.files[0]) return
      reader.readAsBinaryString(target.files[0])
      reader.onload = (e) => {
        if (e.target.result) {
          const workbook = XLSX.read(e.target.result, { type: 'binary' })
          const fileData: any = XLSX.utils.sheet_to_json(
            workbook.Sheets['List Product'],
            {
              raw: false
            }
          )
          const data: any[] = []
          const rowErrors: any[] = []
          let rowIndex = 2
          // eslint-disable-next-line no-restricted-syntax
          for (const item of fileData) {
            const unit: any = {
              name: ['box'],
              factor: [1],
              realFactor: [1],
              sumFactor: 1
            }
            const prices: any = [
              {
                idPriceType: 'default',
                price: []
              }
            ]
            const d: any = {
              name: String(item['[Product Name]'] || '').trim(),
              errors: []
            }
            if (!d.name) {
              d.errors.push(t('product.notiMissName'))
            }

            const isDuplicate = data.some((item) => item.name === d.name)
            if (isDuplicate) {
              d.errors.push(t('product.notiDuplicateName'))
            }

            const isDuplicateName = listNameProduct.some(
              (item) => item.name === d.name
            )
            if (isDuplicateName) {
              d.errors.push(t('product.notiExistsName'))
            }

            const Thumbnail = item['[Product Image]'] || ''
            if (!Thumbnail.length) {
              d.errors.push(t('product.notiProductImg'))
            }

            let status = item['[Product Status]'] || ''
            if (!status.length) {
              d.errors.push(t('product.notiProductStatus'))
            }
            if (status !== 'Public' && status !== 'Draft') {
              d.errors.push(t('product.notiProductPD'))
            }
            if (status === 'Public') {
              status = 'Public'
            }
            if (status === 'Draft') {
              status = 'NotPublic'
            }

            const imageGallery = item['[Product Gallery]'] || ''
            if (imageGallery.length) {
              if (imageGallery.split(';').length > 1) {
                imageGallery.split(';').forEach((item: any) => {
                  if ((item.match(/http/g) || []).length >= 2) {
                    d.errors.push(t('product.notiMiss'))
                  }
                })
              }
              const isMissChar =
                (imageGallery.split(';')[0].match(/http/g) || []).length >= 2
              if (isMissChar) {
                d.errors.push(t('product.notiMiss'))
              }
            }
            const ecomImages = imageGallery
              ? ([Thumbnail, ...imageGallery.split(';')] || []).map((item) => ({
                  linkImage: {
                    url: item,
                    fileName: '',
                    type: 'link'
                  }
                }))
              : ([Thumbnail] || []).map((item) => ({
                  linkImage: {
                    url: item,
                    fileName: '',
                    type: 'link'
                  }
                }))

            if (!d.errors.length) {
              prices[0] = {
                idPriceType: 'default',
                // eslint-disable-next-line quotes
                price: [Number(item[`[Sale Price]`]) || null]
              }

              const final = {
                prices,
                unit,
                ecomImages,
                ecomStatus: status || 'NotPublic',
                name: String(item['[Product Name]'] || '').trim(),
                ecomShortDescription: String(
                  item['[Short Description]'] || ''
                ).trim(),
                ecomDescription: String(
                  item['[Long Description]'] || ''
                ).trim(),
                sku: item['[SKU]'] || null,
                upc: item['[UPC]'] || null
              }
              data.push(final)
            } else {
              rowErrors.push({
                name: `${t('product.row')} ${rowIndex}`,
                errors: d.errors
              })
            }
            rowIndex++
          }

          setState({
            rowDataImport: rowErrors.length ? rowErrors : data,
            hasImportError: rowErrors.length > 0,
            rowCount: rowErrors.length ? 0 : data.length
          })

          setPaginationState({
            totalRows: rowErrors.length ? 0 : data.length
          })

          gridApi.current.setColumnDefs(ColumnDefImport)
          gridApi.current.sizeColumnsToFit()

          if (rowErrors.length) {
            rowErrors.forEach((row) => {
              messageToast.error({
                message: `${row.name}: ${row.errors.join('; ')}`
              })
            })
            gridApi.current.setColumnDefs([
              {
                headerName: t('product.gridOrder'),
                filter: false,
                sortable: false,
                field: 'name',
                width: 140,
                suppressSizeToFit: true
              },
              {
                headerName: t('product.error'),
                filter: false,
                sortable: false,
                field: 'errors',
                valueFormatter: ({ value }: any) => value.join('; '),
                cellStyle: { color: 'red' }
              }
            ])
            gridApi.current.sizeColumnsToFit()
          }
          updateDataSource(gridApi.current, {
            getRows: (params: any) => {
              params.successCallback(
                rowErrors.length ? rowErrors : data,
                (rowErrors.length ? rowErrors : data).length
              )
            }
          })
        }
      }
      reader.onerror = (error) => {
        messageToast.error({
          message: error
        })
        console.error('Error: ', error)
      }
      reader.onabort = () => {
        // eslint-disable-next-line no-console
        console.log('cancel import')
      }
      setVisibleImport(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listNameProduct]
  )

  const columnDefs: ColumnDefs = [
    {
      field: 'code',
      headerName: 'ID',
      filter: false,
      wrapText: true,
      autoHeight: true,
      sortable: true,
      flex: 1
    },
    {
      field: 'ecomImages',
      headerName: t('product.image'),
      filter: false,
      sortable: false,
      autoHeight: true,
      cellStyle: { justifyContent: 'center' },
      cellRendererFramework: (params: any) => {
        const linkImage =
          (params?.data?.ecomImages &&
            (params?.data?.ecomImages.length > 0 &&
              params?.data?.ecomImages.filter(
                (img: any) => img?.linkImage !== null
              ))[0]?.linkImage) ||
          ''

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
      },
      flex: 1
    },
    {
      field: 'name',
      wrapText: true,
      autoHeight: true,
      headerName: t('product.textName'),
      filter: 'agTextColumnFilter',
      flex: 2,
      floatingFilter: true
    },
    {
      field: 'upc',
      headerName: t('product.textUpc'),
      wrapText: true,
      autoHeight: true,
      filter: 'agTextColumnFilter',
      flex: 1,
      floatingFilter: true
    },
    {
      field: 'sku',
      headerName: t('product.textSku'),
      wrapText: true,
      autoHeight: true,
      filter: 'agTextColumnFilter',
      flex: 1,
      floatingFilter: true
    },
    {
      flex: 1,
      field: 'ecomStatus',
      headerName: t('product.gridStatus'),
      // filter: 'agSetColumnFilter',
      filter: true,
      filterParams: {
        values: [t('product.textPublic'), t('product.textDraft')]
      },
      cellStyle: (params) => {
        if (params?.data?.ecomStatus === EnumStockModelStatus.Public)
          return { color: '#1B66FF', fontWeight: 600 }
        if (
          (params?.data?.ecomStatus === EnumStockModelStatus.NotPublic ||
            params?.data?.ecomStatus === null) &&
          params?.data?.isActive === false
        )
          return { color: '#DC3545', fontWeight: 600 }
        return { color: '#8E8E8E', fontWeight: 600 }
      },
      valueFormatter: (params) => {
        if (params?.data?.ecomStatus === EnumStockModelStatus.Public) {
          return t('product.textPublic')
        }
        if (
          params?.data?.ecomStatus === EnumStockModelStatus.NotPublic &&
          !params?.data?.isActive
        ) {
          return t('product.textDeleted')
        }
        if (params?.data?.ecomStatus === EnumStockModelStatus.NotPublic) {
          return t('product.textDraft')
        }
      }
    },
    {
      field: 'createdBy.username',
      headerName: t('product.personCreated'),
      floatingFilter: true,
      filter: 'agTextColumnFilter',
      flex: 1,
      maxWidth: 116
    },
    {
      flex: 1,
      maxWidth: 116,
      field: 'createdAt',
      headerName: t('product.gridCreated'),
      filter: 'agDateColumnFilter',
      floatingFilter: true,
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
      headerName: t('product.gridAction'),
      field: 'Manipulation',
      filter: false,
      sortable: false,
      pinned: 'right',
      minWidth: 100,
      width: 100,
      maxWidth: 100,
      cellStyle: { justifyContent: 'center' },
      cellRendererFramework: (params: any) => {
        if (params.data) {
          return (
            <>
              <Link to={`/manage-product/product-detail/${params?.data?._id}`}>
                <Button
                  noFill
                  iconName={<EditSapIcon />}
                  className='btn-edit-item-grid'
                />
              </Link>
              <Button
                noFill
                iconName={<DeleteSapIcon style={{ color: '#BB0000' }} />}
                onClick={() => onClickRemove(params?.data)}
              />
              <Popover
                key={1}
                placement={TooltipPlacement.BottomRight}
                overlayClassName='popDelete'
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

  const onClickCancelImport = useCallback(() => {
    setState({
      rowDataImport: null,
      hasImportError: false
    })
    if (hasImportError) {
      gridApi.current.setColumnDefs(columnDefs)
      gridApi.current.sizeColumnsToFit()
    }
    push(paramProduct)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasImportError])

  const onClickOkImport = useCallback(async () => {
    if (!hasImportError) {
      importFileStockModelMutation({
        variables: {
          input: rowDataImport
        }
      })
        .then(({ data, errors }) => {
          if (errors) {
            messageToast.error({
              message: errors
            })
          }
          if (data) {
            setState({
              rowDataImport: null,
              hasImportError: false
            })
            gridApi.current.deselectAll()

            // loadDataGrid()
            // gridApi.current.setColumnDefs(columnDefs)
            // gridApi.current.sizeColumnsToFit()
            push(paramProduct)
            messageToast.success({
              message: t('product.successful')
            })
          }
        })
        .catch((err) => {
          messageToast.error({
            message: t('product.failure')
          })
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasImportError, rowDataImport])

  const popoverData = [
    {
      icon: <DownloadSapIcon style={{ color: '#0A6ED1' }} />,
      text: t('product.DownloadSampleFile'),
      type: 'default',
      'data-ci': 'downloadFileMau',
      onClick: () =>
        window.open(
          'https://docs.google.com/spreadsheets/d/1JNTg2n5KaB9O2EZIMpTLKDFg3NrnawojEPKEhQnGv9M/edit#gid=0',
          '_blank'
        )
    },
    {
      icon: <UploadSapIcon style={{ color: '#0A6ED1' }} />,
      type: 'default',
      text: t('product.AddProductFile'),
      onClick: () => {
        setVisibleImport(true)
      }
    }
  ]

  const fetchDatasource = (page: number, paginationPageSize: number) => ({
    // called by the grid when more rows are required
    getRows: async (params: any) => {
      try {
        const filterParams = params.request.filterModel

        // params.api.setFilterModel(filterParams)
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
          const new_key = key
          if (['set'].includes(filterParams[key]?.filterType)) {
            const newInputFilter = {
              fieldFilter: new_key,
              values: flattenDeep([getValueOffilter(filterParams[key])])
            }
            if (key === 'ecomStatus') {
              newInputFilter.values = newInputFilter.values.map((x) => {
                if (x === t('product.textDraft'))
                  return EnumStockModelStatus.NotPublic
                if (x === t('product.textPublic'))
                  return EnumStockModelStatus.Public
                return EnumStockModelStatus.Public
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

            const items = data?.getStockModelPagination?.data || []

            const currentPage = data?.getStockModelPagination.currentPage || 0
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
                data?.getStockModelPaginationTotal?.totalPages
              ),
              totalRows: Number(data?.getStockModelPaginationTotal?.totalRows),
              currentPage: Number(
                data?.getStockModelPaginationTotal?.currentPage
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

        refetchName({
          page: 1
        })
          .then(({ errors, data }) => {
            if (errors || queryId !== currentQuery) {
              return
            }
            // eslint-disable-next-line no-console
            console.log(`refetch list name:${true}`)
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

  const updateDataSource = useCallback(
    (api, dataSource) => {
      if (rowDataImport) return
      api.setServerSideDatasource(dataSource)
    },
    [rowDataImport]
  )

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
    gridName: 'ProductList',
    onGridReady: (gridOpts: GridReadyEvent) => {
      gridApi.current = gridOpts.api
      loadDataGrid({
        api: gridOpts.api,
        page: paginationState.currentPage,
        limit: paginationState.sizePage
      })
    },
    height: '100%',
    headerDefs: [
      {
        key: 'addMoreData',
        text: t('product.btnAdd'),
        type: 'default',
        noFill: false,
        iconName: 'add',
        tooltip: t('component.common.label.addNew'),
        onClick: () => push('/manage-product/product-create')
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
    columnDefs,
    rowModelType: 'serverSide',
    enableServerSideSorting: true,
    serverSideStoreType: OverrideServerSideStoreType.Partial
  }
  return (
    <>
      <div style={{ height: 'calc(100vh - 70px)' }}>
        <ERPGrid
          title={t('product.titleName')}
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

      {!!rowDataImport && (
        <Footer
          cancelText='cancel'
          okText='save'
          showCancelBtn={!!rowDataImport}
          showOkBtn={!!rowDataImport}
          onOk={onClickOkImport}
          onCancel={onClickCancelImport}
          disableOkBtn={hasImportError}
        />
      )}

      <ImportModal
        visibleImport={visibleImport}
        setVisibleImport={setVisibleImport}
        readXLSXFile={readXLSXFile}
      />
    </>
  )
})

export default ProductList
