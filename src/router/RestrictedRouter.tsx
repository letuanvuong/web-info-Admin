import { Redirect, Switch } from 'react-router'
import { restrictedRoutes } from 'src/config/router/routes'

import { renderRoutesList } from './utils'

function RestrictedRouter() {
  return (
    <Switch>
      {renderRoutesList(restrictedRoutes)}
      <Redirect to={restrictedRoutes.login.path} />
    </Switch>
  )
}

export default RestrictedRouter
