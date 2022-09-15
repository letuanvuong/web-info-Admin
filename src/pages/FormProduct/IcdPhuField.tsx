import { Option, Select } from '@digihcs/innos-ui3'
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import {
  EnumStockModelStatus,
  useGetStockModelPaginationQuery
} from 'src/graphql-definition/webinfo-service.generated'
import { getUrlImage } from 'src/utils/uploadFile'

export interface IcdData {
  _id?: string
  name?: string
  code?: string
  ecomImages?: any
  ecomStatus?: any
}
interface IcdPhuFieldProps {
  onChange?: any
  value?: any
  options?: IcdData[]
  style?: CSSProperties
  readOnly?: boolean
  setSelectedValues?: any
  selectedValues?: any
}

const IcdPhuField: FC<IcdPhuFieldProps> = ({
  onChange,
  value,
  options = [],
  style,
  readOnly,
  setSelectedValues,
  selectedValues
}) => {
  const { idItem }: any = useParams()
  const { t } = useTranslation()
  // const [selectedValues, setSelectedValues] = useState<IcdData[]>(options || [])
  const prevSelectedValues = useRef<IcdData[]>(options || [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = useState(false)
  const timeout = useRef<any>()

  const { refetch: search, data } = useGetStockModelPaginationQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: 1
    }
  })
  useEffect(() => {
    prevSelectedValues.current = selectedValues
  }, [selectedValues])
  useEffect(() => {
    search({
      page: 1,
      limit: 20,
      idsDefault: value
    })
  }, [search, value])

  const selectedIds = useMemo(
    () => prevSelectedValues?.current?.map((icd: any) => icd._id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prevSelectedValues?.current]
  )

  const mergedData =
    prevSelectedValues?.current?.length > 0
      ? [
          ...prevSelectedValues.current,
          ...(data?.getStockModelPagination?.data || []).filter(
            (icd: any) => !selectedIds?.includes(icd._id)
          )
        ]
      : data?.getStockModelPagination?.data
  const handleSearch = (val: string) => {
    prevSelectedValues.current = selectedValues

    if (timeout.current) {
      clearTimeout(timeout.current)
      timeout.current = null
    }

    timeout.current = setTimeout(() => {
      search({
        page: 1,
        search: { fieldSearch: 'name', textSearch: val },
        limit: 20,
        idsDefault: value
      })
    }, 300)
  }

  const handleSelect = (val: string) => {
    if (!data) {
      return
    }

    const currentSelectedValue = data?.getStockModelPagination?.data.find(
      (icd: any) => icd._id === val
    )
    if (currentSelectedValue) {
      setSelectedValues((prev: any) => [...prev, currentSelectedValue])
    }
  }

  const handleDeselect = (val: string) => {
    if (!data) {
      return
    }
    setSelectedValues((prev: any) => prev.filter((icd: any) => icd._id !== val))
  }

  return (
    <Select
      icd
      mode='multiple'
      optionLabelProp='label'
      onChange={onChange}
      value={value}
      dropdownMatchSelectWidth={508}
      onSearch={handleSearch}
      filterOption={false}
      onSelect={handleSelect}
      onDeselect={handleDeselect}
      onDropdownVisibleChange={setOpen}
      autoClearSearchValue
      style={style}
      readOnly={readOnly}
    >
      {mergedData
        ?.filter((id: any) => id._id !== idItem)
        ?.map((icd: any) => (
          <Option
            label={`${icd.code} (${
              icd.ecomStatus === EnumStockModelStatus.NotPublic
                ? t('product.textDraft')
                : t('product.textPublic')
            })`}
            value={icd._id}
            key={icd._id}
          >
            <img
              className='optImg'
              src={getUrlImage(
                (icd?.ecomImages && icd?.ecomImages[0]?.linkImage) || {}
              )}
              alt='img'
            />{' '}
            {icd.code} - {icd.name} (
            {icd.ecomStatus === EnumStockModelStatus.NotPublic
              ? t('product.textDraft')
              : t('product.textPublic')}
            )
          </Option>
        ))}
    </Select>
  )
}

export default IcdPhuField
