/* eslint-disable dot-notation */
import { FC, useEffect, useReducer } from 'react'
import { GraphQLServicesList } from 'src/config/graphql'
import { getCookie, LocalStorageItemKeys } from 'src/constant'
import { AuthContext, authReducer, initialAuthState } from 'src/context'
import { MY_INFO } from 'src/graphql-definition/auth-service'
import useAuthLazyQuery from 'src/hooks/apollo/useAuthLazyQuery'

const CONTEXT_AUTH = { service: GraphQLServicesList.AUTH }
const AuthContextProvider: FC = ({ children }) => {
  const [queryMyInfo, { data, error }] = useAuthLazyQuery(MY_INFO, {
    context: CONTEXT_AUTH,
    fetchPolicy: 'no-cache'
  })

  const [authState, dispatchAuthAction] = useReducer(authReducer, {
    ...initialAuthState,
    isAuthenticated:
      !!window.localStorage.getItem(LocalStorageItemKeys.HEADER_TOKEN_KEY) &&
      !!getCookie(LocalStorageItemKeys.ADMIN_TOKEN_KEY),
    queryMyInfo
  })
  useEffect(() => {
    // did mount
    if (authState.isAuthenticated) {
      queryMyInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isAuthenticated])

  // const { dispatchAppConfigAction } = useContext(AppConfigContext)

  // on Data
  useEffect(() => {
    if (data) {
      const profiles = data?.myInfo?.['profiles'] || []
      const permissions = data?.myInfo?.['permissions'] || []
      let profile: any = {}
      if (data?.myInfo?.['currentProfile']) {
        profile = data.myInfo['currentProfile']
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
  }, [data])

  // on Error
  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('error', error)
    }
  }, [error])

  return (
    <AuthContext.Provider value={{ authState, dispatchAuthAction }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
