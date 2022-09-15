import {
  DocumentNode,
  LazyQueryHookOptions,
  OperationVariables,
  TypedDocumentNode,
  useLazyQuery
} from '@apollo/client'
import { GraphQLServicesList } from 'src/config/graphql'

interface ServiceLazyQueryHookOptions<TData, TVariables> {
  options?: LazyQueryHookOptions<TData, TVariables>
  service?: GraphQLServicesList
}

/**
 * Custom hooks for query graphql with multiple endpoints
 * @param {DocumentNode | TypedDocumentNode} query - A GraphQL query document parsed into an AST by function gql from graphql-tag
 * @param {ServiceLazyQueryHookOptions} [customOptions] - Include options to customize `useQuery` hook
 * @param {QueryHookOptions} [customOptions.options] - supported options for the `useQuery` hook
 * @param {GraphQLServicesList} [service="default"] - service name of graphql endpoint
 */
function useServiceLazyQuery<TData = any>(
  query: DocumentNode | TypedDocumentNode<TData, OperationVariables>,
  customOptions?: ServiceLazyQueryHookOptions<TData, OperationVariables>
) {
  const service = customOptions?.service || GraphQLServicesList.DEFAULT
  const opts = customOptions?.options || {}
  opts.context = { ...opts.context, service }
  return useLazyQuery<TData>(query, opts)
}

export default useServiceLazyQuery
