
export enum EnumTrangQuanLySecurity {
  Info = 'Info',
  Content = 'Content',
}
export type ITabStateSecurity = EnumTrangQuanLySecurity | 'All'
export const listTabsSecurity: Array<{
  code: EnumTrangQuanLySecurity | EnumTrangQuanLySecurity.Info
    name: string
  }> = [
    { code: EnumTrangQuanLySecurity.Info,  name: 'Thông tin SEO' },
    { code: EnumTrangQuanLySecurity.Content,  name: 'Nội dung trang' }
  ]
