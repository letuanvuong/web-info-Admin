import { Suspense, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import FallbackComponent from 'src/components/fallbackComponent'
import {
  protectedRoutes,
  publicRoutes,
  restrictedRoutes
} from 'src/config/router/routes'
import { LocalStorageItemKeys } from 'src/constant'
import { AuthContext } from 'src/context'
import { useGetSettingQuery } from 'src/graphql-definition/webinfo-service.generated'

import ProtectedRouter from './ProtectedRouter'
import RestrictedRouter from './RestrictedRouter'
import { renderRoutesList } from './utils'

function AppRouter() {
  const {
    authState: { isAuthenticated }
  } = useContext(AuthContext)
  const { i18n } = useTranslation()

  const { data: dataSetting } = useGetSettingQuery()
  const defaultLang = dataSetting?.getSetting?.ecommerce?.defaultLang
  useEffect(() => {
    const lang = window.localStorage.getItem(LocalStorageItemKeys.I18N_LANGUAGE)
    if (defaultLang) {
      if (lang === null) {
        i18n.changeLanguage(defaultLang)
        window.localStorage.setItem(
          LocalStorageItemKeys.I18N_LANGUAGE,
          defaultLang
        )
      }
    }
  })
  return (
    <BrowserRouter basename={process.env.APP_BASENAME_PATH}>
      <Suspense fallback={<FallbackComponent />}>
        <Switch>
          {/**
           * public route
           */}
          {renderRoutesList(publicRoutes)}
          {/**
           * control route /
           */}
          <Route
            path='/'
            render={() => {
              if (isAuthenticated) {
                return <ProtectedRouter />
              }
              return <RestrictedRouter />
            }}
          />
          {/**
           * no match route
           */}
          <Route
            path='*'
            render={({ location }) => (
              <Redirect
                to={{
                  pathname: isAuthenticated
                    ? protectedRoutes.dashboard.path
                    : restrictedRoutes.login.path,
                  state: { from: location }
                }}
              />
            )}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
