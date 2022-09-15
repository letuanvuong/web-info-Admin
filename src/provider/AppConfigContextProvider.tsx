import { FC, useEffect, useReducer, useRef } from 'react'
import AppInfo from 'src/appInfo.json'
import FallbackComponent from 'src/components/fallbackComponent'
import { getCookie, LocalStorageItemKeys } from 'src/constant'
import {
  AppConfigContext,
  appConfigReducer,
  initialAppConfigState
} from 'src/context'
import { GET_ALL_NODE } from 'src/graphql-definition'
import { AppInfoDocument } from 'src/graphql-definition/webinfo-service.generated'
import useAuthQuery from 'src/hooks/apollo/useAuthQuery'
import useServiceQuery from 'src/hooks/apollo/useServiceQuery'

const AppConfigContextProvider: FC = ({ children }) => {
  const [appConfigState, dispatchAppConfigAction] = useReducer(
    appConfigReducer,
    initialAppConfigState
  )

  const { data: dataNode, error: errorNode } = useAuthQuery(GET_ALL_NODE, {
    skip:
      !window.localStorage.getItem(LocalStorageItemKeys.HEADER_TOKEN_KEY) ||
      !getCookie(LocalStorageItemKeys.ADMIN_TOKEN_KEY),
    fetchPolicy: 'no-cache'
  })

  const {
    data: dataSetting,
    error: errorSetting,
    loading: loadingSetting
  } = useServiceQuery(AppInfoDocument, {
    options: {
      // skip: !window.localStorage.getItem(LocalStorageItemKeys.ACCESS_TOKEN),
      fetchPolicy: 'no-cache'
    }
  })

  const refApp = useRef<any>({})

  const setRefApp = (key: any, values: any) => {
    refApp.current[key] = values
  }

  const getRefApp = (key: any) => refApp.current[key]

  useEffect(() => {
    if (dataNode) {
      dispatchAppConfigAction({
        type: 'CHANGE_NODES',
        payload: {
          nodes: dataNode.getNodes || []
        }
      })
    }
  }, [dataNode])

  useEffect(() => {
    if (errorNode) {
      // eslint-disable-next-line no-console
      console.log(
        '🚀 ~ file: AuthContextProvider.tsx ~ line 30 ~ error',
        errorNode
      )
    }
  }, [errorNode])

  useEffect(() => {
    if (dataSetting) {
      dispatchAppConfigAction({
        type: 'CHANGE_APP_INFO',
        payload: {
          appInfo: {
            versionFE: AppInfo.version || '',
            versionBE: dataSetting?.appInfo?.version || ''
          }
        }
      })
      dispatchAppConfigAction({
        type: 'CHANGE_SETTING',
        payload: {
          setting: dataSetting.getSetting
        }
      })
    }
  }, [dataSetting])

  useEffect(() => {
    if (errorSetting) {
      // eslint-disable-next-line no-console
      console.log(
        '🚀 ~ file: AuthContextProvider.tsx ~ line 30 ~ error',
        errorSetting
      )
    }
  }, [errorSetting])

  return (
    <AppConfigContext.Provider
      value={{
        getRefApp,
        setRefApp,
        appConfigState,
        dispatchAppConfigAction
      }}
    >
      {loadingSetting ? <FallbackComponent /> : children}
    </AppConfigContext.Provider>
  )
}

export default AppConfigContextProvider
