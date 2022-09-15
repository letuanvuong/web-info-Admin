import {
  DocumentNode,
  MutationHookOptions,
  OperationVariables,
  TypedDocumentNode
} from '@apollo/client'
import { GraphQLServicesList } from 'src/config/graphql'

import useServiceMutation from './useServiceMutation'

/**
 * EXAMPLE - mutation hook for a specific service
 * @param query - A GraphQL query document parsed into an AST by function gql from graphql-tag
 * @param options - supported options for the `useMutation` hook
 * @returns
 */
function useAuthMutation<TData = any>(
  query: DocumentNode | TypedDocumentNode<TData, OperationVariables>,
  options?: MutationHookOptions<TData, OperationVariables>
) {
  return useServiceMutation<TData>(query, {
    options,
    service: GraphQLServicesList.AUTH
  })
}

export default useAuthMutation
