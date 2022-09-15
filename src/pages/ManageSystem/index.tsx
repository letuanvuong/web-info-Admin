/* eslint-disable react-hooks/exhaustive-deps */
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
import dataPagesGroup from './directories.json'
import { componentPageRef, PagesGroupType, PagesType } from './type'

import './index.less'

type stateType = {
  currentPages?: PagesType
  dataPages?: Array<PagesType>
  dataCT_PagesGroup?: Array<PagesGroupType>
  dataCT_PagesNotInGroup?: Array<PagesType>
  dataTree?: CT_PagesGroup[]
  defaultCheckedKeys?: Array<any>
  fathersDefaultCheckedKey?: Array<any>
}

type CT_Pages = {
  key?: string
  title?: string
  route?: string
  page?: string
  type?: string
  isShow?: boolean
}

type CT_PagesGroup = {
  key?: string
  title?: string
  titleVN?: string
  route?: string
  page?: string
  type?: string
  isShow?: boolean
  iconName?: string
  childs?: CT_Pages[]
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
      currentPages: {},
      dataPages: [],
      dataCT_PagesGroup: [],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname])

  const getAllChild: (
    dataNhomDanhMuc: CT_PagesGroup[],
    result: CT_Pages[]
  ) => CT_Pages[] = (dataNhomDanhMuc, result) => {
    dataNhomDanhMuc.forEach((item: CT_PagesGroup) => {
      if (item?.childs?.length) {
        getAllChild(item.childs, result)
      } else {
        result.push(item)
      }
    })
    return result
  }

  const componentDidMount = useCallback(async () => {
    const dataPages: CT_Pages[] = getAllChild(dataPagesGroup, [])
    const dataCT_PagesGroup: CT_PagesGroup[] = dataPagesGroup
    const dataTree = dataCT_PagesGroup

    // find first page
    const objSetState: stateType = {
      dataCT_PagesGroup,
      dataPages,
      dataTree
    }
    const arrPathName = window.location.pathname.split('/').filter((i) => i)
    // const idx = arrPathName.findIndex(
    //   (i) => i === path.replace('/m', '').replace('/t', '').substr(1)

    // )
    if (arrPathName.length === 2) {
      const findedDanhMuc: PagesType = getFistPage(dataTree, null)
      if (findedDanhMuc) {
        history.push(`/system${findedDanhMuc.route}`)
      }
    }

    setState(objSetState)
  }, [])

  useEffect(() => {
    componentDidMount()
  }, [])

  const handleSetActive = useCallback(
    (childComponentPath: string) => {
      const finded = state.dataPages.find(
        (i) => i.route === `/${childComponentPath}`
      )
      let fatherChecked = ''
      if (state.dataTree && finded) {
        const getCT_PagesInTrees: (rowTrees: any) => any = (rowTrees) => {
          let res
          for (let i = 0; i < rowTrees.length; ++i) {
            if (res) return res
            if (finded.isShow) {
              if (rowTrees[i].route === finded.route) {
                return rowTrees[i].key
              }
            }
            else if (rowTrees[i].route === finded.GroupRoute) {
              return rowTrees[i].key
            }

            if (rowTrees[i].childs?.length) {
              res = getCT_PagesInTrees(rowTrees[i].childs)
            }
          }
        }
        const keyFinded = getCT_PagesInTrees(state.dataTree)
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
      JSON.stringify(state.dataPages),
      JSON.stringify(state.dataTree),
      JSON.stringify(state.defaultCheckedKeys)
    ]
  )

  const handleSelect = (params: NavigationListEventParam) => {
    let finded = null
    const findedCT_Pages = state.dataPages.find(
      (i: PagesType) => i.key === params.key
    )

    // truong hop 1 cap
    if (!findedCT_Pages) {
      finded = state.dataCT_PagesGroup.find(
        (i: PagesGroupType) => i.key === params.key
      )
    } else {
      finded = findedCT_Pages
    }

    if (finded?.type === 'his') {
      history.push(`/system${finded.route}`)
    } else {
      window.location.href = `${window.location.origin}/system${finded?.route}`
    }
  }

  useEffect(() => {
    const prevTitle = window.document.title
    window.document.title = 'System'

    return () => {
      window.document.title = prevTitle
    }
  }, [])

  return (
    <div className='layout_split'>
      <CommonHisComponent.SplitContainer
        renderBottomRightContainer={() => (
          <Switch>
            <Route path={`${path}/:childComponentPath?/:idItem?`}>
              <ComponentPage
                setActive={handleSetActive}
                ref={componentPageRef}
                dataPages={state.dataPages}
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
              title={t('system.textSystem')}
              defaultSelectedKeys={state.defaultCheckedKeys}
              defaultOpenKeys={state.fathersDefaultCheckedKey}
              onSelect={handleSelect}
            >
              {state.dataTree.map((value) => {
                if (value?.isShow) {
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
