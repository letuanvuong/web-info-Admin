import { ERPGrid } from '@digihcs/grid2'
import {
  ColumnDefs,
  ERPGridProps,
  HeaderDefs
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import {
  LockHisIcon,
  MenuHisIcon,
  ResetPasswordHisIcon,
  UnlockHisIcon
} from '@digihcs/icons/lib/his'
import { AddSapIcon, DeleteSapIcon, EditSapIcon } from '@digihcs/icons/lib/sap'
import { Button, messageToast, Modal, Popover } from '@digihcs/innos-ui3'
import { PopoverRef } from '@digihcs/innos-ui3/lib/popover/interface'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
import { TooltipPlacement } from '@digihcs/util/lib/enums/TooltipPlacement'
import moment from 'moment'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useDeleteUsersMutation,
  useGetUsersTypeAdminQuery,
  useUpdateUsersOverrideMutation
} from 'src/graphql-definition/webinfo-service.generated'

import ModalChangePassword from './modalChangePassword'
import ModalFormUser from './modalFormUser'
import MyGridLoading from './MyGridLoading'
import { formatPopoverData, parseError } from './utils'

import './style.less'

const GRID_HEIGHT: string = 'calc(100vh - 75px)'

const User = () => {
  const { t } = useTranslation()
  const [rowData, setRowData] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [visibleModalChangePassword, setVisibleModalChangePassword] =
    useState<boolean>(false)
  // const [isSelectedRows, setIsSelectedRows] = useState<boolean>(false)
  const [tempUser, setTempUser] = useState<any>({})
  const gridRef = useRef(null)
  const ref: RefObject<PopoverRef> = useRef(null)
  const [isLockedState, setIsLocked] = useState<boolean>(false)

  const {
    data,
    loading: loadingUsers,
    refetch
  } = useGetUsersTypeAdminQuery({
    variables: {},
    onError: (error) =>
      messageToast.error({
        duration: 2,
        description: parseError(error),
        message: t('staff.textRetrievingDataError')
      })
  })

  const [deleteUsers] = useDeleteUsersMutation({
    onCompleted: (data) => {
      if (data?.deleteUsers) {
        messageToast.success({
          duration: 2,
          message: t('staff.textAccountDeletedSuccessfully')
        })
        refetch()
      }
    },
    onError: (error) =>
      messageToast.error({
        duration: 2,
        message: t('staff.textDeleteFailed'),
        description: parseError(error)
      })
  })

  useEffect(() => {
    if (data?.getUsersTypeAdmin) {
      const dataRemoveAppadmin: any[] = data.getUsersTypeAdmin.filter(
        (user: any) => user?.username !== 'appadmin'
      )
      setRowData(dataRemoveAppadmin)
    }
  }, [data?.getUsersTypeAdmin])

  const handleLockUsers: any = (idUsers: string[], isLocked: boolean) => {
    lockUsers({
      variables: { idUsers, input: { isLocked: !isLocked } }
    })
    setIsLocked(() => isLockedState === !isLocked)
  }

  const [lockUsers] = useUpdateUsersOverrideMutation({
    onCompleted: (data) => {
      if (data?.updateUsersOverride) {
        messageToast.success({
          duration: 2,
          message: isLockedState
            ? t('staff.msgUnLockSuccess')
            : t('staff.msgLockSuccess')
        })
        refetch()
        hideModal()
      }
    },
    onError: (error) =>
      messageToast.error({
        duration: 2,
        description: parseError(error),
        message: isLockedState
          ? t('staff.msgUnLockFailed')
          : t('staff.msgLockFailed')
      })
  })

  const popoverDataDetail = (data: any) => [
    {
      text: data?.isLocked ? t('staff.textOpen') : t('staff.textLock'),
      icon: data?.isLocked ? (
        <UnlockHisIcon
          style={{
            display: 'flex',
            color: '#0A6ED1',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      ) : (
        <LockHisIcon
          style={{
            display: 'flex',
            color: '#0A6ED1',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      ),
      onClick: () => handleLockUsers(data?._id, data?.isLocked)
    },
    {
      text: t('staff.textChangePassword'),
      icon: (
        <ResetPasswordHisIcon
          style={{
            display: 'flex',
            color: '#0A6ED1',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      ),
      onClick: () => {
        setTempUser(data)
        setVisibleModalChangePassword(true)
      }
    }
  ]

  const headerDefs: HeaderDefs = [
    {
      noFill: false,
      text: t('staff.textAdd'),
      key: 'add_data',
      type: 'default',
      iconName: <AddSapIcon />,
      onClick: () => setVisible(true)
    }
    // {
    //   key: 'menu',
    //   type: 'default',
    //   popover: {
    //     content: formatPopoverData(popoverData, {
    //       cursor: isSelectedRows ? 'pointer' : 'no-drop'
    //     })
    //   },
    //   onClick: () =>
    //     setIsSelectedRows(gridRef.current?.api?.getSelectedRows()?.length > 0)
    // }
  ]

  const columnDefs: ColumnDefs = [
    {
      flex: 1,
      headerName: t('staff.gridOrder'),
      cellRenderer: (params: any) => params.rowIndex + 1,
      maxWidth: 48,
      filter: false,
      cellStyle: { justifyContent: 'center' }
    },
    {
      flex: 2,
      field: 'username',
      headerName: t('staff.gridAccount')
    },
    {
      flex: 2,
      field: 'email',
      headerName: t('staff.gridEmail')
    },
    {
      flex: 1,
      field: 'phoneNumber',
      headerName: t('staff.gridPhone'),
      maxWidth: 200,
      width: 120
    },
    {
      flex: 1,
      field: 'note',
      headerName: t('staff.gridNote'),
      filter: false,
      sortable: false
    },
    {
      flex: 1,
      field: 'employee',
      headerName: t('staff.gridStatus'),
      filter: false,
      sortable: false,
      maxWidth: 100,
      cellRenderer: (params) => {
        if (params?.data?.isLocked) return t('staff.textLockPending')
        // if (!params?.value) return t('staff.textNotLinkedYet')
        return t('staff.textActive')
      },
      cellStyle: (params) => {
        if (params.data?.isLocked) return { color: '#DC3545', fontWeight: 600 }
        if (!params?.data?.employee)
          return { color: '#BB0000', fontWeight: 600 }
        return { color: '#107F3E', fontWeight: 600 }
      }
    },
    {
      flex: 1,
      field: 'createdAt',
      headerName: t('staff.gridCreatedAt'),
      filter: false,
      maxWidth: 150,
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
      field: 'updatedBy.username',
      headerName: t('staff.gripUpdatedBy'),
      maxWidth: 150,
      filter: false,
      sortable: false
    },
    {
      flex: 1,
      headerName: t('staff.gridAction'),
      filter: false,
      maxWidth: 100,
      cellStyle: {
        display: 'flex',
        justifyContent: 'center'
      },
      cellRendererFramework: (params: any) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            noFill
            iconName={<EditSapIcon />}
            className='btn-edit-item-grid'
            onClick={() => openModal(params?.data)}
          />
          <Button
            noFill
            onClick={() => handleDeleteUsers([params?.data])}
            iconName={<DeleteSapIcon style={{ color: '#BB0000' }} />}
          />
          <Popover
            ref={ref}
            hideArrow
            content={formatPopoverData(popoverDataDetail(params?.data))}
            placement={TooltipPlacement.BottomRight}
          >
            <Button noFill className='btn-icon-25'>
              <MenuHisIcon className='m-0' />
            </Button>
          </Popover>
        </div>
      )
    }
  ]

  const gridOptions: ERPGridProps = {
    rowData,
    headerDefs,
    columnDefs,
    lang: 'en',
    defaultPageSize: 50,
    gridName: 'user_grid',
    sheetName: 'user_grid',
    onRowDataChanged({ api }) {
      api.deselectAll()
    },
    onGridReady: ({ api }) => {
      api.sizeColumnsToFit()
    },
    frameworkComponents: {
      myGridLoading: MyGridLoading
    },
    loadingOverlayComponent: 'myGridLoading'
  }

  const handleDeleteUsers = (users: any[] = []) => {
    const tags = users?.map((item) => ({
      key: item._id,
      label: item.username
    }))
    const idUsers = users?.map((item) => item._id)

    Modal.confirm({
      tags,
      okText: t('staff.btnDelete'),
      cancelText: t('staff.btnExit'),
      type: ConfirmType.Error,
      title: t('staff.textConfirmAccountDeletion'),
      onOk: () => deleteUsers({ variables: { idUsers } })
    })
  }

  const openModal = (user: any = {}) => {
    if (user) {
      setTempUser(user)
    }
    setVisible(true)
  }

  const hideModal = () => {
    setVisible(false)
    setTempUser({})
  }

  const hideModalDeleteChangePassword = () => {
    setVisibleModalChangePassword(false)
  }

  useEffect(() => {
    if (loadingUsers) {
      gridRef?.current?.api.showLoadingOverlay()
    } else {
      gridRef?.current?.api.hideOverlay()
    }
  }, [loadingUsers])

  return (
    <>
      <div style={{ height: GRID_HEIGHT }}>
        <ERPGrid
          title={t('system.titleAdminAccount')}
          ref={gridRef}
          {...gridOptions}
        />
      </div>

      {visible && (
        <ModalFormUser
          user={tempUser}
          visible={visible}
          hideModal={hideModal}
          refetchUsers={refetch}
          openModalChangePassword={setVisibleModalChangePassword}
        />
      )}

      {visibleModalChangePassword && (
        <ModalChangePassword
          user={tempUser}
          gridRef={gridRef}
          refetchUsers={refetch}
          visible={visibleModalChangePassword}
          hideModal={hideModalDeleteChangePassword}
        />
      )}
    </>
  )
}

export default User
