import React from 'react'
import { formatNumberDotCustom } from 'src/utils/function'

import { ProgressBarProps } from './ProgressBar.d'

import './ProgressBar.less'

const ProgressBar: React.FC<ProgressBarProps> = ({
  completed,
  bgColor,
  label = 0,
  disabledLabel = false
}) => {
  const fillerStyles = {
    width: `${formatNumberDotCustom(completed, 2)}%`,
    backgroundColor: bgColor || '#FA5A5A'
  }

  return (
    <div className='container-styles'>
      <div style={fillerStyles} className='filler-styles'>
        <span
          className='label-styles'
          style={disabledLabel ? { color: bgColor || '#FA5A5A' } : {}}
        >
          {disabledLabel ? '1' : `${formatNumberDotCustom(label, 2)}%`}
        </span>
      </div>
    </div>
  )
}

export default ProgressBar
