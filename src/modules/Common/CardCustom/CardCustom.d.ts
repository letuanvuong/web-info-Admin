import { ReactElement } from 'react'

export interface CardCustomProps {
    icon?: HTMLElement | ReactElement
    data?: {
        name: string,
        value: number
    }[]
    mainColor?: string
    chartColor?: {
        mainColor: string
        subColor: string
    }
    isLoading?: boolean
    title?: string
}