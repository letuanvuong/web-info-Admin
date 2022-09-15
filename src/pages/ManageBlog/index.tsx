/* eslint-disable react-hooks/exhaustive-deps */
import {
  AdministrativeHisIcon,
  FormSapIcon,
  SettingHisIcon,
  TotalFluentIcon
} from '@digihcs/icons'
import { CommonHisComponent, NavigationList } from '@digihcs/innos-ui3'
import { NavigationListEventParam } from '@digihcs/innos-ui3/lib/navigation-list/interface'
import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import i18n from 'src/config/i18n'
import { reducer } from 'src/utils/function'

import ComponentPage from './componentPage'
import dataBlogsGroup from './directories.json'
import { BlogsGroupType,BlogsType, componentPageRef } from './type'

import './index.less'

type stateType = {
  currentBlogs?: BlogsType
  dataBlogs?: Array<BlogsType>
  dataCT_BlogsGroup?: Array<BlogsGroupType>
  dataCT_BlogsNotInGroup?: Array<BlogsType>
  dataTree?: CT_BlogsGroup[]
  defaultCheckedKeys?: Array<any>
  fathersDefaultCheckedKey?: Array<any>
}

type CT_Blogs = {
  key?: string
  title?: string
  route?: string
  page?: string
  type?: string
  isShow?: boolean,
  groupKey?:string,
  GroupRoute ?:string,
}

type CT_BlogsGroup = {
  key?: string
  title?: string
  titleVN?: string
  route?: string
  page?: string
  type?: string
  isShow?: boolean
  iconName?: string
  childs?: CT_Blogs[],
  groupKey?:string,
  GroupRoute ?:string,
}

const { Sub, Item } = NavigationList

const icon: any = {
  administrative: <AdministrativeHisIcon />,
  setting: <SettingHisIcon />,
  form: <FormSapIcon />,
  all: <TotalFluentIcon />
}

export default React.memo(() => {
  const { t } = useTranslation()
  const [state, setState]: [stateType, (params: stateType) => void] =
    useReducer(reducer, {
      dataTree: [],
      currentBlogs: {},
      dataBlogs: [],
      dataCT_BlogsGroup: [],
      defaultCheckedKeys: [],
      fathersDefaultCheckedKey: []
    })

  const { path } = useRouteMatch()
  const history: any = useHistory()

  const componentPageRef = useRef<componentPageRef>()

  const getFistPage: (rowTrees: any, res: any) => any = (rowTrees, res) => {
    for (let i = 0; i < rowTrees.length; ++i) {
      if (res) return res
      if (rowTrees[i].page) {
        return rowTrees[i]
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      res = getFistPage(rowTrees[i].childs, res)
    }
  }

  useEffect(() => {
    if (state.dataTree.length && window.location.pathname.length === 19) {
      setState({
        defaultCheckedKeys: [],
        fathersDefaultCheckedKey: []
      })
      componentDidMount()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname])

  const getAllChild: (dataNhomDanhMuc: CT_BlogsGroup[], result: CT_Blogs[]
  ) => CT_Blogs[] = (dataNhomDanhMuc, result) => {
    dataNhomDanhMuc.forEach((item: CT_BlogsGroup) => {
        if (item?.childs?.length) {
          getAllChild(item.childs, result)
        } else {
          result.push(item)
        }
    })
    return result
  }



  const componentDidMount = useCallback(async () => {



    const dataBlogs: CT_Blogs[] = getAllChild(dataBlogsGroup, [])
    const dataCT_BlogsGroup: CT_BlogsGroup[] = dataBlogsGroup
    const dataTree = dataCT_BlogsGroup

    // find first page
    const objSetState: stateType = {
      dataCT_BlogsGroup,
      dataBlogs,
      dataTree
    }

    const hrefArr = window.location.pathname.split('/').filter((i) => i)
    if (hrefArr.splice(-1).toString() === 'manage-blog') {
      if (dataBlogsGroup) {
        const firstChildRoute = dataBlogsGroup.slice(0, 1).map(child => child.route).toString()
        if (firstChildRoute) {
          history.push(`/manage-blog${firstChildRoute}`)
        }
      }
    }

    setState(objSetState)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    componentDidMount()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

   const handleSetActive = useCallback(
    (childComponentPath: string) => {
       const finded = state.dataBlogs.find(
        (i) => i.route === `/${childComponentPath}`      
      )
      let fatherChecked = ''
      if (state.dataTree && finded) {
        const getCT_BlogsInTrees: (rowTrees: any) => any = (rowTrees) => {
          let res
          for (let i = 0; i < rowTrees.length; ++i) {
            if (res) return res
            if(finded.isShow)
            {
              if (rowTrees[i].route === finded.route) {
                return rowTrees[i].key
              }
            }
            else if (rowTrees[i].route === finded.GroupRoute) {
                return rowTrees[i].key
              }
            
            if (rowTrees[i].childs?.length) {
              res = getCT_BlogsInTrees(rowTrees[i].childs)
            }
          }
        }
        const keyFinded = getCT_BlogsInTrees(state.dataTree)
        if (keyFinded) {
          state.dataTree.forEach((e) => {
            if (e.key === keyFinded) {
              fatherChecked = keyFinded
            } else if (e?.childs?.length) {
              const tempCheck = e.childs?.find((x) => x.key === keyFinded)

              if (tempCheck) fatherChecked = e.key
            }
          })
        }
        if (!state.defaultCheckedKeys.includes(keyFinded)) {
          setState({
            defaultCheckedKeys: [keyFinded],
            fathersDefaultCheckedKey: [fatherChecked]
          })
        }
      }
    },
    [
      JSON.stringify(state.dataBlogs),
      JSON.stringify(state.dataTree),
      JSON.stringify(state.defaultCheckedKeys)
    ]
  )

  const handleSelect = (params: NavigationListEventParam) => {
    let finded = null
    const findedCT_Blogs = state.dataBlogs.find(
      (i: BlogsType) => i.key === params.key
    )

    // Case level 1
    if (!findedCT_Blogs) {
      finded = state.dataCT_BlogsGroup.find(
        (i: BlogsGroupType) => i.key === params.key
      )
    } else {
      finded = findedCT_Blogs
    }

    if (finded?.type === 'his') {
      history.push(`/manage-blog${finded.route}`)
    } else {
      window.location.href = `${window.location.origin}/manage-blog${finded?.route}`
    }
  }

  useEffect(() => {
    const prevTitle = window.document.title
    window.document.title = 'Manage blog'

    return () => {
      window.document.title = prevTitle
    }
  }, [])

  return (
    <div className='layout_split'>
      <CommonHisComponent.SplitContainer
        renderBottomRightContainer={() => (
          <Switch>
            {/* <Route path={`${path}/:childComponentPath`}> */}
            <Route path={`${path}/:childComponentPath?/:idItem?`}>
              <ComponentPage
                setActive={handleSetActive}
                ref={componentPageRef}
                dataBlogs={state.dataBlogs}
                componentDidMount={componentDidMount}
              />
            </Route>
          </Switch>
        )}
        renderLeftContainer={() =>
          !!(
            state.dataTree?.length &&
            state.defaultCheckedKeys?.length &&
            state.fathersDefaultCheckedKey?.length
          ) && (
            <NavigationList
              title={t('category.titleManageBlog')}
              defaultSelectedKeys={state.defaultCheckedKeys}
              defaultOpenKeys={state.fathersDefaultCheckedKey}
              onSelect={handleSelect}
            >
              {state.dataTree.map((value) => {
                if(value?.isShow)
                {
                  if (!value?.childs?.length) {
                    return (
                      <Item
                        isSingle
                        iconName={icon[value.iconName]}
                        key={value.key}
                      >
                        {i18n.language === 'vi' ? value.titleVN : value.title}
                      </Item>
                    )
                  }

                  return (
                    <Sub
                      title={value.title}
                      key={value.key}
                      iconName={icon[value.iconName]}
                    >
                      {value?.childs?.map((item) => (
                        <Item key={item.key}>{item.title}</Item>
                      ))}
                    </Sub>
                  )
                }
                return ''         
              })}
            </NavigationList>
          )
        }
      />
    </div>
  )
})
