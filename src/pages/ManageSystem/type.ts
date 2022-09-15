export type PagesGroupType = PagesType & {
  childs?: PagesType[]
}

export type PagesType = {
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
  dataPages: Array<PagesType>
  setActive: (childComponentPath: string) => void
  componentDidMount: () => void
}

export type componentPageRef = {}