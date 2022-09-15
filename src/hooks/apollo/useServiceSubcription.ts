import {
  DocumentNode,
  OperationVariables,
  SubscriptionHookOptions,
  TypedDocumentNode,
  useSubscription
} from '@apollo/client'
import { GraphQLServicesList } from 'src/config/graphql'

interface ServiceSubscriptionHookOptions<TData, TVariables> {
  options?: SubscriptionHookOptions<TData, TVariables>
  service?: GraphQLServicesList
}

/**
 * Custom hooks for subscription graphql with multiple endpoints
 * @param {DocumentNode | TypedDocumentNode} query - A GraphQL subscription document parsed into an AST by function gql from graphql-tag
 * @param {ServiceSubscriptionHookOptions} [customOptions] - Include options to customize `useSubscription` hook
 * @param {SubscriptionHookOptions} [customOptions.options] - supported options for the `useSubscription` hook
 * @param {GraphQLServicesList} [service="default"] - service name of graphql endpoint
 */
function useServiceSubcription<TData = any>(
  subscription: DocumentNode | TypedDocumentNode,
  customOptions?: ServiceSubscriptionHookOptions<TData, OperationVariables>
) {
  const service = customOptions?.service || GraphQLServicesList.DEFAULT
  const opts = customOptions?.options || {}
  opts.context = { ...opts.context, service }
  return useSubscription<TData>(subscription, opts)
}

export default useServiceSubcription
