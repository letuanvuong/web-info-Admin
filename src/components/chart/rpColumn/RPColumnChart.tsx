import { ChartContainer, ColumnChart } from '@digihcs/chart'
import React from 'react'

import { IColumnChartProps } from './RPChart'

import './RPColumnChart.less'

export const RPColumnChart: React.FC<IColumnChartProps> = ({
  height,
  data,
  categoryAxis,
  valueAxis,
  isPDFMode
}) => (
  <div
    className={`rp-column-chart ${isPDFMode ? 'pdf-mode' : ''}`}
    style={
      isPDFMode
        ? {
            height: 500
          }
        : {}
    }
  >
    <ChartContainer showZoom={false} showLegendButton={false}>
      <ChartContainer.Content>
        <ColumnChart
          height={height}
          // eslint-disable-next-line no-console
          onSelect={(data) => console.log(data)}
          data={data}
          // trục X
          categoryAxis={categoryAxis}
          // trục Y
          valueAxis={valueAxis}
        />
      </ChartContainer.Content>
    </ChartContainer>
  </div>
)
