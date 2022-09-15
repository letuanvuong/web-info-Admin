import React from 'react'

interface LoadingChartProps {
  color?: string
  className?: string
}

const LoadingChart: React.FC<LoadingChartProps> = ({ color, className }) => (
  <div
    className={className || ''}
    style={{ color: color || '#48ABF7', fontSize: 14 }}
  >
    Loading...
  </div>
)

export default LoadingChart
