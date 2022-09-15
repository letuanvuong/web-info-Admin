import { ReactElement } from 'react'

export enum EnumCardType {
    Column = 'Column',
    Ring = 'Ring'
}

export interface CardColumnProps {
    icon?: HTMLElement | ReactElement
    chartLeft?: HTMLElement | ReactElement
    title: string
    total: number | string
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
    isLoading?: boolean
    cardType?: EnumCardType
}