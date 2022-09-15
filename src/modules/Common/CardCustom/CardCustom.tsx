import { Pie, PieConfig } from '@ant-design/charts'
import DocumentTextSapIcon from '@digihcs/icons/lib/sap/DocumentTextSapIcon'
import React from 'react'
import { formatNumber } from 'src/utils/function'

import LoadingChart from '../LoadingChart/LoadingChart'
import { CardCustomProps } from './CardCustom.d'

import './CardCustom.less'

const CardCustom: React.FC<CardCustomProps> = ({
  data = [],
  chartColor,
  mainColor,
  icon,
  isLoading,
  title
}) => {
  const total = data.reduce((tempTotal, value) => tempTotal + value.value, 0)
  // show 0% trong trường hợp cả hai bằng 0
  const show = data[0]?.value === 0 && data[1]?.value === 0

  const config: PieConfig = {
    height: 78,
    width: 78,
    data: [...data].reverse(),
    angleField: 'value',
    colorField: 'name',
    radius: 1,
    legend: false,
    color: [
      chartColor?.mainColor || '#152AE5',
      chartColor?.subColor || '#FA5A5A'
    ],
    tooltip: {
      formatter: (data: any) => ({
        name: data.name,
        value: `${total ? ((data.value * 100) / total).toFixed(0) : 0}%`
      })
    },
    label: {
      autoRotate: false,
      offset: '-40%',
      style: { textAlign: 'center' },
      type: 'inner',
      content: (_ref: any) => {
        const { percent } = _ref
        const result = percent * 100
        // an so % duoi 20%
        return result >= 20 || show ? `${result.toFixed(0)}%` : ''
      }
    }
    // interactions: [{ type: 'element-active' }]
  }

  return (
    <div className='card-wrapper'>
      <div
        className='icon-wrapper'
        style={{ background: mainColor || '#152AE5' }}
      >
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
          <div className='statistic'>
            <div className='info-wrapper'>
              {data.map((value, index) => (
                <div key={index} className='info'>
                  <div className='quantity'>{formatNumber(value.value)}</div>
                  <div className='name'>{value.name}</div>
                </div>
              ))}
            </div>
            <div className='chart-overview'>
              <Pie {...config} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CardCustom
