/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client'

const appInfo = gql`
  query appInfo {
    appInfo {
      version
    }
  }
`

const logout = gql`
  query logout {
    logout
  }
`

const logoutAdmin = gql`
  query logoutAdmin {
    logoutAdmin
  }
`

const myInfo = gql`
  query myInfo {
    myInfo {
      _id
      username
      displayName
      lastChangePasswordAt
      email
      Status
      TypeAccount
      isLocked
      isDeleted
      isActive
    }
  }
`

const login = gql`
  query login($info: LoginInput!) {
    login(info: $info) {
      token
      userId
      Status
    }
  }
`

const loginAdmin = gql`
  query loginAdmin($info: LoginInput!) {
    loginAdmin(info: $info) {
      token
      userId
      Status
    }
  }
`

const getEcomCategoriesPagination = gql`
  query getEcomCategoriesPagination(
    $page: Int
    $limit: Int
    $searchInput: [EcomCategoriesSearch]
    $filterInput: [EcomCategoriesFilter]
    $sortInput: [EcomCategoriesSort]
  ) {
    getEcomCategoriesPagination(
      page: $page
      limit: $limit
      searchInput: $searchInput
      filterInput: $filterInput
      sortInput: $sortInput
    ) {
      currentPage
      data {
        _id
        CategoryCode
        CategoryName
        Color
        CategoryParent_Id
        CategoryParent {
          _id
          CategoryName
        }
        createdAt
        Slug
        Status
      }
    }
  }
`

const getEcomCategoriesPaginationTotal = gql`
  query getEcomCategoriesPaginationTotal(
    $page: Int
    $limit: Int
    $searchInput: [EcomCategoriesSearch]
    $filterInput: [EcomCategoriesFilter]
  ) {
    getEcomCategoriesPaginationTotal(
      page: $page
      limit: $limit
      searchInput: $searchInput
      filterInput: $filterInput
    ) {
      totalRows
      totalPages
      currentPage
    }
  }
`
// start product
const getStockModelPagination = gql`
  query getStockModelPagination(
    $page: Int
    $limit: Int
    $search: [SearchStockModelInput]
    $filter: [FilterStockModelInput]
    $sort: [SortStockModelInput]
    $idsDefault: [String]
  ) {
    getStockModelPagination(
      page: $page
      limit: $limit
      search: $search
      filter: $filter
      sort: $sort
      idsDefault: $idsDefault
    ) {
      currentPage
      data {
        _id
        name
        code
        ecomSlug
        ecomImages {
          linkImage {
            url
            fileName
            type
          }
        }
        prices {
          idPriceType
          price
        }
        ecomCategory {
          CategoryName
          Slug
        }
        sku
        upc
        ecomStatus
        isActive
        createdAt
        createdBy {
          username
          fullName
        }
        ecomDescription
        ecomShortDescription
      }
    }
  }
`

const getStockModelPaginationName = gql`
  query getStockModelPaginationName(
    $page: Int
    $limit: Int
    $search: [SearchStockModelInput]
    $filter: [FilterStockModelInput]
    $sort: [SortStockModelInput]
    $idsDefault: [String]


  ) {
    getStockModelPagination(
      page: $page
      limit: $limit
      search: $search
      filter: $filter
      sort: $sort
      idsDefault: $idsDefault
    ) {
      currentPage
      data {
        _id
        name
        }
      }
    }
`

const getStockModelPaginationTotal = gql`
  query getStockModelPaginationTotal(
    $page: Int
    $limit: Int
    $search: [SearchStockModelInput]
    $filter: [FilterStockModelInput]
  ) {
    getStockModelPaginationTotal(
      page: $page
      limit: $limit
      search: $search
      filter: $filter
    ) {
      totalRows
      totalPages
      currentPage
    }
  }
`
const getStockModelBySlugProduct = gql`
  query getStockModelBySlugProduct($slug: String) {
    getStockModelBySlugProduct(slug: $slug) {
      _id
      name
      code
      ecomSlug
      ecomImages {
        linkImage {
          url
          fileName
          type
        }
      }
      prices {
        idPriceType
        price
      }
      sku
      upc
      ecomCategory {
        CategoryName
        Slug
      }
      ecomDescription
      ecomShortDescription
    }
  }
`
const getStockModelById = gql`
  query getStockModelById($id: ID!) {
    getStockModelById(_id: $id) {
      _id
      name
      code
      ecomSlug
      ecomImages {
        linkImage {
          url
          fileName
          type
        }
      }
      prices {
        idPriceType
        price
      }
      sku
      upc
      ecomStatus
      ecomCategory {
        CategoryName
        Slug
      }
      ecomDescription
      ecomShortDescription
    }
  }
`
const getMapStockModelRelatedsByStockModel = gql`
  query getMapStockModelRelatedsByStockModel($idStockModel: ID!) {
    getMapStockModelRelatedsByStockModel(idStockModel: $idStockModel) {
      _id
      idStockModel
      idStockModelRelated
      stockModelRelated {
        _id
        code
        name
      }
    }
  }
`

// end product

const getContentHomePage = gql`
  query getContentHomePage($language: EnumLanguage!) {
    getContentHomePage(language: $language) {
      _id
      language
      sectionSlider {
        imageSlider {
          linkImage {
            url
            fileName
            type
          }
          altTextImage
          title
          subTitle
          nameLink
          link
          isActive
        }
        isActive
      }
      sectionLatestProduct {
        title
        isActive
      }
      sectionBanner {
        imageBanner1 {
          linkImage {
            url
            fileName
            type
          }
          altTextImage
          title
          subTitle
          nameLink
          link
          isActive
        }
        imageBanner2 {
          linkImage {
            url
            fileName
            type
          }
          altTextImage
          title
          subTitle
          nameLink
          link
          isActive
        }
        imageBanner3 {
          linkImage {
            url
            fileName
            type
          }
          altTextImage
          title
          subTitle
          nameLink
          link
          isActive
        }
        isActive
      }
      sectionBestSellingProduct {
        title
        isActive
      }
      sectionOurPartners {
        imagePartner {
          linkImage {
            url
            fileName
            type
          }
          isActive
          title
          altTextImage
          link
        }
        isActive
        title
      }
      sectionWebIntrodution {
        webIntrodutionItems {
          iconName
          title
          description
        }
        isActive
        title
        description
        linkImage {
          url
          fileName
          type
        }
      }
      sectionEstimonial {
        linkImage {
          url
          fileName
          type
        }
        estimonialItems {
          number
          description
        }
        isActive
        title
        description
        nameLink
        link
      }
      sectionService {
        isActive
        title
        description
      }
      sectionBlogNew {
        isActive
        title
        description
      }
      sectionOurClient {
        isActive
        title
        ourClient {
          isActive
          reference
          avatar {
            url
            fileName
            type
          }
          fullName
          profession
        }
      }

      SEOTitle
      SEODescription
      SEOKeywords
      SEO_OGDescription
      SEO_OGImage
      SEO_OGTitle
    }
  }
`

const getContentMenu = gql`
  query getContentMenu($language: EnumLanguage!) {
    getContentMenu(language: $language) {
      _id
      language
      description
      linkLogo {
        url
        fileName
        type
      }
      linkFavicon {
        url
        fileName
        type
      }
      listMenu {
        name
        link
        children {
          name
          link
        }
      }
    }
  }
`

const getContentContact = gql`
  query getContentContact($language: EnumLanguage!) {
    getContentContact(language: $language) {
      _id
      language
      ourPhone
      ourAddress{
        address
        googleAddress
        googleFrameAddress
      }
      ourMailBox
      detailAddress
      googleAddress
      googleFrame
      phoneNumber
      introduce
      hotline
      email
      socials {
        title
        iconNameHeader
        iconNameFooter
        link
      }
      SEOTitle
      SEODescription
      SEOKeywords
      SEO_OGDescription
      SEO_OGImage
      SEO_OGTitle
    }
  }
`

const getContentFooter = gql`
  query getContentFooter($language: EnumLanguage!) {
    getContentFooter(language: $language) {
      _id
      language
      linkLogo {
        url
        fileName
        type
      }
      altTextLogo
      description
      copyRight
      usefulLink {
        name
        link
      }
      myAccount {
        name
        link
      }
    }
  }
`

const usersWithPaginate = gql`
  query usersWithPaginate(
    $gridOptions: GridOption
    $filterOptions: InputOptionsQueryUser
  ) {
    usersWithPaginate(
      gridOptions: $gridOptions
      filterOptions: $filterOptions
    ) {
      totalRows
      users {
        _id
        username
        displayName
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
  }
`

const getStockModels = gql`
  query getStockModels {
    getStockModels {
      _id
      code
      name

      prices {
        idPriceType
        price
      }

      # Ecom
      ecomTags
      ecomPublicAt
      ecomCategory {
        CategoryName
      }
      ecomImages {
        linkImage {
          url
          fileName
          type
        }
      }
    }
  }
`

const getStaffPagination = gql`
  query getStaffPagination(
    $page: Int
    $limit: Int
    $searchInput: [EcomCategoriesSearch]
    $filterInput: [EcomCategoriesFilter]
    $sortInput: [EcomCategoriesSort]
  ) {
    getStaffPagination(
      page: $page
      limit: $limit
      searchInput: $searchInput
      filterInput: $filterInput
      sortInput: $sortInput
    ) {
      currentPage
      data {
        _id
        MaNhanVien
        TenNhanVien
        NgaySinh
        SoDienThoai
        GioiTinh
        DiaChi_Id
        SoNha
        CMNDHoacHoChieu
        TamNgung
        Email
        TaxCode
        fullAddress
        TaiKhoan_Id
        LinkAvatar {
          url
          fileName
          type
        }
      }
    }
  }
`

const getStaffPaginationTotal = gql`
  query getStaffPaginationTotal(
    $page: Int
    $limit: Int
    $searchInput: [EcomCategoriesSearch]
    $filterInput: [EcomCategoriesFilter]
  ) {
    getStaffPaginationTotal(
      page: $page
      limit: $limit
      searchInput: $searchInput
      filterInput: $filterInput
    ) {
      totalRows
      totalPages
      currentPage
    }
  }
`

const staffs = gql`
  query staffs {
    staffs {
      _id
      MaNhanVien
      TenNhanVien
      TenKhongDau
      GioiTinh
      NgaySinh
      Email
      SoDienThoai
      fullAddress
      TamNgung
      TaxCode
      DiaChi_Id
      CMNDHoacHoChieu
      SoNha
      TaiKhoan_Id
      LinkAvatar {
        url
        fileName
        type
      }
    }
  }
`

const searchDonViHanhChinh = gql`
  query searchDM_DonViHanhChinh(
    $searchString: String!
    $limit: Int
    $idDefault: ID
  ) {
    searchDM_DonViHanhChinh(
      searchString: $searchString
      limit: $limit
      idDefault: $idDefault
    ) {
      _id
      MaDonViHanhChinh
      TenDonViHanhChinh
      TenDayDu
      TenTat
      LoaiDonViHanhChinh
      MaDonViHanhChinhCapTren
      MaDonViHanhChinhCapTrenDayDu
    }
  }
`

const findOneDonViHanhChinh = gql`
  query findOneDonViHanhChinh($id: ID!) {
    findOneDonViHanhChinh(id: $id) {
      _id
      MaDonViHanhChinh
      TenDonViHanhChinh
      TenDayDu
      TenTat
      LoaiDonViHanhChinh
      MaDonViHanhChinhCapTren
      MaDonViHanhChinhCapTrenDayDu
      MacDinh
    }
  }
`

const ordersWithPaginate = gql`
  query ordersWithPaginate(
    $gridOptions: GridOption
    $filterOptions: InputOptionsQueryOrder
  ) {
    ordersWithPaginate(
      gridOptions: $gridOptions
      filterOptions: $filterOptions
    ) {
      totalRows
      orders {
        _id
        code
        idCustomer
        idStaff
        status
        paymentMethod
        idDeliveryAddress
        orderedAt
        deliveryAt
        estimatedDeliveryAt
        note
        customer {
          _id
          email
          fullName
          unsignedFullName
          phoneNumber
        }
        staff {
          _id
          TenNhanVien
          TenKhongDau
        }
        orderDetail {
          idOrder
          idStockModel
          count
          note
          total
          stockModel {
            code
            name
            prices {
              idPriceType
              price
            }
          }
        }
        deliveryAddress {
          fullName
          phoneNumber
          detailAddress
        }
      }
    }
  }
`

const getContentAboutUs = gql`
  query getContentAboutUs($language: EnumLanguage) {
    getContentAboutUs(language: $language) {
      _id
      language
      SEOTitle
      SEODescription
      SEOKeywords
      SEO_OGTitle
      SEO_OGDescription
      SEO_OGImage
      Content
    }
  }
`

const getContentPurchaseInfo = gql`
  query getContentPurchaseInfo($language: EnumLanguage) {
    getContentPurchaseInfo(language: $language) {
      _id
      language
      SEOTitle
      SEODescription
      SEOKeywords
      SEO_OGTitle
      SEO_OGDescription
      SEO_OGImage
      Content
    }
  }
`

const getContentSecurity = gql`
  query getContentSecurity($language: EnumLanguage) {
    getContentSecurity(language: $language) {
      _id
      language
      SEOTitle
      SEODescription
      SEOKeywords
      SEO_OGTitle
      SEO_OGDescription
      SEO_OGImage
      Content
    }
  }
`

const getCustomers = gql`
  query getCustomers {
    getCustomers {
      _id
      fullName
    }
  }
`

const getSetting = gql`
  query getSetting {
    getSetting {
      ecommerce {
        idWarehouse
        defaultLang
      }
    }
  }
`

const getReportTotalOrder = gql`
  query reportTotalOrder($filter: FilterReportInput) {
    reportTotalOrder(filter: $filter) {
      totalQuantity
      totalOrderForType {
        quantity
        type
      }
    }
  }
`

const getReportRevenue = gql`
  query reportRevenue($filter: FilterReportInput) {
    reportRevenue(filter: $filter) {
      totalRevenue
    }
  }
`

const searchUser = gql`
  query searchUser($keyword: String, $idDefault: ID, $limit: Int) {
    searchUser(keyword: $keyword, idDefault: $idDefault, limit: $limit) {
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

const searchStaff = gql`
  query searchStaff(
    $keyWord: String
    $idDefault: ID
    $limit: Int
    $MaChucVu: String
    $idDefaults: [ID]
  ) {
    searchStaff(
      keyWord: $keyWord
      idDefault: $idDefault
      limit: $limit
      MaChucVu: $MaChucVu
      idDefaults: $idDefaults
    ) {
      _id
      MaNhanVien
      TenNhanVien
    }
  }
`

const getOrderById = gql`
  query getOrderById($id: ID!) {
    getOrderById(id: $id) {
      _id
      code
      idCustomer
      idStaff
      status
      paymentMethod
      idDeliveryAddress
      orderedAt
      deliveryAt
      estimatedDeliveryAt
      transportFee
      note
      shippingUnit
      reasonCancel
      reasonFailed
      customerReasonCancel
      customerCancelBy {
        _id
        fullName
      }
      updatedAt
      updatedBy {
        _id
        fullName
      }
      failedBy {
        _id
        fullName
      }
      orderDetail {
        idOrder
        idStockModel
        count
        note
        total
        stockModel {
          code
          name
          prices {
            idPriceType
            price
          }
        }
      }
      customer {
        _id
        email
        fullName
        phoneNumber
        user_Id
      }
      deliveryAddress {
        _id
        idCustomer
        fullName
        phoneNumber
        detailAddress
      }
    }
  }
`

const getQuantityOderForType = gql`
  query getQuantityOderForType {
    getQuantityOderForType {
      quantity
      type
    }
  }
`

const searchUserNotHaveStaff = gql`
  query searchUserNotHaveStaff(
    $keyword: String
    $idDefault: ID
    $limit: Int
    $isUpdate: Boolean
  ) {
    searchUserNotHaveStaff(
      keyword: $keyword
      idDefault: $idDefault
      limit: $limit
      isUpdate: $isUpdate
    ) {
      _id
      username
    }
  }
`
const getBlogPagination = gql`
  query getBlogPagination(
    $page: Int
    $limit: Int
    $search: [SearchBlogInput]
    $filter: [FilterBlogInput]
    $sort: [SortBlogInput]
    $idsDefault: [String]
  ) {
    getBlogPagination(
      page: $page
      limit: $limit
      search: $search
      filter: $filter
      sort: $sort
      idsDefault: $idsDefault
    ) {
      currentPage
      data {
        _id
        title
        slug
        sortContent
        url
        cardinalNumber
        keywords
        isFeatureBlog
        mainPhoto {
          url
          fileName
          type
        }
        status
        priority
        publishAt
        createdAt
        createdBy {
          _id
          username
          fullName
        }
        publishBy {
          _id
          username
          fullName
        }
      }
    }
  }
`

const getServicePagination = gql`
  query getServicePagination(
    $page: Int
    $limit: Int
    $search: [SearchServiceInput]
    $filter: [FilterServiceInput]
    $sort: [SortServiceInput]
  ) {
    getServicePagination(
      page: $page
      limit: $limit
      search: $search
      filter: $filter
      sort: $sort
    ) {
      currentPage
      data {
        title
        slug
        _id
        desciption
        url
        cardinalNumber
        keywords
        sortDescription
        createdAt
        createdBy {
          _id
          username
          fullName
        }
        mainPhoto {
          url
          fileName
          type
        }
      }
    }
  }
`
const getBlogPaginationTotal = gql`
  query getBlogPaginationTotal(
    $page: Int
    $limit: Int
    $search: [SearchBlogInput]
    $filter: [FilterBlogInput]
  ) {
    getBlogPaginationTotal(
      page: $page
      limit: $limit
      search: $search
      filter: $filter
    ) {
      currentPage
      totalRows
      totalPages
    }
  }
`
const getServicePaginationTotal = gql`
  query getServicePaginationTotal(
    $page: Int
    $limit: Int
    $search: [SearchServiceInput]
    $filter: [FilterServiceInput]
  ) {
    getServicePaginationTotal(
      page: $page
      limit: $limit
      search: $search
      filter: $filter
    ) {
      currentPage
      totalRows
      totalPages
    }
  }
`

const getBlogById = gql`
  query getBlogById($id: ID!) {
    getBlogById(_id: $id) {
      _id
      title
      slug
      sortContent
      content
      url
      keywords
      isFeatureBlog
      mainPhoto {
        url
        fileName
        type
      }
      status
      priority
      publishAt
      createdAt
      createdBy {
        _id
        username
        fullName
      }
      publishBy {
        _id
        username
        fullName
      }
    }
  }
`
const getServiceById = gql`
  query getServiceById($id: ID!) {
    getServiceById(_id: $id) {
      _id
      title
      slug
      mainPhoto {
        url
        fileName
        type
      }
      sortDescription
      desciption
      keywords
      isDeleted
      createdAt
      createdBy {
        _id
        username
        fullName
      }
    }
  }
`
const getPages = gql`
  query getPages {
    getPages {
      _id
      title
      slug
      content
      status
      createdAt
    }
  }
`
const getPageById = gql`
  query getPageById($id: ID!) {
    getPageById(_id: $id) {
      _id
      title
      slug
      content
      description
      keywords
      isAddToMainMenu
      isAddToFooterMenu
      status
      createdAt
    }
  }
`
const getPagePagination = gql`
  query getPagePagination(
    $page: Int
    $limit: Int
    $search: [SearchPageInput]
    $filter: [FilterPageInput]
    $sort: [SortPageInput]
  ) {
    getPagePagination(
      page: $page
      limit: $limit
      search: $search
      filter: $filter
      sort: $sort
    ) {
      currentPage
      data {
        _id
        title
        slug
        content
        description
        url
        cardinalNumber
        status
        createdAt
        createdBy {
          username
        }
      }
    }
  }
`
const getPagePaginationTotal = gql`
  query getPagePaginationTotal(
    $page: Int
    $limit: Int
    $search: [SearchPageInput]
    $filter: [FilterPageInput]
  ) {
    getPagePaginationTotal(
      page: $page
      limit: $limit
      search: $search
      filter: $filter
    ) {
      totalPages
      totalRows
      currentPage
    }
  }
`
const getContentHistory = gql`
query getContentHistory ($idContent: String!, $type: EnumContentHistoryType!){
  getContentHistory(idContent:$idContent , type: $type){
    _id
    type
    version
    name
    idPage
    dataPage{
      title
      content
      description
      keywords
      isAddToMainMenu
      isAddToFooterMenu
      status
    }
    createdAt
    createdBy{
      username
    }
    updatedAt
    updatedBy{
      username
    }	  
  }
}
`
const getMapBlogRelatedsByBlog = gql` 
  query getMapBlogRelatedsByBlog($idBlog: ID!, $limit: Int) {
    getMapBlogRelatedsByBlog(idBlog: $idBlog, limit: $limit) {
      idBlog
      idBlogRelated
      blogRelated {
        title
        publishAt
        sortContent
        slug
        mainPhoto {
          url
          fileName
          type
        }
      }
    }
  }
`
const getMapBlogRelateds = gql`
  query getMapBlogRelateds {
    getMapBlogRelateds {
      _id
      idBlog
      idBlogRelated
      blogRelated {
        title
        publishAt
        sortContent
        slug
        mainPhoto {
          url
          fileName
          type
        }
      }
    }
  }
`
const getBlogs = gql`
  query getBlogs {
    getBlogs {
      _id
      title
      slug
      sortContent
      url
      keywords
      isFeatureBlog
      mainPhoto {
        url
        fileName
        type
      }
      status
      publishAt
      createdAt
      createdBy {
        _id
        username
        fullName
      }
      publishBy {
        _id
        username
        fullName
      }
    }
  }
`
const getUsersTypeAdmin = gql`
  query getUsersTypeAdmin {
    getUsersTypeAdmin {
      username
      phoneNumber
      note
      _id
      isLocked
      createdAt
      updatedBy {
        username
      }
      employee {
        _id
      }
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

const getEmailOnSubsPagination = gql`
  query getEmailOnSubsPagination(
    $page: Int
    $limit: Int
    $search: [SearchEmailInput]
    $filter: [FilterEmailInput]
    $sort: [SortEmailInput]
  ) {
    getEmailOnSubsPagination(
      page: $page
      limit: $limit
      search: $search
      filter: $filter
      sort: $sort
    ) {
      currentPage
      data {
        _id
        email
        status
        subscribeAt
        cardinalNumber
        createdAt
        createdBy {
          username
          fullName
        }
        updatedAt
      }
    }
  }
`

const getMailContactPagination = gql`
  query getMailContactPagination(
    $page: Int
    $limit: Int
    $search: [SearchMailContactInput]
    $filter: [FilterMailContactInput]
    $sort: [SortMailContactInput]
  ) {
    getMailContactPagination(
      page: $page
      limit: $limit
      search: $search
      filter: $filter
      sort: $sort
    ) {
      currentPage
      data {
        _id
        email
        phoneNumber
        fullName
        subject
        idService
        topic
        message
        status
        cardinalNumber
        service {
          title
        }
        createdAt
        createdBy {
          username
          fullName
        }
        updateAt
      }
    }
  }
`

const getEmailOnSubsPaginationTotal = gql`
  query getEmailOnSubsPaginationTotal(
    $page: Int
    $limit: Int
    $search: [SearchEmailInput]
    $filter: [FilterEmailInput]
  ) {
    getEmailOnSubsPaginationTotal(
      page: $page
      limit: $limit
      search: $search
      filter: $filter
    ) {
      totalPages
      totalRows
      currentPage
    }
  }
`
const getMailContactPaginationTotal = gql`
  query getMailContactPaginationTotal(
    $page: Int
    $limit: Int
    $search: [SearchMailContactInput]
    $filter: [FilterMailContactInput]
  ) {
    getMailContactPaginationTotal(
      page: $page
      limit: $limit
      search: $search
      filter: $filter
    ) {
      totalPages
      totalRows
      currentPage
    }
  }
`

const getMapServiceProducts = gql`
  query getMapServiceProducts {
    getMapServiceProducts {
      _id
      idService
      idStockModel
      stockModel {
        _id
        code
        name
      }
      service {
        _id
        title
      }
      createdAt
      createdBy {
        username
      }
    }
  }
`
const getServices = gql`
  query getServices {
    getServices {
      _id
      title
    }
  }
`
const getMapServiceProductsByService = gql`
  query getMapServiceProductsByService($idService: ID!, $limit: Int) {
    getMapServiceProductsByService(idService: $idService, limit: $limit) {
      _id
      idService
      idStockModel
      stockModel {
        _id
        code
        name
        upc
        sku
        ecomStatus
        ecomImages {
          linkImage {
            url
            fileName
            type
          }
          altTextImage
        }
      }
      service {
        _id
        title
        mainPhoto {
          url
        }
      }
    }
  }
`
