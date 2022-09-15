import {
  AdministrativeHisIcon,
  FormSapIcon,
  SettingHisIcon
} from '@digihcs/icons'
import { CommonHisComponent, NavigationList } from '@digihcs/innos-ui3'
import { NavigationListEventParam } from '@digihcs/innos-ui3/lib/navigation-list/interface'
import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import i18n from 'src/config/i18n'
import { reducer } from 'src/utils/function'

import ComponentPage from './componentPage'
import dataCategoriesGroup from './directories.json'
import { CategoriesGroupType, CategoriesType, componentPageRef } from './type'

import './index.less'

type stateType = {
  currentCategories?: CategoriesType
  dataCategories?: Array<CategoriesType>
  dataCT_CategoriesGroup?: Array<CategoriesGroupType>
  dataCT_CategoriesNotInGroup?: Array<CategoriesType>
  dataTree?: CT_CategoriesGroup[]
  defaultCheckedKeys?: Array<any>
  fathersDefaultCheckedKey?: Array<any>
}

type CT_Categories = {
  key?: string
  title?: string
  route?: string
  page?: string
  type?: string
  isShow?: boolean
}

type CT_CategoriesGroup = {
  key?: string
  title?: string
  titleVN?: string
  route?: string
  page?: string
  type?: string
  isShow?: boolean
  iconName?: string
  childs?: CT_Categories[]
}

const { Sub, Item } = NavigationList

const icon: any = {
  administrative: <AdministrativeHisIcon />,
  setting: <SettingHisIcon />,
  form: <FormSapIcon />
}

export default React.memo(() => {
  const { t } = useTranslation()
  const [state, setState]: [stateType, (params: stateType) => void] =
    useReducer(reducer, {
      dataTree: [],
      currentCategories: {},
      dataCategories: [],
      dataCT_CategoriesGroup: [],
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
  }, [window.location.pathname])

  const getAllChild: (
    dataNhomDanhMuc: CT_CategoriesGroup[],
    result: CT_Categories[]
  ) => CT_Categories[] = (dataNhomDanhMuc, result) => {
    dataNhomDanhMuc.forEach((item: CT_CategoriesGroup) => {
      if (item?.childs?.length) {
        getAllChild(item.childs, result)
      } else {
        result.push(item)
      }
    })
    return result
  }

  const componentDidMount = useCallback(async () => {
    const dataCategories: CT_Categories[] = getAllChild(dataCategoriesGroup, [])
    const dataCT_CategoriesGroup: CT_CategoriesGroup[] = dataCategoriesGroup
    const dataTree = dataCT_CategoriesGroup

    // find first page
    const objSetState: stateType = {
      dataCT_CategoriesGroup,
      dataCategories,
      dataTree
    }
    const arrPathName = window.location.pathname.split('/').filter((i) => i)
    const idx = arrPathName.findIndex(
      (i) => i === path.replace('/m', '').replace('/t', '').substr(1)
    )

    if (arrPathName.length === idx + 1) {
      const findedDanhMuc: CategoriesType = getFistPage(dataTree, null)
      if (findedDanhMuc) {
        history.push(`/setting${findedDanhMuc.route}`)
      }
    }
    setState(objSetState)
  }, [])

  useEffect(() => {
    componentDidMount()
  }, [])

  const handleSetActive = useCallback(
    (childComponentPath: string) => {
      const finded = state.dataCategories.find(
        (i) => i.route === `/${childComponentPath}`
      )
      let fatherChecked = ''
      if (state.dataTree && finded) {
        const getCT_CategoriesInTrees: (rowTrees: any) => any = (rowTrees) => {
          let res
          for (let i = 0; i < rowTrees.length; ++i) {
            if (res) return res
            if (rowTrees[i].route === finded.route) {
              return rowTrees[i].key
            }
            if (rowTrees[i].childs?.length) {
              res = getCT_CategoriesInTrees(rowTrees[i].childs)
            }
          }
        }
        const keyFinded = getCT_CategoriesInTrees(state.dataTree)
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
      JSON.stringify(state.dataCategories),
      JSON.stringify(state.dataTree),
      JSON.stringify(state.defaultCheckedKeys)
    ]
  )

  const handleSelect = (params: NavigationListEventParam) => {
    let finded = null
    const findedCT_Categories = state.dataCategories.find(
      (i: CategoriesType) => i.key === params.key
    )

    // truong hop 1 cap
    if (!findedCT_Categories) {
      finded = state.dataCT_CategoriesGroup.find(
        (i: CategoriesGroupType) => i.key === params.key
      )
    } else {
      finded = findedCT_Categories
    }

    if (finded?.type === 'his') {
      history.push(`/setting${finded.route}`)
    } else {
      window.location.href = `${window.location.origin}/setting${finded?.route}`
    }
  }

  useEffect(() => {
    const prevTitle = window.document.title
    window.document.title = 'General Setting'

    return () => {
      window.document.title = prevTitle
    }
  }, [])

  return (
    <div className='layout_split'>
      <CommonHisComponent.SplitContainer
        renderBottomRightContainer={() => (
          <Switch>
            <Route path={`${path}/:childComponentPath`}>
              <ComponentPage
                setActive={handleSetActive}
                ref={componentPageRef}
                dataCategories={state.dataCategories}
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
              title={t('category.titleSetting')}
              defaultSelectedKeys={state.defaultCheckedKeys}
              defaultOpenKeys={state.fathersDefaultCheckedKey}
              onSelect={handleSelect}
            >
              {state.dataTree.map((value) => {
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
              })}
            </NavigationList>
          )
        }
      />
    </div>
  )
})
