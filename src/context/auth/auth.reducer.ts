export interface IAuthState {
  isAuthenticated: boolean
  currentUser: any
  currentProfile: any
  currentProfiles: any
  currentPermissions: any
  queryMyInfo: () => void
}

export const initialAuthState: IAuthState = {
  isAuthenticated: false,
  currentUser: {},
  currentProfile: {},
  currentProfiles: [],
  currentPermissions: [],
  queryMyInfo: () => {}
}

export type AuthAction =
  | {
      type: 'SWITCH_AUTH_STATE'
      payload: {
        state: boolean
      }
    }
  | {
      type: 'CHANGE_CURRENT_USER'
      payload: {
        currentUser: any
      }
    }
  | {
      type: 'CHANGE_CURRENT_PROFILE'
      payload: {
        currentProfile: any
      }
    }
  | {
      type: 'CHANGE_CURRENT_PROFILES'
      payload: {
        currentProfiles: any
      }
    }
  | {
      type: 'RELOAD_INITIAL_STATE'
      payload: {
        currentProfiles: any
      }
    }
  | {
      type: 'CHANGE_CURRENT_PERMISSIONS'
      payload: {
        currentPermissions: any
      }
    }

export const authReducer = (
  prevState: IAuthState,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case 'SWITCH_AUTH_STATE':
      return { ...prevState, isAuthenticated: action.payload.state }
    case 'CHANGE_CURRENT_USER':
      return { ...prevState, currentUser: action.payload.currentUser }
    case 'CHANGE_CURRENT_PROFILE':
      return { ...prevState, currentProfile: action.payload.currentProfile }
    case 'CHANGE_CURRENT_PROFILES':
      return { ...prevState, currentProfiles: action.payload.currentProfiles }
    case 'RELOAD_INITIAL_STATE':
      return { ...initialAuthState }
    default:
      return prevState
  }
}
