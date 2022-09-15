import { ReactElement } from 'react'

export enum EnumCardType {
  Column = 'Column',
  Ring = 'Ring',
  List = 'List'
}

export interface CardColumnProps {
  icon?: HTMLElement | ReactElement
  chartLeft?: HTMLElement | ReactElement
  chartRight?: HTMLElement | ReactElement
  title: string
  total: number
  growth: number
  description: string
  mainColor: string
  chart?: {
    color: string
    active: number[]
    value: number[]
  }
  isLoading?: boolean
  chartRing?: {
    title?: string
    percent?: number
    mainColor?: string
    subColor?: string
  }
  chartList?: {
    title?: string
    quantity?: number
    quantityColor?: string
  }[]
  isLoading?: boolean
  cardType?: EnumCardType
}
