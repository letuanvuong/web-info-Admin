export type ServicesGroupType = ServicesType & {
  childs?: ServicesType[]
}

export type ServicesType = {
  key?: string
  title?: string
  titleVN?: string
  page?: string
  route?: string
  type?: string
  isShow?: boolean
  groupKey?: string
  GroupRoute?: string
}

export type componentPageProps = {
  dataServices: Array<ServicesType>
  setActive: (childComponentPath: string) => void
  componentDidMount: () => void
}

export type componentPageRef = {}