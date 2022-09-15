import { messageToast } from '@digihcs/innos-ui3'
import moment from 'moment'
import React, {
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import FilterReport from 'src/components/Reports/FilterReport/FilterReport'
import ReportRevenue from 'src/components/Reports/ReportRevenue/ReportRevenue'
import ReportTotalOrder from 'src/components/Reports/ReportTotalOrder/ReportTotalOrder'

import './style.less'
// const getWindowDimensions = () => window.innerWidth

const OverviewPage: React.FC = () => {
  const previousClickRefresh = useRef(moment())
  const [timeUpdated, setTimeUpdated] = useState<any>({
    updatedAt: moment().format('HH:mm:ss DD/MM/YYYY'),
    range: 0
  })
  const { t } = useTranslation()
  const chartContainerDomRef: RefObject<HTMLDivElement> = useRef(null)
  const filterWrapperDomRef: RefObject<HTMLDivElement> = useRef(null)

  // const [windowDimensions, setWindowDimensions] = useState(
  //   getWindowDimensions()
  // )

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowDimensions(getWindowDimensions())
  //   }

  //   window.addEventListener('resize', handleResize)
  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])

  const [timeType, setTimeType] = useState('day')
  // presentView (xem với filter thuộc mốc thời gian hiện tại (hôm nay, tuần này, tháng này))
  const [presentView, setPresentView] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [description, setDescription] = useState('')
  const [refreshData, setRefreshData] = useState(false)

  const [currentFilter, setCurrenFilter] = useState({
    createdAtFrom: moment().startOf('day').valueOf(),
    createdAtTo: moment().valueOf()
  })

  useEffect(() => {
    let temDescription = ''
    switch (timeType) {
      case 'day':
        temDescription = 'vs. hôm qua'
        break
      case 'week':
        temDescription = 'vs. tuần trước'
        break
      case 'month':
        temDescription = 'vs. tháng trước'
        break
      case 'year':
        temDescription = 'vs. năm trước'
        break
      default:
        break
    }
    setDescription(temDescription)
  }, [timeType])

  const getMessageUpdated = () => {
    const startOfTime = moment(currentFilter?.createdAtFrom)
    const endOfTime = moment()
    const diff = moment.duration(endOfTime.diff(startOfTime)).asDays()

    const result = Math.ceil(diff)
    setTimeUpdated({
      updatedAt: endOfTime.format('HH:mm:ss DD/MM/YYYY'),
      range: result > 1 ? result : 0
    })
  }

  const handleChangeFilter = (filterTongQuan: any) => {
    const { typeTime, ...newFilter } = filterTongQuan

    // const tempCreatedAtTo = moment(newFilter?.createdAtTo)
    //   .add(-1, typeTime.type)
    //   .valueOf()

    // if (typeTime.type === 'month') {
    //   // tháng đang filter có số ngày ít hơn tháng trước
    //   if (
    //     moment(newFilter?.createdAtTo) ===
    //     moment(newFilter?.createdAtTo).endOf(typeTime.type)
    //   ) {
    //     tempCreatedAtTo = moment(newFilter?.createdAtTo)
    //       .add(-1, typeTime.type)
    //       .endOf(typeTime.type)
    //       .valueOf()
    //   }
    // }

    // const newFilterGrowth = {
    //   ...newFilter,
    //   createdAtFrom: moment(newFilter?.createdAtFrom)
    //     .add(-1, typeTime.type)
    //     .valueOf(),
    //   createdAtTo: tempCreatedAtTo
    // }

    setTimeType(typeTime.type)
    setPresentView(typeTime.presentView)
    setCurrenFilter(newFilter)
  }

  useEffect(() => {
    getMessageUpdated()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilter, refreshData])

  useLayoutEffect(() => {
    if (
      !filterWrapperDomRef.current ||
      !chartContainerDomRef.current ||
      window.innerWidth > 768
    ) {
      return
    }

    let prevScrollPos = window.pageYOffset
    let count = 0

    const parentDiv = filterWrapperDomRef.current.parentNode as HTMLElement
    const toolBarNode = document.querySelector(
      'div.innos-ui-tool-header.innos-ui-toolbar'
    ) as HTMLElement

    // parentDiv.insertBefore(toolBarNode, filterWrapperDomRef.current)

    const handleScroll = () => {
      if (!parentDiv) {
        return
      }

      const headerHeight = 42
      const currentScrollPos = window.pageYOffset
      const paddingTop =
        filterWrapperDomRef.current.offsetHeight + toolBarNode.offsetHeight

      if (currentScrollPos > paddingTop) {
        count = 1
        chartContainerDomRef.current.style.paddingTop = `${paddingTop}px`

        Object.assign(parentDiv.style, {
          position: 'fixed',
          transition: 'top .3s',
          zIndex: 99,
          width: '100%'
        })

        if (
          prevScrollPos > currentScrollPos ||
          currentScrollPos < headerHeight
        ) {
          parentDiv.style.top = '0'
        } else {
          parentDiv.style.top = `-${paddingTop}px`
        }
      } else if (!count || currentScrollPos === 0) {
        parentDiv.removeAttribute('style')
        chartContainerDomRef.current.removeAttribute('style')
      }

      prevScrollPos = currentScrollPos
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRefresh = () => {
    if (presentView) {
      const newTimeClickRefresh = moment()
      const timer = newTimeClickRefresh.diff(
        previousClickRefresh.current,
        'seconds'
      )
      if (timer < 5) {
        messageToast.error({
          message: `Bạn vừa mới cập nhật dữ liệu ${timer} giây trước`
        })
      } else {
        previousClickRefresh.current = newTimeClickRefresh
        setRefreshData(!refreshData)
      }
    }
  }

  return (
    <div className='overview'>
      <div>
        <div
          className='filterWrapper d-flex align-items-center justify-content-between flex-wrap'
          ref={filterWrapperDomRef}
        >
          <div className='d-flex align-items-center' style={{ width: '100%' }}>
            <FilterReport handleChangeFilter={handleChangeFilter} />
          </div>
        </div>
      </div>
      <div className='chart-container' ref={chartContainerDomRef}>
        <div className={`updated-info ${presentView ? 'refresh' : ''}`}>
          <span onClick={handleRefresh}>{t('dashboard.textUpdate')}</span>
          <span>
            {` ${t('dashboard.textTo')} ${timeUpdated.updatedAt}`}
            {timeUpdated.range > 0 ? `, ${t('dashboard.textTotal')}: ${timeUpdated.range} ${t('dashboard.textDay')}` : ''}
          </span>
        </div>
        <div className='groupItem'>
          <div className='chart-item item-res-50'>
            <ReportTotalOrder filter={currentFilter} refresh={refreshData} />
          </div>
          <div className='chart-item item-res-50'>
            <ReportRevenue filter={currentFilter} refresh={refreshData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewPage
