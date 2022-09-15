/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag'
import { GraphQLServicesList } from 'src/config/graphql'

export const CONTEXT_AUTH = { service: GraphQLServicesList.AUTH }
export const GET_SETTING = gql`
  query getSetting {
    getAppInfo {
      version
    }
  }
`

export const LOGIN = gql`
  query login($info: LoginInput!) {
    login(info: $info) {
      token
      userId
    }
  }
`

export const GET_ALL_NODE = gql`
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
      category {
        _id
        name
        code
      }
      phoneNumber
      taxCode
      detailAddress
      canSale
    }
  }
`

export const MY_INFO = gql`
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
        nodes {
          _id
          code
          name
        }
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
        idProfile
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
`
