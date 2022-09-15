/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type AuthenticationInfo = {
  __typename?: 'AuthenticationInfo';
  token: Scalars['String'];
  userId: Scalars['String'];
};

export type Conference = {
  __typename?: 'Conference';
  _id?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  startAt?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  endedAt?: Maybe<Scalars['Float']>;
  mutePolicy?: Maybe<Scalars['String']>;
  pinnedUser?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<User>;
  videoHostDefault?: Maybe<Scalars['Boolean']>;
  videoParticipantDefault?: Maybe<Scalars['Boolean']>;
  isLocked?: Maybe<Scalars['Boolean']>;
  isClassroomMode?: Maybe<Scalars['Boolean']>;
  isWhiteBoardMode?: Maybe<Scalars['Boolean']>;
  isDicomMode?: Maybe<Scalars['Boolean']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  recurrence?: Maybe<Array<Maybe<Scalars['Float']>>>;
  userCount?: Maybe<Scalars['Int']>;
  qualityVideo?: Maybe<Scalars['Int']>;
  isRecording?: Maybe<Scalars['Boolean']>;
  timezone?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
  isAllowMultipleSession?: Maybe<Scalars['Boolean']>;
};

export enum ConferenceFindFactor {
  Id = 'ID',
  Code = 'CODE'
}

export type ConferenceQueryWhereInput = {
  code?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type CreateConferenceInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  startAt?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  endedAt?: Maybe<Scalars['Float']>;
  recurrence?: Maybe<Array<Maybe<Scalars['Float']>>>;
  timezone?: Maybe<Scalars['String']>;
  isMultipleSessionsAllowed?: Maybe<Scalars['Boolean']>;
};

export enum EnumModule {
  Clinic = 'CLINIC',
  Sm3 = 'SM3'
}

export type IdNodeRole = {
  idNode: Scalars['ID'];
  idRole: Scalars['ID'];
};

export type InputChangePassword = {
  currentPassword?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  newPassword?: Maybe<Scalars['String']>;
};


export type LoginInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createConference?: Maybe<Conference>;
  createNavigation?: Maybe<Navigation>;
  updateNavigation?: Maybe<Navigation>;
  deleteNavigation?: Maybe<Scalars['Boolean']>;
  createNode?: Maybe<Node>;
  updateNode?: Maybe<Node>;
  deleteNode?: Maybe<Scalars['Boolean']>;
  createNodeType?: Maybe<NodeType>;
  updateNodeType?: Maybe<NodeType>;
  deleteNodeType?: Maybe<Scalars['Boolean']>;
  createProfile?: Maybe<Profile>;
  updateProfile?: Maybe<Profile>;
  deleteProfiles?: Maybe<Scalars['Boolean']>;
  createRole?: Maybe<Role>;
  updateRole?: Maybe<Role>;
  deleteRoles?: Maybe<Scalars['Boolean']>;
  register?: Maybe<User>;
  /** admin create user */
  createUser?: Maybe<User>;
  /** user self update info */
  updateUser?: Maybe<User>;
  /** admin update user info */
  updateUserOverride?: Maybe<User>;
  /** admin delete user */
  deleteUsers?: Maybe<Scalars['Boolean']>;
  /** temp change password & lock users */
  updateUsersOverride?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateConferenceArgs = {
  newConference: CreateConferenceInput;
};


export type MutationCreateNavigationArgs = {
  input: NavigationInput;
};


export type MutationUpdateNavigationArgs = {
  _id: Scalars['ID'];
  input: NavigationInput;
};


export type MutationDeleteNavigationArgs = {
  _ids: Array<Scalars['ID']>;
};


export type MutationCreateNodeArgs = {
  newNodeInput: NodeInput;
};


export type MutationUpdateNodeArgs = {
  _id: Scalars['ID'];
  updateNodeInput: NodeInput;
};


export type MutationDeleteNodeArgs = {
  _id: Scalars['ID'];
};


export type MutationCreateNodeTypeArgs = {
  newNodeTypeInput: NodeTypeInput;
};


export type MutationUpdateNodeTypeArgs = {
  _id: Scalars['ID'];
  updateNodeTypeInput: NodeTypeInput;
};


export type MutationDeleteNodeTypeArgs = {
  _ids: Array<Scalars['ID']>;
};


export type MutationCreateProfileArgs = {
  input: NewProfileInput;
};


export type MutationUpdateProfileArgs = {
  id: Scalars['ID'];
  newInput: NewProfileInput;
};


export type MutationDeleteProfilesArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationCreateRoleArgs = {
  newRoleInput: NewRoleInput;
};


export type MutationUpdateRoleArgs = {
  idRole: Scalars['ID'];
  updateRoleInput: NewRoleInput;
};


export type MutationDeleteRolesArgs = {
  idRoles: Array<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: NewUserInfo;
};


export type MutationCreateUserArgs = {
  input: NewUserInfo;
};


export type MutationUpdateUserArgs = {
  input: NeedUpdateInfo;
  idUser: Scalars['ID'];
};


export type MutationUpdateUserOverrideArgs = {
  input: NeedOverrideInfo;
  idUser: Scalars['ID'];
};


export type MutationDeleteUsersArgs = {
  idUsers: Array<Scalars['ID']>;
};


export type MutationUpdateUsersOverrideArgs = {
  input: NeedOverrideInfo;
  idUsers: Array<Scalars['ID']>;
};

export type Navigation = {
  __typename?: 'Navigation';
  _id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  idMenus: Array<Scalars['ID']>;
  /** only available on query myInfo */
  navigationTree?: Maybe<Array<Maybe<NavigationItem>>>;
};

export type NavigationInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  idMenus?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type NavigationItem = {
  __typename?: 'NavigationItem';
  _id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  key: Scalars['String'];
  /** only in parent */
  children?: Maybe<Array<Maybe<NavigationItem>>>;
  /** only in children */
  path?: Maybe<Scalars['String']>;
  /** only in children */
  basename?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
};

export type NeedOverrideInfo = {
  password?: Maybe<Scalars['String']>;
  isLocked?: Maybe<Scalars['Boolean']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
};

export type NeedUpdateInfo = {
  idEmployee?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
  idProfiles?: Maybe<Array<Maybe<Scalars['String']>>>;
  note?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type NewConferenceInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  startAt?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  mutePolicy?: Maybe<Scalars['String']>;
  videoHostDefault?: Maybe<Scalars['Boolean']>;
  videoParticipantDefault?: Maybe<Scalars['Boolean']>;
  serverId?: Maybe<Scalars['String']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  recurrence?: Maybe<Array<Maybe<Scalars['Float']>>>;
  rqJoinPermission?: Maybe<Scalars['Boolean']>;
  timeZone?: Maybe<Scalars['String']>;
  qualityVideo?: Maybe<Scalars['Int']>;
  isAllowMultipleSession?: Maybe<Scalars['Boolean']>;
};

export type NewProfileInput = {
  name: Scalars['String'];
  idNavigation: Scalars['ID'];
  idNodeRoles: Array<Maybe<IdNodeRole>>;
  code?: Maybe<Scalars['String']>;
  isLocked?: Maybe<Scalars['Boolean']>;
};

export type NewRoleInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  idPermissions?: Maybe<Array<Scalars['String']>>;
  note?: Maybe<Scalars['String']>;
};

/** Input Section */
export type NewUserInfo = {
  idEmployee?: Maybe<Scalars['ID']>;
  username: Scalars['String'];
  password: Scalars['String'];
  idProfiles: Array<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type Node = {
  __typename?: 'Node';
  _id: Scalars['ID'];
  idParent?: Maybe<Scalars['ID']>;
  idAccountingObject: Scalars['ID'];
  idPlace?: Maybe<Scalars['ID']>;
  code: Scalars['String'];
  codeHealthFacility?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  namePrint?: Maybe<Scalars['String']>;
  codeQueue?: Maybe<Scalars['String']>;
  codeSubQueue?: Maybe<Scalars['String']>;
  codeCounter?: Maybe<Scalars['String']>;
  codeNextQueue?: Maybe<Scalars['String']>;
  codeNextSubQueue?: Maybe<Scalars['String']>;
  category?: Maybe<NodeType>;
  phoneNumber?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  detailAddress?: Maybe<Scalars['String']>;
  canSale: Scalars['Boolean'];
  note?: Maybe<Scalars['String']>;
  isStoreForHealthInsurance?: Maybe<Scalars['Boolean']>;
};

export type NodeInput = {
  idParent?: Maybe<Scalars['ID']>;
  idAccountingObject?: Maybe<Scalars['ID']>;
  idPlace?: Maybe<Scalars['ID']>;
  code: Scalars['String'];
  codeHealthFacility?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  namePrint?: Maybe<Scalars['String']>;
  codeQueue?: Maybe<Scalars['String']>;
  codeSubQueue?: Maybe<Scalars['String']>;
  codeCounter?: Maybe<Scalars['String']>;
  codeNextQueue?: Maybe<Scalars['String']>;
  codeNextSubQueue?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['ID']>;
  phoneNumber?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  detailAddress?: Maybe<Scalars['String']>;
  canSale?: Maybe<Scalars['Boolean']>;
  note?: Maybe<Scalars['String']>;
  isStoreForHealthInsurance?: Maybe<Scalars['Boolean']>;
};

export type NodeRole = {
  __typename?: 'NodeRole';
  node?: Maybe<Node>;
  role?: Maybe<Role>;
};

export type NodeTree = {
  __typename?: 'NodeTree';
  _id: Scalars['ID'];
  idParent?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<TypeNodeEnum>;
  subtitle?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  category?: Maybe<NodeType>;
  phoneNumber?: Maybe<Scalars['String']>;
  detailAddress?: Maybe<Scalars['String']>;
  children?: Maybe<Scalars['JSON']>;
  isChildrenNode?: Maybe<Scalars['Boolean']>;
  expanded?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['Float']>;
  note?: Maybe<Scalars['String']>;
  isStoreForHealthInsurance?: Maybe<Scalars['Boolean']>;
};

export type NodeType = {
  __typename?: 'NodeType';
  _id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
};

export type NodeTypeInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
};

export type Permission = {
  __typename?: 'Permission';
  _id: Scalars['ID'];
  name: Scalars['String'];
  module: EnumModule;
  nameUnsigned: Scalars['String'];
};

export type PermissionByNode = {
  __typename?: 'PermissionByNode';
  idNode?: Maybe<Scalars['ID']>;
  idPermissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type Profile = {
  __typename?: 'Profile';
  _id: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
  navigation?: Maybe<Navigation>;
  nodeRoles?: Maybe<Array<Maybe<NodeRole>>>;
  isLocked?: Maybe<Scalars['Boolean']>;
  /** only available on query myInfo, has ancestral permissions included */
  permissionByNodes?: Maybe<Array<Maybe<PermissionByNode>>>;
  nodes?: Maybe<Array<Maybe<Node>>>;
};

export type ProfileInfo = {
  __typename?: 'ProfileInfo';
  _id?: Maybe<Scalars['ID']>;
  /** not need this in normal use */
  idProfile?: Maybe<Scalars['ID']>;
  profile?: Maybe<Profile>;
  grantedAt?: Maybe<Scalars['Float']>;
  grantedBy?: Maybe<UserSlim>;
};

export type Query = {
  __typename?: 'Query';
  login?: Maybe<AuthenticationInfo>;
  conference?: Maybe<Conference>;
  getFullNavigationTree?: Maybe<Array<Maybe<NavigationItem>>>;
  getNavigationById?: Maybe<Navigation>;
  getListNavigation?: Maybe<Array<Maybe<Navigation>>>;
  getNodes?: Maybe<Array<Maybe<Node>>>;
  getNodeById?: Maybe<Node>;
  getNodeTree?: Maybe<Array<Maybe<NodeTree>>>;
  getListNodeType?: Maybe<Array<Maybe<NodeType>>>;
  profiles?: Maybe<Array<Maybe<Profile>>>;
  profile?: Maybe<Profile>;
  permissions?: Maybe<Array<Maybe<Permission>>>;
  roles?: Maybe<Array<Maybe<Role>>>;
  myInfo?: Maybe<User>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryLoginArgs = {
  info: LoginInput;
};


export type QueryConferenceArgs = {
  where?: Maybe<ConferenceQueryWhereInput>;
};


export type QueryGetNavigationByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetNodeByIdArgs = {
  _id: Scalars['ID'];
};


export type QueryProfileArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  where: UserWhereInput;
};


export type QueryUsersArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type Role = {
  __typename?: 'Role';
  _id: Scalars['ID'];
  idPermissions: Array<Scalars['String']>;
  code: Scalars['String'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
};

export enum TypeNodeEnum {
  ExamineRoom = 'EXAMINE_ROOM',
  HospitalizeRoom = 'HOSPITALIZE_ROOM',
  LaboratoryRoom = 'LABORATORY_ROOM',
  TipsRoom = 'TIPS_ROOM',
  ReceiveRoom = 'RECEIVE_ROOM',
  RecoveryRoom = 'RECOVERY_ROOM',
  EndoscopicRoom = 'ENDOSCOPIC_ROOM',
  ImageAnalysationRoom = 'IMAGE_ANALYSATION_ROOM',
  SurgeryRoom = 'SURGERY_ROOM'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  idEmployee?: Maybe<Scalars['ID']>;
  employee?: Maybe<Scalars['JSON']>;
  username: Scalars['String'];
  code?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  profiles: Array<ProfileInfo>;
  note?: Maybe<Scalars['String']>;
  isOnline?: Maybe<Scalars['Boolean']>;
  isLocked?: Maybe<Scalars['Boolean']>;
  currentProfile?: Maybe<Profile>;
  permissions?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UserSlim = {
  __typename?: 'UserSlim';
  _id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserWhereInput = {
  _id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type LoginQueryVariables = Exact<{
  info: LoginInput;
}>;


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login?: Maybe<(
    { __typename?: 'AuthenticationInfo' }
    & Pick<AuthenticationInfo, 'token' | 'userId'>
  )> }
);

export type MyInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type MyInfoQuery = (
  { __typename?: 'Query' }
  & { myInfo?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username' | 'isOnline' | 'isLocked' | 'employee' | 'permissions'>
    & { currentProfile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, '_id' | 'name'>
      & { navigation?: Maybe<(
        { __typename?: 'Navigation' }
        & Pick<Navigation, '_id'>
        & { navigationTree?: Maybe<Array<Maybe<(
          { __typename?: 'NavigationItem' }
          & Pick<NavigationItem, 'key' | 'title' | 'path' | 'basename'>
          & { children?: Maybe<Array<Maybe<(
            { __typename?: 'NavigationItem' }
            & Pick<NavigationItem, 'key' | 'title' | 'path' | 'basename'>
            & { children?: Maybe<Array<Maybe<(
              { __typename?: 'NavigationItem' }
              & Pick<NavigationItem, 'key' | 'title' | 'path' | 'basename'>
            )>>> }
          )>>> }
        )>>> }
      )>, permissionByNodes?: Maybe<Array<Maybe<(
        { __typename?: 'PermissionByNode' }
        & Pick<PermissionByNode, 'idNode' | 'idPermissions'>
      )>>>, nodes?: Maybe<Array<Maybe<(
        { __typename?: 'Node' }
        & Pick<Node, '_id' | 'idParent' | 'idAccountingObject' | 'idPlace' | 'code' | 'codeHealthFacility' | 'name' | 'namePrint' | 'codeQueue' | 'codeSubQueue' | 'codeCounter' | 'codeNextQueue' | 'codeNextSubQueue' | 'phoneNumber' | 'taxCode' | 'detailAddress' | 'canSale' | 'note' | 'isStoreForHealthInsurance'>
        & { category?: Maybe<(
          { __typename?: 'NodeType' }
          & Pick<NodeType, '_id' | 'code' | 'name'>
        )> }
      )>>> }
    )>, profiles: Array<(
      { __typename?: 'ProfileInfo' }
      & { profile?: Maybe<(
        { __typename?: 'Profile' }
        & Pick<Profile, '_id' | 'name'>
        & { navigation?: Maybe<(
          { __typename?: 'Navigation' }
          & Pick<Navigation, '_id'>
          & { navigationTree?: Maybe<Array<Maybe<(
            { __typename?: 'NavigationItem' }
            & Pick<NavigationItem, 'key' | 'title' | 'path' | 'basename'>
            & { children?: Maybe<Array<Maybe<(
              { __typename?: 'NavigationItem' }
              & Pick<NavigationItem, 'key' | 'title' | 'path' | 'basename'>
              & { children?: Maybe<Array<Maybe<(
                { __typename?: 'NavigationItem' }
                & Pick<NavigationItem, 'key' | 'title' | 'path' | 'basename'>
              )>>> }
            )>>> }
          )>>> }
        )> }
      )> }
    )> }
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username'>
  )>>> }
);

export type GetNodesSlimQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNodesSlimQuery = (
  { __typename?: 'Query' }
  & { getNodes?: Maybe<Array<Maybe<(
    { __typename?: 'Node' }
    & Pick<Node, '_id' | 'name'>
    & { category?: Maybe<(
      { __typename?: 'NodeType' }
      & Pick<NodeType, '_id' | 'code'>
    )> }
  )>>> }
);

export type GetNodesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNodesQuery = (
  { __typename?: 'Query' }
  & { getNodes?: Maybe<Array<Maybe<(
    { __typename?: 'Node' }
    & Pick<Node, '_id' | 'idParent' | 'idAccountingObject' | 'idPlace' | 'code' | 'codeHealthFacility' | 'name' | 'namePrint' | 'codeQueue' | 'codeSubQueue' | 'codeCounter' | 'codeNextQueue' | 'codeNextSubQueue' | 'phoneNumber' | 'taxCode' | 'detailAddress' | 'canSale' | 'note' | 'isStoreForHealthInsurance'>
    & { category?: Maybe<(
      { __typename?: 'NodeType' }
      & Pick<NodeType, '_id' | 'code' | 'name'>
    )> }
  )>>> }
);


export const LoginDocument = gql`
    query login($info: LoginInput!) {
  login(info: $info) {
    token
    userId
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      info: // value for 'info'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const MyInfoDocument = gql`
    query myInfo {
  myInfo {
    _id
    username
    isOnline
    isLocked
    employee
    permissions
    currentProfile {
      _id
      name
      navigation {
        _id
        navigationTree {
          key
          title
          path
          basename
          children {
            key
            title
            path
            basename
            children {
              key
              title
              path
              basename
            }
          }
        }
      }
      permissionByNodes {
        idNode
        idPermissions
      }
      nodes {
        _id
        idParent
        idAccountingObject
        idPlace
        code
        codeHealthFacility
        name
        namePrint
        codeQueue
        codeSubQueue
        codeCounter
        codeNextQueue
        codeNextSubQueue
        codeEndCounter
        codeEndSubQueue
        category {
          _id
          code
          name
        }
        phoneNumber
        taxCode
        detailAddress
        canSale
        note
        isStoreForHealthInsurance
      }
    }
    profiles {
      profile {
        _id
        name
        navigation {
          _id
          navigationTree {
            key
            title
            path
            basename
            children {
              key
              title
              path
              basename
              children {
                key
                title
                path
                basename
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useMyInfoQuery__
 *
 * To run a query within a React component, call `useMyInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyInfoQuery(baseOptions?: Apollo.QueryHookOptions<MyInfoQuery, MyInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyInfoQuery, MyInfoQueryVariables>(MyInfoDocument, options);
      }
export function useMyInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyInfoQuery, MyInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyInfoQuery, MyInfoQueryVariables>(MyInfoDocument, options);
        }
export type MyInfoQueryHookResult = ReturnType<typeof useMyInfoQuery>;
export type MyInfoLazyQueryHookResult = ReturnType<typeof useMyInfoLazyQuery>;
export type MyInfoQueryResult = Apollo.QueryResult<MyInfoQuery, MyInfoQueryVariables>;
export const UsersDocument = gql`
    query users {
  users {
    _id
    username
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const GetNodesSlimDocument = gql`
    query getNodesSlim {
  getNodes {
    _id
    name
    category {
      _id
      code
    }
  }
}
    `;

/**
 * __useGetNodesSlimQuery__
 *
 * To run a query within a React component, call `useGetNodesSlimQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNodesSlimQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNodesSlimQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNodesSlimQuery(baseOptions?: Apollo.QueryHookOptions<GetNodesSlimQuery, GetNodesSlimQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNodesSlimQuery, GetNodesSlimQueryVariables>(GetNodesSlimDocument, options);
      }
export function useGetNodesSlimLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNodesSlimQuery, GetNodesSlimQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNodesSlimQuery, GetNodesSlimQueryVariables>(GetNodesSlimDocument, options);
        }
export type GetNodesSlimQueryHookResult = ReturnType<typeof useGetNodesSlimQuery>;
export type GetNodesSlimLazyQueryHookResult = ReturnType<typeof useGetNodesSlimLazyQuery>;
export type GetNodesSlimQueryResult = Apollo.QueryResult<GetNodesSlimQuery, GetNodesSlimQueryVariables>;
export const GetNodesDocument = gql`
    query getNodes {
  getNodes {
    _id
    idParent
    idAccountingObject
    idPlace
    code
    codeHealthFacility
    name
    namePrint
    codeQueue
    codeSubQueue
    codeCounter
    codeNextQueue
    codeNextSubQueue
    codeEndCounter
    codeEndSubQueue
    category {
      _id
      code
      name
    }
    phoneNumber
    taxCode
    detailAddress
    canSale
    note
    isStoreForHealthInsurance
  }
}
    `;

/**
 * __useGetNodesQuery__
 *
 * To run a query within a React component, call `useGetNodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNodesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNodesQuery(baseOptions?: Apollo.QueryHookOptions<GetNodesQuery, GetNodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNodesQuery, GetNodesQueryVariables>(GetNodesDocument, options);
      }
export function useGetNodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNodesQuery, GetNodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNodesQuery, GetNodesQueryVariables>(GetNodesDocument, options);
        }
export type GetNodesQueryHookResult = ReturnType<typeof useGetNodesQuery>;
export type GetNodesLazyQueryHookResult = ReturnType<typeof useGetNodesLazyQuery>;
export type GetNodesQueryResult = Apollo.QueryResult<GetNodesQuery, GetNodesQueryVariables>;

export type ChangePasswordMutationVariables = Exact<{
  input: InputChangePassword;
  idUser: Scalars['ID'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: Maybe<boolean> };

export const ChangePasswordDocument = gql`
  mutation changePassword($input: InputChangePassword!, $idUser: ID!) {
    changePassword(input: $input, idUser: $idUser)
  }
`;

export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
}