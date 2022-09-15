import React, { useContext, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import { LocalStorageItemKeys } from 'src/constant'
import { AppConfigContext, AuthContext } from 'src/context'
import { CONTEXT_AUTH, MY_INFO } from 'src/graphql-definition/auth-service'
import useAuthQuery from 'src/hooks/apollo/useAuthQuery'

import Header from './Header'

const AppMainLayout: React.FC = ({ children }: { children: any }) => {
  // const history = useHistory()
  const { dispatchAppConfigAction } = useContext(AppConfigContext)
  const { authState, dispatchAuthAction } = useContext(AuthContext)
  const { data, error } = useAuthQuery(MY_INFO, {
    context: CONTEXT_AUTH,
    fetchPolicy: 'no-cache'
  })

  // on Data
  useEffect(() => {
    if (data) {
      const profiles = data?.myInfo?.profiles || []
      const permissions = data?.myInfo?.permissions || []
      let profile: any = {}
      if (data?.myInfo?.currentProfile) {
        data.myInfo.currentProfile.permissionByNodes =
          data.myInfo.currentProfile.permissionByNodes?.reduce(
            (accumulator: any, currentValue: any) => {
              accumulator[currentValue.idNode] = currentValue
              return accumulator
            },
            {}
          )
        profile = data.myInfo.currentProfile
      }
      if (profile._id) {
        window.localStorage.setItem(
          LocalStorageItemKeys.CURRENT_PROFILE,
          profile._id
        )
      }

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
  }, [data, dispatchAuthAction])

  // on Error
  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('error', error)
    }
  }, [error])
  useEffect(() => {
    if (authState.currentProfile) {
      const idCurrentNode = window.localStorage.getItem(
        LocalStorageItemKeys.CURRENT_NODE
      )
      if (idCurrentNode) {
        const [currentNode] = authState.currentProfile?.nodes
          ? authState.currentProfile?.nodes?.filter(
              (node: { _id: string }) => node._id === idCurrentNode
            )
          : []
        if (currentNode) {
          dispatchAppConfigAction({
            type: 'CHANGE_CURRENT_NODE',
            payload: {
              currentNode
            }
          })
        } else {
          if (authState.currentProfile?.nodes?.[0]?._id) {
            window.localStorage.setItem(
              LocalStorageItemKeys.CURRENT_NODE,
              authState.currentProfile?.nodes?.[0]?._id
            )
          }
          dispatchAppConfigAction({
            type: 'CHANGE_CURRENT_NODE',
            payload: {
              currentNode: authState.currentProfile?.nodes?.[0] || {}
            }
          })
        }
      } else {
        if (authState.currentProfile?.nodes?.[0]?._id) {
          window.localStorage.setItem(
            LocalStorageItemKeys.CURRENT_NODE,
            authState.currentProfile?.nodes?.[0]?._id
          )
        }
        dispatchAppConfigAction({
          type: 'CHANGE_CURRENT_NODE',
          payload: {
            currentNode: authState.currentProfile?.nodes?.[0] || {}
          }
        })
      }
    }
  }, [authState.currentProfile, dispatchAppConfigAction])

  return (
    <div style={{ height: '100%' }}>
      <Header />
      <div style={{ height: 'calc(100vh - 44px)', overflow: 'hidden' }}>
        {React.cloneElement(children)}
      </div>
    </div>
  )
}

export default AppMainLayout
