import { ERPGrid } from '@digihcs/grid2'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ColumnDefs,
  ERPGridProps
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import { BackFluentIcon, DeleteSapIcon } from '@digihcs/icons'
import {
  Button,
  FieldForm as Form,
  messageToast,
  Modal
} from '@digihcs/innos-ui3'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { GridReadyEvent } from 'ag-grid-community/dist/lib/events'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import {
  EnumStockModelStatus,
  useCreateMapServiceProductMutation,
  useGetMapServiceProductsByServiceQuery,
  useGetServiceByIdQuery,
  useGetStockModelPaginationQuery,
  useRemoveMapServiceProductMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { getUrlImage } from 'src/utils/uploadFile'

import ButtonAction from '../CMSHome/ButtonAction'
import dataServicesGroup from '../ManageService/directories.json'
import { ServicesType } from '../ManageService/type'
import IcdPhuField, { IcdData } from './IcdPhuField'

import './styles.less'

function FormAddProductsToService() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const editorRef = useRef<any>(null)
  const [selectedValues, setSelectedValues] = useState<IcdData[]>([])
  const [isWarning, setIsWarning] = useState(false)

  const { t } = useTranslation()
  const [formInfo] = Form.useForm()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { resetFields, validateFields } = formInfo

  const { idItem }: { idItem: string } = useParams()
  const history: any = useHistory()
  const gridApi = useRef<any>(null)
  // let currentQuery = 0

  const { refetch, data: dataMap } = useGetMapServiceProductsByServiceQuery({
    variables: {
      idService: idItem
    }
  })
  const { data: dataServiceById } = useGetServiceByIdQuery({
    variables: {
      id: idItem
    }
  })
  const { data: dataStockModel } = useGetStockModelPaginationQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: 1,
      filter: [],
      search: [],
      sort: [{ fieldSort: 'createdAt', sort: -1 }],
      idsDefault:
        dataMap?.getMapServiceProductsByService?.map(
          (icd) => icd?.idStockModel
        ) || []
    }
  })

  const FieldDefault = () => {
    if (dataServiceById) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id } = dataServiceById.getServiceById
      if (dataMap?.getMapServiceProductsByService) {
        formInfo.setFieldsValue({
          Product:
            dataMap?.getMapServiceProductsByService?.map(
              (icd) => icd?.idStockModel
            ) || []
        })
        setSelectedValues([])
      }
    }
  }
  useEffect(() => {
    FieldDefault()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataServiceById?.getServiceById, dataMap?.getMapServiceProductsByService])

  const [callAddProductToService] = useCreateMapServiceProductMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.createMapServiceProduct?.map((icd: any) => icd?._id)) {
        messageToast.success({
          message: t('service.notiAddProductToServiceSuccess')
        })
        setIsWarning(false)
        refetch()
      }
    },
    onError: (error) => {
      messageToast.error({
        message: error?.message ? error?.message : t('service.notiCreateFaild')
      })
    }
  })

  const [callDelete]: any = useRemoveMapServiceProductMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.removeMapServiceProduct) {
        messageToast.success({
          message: t('service.notiDeleteProductToServiceSuccess'),
          duration: 2
        })
        setIsWarning(false)
        refetch()
      } else {
        messageToast.warning({
          description: t('service.notiAddProductToServiceRelevant'),
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
          : t('service.notiAddProductToServiceFailed'),
        duration: 2
      })
    }
  })

  const handleRemove: any = (
    idService: string[] = [],
    idsStockModel: string[] = []
  ) => {
    callDelete({
      variables: {
        idService,
        idsStockModel
      }
    })
  }
  const onClickRemove = useCallback(async (selectedRow) => {
    const data = [{ key: selectedRow._id, label: selectedRow.stockModel?.name }]
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('service.msgDeleteProductToService'),
      centered: true,
      type: ConfirmType.Error,
      okText: t('service.btnDelete'),
      cancelText: t('service.btnExit'),
      tags: data,
      onOk: () => handleRemove(selectedRow.idService, selectedRow.idStockModel)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onClickWarning = () => {
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('service.textWarning'),
      centered: true,
      type: ConfirmType.Warning,
      okText: t('service.btnOk'),
      cancelText: t('service.btnCancel'),
      content: t('service.msgWarning'),
      onOk: () => handleLoadGrid()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  const onClickWarningResetField = () => {
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('service.textWarning'),
      centered: true,
      type: ConfirmType.Warning,
      okText: t('service.btnOk'),
      cancelText: t('service.btnCancel'),
      content: t('service.msgWarning'),
      onOk: () => {
        FieldDefault()
        setIsWarning(false)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  const handleBackGrid = () => {
    if (isWarning) {
      onClickWarning()
    } else {
      handleLoadGrid()
    }
  }
  const handleResetField = () => {
    if (isWarning) {
      onClickWarningResetField()
    } else {
      FieldDefault()
    }
  }

  const handleLoadGrid = () => {
    let finded = null
    const findedCT_Services = dataServicesGroup.find(
      (i: ServicesType) => i.route === '/add-products-to-service'
    )

    finded = findedCT_Services
    if (finded?.type === 'his') {
      history.push(`/manage-service${finded.route}`)
    } else {
      window.location.href = `${window.location.origin}/manage-service${finded?.route}`
    }
  }
  const onSubmit = () => {
    validateFields()
      .then((values) => {
        const { Product } = values
        if (idItem) {
          const queryValue = {
            variables: {
              idService: idItem,
              idsStockModel: Product
            }
          }
          callAddProductToService(queryValue)
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err, 'err'))
  }

  const gridOptions: ERPGridProps = {
    columnDefs: [
      {
        field: 'stockModel.code',
        headerName: t('ID'),
        filter: false,
        wrapText: true,
        autoHeight: true,
        flex: 1,
        maxWidth: 129
      },
      {
        filter: false,
        sortable: false,
        maxWidth: 153,
        autoHeight: true,
        field: 'stockModel.ecomImages.linkImage',
        headerName: t('product.image'),
        cellStyle: { justifyContent: 'center' },
        cellRendererFramework: (params: any) => {
          const linkImage =
            (params?.data?.stockModel?.ecomImages &&
              (params?.data?.stockModel?.ecomImages.length > 0 &&
                params?.data?.stockModel?.ecomImages.filter(
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
        }
      },
      {
        field: 'stockModel.name',
        sortable: true,
        wrapText: true,
        autoHeight: true,
        headerName: t('product.textName'),
        filter: 'agTextColumnFilter',
        flex: 2
      },
      {
        field: 'stockModel.upc',
        headerName: t('product.textUpc'),
        flex: 1,
        wrapText: true,
        autoHeight: true,
        filter: 'agTextColumnFilter',
        maxWidth: 170
      },
      {
        field: 'stockModel.sku',
        sortable: true,
        wrapText: true,
        autoHeight: true,
        headerName: t('product.textSku'),
        filter: 'agTextColumnFilter',
        flex: 1,
        maxWidth: 170
      },
      {
        flex: 1,
        field: 'stockModel.ecomStatus',
        headerName: t('product.gridStatus'),
        filter: false,
        maxWidth: 100,
        cellStyle: (params) => {
          if (
            params?.data?.stockModel?.ecomStatus === EnumStockModelStatus.Public
          )
            return { color: '#1B66FF', fontWeight: 600 }

          return { color: '#8E8E8E', fontWeight: 600 }
        },
        valueFormatter: (params) => {
          if (
            params?.data?.stockModel?.ecomStatus === EnumStockModelStatus.Public
          ) {
            return t('product.textPublic')
          }

          if (
            params?.data?.stockModel?.ecomStatus ===
            EnumStockModelStatus.NotPublic
          ) {
            return t('product.textDraft')
          }
        }
      },
      {
        headerName: t('product.gridAction'),
        field: 'Manipulation',
        filter: false,
        sortable: false,
        pinned: 'right',
        minWidth: 70,
        width: 70,
        maxWidth: 70,
        cellStyle: { display: 'flex', justifyContent: 'center' },
        cellRendererFramework: (params: any) => {
          if (params) {
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
    ],
    onGridReady: (gridOpts: GridReadyEvent) => {
      gridApi.current = gridOpts.api
    },
    hideCheckbox: true,
    pagination: false,
    rowData: dataMap?.getMapServiceProductsByService || [],
    gridName: 'AddProductsToService',
    floatingFilter: true,
    defaultPageSize: 50,
    showFooter: false
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setAllForm = async () => {
    if (dataMap?.getMapServiceProductsByService) {
      FieldDefault()
    } else {
      formInfo.resetFields()
    }
  }

  return (
    <div className='form-add' style={{ height: '100%' }}>
      <div className='tile-service'>
        <h3
          style={{
            fontSize: 14,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            padding: 6
          }}
        >
          <span className='title'>
            <BackFluentIcon
              className='back-grid'
              onClick={() => {
                handleBackGrid()
              }}
            />
            {t('service.titleAddProductTo')}
            {dataServiceById?.getServiceById?.title}
          </span>
        </h3>
      </div>
      <div className='content'>
        <Form
          form={formInfo}
          layout={FormLayout.Vertical}
          className='add-product-to-service-form'
        >
          <Form.Item name='Product'>
            <IcdPhuField
              options={dataStockModel?.getStockModelPagination?.data}
              style={{ height: 32, width: 493, paddingLeft: 12 }}
              // readOnly={!canEdit}

              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
              onChange={() => setIsWarning(true)}
            />
          </Form.Item>

          <span className='service-content-title'>
            {t('service.textAddedProductList')}
          </span>
          <div style={{ paddingTop: 9, height: 'calc(100vh - 110px)' }}>
            <ERPGrid {...gridOptions} />
          </div>
          <div
            className='w-100 position-absolute bg-white shadow-lg p-2'
            style={{ left: 0, bottom: 0 }}
          >
            <div style={{ marginTop: -20 }}>
              <ButtonAction
                onSubmit={() => onSubmit()}
                onCancel={handleResetField}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default FormAddProductsToService
