export type CategoriesGroupType = CategoriesType & {
  childs?: CategoriesType[]
}

export type CategoriesType = {
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
export type ProductsType = {
  key?: string
  title?: string
  titleVN?: string
  page?: string
  route?: string
  type?: string
}
export type componentPageProps = {
  dataCategories: Array<CategoriesType>
  setActive: (childComponentPath: string) => void
  componentDidMount: () => void
}

export type componentPageRef = {}