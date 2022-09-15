import { Route } from 'react-router'
import LazyComponent from 'src/components/lazyComponent'
import { IRoute } from 'src/config/router/routes'

export const renderRoutesList = (routes: Readonly<Record<string, IRoute>>) => Object.entries(routes).map(([key, route]) => {
    const { page, ...rest } = route
    return (
      <Route
        key={key}
        {...rest}
        render={() => <LazyComponent component={page} />}
      />
    )
  })
