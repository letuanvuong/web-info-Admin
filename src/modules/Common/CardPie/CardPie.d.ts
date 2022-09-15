import { ReactElement } from 'react'

export interface CardPieProps {
    icon?: HTMLElement | ReactElement
    title: string
    mainColor: string
    isLoading?: boolean
    data: any
}