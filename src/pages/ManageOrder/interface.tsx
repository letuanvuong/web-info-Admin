import { EnumOrderStatus } from 'src/graphql-definition/webinfo-service.generated'

export type ITabState = EnumOrderStatus | 'All'

export const listTabs: Array<{
  code: EnumOrderStatus | 'All'
  name: string
}> = [
  { code: EnumOrderStatus.AwaitConfirmation, name: 'Chờ xác nhận' },
  { code: EnumOrderStatus.InProgress, name: 'Đang xử lí' },
  { code: EnumOrderStatus.Shipping, name: 'Đang giao hàng' },
  { code: EnumOrderStatus.Success, name: 'Đã giao hàng' },
  { code: EnumOrderStatus.Failed, name: 'Giao thất bại' },
  { code: EnumOrderStatus.Canceled, name: 'Đơn huỷ' },
  { code: 'All', name: 'Tất cả đơn' }
]
