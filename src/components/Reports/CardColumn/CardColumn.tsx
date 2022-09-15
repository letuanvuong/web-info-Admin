import RingProgress, {
  RingProgressConfig
} from '@ant-design/charts/es/plots/ringProgress'
import DocumentTextSapIcon from '@digihcs/icons/lib/sap/DocumentTextSapIcon'
import React from 'react'
import arrowBottom from 'src/assets/images/smart/arrowBottom.svg'
import arrowTop from 'src/assets/images/smart/arrowTop.svg'
import line from 'src/assets/images/smart/line.svg'
import { formatNumber } from 'src/utils/function'

import LoadingChart from '../LoadingChart/LoadingChart'
import { CardColumnProps, EnumCardType } from './CardColumn.d'

import './CardColumn.less'

const CardColumn: React.FC<CardColumnProps> = (props) => {
  const {
    title,
    icon,
    description,
    mainColor,
    cardType,
    chart,
    growth,
    total,
    isLoading,
    chartRing,
    chartList,
    chartLeft,
    chartRight
  } = props

  let arrow: any = arrowTop

  if (growth <= 0) {
    arrow = growth ? arrowBottom : line
  }

  const getGrowthClass = () =>
    // eslint-disable-next-line no-nested-ternary
    growth > 0 ? 'positive' : growth < 0 ? 'negative' : 'balance'

  const renderChartContentRight = () => {
    const newChartValue = chart ? [...chart?.value] : []
    newChartValue.sort((a, b) => b - a)

    let [max] = newChartValue
    // lấy 3% của số lớn nhất làm mặc định cho những giá trị bằng 0
    const defaultWidth = (3 * max) / 100
    max += defaultWidth

    const customWidth = (width: number) => `${max ? (width * 100) / max : 3}%`

    return (
      <div className='chart-column'>
        {chart?.value.map((x, index) => (
          <div
            key={index}
            className='bar'
            style={{
              width: customWidth(x + defaultWidth),
              background: `${
                chart?.active.includes(index + 1) ? mainColor : chart?.color
              }`
            }}
          />
        ))}
      </div>
    )
  }

  const renderChartContentLeft = () => (
    <div
      className={`growth ${
        (!isFinite(growth) || isNaN(growth) || growth === null) && 'hideGrowth'
      }`}
    >
      <div className='d-flex'>
        <span className='d-flex'>
          <img src={arrow} alt='growth' height={18} width={15} />
        </span>
        <span className={`ml-1 ${getGrowthClass()}`}>
          {customResult(growth, 2)}%
        </span>
      </div>
      <div className='compare-time'>{description}</div>
    </div>
  )

  const customResult = (result: number, round: number) => {
    if ([null, undefined].includes(result)) {
      return null
    }

    const tempResult =
      result % 1 === 0 ? result : parseFloat(result.toFixed(round))
    return Math.abs(tempResult)
  }

  const percentCustom = +((chartRing?.percent || 0) / 100 || 0).toFixed(2)

  const chartConfig: Partial<RingProgressConfig> = {
    height: 78,
    width: 78,
    autoFit: false,
    innerRadius: 0.7,
    radius: 1,
    statistic: {
      title: {
        style: {
          color: chartRing?.mainColor || '#48ABF7',
          fontSize: '11px',
          fontStyle: 'italic'
        },
        formatter: function formatter() {
          return chartRing?.title || ''
        }
      },
      content: {
        style: {
          color: '#000000',
          fontSize: '11px',
          fontStyle: 'italic'
        },
        formatter: function formatter() {
          return `${Math.ceil(chartRing?.percent)}%`
        }
      }
    }
  }

  const renderCardRing = () => (
    <RingProgress
      {...chartConfig}
      percent={percentCustom}
      color={[
        chartRing?.mainColor || '#48ABF7',
        chartRing?.subColor || '#daeefd'
      ]}
    />
  )

  const renderChartListLeft = () => (
    <div className='chart-list'>
      {chartList?.map((chart, key) => (
        <div key={key} className='list-item'>
          <div
            className='list-item-quantity'
            style={{ color: chart.quantityColor }}
          >
            {formatNumber(chart.quantity)}
          </div>
          <div className='list-item-title'>{chart.title}</div>
        </div>
      ))}
    </div>
  )

  const renderCardByTypeLeft = () => {
    switch (cardType) {
      case EnumCardType.Column:
        return renderChartContentLeft()
      case EnumCardType.Ring:
        return renderChartContentLeft()
      case EnumCardType.List:
        return renderChartListLeft()
      default:
        return null
    }
  }

  const renderCardByTypeRight = () => {
    switch (cardType) {
      case EnumCardType.Column:
        return renderChartContentRight()
      case EnumCardType.Ring:
        return renderCardRing()
      default:
        return null
    }
  }

  return (
    <div className='card-wrapper'>
      <div className='icon-wrapper' style={{ background: mainColor }}>
        <div className='icon'>{icon || <DocumentTextSapIcon />}</div>
      </div>
      <div className='title bold'>
        <span>{title}</span>
      </div>
      {isLoading ? (
        <div style={{ marginTop: 10, marginLeft: 50 }}>
          <LoadingChart />
        </div>
      ) : (
        <>
          <div className='total' style={{ color: mainColor }}>
            {formatNumber(total)}
          </div>
          <div className='statistic'>
            {chartLeft || renderCardByTypeLeft()}
            <div className='chart-overview'>
              {chartRight || renderCardByTypeRight()}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CardColumn
