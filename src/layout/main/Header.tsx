import LogSapIcon from '@digihcs/icons/lib/sap/LogSapIcon'
import { NavigationList, Option, Select, ShellBar } from '@digihcs/innos-ui3'
import { NavigationListLayout } from '@digihcs/util/lib/enums/NavigationListLayout'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import i18n from 'i18next'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import Logo from 'src/assets/images/logo-sunny-horizontal.png'
import { deleteAllCookies, LocalStorageItemKeys } from 'src/constant'
import { AppConfigContext, AuthContext } from 'src/context'
import { CONTEXT_AUTH } from 'src/graphql-definition/auth-service'
import { useMyInfoLazyQuery } from 'src/graphql-definition/auth-service.generated'
import {
  EnumLanguage,
  useGetContentMenuQuery
} from 'src/graphql-definition/webinfo-service.generated'
import { filterOptsDefault } from 'src/utils/function'
import { getUrlImage } from 'src/utils/uploadFile'

import './Header.less'

const Header: React.FC = ({ children }: { children: any }) => {
  const { push } = useHistory()
  const { t, i18n } = useTranslation()
  const lngs: any = {
    en: { nativeName: t('language.textEnglish') },
    vi: { nativeName: t('language.textVietnamese') }
  }
  const { appConfigState, dispatchAppConfigAction } =
    useContext(AppConfigContext)

  const { authState, dispatchAuthAction } = useContext(AuthContext)

  const [queryMyInfo, { data, error }] = useMyInfoLazyQuery({
    context: CONTEXT_AUTH,
    fetchPolicy: 'no-cache'
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: dataContentMenu, refetch: refetchContentMenu } =
    useGetContentMenuQuery({
      fetchPolicy: 'network-only',
      variables: {
        language: i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En
      }
    })
  const logo = dataContentMenu?.getContentMenu?.linkLogo

  // on Data
  useEffect(() => {
    if (data) {
      const profiles = data?.myInfo?.profiles || []
      const permissions = data?.myInfo?.permissions || []
      let profile: any = {}
      if (data?.myInfo?.currentProfile) {
        const tmp = JSON.parse(JSON.stringify(data?.myInfo?.currentProfile))
        tmp.permissionByNodes = tmp.permissionByNodes?.reduce(
          (accumulator: any, currentValue: any) => {
            accumulator[currentValue.idNode] = currentValue
            return accumulator
          },
          {}
        )
        profile = tmp
      }
      const idCurrentNode = window.localStorage.getItem(
        LocalStorageItemKeys.CURRENT_NODE
      )
      if (idCurrentNode) {
        const [currentNode] = profile.nodes
          ? profile.nodes?.filter((node: any) => node?._id === idCurrentNode)
          : []
        if (currentNode) {
          dispatchAppConfigAction({
            type: 'CHANGE_CURRENT_NODE',
            payload: {
              currentNode
            }
          })
        } else {
          window.localStorage.setItem(
            LocalStorageItemKeys.CURRENT_NODE,
            profile.nodes?.[0]?._id
          )
          dispatchAppConfigAction({
            type: 'CHANGE_CURRENT_NODE',
            payload: {
              currentNode: profile.nodes?.[0] || {}
            }
          })
        }
      } else {
        window.localStorage.setItem(
          LocalStorageItemKeys.CURRENT_NODE,
          profile.nodes?.[0]?._id
        )
        dispatchAppConfigAction({
          type: 'CHANGE_CURRENT_NODE',
          payload: {
            currentNode: profile.nodes?.[0] || {}
          }
        })
      }
      window.localStorage.setItem(
        LocalStorageItemKeys.CURRENT_PROFILE,
        profile._id
      )
      dispatchAuthAction({
        type: 'CHANGE_CURRENT_PROFILE',
        payload: {
          currentProfile: profile
        }
      })
      dispatchAuthAction({
        type: 'CHANGE_CURRENT_USER',
        payload: {
          currentUser: {
            _id: data?.myInfo?._id,
            username: data?.myInfo?.username,
            isOnline: data?.myInfo?.isOnline,
            isLocked: data?.myInfo?.isLocked,
            employee: data?.myInfo?.employee || {}
          }
        }
      })
      dispatchAuthAction({
        type: 'CHANGE_CURRENT_PROFILES',
        payload: {
          currentProfiles: profiles
        }
      })
      dispatchAuthAction({
        type: 'CHANGE_CURRENT_PERMISSIONS',
        payload: {
          currentPermissions: permissions
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  // on Error
  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: AuthContextProvider.tsx ~ line 30 ~ error', error)
    }
  }, [error])

  const userMenu = [
    {
      key: 'sign_out',
      iconName: <LogSapIcon style={{ color: '#0A6ED1', marginBottom: 8 }} />,
      text: 'Logout',
      onClick: () => {
        window.localStorage.clear()
        deleteAllCookies()
        dispatchAuthAction({
          type: 'SWITCH_AUTH_STATE',
          payload: { state: false }
        })
      }
    },
    {
      text: (
        <span
          style={{
            fontStyle: 'italic',
            marginLeft: '18px',
            color: 'slategray'
          }}
        >
          {' '}
          {t('manageHome.version')}: v{appConfigState?.appInfo?.versionFE}/v
          {appConfigState?.appInfo?.versionBE}
        </span>
      )
    }
  ]

  const leftItem = (
    <NavigationList
      layout={NavigationListLayout.Horizontal}
      onClick={({ key }) => {
        const [path, basename] = key.split('|')
        if (basename === process.env.APP_BASENAME_PATH) {
          push(path)
        } else {
          window.location.replace(
            `${window.location.origin}${
              basename === '/sm3' ? '/sm4' : basename
            }${path}`
          )
        }
      }}
    >
      {authState.currentProfile?.navigation?.navigationTree?.map(
        ({ key, title, path, basename, children }: any) => {
          if (children) {
            if (children.length === 0) {
              // console.log("khong co", children.length)
              return (
                <NavigationList.Item
                  className='fix-ui-sub-item'
                  key={path ? `${path}|${basename}` : key}
                >
                  {title}
                </NavigationList.Item>
              )
            }
            return (
              <NavigationList.Sub title={title} key={key}>
                {/* {(children.length===0)? console.log("khong co", children.length):console.log("co", children.length)} */}
                {children?.map(
                  ({ key, title, path, basename, children }: any) => {
                    // console.log("title -------------", title,"key---------------",key)
                    if (children) {
                      return (
                        <NavigationList.Sub title={title} key={key}>
                          {children?.map(({ title, path, basename }: any) => (
                            <NavigationList.Item
                              key={path ? `${path}|${basename}` : key}
                            >
                              {title}
                            </NavigationList.Item>
                          ))}
                        </NavigationList.Sub>
                      )
                    }
                    return (
                      <NavigationList.Item
                        key={path ? `${path}|${basename}` : key}
                      >
                        {title}
                      </NavigationList.Item>
                    )
                  }
                )}
              </NavigationList.Sub>
            )
          }
          return (
            <NavigationList.Item key={path ? `${path}|${basename}` : key}>
              {title}
            </NavigationList.Item>
          )
        }
      )}
    </NavigationList>
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rightItem = [
    authState?.currentProfiles?.length < 2 ? (
      <div>{authState?.currentProfile?.name || 'Không xác định'}</div>
    ) : (
      <Select
        key='select-profile'
        style={{ width: 200 }}
        placeholder='Chọn hồ sơ'
        showSearch
        filterOption={filterOptsDefault}
        value={window.localStorage.getItem(
          LocalStorageItemKeys.CURRENT_PROFILE
        )}
        onChange={(value) => {
          window.localStorage.setItem(
            LocalStorageItemKeys.CURRENT_PROFILE,
            value
          )
          queryMyInfo()
        }}
      >
        {authState?.currentProfiles?.map((item: any) => (
          <Option
            key={item?.profile?._id}
            value={item?.profile?._id}
            label={item?.profile?.name}
          >
            <div>{item?.profile?.name}</div>
          </Option>
        ))}
      </Select>
    ),
    authState.currentProfile?.nodes?.length > 1 && (
      <Select
        key='select-node'
        style={{ width: 200, marginLeft: 5 }}
        placeholder='Chọn Kho/Phòng'
        showSearch
        filterOption={filterOptsDefault}
        value={appConfigState.currentNode._id}
        onChange={(value) => {
          window.localStorage.setItem(LocalStorageItemKeys.CURRENT_NODE, value)
          queryMyInfo()
        }}
      >
        {/* {appConfigState.nodes.filter((node: any) => nodeTypes.includes(node.category.code) && permissionByNodes && permissionByNodes[node._id]?.idPermissions?.length).map((node, idx) => (
          <Option key={idx} value={node._id}>{node.name}</Option>
        ))} */}
        {authState.currentProfile?.nodes?.map((node: any, idx: number) => (
          <Option key={idx} value={node._id}>
            {node.name}
          </Option>
        ))}
      </Select>
    )
  ]
  const handleChangeLng = (lng: any) => {
    i18n.changeLanguage(lng)
    window.localStorage.setItem(LocalStorageItemKeys.I18N_LANGUAGE, lng)
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rightItemLocal = [
    <Select
      key='select-language'
      style={{ width: 200, marginLeft: 5 }}
      placeholder={t('language.textSelectLanguage')}
      filterOption={filterOptsDefault}
      value={
        window.localStorage.getItem(LocalStorageItemKeys.I18N_LANGUAGE) || 'en'
      }
      onChange={(lng) => {
        handleChangeLng(lng)
      }}
    >
      {Object.keys(lngs).map((lng) => (
        <Option key={lng} value={lng}>
          {lngs[lng].nativeName}
        </Option>
      ))}
    </Select>
  ]
  return (
    <>
      <ShellBar
        logo={
          <div>
            <img
              alt='logo'
              width={80}
              height={24}
              src={logo ? getUrlImage(logo) : Logo}
            />
          </div>
        }
        onLogoClick={() => push('/dashboard')}
        renderLeftItem={() => leftItem}
        userName={authState.currentUser.fullName || 'Administrator'}
        // rightItems={rightItemLocal}
        userMenu={userMenu}
      />
    </>
  )
}

export default Header
