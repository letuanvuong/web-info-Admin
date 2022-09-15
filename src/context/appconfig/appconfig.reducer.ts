import detectNavigatorLanguage from '@digihcs/util/lib/locale/detectNavigatorLanguage'

export type Language = 'vi' | 'en' | 'zh'

export interface IAppConfigState {
  languagePreference: Language
  nodes: any[]
  currentNode: any
  setting: any
  appInfo: any
}

export const initialAppConfigState: IAppConfigState = {
  languagePreference: detectNavigatorLanguage().split('-')[0] as Language,
  nodes: [],
  currentNode: {},
  setting: null,
  appInfo: {}
}

export type AppConfigAction =
  | {
      type: 'CHANGE_LANGUAGE_PREFERENCE'
      payload: {
        language: Language
      }
    }
  | {
      type: 'CHANGE_NODES'
      payload: {
        nodes: any[]
      }
    }
  | {
      type: 'CHANGE_CURRENT_NODE'
      payload: {
        currentNode: any
      }
    }
  | {
      type: 'CHANGE_SETTING'
      payload: {
        setting: any
      }
    }
  | {
      type: 'CHANGE_APP_INFO'
      payload: {
        appInfo: any
      }
    }

export const appConfigReducer = (
  prevState: IAppConfigState,
  action: AppConfigAction
): IAppConfigState => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE_PREFERENCE':
      return { ...prevState, languagePreference: action.payload.language }
    case 'CHANGE_NODES':
      return { ...prevState, nodes: action.payload.nodes }
    case 'CHANGE_CURRENT_NODE':
      return { ...prevState, currentNode: action.payload.currentNode }
    case 'CHANGE_SETTING':
      return { ...prevState, setting: action.payload.setting }
    case 'CHANGE_APP_INFO':
      return { ...prevState, appInfo: action.payload.appInfo }
    default:
      return prevState
  }
}
