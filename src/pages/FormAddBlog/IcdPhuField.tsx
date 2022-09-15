import { Option, Select } from '@digihcs/innos-ui3'
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetBlogPaginationQuery } from 'src/graphql-definition/webinfo-service.generated'

export interface IcdData {
  _id?: string
  title?: string
}
interface IcdPhuFieldProps {
  onChange?: any
  value?: any
  options?: IcdData[]
  style?: CSSProperties
  readOnly?: boolean
  selectedValues?: IcdData[]
  setSelectedValues?: Function
}
const IcdPhuField: FC<IcdPhuFieldProps> = ({
  onChange,
  value,
  options = [],
  style,
  readOnly,
  selectedValues,
  setSelectedValues
}) => {
  const prevSelectedValues = useRef<IcdData[]>(options || [])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = useState(false)
  const timeout = useRef<any>()
  const { idItem }: { idItem: string } = useParams()
  const { refetch: searchBlog, data } = useGetBlogPaginationQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: 1
    }
  })

  useEffect(() => {
    prevSelectedValues.current = selectedValues
  }, [selectedValues])

  useEffect(() => {
    searchBlog({
      page: 1,
      search: { fieldSearch: 'title', textSearch: '' },
      limit: 20,
      idsDefault: value
    })
  }, [searchBlog, value])

  const selectedIds = useMemo(
    () => prevSelectedValues.current.map((icd) => icd?._id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prevSelectedValues.current]
  )

  const mergedData =
    prevSelectedValues.current.length > 0
      ? [
          ...prevSelectedValues.current,
          ...(data?.getBlogPagination?.data || []).filter(
            (icd) => !selectedIds.includes(icd._id)
          )
        ]
      : data?.getBlogPagination?.data

  const handleSearch = (val: string) => {
    prevSelectedValues.current = selectedValues

    if (timeout.current) {
      clearTimeout(timeout.current)
      timeout.current = null
    }

    timeout.current = setTimeout(() => {
      searchBlog({
        page: 1,
        search: { fieldSearch: 'title', textSearch: val },
        limit: 20,
        idsDefault: value
      })
    }, 300)
  }

  const handleSelect = (val: string) => {
    if (!data) {
      return
    }

    const currentSelectedValue = data?.getBlogPagination?.data.find(
      (icd) => icd?._id === val
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
      autoClearSearchValue={false}
      style={style}
      readOnly={readOnly}
    >
      {mergedData
        ?.filter((id) => id._id !== idItem)
        .map((icd: any) => (
          <Option label={icd.title} value={icd._id} key={icd._id}>
            {icd.title}
          </Option>
        ))}
    </Select>
  )
}

export default IcdPhuField
