import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  TypedDocumentNode,
  useQuery
} from '@apollo/client'
import { GraphQLServicesList } from 'src/config/graphql'

interface ServiceMutationHookOptions<TData, TVariables> {
  options?: QueryHookOptions<TData, TVariables>
  service?: GraphQLServicesList
}

/**
 * Custom hooks for query graphql with multiple endpoints
 * @param {DocumentNode | TypedDocumentNode} query - A GraphQL query document parsed into an AST by function gql from graphql-tag
 * @param {ServiceMutationHookOptions} [customOptions] - Include options to customize `useQuery` hook
 * @param {QueryHookOptions} [customOptions.options] - supported options for the `useQuery` hook
 * @param {GraphQLServicesList} [service="default"] - service name of graphql endpoint
 */
function useServiceQuery<TData = any>(
  query: DocumentNode | TypedDocumentNode<TData, OperationVariables>,
  customOptions?: ServiceMutationHookOptions<TData, OperationVariables>
) {
  const service = customOptions?.service || GraphQLServicesList.DEFAULT
  const opts = customOptions?.options || {}
  opts.context = { ...opts.context, service }
  return useQuery<TData>(query, opts)
}

export default useServiceQuery
