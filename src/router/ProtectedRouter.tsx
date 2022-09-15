import { Suspense } from 'react'
import { Redirect, Switch } from 'react-router'
import FallbackComponent from 'src/components/fallbackComponent'
import { protectedRoutes } from 'src/config/router/routes'
import AppMainLayout from 'src/layout/main'

import { renderRoutesList } from './utils'

function ProtectedRouter() {
  return (
    <AppMainLayout>
      <Suspense fallback={<FallbackComponent />}>
        <Switch>
          {renderRoutesList(protectedRoutes)}
          <Redirect to={protectedRoutes.dashboard.path} />
        </Switch>
      </Suspense>
    </AppMainLayout>
  )
}

export default ProtectedRouter
