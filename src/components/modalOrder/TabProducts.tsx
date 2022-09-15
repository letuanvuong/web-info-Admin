import { ERPGrid } from '@digihcs/grid2'
import { ERPGridProps } from '@digihcs/grid2/lib/e-r-p-grid/interface'
import { AddSapIcon, RemoveHisIcon } from '@digihcs/icons'
import {
  Button,
  FieldForm as Form,
  Input,
  messageToast,
  Modal,
  Option,
  Select
} from '@digihcs/innos-ui3'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
import { FormLabelAlign } from '@digihcs/util/lib/enums/FormLabelAlign'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  EnumOrderStatus,
  GetStockModelsQuery,
  useGetStockModelsQuery
} from 'src/graphql-definition/webinfo-service.generated'
import { checkDoubleClick, formatNumber } from 'src/utils/function'

import './index.less'

interface TabProductsProps {
  setRowData: Function
  status: EnumOrderStatus
  rowData: Partial<GetStockModelsQuery['getStockModels']>
  isView?: boolean
}

export interface TabProductsRefs {
  resetFieldsProductTab: Function
  resetData: () => void
  resetColumnDef: () => void
}

const TabProducts = memo(
  forwardRef<TabProductsRefs, TabProductsProps>(
    ({ rowData, setRowData, status, isView }, ref) => {
      const { t } = useTranslation()
      const gridRef = useRef(null)
      const checkDoubleClickRef = useRef(null)
      const gridApi = useRef(null)
      const isDisable =
        !!(status && status !== EnumOrderStatus.AwaitConfirmation) || isView

      const [form] = Form.useForm()
      const { resetFields, validateFields } = form

      const { data: stockModels, loading: loadingStockModels } =
        useGetStockModelsQuery({
          onError: (err) =>
            messageToast.error({
              description: t(
                err.message || 'manageOrder.modal.msgAnErrorOccurred'
              ),
              message: t('manageOrder.modal.product.msgUnableToLoadProduct')
            })
        })

      const resetFieldsProductTab = () => {
        gridRef.current.api.setColumnDefs(defaultColumnDef)
      }

      const resetColumnDef = () => {
        gridRef.current.api.setColumnDefs(editColumnDef)
      }

      const resetData = () => {
        resetFields()
        gridRef.current.api.setColumnDefs(defaultColumnDef)
      }

      useImperativeHandle(ref, () => ({
        resetFieldsProductTab,
        resetData,
        resetColumnDef
      }))

      const defaultColumnDef = [
        {
          field: 'code',
          headerName: t('manageOrder.modal.product.textProductCode'),
          minWidth: 260
        },
        {
          field: 'name',
          headerName: t('manageOrder.modal.product.textProductName'),
          minWidth: 300
        },
        {
          field: 'count',
          filter: false,
          sortable: false,
          headerName: t('manageOrder.modal.product.textCount'),
          minWidth: 115,
          width: 115,
          maxWidth: 115
        },
        {
          field: 'prices',
          filter: false,
          sortable: false,
          headerName: t('manageOrder.modal.product.textPrice'),
          minWidth: 220,
          cellRenderer: (params: any) => {
            const price =
              params?.value?.find(
                (price: any) => price.idPriceType === 'default'
              )?.price?.[0] || 0
            return formatNumber(price)
          }
        },
        {
          filter: false,
          sortable: false,
          field: 'total',
          headerName: t('manageOrder.modal.product.textIntoMoney'),
          minWidth: 220,
          cellRenderer: (params: any) => {
            const price =
              params?.data?.prices?.find(
                (price: any) => price.idPriceType === 'default'
              )?.price?.[0] || 0
            const count = params?.data?.count || 1
            const total = Math.floor(+price * count)

            return formatNumber(total)
          }
        },
        {
          field: 'actionDefault',
          headerName: t('manageOrder.modal.product.textManipulation'),
          filter: false,
          sortable: false,
          minWidth: 100,
          width: 100,
          maxWidth: 100,
          cellStyle: { display: 'flex', justifyContent: 'center' },
          cellRendererFramework: (params: any) => {
            if (params?.data) {
              return (
                <Button
                  noFill
                  iconName={<RemoveHisIcon style={{ color: '#BB0000' }} />}
                  onClick={() => openModalConfirmDelete(params?.data?._id)}
                />
              )
            }
            return ''
          }
        }
      ]

      const editColumnDef = [
        {
          field: 'code',
          headerName: t('manageOrder.modal.product.textProductCode'),
          minWidth: 260
        },
        {
          field: 'name',
          headerName: t('manageOrder.modal.product.textProductName'),
          minWidth: 300
        },
        {
          field: 'count',
          filter: false,
          sortable: false,
          headerName: t('manageOrder.modal.product.textCount'),
          minWidth: 115,
          width: 115,
          maxWidth: 115
        },
        {
          field: 'prices',
          filter: false,
          sortable: false,
          minWidth: 220,
          headerName: t('manageOrder.modal.product.textPrice'),
          cellRenderer: (params: any) => {
            const price =
              params?.value?.find(
                (price: any) => price.idPriceType === 'default'
              )?.price?.[0] || 0
            return formatNumber(price)
          }
        },
        {
          filter: false,
          sortable: false,
          field: 'total',
          minWidth: 220,
          headerName: t('manageOrder.modal.product.textIntoMoney'),
          cellRenderer: (params: any) => {
            const price =
              params?.data?.prices?.find(
                (price: any) => price.idPriceType === 'default'
              )?.price?.[0] || 0
            const count = params?.data?.count || 1
            const total = Math.floor(+price * count)

            return formatNumber(total)
          }
        },
        {
          field: 'actionEdit',
          headerName: t('manageOrder.modal.product.textManipulation'),
          filter: false,
          sortable: false,
          minWidth: 100,
          width: 100,
          maxWidth: 100,
          cellStyle: { display: 'flex', justifyContent: 'center' },
          cellRendererFramework: (params: any) => {
            if (params?.data) {
              return (
                <Button
                  noFill
                  disabled={isDisable}
                  iconName={<RemoveHisIcon style={{ color: '#BB0000' }} />}
                  onClick={() => openModalConfirmDelete(params?.data?._id)}
                />
              )
            }
            return ''
          }
        }
      ]

      const gridOptions: ERPGridProps = {
        gridName: 'gridProducts',
        onGridReady: (gridOpts) => {
          gridApi.current = gridOpts.api
          gridOpts.api.sizeColumnsToFit()
        },
        columnDefs: isDisable ? editColumnDef : defaultColumnDef,
        rowData,
        hideCheckbox: true
      }

      const openModalConfirmDelete = (_id: string) => {
        Modal.confirm({
          title: t('manageOrder.modal.product.textConfirmDelete'),
          content: t(
            'manageOrder.modal.product.textAreYouSureYouWantToDeleteTheProduct'
          ),
          okText: t('manageOrder.modal.product.btnConfirm'),
          cancelText: t('manageOrder.modal.product.btnCancel'),
          type: ConfirmType.Warning,
          onOk: () => deleteProduct(_id)
        })
      }

      const onSubmit = () => {
        validateFields()
          .then((values) => addProduct(values))
          .catch(() =>
            messageToast.error({
              message: t('Vui lòng tên sản phẩm')
            })
          )
      }

      const addProduct = (product: any) => {
        const foundProduct = stockModels?.getStockModels?.find(
          (stockModel) => stockModel._id === product.idStockModel
        ) as any

        if (foundProduct) {
          const currentProductIndex = rowData?.findIndex(
            (item) => item._id === foundProduct._id
          )

          if (currentProductIndex !== -1) {
            const tempRowData: any = rowData
            tempRowData[currentProductIndex].count += product.count
            tempRowData[currentProductIndex].note += `; ${product.note}`

            setRowData(tempRowData)
            gridRef.current?.api?.redrawRows()
          } else {
            foundProduct.count = product.count
            foundProduct.note = product.note
            setRowData((prev: any) => [...prev, foundProduct])
          }
        }
        form.resetFields()
      }

      const deleteProduct = (_id: string) => {
        const currentRowData = gridRef?.current?.gridOptions?.rowData || []
        const newProduct = currentRowData?.filter(
          (item: any) => item?._id !== _id
        )
        setRowData(newProduct)
      }

      const onChangeStockModel = (idStockModel: string) => {
        const stockModel = stockModels?.getStockModels?.find(
          (e) => e?._id === idStockModel
        )
        if (stockModel?._id) {
          const priceSt =
            stockModel?.prices?.find(
              (price: any) => price.idPriceType === 'default'
            )?.price?.[0] || 0
          const countField = form.getFieldValue('count')
          form.setFieldsValue({
            price: priceSt,
            total: priceSt * countField
          })
        }
      }

      return (
        <>
          <div style={{ marginTop: 10 }}>
            <Form
              form={form}
              className='form-add-product'
              layout={FormLayout.Vertical}
              labelAlign={FormLabelAlign.Left}
              initialValues={{ count: 1, price: 0, total: 0 }}
            >
              <div className='content-form-product-info'>
                <div className='title-list-product'>
                  <span>{t('manageOrder.modal.textListProduct')}</span>
                </div>
                <div className='form-product-info'>
                  <div className='product-name'>
                    <Form.Item
                      name='idStockModel'
                      className='form-item'
                      label={t('manageOrder.modal.product.textProduct')}
                      rules={[
                        {
                          required: true,
                          message: t(
                            'manageOrder.modal.product.msgProductCannotBeEmpty'
                          )
                        }
                      ]}
                    >
                      {/* TODO: search query data backend */}
                      <Select
                        filterOption={false}
                        loading={loadingStockModels}
                        readOnly={isDisable}
                        style={{ width: 530 }}
                        onChange={onChangeStockModel}
                      >
                        {stockModels?.getStockModels?.map((stockModel) => (
                          <Option key={stockModel._id} value={stockModel._id}>
                            {stockModel?.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div style={{ paddingLeft: 12 }}>
                    <Form.Item
                      name='count'
                      label={t('manageOrder.modal.product.textCount')}
                      rules={[
                        {
                          required: true,
                          message: t(
                            'manageOrder.modal.product.msgQuantityIsRequired'
                          )
                        }
                      ]}
                    >
                      <Input.Number
                        min={1}
                        readOnly={isDisable}
                        style={{ width: 120 }}
                      />
                    </Form.Item>
                  </div>
                  <div style={{ paddingLeft: 12 }}>
                    <Form.Item
                      name='price'
                      label={t('manageOrder.modal.product.textPrice')}
                    >
                      <Input.Number min={1} readOnly style={{ width: 120 }} />
                    </Form.Item>
                  </div>
                  <div style={{ paddingLeft: 12 }}>
                    <Form.Item
                      name='total'
                      label={t('manageOrder.modal.product.textIntoMoney')}
                    >
                      <Input.Number min={1} readOnly style={{ width: 170 }} />
                    </Form.Item>
                  </div>
                  <div style={{ paddingLeft: 12 }}>
                    <Form.Item className='form-item' label='&nbsp;'>
                      <Button
                        size='large'
                        disabled={isDisable}
                        iconName={<AddSapIcon />}
                        onClick={() =>
                          checkDoubleClick(checkDoubleClickRef, onSubmit)
                        }
                      >
                        {t('manageOrder.modal.product.btnAddProduct')}
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </Form>
          </div>
          <div style={{ flex: 1, backgroundColor: '#fff', height: 400 }}>
            <ERPGrid {...gridOptions} ref={gridRef} />
          </div>
        </>
      )
    }
  )
)

export default TabProducts
