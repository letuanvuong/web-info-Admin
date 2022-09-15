import {
  DocumentNode,
  LazyQueryHookOptions,
  OperationVariables,
  TypedDocumentNode
} from '@apollo/client'
import { GraphQLServicesList } from 'src/config/graphql'

import useServiceLazyQuery from './useServiceLazyQuery'

/**
 * EXAMPLE - query hook for a specific service
 * @param query - A GraphQL query document parsed into an AST by function gql from graphql-tag
 * @param options - supported options for the `useLazyQuery` hook
 * @returns
 */
function useAuthLazyQuery<TData = any>(
  query: DocumentNode | TypedDocumentNode<TData, OperationVariables>,
  options?: LazyQueryHookOptions<TData, OperationVariables>
) {
  return useServiceLazyQuery<TData>(query, {
    options,
    service: GraphQLServicesList.AUTH
  })
}

export default useAuthLazyQuery
