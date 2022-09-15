/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client'

const createEcomCategories = gql`
  mutation createEcomCategories($input: EcomCategoriesInput!) {
    createEcomCategories(input: $input) {
      _id
    }
  }
`

const updateEcomCategories = gql`
  mutation updateEcomCategories($id: ID!, $input: EcomCategoriesInput!) {
    updateEcomCategories(id: $id, input: $input) {
      _id
    }
  }
`
const removeEcomCategories = gql`
  mutation removeEcomCategories($ids: [ID!]) {
    removeEcomCategories(ids: $ids)
  }
`
// start product
const createStockModel = gql`
  mutation createStockModel(
    $input: StockModelInput!
    $idsStockModelRelated: [ID]
  ) {
    createStockModel(
      input: $input
      idsStockModelRelated: $idsStockModelRelated
    ) {
      _id
    }
  }
`

const updateStockModel = gql`
  mutation updateStockModel(
    $id: String!
    $input: StockModelInput!
    $idsStockModelRelated: [ID]
  ) {
    updateStockModel(
      _id: $id
      input: $input
      idsStockModelRelated: $idsStockModelRelated
    ) {
      _id
    }
  }
`

const deleteStockModel = gql`
  mutation deleteStockModel($id: String!) {
    deleteStockModel(_id: $id) {
      _id
    }
  }
`
// end product
const createOrUpdateContentHomePage = gql`
  mutation createOrUpdateContentHomePage($input: InputContentHomePage!) {
    createOrUpdateContentHomePage(input: $input) {
      _id
    }
  }
`

const createOrUpdateContentMenu = gql`
  mutation createOrUpdateContentMenu($input: InputContentMenu!) {
    createOrUpdateContentMenu(input: $input) {
      _id
    }
  }
`

const createOrUpdateContentContact = gql`
  mutation createOrUpdateContentContact($input: InputContentContact!) {
    createOrUpdateContentContact(input: $input) {
      _id
    }
  }
`

const createOrUpdateContentFooter = gql`
  mutation createOrUpdateContentFooter($input: InputContentFooter!) {
    createOrUpdateContentFooter(input: $input) {
      _id
    }
  }
`

const createLatestProductById = gql`
  mutation createLatestProductById($idStockModel: ID!) {
    createLatestProductById(idStockModel: $idStockModel) {
      _id
    }
  }
`

const deleteLatestProductById = gql`
  mutation deleteLatestProductById($idStockModel: ID!) {
    deleteLatestProductById(idStockModel: $idStockModel) {
      _id
    }
  }
`

const createStaff = gql`
  mutation createStaff($input: StaffInput!) {
    createStaff(input: $input)
  }
`
const updateStaff = gql`
  mutation updateStaff($id: ID!, $input: StaffInput!) {
    updateStaff(id: $id, input: $input)
  }
`
const removeStaff = gql`
  mutation removeStaff($ids: [ID!]!) {
    removeStaff(ids: $ids)
  }
`
const updateCancelPublicCategories = gql`
  mutation updateCancelPublicCategories($id: ID!) {
    updateCancelPublicCategories(id: $id)
  }
`

const updateUserOverride = gql`
  mutation updateUserOverride($input: NeedOverrideInfo!, $idUser: ID!) {
    updateUserOverride(input: $input, idUser: $idUser) {
      _id
      username
      customer {
        _id
        email
        fullName
        unsignedFullName
        gender
        dateOfBirth
        address
        phoneNumber
        identityCard {
          idNo
          issuedOn
          issuedBy
        }
      }
      Status
      isActive
      isLocked
    }
  }
`

const createUser = gql`
  mutation createUser($input: NewUserInfo!, $language: String) {
    createUser(input: $input, language: $language) {
      _id
    }
  }
`
const createOrUpdateContentAboutUs = gql`
  mutation createOrUpdateContentAboutUs(
    $language: EnumLanguage!
    $input: InputContentAboutUs!
  ) {
    createOrUpdateContentAboutUs(language: $language, input: $input) {
      _id
    }
  }
`

const createOrUpdateContentPurchaseInfo = gql`
  mutation createOrUpdateContentPurchaseInfo(
    $language: EnumLanguage!
    $input: InputContentPurchaseInfo!
  ) {
    createOrUpdateContentPurchaseInfo(language: $language, input: $input) {
      _id
    }
  }
`

const createOrUpdateContentSecurity = gql`
  mutation createOrUpdateContentSecurity(
    $language: EnumLanguage!
    $input: InputContentSecurity!
  ) {
    createOrUpdateContentSecurity(language: $language, input: $input) {
      _id
    }
  }
`

const createOrder2 = gql`
  mutation createOrder2($input: InputOrder!) {
    createOrder2(input: $input) {
      _id
    }
  }
`

const updateOrder2 = gql`
  mutation updateOrder2($_id: ID!, $input: InputOrder) {
    updateOrder2(_id: $_id, input: $input) {
      _id
    }
  }
`

const updateOrderStatus = gql`
  mutation updateOrderStatus(
    $_ids: [ID!]!
    $oldStatus: EnumOrderStatus!
    $newStatus: EnumOrderStatus!
  ) {
    updateOrderStatus(_ids: $_ids, oldStatus: $oldStatus, newStatus: $newStatus)
  }
`

const cancelOrder2 = gql`
  mutation cancelOrder2($_id: ID!, $reasonCancel: String) {
    cancelOrder2(_id: $_id, reasonCancel: $reasonCancel)
  }
`

const updateSettingType = gql`
  mutation updateSettingType($type: SettingType, $input: Scalar) {
    updateSettingType(type: $type, input: $input) {
      ecommerce {
        idWarehouse
      }
    }
  }
`

const confirmOrder = gql`
  mutation confirmOrder($id: ID!) {
    confirmOrder(id: $id) {
      _id
    }
  }
`

const shipOrder = gql`
  mutation shipOrder($_id: ID!, $input: String) {
    shipOrder(_id: $_id, input: $input)
  }
`

const confirmSuccessOrder = gql`
  mutation confirmSuccessOrder($id: ID!) {
    confirmSuccessOrder(id: $id) {
      _id
    }
  }
`

const confirmFailedOrder = gql`
  mutation confirmFailedOrder($id: ID!, $reasonFailed: String) {
    confirmFailedOrder(id: $id, reasonFailed: $reasonFailed) {
      _id
    }
  }
`
const deletePage = gql`
  mutation deletePage($id: ID!) {
    deletePage(_id: $id) {
      _id
    }
  }
`
const createBlog = gql`
  mutation createBlog($input: BlogInput!, $idsBlogRelated: [ID]) {
    createBlog(input: $input, idsBlogRelated: $idsBlogRelated) {
      _id
    }
  }
`
const createPage = gql`
  mutation createPage($input: PageInput!) {
    createPage(input: $input) {
      _id
    }
  }
`
const updateBlog = gql`
  mutation updateBlog($id: ID!, $input: BlogInput!, $idsBlogRelated: [ID]) {
    updateBlog(_id: $id, input: $input, idsBlogRelated: $idsBlogRelated) {
      _id
    }
  }
`
const updatePage = gql`
  mutation updatePage($id: ID!, $input: PageInput!) {
    updatePage(_id: $id, input: $input) {
      _id
    }
  }
`
const deleteBlog = gql`
  mutation deleteBlog($ids: ID!) {
    deleteBlog(_id: $ids) {
      _id
    }
  }
`
const changePriorityBlog = gql`
  mutation changePriorityBlog($ids: ID!) {
    changePriorityBlog(_id: $ids) {
      _id
    }
  }
`
const unChangePriorityMultiBlog = gql`
  mutation unChangePriorityMultiBlog($ids: [ID]) {
    unChangePriorityMultiBlog(ids: $ids) {
      _id
    }
  }
`
const publicBlog = gql`
  mutation publicBlog($ids: ID!) {
    publicBlog(_id: $ids) {
      _id
    }
  }
`

const createService = gql`
  mutation createService($input: ServiceInput!) {
    createService(input: $input) {
      _id
    }
  }
`

const updateService = gql`
  mutation updateService($id: ID!, $input: ServiceInput!) {
    updateService(_id: $id, input: $input) {
      _id
    }
  }
`
const deleteService = gql`
  mutation deleteService($ids: ID!) {
    deleteService(_id: $ids) {
      _id
    }
  }
`

const updateFeatureBlog = gql`
  mutation updateFeatureBlog($ids: ID!) {
    updateFeatureBlog(_id: $ids) {
      _id
    }
  }
`
const deleteMailContact = gql`
  mutation deleteMailContact($ids: ID!) {
    deleteMailContact(_id: $ids) {
      _id
    }
  }
`

const unSubscribeEmail = gql`
  mutation unSubscribeEmail($ids: ID!) {
    unSubscribeEmail(_id: $ids) {
      _id
    }
  }
`

const createMapServiceProduct = gql`
  mutation createMapServiceProduct($idService: ID!, $idsStockModel: [ID]!) {
    createMapServiceProduct(
      idService: $idService
      idsStockModel: $idsStockModel
    ) {
      _id
    }
  }
`
const removeMapServiceProduct = gql`
  mutation removeMapServiceProduct($idService: ID!, $idsStockModel: [ID]!) {
    removeMapServiceProduct(
      idService: $idService
      idsStockModel: $idsStockModel
    )
  }
`

const deleteUsers = gql`
  mutation deleteUsers($idUsers: [ID!]!) {
    deleteUsers(idUsers: $idUsers)
  }
`

const updateUsersOverride = gql`
  mutation updateUsersOverride($input: NeedOverrideInfo!, $idUsers: [ID!]!) {
    updateUsersOverride(input: $input, idUsers: $idUsers)
  }
`

const updateUser = gql`
  mutation updateUser($input: NeedUpdateInfo!, $idUser: ID!) {
    updateUser(input: $input, idUser: $idUser) {
      _id
      displayName
      email
      customer {
        _id
        user_Id
        email
        phoneNumber
        fullName
        deliveryAddress_Default {
          _id
          idCustomer
          fullName
          phoneNumber
          detailAddress
        }
      }
    }
  }
`

const createUserTypeAdmin = gql`
  mutation createUserTypeAdmin($input: NewUserInfo!, $language: String) {
    createUserTypeAdmin(input: $input, language: $language) {
      _id
    }
  }
`


const importFileStockModel = gql`
  mutation importFileStockModel($input: [StockModelInput!]!) {
    importFileStockModel(input: $input)
  }
`

const createPageHistory = gql`
mutation createContentHistory ($input: InputContentHistory!){
  createContentHistory(input: $input ){
    _id
    type
    name
    version
    idPage
    dataPage{
      title
      slug
      content
      description
      keywords
      isAddToMainMenu
      isAddToFooterMenu
    }
          
  }
}
`
const deletePagetHistory = gql`
 mutation deleteContentHistory($id: ID!) {
    deleteContentHistory(_id: $id) 
  }
`
const renameVersion = gql`
  mutation renameVersion($id: ID!, $name: String!){
    renameVersion(_id: $id, name: $name) 
  }
`