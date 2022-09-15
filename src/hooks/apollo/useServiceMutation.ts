import {
  DocumentNode,
  MutationHookOptions,
  OperationVariables,
  TypedDocumentNode,
  useMutation
} from '@apollo/client'
import { GraphQLServicesList } from 'src/config/graphql'

interface ServiceMutationHookOptions<TData, TVariables> {
  options?: MutationHookOptions<TData, TVariables>
  service?: GraphQLServicesList
}

/**
 * Custom hooks for mutate graphql with multiple endpoints
 * @param {DocumentNode | TypedDocumentNode} query - A GraphQL mutation document parsed into an AST by function gql from graphql-tag
 * @param {ServiceMutationHookOptions} [customOptions] - Include options to customize `useMutation` hook
 * @param {MutationHookOptions} [customOptions.options] - supported options for the `useMutation` hook
 * @param {GraphQLServicesList} [service="default"] - service name of graphql endpoint
 */
function useServiceMutation<TData = any>(
  query: DocumentNode | TypedDocumentNode<TData, OperationVariables>,
  customOptions?: ServiceMutationHookOptions<TData, OperationVariables>
) {
  const service = customOptions?.service || GraphQLServicesList.DEFAULT
  const opts: MutationHookOptions = customOptions?.options || {}
  opts.context = { ...opts.context, service }
  return useMutation<TData>(query, opts)
}

export default useServiceMutation
