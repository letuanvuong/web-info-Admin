export type BlogsGroupType = BlogsType & {
  childs?: BlogsType[]
}

export type BlogsType = {
  key?: string
  title?: string
  titleVN?: string
  page?: string
  route?: string
  type?: string,
  isShow?: boolean,
  groupKey?: string,
  GroupRoute?: string,
}

export type componentPageProps = {
  dataBlogs: Array<BlogsType>
  setActive: (childComponentPath: string) => void
  componentDidMount: () => void
}

export type componentPageRef = {}