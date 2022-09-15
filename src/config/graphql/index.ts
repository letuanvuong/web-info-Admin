import { ApolloClient, ApolloLink, DefaultOptions,InMemoryCache, split } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLError } from 'graphql'
import {
  deleteAllCookies,
  GraphQLErrorCodes,
  LocalStorageItemKeys
} from 'src/constant'

import ENDPOINTS from './graphql-endpoint.json'

type IGraphQLError = {
  code: string
  message: string
} & GraphQLError

/** ======== CONFIG APOLLO CLIENT WITH MULTIPLE GRAPHQL ENDPOINTS ============ */
/**
 * Define enum of services name
 */
export enum GraphQLServicesList {
  DEFAULT = 'default',
  AUTH = 'auth'
}

/* Default Apollo link (Main service) */
const defaultLink = new BatchHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? `${window.location.origin}/graphqlwebinfo`
      : ENDPOINTS.DEFAULT,
  batchMax: 10,
  credentials: 'include'
})

/* Apollo link of Auth service (microservice) */
const authServiceLink = new BatchHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? `${window.location.origin}/graphqlauth`
      : ENDPOINTS.AUTH,
  batchMax: 10
  // credentials: 'include'
})

/** List all Apollo Link */
const httpLinks: Record<GraphQLServicesList, BatchHttpLink> = {
  default: defaultLink,
  auth: authServiceLink
}

/**
 * create Apollo Link base on property `service` passed into Context of Operation
 */
const httpLink = new ApolloLink((operation) => {
  const serviceName: GraphQLServicesList =
    operation.getContext()?.service || GraphQLServicesList.DEFAULT
  return httpLinks[serviceName].request(operation)
})

let wsLink
if (process.env.NODE_ENV === 'production') {
  wsLink = new WebSocketLink({
    uri: `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${
      window.location.host
    }/graphqlwebinfo`,
    options: {
      reconnect: true,
      connectionParams: () => ({
        [LocalStorageItemKeys.HEADER_TOKEN_KEY]:
          localStorage.getItem(LocalStorageItemKeys.HEADER_TOKEN_KEY) || '',
        [LocalStorageItemKeys.CURRENT_NODE]:
          localStorage.getItem(LocalStorageItemKeys.CURRENT_NODE) || '',
        [LocalStorageItemKeys.CURRENT_PROFILE]:
          localStorage.getItem(LocalStorageItemKeys.CURRENT_PROFILE) || '',
        credentials: 'include'
      })
    }
  })
} else {
  wsLink =
    process.env.GRAPHQL_WEBSOCKET_URI !== 'false' &&
    new WebSocketLink({
      uri: process.env.GRAPHQL_WEBSOCKET_URI,
      options: {
        reconnect: true,
        connectionParams: () => ({
          [LocalStorageItemKeys.HEADER_TOKEN_KEY]:
            localStorage.getItem(LocalStorageItemKeys.HEADER_TOKEN_KEY) || '',
          [LocalStorageItemKeys.CURRENT_NODE]:
            localStorage.getItem(LocalStorageItemKeys.CURRENT_NODE) || '',
          [LocalStorageItemKeys.CURRENT_PROFILE]:
            localStorage.getItem(LocalStorageItemKeys.CURRENT_PROFILE) || '',
          credentials: 'include'
        })
      }
    })
}

const splitLink = wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      httpLink
    )
  : httpLink

const errorMiddleware = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error: IGraphQLError) => {
      if (error.code === GraphQLErrorCodes.UNAUTHENTICATED) {
        window.localStorage.clear()
        deleteAllCookies()
        window.location.reload()
      }
    })
    if (response) {
      response.errors = graphQLErrors
    }
  }
  if (networkError) {
    // eslint-disable-next-line no-console
    console.error(`[Network Error]: ${networkError}`)
  }
})

const link = ApolloLink.from([errorMiddleware, splitLink])

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    currentpath: window.location.pathname || '',
    [LocalStorageItemKeys.HEADER_TOKEN_KEY]:
      localStorage.getItem(LocalStorageItemKeys.HEADER_TOKEN_KEY) || '',
    [LocalStorageItemKeys.CURRENT_NODE]:
      localStorage.getItem(LocalStorageItemKeys.CURRENT_NODE) || '',
    [LocalStorageItemKeys.CURRENT_PROFILE]:
      localStorage.getItem(LocalStorageItemKeys.CURRENT_PROFILE) || ''
  }
}))

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache'
  },
  query: {
    fetchPolicy: 'no-cache'
  },
  mutate: {}
}

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache({
    addTypename: false
  }),
  defaultOptions,
  credentials: 'include'
})

export default client
