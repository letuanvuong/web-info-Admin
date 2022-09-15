import { Option, Select } from '@digihcs/innos-ui3'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterListReportTypeValue, FilterReportValue } from './FilterReport.d'

import './FilterReport.less'

const FilterReport: React.FC<any> = (props) => {
  const { handleChangeFilter } = props
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [triggerHandleChange, setTriggerHandleChange] = useState(true)
  const { t } = useTranslation()

  const currentYear = moment().year()

  const [filter, setFilter] = useState<FilterReportValue>({
    time: 'today',
    year: currentYear
  })

  const handleFilter = () => {
    let createdAtFrom = null
    let createdAtTo = null
    const typeTime = {
      type: 'day',
      presentView: true
    }

    if (filter.year === currentYear) {
      switch (filter?.time) {
        case 'today':
          createdAtFrom = moment().startOf('day').valueOf()
          createdAtTo = moment().valueOf()
          typeTime.type = 'day'
          break
        case 'thisWeek':
          createdAtFrom = moment().startOf('isoWeek').valueOf()
          createdAtTo = moment().valueOf()
          typeTime.type = 'week'
          break
        case 'thisMonth':
          createdAtFrom = moment().startOf('month').valueOf()
          createdAtTo = moment().valueOf()
          typeTime.type = 'month'
          break
        case 'yesterday':
          createdAtFrom = moment().add(-1, 'day').startOf('day').valueOf()
          createdAtTo = moment().add(-1, 'day').endOf('day').valueOf()
          typeTime.type = 'day'
          typeTime.presentView = false
          break
        case 'lastWeek':
          createdAtFrom = moment().add(-1, 'week').startOf('isoWeek').valueOf()
          createdAtTo = moment().add(-1, 'week').endOf('isoWeek').valueOf()
          typeTime.type = 'week'
          typeTime.presentView = false
          break
        case 'lastMonth':
          createdAtFrom = moment().add(-1, 'month').startOf('month').valueOf()
          createdAtTo = moment().add(-1, 'month').endOf('month').valueOf()
          typeTime.type = 'month'
          typeTime.presentView = false
          break
        case 'thisYear':
          createdAtFrom = moment().startOf('year').valueOf()
          createdAtTo = moment().valueOf()
          typeTime.type = 'year'
          break
        default:
          break
      }

      // trường hợp đứng năm này chọn "hôm qua, tuần trước, tháng trước" => ra thời gian năm trước
      const tempYear = moment(createdAtFrom).year()
      if (tempYear !== currentYear) {
        // tránh gọi lại handleFilter khi set lại year cho filter (vì nếu gọi lại sẽ chạy phần else phía dưới => sai filter)
        setTriggerHandleChange(false)
        // set lại năm cho filter
        setFilter({ ...filter, year: tempYear })
      }
    } else {
      const filterTime = moment().set('year', filter.year)

      createdAtFrom = filterTime.startOf('year').valueOf()
      createdAtTo = filterTime.endOf('year').valueOf()
      typeTime.type = 'year'
      typeTime.presentView = false
    }

    const variables = {
      createdAtFrom,
      createdAtTo,
      typeTime
    }

    return variables
  }

  const handleChange = (name: string, value: any) => {
    setIsFirstRender(false)
    setTriggerHandleChange(true)
    // truong hop chon lai nam trung nam nay thi xet thoi gian la hom nay
    if (name === 'year' && value === currentYear && filter.year !== value) {
      setFilter((prev: any) => ({ ...prev, [name]: value, time: 'today' }))
    } else {
      setFilter((prev: any) => ({ ...prev, [name]: value }))
    }
  }

  useEffect(() => {
    if (!isFirstRender && triggerHandleChange)
      handleChangeFilter(handleFilter())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const filterTime = [
    {
      label: t('dashboard.textToday'),
      value: 'today'
    },
    {
      label: t('dashboard.textThisWeek'),
      value: 'thisWeek'
    },
    {
      label: t('dashboard.textThisMonth'),
      value: 'thisMonth'
    },
    {
      label: t('dashboard.textYesterday'),
      value: 'yesterday'
    },
    {
      label: t('dashboard.textLastWeek'),
      value: 'lastWeek'
    },
    {
      label: t('dashboard.textLastMonth'),
      value: 'lastMonth'
    },
    {
      label: t('dashboard.textThisYear'),
      value: 'thisYear'
    }
  ]

  const itemToMap = [
    {
      title: '',
      component: (
        <Select
          onChange={(value) => {
            handleChange('year', value)
          }}
          value={filter?.year}
          className='filterYear'
        >
          {Array.from(Array(11).keys(), (x) => -(x - currentYear)).map(
            (value: any, idx: number) => (
              <Option value={value} key={`${idx}-${value}`}>
                {value}
              </Option>
            )
          )}
        </Select>
      )
    },
    {
      title: '',
      hidden: filter.year !== currentYear,
      component: (
        <Select
          onChange={(value) => {
            handleChange('time', value)
          }}
          value={filter?.time}
          className='filterMonth'
        >
          {filterTime.map(({ label, value }, idx: number) => (
            <Option value={value} key={idx + value}>
              {label}
            </Option>
          ))}
        </Select>
      )
    }
  ]

  const mapFilterTop = (list: any[]) => (
    <>
      <div className='title-filter mr-3'>{t('dashboard.textOverview')}</div>
      {list &&
        list.map((value: FilterListReportTypeValue, index: number) => {
          const { title, component } = value
          return !value?.hidden ? (
            <div className='item' key={index}>
              {title ? (
                <div className='title'>
                  <span className='mr-2'>{title}</span>
                </div>
              ) : null}
              <div className='component'>{component}</div>
            </div>
          ) : null
        })}
    </>
  )

  return (
    <div className='FilterCovid filter-tong-quan'>
      <div className='top'>{mapFilterTop(itemToMap)}</div>
    </div>
  )
}

export default FilterReport
