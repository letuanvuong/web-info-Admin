import { ERPGrid } from '@digihcs/grid2'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ColumnDefs,
  ERPGridProps
} from '@digihcs/grid2/lib/e-r-p-grid/interface'
import { EditSapIcon, MenuHisIcon } from '@digihcs/icons'
import { Button, Popover } from '@digihcs/innos-ui3'
import { TooltipPlacement } from '@digihcs/util/lib/enums/TooltipPlacement'
import moment from 'moment'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { memo, useEffect, useReducer, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import {
  useGetMapServiceProductsQuery,
  useGetServicePaginationQuery
} from 'src/graphql-definition/webinfo-service.generated'

import dataServicesGroup from '../ManageService/directories.json'
import { ServicesType } from '../ManageService/type'

import './styles.less'

export type Map_Service_Product = {
  _id?: string
  idService?: string
  updatedAt?: number
  updatedBy?: string
  name?: string
  title?: string
}
const ServiceList = memo(() => {
  const { t } = useTranslation()

  const history: any = useHistory()
  const gridApi = useRef<any>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { refetch: refetchService, data: dataServices } =
    useGetServicePaginationQuery({
      fetchPolicy: 'no-cache'
    })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { refetch: refetchMap, data: dataMap } = useGetMapServiceProductsQuery({
    fetchPolicy: 'no-cache'
  })

  const getMapAllService = () => {
    if (dataMap?.getMapServiceProducts) {
      const arrayMap = dataMap?.getMapServiceProducts
      const arrayService = dataServices?.getServicePagination?.data
      const array = []

      for (let j = 0; j < arrayService.length; j++) {
        let products = ''
        let finalCreateAt = 0
        let finalCreateBy = ''
        for (let i = 0; i < arrayMap.length; i++) {
          if (arrayService[j]?._id === arrayMap[i]?.idService) {
            if (arrayMap[i]?.createdAt > finalCreateAt) {
              finalCreateAt = arrayMap[i]?.createdAt
              finalCreateBy = arrayMap[i]?.createdBy?.username
            }
            products =
              // eslint-disable-next-line prefer-template
              products + arrayMap[i]?.stockModel?.name + '; '
          }
        }
        array.push({
          orderNumber: j + 1,
          _id: arrayService[j]._id,
          idService: arrayService[j]._id,
          createdAt: finalCreateAt,
          createdBy: finalCreateBy,
          name: products,
          title: arrayService[j].title
        })
      }
      return array
    }
  }

  const handleEdit = (idService: string) => {
    let finded = null
    const findedCT_Services = dataServicesGroup.find(
      (i: ServicesType) => i.route === '/add-products-to-service-detail'
    )

    finded = findedCT_Services
    if (finded?.type === 'his') {
      history.push(`/manage-service${finded.route}/${idService}`)
    } else {
      window.location.href = `${window.location.origin}/manage-service${finded?.route}`
    }
  }

  const gridOptions: ERPGridProps = {
    columnDefs: [
      {
        field: 'orderNumber',
        headerName: t('service.textNumberOder'),
        filter: false,
        maxWidth: 50,
        minWidth: 20,
        cellStyle: { display: 'flex', justifyContent: 'center' }
      },
      {
        maxWidth: 350,
        field: 'title',
        autoHeight: true,
        wrapText: true,
        headerName: t('service.textTitle'),
        filter: 'agTextColumnFilter',
        flex: 1
      },
      {
        field: 'name',
        sortable: true,
        wrapText: true,
        autoHeight: true,
        headerName: t('service.textProduct'),
        filter: 'agTextColumnFilter',
        flex: 3
      },
      {
        field: 'createdAt',
        headerName: t('service.gridUpdatedDate'),
        flex: 1,
        maxWidth: 130,
        filter: 'agDateColumnFilter',
        filterParams: {
          // provide comparator function
          comparator: (filterLocalDateAtMidnight: any, cellValue: any) => {
            const dateAsString = cellValue

            if (dateAsString == null) {
              return 0
            }
            if (dateAsString === '--/--/----') {
              return 1
            }
            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date

            const dateParts = dateAsString.split('/')
            const year = Number(dateParts[2])
            const month = Number(dateParts[1]) - 1
            const day = Number(dateParts[0])
            const cellDate = new Date(year, month, day)

            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) return -1
            if (cellDate > filterLocalDateAtMidnight) return 1
            return 0
          }
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
        field: 'createdBy',
        sortable: true,
        headerName: t('service.gridUpdatedBy'),
        filter: 'agTextColumnFilter',
        flex: 1,
        maxWidth: 130
      },
      {
        headerName: t('service.gridAction'),
        field: 'Manipulation',
        filter: false,
        sortable: false,
        pinned: 'right',
        minWidth: 70,
        width: 70,
        maxWidth: 70,
        cellStyle: { display: 'flex', justifyContent: 'center' },
        cellRendererFramework: (params: any) => {
          if (params?.data) {
            return (
              <>
                <Button
                  noFill
                  onClick={() => {
                    handleEdit(params?.data.idService)
                  }}
                  iconName={<EditSapIcon />}
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
    ],
    onGridReady: (gridOpts) => {
      gridApi.current = gridOpts.api
    },
    hideCheckbox: false,
    pagination: true,
    rowData: getMapAllService() || [],
    gridName: 'AddProductsToService',
    floatingFilter: true,
    defaultPageSize: 50
  }

  return (
    <div className='service'>
      <div>
        <div className='title_bar'>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>
            {t('service.textAddProductsToService')}
          </h3>
        </div>

        <div style={{ height: 'calc(100vh - 110px)' }}>
          <ERPGrid {...gridOptions} />
        </div>
      </div>
    </div>
  )
})

export default ServiceList
