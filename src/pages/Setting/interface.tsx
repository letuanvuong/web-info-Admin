
export enum EnumGeneralInfomation {
  ContactInFormation = 'CONTACT',
  Header = 'HEADER',
  Footer = 'FOOTER'
}

export type ITabStateGeneral = EnumGeneralInfomation | 'Thông tin liên hệ'

export interface SettingProps {
  callBack?: () => void
  dataFormHeader?: any
}

export interface SettingRef {
  callBack?: () => void
}
