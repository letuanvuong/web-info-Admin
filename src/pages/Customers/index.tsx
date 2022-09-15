import { ERPGrid } from '@digihcs/grid2'
import {
  ColumnDefs,
  ERPGridProps
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import MenuHisIcon from '@digihcs/icons/lib/his/MenuHisIcon'
import ShowSapIcon from '@digihcs/icons/lib/sap/ShowSapIcon'
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
import {
  GridApi,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  IServerSideGetRowsRequest
} from 'ag-grid-community'
import { useReducer, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ModalCustomer, { ModalCustomerRef } from 'src/components/modalCustomer'
import {
  EnumGender,
  EnumTypeAccount,
  UsersWithPaginateQuery,
  useUpdateUserOverrideMutation,
  useUsersWithPaginateQuery
} from 'src/graphql-definition/webinfo-service.generated'
import { reducer } from 'src/utils/function'

import {
  IPaginationState,
  OverrideServerSideStoreType,
  PAGINATION
} from '../../constant'
import ModalChangePassCustomer, {
  ModalChangePassCustomerRef
} from './ModalChangePassword'
import ModalCreateCustomer, {
  ModalCreateCustomerRef
} from './ModalCreateCustomer'

import './styles.less'

type Customer = UsersWithPaginateQuery['usersWithPaginate']['users'][number]

const ManageCustomer: React.FC = () => {
  const { t } = useTranslation()
  /** custom for shorter call "manageCustomer" */
  const pageT = (keyOfManageCustomer: string) =>
    t(`${'manageCustomer'}.${keyOfManageCustomer}`)
  const gridApi = useRef<GridApi>(null)

  const modalCustomerRef = useRef<ModalCustomerRef>(null)
  const modalCreateCustomerRef = useRef<ModalCreateCustomerRef>(null)
  const modalChangePasswordCustomerRef =
    useRef<ModalChangePassCustomerRef>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paginationState, setPaginationState] = useReducer<
    (prev: IPaginationState, state: IPaginationState) => IPaginationState
  >(reducer, {
    currentPage: PAGINATION.DEFAULT_CURRENT_PAGE,
    totalPages: 0,
    totalRows: 0,
    sizePage: PAGINATION.DEFAULT_PAGE_SIZE
  })

  const { refetch: queryUsers } = useUsersWithPaginateQuery({
    skip: true,
    variables: {
      filterOptions: {
        isDeleted: [false, null]
      }
    }
  })

  const [mutateUpdateOverrideUser] = useUpdateUserOverrideMutation({
    onError: () => {}
  })

  const mutateLockUser = async (idUser: string, isLocked: boolean) => {
    const { data } = await mutateUpdateOverrideUser({
      variables: {
        idUser,
        input: { isLocked }
      }
    })
    if (data?.updateUserOverride?._id) {
      messageToast.success({
        message: pageT('notiLockSuccess')
      })
    }
  }

  const onLockHandle = async (selectedRow: Customer) => {
    Modal.confirm({
      title: pageT('titleConfirmLock'),
      // icon: <LockSvgFromFigma />,
      content: selectedRow.username,
      okText: pageT('btnConfirmLock'),
      cancelText: pageT('btnCancelLock'),
      type: ConfirmType.Warning,
      onOk: () => mutateLockUser(selectedRow._id, true)
    })
  }

  const columnDefs: ColumnDefs = [
    { field: 'customer.email', headerName: pageT('gridHeaderEmail') },
    {
      field: 'customer.fullName',
      headerName: pageT('gridHeaderFullName'),
      colId: 'customer.unsignedFullName'
    },
    {
      field: 'customer.gender',
      headerName: pageT('gridHeaderGender'),
      filter: 'agSetColumnFilter',
      filterParams: {
        values: [t('common.male'), t('common.female'), t('common.otherGender')],
        comparator: (a: string, b: string) => (a > b ? -1 : 1)
      },
      valueFormatter: ({ value }) => {
        if (value === EnumGender.Male) return t('common.male')
        if (value === EnumGender.Female) return t('common.female')
        if (value === EnumGender.Other) return t('common.otherGender')
        return ''
      }
    },
    {
      field: 'customer.phoneNumber',
      headerName: pageT('gridHeaderPhoneNumber')
    },
    {
      field: 'Status',
      headerName: pageT('gridHeaderStatus'),
      filter: false,
      sortable: false,
      cellStyle: (params) => {
        if (!params.data?.isActive) return { color: '#90969C', fontWeight: 600 }
        if (params.data?.isLocked) return { color: '#DC3545', fontWeight: 600 }
        return { color: '#0384CE', fontWeight: 600 }
      },
      valueFormatter: (params) => {
        if (!params.data?.isActive) return pageT('gridValueNotActive')
        if (params.data?.isLocked) return pageT('gridValueLocked')
        return pageT('gridValueActivated')
      }
    },
    {
      field: '',
      headerName: pageT('gridHeaderAction'),
      filter: false,
      sortable: false,
      pinned: 'right',
      cellRendererFramework: (params: any) => {
        if (params.data) {
          return (
            <>
              <Button
                onClick={() => {
                  modalCustomerRef.current?.setCurrentCustomer(params.data)
                  modalCustomerRef.current?.openModalCustomer()
                }}
                iconName={<ShowSapIcon />}
                className='btn-view-item-grid'
                disabled={!params?.data?.isActive}
              >
                {pageT('btnViewDetail')}
              </Button>

              <Popover
                key={1}
                placement={TooltipPlacement.BottomRight}
                overlayClassName='pop-option'
                content={
                  <List
                    fullHeight
                    forceClosePopover
                    data={[
                      {
                        key: 'lockCustomer',
                        title: pageT('btnLockAccount'),
                        type: 'multi',
                        'data-ci': 'lockCustomer',
                        onClick: () => {
                          onLockHandle(params?.data)
                        }
                      },
                      {
                        key: 'changePasswordCustomer',
                        title: pageT('btnChangePassword'),
                        type: 'multi',
                        'data-ci': 'changePasswordCustomer',
                        onClick: () => {
                          modalChangePasswordCustomerRef.current?.openModalCustomer(
                            params?.data
                          )
                        }
                      }
                    ]}
                    itemKey='key'
                  >
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
                  disabled={!params?.data?.isActive}
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

  const createServerSideDataSource: () => IServerSideDatasource = () => ({
    getRows: (params: IServerSideGetRowsParams) => {
      const a = params.request.filterModel?.['customer.gender']?.values
      if (a) {
        const c = a.map((x: any) => {
          if (x === t('common.male')) return EnumGender.Male
          if (x === t('common.female')) return EnumGender.Female
          return EnumGender.Other
        })
        params.request.filterModel = {
          ...params.request.filterModel,
          'customer.gender': {
            filterType: 'set',
            values: c
          }
        }
      }
      queryUsers({
        filterOptions: { TypeAccount: [EnumTypeAccount.Customer] },
        gridOptions: params.request
      })
        .then(({ data }) => {
          const usersFound = data.usersWithPaginate.users || []
          params.success({
            rowData: usersFound,
            rowCount: getLastRowIndex(params.request, usersFound)
          })
        })
        .catch(() => {
          messageToast.error({ message: t('error.error_load_data') })
          params.fail()
        })
    }
  })

  const setServerSideDatasourceToGrid = (gridApiDefault: GridApi = null) => {
    const dataSource = createServerSideDataSource()
    if (gridApiDefault) {
      gridApiDefault?.setServerSideDatasource(dataSource)
    } else {
      gridApi?.current?.setServerSideDatasource(dataSource)
    }
  }

  const gridOptions: ERPGridProps = {
    columnDefs,
    onGridReady: (gridOpts) => {
      gridApi.current = gridOpts.api
      gridOpts.api.sizeColumnsToFit()
      setServerSideDatasourceToGrid(gridOpts.api)
    },
    gridName: 'titleGrid',
    animateRows: true,
    pagination: true,
    rowModelType: 'serverSide',
    serverSideStoreType: OverrideServerSideStoreType.Partial as any
    // paginationPageSize: 10
  }

  return (
    <div className='manage-customer'>
      <div className='title_bar'>
        <h3 style={{ fontSize: 18, fontWeight: 600 }}>
          {pageT('titlePageManageCustomer')}
        </h3>

        <div style={{ display: 'flex', alignItems: 'end' }}>
          <Button
            style={{ display: 'flex', alignItems: 'center' }}
            iconName={
              <FontAwesomeIcon
                width={14}
                height={14}
                icon={faPlus}
                style={{ marginRight: 5 }}
              />
            }
            onClick={() =>
              modalCreateCustomerRef.current?.openModalCreateCustomer()
            }
          >
            {pageT('btnAdd')}
          </Button>
        </div>
      </div>

      <div className='grid-wrapper'>
        <ERPGrid
          hideCheckbox
          floatingFilter
          {...gridOptions}
          defaultPageSize={paginationState?.sizePage || 50}
        />
      </div>

      <ModalCustomer ref={modalCustomerRef} />
      <ModalCreateCustomer
        ref={modalCreateCustomerRef}
        callbackFunc={setServerSideDatasourceToGrid}
      />
      <ModalChangePassCustomer ref={modalChangePasswordCustomerRef} />
    </div>
  )
}

export default ManageCustomer
