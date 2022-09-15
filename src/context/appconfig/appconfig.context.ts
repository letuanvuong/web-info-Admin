import { createContext, Dispatch } from 'react'

import { AppConfigAction,IAppConfigState } from './appconfig.reducer'

export interface IAppConfigContext {
  appConfigState: IAppConfigState
  dispatchAppConfigAction: Dispatch<AppConfigAction>
  setRefApp: (key: string, values: any) => void
  getRefApp: (key: string) => any
}

export const AppConfigContext: React.Context<IAppConfigContext> = createContext(
  null
)
