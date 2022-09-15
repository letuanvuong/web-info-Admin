import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  TypedDocumentNode
} from '@apollo/client'
import { GraphQLServicesList } from 'src/config/graphql'

import useServiceQuery from './useServiceQuery'

/**
 * EXAMPLE - query hook for a specific service
 * @param query - A GraphQL query document parsed into an AST by function gql from graphql-tag
 * @param options - supported options for the `useQuery` hook
 * @returns
 */
function useAuthQuery<TData = any>(
  query: DocumentNode | TypedDocumentNode<TData, OperationVariables>,
  options?: QueryHookOptions<TData, OperationVariables>
) {
  return useServiceQuery<TData>(query, {
    options,
    service: GraphQLServicesList.AUTH
  })
}

export default useAuthQuery
