import RingProgress, {
  RingProgressConfig
} from '@ant-design/charts/es/plots/ringProgress'
import ProfitHisIcon from '@digihcs/icons/lib/his/ProfitHisIcon'
import { isEmptyObject } from '@digihcs/util/lib/object/isEmptyObject'
import React, { CSSProperties } from 'react'
import { formatNumber, formatNumberDot } from 'src/utils/function'

import LoadingChart from '../LoadingChart/LoadingChart'
import { CardPieProps } from './CardPie.d'

import './CardPie.less'

const CardPie: React.FC<CardPieProps> = (props) => {
  const { icon, mainColor, title, isLoading, data } = props

  const chartConfig: Partial<RingProgressConfig> = {
    height: 60,
    width: 60,
    autoFit: false,
    innerRadius: 0.7,
    radius: 1,
    statistic: {
      title: false,
      content: {
        style: {
          color: '#32363A',
          fontSize: '11px',
          fontWeight: 700
        },
        formatter: (_ref) =>
          ''.concat(formatNumberDot(_ref.percent * 100, 2), '%')
      }
    }
  }

  const legendNameStyle: CSSProperties = {
    fontSize: 12,
    lineHeight: '16px',
    marginTop: 6
  }

  const legendValueStyle: CSSProperties = {
    fontSize: 12,
    color: '#74777A',
    lineHeight: '16px'
  }

  const chartContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }

  return (
    <div className='cardPie-wrapper'>
      <div className='icon-wrapper' style={{ background: mainColor }}>
        <div className='icon'>{icon || <ProfitHisIcon />}</div>
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
          <div
            style={{
              display: 'flex',
              marginTop: -4,
              justifyContent: 'space-around'
            }}
          >
            <div
              style={{
                ...chartContainerStyle
              }}
            >
              <RingProgress
                {...chartConfig}
                percent={isEmptyObject(data) ? 0 : data.AT / data.total || 0}
                color={['#0AA275', '#ceece3']}
              />

              <div style={{ ...legendNameStyle, color: '#107E3E' }}>
                Âm tính
              </div>

              <div style={legendValueStyle}>{formatNumber(data.AT)} ca</div>
            </div>

            <div style={chartContainerStyle}>
              <RingProgress
                {...chartConfig}
                percent={isEmptyObject(data) ? 0 : data.DT / data.total || 0}
                color={['#E51515', '#fad0d0']}
              />

              <div style={{ ...legendNameStyle, color: '#BB0000' }}>
                Dương tính
              </div>

              <div style={legendValueStyle}>{formatNumber(data.DT)} ca</div>
            </div>

            <div style={{ ...chartContainerStyle }}>
              <RingProgress
                {...chartConfig}
                percent={isEmptyObject(data) ? 0 : data.CL / data.total || 0}
                color={['#48ABF7', '#daeefd']}
              />

              <div style={{ ...legendNameStyle, color: '#0A6ED1' }}>
                Chưa có kết quả
              </div>

              <div style={legendValueStyle}>{formatNumber(data.CL)} ca</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CardPie
