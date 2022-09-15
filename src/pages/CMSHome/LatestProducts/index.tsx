import { ERPGrid } from '@digihcs/grid2'
import {
  ColumnDefs,
  ERPGridProps
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import { AddSapIcon, SysMinusSapIcon } from '@digihcs/icons'
import {
  Button,
  FieldForm as Form,
  messageToast,
  Option,
  Select
} from '@digihcs/innos-ui3'
import { useCallback, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  EnumEcomStockModelTag,
  useCreateLatestProductByIdMutation,
  useDeleteLatestProductByIdMutation,
  useGetStockModelsQuery
} from 'src/graphql-definition/webinfo-service.generated'
import { getUrlImage } from 'src/utils/uploadFile'

import '../styles.less'

function LatestProducts() {
  const [form] = Form.useForm()
  const gridRef: any = useRef(null)
  const { t } = useTranslation()
  const { data, loading, refetch } = useGetStockModelsQuery()

  const [createLatestProductById] = useCreateLatestProductByIdMutation({
    onCompleted: (res) => {
      if (res?.createLatestProductById?._id) {
        messageToast.success({
          duration: 2,
          message: 'Thêm sản phẩm thành công'
        })
        form.resetFields()
        refetch()
      }
    },
    onError: (error) => {
      messageToast.error({
        duration: 2,
        message: 'Thêm sản phẩm thất bại',
        description: error?.message || ''
      })
    }
  })

  const [deleteLatestProductById] = useDeleteLatestProductByIdMutation({
    onCompleted: (res) => {
      if (res?.deleteLatestProductById?._id) {
        messageToast.success({
          duration: 2,
          message: 'Xoá sản phẩm thành công'
        })
        refetch()
      }
    },
    onError: (error) => {
      messageToast.error({
        duration: 2,
        message: 'Xoá sản phẩm thất bại',
        description: error?.message || ''
      })
    }
  })

  const dataStockModelsNotNew =
    data?.getStockModels?.filter(
      (item) => !item?.ecomTags?.includes(EnumEcomStockModelTag.New)
    ) || []

  const dataStockModelsNew = useMemo(
    () =>
      data?.getStockModels?.filter((item) =>
        item?.ecomTags?.includes(EnumEcomStockModelTag.New)
      ) || [],
    [data?.getStockModels]
  )

  const handleAddLatestProduct = () => {
    form
      .validateFields()
      .then(({ idStockModel }: any) => {
        if (idStockModel) {
          createLatestProductById({
            variables: { idStockModel }
          })
        }
      })
      .catch((error: any) => {
        // console.error(error, 'error')
        messageToast.error({
          duration: 2,
          message: 'Thêm sản phẩm thất bại',
          description: error?.message || ''
        })
      })
  }

  const handleDeleteLatestProduct = useCallback(
    (idStockModel: string) =>
      deleteLatestProductById({ variables: { idStockModel } }),
    [deleteLatestProductById]
  )

  const columnDefs = useMemo<ColumnDefs>(
    () => [
      {
        maxWidth: 250,
        filter: false,
        autoHeight: true,
        field: 'ecomImages',
        headerName: t('manageHome.latestProduct.textImage'),
        cellStyle: { justifyContent: 'center' },
        cellRendererFramework: (params: any) => {
          const linkImage = params?.data?.ecomImages?.[0]?.linkImage
          if (linkImage) {
            params?.node?.setRowHeight(120)
          }

          gridRef?.current?.api?.onRowHeightChanged()

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
      },
      {
        maxWidth: 290,
        field: 'code',
        headerName: t('manageHome.latestProduct.textProductCode')
      },
      {
        field: 'name',
        headerName: t('manageHome.latestProduct.textProductName')
      },
      {
        field: 'ecomCategory.CategoryName',
        headerName: t('manageHome.latestProduct.textCategory')
      },
      {
        maxWidth: 140,
        filter: false,
        headerName: '',
        field: 'action',
        cellStyle: { justifyContent: 'center' },
        cellRendererFramework: (params: any) => (
          <SysMinusSapIcon
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => handleDeleteLatestProduct(params?.data?._id)}
          />
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleDeleteLatestProduct]
  )

  const gridOption = useMemo<ERPGridProps>(
    () => ({
      columnDefs,
      height: '100%',
      hideCheckbox: true,
      floatingFilter: true,
      gridName: 'LatestProducts',
      rowData: dataStockModelsNew,
      onGridReady: (event) => event.api.sizeColumnsToFit()
    }),
    [columnDefs, dataStockModelsNew]
  )

  if (loading) return <div>Loading ...</div>

  return (
    <>
      <Form form={form}>
        <div style={{ marginBottom: 10, display: 'flex' }}>
          <Form.Item
            label={t('manageHome.latestProduct.labelProduct')}
            name='idStockModel'
            labelStyle={{ width: 80, marginRight: 5 }}
          >
            <Select loading={loading} style={{ width: 400 }}>
              {dataStockModelsNotNew.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button
            style={{ minWidth: 80, marginTop: 1, marginLeft: 10 }}
            iconName={<AddSapIcon />}
            onClick={handleAddLatestProduct}
          >
            {t('manageHome.latestProduct.textNewProduct')}
          </Button>
        </div>

        <div style={{ height: 'calc(100vh - 210px)' }}>
          <ERPGrid ref={gridRef} {...gridOption} />
        </div>
      </Form>
    </>
  )
}

export default LatestProducts
