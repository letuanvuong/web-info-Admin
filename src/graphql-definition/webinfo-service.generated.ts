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
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Any: any;
  JSON: any;
  Scalar: any;
  confirmPassword_String_NotNull_minLength_6_message_Mustbeatleast6characters: any;
  email_String_maxLength_255_format_email_code_EMAIL_NOT_VALIDATE: any;
  newPassword_String_NotNull_minLength_6_message_Mustbeatleast6characters: any;
};

export type AppInfo = {
  __typename?: 'AppInfo';
  version?: Maybe<Scalars['String']>;
};

export type AuthenticationInfo = {
  __typename?: 'AuthenticationInfo';
  Status?: Maybe<EnumStatusAccount>;
  token: Scalars['String'];
  userId: Scalars['String'];
};

export type Blog = {
  __typename?: 'Blog';
  _id: Scalars['ID'];
  cardinalNumber?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  isFeatureBlog?: Maybe<Scalars['Boolean']>;
  keywords?: Maybe<Scalars['String']>;
  mainPhoto?: Maybe<LinkImage>;
  priority?: Maybe<Scalars['Int']>;
  publishAt?: Maybe<Scalars['Float']>;
  publishBy?: Maybe<UserSlim>;
  slug?: Maybe<Scalars['String']>;
  sortContent?: Maybe<Scalars['String']>;
  status?: Maybe<EnumBlogStatus>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
  url?: Maybe<Scalars['String']>;
};

export type BlogHistoryInput = {
  _id?: InputMaybe<Scalars['ID']>;
  content?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  createdBy?: InputMaybe<UserSlimInput>;
  deletedAt?: InputMaybe<Scalars['Float']>;
  deletedBy?: InputMaybe<UserSlimInput>;
  isFeatureBlog?: InputMaybe<Scalars['Boolean']>;
  keywords?: InputMaybe<Scalars['String']>;
  mainPhoto?: InputMaybe<InputLinkImage>;
  publishAt?: InputMaybe<Scalars['Float']>;
  publishBy?: InputMaybe<UserSlimInput>;
  slug?: InputMaybe<Scalars['String']>;
  sortContent?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<EnumBlogStatus>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
  updatedBy?: InputMaybe<UserSlimInput>;
};

export type BlogInput = {
  content?: InputMaybe<Scalars['String']>;
  isFeatureBlog?: InputMaybe<Scalars['Boolean']>;
  keywords?: InputMaybe<Scalars['String']>;
  mainPhoto?: InputMaybe<InputLinkImage>;
  priority?: InputMaybe<Scalars['Int']>;
  slug?: InputMaybe<Scalars['String']>;
  sortContent?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type BlogPagination = {
  __typename?: 'BlogPagination';
  currentPage?: Maybe<Scalars['Float']>;
  data?: Maybe<Array<Maybe<Blog>>>;
};

export type BlogPaginationTotal = {
  __typename?: 'BlogPaginationTotal';
  currentPage?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
  totalRows?: Maybe<Scalars['Float']>;
};

export type ChangePasswordInput = {
  confirmPassword: Scalars['confirmPassword_String_NotNull_minLength_6_message_Mustbeatleast6characters'];
  currentPassword: Scalars['String'];
  newPassword: Scalars['newPassword_String_NotNull_minLength_6_message_Mustbeatleast6characters'];
};

export type ColumnDetail = {
  aggFunc?: InputMaybe<Scalars['Any']>;
  displayName?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['Any']>;
  id?: InputMaybe<Scalars['String']>;
};

export type ContentAboutUs = {
  __typename?: 'ContentAboutUs';
  Content?: Maybe<Scalars['String']>;
  SEODescription?: Maybe<Scalars['String']>;
  SEOKeywords?: Maybe<Scalars['String']>;
  SEOTitle?: Maybe<Scalars['String']>;
  SEO_OGDescription?: Maybe<Scalars['String']>;
  SEO_OGImage?: Maybe<Scalars['String']>;
  SEO_OGTitle?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
  language?: Maybe<EnumLanguage>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type ContentBanner = {
  __typename?: 'ContentBanner';
  imageBanner1?: Maybe<ImageBanner>;
  imageBanner2?: Maybe<ImageBanner>;
  imageBanner3?: Maybe<ImageBanner>;
  isActive?: Maybe<Scalars['Boolean']>;
};

export type ContentBannerInput = {
  imageBanner1?: InputMaybe<ImageBannerInput>;
  imageBanner2?: InputMaybe<ImageBannerInput>;
  imageBanner3?: InputMaybe<ImageBannerInput>;
  isActive?: InputMaybe<Scalars['Boolean']>;
};

export type ContentBestSellingProduct = {
  __typename?: 'ContentBestSellingProduct';
  isActive?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type ContentBestSellingProductInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ContentBlogNew = {
  __typename?: 'ContentBlogNew';
  description?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type ContentBlogNewInput = {
  description?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ContentContact = {
  __typename?: 'ContentContact';
  SEODescription?: Maybe<Scalars['String']>;
  SEOKeywords?: Maybe<Scalars['String']>;
  SEOTitle?: Maybe<Scalars['String']>;
  SEO_OGDescription?: Maybe<Scalars['String']>;
  SEO_OGImage?: Maybe<Scalars['String']>;
  SEO_OGTitle?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
  detailAddress?: Maybe<Array<Maybe<Scalars['String']>>>;
  email?: Maybe<Scalars['String']>;
  googleAddress?: Maybe<Scalars['String']>;
  googleFrame?: Maybe<Scalars['String']>;
  hotline?: Maybe<Scalars['String']>;
  introduce?: Maybe<Scalars['String']>;
  language?: Maybe<EnumLanguage>;
  ourAddress?: Maybe<Array<Maybe<OurAddress>>>;
  ourMailBox?: Maybe<Scalars['String']>;
  ourPhone?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  socials?: Maybe<Array<Maybe<SocialItem>>>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type ContentEstimonial = {
  __typename?: 'ContentEstimonial';
  description?: Maybe<Scalars['String']>;
  estimonialItems?: Maybe<Array<Maybe<EstimonialItem>>>;
  isActive?: Maybe<Scalars['Boolean']>;
  link?: Maybe<Scalars['String']>;
  linkImage?: Maybe<LinkImage>;
  nameLink?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ContentEstimonialInput = {
  description?: InputMaybe<Scalars['String']>;
  estimonialItems?: InputMaybe<Array<InputMaybe<EstimonialItemInput>>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  link?: InputMaybe<Scalars['String']>;
  linkImage?: InputMaybe<InputLinkImage>;
  nameLink?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ContentFooter = {
  __typename?: 'ContentFooter';
  _id: Scalars['ID'];
  altTextLogo?: Maybe<Scalars['String']>;
  copyRight?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  introduceImages?: Maybe<Array<Maybe<LinkImage>>>;
  language?: Maybe<EnumLanguage>;
  linkLogo?: Maybe<LinkImage>;
  myAccount?: Maybe<Array<Maybe<ContentMyAccount>>>;
  subscribeDescription?: Maybe<Scalars['String']>;
  subscribeTitle?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
  usefulLink?: Maybe<Array<Maybe<ContentUsefulLink>>>;
};

export type ContentHistory = {
  __typename?: 'ContentHistory';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  dataBlog?: Maybe<Blog>;
  dataPage?: Maybe<Page>;
  dataService?: Maybe<Service>;
  deleteAt?: Maybe<Scalars['Float']>;
  deleteBy?: Maybe<UserSlim>;
  idBlog?: Maybe<Scalars['ID']>;
  idPage?: Maybe<Scalars['ID']>;
  idService?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<EnumContentHistoryType>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
  version?: Maybe<Scalars['Float']>;
};

export type ContentHomePage = {
  __typename?: 'ContentHomePage';
  SEODescription?: Maybe<Scalars['String']>;
  SEOKeywords?: Maybe<Scalars['String']>;
  SEOTitle?: Maybe<Scalars['String']>;
  SEO_OGDescription?: Maybe<Scalars['String']>;
  SEO_OGImage?: Maybe<Scalars['String']>;
  SEO_OGTitle?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
  language?: Maybe<EnumLanguage>;
  sectionBanner?: Maybe<ContentBanner>;
  sectionBestSellingProduct?: Maybe<ContentBestSellingProduct>;
  sectionBlogNew?: Maybe<ContentBlogNew>;
  sectionEstimonial?: Maybe<ContentEstimonial>;
  sectionLatestProduct?: Maybe<ContentLatestProduct>;
  sectionOurClient?: Maybe<ContentOurClient>;
  sectionOurPartners?: Maybe<ContentOurPartners>;
  sectionService?: Maybe<ContentService>;
  sectionSlider?: Maybe<ContentSlider>;
  sectionWebIntrodution?: Maybe<ContentWebIntrodution>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type ContentLatestProduct = {
  __typename?: 'ContentLatestProduct';
  isActive?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type ContentLatestProductInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ContentMenu = {
  __typename?: 'ContentMenu';
  _id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  language?: Maybe<EnumLanguage>;
  linkFavicon?: Maybe<LinkImage>;
  linkLogo?: Maybe<LinkImage>;
  listMenu?: Maybe<Array<Maybe<MenuItem>>>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type ContentMyAccount = {
  __typename?: 'ContentMyAccount';
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ContentOurClient = {
  __typename?: 'ContentOurClient';
  isActive?: Maybe<Scalars['Boolean']>;
  ourClient?: Maybe<Array<Maybe<OurClient>>>;
  title?: Maybe<Scalars['String']>;
};

export type ContentOurClientInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  ourClient?: InputMaybe<Array<InputMaybe<OurClientInput>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type ContentOurPartners = {
  __typename?: 'ContentOurPartners';
  imagePartner?: Maybe<Array<Maybe<PartnerImage>>>;
  isActive?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type ContentOurPartnersInput = {
  imagePartner?: InputMaybe<Array<InputMaybe<PartnerImageInput>>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ContentPurchaseInfo = {
  __typename?: 'ContentPurchaseInfo';
  Content?: Maybe<Scalars['String']>;
  SEODescription?: Maybe<Scalars['String']>;
  SEOKeywords?: Maybe<Scalars['String']>;
  SEOTitle?: Maybe<Scalars['String']>;
  SEO_OGDescription?: Maybe<Scalars['String']>;
  SEO_OGImage?: Maybe<Scalars['String']>;
  SEO_OGTitle?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
  language?: Maybe<EnumLanguage>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type ContentSecurity = {
  __typename?: 'ContentSecurity';
  Content?: Maybe<Scalars['String']>;
  SEODescription?: Maybe<Scalars['String']>;
  SEOKeywords?: Maybe<Scalars['String']>;
  SEOTitle?: Maybe<Scalars['String']>;
  SEO_OGDescription?: Maybe<Scalars['String']>;
  SEO_OGImage?: Maybe<Scalars['String']>;
  SEO_OGTitle?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
  language?: Maybe<EnumLanguage>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type ContentService = {
  __typename?: 'ContentService';
  description?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type ContentServiceInput = {
  description?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ContentSlider = {
  __typename?: 'ContentSlider';
  imageSlider?: Maybe<Array<Maybe<SliderImage>>>;
  isActive?: Maybe<Scalars['Boolean']>;
};

export type ContentSliderInput = {
  imageSlider?: InputMaybe<Array<InputMaybe<SliderImageInput>>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
};

export type ContentUsefulLink = {
  __typename?: 'ContentUsefulLink';
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ContentWebIntrodution = {
  __typename?: 'ContentWebIntrodution';
  description?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  linkImage?: Maybe<LinkImage>;
  title?: Maybe<Scalars['String']>;
  webIntrodutionItems?: Maybe<Array<Maybe<WebIntrodutionItem>>>;
};

export type ContentWebIntrodutionInput = {
  description?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  linkImage?: InputMaybe<InputLinkImage>;
  title?: InputMaybe<Scalars['String']>;
  webIntrodutionItems?: InputMaybe<Array<InputMaybe<WebIntrodutionItemInput>>>;
};

export type Customer = {
  __typename?: 'Customer';
  _id: Scalars['ID'];
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  dateOfBirth?: Maybe<Scalars['Float']>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  deliveryAddress_Default?: Maybe<DeliveryAddress>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  gender?: Maybe<EnumGender>;
  identityCard?: Maybe<IdentityCard>;
  phoneNumber?: Maybe<Scalars['String']>;
  unsignedFullName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
  user_Id: Scalars['String'];
};

export type Dm_DonViHanhChinh = {
  __typename?: 'DM_DonViHanhChinh';
  LoaiDonViHanhChinh?: Maybe<EnumLoaiDonViHanhChinh>;
  MaDonViHanhChinh?: Maybe<Scalars['String']>;
  MaDonViHanhChinhCapTren?: Maybe<Scalars['String']>;
  MaDonViHanhChinhCapTrenDayDu?: Maybe<Scalars['String']>;
  MacDinh?: Maybe<Scalars['Boolean']>;
  TenDayDu?: Maybe<Scalars['String']>;
  TenDonViHanhChinh?: Maybe<Scalars['String']>;
  TenKhongDau?: Maybe<Scalars['String']>;
  TenKhongDauDayDu?: Maybe<Scalars['String']>;
  TenTat?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  isActive?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type DeliveryAddress = {
  __typename?: 'DeliveryAddress';
  _id: Scalars['ID'];
  companyName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  detailAddress?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  idCustomer?: Maybe<Scalars['ID']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  phoneNumber?: Maybe<Scalars['String']>;
  unsignedFullName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type EcomCategories = {
  __typename?: 'EcomCategories';
  CategoryCode?: Maybe<Scalars['String']>;
  CategoryName?: Maybe<Scalars['String']>;
  CategoryName_Unsigned?: Maybe<Scalars['String']>;
  CategoryParent?: Maybe<EcomCategoriesRes>;
  CategoryParent_Id?: Maybe<Scalars['String']>;
  Color?: Maybe<Scalars['String']>;
  Slug?: Maybe<Scalars['String']>;
  Status?: Maybe<EnumCategoriesStatus>;
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  isActive?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type EcomCategoriesFilter = {
  fieldFilter?: InputMaybe<Scalars['String']>;
  values?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EcomCategoriesInput = {
  CategoryCode?: InputMaybe<Scalars['String']>;
  CategoryName?: InputMaybe<Scalars['String']>;
  CategoryParent_Id?: InputMaybe<Scalars['String']>;
  Color?: InputMaybe<Scalars['String']>;
  Slug?: InputMaybe<Scalars['String']>;
  Status?: InputMaybe<EnumCategoriesStatus>;
  isActive?: InputMaybe<Scalars['Boolean']>;
};

export type EcomCategoriesPagination = {
  __typename?: 'EcomCategoriesPagination';
  currentPage?: Maybe<Scalars['Float']>;
  data?: Maybe<Array<Maybe<EcomCategoriesRes>>>;
};

export type EcomCategoriesPaginationTotal = {
  __typename?: 'EcomCategoriesPaginationTotal';
  currentPage?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
  totalRows?: Maybe<Scalars['Float']>;
};

export type EcomCategoriesRes = {
  __typename?: 'EcomCategoriesRes';
  CategoryCode?: Maybe<Scalars['String']>;
  CategoryName?: Maybe<Scalars['String']>;
  CategoryName_Unsigned?: Maybe<Scalars['String']>;
  CategoryParent?: Maybe<EcomCategoriesRes>;
  CategoryParent_Id?: Maybe<Scalars['String']>;
  Color?: Maybe<Scalars['String']>;
  Slug?: Maybe<Scalars['String']>;
  Status?: Maybe<EnumCategoriesStatus>;
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  isActive?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type EcomCategoriesSearch = {
  fieldSearch?: InputMaybe<Scalars['String']>;
  textSearch?: InputMaybe<Scalars['String']>;
};

export type EcomCategoriesSort = {
  fieldSort?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type EcomCategoriesTreeRes = {
  __typename?: 'EcomCategoriesTreeRes';
  CategoryName?: Maybe<Scalars['String']>;
  Children?: Maybe<Array<Maybe<EcomCategoriesTreeRes>>>;
  Slug?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['ID']>;
};

export type EcomSetting = {
  __typename?: 'EcomSetting';
  defaultLang?: Maybe<Scalars['String']>;
  idWarehouse: Scalars['ID'];
};

export type EditDonViHanhChinhInput = {
  LoaiDonViHanhChinh?: InputMaybe<EnumLoaiDonViHanhChinh>;
  MaDonViHanhChinh?: InputMaybe<Scalars['String']>;
  MaDonViHanhChinhCapTren?: InputMaybe<Scalars['String']>;
  MaDonViHanhChinhCapTrenDayDu?: InputMaybe<Scalars['String']>;
  MacDinh?: InputMaybe<Scalars['Boolean']>;
  TenDayDu?: InputMaybe<Scalars['String']>;
  TenDonViHanhChinh?: InputMaybe<Scalars['String']>;
  TenTat?: InputMaybe<Scalars['String']>;
};

export type EmailInput = {
  email?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
};

export type EmailPagination = {
  __typename?: 'EmailPagination';
  currentPage?: Maybe<Scalars['Float']>;
  data?: Maybe<Array<Maybe<Subscriber>>>;
};

export type EmailPaginationTotal = {
  __typename?: 'EmailPaginationTotal';
  currentPage?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
  totalRows?: Maybe<Scalars['Float']>;
};

export enum EnumBlogStatus {
  Deleted = 'Deleted',
  NotPublic = 'NotPublic',
  Public = 'Public'
}

export enum EnumCategoriesStatus {
  Deleted = 'DELETED',
  Notpublic = 'NOTPUBLIC',
  Public = 'PUBLIC'
}

export enum EnumContentHistoryType {
  Blog = 'Blog',
  Page = 'Page',
  Service = 'Service'
}

export enum EnumDiscountType {
  Percent = 'PERCENT',
  Price = 'PRICE'
}

export enum EnumEcomStockModelTag {
  Hot = 'Hot',
  New = 'New'
}

export enum EnumGender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export enum EnumLanguage {
  En = 'en',
  Vi = 'vi'
}

export enum EnumLoaiDonViHanhChinh {
  QuanHuyen = 'QuanHuyen',
  TinhThanhPho = 'TinhThanhPho',
  XaPhuong = 'XaPhuong'
}

export enum EnumMailContactStatus {
  Deleted = 'Deleted',
  NotRead = 'NotRead',
  Read = 'Read'
}

export enum EnumOrderStatus {
  AwaitConfirmation = 'AWAIT_CONFIRMATION',
  Canceled = 'CANCELED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Shipping = 'SHIPPING',
  Success = 'SUCCESS'
}

export enum EnumPageStatus {
  Deleted = 'Deleted',
  NotPublic = 'NotPublic',
  Public = 'Public'
}

export enum EnumPaymentMethod {
  Cod = 'COD'
}

export enum EnumStatusAccount {
  Active = 'Active',
  Deleted = 'Deleted',
  Locked = 'Locked',
  NeedVerify = 'NeedVerify',
  ProfileNeedReview = 'ProfileNeedReview',
  ProfileReject = 'ProfileReject',
  ProfileVerified = 'ProfileVerified'
}

export enum EnumStockModelStatus {
  NotPublic = 'NotPublic',
  Public = 'Public'
}

export enum EnumSubscriberStatus {
  Canceled = 'Canceled',
  OnSubscribe = 'OnSubscribe'
}

export enum EnumTopicContact {
  GeneralEnquires = 'GeneralEnquires',
  Sale = 'Sale',
  Support = 'Support'
}

export enum EnumTypeAccount {
  Admin = 'Admin',
  Customer = 'Customer'
}

export enum EnumTypeSearch {
  Blog = 'blog',
  Product = 'product',
  Service = 'service'
}

export enum EnumTypeToken {
  Email = 'EMAIL',
  Phone = 'PHONE'
}

export type EstimonialItem = {
  __typename?: 'EstimonialItem';
  description?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
};

export type EstimonialItemInput = {
  description?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['Int']>;
};

export type FilterBlogInput = {
  fieldFilter?: InputMaybe<Scalars['String']>;
  values?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FilterEmailInput = {
  fieldFilter?: InputMaybe<Scalars['String']>;
  values?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FilterMailContactInput = {
  fieldFilter?: InputMaybe<Scalars['String']>;
  values?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FilterPageInput = {
  fieldFilter?: InputMaybe<Scalars['String']>;
  values?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FilterReportInput = {
  createdAtFrom?: InputMaybe<Scalars['Float']>;
  createdAtTo?: InputMaybe<Scalars['Float']>;
};

export type FilterServiceInput = {
  fieldFilter?: InputMaybe<Scalars['String']>;
  values?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FilterStockModelInput = {
  fieldFilter?: InputMaybe<Scalars['String']>;
  values?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type GridOption = {
  endRow?: InputMaybe<Scalars['Int']>;
  filterModel?: InputMaybe<Scalars['Any']>;
  groupKeys?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pivotCols?: InputMaybe<Array<InputMaybe<ColumnDetail>>>;
  pivotMode?: InputMaybe<Scalars['Boolean']>;
  rowGroupCols?: InputMaybe<Array<InputMaybe<ColumnDetail>>>;
  sortModel?: InputMaybe<Array<InputMaybe<SortModel>>>;
  startRow?: InputMaybe<Scalars['Int']>;
  valueCols?: InputMaybe<Array<InputMaybe<ColumnDetail>>>;
};

export type IArrProDuct = {
  count?: InputMaybe<Scalars['Int']>;
  idStockModel?: InputMaybe<Scalars['ID']>;
};

export type IDeliveryAddress = {
  companyName?: InputMaybe<Scalars['String']>;
  detailAddress?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  idCustomer: Scalars['ID'];
  isDefault?: InputMaybe<Scalars['Boolean']>;
  oldIsDefault?: InputMaybe<Scalars['Boolean']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type IOrder = {
  arrProduct?: InputMaybe<Array<InputMaybe<IArrProDuct>>>;
  idCustomer?: InputMaybe<Scalars['ID']>;
  idDeliveryAddress?: InputMaybe<Scalars['ID']>;
};

export type IdentityCard = {
  __typename?: 'IdentityCard';
  idNo?: Maybe<Scalars['String']>;
  issuedBy?: Maybe<Scalars['String']>;
  issuedOn?: Maybe<Scalars['Float']>;
  linkImg?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ImageBanner = {
  __typename?: 'ImageBanner';
  altTextImage?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  link?: Maybe<Scalars['String']>;
  linkImage?: Maybe<LinkImage>;
  nameLink?: Maybe<Scalars['String']>;
  subTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ImageBannerInput = {
  altTextImage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  link?: InputMaybe<Scalars['String']>;
  linkImage?: InputMaybe<InputLinkImage>;
  nameLink?: InputMaybe<Scalars['String']>;
  subTitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type InputContentAboutUs = {
  Content?: InputMaybe<Scalars['String']>;
  SEODescription?: InputMaybe<Scalars['String']>;
  SEOKeywords?: InputMaybe<Scalars['String']>;
  SEOTitle?: InputMaybe<Scalars['String']>;
  SEO_OGDescription?: InputMaybe<Scalars['String']>;
  SEO_OGImage?: InputMaybe<Scalars['String']>;
  SEO_OGTitle?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<EnumLanguage>;
};

export type InputContentContact = {
  SEODescription?: InputMaybe<Scalars['String']>;
  SEOKeywords?: InputMaybe<Scalars['String']>;
  SEOTitle?: InputMaybe<Scalars['String']>;
  SEO_OGDescription?: InputMaybe<Scalars['String']>;
  SEO_OGImage?: InputMaybe<Scalars['String']>;
  SEO_OGTitle?: InputMaybe<Scalars['String']>;
  detailAddress?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email?: InputMaybe<Scalars['String']>;
  googleAddress?: InputMaybe<Scalars['String']>;
  googleFrame?: InputMaybe<Scalars['String']>;
  hotline?: InputMaybe<Scalars['String']>;
  introduce?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<EnumLanguage>;
  ourAddress?: InputMaybe<Array<InputMaybe<OurAddressInput>>>;
  ourMailBox?: InputMaybe<Scalars['String']>;
  ourPhone?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  socials?: InputMaybe<Array<InputMaybe<SocialItemInput>>>;
};

export type InputContentFooter = {
  altTextLogo?: InputMaybe<Scalars['String']>;
  copyRight?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  introduceImages?: InputMaybe<Array<InputMaybe<InputLinkImage>>>;
  language?: InputMaybe<EnumLanguage>;
  linkLogo?: InputMaybe<InputLinkImage>;
  myAccount?: InputMaybe<Array<InputMaybe<InputContentMyAccount>>>;
  subscribeDescription?: InputMaybe<Scalars['String']>;
  subscribeTitle?: InputMaybe<Scalars['String']>;
  usefulLink?: InputMaybe<Array<InputMaybe<InputContentUsefulLink>>>;
};

export type InputContentHistory = {
  dataBlog?: InputMaybe<BlogHistoryInput>;
  dataPage?: InputMaybe<PageHistoryInput>;
  dataService?: InputMaybe<ServiceHistoryInput>;
  idBlog?: InputMaybe<Scalars['ID']>;
  idPage?: InputMaybe<Scalars['ID']>;
  idService?: InputMaybe<Scalars['ID']>;
  type: EnumContentHistoryType;
};

export type InputContentHomePage = {
  SEODescription?: InputMaybe<Scalars['String']>;
  SEOKeywords?: InputMaybe<Scalars['String']>;
  SEOTitle?: InputMaybe<Scalars['String']>;
  SEO_OGDescription?: InputMaybe<Scalars['String']>;
  SEO_OGImage?: InputMaybe<Scalars['String']>;
  SEO_OGTitle?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<EnumLanguage>;
  sectionBanner?: InputMaybe<ContentBannerInput>;
  sectionBestSellingProduct?: InputMaybe<ContentBestSellingProductInput>;
  sectionBlogNew?: InputMaybe<ContentBlogNewInput>;
  sectionEstimonial?: InputMaybe<ContentEstimonialInput>;
  sectionLatestProduct?: InputMaybe<ContentLatestProductInput>;
  sectionOurClient?: InputMaybe<ContentOurClientInput>;
  sectionOurPartners?: InputMaybe<ContentOurPartnersInput>;
  sectionService?: InputMaybe<ContentServiceInput>;
  sectionSlider?: InputMaybe<ContentSliderInput>;
  sectionWebIntrodution?: InputMaybe<ContentWebIntrodutionInput>;
};

export type InputContentMenu = {
  description?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<EnumLanguage>;
  linkFavicon?: InputMaybe<InputLinkImage>;
  linkLogo?: InputMaybe<InputLinkImage>;
  listMenu?: InputMaybe<Array<InputMaybe<InputMenuItem>>>;
};

export type InputContentMyAccount = {
  link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type InputContentPurchaseInfo = {
  Content?: InputMaybe<Scalars['String']>;
  SEODescription?: InputMaybe<Scalars['String']>;
  SEOKeywords?: InputMaybe<Scalars['String']>;
  SEOTitle?: InputMaybe<Scalars['String']>;
  SEO_OGDescription?: InputMaybe<Scalars['String']>;
  SEO_OGImage?: InputMaybe<Scalars['String']>;
  SEO_OGTitle?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<EnumLanguage>;
};

export type InputContentSecurity = {
  Content?: InputMaybe<Scalars['String']>;
  SEODescription?: InputMaybe<Scalars['String']>;
  SEOKeywords?: InputMaybe<Scalars['String']>;
  SEOTitle?: InputMaybe<Scalars['String']>;
  SEO_OGDescription?: InputMaybe<Scalars['String']>;
  SEO_OGImage?: InputMaybe<Scalars['String']>;
  SEO_OGTitle?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<EnumLanguage>;
};

export type InputContentUsefulLink = {
  link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type InputCreateActivationToken = {
  User_Id?: InputMaybe<Scalars['String']>;
  expiresAt?: InputMaybe<Scalars['Float']>;
  token?: InputMaybe<Scalars['String']>;
};

export type InputIdentityCard = {
  idNo?: InputMaybe<Scalars['String']>;
  issuedBy?: InputMaybe<Scalars['String']>;
  issuedOn?: InputMaybe<Scalars['Float']>;
  linkImg?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type InputLinkImage = {
  fileName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeImage>;
  url?: InputMaybe<Scalars['String']>;
};

export type InputMailContact = {
  email?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  idService?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  topic?: InputMaybe<EnumTopicContact>;
};

export type InputMenuItem = {
  children?: InputMaybe<Array<InputMaybe<InputMenuItem>>>;
  link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type InputOptionsQueryCustomer = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  user_Id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type InputOptionsQueryOrder = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  code?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  idCustomer?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  idDeliveryAddress?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  paymentMethod?: InputMaybe<Array<InputMaybe<EnumPaymentMethod>>>;
  status?: InputMaybe<Array<InputMaybe<EnumOrderStatus>>>;
};

export type InputOptionsQueryStockModel = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  code?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ecomSlug?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ecomStatus?: InputMaybe<Array<InputMaybe<EnumStockModelStatus>>>;
  idEcomCategory?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  isActive?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  isEcommerce?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
};

export type InputOptionsQueryUser = {
  Status?: InputMaybe<Array<InputMaybe<EnumStatusAccount>>>;
  TypeAccount?: InputMaybe<Array<InputMaybe<EnumTypeAccount>>>;
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  isActive?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  isDeleted?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  isLocked?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
};

export type InputOrder = {
  estimatedDeliveryAt?: InputMaybe<Scalars['Float']>;
  idCustomer?: InputMaybe<Scalars['ID']>;
  idStaff?: InputMaybe<Scalars['ID']>;
  infoDelivery?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  orderedAt?: InputMaybe<Scalars['Float']>;
  products?: InputMaybe<Array<InputMaybe<InputProducts>>>;
  shippingUnit?: InputMaybe<Scalars['String']>;
  transportFee?: InputMaybe<Scalars['Float']>;
};

export type InputProducts = {
  count?: InputMaybe<Scalars['Int']>;
  idStockModel?: InputMaybe<Scalars['ID']>;
  note?: InputMaybe<Scalars['String']>;
};

export type InputUpdateCustomer = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['Float']>;
  email?: InputMaybe<Scalars['email_String_maxLength_255_format_email_code_EMAIL_NOT_VALIDATE']>;
  fullName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<EnumGender>;
  identityCard?: InputMaybe<InputIdentityCard>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type LinkImage = {
  __typename?: 'LinkImage';
  fileName?: Maybe<Scalars['String']>;
  type?: Maybe<TypeImage>;
  url?: Maybe<Scalars['String']>;
};

export type LinkImageInput = {
  fileName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeImage>;
  url?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
  Email?: InputMaybe<Scalars['String']>;
  Password: Scalars['String'];
  Username?: InputMaybe<Scalars['String']>;
};

export type MailContact = {
  __typename?: 'MailContact';
  _id?: Maybe<Scalars['String']>;
  cardinalNumber?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  idService?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
  status?: Maybe<EnumMailContactStatus>;
  subject?: Maybe<Scalars['String']>;
  topic?: Maybe<EnumTopicContact>;
  updateAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type MailContactPagination = {
  __typename?: 'MailContactPagination';
  currentPage?: Maybe<Scalars['Float']>;
  data?: Maybe<Array<Maybe<MailContact>>>;
};

export type MailContactPaginationTotal = {
  __typename?: 'MailContactPaginationTotal';
  currentPage?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
  totalRows?: Maybe<Scalars['Float']>;
};

export type MapBlogRelated = {
  __typename?: 'MapBlogRelated';
  _id: Scalars['ID'];
  blog?: Maybe<Blog>;
  blogRelated?: Maybe<Blog>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  idBlog?: Maybe<Scalars['ID']>;
  idBlogRelated?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type MapServiceProduct = {
  __typename?: 'MapServiceProduct';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  idService?: Maybe<Scalars['ID']>;
  idStockModel?: Maybe<Scalars['ID']>;
  service?: Maybe<Service>;
  stockModel?: Maybe<StockModel>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type MapStockModelRelated = {
  __typename?: 'MapStockModelRelated';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  idStockModel?: Maybe<Scalars['ID']>;
  idStockModelRelated?: Maybe<Scalars['ID']>;
  stockModel?: Maybe<StockModel>;
  stockModelRelated?: Maybe<StockModel>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type MenuItem = {
  __typename?: 'MenuItem';
  children?: Maybe<Array<Maybe<MenuItem>>>;
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelOrder?: Maybe<Scalars['Boolean']>;
  cancelOrder2?: Maybe<Scalars['Boolean']>;
  changePassword?: Maybe<Scalars['Boolean']>;
  changePriorityBlog?: Maybe<Blog>;
  confirmFailedOrder?: Maybe<Order>;
  confirmOrder?: Maybe<Order>;
  confirmSuccessOrder?: Maybe<Order>;
  createBlog?: Maybe<Blog>;
  createContentHistory?: Maybe<ContentHistory>;
  createDeliveryAddress?: Maybe<DeliveryAddress>;
  createDonViHanhChinh?: Maybe<Dm_DonViHanhChinh>;
  createEcomCategories?: Maybe<EcomCategories>;
  createLatestProductById?: Maybe<StockModel>;
  createMailContact?: Maybe<MailContact>;
  createMapBlogRelated?: Maybe<Array<Maybe<MapBlogRelated>>>;
  createMapServiceProduct?: Maybe<Array<Maybe<MapServiceProduct>>>;
  createMapStockModelRelated?: Maybe<Array<Maybe<MapStockModelRelated>>>;
  createNode?: Maybe<Node>;
  createOrUpdateContentAboutUs?: Maybe<ContentAboutUs>;
  createOrUpdateContentContact?: Maybe<ContentContact>;
  createOrUpdateContentFooter?: Maybe<ContentFooter>;
  createOrUpdateContentHomePage?: Maybe<ContentHomePage>;
  createOrUpdateContentMenu?: Maybe<ContentMenu>;
  createOrUpdateContentPurchaseInfo?: Maybe<ContentPurchaseInfo>;
  createOrUpdateContentSecurity?: Maybe<ContentSecurity>;
  createOrder?: Maybe<Scalars['Boolean']>;
  createOrder2?: Maybe<Order>;
  createPage?: Maybe<Page>;
  createService?: Maybe<Service>;
  createStaff?: Maybe<Scalars['Boolean']>;
  createStockModel?: Maybe<StockModel>;
  /** admin create user */
  createUser?: Maybe<User>;
  createUserTypeAdmin?: Maybe<User>;
  deleteBlog?: Maybe<Blog>;
  deleteContentHistory?: Maybe<Scalars['Boolean']>;
  deleteDeliveryAddress?: Maybe<Scalars['Boolean']>;
  deleteDonViHanhChinh?: Maybe<Scalars['Boolean']>;
  deleteLatestProductById?: Maybe<StockModel>;
  deleteMailContact?: Maybe<MailContact>;
  deleteNode?: Maybe<Scalars['Boolean']>;
  deletePage?: Maybe<Page>;
  deleteService?: Maybe<Service>;
  deleteStockModel?: Maybe<StockModel>;
  deleteUsers?: Maybe<Scalars['Boolean']>;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  importFileStockModel?: Maybe<Scalars['Boolean']>;
  publicBlog?: Maybe<Blog>;
  register?: Maybe<User>;
  removeEcomCategories?: Maybe<Scalars['Boolean']>;
  removeMapServiceProduct?: Maybe<Scalars['Boolean']>;
  removeStaff?: Maybe<Scalars['Boolean']>;
  renameVersion?: Maybe<Scalars['Boolean']>;
  renewPassword?: Maybe<Scalars['Boolean']>;
  sendVerifyMail?: Maybe<Scalars['Boolean']>;
  shipOrder?: Maybe<Scalars['Boolean']>;
  subscribeEmail?: Maybe<Subscriber>;
  unChangePriorityMultiBlog?: Maybe<Array<Maybe<Blog>>>;
  unSubscribeEmail?: Maybe<Subscriber>;
  updateBlog?: Maybe<Blog>;
  updateCancelPublicCategories?: Maybe<Scalars['Boolean']>;
  updateCustomer?: Maybe<Customer>;
  updateDeliveryAddress?: Maybe<Scalars['Boolean']>;
  updateDonViHanhChinh?: Maybe<Scalars['Boolean']>;
  updateEcomCategories?: Maybe<EcomCategories>;
  updateFeatureBlog?: Maybe<Blog>;
  updateNode?: Maybe<Node>;
  updateOrder2?: Maybe<Order>;
  updateOrderStatus?: Maybe<Scalars['Boolean']>;
  updatePage?: Maybe<Page>;
  updateService?: Maybe<Service>;
  updateSettingType?: Maybe<Setting>;
  updateStaff?: Maybe<Scalars['Boolean']>;
  updateStatusUsers?: Maybe<Scalars['Boolean']>;
  updateStockModel?: Maybe<StockModel>;
  updateUser?: Maybe<User>;
  updateUserOverride?: Maybe<User>;
  updateUsersOverride?: Maybe<Scalars['Boolean']>;
  verifyAccount?: Maybe<Scalars['Boolean']>;
};


export type MutationCancelOrderArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<Scalars['String']>;
};


export type MutationCancelOrder2Args = {
  _id: Scalars['ID'];
  reasonCancel?: InputMaybe<Scalars['String']>;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationChangePriorityBlogArgs = {
  _id: Scalars['ID'];
};


export type MutationConfirmFailedOrderArgs = {
  id: Scalars['ID'];
  reasonFailed?: InputMaybe<Scalars['String']>;
};


export type MutationConfirmOrderArgs = {
  id: Scalars['ID'];
};


export type MutationConfirmSuccessOrderArgs = {
  id: Scalars['ID'];
};


export type MutationCreateBlogArgs = {
  idsBlogRelated?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  input: BlogInput;
};


export type MutationCreateContentHistoryArgs = {
  input: InputContentHistory;
};


export type MutationCreateDeliveryAddressArgs = {
  input: IDeliveryAddress;
};


export type MutationCreateDonViHanhChinhArgs = {
  donViHanhChinh: NewDonViHanhChinhInput;
};


export type MutationCreateEcomCategoriesArgs = {
  input: EcomCategoriesInput;
};


export type MutationCreateLatestProductByIdArgs = {
  idStockModel: Scalars['ID'];
};


export type MutationCreateMailContactArgs = {
  input: InputMailContact;
};


export type MutationCreateMapBlogRelatedArgs = {
  idBlog: Scalars['ID'];
  idsBlogRelated: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationCreateMapServiceProductArgs = {
  idService: Scalars['ID'];
  idsStockModel: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationCreateMapStockModelRelatedArgs = {
  idStockModel: Scalars['ID'];
  idsStockModelRelated: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationCreateNodeArgs = {
  newNodeInput: NodeInput;
};


export type MutationCreateOrUpdateContentAboutUsArgs = {
  input: InputContentAboutUs;
  language: EnumLanguage;
};


export type MutationCreateOrUpdateContentContactArgs = {
  input: InputContentContact;
};


export type MutationCreateOrUpdateContentFooterArgs = {
  input: InputContentFooter;
};


export type MutationCreateOrUpdateContentHomePageArgs = {
  input: InputContentHomePage;
};


export type MutationCreateOrUpdateContentMenuArgs = {
  input: InputContentMenu;
};


export type MutationCreateOrUpdateContentPurchaseInfoArgs = {
  input: InputContentPurchaseInfo;
  language: EnumLanguage;
};


export type MutationCreateOrUpdateContentSecurityArgs = {
  input: InputContentSecurity;
  language: EnumLanguage;
};


export type MutationCreateOrderArgs = {
  input: IOrder;
};


export type MutationCreateOrder2Args = {
  input: InputOrder;
};


export type MutationCreatePageArgs = {
  input: PageInput;
};


export type MutationCreateServiceArgs = {
  input: ServiceInput;
};


export type MutationCreateStaffArgs = {
  input: StaffInput;
};


export type MutationCreateStockModelArgs = {
  idsStockModelRelated?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  input: StockModelInput;
};


export type MutationCreateUserArgs = {
  input: NewUserInfo;
  language?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUserTypeAdminArgs = {
  input?: InputMaybe<NewUserInfo>;
  language?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteBlogArgs = {
  _id: Scalars['ID'];
};


export type MutationDeleteContentHistoryArgs = {
  _id: Scalars['ID'];
};


export type MutationDeleteDeliveryAddressArgs = {
  idDeliveryAddress: Scalars['ID'];
};


export type MutationDeleteDonViHanhChinhArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type MutationDeleteLatestProductByIdArgs = {
  idStockModel: Scalars['ID'];
};


export type MutationDeleteMailContactArgs = {
  _id: Scalars['ID'];
};


export type MutationDeleteNodeArgs = {
  _id: Scalars['ID'];
};


export type MutationDeletePageArgs = {
  _id: Scalars['ID'];
};


export type MutationDeleteServiceArgs = {
  _id: Scalars['ID'];
};


export type MutationDeleteStockModelArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteUsersArgs = {
  idUsers: Array<Scalars['ID']>;
};


export type MutationForgotPasswordArgs = {
  Email: Scalars['String'];
  language?: InputMaybe<Scalars['String']>;
};


export type MutationImportFileStockModelArgs = {
  input: Array<StockModelInput>;
};


export type MutationPublicBlogArgs = {
  _id: Scalars['ID'];
};


export type MutationRegisterArgs = {
  input: NewUserInfo;
  isAutoActive?: InputMaybe<Scalars['Boolean']>;
  isResponseCookie?: InputMaybe<Scalars['Boolean']>;
  language?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveEcomCategoriesArgs = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
};


export type MutationRemoveMapServiceProductArgs = {
  idService: Scalars['ID'];
  idsStockModel: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationRemoveStaffArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationRenameVersionArgs = {
  _id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationRenewPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSendVerifyMailArgs = {
  email: Scalars['String'];
};


export type MutationShipOrderArgs = {
  _id: Scalars['ID'];
  input?: InputMaybe<Scalars['String']>;
};


export type MutationSubscribeEmailArgs = {
  input: EmailInput;
};


export type MutationUnChangePriorityMultiBlogArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type MutationUnSubscribeEmailArgs = {
  _id: Scalars['ID'];
};


export type MutationUpdateBlogArgs = {
  _id: Scalars['ID'];
  idsBlogRelated?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  input: BlogInput;
};


export type MutationUpdateCancelPublicCategoriesArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCustomerArgs = {
  input: InputUpdateCustomer;
  user_Id: Scalars['ID'];
};


export type MutationUpdateDeliveryAddressArgs = {
  idDeliveryAddress: Scalars['ID'];
  input: IDeliveryAddress;
};


export type MutationUpdateDonViHanhChinhArgs = {
  donViHanhChinh: EditDonViHanhChinhInput;
  id: Scalars['ID'];
};


export type MutationUpdateEcomCategoriesArgs = {
  id: Scalars['ID'];
  input: EcomCategoriesInput;
};


export type MutationUpdateFeatureBlogArgs = {
  _id: Scalars['ID'];
};


export type MutationUpdateNodeArgs = {
  _id: Scalars['ID'];
  updateNodeInput: NodeInput;
};


export type MutationUpdateOrder2Args = {
  _id: Scalars['ID'];
  input?: InputMaybe<InputOrder>;
};


export type MutationUpdateOrderStatusArgs = {
  _ids: Array<Scalars['ID']>;
  newStatus: EnumOrderStatus;
  oldStatus: EnumOrderStatus;
};


export type MutationUpdatePageArgs = {
  _id: Scalars['ID'];
  input: PageInput;
};


export type MutationUpdateServiceArgs = {
  _id: Scalars['ID'];
  input: ServiceInput;
};


export type MutationUpdateSettingTypeArgs = {
  input?: InputMaybe<Scalars['Scalar']>;
  type?: InputMaybe<SettingType>;
};


export type MutationUpdateStaffArgs = {
  id: Scalars['ID'];
  input: StaffInput;
};


export type MutationUpdateStatusUsersArgs = {
  _ids?: InputMaybe<Array<Scalars['ID']>>;
  newStatus?: InputMaybe<EnumStatusAccount>;
  oldStatus?: InputMaybe<EnumStatusAccount>;
};


export type MutationUpdateStockModelArgs = {
  _id: Scalars['String'];
  idsStockModelRelated?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  input: StockModelInput;
};


export type MutationUpdateUserArgs = {
  idUser: Scalars['ID'];
  input: NeedUpdateInfo;
};


export type MutationUpdateUserOverrideArgs = {
  idUser: Scalars['ID'];
  input: NeedOverrideInfo;
};


export type MutationUpdateUsersOverrideArgs = {
  idUsers: Array<Scalars['ID']>;
  input: NeedOverrideInfo;
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
};

export type NeedOverrideInfo = {
  confirmNewPassword?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  isLocked?: InputMaybe<Scalars['Boolean']>;
  newPassword?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type NeedUpdateInfo = {
  code?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  idProfiles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  note?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type NewDonViHanhChinhInput = {
  LoaiDonViHanhChinh: EnumLoaiDonViHanhChinh;
  MaDonViHanhChinh: Scalars['String'];
  MaDonViHanhChinhCapTren: Scalars['String'];
  MaDonViHanhChinhCapTrenDayDu: Scalars['String'];
  MacDinh?: InputMaybe<Scalars['Boolean']>;
  TenDayDu: Scalars['String'];
  TenDonViHanhChinh: Scalars['String'];
  TenTat?: InputMaybe<Scalars['String']>;
};

export type NewUserInfo = {
  displayName?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Node = {
  __typename?: 'Node';
  _id: Scalars['ID'];
  canSale: Scalars['Boolean'];
  code: Scalars['String'];
  codeCounter?: Maybe<Scalars['String']>;
  codeEndCounter?: Maybe<Scalars['String']>;
  codeEndSubQueue?: Maybe<Scalars['String']>;
  codeHealthFacility?: Maybe<Scalars['String']>;
  codeNextQueue?: Maybe<Scalars['String']>;
  codeNextSubQueue?: Maybe<Scalars['String']>;
  codeQueue?: Maybe<Scalars['String']>;
  codeSubQueue?: Maybe<Scalars['String']>;
  detailAddress?: Maybe<Scalars['String']>;
  idAccountingObject: Scalars['ID'];
  idParent?: Maybe<Scalars['ID']>;
  idPlace?: Maybe<Scalars['ID']>;
  idSpecialist?: Maybe<Scalars['String']>;
  isKhoTuTruc?: Maybe<Scalars['Boolean']>;
  isStoreForHealthInsurance?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  namePrint?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
};

export type NodeInput = {
  canSale?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<Scalars['ID']>;
  code: Scalars['String'];
  codeCounter?: InputMaybe<Scalars['String']>;
  codeEndCounter?: InputMaybe<Scalars['String']>;
  codeEndSubQueue?: InputMaybe<Scalars['String']>;
  codeHealthFacility?: InputMaybe<Scalars['String']>;
  codeNextQueue?: InputMaybe<Scalars['String']>;
  codeNextSubQueue?: InputMaybe<Scalars['String']>;
  codeQueue?: InputMaybe<Scalars['String']>;
  codeSubQueue?: InputMaybe<Scalars['String']>;
  detailAddress?: InputMaybe<Scalars['String']>;
  idAccountingObject?: InputMaybe<Scalars['ID']>;
  idParent?: InputMaybe<Scalars['ID']>;
  idPlace?: InputMaybe<Scalars['ID']>;
  idSpecialist?: InputMaybe<Scalars['String']>;
  isKhoTuTruc?: InputMaybe<Scalars['Boolean']>;
  isStoreForHealthInsurance?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  namePrint?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  taxCode?: InputMaybe<Scalars['String']>;
};

export type NodeTree = {
  __typename?: 'NodeTree';
  _id: Scalars['ID'];
  canSale?: Maybe<Scalars['Boolean']>;
  children?: Maybe<Scalars['JSON']>;
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  detailAddress?: Maybe<Scalars['String']>;
  expanded?: Maybe<Scalars['Boolean']>;
  idParent?: Maybe<Scalars['ID']>;
  idSpecialist?: Maybe<Scalars['String']>;
  isChildrenNode?: Maybe<Scalars['Boolean']>;
  isKhoTuTruc?: Maybe<Scalars['Boolean']>;
  isStoreForHealthInsurance?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<TypeNodeEnum>;
  updatedAt?: Maybe<Scalars['Float']>;
};

export type Order = {
  __typename?: 'Order';
  _id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  customer?: Maybe<Customer>;
  customerCancelAt?: Maybe<Scalars['Float']>;
  customerCancelBy?: Maybe<UserSlim>;
  customerReasonCancel?: Maybe<Scalars['String']>;
  deliveryAddress?: Maybe<DeliveryAddress>;
  deliveryAt?: Maybe<Scalars['Float']>;
  estimatedDeliveryAt?: Maybe<Scalars['Float']>;
  failedAt?: Maybe<Scalars['Float']>;
  failedBy?: Maybe<UserSlim>;
  idCustomer?: Maybe<Scalars['ID']>;
  idDeliveryAddress?: Maybe<Scalars['ID']>;
  idStaff?: Maybe<Scalars['ID']>;
  note?: Maybe<Scalars['String']>;
  orderDetail?: Maybe<Array<Maybe<OrderDetail>>>;
  orderedAt?: Maybe<Scalars['Float']>;
  paymentMethod?: Maybe<EnumPaymentMethod>;
  reasonCancel?: Maybe<Scalars['String']>;
  reasonFailed?: Maybe<Scalars['String']>;
  shippingUnit?: Maybe<Scalars['String']>;
  staff?: Maybe<Staff>;
  status?: Maybe<EnumOrderStatus>;
  transportFee?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type OrderDetail = {
  __typename?: 'OrderDetail';
  _id: Scalars['ID'];
  count?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  discountType?: Maybe<EnumDiscountType>;
  discountValue?: Maybe<Scalars['Float']>;
  idOrder: Scalars['ID'];
  idStockModel: Scalars['ID'];
  isFree?: Maybe<Scalars['Boolean']>;
  note?: Maybe<Scalars['String']>;
  quantity?: Maybe<Array<Maybe<Scalars['Float']>>>;
  quantityString?: Maybe<Scalars['String']>;
  salePrice?: Maybe<Array<Maybe<Scalars['Float']>>>;
  stockModel?: Maybe<StockModel>;
  total?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type OrdersWithPaginate = {
  __typename?: 'OrdersWithPaginate';
  orders?: Maybe<Array<Maybe<Order>>>;
  pageInfo?: Maybe<PaginationInfo>;
  totalRows?: Maybe<Scalars['Float']>;
};

export type OurAddress = {
  __typename?: 'OurAddress';
  address?: Maybe<Scalars['String']>;
  googleAddress?: Maybe<Scalars['String']>;
  googleFrameAddress?: Maybe<Scalars['String']>;
};

export type OurAddressInput = {
  address?: InputMaybe<Scalars['String']>;
  googleAddress?: InputMaybe<Scalars['String']>;
  googleFrameAddress?: InputMaybe<Scalars['String']>;
};

export type OurClient = {
  __typename?: 'OurClient';
  avatar?: Maybe<LinkImage>;
  fullName?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  profession?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
};

export type OurClientInput = {
  avatar?: InputMaybe<InputLinkImage>;
  fullName?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  profession?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
};

export type Page = {
  __typename?: 'Page';
  _id: Scalars['ID'];
  cardinalNumber?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  description?: Maybe<Scalars['String']>;
  isAddToFooterMenu?: Maybe<Scalars['Boolean']>;
  isAddToMainMenu?: Maybe<Scalars['Boolean']>;
  keywords?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  status?: Maybe<EnumPageStatus>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
  url?: Maybe<Scalars['String']>;
};

export type PageHistoryInput = {
  _id?: InputMaybe<Scalars['ID']>;
  content?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  createdBy?: InputMaybe<UserSlimInput>;
  deletedAt?: InputMaybe<Scalars['Float']>;
  deletedBy?: InputMaybe<UserSlimInput>;
  description?: InputMaybe<Scalars['String']>;
  isAddToFooterMenu?: InputMaybe<Scalars['Boolean']>;
  isAddToMainMenu?: InputMaybe<Scalars['Boolean']>;
  keywords?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<EnumPageStatus>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
  updatedBy?: InputMaybe<UserSlimInput>;
};

export type PageInput = {
  content?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  isAddToFooterMenu?: InputMaybe<Scalars['Boolean']>;
  isAddToMainMenu?: InputMaybe<Scalars['Boolean']>;
  keywords?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PagePagination = {
  __typename?: 'PagePagination';
  currentPage?: Maybe<Scalars['Float']>;
  data?: Maybe<Array<Maybe<Page>>>;
};

export type PagePaginationTotal = {
  __typename?: 'PagePaginationTotal';
  currentPage?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
  totalRows?: Maybe<Scalars['Float']>;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  currentPage?: Maybe<Scalars['Int']>;
  sizePage?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
  totalRows?: Maybe<Scalars['Int']>;
};

export type PartnerImage = {
  __typename?: 'PartnerImage';
  altTextImage?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  link?: Maybe<Scalars['String']>;
  linkImage?: Maybe<LinkImage>;
  title?: Maybe<Scalars['String']>;
};

export type PartnerImageInput = {
  altTextImage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  link?: InputMaybe<Scalars['String']>;
  linkImage?: InputMaybe<InputLinkImage>;
  title?: InputMaybe<Scalars['String']>;
};

export type ProfileInfo = {
  __typename?: 'ProfileInfo';
  _id?: Maybe<Scalars['ID']>;
  grantedAt?: Maybe<Scalars['Float']>;
  grantedBy?: Maybe<UserSlim>;
  idProfile?: Maybe<Scalars['ID']>;
};

export type QuantityOrderForType = {
  __typename?: 'QuantityOrderForType';
  quantity?: Maybe<Scalars['Float']>;
  type?: Maybe<EnumOrderStatus>;
};

export type Query = {
  __typename?: 'Query';
  appInfo?: Maybe<AppInfo>;
  findDonViHanhChinh?: Maybe<Array<Maybe<Dm_DonViHanhChinh>>>;
  findOneDonViHanhChinh?: Maybe<Dm_DonViHanhChinh>;
  getAllDonViHanhChinh?: Maybe<Array<Maybe<Dm_DonViHanhChinh>>>;
  getAllEmailOnSubs?: Maybe<Array<Maybe<Subscriber>>>;
  getBlogById?: Maybe<Blog>;
  getBlogBySlug?: Maybe<Blog>;
  getBlogPagination?: Maybe<BlogPagination>;
  getBlogPaginationTotal?: Maybe<BlogPaginationTotal>;
  getBlogs?: Maybe<Array<Maybe<Blog>>>;
  getContentAboutUs?: Maybe<ContentAboutUs>;
  getContentContact?: Maybe<ContentContact>;
  getContentFooter?: Maybe<ContentFooter>;
  getContentHistory?: Maybe<Array<Maybe<ContentHistory>>>;
  getContentHomePage?: Maybe<ContentHomePage>;
  getContentMenu?: Maybe<ContentMenu>;
  getContentPurchaseInfo?: Maybe<ContentPurchaseInfo>;
  getContentSecurity?: Maybe<ContentSecurity>;
  getCustomerById?: Maybe<Customer>;
  getCustomers?: Maybe<Array<Maybe<Customer>>>;
  getDefaultDeliveryAddress?: Maybe<DeliveryAddress>;
  getDeliveryAddress?: Maybe<DeliveryAddress>;
  getDeliveryAddressesByIdCustomer?: Maybe<Array<Maybe<DeliveryAddress>>>;
  getEcomCategoriesById?: Maybe<EcomCategories>;
  getEcomCategoriesBySlug?: Maybe<EcomCategories>;
  getEcomCategoriesHasParent?: Maybe<Array<Maybe<EcomCategoriesRes>>>;
  getEcomCategoriesPagination?: Maybe<EcomCategoriesPagination>;
  getEcomCategoriesPaginationTotal?: Maybe<EcomCategoriesPaginationTotal>;
  getEcomCategoriesTree?: Maybe<Array<Maybe<EcomCategoriesTreeRes>>>;
  getEmailOnSubsPagination?: Maybe<EmailPagination>;
  getEmailOnSubsPaginationTotal?: Maybe<EmailPaginationTotal>;
  getMailContactPagination?: Maybe<MailContactPagination>;
  getMailContactPaginationTotal?: Maybe<MailContactPaginationTotal>;
  getMailContacts?: Maybe<Array<Maybe<MailContact>>>;
  getMapBlogRelateds?: Maybe<Array<Maybe<MapBlogRelated>>>;
  getMapBlogRelatedsByBlog?: Maybe<Array<Maybe<MapBlogRelated>>>;
  getMapServiceProducts?: Maybe<Array<Maybe<MapServiceProduct>>>;
  getMapServiceProductsByService?: Maybe<Array<Maybe<MapServiceProduct>>>;
  getMapStockModelRelateds?: Maybe<Array<Maybe<MapStockModelRelated>>>;
  getMapStockModelRelatedsByStockModel?: Maybe<Array<Maybe<MapStockModelRelated>>>;
  getMultipleStaff?: Maybe<Array<Maybe<Staff>>>;
  getNodeById?: Maybe<Node>;
  getNodeTree?: Maybe<Array<Maybe<NodeTree>>>;
  getNodes?: Maybe<Array<Maybe<Node>>>;
  getOrderById?: Maybe<Order>;
  getOrderInfo?: Maybe<Array<Maybe<Order>>>;
  getPageById?: Maybe<Page>;
  getPageBySlug?: Maybe<Page>;
  getPagePagination?: Maybe<PagePagination>;
  getPagePaginationTotal?: Maybe<PagePaginationTotal>;
  getPages?: Maybe<Array<Maybe<Page>>>;
  getQuantityOderForType?: Maybe<Array<Maybe<QuantityOrderForType>>>;
  getRandomStockModels?: Maybe<Array<Maybe<StockModel>>>;
  getRelatedProducts?: Maybe<Array<Maybe<StockModel>>>;
  getServiceById?: Maybe<Service>;
  getServiceBySlug?: Maybe<Service>;
  getServicePagination?: Maybe<ServicePagination>;
  getServicePaginationTotal?: Maybe<ServicePaginationTotal>;
  getServices?: Maybe<Array<Maybe<Service>>>;
  getSetting?: Maybe<Setting>;
  getStaffPagination?: Maybe<StaffPagination>;
  getStaffPaginationTotal?: Maybe<StaffPaginationTotal>;
  getStockModelById?: Maybe<StockModel>;
  getStockModelBySlugEcomCategoryPagination?: Maybe<StockModelPagination>;
  getStockModelBySlugEcomCategoryPaginationTotal?: Maybe<StockModelPaginationTotal>;
  getStockModelBySlugProduct?: Maybe<StockModel>;
  getStockModelPagination?: Maybe<StockModelPagination>;
  getStockModelPaginationTotal?: Maybe<StockModelPaginationTotal>;
  getStockModels?: Maybe<Array<Maybe<StockModel>>>;
  getStocks?: Maybe<Array<Maybe<Stock>>>;
  getUsersTypeAdmin?: Maybe<Array<Maybe<User>>>;
  hello?: Maybe<Scalars['String']>;
  login?: Maybe<AuthenticationInfo>;
  loginAdmin?: Maybe<AuthenticationInfo>;
  logout?: Maybe<Scalars['Boolean']>;
  logoutAdmin?: Maybe<Scalars['Boolean']>;
  myInfo?: Maybe<UserResponse>;
  ordersWithPaginate?: Maybe<OrdersWithPaginate>;
  reportRevenue?: Maybe<ReportRevenueResponse>;
  reportTotalOrder?: Maybe<ReportTotalOrderResponse>;
  searchByType?: Maybe<SearchResultResponse>;
  searchDM_DonViHanhChinh?: Maybe<Array<Maybe<Dm_DonViHanhChinh>>>;
  searchEcomCategoriesChild?: Maybe<Array<Maybe<EcomCategories>>>;
  searchStaff?: Maybe<Array<Maybe<Staff>>>;
  searchUser?: Maybe<Array<Maybe<User>>>;
  searchUserNotHaveStaff?: Maybe<Array<Maybe<User>>>;
  staff?: Maybe<Staff>;
  staffs?: Maybe<Array<Maybe<Staff>>>;
  stockModels?: Maybe<Array<Maybe<StockModel>>>;
  usersWithPaginate?: Maybe<UsersWithPaginate>;
};


export type QueryFindDonViHanhChinhArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type QueryFindOneDonViHanhChinhArgs = {
  id: Scalars['ID'];
};


export type QueryGetBlogByIdArgs = {
  _id: Scalars['ID'];
};


export type QueryGetBlogBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetBlogPaginationArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterBlogInput>>>;
  idsDefault?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchBlogInput>>>;
  sort?: InputMaybe<Array<InputMaybe<SortBlogInput>>>;
};


export type QueryGetBlogPaginationTotalArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterBlogInput>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchBlogInput>>>;
};


export type QueryGetContentAboutUsArgs = {
  language?: InputMaybe<EnumLanguage>;
};


export type QueryGetContentContactArgs = {
  language: EnumLanguage;
};


export type QueryGetContentFooterArgs = {
  language: EnumLanguage;
};


export type QueryGetContentHistoryArgs = {
  idContent: Scalars['String'];
  type: EnumContentHistoryType;
};


export type QueryGetContentHomePageArgs = {
  language: EnumLanguage;
};


export type QueryGetContentMenuArgs = {
  language: EnumLanguage;
};


export type QueryGetContentPurchaseInfoArgs = {
  language?: InputMaybe<EnumLanguage>;
};


export type QueryGetContentSecurityArgs = {
  language?: InputMaybe<EnumLanguage>;
};


export type QueryGetCustomerByIdArgs = {
  _id: Scalars['ID'];
};


export type QueryGetDefaultDeliveryAddressArgs = {
  idCustomer: Scalars['String'];
};


export type QueryGetDeliveryAddressArgs = {
  idDeliveryAddress: Scalars['String'];
};


export type QueryGetDeliveryAddressesByIdCustomerArgs = {
  idCustomer: Scalars['ID'];
};


export type QueryGetEcomCategoriesByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetEcomCategoriesBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetEcomCategoriesHasParentArgs = {
  Status?: InputMaybe<EnumCategoriesStatus>;
};


export type QueryGetEcomCategoriesPaginationArgs = {
  filterInput?: InputMaybe<Array<InputMaybe<EcomCategoriesFilter>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  searchInput?: InputMaybe<Array<InputMaybe<EcomCategoriesSearch>>>;
  sortInput?: InputMaybe<Array<InputMaybe<EcomCategoriesSort>>>;
};


export type QueryGetEcomCategoriesPaginationTotalArgs = {
  filterInput?: InputMaybe<Array<InputMaybe<EcomCategoriesFilter>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  searchInput?: InputMaybe<Array<InputMaybe<EcomCategoriesSearch>>>;
};


export type QueryGetEmailOnSubsPaginationArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterEmailInput>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchEmailInput>>>;
  sort?: InputMaybe<Array<InputMaybe<SortEmailInput>>>;
};


export type QueryGetEmailOnSubsPaginationTotalArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterEmailInput>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchEmailInput>>>;
};


export type QueryGetMailContactPaginationArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterMailContactInput>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchMailContactInput>>>;
  sort?: InputMaybe<Array<InputMaybe<SortMailContactInput>>>;
};


export type QueryGetMailContactPaginationTotalArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterMailContactInput>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchMailContactInput>>>;
};


export type QueryGetMapBlogRelatedsByBlogArgs = {
  idBlog: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetMapServiceProductsByServiceArgs = {
  idService: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetMapStockModelRelatedsByStockModelArgs = {
  idStockModel: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetMultipleStaffArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryGetNodeByIdArgs = {
  _id: Scalars['ID'];
};


export type QueryGetOrderByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetOrderInfoArgs = {
  idCustomer?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<EnumOrderStatus>;
};


export type QueryGetPageByIdArgs = {
  _id: Scalars['ID'];
};


export type QueryGetPageBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetPagePaginationArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterPageInput>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchPageInput>>>;
  sort?: InputMaybe<Array<InputMaybe<SortPageInput>>>;
};


export type QueryGetPagePaginationTotalArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterPageInput>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchPageInput>>>;
};


export type QueryGetRandomStockModelsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetRelatedProductsArgs = {
  ecomSlug: Scalars['String'];
  productSlug: Scalars['String'];
};


export type QueryGetServiceByIdArgs = {
  _id: Scalars['ID'];
};


export type QueryGetServiceBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetServicePaginationArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterServiceInput>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchServiceInput>>>;
  sort?: InputMaybe<Array<InputMaybe<SortServiceInput>>>;
};


export type QueryGetServicePaginationTotalArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterServiceInput>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchServiceInput>>>;
};


export type QueryGetStaffPaginationArgs = {
  filterInput?: InputMaybe<Array<InputMaybe<EcomCategoriesFilter>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  searchInput?: InputMaybe<Array<InputMaybe<EcomCategoriesSearch>>>;
  sortInput?: InputMaybe<Array<InputMaybe<EcomCategoriesSort>>>;
};


export type QueryGetStaffPaginationTotalArgs = {
  filterInput?: InputMaybe<Array<InputMaybe<EcomCategoriesFilter>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  searchInput?: InputMaybe<Array<InputMaybe<EcomCategoriesSearch>>>;
};


export type QueryGetStockModelByIdArgs = {
  _id: Scalars['ID'];
};


export type QueryGetStockModelBySlugEcomCategoryPaginationArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterStockModelInput>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchStockModelInput>>>;
  sort?: InputMaybe<Array<InputMaybe<SortStockModelInput>>>;
};


export type QueryGetStockModelBySlugEcomCategoryPaginationTotalArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterStockModelInput>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchStockModelInput>>>;
};


export type QueryGetStockModelBySlugProductArgs = {
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryGetStockModelPaginationArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterStockModelInput>>>;
  idsDefault?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchStockModelInput>>>;
  sort?: InputMaybe<Array<InputMaybe<SortStockModelInput>>>;
};


export type QueryGetStockModelPaginationTotalArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterStockModelInput>>>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchStockModelInput>>>;
};


export type QueryLoginArgs = {
  info: LoginInput;
};


export type QueryLoginAdminArgs = {
  info: LoginInput;
};


export type QueryOrdersWithPaginateArgs = {
  filterOptions?: InputMaybe<InputOptionsQueryOrder>;
  gridOptions?: InputMaybe<GridOption>;
};


export type QueryReportRevenueArgs = {
  filter?: InputMaybe<FilterReportInput>;
};


export type QueryReportTotalOrderArgs = {
  filter?: InputMaybe<FilterReportInput>;
};


export type QuerySearchByTypeArgs = {
  key: Scalars['String'];
  type: EnumTypeSearch;
};


export type QuerySearchDm_DonViHanhChinhArgs = {
  idDefault?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  searchString: Scalars['String'];
};


export type QuerySearchEcomCategoriesChildArgs = {
  Status?: InputMaybe<EnumCategoriesStatus>;
  keyWord?: InputMaybe<Scalars['String']>;
};


export type QuerySearchStaffArgs = {
  MaChucVu?: InputMaybe<Scalars['String']>;
  idDefault?: InputMaybe<Scalars['ID']>;
  idDefaults?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  keyWord?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchUserArgs = {
  idDefault?: InputMaybe<Scalars['ID']>;
  keyword?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchUserNotHaveStaffArgs = {
  idDefault?: InputMaybe<Scalars['ID']>;
  isUpdate?: InputMaybe<Scalars['Boolean']>;
  keyword?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryStaffArgs = {
  id: Scalars['ID'];
};


export type QueryStockModelsArgs = {
  filterOptions?: InputMaybe<InputOptionsQueryStockModel>;
};


export type QueryUsersWithPaginateArgs = {
  filterOptions?: InputMaybe<InputOptionsQueryUser>;
  gridOptions?: InputMaybe<GridOption>;
};

export type ReportRevenueResponse = {
  __typename?: 'ReportRevenueResponse';
  totalRevenue?: Maybe<Scalars['Float']>;
};

export type ReportTotalOrderResponse = {
  __typename?: 'ReportTotalOrderResponse';
  totalOrderForType?: Maybe<Array<Maybe<TotalOrderForType>>>;
  totalQuantity?: Maybe<Scalars['Float']>;
};

export type SearchBlogInput = {
  fieldSearch?: InputMaybe<Scalars['String']>;
  textSearch?: InputMaybe<Scalars['String']>;
};

export type SearchEmailInput = {
  fieldSearch?: InputMaybe<Scalars['String']>;
  textSearch?: InputMaybe<Scalars['String']>;
};

export type SearchMailContactInput = {
  fieldSearch?: InputMaybe<Scalars['String']>;
  textSearch?: InputMaybe<Scalars['String']>;
};

export type SearchPageInput = {
  fieldSearch?: InputMaybe<Scalars['String']>;
  textSearch?: InputMaybe<Scalars['String']>;
};

export type SearchResultResponse = {
  __typename?: 'SearchResultResponse';
  blog?: Maybe<Array<Maybe<Blog>>>;
  service?: Maybe<Array<Maybe<Service>>>;
  stockModel?: Maybe<Array<Maybe<StockModel>>>;
  type?: Maybe<EnumTypeSearch>;
};

export type SearchServiceInput = {
  fieldSearch?: InputMaybe<Scalars['String']>;
  textSearch?: InputMaybe<Scalars['String']>;
};

export type SearchStockModelInput = {
  fieldSearch?: InputMaybe<Scalars['String']>;
  textSearch?: InputMaybe<Scalars['String']>;
};

export type Service = {
  __typename?: 'Service';
  _id: Scalars['ID'];
  cardinalNumber?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  desciption?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  keywords?: Maybe<Scalars['String']>;
  mainPhoto?: Maybe<LinkImage>;
  slug?: Maybe<Scalars['String']>;
  sortDescription?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
  url?: Maybe<Scalars['String']>;
};

export type ServiceHistoryInput = {
  _id?: InputMaybe<Scalars['ID']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  createdBy?: InputMaybe<UserSlimInput>;
  deletedAt?: InputMaybe<Scalars['Float']>;
  deletedBy?: InputMaybe<UserSlimInput>;
  desciption?: InputMaybe<Scalars['String']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  keywords?: InputMaybe<Scalars['String']>;
  mainPhoto?: InputMaybe<InputLinkImage>;
  slug?: InputMaybe<Scalars['String']>;
  sortDescription?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
  updatedBy?: InputMaybe<UserSlimInput>;
};

export type ServiceInput = {
  desciption?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<Scalars['String']>;
  mainPhoto?: InputMaybe<InputLinkImage>;
  slug?: InputMaybe<Scalars['String']>;
  sortDescription?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ServicePagination = {
  __typename?: 'ServicePagination';
  currentPage?: Maybe<Scalars['Float']>;
  data?: Maybe<Array<Maybe<Service>>>;
};

export type ServicePaginationTotal = {
  __typename?: 'ServicePaginationTotal';
  currentPage?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
  totalRows?: Maybe<Scalars['Float']>;
};

export type Setting = {
  __typename?: 'Setting';
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  ecommerce?: Maybe<EcomSetting>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export enum SettingType {
  Auth = 'Auth',
  Ecommerce = 'Ecommerce',
  His = 'His',
  Report = 'Report',
  Sm4 = 'Sm4'
}

export type SliderImage = {
  __typename?: 'SliderImage';
  altTextImage?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  link?: Maybe<Scalars['String']>;
  linkImage?: Maybe<LinkImage>;
  nameLink?: Maybe<Scalars['String']>;
  subTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type SliderImageInput = {
  altTextImage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  link?: InputMaybe<Scalars['String']>;
  linkImage?: InputMaybe<InputLinkImage>;
  nameLink?: InputMaybe<Scalars['String']>;
  subTitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type SocialItem = {
  __typename?: 'SocialItem';
  iconNameFooter?: Maybe<Scalars['String']>;
  iconNameHeader?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type SocialItemInput = {
  iconNameFooter?: InputMaybe<Scalars['String']>;
  iconNameHeader?: InputMaybe<Scalars['String']>;
  link?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type SortBlogInput = {
  fieldSort?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type SortEmailInput = {
  fieldSort?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type SortMailContactInput = {
  fieldSort?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type SortModel = {
  colId?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type SortPageInput = {
  fieldSort?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type SortServiceInput = {
  fieldSort?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type SortStockModelInput = {
  fieldSort?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
};

export type Staff = {
  __typename?: 'Staff';
  CMNDHoacHoChieu?: Maybe<Scalars['String']>;
  ChuKySo?: Maybe<Scalars['String']>;
  ChucDanh_Id?: Maybe<Scalars['ID']>;
  ChucVu_Id?: Maybe<Scalars['ID']>;
  ChungChiNgoai?: Maybe<Scalars['String']>;
  DanToc_Id?: Maybe<Scalars['ID']>;
  DiaChi_Id?: Maybe<Scalars['ID']>;
  DoiTuongKeToan_Id?: Maybe<Scalars['ID']>;
  Email?: Maybe<Scalars['String']>;
  GhiChu?: Maybe<Scalars['String']>;
  GiayPhepHanhNghe?: Maybe<Scalars['String']>;
  GioiTinh?: Maybe<EnumGender>;
  KhoaLamViec_Id?: Maybe<Scalars['ID']>;
  LinkAvatar?: Maybe<LinkImage>;
  MaNhanVien?: Maybe<Scalars['ID']>;
  NgaySinh?: Maybe<Scalars['Float']>;
  NgayVaoLam?: Maybe<Scalars['Float']>;
  NgheNghiep_Id?: Maybe<Scalars['ID']>;
  PhamViDichVu_Ids?: Maybe<Array<Maybe<Scalars['ID']>>>;
  PhanTramHoaHong?: Maybe<Scalars['Float']>;
  QuocTich_Id?: Maybe<Scalars['ID']>;
  SoDienThoai?: Maybe<Scalars['String']>;
  SoNha?: Maybe<Scalars['String']>;
  TaiKhoan_Id?: Maybe<Scalars['ID']>;
  TamNgung?: Maybe<Scalars['Boolean']>;
  TaxCode?: Maybe<Scalars['String']>;
  TenKhongDau?: Maybe<Scalars['ID']>;
  TenNhanVien?: Maybe<Scalars['ID']>;
  TienBHXH?: Maybe<Scalars['Float']>;
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  fullAddress?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type StaffInput = {
  CMNDHoacHoChieu?: InputMaybe<Scalars['String']>;
  ChuKySo?: InputMaybe<Scalars['String']>;
  ChucDanh_Id?: InputMaybe<Scalars['ID']>;
  ChucVu_Id?: InputMaybe<Scalars['ID']>;
  ChungChiNgoai?: InputMaybe<Scalars['String']>;
  DanToc_Id?: InputMaybe<Scalars['ID']>;
  DiaChi_Id?: InputMaybe<Scalars['ID']>;
  Email?: InputMaybe<Scalars['String']>;
  GhiChu?: InputMaybe<Scalars['String']>;
  GiayPhepHanhNghe?: InputMaybe<Scalars['String']>;
  GioiTinh?: InputMaybe<EnumGender>;
  KhoaLamViec_Id?: InputMaybe<Scalars['ID']>;
  LinkAvatar?: InputMaybe<InputLinkImage>;
  NgaySinh?: InputMaybe<Scalars['Float']>;
  NgayVaoLam?: InputMaybe<Scalars['Float']>;
  NgheNghiep_Id?: InputMaybe<Scalars['ID']>;
  PhamViDichVu_Ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  PhanTramHoaHong?: InputMaybe<Scalars['Float']>;
  QuocTich_Id?: InputMaybe<Scalars['ID']>;
  SoDienThoai?: InputMaybe<Scalars['String']>;
  SoNha?: InputMaybe<Scalars['String']>;
  TaiKhoan_Id?: InputMaybe<Scalars['ID']>;
  TamNgung?: InputMaybe<Scalars['Boolean']>;
  TaxCode?: InputMaybe<Scalars['String']>;
  TenNhanVien?: InputMaybe<Scalars['String']>;
};

export type StaffPagination = {
  __typename?: 'StaffPagination';
  currentPage?: Maybe<Scalars['Float']>;
  data?: Maybe<Array<Maybe<StaffRes>>>;
};

export type StaffPaginationTotal = {
  __typename?: 'StaffPaginationTotal';
  currentPage?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
  totalRows?: Maybe<Scalars['Float']>;
};

export type StaffRes = {
  __typename?: 'StaffRes';
  CMNDHoacHoChieu?: Maybe<Scalars['String']>;
  DiaChi_Id?: Maybe<Scalars['ID']>;
  Email?: Maybe<Scalars['String']>;
  GioiTinh?: Maybe<EnumGender>;
  LinkAvatar?: Maybe<LinkImage>;
  MaNhanVien?: Maybe<Scalars['ID']>;
  NgaySinh?: Maybe<Scalars['Float']>;
  SoDienThoai?: Maybe<Scalars['String']>;
  SoNha?: Maybe<Scalars['String']>;
  TaiKhoan_Id?: Maybe<Scalars['ID']>;
  TamNgung?: Maybe<Scalars['Boolean']>;
  TaxCode?: Maybe<Scalars['String']>;
  TenKhongDau?: Maybe<Scalars['ID']>;
  TenNhanVien?: Maybe<Scalars['ID']>;
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  fullAddress?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type Stock = {
  __typename?: 'Stock';
  _id?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  expiration?: Maybe<Scalars['Float']>;
  idBiddingContract?: Maybe<Scalars['ID']>;
  idSourceImport?: Maybe<Scalars['ID']>;
  idStockModel?: Maybe<Scalars['ID']>;
  idStore?: Maybe<Scalars['ID']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isInvoice?: Maybe<Scalars['Boolean']>;
  isNoStock?: Maybe<Scalars['Boolean']>;
  partNumber?: Maybe<Scalars['String']>;
  price?: Maybe<Array<Maybe<Scalars['Float']>>>;
  quantity?: Maybe<Array<Maybe<Scalars['Float']>>>;
  quantityString?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type StockModel = {
  __typename?: 'StockModel';
  _id?: Maybe<Scalars['ID']>;
  allowGuest?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  ecomCategory?: Maybe<EcomCategories>;
  ecomDescription?: Maybe<Scalars['String']>;
  ecomImages?: Maybe<Array<Maybe<StockModelImage>>>;
  ecomPublicAt?: Maybe<Scalars['Float']>;
  ecomShortDescription?: Maybe<Scalars['String']>;
  ecomSlug?: Maybe<Scalars['String']>;
  ecomStatus?: Maybe<EnumStockModelStatus>;
  ecomTags?: Maybe<Array<Maybe<EnumEcomStockModelTag>>>;
  idEcomCategory?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isEcommerce?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  prices?: Maybe<Array<Maybe<StockModelPrice>>>;
  sku?: Maybe<Scalars['String']>;
  totalOrderDetail?: Maybe<Scalars['Float']>;
  unit?: Maybe<StockModelUnit>;
  unsignName?: Maybe<Scalars['String']>;
  upc?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type StockModelImage = {
  __typename?: 'StockModelImage';
  altTextImage?: Maybe<Scalars['String']>;
  linkImage?: Maybe<LinkImage>;
};

export type StockModelImageInput = {
  altTextImage?: InputMaybe<Scalars['String']>;
  linkImage?: InputMaybe<LinkImageInput>;
};

export type StockModelInput = {
  allowGuest?: InputMaybe<Scalars['Boolean']>;
  code?: InputMaybe<Scalars['String']>;
  ecomDescription?: InputMaybe<Scalars['String']>;
  ecomImages?: InputMaybe<Array<InputMaybe<StockModelImageInput>>>;
  ecomPublicAt?: InputMaybe<Scalars['Float']>;
  ecomShortDescription?: InputMaybe<Scalars['String']>;
  ecomSlug?: InputMaybe<Scalars['String']>;
  ecomStatus?: InputMaybe<EnumStockModelStatus>;
  ecomTags?: InputMaybe<Array<InputMaybe<EnumEcomStockModelTag>>>;
  idEcomCategory?: InputMaybe<Scalars['String']>;
  isEcommerce?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  prices?: InputMaybe<Array<InputMaybe<StockModelPriceInput>>>;
  sku?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<StockModelUnitInput>;
  unsignName?: InputMaybe<Scalars['String']>;
  upc?: InputMaybe<Scalars['String']>;
};

export type StockModelPagination = {
  __typename?: 'StockModelPagination';
  currentPage?: Maybe<Scalars['Float']>;
  data?: Maybe<Array<Maybe<StockModel>>>;
};

export type StockModelPaginationTotal = {
  __typename?: 'StockModelPaginationTotal';
  currentPage?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
  totalRows?: Maybe<Scalars['Float']>;
};

export type StockModelPrice = {
  __typename?: 'StockModelPrice';
  idPriceType: Scalars['ID'];
  price: Array<Maybe<Scalars['Float']>>;
};

export type StockModelPriceInput = {
  idPriceType: Scalars['ID'];
  price: Array<InputMaybe<Scalars['Float']>>;
};

export type StockModelUnit = {
  __typename?: 'StockModelUnit';
  factor?: Maybe<Array<Maybe<Scalars['Float']>>>;
  name?: Maybe<Array<Maybe<Scalars['String']>>>;
  realFactor?: Maybe<Array<Maybe<Scalars['Float']>>>;
  sumFactor?: Maybe<Scalars['Float']>;
};

export type StockModelUnitInput = {
  factor?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  name?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  realFactor?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  sumFactor?: InputMaybe<Scalars['Float']>;
};

export type Subscriber = {
  __typename?: 'Subscriber';
  _id: Scalars['ID'];
  cardinalNumber?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  email?: Maybe<Scalars['String']>;
  status?: Maybe<EnumSubscriberStatus>;
  subscribeAt?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
};

export type TotalOrderForType = {
  __typename?: 'TotalOrderForType';
  quantity?: Maybe<Scalars['Float']>;
  type?: Maybe<EnumOrderStatus>;
};

export enum TypeImage {
  File = 'file',
  Link = 'link'
}

export enum TypeNodeEnum {
  EndoscopicRoom = 'ENDOSCOPIC_ROOM',
  ExamineRoom = 'EXAMINE_ROOM',
  HospitalizeRoom = 'HOSPITALIZE_ROOM',
  ImageAnalysationRoom = 'IMAGE_ANALYSATION_ROOM',
  LaboratoryRoom = 'LABORATORY_ROOM',
  ReceiveRoom = 'RECEIVE_ROOM',
  RecoveryRoom = 'RECOVERY_ROOM',
  SurgeryRoom = 'SURGERY_ROOM',
  TipsRoom = 'TIPS_ROOM'
}

export type User = {
  __typename?: 'User';
  Status?: Maybe<EnumStatusAccount>;
  TypeAccount?: Maybe<EnumTypeAccount>;
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  customer?: Maybe<Customer>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  employee?: Maybe<Staff>;
  isActive?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isLocked?: Maybe<Scalars['Boolean']>;
  lastChangePasswordAt?: Maybe<Scalars['Float']>;
  lockedAt?: Maybe<Scalars['Float']>;
  lockedBy?: Maybe<UserSlim>;
  note?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  Status?: Maybe<EnumStatusAccount>;
  TypeAccount?: Maybe<EnumTypeAccount>;
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserSlim>;
  customer?: Maybe<Customer>;
  deletedAt?: Maybe<Scalars['Float']>;
  deletedBy?: Maybe<UserSlim>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isLocked?: Maybe<Scalars['Boolean']>;
  lastChangePasswordAt?: Maybe<Scalars['Float']>;
  lockedAt?: Maybe<Scalars['Float']>;
  lockedBy?: Maybe<UserSlim>;
  note?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
  updatedBy?: Maybe<UserSlim>;
  username: Scalars['String'];
};

export type UserSlim = {
  __typename?: 'UserSlim';
  _id: Scalars['ID'];
  fullName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserSlimInput = {
  _id?: InputMaybe<Scalars['ID']>;
  fullName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersWithPaginate = {
  __typename?: 'UsersWithPaginate';
  pageInfo?: Maybe<PaginationInfo>;
  totalRows?: Maybe<Scalars['Float']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type VerifyToken = {
  __typename?: 'VerifyToken';
  Email?: Maybe<Scalars['String']>;
  Phone?: Maybe<Scalars['String']>;
  Token: Scalars['String'];
  TypeToken?: Maybe<EnumTypeToken>;
  User_Id?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Float']>;
  expiresAt?: Maybe<Scalars['Float']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  used?: Maybe<Scalars['Boolean']>;
};

export type WebIntrodutionItem = {
  __typename?: 'WebIntrodutionItem';
  description?: Maybe<Scalars['String']>;
  iconName?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type WebIntrodutionItemInput = {
  description?: InputMaybe<Scalars['String']>;
  iconName?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateEcomCategoriesMutationVariables = Exact<{
  input: EcomCategoriesInput;
}>;


export type CreateEcomCategoriesMutation = { __typename?: 'Mutation', createEcomCategories?: { __typename?: 'EcomCategories', _id: string } | null };

export type UpdateEcomCategoriesMutationVariables = Exact<{
  id: Scalars['ID'];
  input: EcomCategoriesInput;
}>;


export type UpdateEcomCategoriesMutation = { __typename?: 'Mutation', updateEcomCategories?: { __typename?: 'EcomCategories', _id: string } | null };

export type RemoveEcomCategoriesMutationVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type RemoveEcomCategoriesMutation = { __typename?: 'Mutation', removeEcomCategories?: boolean | null };

export type CreateStockModelMutationVariables = Exact<{
  input: StockModelInput;
  idsStockModelRelated?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type CreateStockModelMutation = { __typename?: 'Mutation', createStockModel?: { __typename?: 'StockModel', _id?: string | null } | null };

export type UpdateStockModelMutationVariables = Exact<{
  id: Scalars['String'];
  input: StockModelInput;
  idsStockModelRelated?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type UpdateStockModelMutation = { __typename?: 'Mutation', updateStockModel?: { __typename?: 'StockModel', _id?: string | null } | null };

export type DeleteStockModelMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteStockModelMutation = { __typename?: 'Mutation', deleteStockModel?: { __typename?: 'StockModel', _id?: string | null } | null };

export type CreateOrUpdateContentHomePageMutationVariables = Exact<{
  input: InputContentHomePage;
}>;


export type CreateOrUpdateContentHomePageMutation = { __typename?: 'Mutation', createOrUpdateContentHomePage?: { __typename?: 'ContentHomePage', _id: string } | null };

export type CreateOrUpdateContentMenuMutationVariables = Exact<{
  input: InputContentMenu;
}>;


export type CreateOrUpdateContentMenuMutation = { __typename?: 'Mutation', createOrUpdateContentMenu?: { __typename?: 'ContentMenu', _id: string } | null };

export type CreateOrUpdateContentContactMutationVariables = Exact<{
  input: InputContentContact;
}>;


export type CreateOrUpdateContentContactMutation = { __typename?: 'Mutation', createOrUpdateContentContact?: { __typename?: 'ContentContact', _id: string } | null };

export type CreateOrUpdateContentFooterMutationVariables = Exact<{
  input: InputContentFooter;
}>;


export type CreateOrUpdateContentFooterMutation = { __typename?: 'Mutation', createOrUpdateContentFooter?: { __typename?: 'ContentFooter', _id: string } | null };

export type CreateLatestProductByIdMutationVariables = Exact<{
  idStockModel: Scalars['ID'];
}>;


export type CreateLatestProductByIdMutation = { __typename?: 'Mutation', createLatestProductById?: { __typename?: 'StockModel', _id?: string | null } | null };

export type DeleteLatestProductByIdMutationVariables = Exact<{
  idStockModel: Scalars['ID'];
}>;


export type DeleteLatestProductByIdMutation = { __typename?: 'Mutation', deleteLatestProductById?: { __typename?: 'StockModel', _id?: string | null } | null };

export type CreateStaffMutationVariables = Exact<{
  input: StaffInput;
}>;


export type CreateStaffMutation = { __typename?: 'Mutation', createStaff?: boolean | null };

export type UpdateStaffMutationVariables = Exact<{
  id: Scalars['ID'];
  input: StaffInput;
}>;


export type UpdateStaffMutation = { __typename?: 'Mutation', updateStaff?: boolean | null };

export type RemoveStaffMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type RemoveStaffMutation = { __typename?: 'Mutation', removeStaff?: boolean | null };

export type UpdateCancelPublicCategoriesMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UpdateCancelPublicCategoriesMutation = { __typename?: 'Mutation', updateCancelPublicCategories?: boolean | null };

export type UpdateUserOverrideMutationVariables = Exact<{
  input: NeedOverrideInfo;
  idUser: Scalars['ID'];
}>;


export type UpdateUserOverrideMutation = { __typename?: 'Mutation', updateUserOverride?: { __typename?: 'User', _id: string, username: string, Status?: EnumStatusAccount | null, isActive?: boolean | null, isLocked?: boolean | null, customer?: { __typename?: 'Customer', _id: string, email?: string | null, fullName?: string | null, unsignedFullName?: string | null, gender?: EnumGender | null, dateOfBirth?: number | null, address?: string | null, phoneNumber?: string | null, identityCard?: { __typename?: 'IdentityCard', idNo?: string | null, issuedOn?: number | null, issuedBy?: string | null } | null } | null } | null };

export type CreateUserMutationVariables = Exact<{
  input: NewUserInfo;
  language?: InputMaybe<Scalars['String']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', _id: string } | null };

export type CreateOrUpdateContentAboutUsMutationVariables = Exact<{
  language: EnumLanguage;
  input: InputContentAboutUs;
}>;


export type CreateOrUpdateContentAboutUsMutation = { __typename?: 'Mutation', createOrUpdateContentAboutUs?: { __typename?: 'ContentAboutUs', _id: string } | null };

export type CreateOrUpdateContentPurchaseInfoMutationVariables = Exact<{
  language: EnumLanguage;
  input: InputContentPurchaseInfo;
}>;


export type CreateOrUpdateContentPurchaseInfoMutation = { __typename?: 'Mutation', createOrUpdateContentPurchaseInfo?: { __typename?: 'ContentPurchaseInfo', _id: string } | null };

export type CreateOrUpdateContentSecurityMutationVariables = Exact<{
  language: EnumLanguage;
  input: InputContentSecurity;
}>;


export type CreateOrUpdateContentSecurityMutation = { __typename?: 'Mutation', createOrUpdateContentSecurity?: { __typename?: 'ContentSecurity', _id: string } | null };

export type CreateOrder2MutationVariables = Exact<{
  input: InputOrder;
}>;


export type CreateOrder2Mutation = { __typename?: 'Mutation', createOrder2?: { __typename?: 'Order', _id: string } | null };

export type UpdateOrder2MutationVariables = Exact<{
  _id: Scalars['ID'];
  input?: InputMaybe<InputOrder>;
}>;


export type UpdateOrder2Mutation = { __typename?: 'Mutation', updateOrder2?: { __typename?: 'Order', _id: string } | null };

export type UpdateOrderStatusMutationVariables = Exact<{
  _ids: Array<Scalars['ID']> | Scalars['ID'];
  oldStatus: EnumOrderStatus;
  newStatus: EnumOrderStatus;
}>;


export type UpdateOrderStatusMutation = { __typename?: 'Mutation', updateOrderStatus?: boolean | null };

export type CancelOrder2MutationVariables = Exact<{
  _id: Scalars['ID'];
  reasonCancel?: InputMaybe<Scalars['String']>;
}>;


export type CancelOrder2Mutation = { __typename?: 'Mutation', cancelOrder2?: boolean | null };

export type UpdateSettingTypeMutationVariables = Exact<{
  type?: InputMaybe<SettingType>;
  input?: InputMaybe<Scalars['Scalar']>;
}>;


export type UpdateSettingTypeMutation = { __typename?: 'Mutation', updateSettingType?: { __typename?: 'Setting', ecommerce?: { __typename?: 'EcomSetting', idWarehouse: string } | null } | null };

export type ConfirmOrderMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ConfirmOrderMutation = { __typename?: 'Mutation', confirmOrder?: { __typename?: 'Order', _id: string } | null };

export type ShipOrderMutationVariables = Exact<{
  _id: Scalars['ID'];
  input?: InputMaybe<Scalars['String']>;
}>;


export type ShipOrderMutation = { __typename?: 'Mutation', shipOrder?: boolean | null };

export type ConfirmSuccessOrderMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ConfirmSuccessOrderMutation = { __typename?: 'Mutation', confirmSuccessOrder?: { __typename?: 'Order', _id: string } | null };

export type ConfirmFailedOrderMutationVariables = Exact<{
  id: Scalars['ID'];
  reasonFailed?: InputMaybe<Scalars['String']>;
}>;


export type ConfirmFailedOrderMutation = { __typename?: 'Mutation', confirmFailedOrder?: { __typename?: 'Order', _id: string } | null };

export type DeletePageMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePageMutation = { __typename?: 'Mutation', deletePage?: { __typename?: 'Page', _id: string } | null };

export type CreateBlogMutationVariables = Exact<{
  input: BlogInput;
  idsBlogRelated?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type CreateBlogMutation = { __typename?: 'Mutation', createBlog?: { __typename?: 'Blog', _id: string } | null };

export type CreatePageMutationVariables = Exact<{
  input: PageInput;
}>;


export type CreatePageMutation = { __typename?: 'Mutation', createPage?: { __typename?: 'Page', _id: string } | null };

export type UpdateBlogMutationVariables = Exact<{
  id: Scalars['ID'];
  input: BlogInput;
  idsBlogRelated?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type UpdateBlogMutation = { __typename?: 'Mutation', updateBlog?: { __typename?: 'Blog', _id: string } | null };

export type UpdatePageMutationVariables = Exact<{
  id: Scalars['ID'];
  input: PageInput;
}>;


export type UpdatePageMutation = { __typename?: 'Mutation', updatePage?: { __typename?: 'Page', _id: string } | null };

export type DeleteBlogMutationVariables = Exact<{
  ids: Scalars['ID'];
}>;


export type DeleteBlogMutation = { __typename?: 'Mutation', deleteBlog?: { __typename?: 'Blog', _id: string } | null };

export type ChangePriorityBlogMutationVariables = Exact<{
  ids: Scalars['ID'];
}>;


export type ChangePriorityBlogMutation = { __typename?: 'Mutation', changePriorityBlog?: { __typename?: 'Blog', _id: string } | null };

export type UnChangePriorityMultiBlogMutationVariables = Exact<{
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type UnChangePriorityMultiBlogMutation = { __typename?: 'Mutation', unChangePriorityMultiBlog?: Array<{ __typename?: 'Blog', _id: string } | null> | null };

export type PublicBlogMutationVariables = Exact<{
  ids: Scalars['ID'];
}>;


export type PublicBlogMutation = { __typename?: 'Mutation', publicBlog?: { __typename?: 'Blog', _id: string } | null };

export type CreateServiceMutationVariables = Exact<{
  input: ServiceInput;
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService?: { __typename?: 'Service', _id: string } | null };

export type UpdateServiceMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ServiceInput;
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateService?: { __typename?: 'Service', _id: string } | null };

export type DeleteServiceMutationVariables = Exact<{
  ids: Scalars['ID'];
}>;


export type DeleteServiceMutation = { __typename?: 'Mutation', deleteService?: { __typename?: 'Service', _id: string } | null };

export type UpdateFeatureBlogMutationVariables = Exact<{
  ids: Scalars['ID'];
}>;


export type UpdateFeatureBlogMutation = { __typename?: 'Mutation', updateFeatureBlog?: { __typename?: 'Blog', _id: string } | null };

export type DeleteMailContactMutationVariables = Exact<{
  ids: Scalars['ID'];
}>;


export type DeleteMailContactMutation = { __typename?: 'Mutation', deleteMailContact?: { __typename?: 'MailContact', _id?: string | null } | null };

export type UnSubscribeEmailMutationVariables = Exact<{
  ids: Scalars['ID'];
}>;


export type UnSubscribeEmailMutation = { __typename?: 'Mutation', unSubscribeEmail?: { __typename?: 'Subscriber', _id: string } | null };

export type CreateMapServiceProductMutationVariables = Exact<{
  idService: Scalars['ID'];
  idsStockModel: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
}>;


export type CreateMapServiceProductMutation = { __typename?: 'Mutation', createMapServiceProduct?: Array<{ __typename?: 'MapServiceProduct', _id: string } | null> | null };

export type RemoveMapServiceProductMutationVariables = Exact<{
  idService: Scalars['ID'];
  idsStockModel: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
}>;


export type RemoveMapServiceProductMutation = { __typename?: 'Mutation', removeMapServiceProduct?: boolean | null };

export type DeleteUsersMutationVariables = Exact<{
  idUsers: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type DeleteUsersMutation = { __typename?: 'Mutation', deleteUsers?: boolean | null };

export type UpdateUsersOverrideMutationVariables = Exact<{
  input: NeedOverrideInfo;
  idUsers: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type UpdateUsersOverrideMutation = { __typename?: 'Mutation', updateUsersOverride?: boolean | null };

export type UpdateUserMutationVariables = Exact<{
  input: NeedUpdateInfo;
  idUser: Scalars['ID'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', _id: string, displayName?: string | null, email?: string | null, customer?: { __typename?: 'Customer', _id: string, user_Id: string, email?: string | null, phoneNumber?: string | null, fullName?: string | null, deliveryAddress_Default?: { __typename?: 'DeliveryAddress', _id: string, idCustomer?: string | null, fullName?: string | null, phoneNumber?: string | null, detailAddress?: string | null } | null } | null } | null };

export type CreateUserTypeAdminMutationVariables = Exact<{
  input: NewUserInfo;
  language?: InputMaybe<Scalars['String']>;
}>;


export type CreateUserTypeAdminMutation = { __typename?: 'Mutation', createUserTypeAdmin?: { __typename?: 'User', _id: string } | null };

export type ImportFileStockModelMutationVariables = Exact<{
  input: Array<StockModelInput> | StockModelInput;
}>;


export type ImportFileStockModelMutation = { __typename?: 'Mutation', importFileStockModel?: boolean | null };

export type CreateContentHistoryMutationVariables = Exact<{
  input: InputContentHistory;
}>;


export type CreateContentHistoryMutation = { __typename?: 'Mutation', createContentHistory?: { __typename?: 'ContentHistory', _id: string, type?: EnumContentHistoryType | null, name?: string | null, version?: number | null, idPage?: string | null, dataPage?: { __typename?: 'Page', title?: string | null, slug?: string | null, content?: string | null, description?: string | null, keywords?: string | null, isAddToMainMenu?: boolean | null, isAddToFooterMenu?: boolean | null } | null } | null };

export type DeleteContentHistoryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteContentHistoryMutation = { __typename?: 'Mutation', deleteContentHistory?: boolean | null };

export type RenameVersionMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;


export type RenameVersionMutation = { __typename?: 'Mutation', renameVersion?: boolean | null };

export type AppInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type AppInfoQuery = { __typename?: 'Query', appInfo?: { __typename?: 'AppInfo', version?: string | null } | null };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout?: boolean | null };

export type LogoutAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutAdminQuery = { __typename?: 'Query', logoutAdmin?: boolean | null };

export type MyInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type MyInfoQuery = { __typename?: 'Query', myInfo?: { __typename?: 'UserResponse', _id?: string | null, username: string, displayName?: string | null, lastChangePasswordAt?: number | null, email?: string | null, Status?: EnumStatusAccount | null, TypeAccount?: EnumTypeAccount | null, isLocked?: boolean | null, isDeleted?: boolean | null, isActive?: boolean | null } | null };

export type LoginQueryVariables = Exact<{
  info: LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login?: { __typename?: 'AuthenticationInfo', token: string, userId: string, Status?: EnumStatusAccount | null } | null };

export type LoginAdminQueryVariables = Exact<{
  info: LoginInput;
}>;


export type LoginAdminQuery = { __typename?: 'Query', loginAdmin?: { __typename?: 'AuthenticationInfo', token: string, userId: string, Status?: EnumStatusAccount | null } | null };

export type GetEcomCategoriesPaginationQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  searchInput?: InputMaybe<Array<InputMaybe<EcomCategoriesSearch>> | InputMaybe<EcomCategoriesSearch>>;
  filterInput?: InputMaybe<Array<InputMaybe<EcomCategoriesFilter>> | InputMaybe<EcomCategoriesFilter>>;
  sortInput?: InputMaybe<Array<InputMaybe<EcomCategoriesSort>> | InputMaybe<EcomCategoriesSort>>;
}>;


export type GetEcomCategoriesPaginationQuery = { __typename?: 'Query', getEcomCategoriesPagination?: { __typename?: 'EcomCategoriesPagination', currentPage?: number | null, data?: Array<{ __typename?: 'EcomCategoriesRes', _id?: string | null, CategoryCode?: string | null, CategoryName?: string | null, Color?: string | null, CategoryParent_Id?: string | null, createdAt?: number | null, Slug?: string | null, Status?: EnumCategoriesStatus | null, CategoryParent?: { __typename?: 'EcomCategoriesRes', _id?: string | null, CategoryName?: string | null } | null } | null> | null } | null };

export type GetEcomCategoriesPaginationTotalQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  searchInput?: InputMaybe<Array<InputMaybe<EcomCategoriesSearch>> | InputMaybe<EcomCategoriesSearch>>;
  filterInput?: InputMaybe<Array<InputMaybe<EcomCategoriesFilter>> | InputMaybe<EcomCategoriesFilter>>;
}>;


export type GetEcomCategoriesPaginationTotalQuery = { __typename?: 'Query', getEcomCategoriesPaginationTotal?: { __typename?: 'EcomCategoriesPaginationTotal', totalRows?: number | null, totalPages?: number | null, currentPage?: number | null } | null };

export type GetStockModelPaginationQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchStockModelInput>> | InputMaybe<SearchStockModelInput>>;
  filter?: InputMaybe<Array<InputMaybe<FilterStockModelInput>> | InputMaybe<FilterStockModelInput>>;
  sort?: InputMaybe<Array<InputMaybe<SortStockModelInput>> | InputMaybe<SortStockModelInput>>;
  idsDefault?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type GetStockModelPaginationQuery = { __typename?: 'Query', getStockModelPagination?: { __typename?: 'StockModelPagination', currentPage?: number | null, data?: Array<{ __typename?: 'StockModel', _id?: string | null, name?: string | null, code?: string | null, ecomSlug?: string | null, sku?: string | null, upc?: string | null, ecomStatus?: EnumStockModelStatus | null, isActive?: boolean | null, createdAt?: number | null, ecomDescription?: string | null, ecomShortDescription?: string | null, ecomImages?: Array<{ __typename?: 'StockModelImage', linkImage?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null> | null, prices?: Array<{ __typename?: 'StockModelPrice', idPriceType: string, price: Array<number | null> } | null> | null, ecomCategory?: { __typename?: 'EcomCategories', CategoryName?: string | null, Slug?: string | null } | null, createdBy?: { __typename?: 'UserSlim', username?: string | null, fullName?: string | null } | null } | null> | null } | null };

export type GetStockModelPaginationNameQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchStockModelInput>> | InputMaybe<SearchStockModelInput>>;
  filter?: InputMaybe<Array<InputMaybe<FilterStockModelInput>> | InputMaybe<FilterStockModelInput>>;
  sort?: InputMaybe<Array<InputMaybe<SortStockModelInput>> | InputMaybe<SortStockModelInput>>;
  idsDefault?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type GetStockModelPaginationNameQuery = { __typename?: 'Query', getStockModelPagination?: { __typename?: 'StockModelPagination', currentPage?: number | null, data?: Array<{ __typename?: 'StockModel', _id?: string | null, name?: string | null } | null> | null } | null };

export type GetStockModelPaginationTotalQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchStockModelInput>> | InputMaybe<SearchStockModelInput>>;
  filter?: InputMaybe<Array<InputMaybe<FilterStockModelInput>> | InputMaybe<FilterStockModelInput>>;
}>;


export type GetStockModelPaginationTotalQuery = { __typename?: 'Query', getStockModelPaginationTotal?: { __typename?: 'StockModelPaginationTotal', totalRows?: number | null, totalPages?: number | null, currentPage?: number | null } | null };

export type GetStockModelBySlugProductQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetStockModelBySlugProductQuery = { __typename?: 'Query', getStockModelBySlugProduct?: { __typename?: 'StockModel', _id?: string | null, name?: string | null, code?: string | null, ecomSlug?: string | null, sku?: string | null, upc?: string | null, ecomDescription?: string | null, ecomShortDescription?: string | null, ecomImages?: Array<{ __typename?: 'StockModelImage', linkImage?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null> | null, prices?: Array<{ __typename?: 'StockModelPrice', idPriceType: string, price: Array<number | null> } | null> | null, ecomCategory?: { __typename?: 'EcomCategories', CategoryName?: string | null, Slug?: string | null } | null } | null };

export type GetStockModelByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetStockModelByIdQuery = { __typename?: 'Query', getStockModelById?: { __typename?: 'StockModel', _id?: string | null, name?: string | null, code?: string | null, ecomSlug?: string | null, sku?: string | null, upc?: string | null, ecomStatus?: EnumStockModelStatus | null, ecomDescription?: string | null, ecomShortDescription?: string | null, ecomImages?: Array<{ __typename?: 'StockModelImage', linkImage?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null> | null, prices?: Array<{ __typename?: 'StockModelPrice', idPriceType: string, price: Array<number | null> } | null> | null, ecomCategory?: { __typename?: 'EcomCategories', CategoryName?: string | null, Slug?: string | null } | null } | null };

export type GetMapStockModelRelatedsByStockModelQueryVariables = Exact<{
  idStockModel: Scalars['ID'];
}>;


export type GetMapStockModelRelatedsByStockModelQuery = { __typename?: 'Query', getMapStockModelRelatedsByStockModel?: Array<{ __typename?: 'MapStockModelRelated', _id: string, idStockModel?: string | null, idStockModelRelated?: string | null, stockModelRelated?: { __typename?: 'StockModel', _id?: string | null, code?: string | null, name?: string | null } | null } | null> | null };

export type GetContentHomePageQueryVariables = Exact<{
  language: EnumLanguage;
}>;


export type GetContentHomePageQuery = { __typename?: 'Query', getContentHomePage?: { __typename?: 'ContentHomePage', _id: string, language?: EnumLanguage | null, SEOTitle?: string | null, SEODescription?: string | null, SEOKeywords?: string | null, SEO_OGDescription?: string | null, SEO_OGImage?: string | null, SEO_OGTitle?: string | null, sectionSlider?: { __typename?: 'ContentSlider', isActive?: boolean | null, imageSlider?: Array<{ __typename?: 'SliderImage', altTextImage?: string | null, title?: string | null, subTitle?: string | null, nameLink?: string | null, link?: string | null, isActive?: boolean | null, linkImage?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null> | null } | null, sectionLatestProduct?: { __typename?: 'ContentLatestProduct', title?: string | null, isActive?: boolean | null } | null, sectionBanner?: { __typename?: 'ContentBanner', isActive?: boolean | null, imageBanner1?: { __typename?: 'ImageBanner', altTextImage?: string | null, title?: string | null, subTitle?: string | null, nameLink?: string | null, link?: string | null, isActive?: boolean | null, linkImage?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null, imageBanner2?: { __typename?: 'ImageBanner', altTextImage?: string | null, title?: string | null, subTitle?: string | null, nameLink?: string | null, link?: string | null, isActive?: boolean | null, linkImage?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null, imageBanner3?: { __typename?: 'ImageBanner', altTextImage?: string | null, title?: string | null, subTitle?: string | null, nameLink?: string | null, link?: string | null, isActive?: boolean | null, linkImage?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null } | null, sectionBestSellingProduct?: { __typename?: 'ContentBestSellingProduct', title?: string | null, isActive?: boolean | null } | null, sectionOurPartners?: { __typename?: 'ContentOurPartners', isActive?: boolean | null, title?: string | null, imagePartner?: Array<{ __typename?: 'PartnerImage', isActive?: boolean | null, title?: string | null, altTextImage?: string | null, link?: string | null, linkImage?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null> | null } | null, sectionWebIntrodution?: { __typename?: 'ContentWebIntrodution', isActive?: boolean | null, title?: string | null, description?: string | null, webIntrodutionItems?: Array<{ __typename?: 'WebIntrodutionItem', iconName?: string | null, title?: string | null, description?: string | null } | null> | null, linkImage?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null, sectionEstimonial?: { __typename?: 'ContentEstimonial', isActive?: boolean | null, title?: string | null, description?: string | null, nameLink?: string | null, link?: string | null, linkImage?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null, estimonialItems?: Array<{ __typename?: 'EstimonialItem', number?: number | null, description?: string | null } | null> | null } | null, sectionService?: { __typename?: 'ContentService', isActive?: boolean | null, title?: string | null, description?: string | null } | null, sectionBlogNew?: { __typename?: 'ContentBlogNew', isActive?: boolean | null, title?: string | null, description?: string | null } | null, sectionOurClient?: { __typename?: 'ContentOurClient', isActive?: boolean | null, title?: string | null, ourClient?: Array<{ __typename?: 'OurClient', isActive?: boolean | null, reference?: string | null, fullName?: string | null, profession?: string | null, avatar?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null> | null } | null } | null };

export type GetContentMenuQueryVariables = Exact<{
  language: EnumLanguage;
}>;


export type GetContentMenuQuery = { __typename?: 'Query', getContentMenu?: { __typename?: 'ContentMenu', _id: string, language?: EnumLanguage | null, description?: string | null, linkLogo?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null, linkFavicon?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null, listMenu?: Array<{ __typename?: 'MenuItem', name?: string | null, link?: string | null, children?: Array<{ __typename?: 'MenuItem', name?: string | null, link?: string | null } | null> | null } | null> | null } | null };

export type GetContentContactQueryVariables = Exact<{
  language: EnumLanguage;
}>;


export type GetContentContactQuery = { __typename?: 'Query', getContentContact?: { __typename?: 'ContentContact', _id: string, language?: EnumLanguage | null, ourPhone?: string | null, ourMailBox?: string | null, detailAddress?: Array<string | null> | null, googleAddress?: string | null, googleFrame?: string | null, phoneNumber?: string | null, introduce?: string | null, hotline?: string | null, email?: string | null, SEOTitle?: string | null, SEODescription?: string | null, SEOKeywords?: string | null, SEO_OGDescription?: string | null, SEO_OGImage?: string | null, SEO_OGTitle?: string | null, ourAddress?: Array<{ __typename?: 'OurAddress', address?: string | null, googleAddress?: string | null, googleFrameAddress?: string | null } | null> | null, socials?: Array<{ __typename?: 'SocialItem', title?: string | null, iconNameHeader?: string | null, iconNameFooter?: string | null, link?: string | null } | null> | null } | null };

export type GetContentFooterQueryVariables = Exact<{
  language: EnumLanguage;
}>;


export type GetContentFooterQuery = { __typename?: 'Query', getContentFooter?: { __typename?: 'ContentFooter', _id: string, language?: EnumLanguage | null, altTextLogo?: string | null, description?: string | null, copyRight?: string | null, linkLogo?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null, usefulLink?: Array<{ __typename?: 'ContentUsefulLink', name?: string | null, link?: string | null } | null> | null, myAccount?: Array<{ __typename?: 'ContentMyAccount', name?: string | null, link?: string | null } | null> | null } | null };

export type UsersWithPaginateQueryVariables = Exact<{
  gridOptions?: InputMaybe<GridOption>;
  filterOptions?: InputMaybe<InputOptionsQueryUser>;
}>;


export type UsersWithPaginateQuery = { __typename?: 'Query', usersWithPaginate?: { __typename?: 'UsersWithPaginate', totalRows?: number | null, users?: Array<{ __typename?: 'User', _id: string, username: string, displayName?: string | null, Status?: EnumStatusAccount | null, isActive?: boolean | null, isLocked?: boolean | null, customer?: { __typename?: 'Customer', _id: string, email?: string | null, fullName?: string | null, unsignedFullName?: string | null, gender?: EnumGender | null, dateOfBirth?: number | null, address?: string | null, phoneNumber?: string | null, identityCard?: { __typename?: 'IdentityCard', idNo?: string | null, issuedOn?: number | null, issuedBy?: string | null } | null } | null } | null> | null } | null };

export type GetStockModelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStockModelsQuery = { __typename?: 'Query', getStockModels?: Array<{ __typename?: 'StockModel', _id?: string | null, code?: string | null, name?: string | null, ecomTags?: Array<EnumEcomStockModelTag | null> | null, ecomPublicAt?: number | null, prices?: Array<{ __typename?: 'StockModelPrice', idPriceType: string, price: Array<number | null> } | null> | null, ecomCategory?: { __typename?: 'EcomCategories', CategoryName?: string | null } | null, ecomImages?: Array<{ __typename?: 'StockModelImage', linkImage?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null> | null } | null> | null };

export type GetStaffPaginationQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  searchInput?: InputMaybe<Array<InputMaybe<EcomCategoriesSearch>> | InputMaybe<EcomCategoriesSearch>>;
  filterInput?: InputMaybe<Array<InputMaybe<EcomCategoriesFilter>> | InputMaybe<EcomCategoriesFilter>>;
  sortInput?: InputMaybe<Array<InputMaybe<EcomCategoriesSort>> | InputMaybe<EcomCategoriesSort>>;
}>;


export type GetStaffPaginationQuery = { __typename?: 'Query', getStaffPagination?: { __typename?: 'StaffPagination', currentPage?: number | null, data?: Array<{ __typename?: 'StaffRes', _id?: string | null, MaNhanVien?: string | null, TenNhanVien?: string | null, NgaySinh?: number | null, SoDienThoai?: string | null, GioiTinh?: EnumGender | null, DiaChi_Id?: string | null, SoNha?: string | null, CMNDHoacHoChieu?: string | null, TamNgung?: boolean | null, Email?: string | null, TaxCode?: string | null, fullAddress?: string | null, TaiKhoan_Id?: string | null, LinkAvatar?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null> | null } | null };

export type GetStaffPaginationTotalQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  searchInput?: InputMaybe<Array<InputMaybe<EcomCategoriesSearch>> | InputMaybe<EcomCategoriesSearch>>;
  filterInput?: InputMaybe<Array<InputMaybe<EcomCategoriesFilter>> | InputMaybe<EcomCategoriesFilter>>;
}>;


export type GetStaffPaginationTotalQuery = { __typename?: 'Query', getStaffPaginationTotal?: { __typename?: 'StaffPaginationTotal', totalRows?: number | null, totalPages?: number | null, currentPage?: number | null } | null };

export type StaffsQueryVariables = Exact<{ [key: string]: never; }>;


export type StaffsQuery = { __typename?: 'Query', staffs?: Array<{ __typename?: 'Staff', _id?: string | null, MaNhanVien?: string | null, TenNhanVien?: string | null, TenKhongDau?: string | null, GioiTinh?: EnumGender | null, NgaySinh?: number | null, Email?: string | null, SoDienThoai?: string | null, fullAddress?: string | null, TamNgung?: boolean | null, TaxCode?: string | null, DiaChi_Id?: string | null, CMNDHoacHoChieu?: string | null, SoNha?: string | null, TaiKhoan_Id?: string | null, LinkAvatar?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null> | null };

export type SearchDm_DonViHanhChinhQueryVariables = Exact<{
  searchString: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  idDefault?: InputMaybe<Scalars['ID']>;
}>;


export type SearchDm_DonViHanhChinhQuery = { __typename?: 'Query', searchDM_DonViHanhChinh?: Array<{ __typename?: 'DM_DonViHanhChinh', _id?: string | null, MaDonViHanhChinh?: string | null, TenDonViHanhChinh?: string | null, TenDayDu?: string | null, TenTat?: string | null, LoaiDonViHanhChinh?: EnumLoaiDonViHanhChinh | null, MaDonViHanhChinhCapTren?: string | null, MaDonViHanhChinhCapTrenDayDu?: string | null } | null> | null };

export type FindOneDonViHanhChinhQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FindOneDonViHanhChinhQuery = { __typename?: 'Query', findOneDonViHanhChinh?: { __typename?: 'DM_DonViHanhChinh', _id?: string | null, MaDonViHanhChinh?: string | null, TenDonViHanhChinh?: string | null, TenDayDu?: string | null, TenTat?: string | null, LoaiDonViHanhChinh?: EnumLoaiDonViHanhChinh | null, MaDonViHanhChinhCapTren?: string | null, MaDonViHanhChinhCapTrenDayDu?: string | null, MacDinh?: boolean | null } | null };

export type OrdersWithPaginateQueryVariables = Exact<{
  gridOptions?: InputMaybe<GridOption>;
  filterOptions?: InputMaybe<InputOptionsQueryOrder>;
}>;


export type OrdersWithPaginateQuery = { __typename?: 'Query', ordersWithPaginate?: { __typename?: 'OrdersWithPaginate', totalRows?: number | null, orders?: Array<{ __typename?: 'Order', _id: string, code?: string | null, idCustomer?: string | null, idStaff?: string | null, status?: EnumOrderStatus | null, paymentMethod?: EnumPaymentMethod | null, idDeliveryAddress?: string | null, orderedAt?: number | null, deliveryAt?: number | null, estimatedDeliveryAt?: number | null, note?: string | null, customer?: { __typename?: 'Customer', _id: string, email?: string | null, fullName?: string | null, unsignedFullName?: string | null, phoneNumber?: string | null } | null, staff?: { __typename?: 'Staff', _id?: string | null, TenNhanVien?: string | null, TenKhongDau?: string | null } | null, orderDetail?: Array<{ __typename?: 'OrderDetail', idOrder: string, idStockModel: string, count?: number | null, note?: string | null, total?: number | null, stockModel?: { __typename?: 'StockModel', code?: string | null, name?: string | null, prices?: Array<{ __typename?: 'StockModelPrice', idPriceType: string, price: Array<number | null> } | null> | null } | null } | null> | null, deliveryAddress?: { __typename?: 'DeliveryAddress', fullName?: string | null, phoneNumber?: string | null, detailAddress?: string | null } | null } | null> | null } | null };

export type GetContentAboutUsQueryVariables = Exact<{
  language?: InputMaybe<EnumLanguage>;
}>;


export type GetContentAboutUsQuery = { __typename?: 'Query', getContentAboutUs?: { __typename?: 'ContentAboutUs', _id: string, language?: EnumLanguage | null, SEOTitle?: string | null, SEODescription?: string | null, SEOKeywords?: string | null, SEO_OGTitle?: string | null, SEO_OGDescription?: string | null, SEO_OGImage?: string | null, Content?: string | null } | null };

export type GetContentPurchaseInfoQueryVariables = Exact<{
  language?: InputMaybe<EnumLanguage>;
}>;


export type GetContentPurchaseInfoQuery = { __typename?: 'Query', getContentPurchaseInfo?: { __typename?: 'ContentPurchaseInfo', _id: string, language?: EnumLanguage | null, SEOTitle?: string | null, SEODescription?: string | null, SEOKeywords?: string | null, SEO_OGTitle?: string | null, SEO_OGDescription?: string | null, SEO_OGImage?: string | null, Content?: string | null } | null };

export type GetContentSecurityQueryVariables = Exact<{
  language?: InputMaybe<EnumLanguage>;
}>;


export type GetContentSecurityQuery = { __typename?: 'Query', getContentSecurity?: { __typename?: 'ContentSecurity', _id: string, language?: EnumLanguage | null, SEOTitle?: string | null, SEODescription?: string | null, SEOKeywords?: string | null, SEO_OGTitle?: string | null, SEO_OGDescription?: string | null, SEO_OGImage?: string | null, Content?: string | null } | null };

export type GetCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomersQuery = { __typename?: 'Query', getCustomers?: Array<{ __typename?: 'Customer', _id: string, fullName?: string | null } | null> | null };

export type GetSettingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSettingQuery = { __typename?: 'Query', getSetting?: { __typename?: 'Setting', ecommerce?: { __typename?: 'EcomSetting', idWarehouse: string, defaultLang?: string | null } | null } | null };

export type ReportTotalOrderQueryVariables = Exact<{
  filter?: InputMaybe<FilterReportInput>;
}>;


export type ReportTotalOrderQuery = { __typename?: 'Query', reportTotalOrder?: { __typename?: 'ReportTotalOrderResponse', totalQuantity?: number | null, totalOrderForType?: Array<{ __typename?: 'TotalOrderForType', quantity?: number | null, type?: EnumOrderStatus | null } | null> | null } | null };

export type ReportRevenueQueryVariables = Exact<{
  filter?: InputMaybe<FilterReportInput>;
}>;


export type ReportRevenueQuery = { __typename?: 'Query', reportRevenue?: { __typename?: 'ReportRevenueResponse', totalRevenue?: number | null } | null };

export type SearchUserQueryVariables = Exact<{
  keyword?: InputMaybe<Scalars['String']>;
  idDefault?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type SearchUserQuery = { __typename?: 'Query', searchUser?: Array<{ __typename?: 'User', _id: string, displayName?: string | null, email?: string | null, customer?: { __typename?: 'Customer', _id: string, user_Id: string, email?: string | null, phoneNumber?: string | null, fullName?: string | null, deliveryAddress_Default?: { __typename?: 'DeliveryAddress', _id: string, idCustomer?: string | null, fullName?: string | null, phoneNumber?: string | null, detailAddress?: string | null } | null } | null } | null> | null };

export type SearchStaffQueryVariables = Exact<{
  keyWord?: InputMaybe<Scalars['String']>;
  idDefault?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  MaChucVu?: InputMaybe<Scalars['String']>;
  idDefaults?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type SearchStaffQuery = { __typename?: 'Query', searchStaff?: Array<{ __typename?: 'Staff', _id?: string | null, MaNhanVien?: string | null, TenNhanVien?: string | null } | null> | null };

export type GetOrderByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOrderByIdQuery = { __typename?: 'Query', getOrderById?: { __typename?: 'Order', _id: string, code?: string | null, idCustomer?: string | null, idStaff?: string | null, status?: EnumOrderStatus | null, paymentMethod?: EnumPaymentMethod | null, idDeliveryAddress?: string | null, orderedAt?: number | null, deliveryAt?: number | null, estimatedDeliveryAt?: number | null, transportFee?: number | null, note?: string | null, shippingUnit?: string | null, reasonCancel?: string | null, reasonFailed?: string | null, customerReasonCancel?: string | null, updatedAt?: number | null, customerCancelBy?: { __typename?: 'UserSlim', _id: string, fullName?: string | null } | null, updatedBy?: { __typename?: 'UserSlim', _id: string, fullName?: string | null } | null, failedBy?: { __typename?: 'UserSlim', _id: string, fullName?: string | null } | null, orderDetail?: Array<{ __typename?: 'OrderDetail', idOrder: string, idStockModel: string, count?: number | null, note?: string | null, total?: number | null, stockModel?: { __typename?: 'StockModel', code?: string | null, name?: string | null, prices?: Array<{ __typename?: 'StockModelPrice', idPriceType: string, price: Array<number | null> } | null> | null } | null } | null> | null, customer?: { __typename?: 'Customer', _id: string, email?: string | null, fullName?: string | null, phoneNumber?: string | null, user_Id: string } | null, deliveryAddress?: { __typename?: 'DeliveryAddress', _id: string, idCustomer?: string | null, fullName?: string | null, phoneNumber?: string | null, detailAddress?: string | null } | null } | null };

export type GetQuantityOderForTypeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuantityOderForTypeQuery = { __typename?: 'Query', getQuantityOderForType?: Array<{ __typename?: 'QuantityOrderForType', quantity?: number | null, type?: EnumOrderStatus | null } | null> | null };

export type SearchUserNotHaveStaffQueryVariables = Exact<{
  keyword?: InputMaybe<Scalars['String']>;
  idDefault?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  isUpdate?: InputMaybe<Scalars['Boolean']>;
}>;


export type SearchUserNotHaveStaffQuery = { __typename?: 'Query', searchUserNotHaveStaff?: Array<{ __typename?: 'User', _id: string, username: string } | null> | null };

export type GetBlogPaginationQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchBlogInput>> | InputMaybe<SearchBlogInput>>;
  filter?: InputMaybe<Array<InputMaybe<FilterBlogInput>> | InputMaybe<FilterBlogInput>>;
  sort?: InputMaybe<Array<InputMaybe<SortBlogInput>> | InputMaybe<SortBlogInput>>;
  idsDefault?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type GetBlogPaginationQuery = { __typename?: 'Query', getBlogPagination?: { __typename?: 'BlogPagination', currentPage?: number | null, data?: Array<{ __typename?: 'Blog', _id: string, title?: string | null, slug?: string | null, sortContent?: string | null, url?: string | null, cardinalNumber?: string | null, keywords?: string | null, isFeatureBlog?: boolean | null, status?: EnumBlogStatus | null, priority?: number | null, publishAt?: number | null, createdAt?: number | null, mainPhoto?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null, createdBy?: { __typename?: 'UserSlim', _id: string, username?: string | null, fullName?: string | null } | null, publishBy?: { __typename?: 'UserSlim', _id: string, username?: string | null, fullName?: string | null } | null } | null> | null } | null };

export type GetServicePaginationQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchServiceInput>> | InputMaybe<SearchServiceInput>>;
  filter?: InputMaybe<Array<InputMaybe<FilterServiceInput>> | InputMaybe<FilterServiceInput>>;
  sort?: InputMaybe<Array<InputMaybe<SortServiceInput>> | InputMaybe<SortServiceInput>>;
}>;


export type GetServicePaginationQuery = { __typename?: 'Query', getServicePagination?: { __typename?: 'ServicePagination', currentPage?: number | null, data?: Array<{ __typename?: 'Service', title?: string | null, slug?: string | null, _id: string, desciption?: string | null, url?: string | null, cardinalNumber?: string | null, keywords?: string | null, sortDescription?: string | null, createdAt?: number | null, createdBy?: { __typename?: 'UserSlim', _id: string, username?: string | null, fullName?: string | null } | null, mainPhoto?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null> | null } | null };

export type GetBlogPaginationTotalQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchBlogInput>> | InputMaybe<SearchBlogInput>>;
  filter?: InputMaybe<Array<InputMaybe<FilterBlogInput>> | InputMaybe<FilterBlogInput>>;
}>;


export type GetBlogPaginationTotalQuery = { __typename?: 'Query', getBlogPaginationTotal?: { __typename?: 'BlogPaginationTotal', currentPage?: number | null, totalRows?: number | null, totalPages?: number | null } | null };

export type GetServicePaginationTotalQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchServiceInput>> | InputMaybe<SearchServiceInput>>;
  filter?: InputMaybe<Array<InputMaybe<FilterServiceInput>> | InputMaybe<FilterServiceInput>>;
}>;


export type GetServicePaginationTotalQuery = { __typename?: 'Query', getServicePaginationTotal?: { __typename?: 'ServicePaginationTotal', currentPage?: number | null, totalRows?: number | null, totalPages?: number | null } | null };

export type GetBlogByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBlogByIdQuery = { __typename?: 'Query', getBlogById?: { __typename?: 'Blog', _id: string, title?: string | null, slug?: string | null, sortContent?: string | null, content?: string | null, url?: string | null, keywords?: string | null, isFeatureBlog?: boolean | null, status?: EnumBlogStatus | null, priority?: number | null, publishAt?: number | null, createdAt?: number | null, mainPhoto?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null, createdBy?: { __typename?: 'UserSlim', _id: string, username?: string | null, fullName?: string | null } | null, publishBy?: { __typename?: 'UserSlim', _id: string, username?: string | null, fullName?: string | null } | null } | null };

export type GetServiceByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetServiceByIdQuery = { __typename?: 'Query', getServiceById?: { __typename?: 'Service', _id: string, title?: string | null, slug?: string | null, sortDescription?: string | null, desciption?: string | null, keywords?: string | null, isDeleted?: boolean | null, createdAt?: number | null, mainPhoto?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null, createdBy?: { __typename?: 'UserSlim', _id: string, username?: string | null, fullName?: string | null } | null } | null };

export type GetPagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPagesQuery = { __typename?: 'Query', getPages?: Array<{ __typename?: 'Page', _id: string, title?: string | null, slug?: string | null, content?: string | null, status?: EnumPageStatus | null, createdAt?: number | null } | null> | null };

export type GetPageByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPageByIdQuery = { __typename?: 'Query', getPageById?: { __typename?: 'Page', _id: string, title?: string | null, slug?: string | null, content?: string | null, description?: string | null, keywords?: string | null, isAddToMainMenu?: boolean | null, isAddToFooterMenu?: boolean | null, status?: EnumPageStatus | null, createdAt?: number | null } | null };

export type GetPagePaginationQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchPageInput>> | InputMaybe<SearchPageInput>>;
  filter?: InputMaybe<Array<InputMaybe<FilterPageInput>> | InputMaybe<FilterPageInput>>;
  sort?: InputMaybe<Array<InputMaybe<SortPageInput>> | InputMaybe<SortPageInput>>;
}>;


export type GetPagePaginationQuery = { __typename?: 'Query', getPagePagination?: { __typename?: 'PagePagination', currentPage?: number | null, data?: Array<{ __typename?: 'Page', _id: string, title?: string | null, slug?: string | null, content?: string | null, description?: string | null, url?: string | null, cardinalNumber?: string | null, status?: EnumPageStatus | null, createdAt?: number | null, createdBy?: { __typename?: 'UserSlim', username?: string | null } | null } | null> | null } | null };

export type GetPagePaginationTotalQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchPageInput>> | InputMaybe<SearchPageInput>>;
  filter?: InputMaybe<Array<InputMaybe<FilterPageInput>> | InputMaybe<FilterPageInput>>;
}>;


export type GetPagePaginationTotalQuery = { __typename?: 'Query', getPagePaginationTotal?: { __typename?: 'PagePaginationTotal', totalPages?: number | null, totalRows?: number | null, currentPage?: number | null } | null };

export type GetContentHistoryQueryVariables = Exact<{
  idContent: Scalars['String'];
  type: EnumContentHistoryType;
}>;


export type GetContentHistoryQuery = { __typename?: 'Query', getContentHistory?: Array<{ __typename?: 'ContentHistory', _id: string, type?: EnumContentHistoryType | null, version?: number | null, name?: string | null, idPage?: string | null, createdAt?: number | null, updatedAt?: number | null, dataPage?: { __typename?: 'Page', title?: string | null, content?: string | null, description?: string | null, keywords?: string | null, isAddToMainMenu?: boolean | null, isAddToFooterMenu?: boolean | null, status?: EnumPageStatus | null } | null, createdBy?: { __typename?: 'UserSlim', username?: string | null } | null, updatedBy?: { __typename?: 'UserSlim', username?: string | null } | null } | null> | null };

export type GetMapBlogRelatedsByBlogQueryVariables = Exact<{
  idBlog: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetMapBlogRelatedsByBlogQuery = { __typename?: 'Query', getMapBlogRelatedsByBlog?: Array<{ __typename?: 'MapBlogRelated', idBlog?: string | null, idBlogRelated?: string | null, blogRelated?: { __typename?: 'Blog', title?: string | null, publishAt?: number | null, sortContent?: string | null, slug?: string | null, mainPhoto?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null } | null> | null };

export type GetMapBlogRelatedsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMapBlogRelatedsQuery = { __typename?: 'Query', getMapBlogRelateds?: Array<{ __typename?: 'MapBlogRelated', _id: string, idBlog?: string | null, idBlogRelated?: string | null, blogRelated?: { __typename?: 'Blog', title?: string | null, publishAt?: number | null, sortContent?: string | null, slug?: string | null, mainPhoto?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null } | null> | null };

export type GetBlogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlogsQuery = { __typename?: 'Query', getBlogs?: Array<{ __typename?: 'Blog', _id: string, title?: string | null, slug?: string | null, sortContent?: string | null, url?: string | null, keywords?: string | null, isFeatureBlog?: boolean | null, status?: EnumBlogStatus | null, publishAt?: number | null, createdAt?: number | null, mainPhoto?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null, createdBy?: { __typename?: 'UserSlim', _id: string, username?: string | null, fullName?: string | null } | null, publishBy?: { __typename?: 'UserSlim', _id: string, username?: string | null, fullName?: string | null } | null } | null> | null };

export type GetUsersTypeAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersTypeAdminQuery = { __typename?: 'Query', getUsersTypeAdmin?: Array<{ __typename?: 'User', username: string, phoneNumber?: string | null, note?: string | null, _id: string, isLocked?: boolean | null, createdAt?: number | null, displayName?: string | null, email?: string | null, updatedBy?: { __typename?: 'UserSlim', username?: string | null } | null, employee?: { __typename?: 'Staff', _id?: string | null } | null, customer?: { __typename?: 'Customer', _id: string, user_Id: string, email?: string | null, phoneNumber?: string | null, fullName?: string | null, deliveryAddress_Default?: { __typename?: 'DeliveryAddress', _id: string, idCustomer?: string | null, fullName?: string | null, phoneNumber?: string | null, detailAddress?: string | null } | null } | null } | null> | null };

export type GetEmailOnSubsPaginationQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchEmailInput>> | InputMaybe<SearchEmailInput>>;
  filter?: InputMaybe<Array<InputMaybe<FilterEmailInput>> | InputMaybe<FilterEmailInput>>;
  sort?: InputMaybe<Array<InputMaybe<SortEmailInput>> | InputMaybe<SortEmailInput>>;
}>;


export type GetEmailOnSubsPaginationQuery = { __typename?: 'Query', getEmailOnSubsPagination?: { __typename?: 'EmailPagination', currentPage?: number | null, data?: Array<{ __typename?: 'Subscriber', _id: string, email?: string | null, status?: EnumSubscriberStatus | null, subscribeAt?: number | null, cardinalNumber?: string | null, createdAt?: number | null, updatedAt?: number | null, createdBy?: { __typename?: 'UserSlim', username?: string | null, fullName?: string | null } | null } | null> | null } | null };

export type GetMailContactPaginationQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchMailContactInput>> | InputMaybe<SearchMailContactInput>>;
  filter?: InputMaybe<Array<InputMaybe<FilterMailContactInput>> | InputMaybe<FilterMailContactInput>>;
  sort?: InputMaybe<Array<InputMaybe<SortMailContactInput>> | InputMaybe<SortMailContactInput>>;
}>;


export type GetMailContactPaginationQuery = { __typename?: 'Query', getMailContactPagination?: { __typename?: 'MailContactPagination', currentPage?: number | null, data?: Array<{ __typename?: 'MailContact', _id?: string | null, email?: string | null, phoneNumber?: string | null, fullName?: string | null, subject?: string | null, idService?: string | null, topic?: EnumTopicContact | null, message?: string | null, status?: EnumMailContactStatus | null, cardinalNumber?: string | null, createdAt?: number | null, updateAt?: number | null, service?: { __typename?: 'Service', title?: string | null } | null, createdBy?: { __typename?: 'UserSlim', username?: string | null, fullName?: string | null } | null } | null> | null } | null };

export type GetEmailOnSubsPaginationTotalQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchEmailInput>> | InputMaybe<SearchEmailInput>>;
  filter?: InputMaybe<Array<InputMaybe<FilterEmailInput>> | InputMaybe<FilterEmailInput>>;
}>;


export type GetEmailOnSubsPaginationTotalQuery = { __typename?: 'Query', getEmailOnSubsPaginationTotal?: { __typename?: 'EmailPaginationTotal', totalPages?: number | null, totalRows?: number | null, currentPage?: number | null } | null };

export type GetMailContactPaginationTotalQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Array<InputMaybe<SearchMailContactInput>> | InputMaybe<SearchMailContactInput>>;
  filter?: InputMaybe<Array<InputMaybe<FilterMailContactInput>> | InputMaybe<FilterMailContactInput>>;
}>;


export type GetMailContactPaginationTotalQuery = { __typename?: 'Query', getMailContactPaginationTotal?: { __typename?: 'MailContactPaginationTotal', totalPages?: number | null, totalRows?: number | null, currentPage?: number | null } | null };

export type GetMapServiceProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMapServiceProductsQuery = { __typename?: 'Query', getMapServiceProducts?: Array<{ __typename?: 'MapServiceProduct', _id: string, idService?: string | null, idStockModel?: string | null, createdAt?: number | null, stockModel?: { __typename?: 'StockModel', _id?: string | null, code?: string | null, name?: string | null } | null, service?: { __typename?: 'Service', _id: string, title?: string | null } | null, createdBy?: { __typename?: 'UserSlim', username?: string | null } | null } | null> | null };

export type GetServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServicesQuery = { __typename?: 'Query', getServices?: Array<{ __typename?: 'Service', _id: string, title?: string | null } | null> | null };

export type GetMapServiceProductsByServiceQueryVariables = Exact<{
  idService: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetMapServiceProductsByServiceQuery = { __typename?: 'Query', getMapServiceProductsByService?: Array<{ __typename?: 'MapServiceProduct', _id: string, idService?: string | null, idStockModel?: string | null, stockModel?: { __typename?: 'StockModel', _id?: string | null, code?: string | null, name?: string | null, upc?: string | null, sku?: string | null, ecomStatus?: EnumStockModelStatus | null, ecomImages?: Array<{ __typename?: 'StockModelImage', altTextImage?: string | null, linkImage?: { __typename?: 'LinkImage', url?: string | null, fileName?: string | null, type?: TypeImage | null } | null } | null> | null } | null, service?: { __typename?: 'Service', _id: string, title?: string | null, mainPhoto?: { __typename?: 'LinkImage', url?: string | null } | null } | null } | null> | null };


export const CreateEcomCategoriesDocument = gql`
    mutation createEcomCategories($input: EcomCategoriesInput!) {
  createEcomCategories(input: $input) {
    _id
  }
}
    `;
export type CreateEcomCategoriesMutationFn = Apollo.MutationFunction<CreateEcomCategoriesMutation, CreateEcomCategoriesMutationVariables>;

/**
 * __useCreateEcomCategoriesMutation__
 *
 * To run a mutation, you first call `useCreateEcomCategoriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEcomCategoriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEcomCategoriesMutation, { data, loading, error }] = useCreateEcomCategoriesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEcomCategoriesMutation(baseOptions?: Apollo.MutationHookOptions<CreateEcomCategoriesMutation, CreateEcomCategoriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEcomCategoriesMutation, CreateEcomCategoriesMutationVariables>(CreateEcomCategoriesDocument, options);
      }
export type CreateEcomCategoriesMutationHookResult = ReturnType<typeof useCreateEcomCategoriesMutation>;
export type CreateEcomCategoriesMutationResult = Apollo.MutationResult<CreateEcomCategoriesMutation>;
export type CreateEcomCategoriesMutationOptions = Apollo.BaseMutationOptions<CreateEcomCategoriesMutation, CreateEcomCategoriesMutationVariables>;
export const UpdateEcomCategoriesDocument = gql`
    mutation updateEcomCategories($id: ID!, $input: EcomCategoriesInput!) {
  updateEcomCategories(id: $id, input: $input) {
    _id
  }
}
    `;
export type UpdateEcomCategoriesMutationFn = Apollo.MutationFunction<UpdateEcomCategoriesMutation, UpdateEcomCategoriesMutationVariables>;

/**
 * __useUpdateEcomCategoriesMutation__
 *
 * To run a mutation, you first call `useUpdateEcomCategoriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEcomCategoriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEcomCategoriesMutation, { data, loading, error }] = useUpdateEcomCategoriesMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEcomCategoriesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEcomCategoriesMutation, UpdateEcomCategoriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEcomCategoriesMutation, UpdateEcomCategoriesMutationVariables>(UpdateEcomCategoriesDocument, options);
      }
export type UpdateEcomCategoriesMutationHookResult = ReturnType<typeof useUpdateEcomCategoriesMutation>;
export type UpdateEcomCategoriesMutationResult = Apollo.MutationResult<UpdateEcomCategoriesMutation>;
export type UpdateEcomCategoriesMutationOptions = Apollo.BaseMutationOptions<UpdateEcomCategoriesMutation, UpdateEcomCategoriesMutationVariables>;
export const RemoveEcomCategoriesDocument = gql`
    mutation removeEcomCategories($ids: [ID!]) {
  removeEcomCategories(ids: $ids)
}
    `;
export type RemoveEcomCategoriesMutationFn = Apollo.MutationFunction<RemoveEcomCategoriesMutation, RemoveEcomCategoriesMutationVariables>;

/**
 * __useRemoveEcomCategoriesMutation__
 *
 * To run a mutation, you first call `useRemoveEcomCategoriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEcomCategoriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEcomCategoriesMutation, { data, loading, error }] = useRemoveEcomCategoriesMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useRemoveEcomCategoriesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveEcomCategoriesMutation, RemoveEcomCategoriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveEcomCategoriesMutation, RemoveEcomCategoriesMutationVariables>(RemoveEcomCategoriesDocument, options);
      }
export type RemoveEcomCategoriesMutationHookResult = ReturnType<typeof useRemoveEcomCategoriesMutation>;
export type RemoveEcomCategoriesMutationResult = Apollo.MutationResult<RemoveEcomCategoriesMutation>;
export type RemoveEcomCategoriesMutationOptions = Apollo.BaseMutationOptions<RemoveEcomCategoriesMutation, RemoveEcomCategoriesMutationVariables>;
export const CreateStockModelDocument = gql`
    mutation createStockModel($input: StockModelInput!, $idsStockModelRelated: [ID]) {
  createStockModel(input: $input, idsStockModelRelated: $idsStockModelRelated) {
    _id
  }
}
    `;
export type CreateStockModelMutationFn = Apollo.MutationFunction<CreateStockModelMutation, CreateStockModelMutationVariables>;

/**
 * __useCreateStockModelMutation__
 *
 * To run a mutation, you first call `useCreateStockModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStockModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStockModelMutation, { data, loading, error }] = useCreateStockModelMutation({
 *   variables: {
 *      input: // value for 'input'
 *      idsStockModelRelated: // value for 'idsStockModelRelated'
 *   },
 * });
 */
export function useCreateStockModelMutation(baseOptions?: Apollo.MutationHookOptions<CreateStockModelMutation, CreateStockModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStockModelMutation, CreateStockModelMutationVariables>(CreateStockModelDocument, options);
      }
export type CreateStockModelMutationHookResult = ReturnType<typeof useCreateStockModelMutation>;
export type CreateStockModelMutationResult = Apollo.MutationResult<CreateStockModelMutation>;
export type CreateStockModelMutationOptions = Apollo.BaseMutationOptions<CreateStockModelMutation, CreateStockModelMutationVariables>;
export const UpdateStockModelDocument = gql`
    mutation updateStockModel($id: String!, $input: StockModelInput!, $idsStockModelRelated: [ID]) {
  updateStockModel(
    _id: $id
    input: $input
    idsStockModelRelated: $idsStockModelRelated
  ) {
    _id
  }
}
    `;
export type UpdateStockModelMutationFn = Apollo.MutationFunction<UpdateStockModelMutation, UpdateStockModelMutationVariables>;

/**
 * __useUpdateStockModelMutation__
 *
 * To run a mutation, you first call `useUpdateStockModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStockModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStockModelMutation, { data, loading, error }] = useUpdateStockModelMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      idsStockModelRelated: // value for 'idsStockModelRelated'
 *   },
 * });
 */
export function useUpdateStockModelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStockModelMutation, UpdateStockModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStockModelMutation, UpdateStockModelMutationVariables>(UpdateStockModelDocument, options);
      }
export type UpdateStockModelMutationHookResult = ReturnType<typeof useUpdateStockModelMutation>;
export type UpdateStockModelMutationResult = Apollo.MutationResult<UpdateStockModelMutation>;
export type UpdateStockModelMutationOptions = Apollo.BaseMutationOptions<UpdateStockModelMutation, UpdateStockModelMutationVariables>;
export const DeleteStockModelDocument = gql`
    mutation deleteStockModel($id: String!) {
  deleteStockModel(_id: $id) {
    _id
  }
}
    `;
export type DeleteStockModelMutationFn = Apollo.MutationFunction<DeleteStockModelMutation, DeleteStockModelMutationVariables>;

/**
 * __useDeleteStockModelMutation__
 *
 * To run a mutation, you first call `useDeleteStockModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStockModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStockModelMutation, { data, loading, error }] = useDeleteStockModelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStockModelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStockModelMutation, DeleteStockModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStockModelMutation, DeleteStockModelMutationVariables>(DeleteStockModelDocument, options);
      }
export type DeleteStockModelMutationHookResult = ReturnType<typeof useDeleteStockModelMutation>;
export type DeleteStockModelMutationResult = Apollo.MutationResult<DeleteStockModelMutation>;
export type DeleteStockModelMutationOptions = Apollo.BaseMutationOptions<DeleteStockModelMutation, DeleteStockModelMutationVariables>;
export const CreateOrUpdateContentHomePageDocument = gql`
    mutation createOrUpdateContentHomePage($input: InputContentHomePage!) {
  createOrUpdateContentHomePage(input: $input) {
    _id
  }
}
    `;
export type CreateOrUpdateContentHomePageMutationFn = Apollo.MutationFunction<CreateOrUpdateContentHomePageMutation, CreateOrUpdateContentHomePageMutationVariables>;

/**
 * __useCreateOrUpdateContentHomePageMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateContentHomePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateContentHomePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateContentHomePageMutation, { data, loading, error }] = useCreateOrUpdateContentHomePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateContentHomePageMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateContentHomePageMutation, CreateOrUpdateContentHomePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateContentHomePageMutation, CreateOrUpdateContentHomePageMutationVariables>(CreateOrUpdateContentHomePageDocument, options);
      }
export type CreateOrUpdateContentHomePageMutationHookResult = ReturnType<typeof useCreateOrUpdateContentHomePageMutation>;
export type CreateOrUpdateContentHomePageMutationResult = Apollo.MutationResult<CreateOrUpdateContentHomePageMutation>;
export type CreateOrUpdateContentHomePageMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateContentHomePageMutation, CreateOrUpdateContentHomePageMutationVariables>;
export const CreateOrUpdateContentMenuDocument = gql`
    mutation createOrUpdateContentMenu($input: InputContentMenu!) {
  createOrUpdateContentMenu(input: $input) {
    _id
  }
}
    `;
export type CreateOrUpdateContentMenuMutationFn = Apollo.MutationFunction<CreateOrUpdateContentMenuMutation, CreateOrUpdateContentMenuMutationVariables>;

/**
 * __useCreateOrUpdateContentMenuMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateContentMenuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateContentMenuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateContentMenuMutation, { data, loading, error }] = useCreateOrUpdateContentMenuMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateContentMenuMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateContentMenuMutation, CreateOrUpdateContentMenuMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateContentMenuMutation, CreateOrUpdateContentMenuMutationVariables>(CreateOrUpdateContentMenuDocument, options);
      }
export type CreateOrUpdateContentMenuMutationHookResult = ReturnType<typeof useCreateOrUpdateContentMenuMutation>;
export type CreateOrUpdateContentMenuMutationResult = Apollo.MutationResult<CreateOrUpdateContentMenuMutation>;
export type CreateOrUpdateContentMenuMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateContentMenuMutation, CreateOrUpdateContentMenuMutationVariables>;
export const CreateOrUpdateContentContactDocument = gql`
    mutation createOrUpdateContentContact($input: InputContentContact!) {
  createOrUpdateContentContact(input: $input) {
    _id
  }
}
    `;
export type CreateOrUpdateContentContactMutationFn = Apollo.MutationFunction<CreateOrUpdateContentContactMutation, CreateOrUpdateContentContactMutationVariables>;

/**
 * __useCreateOrUpdateContentContactMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateContentContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateContentContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateContentContactMutation, { data, loading, error }] = useCreateOrUpdateContentContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateContentContactMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateContentContactMutation, CreateOrUpdateContentContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateContentContactMutation, CreateOrUpdateContentContactMutationVariables>(CreateOrUpdateContentContactDocument, options);
      }
export type CreateOrUpdateContentContactMutationHookResult = ReturnType<typeof useCreateOrUpdateContentContactMutation>;
export type CreateOrUpdateContentContactMutationResult = Apollo.MutationResult<CreateOrUpdateContentContactMutation>;
export type CreateOrUpdateContentContactMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateContentContactMutation, CreateOrUpdateContentContactMutationVariables>;
export const CreateOrUpdateContentFooterDocument = gql`
    mutation createOrUpdateContentFooter($input: InputContentFooter!) {
  createOrUpdateContentFooter(input: $input) {
    _id
  }
}
    `;
export type CreateOrUpdateContentFooterMutationFn = Apollo.MutationFunction<CreateOrUpdateContentFooterMutation, CreateOrUpdateContentFooterMutationVariables>;

/**
 * __useCreateOrUpdateContentFooterMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateContentFooterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateContentFooterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateContentFooterMutation, { data, loading, error }] = useCreateOrUpdateContentFooterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateContentFooterMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateContentFooterMutation, CreateOrUpdateContentFooterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateContentFooterMutation, CreateOrUpdateContentFooterMutationVariables>(CreateOrUpdateContentFooterDocument, options);
      }
export type CreateOrUpdateContentFooterMutationHookResult = ReturnType<typeof useCreateOrUpdateContentFooterMutation>;
export type CreateOrUpdateContentFooterMutationResult = Apollo.MutationResult<CreateOrUpdateContentFooterMutation>;
export type CreateOrUpdateContentFooterMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateContentFooterMutation, CreateOrUpdateContentFooterMutationVariables>;
export const CreateLatestProductByIdDocument = gql`
    mutation createLatestProductById($idStockModel: ID!) {
  createLatestProductById(idStockModel: $idStockModel) {
    _id
  }
}
    `;
export type CreateLatestProductByIdMutationFn = Apollo.MutationFunction<CreateLatestProductByIdMutation, CreateLatestProductByIdMutationVariables>;

/**
 * __useCreateLatestProductByIdMutation__
 *
 * To run a mutation, you first call `useCreateLatestProductByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLatestProductByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLatestProductByIdMutation, { data, loading, error }] = useCreateLatestProductByIdMutation({
 *   variables: {
 *      idStockModel: // value for 'idStockModel'
 *   },
 * });
 */
export function useCreateLatestProductByIdMutation(baseOptions?: Apollo.MutationHookOptions<CreateLatestProductByIdMutation, CreateLatestProductByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLatestProductByIdMutation, CreateLatestProductByIdMutationVariables>(CreateLatestProductByIdDocument, options);
      }
export type CreateLatestProductByIdMutationHookResult = ReturnType<typeof useCreateLatestProductByIdMutation>;
export type CreateLatestProductByIdMutationResult = Apollo.MutationResult<CreateLatestProductByIdMutation>;
export type CreateLatestProductByIdMutationOptions = Apollo.BaseMutationOptions<CreateLatestProductByIdMutation, CreateLatestProductByIdMutationVariables>;
export const DeleteLatestProductByIdDocument = gql`
    mutation deleteLatestProductById($idStockModel: ID!) {
  deleteLatestProductById(idStockModel: $idStockModel) {
    _id
  }
}
    `;
export type DeleteLatestProductByIdMutationFn = Apollo.MutationFunction<DeleteLatestProductByIdMutation, DeleteLatestProductByIdMutationVariables>;

/**
 * __useDeleteLatestProductByIdMutation__
 *
 * To run a mutation, you first call `useDeleteLatestProductByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLatestProductByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLatestProductByIdMutation, { data, loading, error }] = useDeleteLatestProductByIdMutation({
 *   variables: {
 *      idStockModel: // value for 'idStockModel'
 *   },
 * });
 */
export function useDeleteLatestProductByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLatestProductByIdMutation, DeleteLatestProductByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLatestProductByIdMutation, DeleteLatestProductByIdMutationVariables>(DeleteLatestProductByIdDocument, options);
      }
export type DeleteLatestProductByIdMutationHookResult = ReturnType<typeof useDeleteLatestProductByIdMutation>;
export type DeleteLatestProductByIdMutationResult = Apollo.MutationResult<DeleteLatestProductByIdMutation>;
export type DeleteLatestProductByIdMutationOptions = Apollo.BaseMutationOptions<DeleteLatestProductByIdMutation, DeleteLatestProductByIdMutationVariables>;
export const CreateStaffDocument = gql`
    mutation createStaff($input: StaffInput!) {
  createStaff(input: $input)
}
    `;
export type CreateStaffMutationFn = Apollo.MutationFunction<CreateStaffMutation, CreateStaffMutationVariables>;

/**
 * __useCreateStaffMutation__
 *
 * To run a mutation, you first call `useCreateStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStaffMutation, { data, loading, error }] = useCreateStaffMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStaffMutation(baseOptions?: Apollo.MutationHookOptions<CreateStaffMutation, CreateStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStaffMutation, CreateStaffMutationVariables>(CreateStaffDocument, options);
      }
export type CreateStaffMutationHookResult = ReturnType<typeof useCreateStaffMutation>;
export type CreateStaffMutationResult = Apollo.MutationResult<CreateStaffMutation>;
export type CreateStaffMutationOptions = Apollo.BaseMutationOptions<CreateStaffMutation, CreateStaffMutationVariables>;
export const UpdateStaffDocument = gql`
    mutation updateStaff($id: ID!, $input: StaffInput!) {
  updateStaff(id: $id, input: $input)
}
    `;
export type UpdateStaffMutationFn = Apollo.MutationFunction<UpdateStaffMutation, UpdateStaffMutationVariables>;

/**
 * __useUpdateStaffMutation__
 *
 * To run a mutation, you first call `useUpdateStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStaffMutation, { data, loading, error }] = useUpdateStaffMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStaffMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStaffMutation, UpdateStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStaffMutation, UpdateStaffMutationVariables>(UpdateStaffDocument, options);
      }
export type UpdateStaffMutationHookResult = ReturnType<typeof useUpdateStaffMutation>;
export type UpdateStaffMutationResult = Apollo.MutationResult<UpdateStaffMutation>;
export type UpdateStaffMutationOptions = Apollo.BaseMutationOptions<UpdateStaffMutation, UpdateStaffMutationVariables>;
export const RemoveStaffDocument = gql`
    mutation removeStaff($ids: [ID!]!) {
  removeStaff(ids: $ids)
}
    `;
export type RemoveStaffMutationFn = Apollo.MutationFunction<RemoveStaffMutation, RemoveStaffMutationVariables>;

/**
 * __useRemoveStaffMutation__
 *
 * To run a mutation, you first call `useRemoveStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStaffMutation, { data, loading, error }] = useRemoveStaffMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useRemoveStaffMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStaffMutation, RemoveStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveStaffMutation, RemoveStaffMutationVariables>(RemoveStaffDocument, options);
      }
export type RemoveStaffMutationHookResult = ReturnType<typeof useRemoveStaffMutation>;
export type RemoveStaffMutationResult = Apollo.MutationResult<RemoveStaffMutation>;
export type RemoveStaffMutationOptions = Apollo.BaseMutationOptions<RemoveStaffMutation, RemoveStaffMutationVariables>;
export const UpdateCancelPublicCategoriesDocument = gql`
    mutation updateCancelPublicCategories($id: ID!) {
  updateCancelPublicCategories(id: $id)
}
    `;
export type UpdateCancelPublicCategoriesMutationFn = Apollo.MutationFunction<UpdateCancelPublicCategoriesMutation, UpdateCancelPublicCategoriesMutationVariables>;

/**
 * __useUpdateCancelPublicCategoriesMutation__
 *
 * To run a mutation, you first call `useUpdateCancelPublicCategoriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCancelPublicCategoriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCancelPublicCategoriesMutation, { data, loading, error }] = useUpdateCancelPublicCategoriesMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateCancelPublicCategoriesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCancelPublicCategoriesMutation, UpdateCancelPublicCategoriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCancelPublicCategoriesMutation, UpdateCancelPublicCategoriesMutationVariables>(UpdateCancelPublicCategoriesDocument, options);
      }
export type UpdateCancelPublicCategoriesMutationHookResult = ReturnType<typeof useUpdateCancelPublicCategoriesMutation>;
export type UpdateCancelPublicCategoriesMutationResult = Apollo.MutationResult<UpdateCancelPublicCategoriesMutation>;
export type UpdateCancelPublicCategoriesMutationOptions = Apollo.BaseMutationOptions<UpdateCancelPublicCategoriesMutation, UpdateCancelPublicCategoriesMutationVariables>;
export const UpdateUserOverrideDocument = gql`
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
    `;
export type UpdateUserOverrideMutationFn = Apollo.MutationFunction<UpdateUserOverrideMutation, UpdateUserOverrideMutationVariables>;

/**
 * __useUpdateUserOverrideMutation__
 *
 * To run a mutation, you first call `useUpdateUserOverrideMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserOverrideMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserOverrideMutation, { data, loading, error }] = useUpdateUserOverrideMutation({
 *   variables: {
 *      input: // value for 'input'
 *      idUser: // value for 'idUser'
 *   },
 * });
 */
export function useUpdateUserOverrideMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserOverrideMutation, UpdateUserOverrideMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserOverrideMutation, UpdateUserOverrideMutationVariables>(UpdateUserOverrideDocument, options);
      }
export type UpdateUserOverrideMutationHookResult = ReturnType<typeof useUpdateUserOverrideMutation>;
export type UpdateUserOverrideMutationResult = Apollo.MutationResult<UpdateUserOverrideMutation>;
export type UpdateUserOverrideMutationOptions = Apollo.BaseMutationOptions<UpdateUserOverrideMutation, UpdateUserOverrideMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($input: NewUserInfo!, $language: String) {
  createUser(input: $input, language: $language) {
    _id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CreateOrUpdateContentAboutUsDocument = gql`
    mutation createOrUpdateContentAboutUs($language: EnumLanguage!, $input: InputContentAboutUs!) {
  createOrUpdateContentAboutUs(language: $language, input: $input) {
    _id
  }
}
    `;
export type CreateOrUpdateContentAboutUsMutationFn = Apollo.MutationFunction<CreateOrUpdateContentAboutUsMutation, CreateOrUpdateContentAboutUsMutationVariables>;

/**
 * __useCreateOrUpdateContentAboutUsMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateContentAboutUsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateContentAboutUsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateContentAboutUsMutation, { data, loading, error }] = useCreateOrUpdateContentAboutUsMutation({
 *   variables: {
 *      language: // value for 'language'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateContentAboutUsMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateContentAboutUsMutation, CreateOrUpdateContentAboutUsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateContentAboutUsMutation, CreateOrUpdateContentAboutUsMutationVariables>(CreateOrUpdateContentAboutUsDocument, options);
      }
export type CreateOrUpdateContentAboutUsMutationHookResult = ReturnType<typeof useCreateOrUpdateContentAboutUsMutation>;
export type CreateOrUpdateContentAboutUsMutationResult = Apollo.MutationResult<CreateOrUpdateContentAboutUsMutation>;
export type CreateOrUpdateContentAboutUsMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateContentAboutUsMutation, CreateOrUpdateContentAboutUsMutationVariables>;
export const CreateOrUpdateContentPurchaseInfoDocument = gql`
    mutation createOrUpdateContentPurchaseInfo($language: EnumLanguage!, $input: InputContentPurchaseInfo!) {
  createOrUpdateContentPurchaseInfo(language: $language, input: $input) {
    _id
  }
}
    `;
export type CreateOrUpdateContentPurchaseInfoMutationFn = Apollo.MutationFunction<CreateOrUpdateContentPurchaseInfoMutation, CreateOrUpdateContentPurchaseInfoMutationVariables>;

/**
 * __useCreateOrUpdateContentPurchaseInfoMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateContentPurchaseInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateContentPurchaseInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateContentPurchaseInfoMutation, { data, loading, error }] = useCreateOrUpdateContentPurchaseInfoMutation({
 *   variables: {
 *      language: // value for 'language'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateContentPurchaseInfoMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateContentPurchaseInfoMutation, CreateOrUpdateContentPurchaseInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateContentPurchaseInfoMutation, CreateOrUpdateContentPurchaseInfoMutationVariables>(CreateOrUpdateContentPurchaseInfoDocument, options);
      }
export type CreateOrUpdateContentPurchaseInfoMutationHookResult = ReturnType<typeof useCreateOrUpdateContentPurchaseInfoMutation>;
export type CreateOrUpdateContentPurchaseInfoMutationResult = Apollo.MutationResult<CreateOrUpdateContentPurchaseInfoMutation>;
export type CreateOrUpdateContentPurchaseInfoMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateContentPurchaseInfoMutation, CreateOrUpdateContentPurchaseInfoMutationVariables>;
export const CreateOrUpdateContentSecurityDocument = gql`
    mutation createOrUpdateContentSecurity($language: EnumLanguage!, $input: InputContentSecurity!) {
  createOrUpdateContentSecurity(language: $language, input: $input) {
    _id
  }
}
    `;
export type CreateOrUpdateContentSecurityMutationFn = Apollo.MutationFunction<CreateOrUpdateContentSecurityMutation, CreateOrUpdateContentSecurityMutationVariables>;

/**
 * __useCreateOrUpdateContentSecurityMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateContentSecurityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateContentSecurityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateContentSecurityMutation, { data, loading, error }] = useCreateOrUpdateContentSecurityMutation({
 *   variables: {
 *      language: // value for 'language'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateContentSecurityMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateContentSecurityMutation, CreateOrUpdateContentSecurityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateContentSecurityMutation, CreateOrUpdateContentSecurityMutationVariables>(CreateOrUpdateContentSecurityDocument, options);
      }
export type CreateOrUpdateContentSecurityMutationHookResult = ReturnType<typeof useCreateOrUpdateContentSecurityMutation>;
export type CreateOrUpdateContentSecurityMutationResult = Apollo.MutationResult<CreateOrUpdateContentSecurityMutation>;
export type CreateOrUpdateContentSecurityMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateContentSecurityMutation, CreateOrUpdateContentSecurityMutationVariables>;
export const CreateOrder2Document = gql`
    mutation createOrder2($input: InputOrder!) {
  createOrder2(input: $input) {
    _id
  }
}
    `;
export type CreateOrder2MutationFn = Apollo.MutationFunction<CreateOrder2Mutation, CreateOrder2MutationVariables>;

/**
 * __useCreateOrder2Mutation__
 *
 * To run a mutation, you first call `useCreateOrder2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrder2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrder2Mutation, { data, loading, error }] = useCreateOrder2Mutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrder2Mutation(baseOptions?: Apollo.MutationHookOptions<CreateOrder2Mutation, CreateOrder2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrder2Mutation, CreateOrder2MutationVariables>(CreateOrder2Document, options);
      }
export type CreateOrder2MutationHookResult = ReturnType<typeof useCreateOrder2Mutation>;
export type CreateOrder2MutationResult = Apollo.MutationResult<CreateOrder2Mutation>;
export type CreateOrder2MutationOptions = Apollo.BaseMutationOptions<CreateOrder2Mutation, CreateOrder2MutationVariables>;
export const UpdateOrder2Document = gql`
    mutation updateOrder2($_id: ID!, $input: InputOrder) {
  updateOrder2(_id: $_id, input: $input) {
    _id
  }
}
    `;
export type UpdateOrder2MutationFn = Apollo.MutationFunction<UpdateOrder2Mutation, UpdateOrder2MutationVariables>;

/**
 * __useUpdateOrder2Mutation__
 *
 * To run a mutation, you first call `useUpdateOrder2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrder2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrder2Mutation, { data, loading, error }] = useUpdateOrder2Mutation({
 *   variables: {
 *      _id: // value for '_id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrder2Mutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrder2Mutation, UpdateOrder2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrder2Mutation, UpdateOrder2MutationVariables>(UpdateOrder2Document, options);
      }
export type UpdateOrder2MutationHookResult = ReturnType<typeof useUpdateOrder2Mutation>;
export type UpdateOrder2MutationResult = Apollo.MutationResult<UpdateOrder2Mutation>;
export type UpdateOrder2MutationOptions = Apollo.BaseMutationOptions<UpdateOrder2Mutation, UpdateOrder2MutationVariables>;
export const UpdateOrderStatusDocument = gql`
    mutation updateOrderStatus($_ids: [ID!]!, $oldStatus: EnumOrderStatus!, $newStatus: EnumOrderStatus!) {
  updateOrderStatus(_ids: $_ids, oldStatus: $oldStatus, newStatus: $newStatus)
}
    `;
export type UpdateOrderStatusMutationFn = Apollo.MutationFunction<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>;

/**
 * __useUpdateOrderStatusMutation__
 *
 * To run a mutation, you first call `useUpdateOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderStatusMutation, { data, loading, error }] = useUpdateOrderStatusMutation({
 *   variables: {
 *      _ids: // value for '_ids'
 *      oldStatus: // value for 'oldStatus'
 *      newStatus: // value for 'newStatus'
 *   },
 * });
 */
export function useUpdateOrderStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>(UpdateOrderStatusDocument, options);
      }
export type UpdateOrderStatusMutationHookResult = ReturnType<typeof useUpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationResult = Apollo.MutationResult<UpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationOptions = Apollo.BaseMutationOptions<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>;
export const CancelOrder2Document = gql`
    mutation cancelOrder2($_id: ID!, $reasonCancel: String) {
  cancelOrder2(_id: $_id, reasonCancel: $reasonCancel)
}
    `;
export type CancelOrder2MutationFn = Apollo.MutationFunction<CancelOrder2Mutation, CancelOrder2MutationVariables>;

/**
 * __useCancelOrder2Mutation__
 *
 * To run a mutation, you first call `useCancelOrder2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelOrder2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelOrder2Mutation, { data, loading, error }] = useCancelOrder2Mutation({
 *   variables: {
 *      _id: // value for '_id'
 *      reasonCancel: // value for 'reasonCancel'
 *   },
 * });
 */
export function useCancelOrder2Mutation(baseOptions?: Apollo.MutationHookOptions<CancelOrder2Mutation, CancelOrder2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelOrder2Mutation, CancelOrder2MutationVariables>(CancelOrder2Document, options);
      }
export type CancelOrder2MutationHookResult = ReturnType<typeof useCancelOrder2Mutation>;
export type CancelOrder2MutationResult = Apollo.MutationResult<CancelOrder2Mutation>;
export type CancelOrder2MutationOptions = Apollo.BaseMutationOptions<CancelOrder2Mutation, CancelOrder2MutationVariables>;
export const UpdateSettingTypeDocument = gql`
    mutation updateSettingType($type: SettingType, $input: Scalar) {
  updateSettingType(type: $type, input: $input) {
    ecommerce {
      idWarehouse
    }
  }
}
    `;
export type UpdateSettingTypeMutationFn = Apollo.MutationFunction<UpdateSettingTypeMutation, UpdateSettingTypeMutationVariables>;

/**
 * __useUpdateSettingTypeMutation__
 *
 * To run a mutation, you first call `useUpdateSettingTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSettingTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSettingTypeMutation, { data, loading, error }] = useUpdateSettingTypeMutation({
 *   variables: {
 *      type: // value for 'type'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSettingTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSettingTypeMutation, UpdateSettingTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSettingTypeMutation, UpdateSettingTypeMutationVariables>(UpdateSettingTypeDocument, options);
      }
export type UpdateSettingTypeMutationHookResult = ReturnType<typeof useUpdateSettingTypeMutation>;
export type UpdateSettingTypeMutationResult = Apollo.MutationResult<UpdateSettingTypeMutation>;
export type UpdateSettingTypeMutationOptions = Apollo.BaseMutationOptions<UpdateSettingTypeMutation, UpdateSettingTypeMutationVariables>;
export const ConfirmOrderDocument = gql`
    mutation confirmOrder($id: ID!) {
  confirmOrder(id: $id) {
    _id
  }
}
    `;
export type ConfirmOrderMutationFn = Apollo.MutationFunction<ConfirmOrderMutation, ConfirmOrderMutationVariables>;

/**
 * __useConfirmOrderMutation__
 *
 * To run a mutation, you first call `useConfirmOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmOrderMutation, { data, loading, error }] = useConfirmOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useConfirmOrderMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmOrderMutation, ConfirmOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmOrderMutation, ConfirmOrderMutationVariables>(ConfirmOrderDocument, options);
      }
export type ConfirmOrderMutationHookResult = ReturnType<typeof useConfirmOrderMutation>;
export type ConfirmOrderMutationResult = Apollo.MutationResult<ConfirmOrderMutation>;
export type ConfirmOrderMutationOptions = Apollo.BaseMutationOptions<ConfirmOrderMutation, ConfirmOrderMutationVariables>;
export const ShipOrderDocument = gql`
    mutation shipOrder($_id: ID!, $input: String) {
  shipOrder(_id: $_id, input: $input)
}
    `;
export type ShipOrderMutationFn = Apollo.MutationFunction<ShipOrderMutation, ShipOrderMutationVariables>;

/**
 * __useShipOrderMutation__
 *
 * To run a mutation, you first call `useShipOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShipOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shipOrderMutation, { data, loading, error }] = useShipOrderMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useShipOrderMutation(baseOptions?: Apollo.MutationHookOptions<ShipOrderMutation, ShipOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShipOrderMutation, ShipOrderMutationVariables>(ShipOrderDocument, options);
      }
export type ShipOrderMutationHookResult = ReturnType<typeof useShipOrderMutation>;
export type ShipOrderMutationResult = Apollo.MutationResult<ShipOrderMutation>;
export type ShipOrderMutationOptions = Apollo.BaseMutationOptions<ShipOrderMutation, ShipOrderMutationVariables>;
export const ConfirmSuccessOrderDocument = gql`
    mutation confirmSuccessOrder($id: ID!) {
  confirmSuccessOrder(id: $id) {
    _id
  }
}
    `;
export type ConfirmSuccessOrderMutationFn = Apollo.MutationFunction<ConfirmSuccessOrderMutation, ConfirmSuccessOrderMutationVariables>;

/**
 * __useConfirmSuccessOrderMutation__
 *
 * To run a mutation, you first call `useConfirmSuccessOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmSuccessOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmSuccessOrderMutation, { data, loading, error }] = useConfirmSuccessOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useConfirmSuccessOrderMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmSuccessOrderMutation, ConfirmSuccessOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmSuccessOrderMutation, ConfirmSuccessOrderMutationVariables>(ConfirmSuccessOrderDocument, options);
      }
export type ConfirmSuccessOrderMutationHookResult = ReturnType<typeof useConfirmSuccessOrderMutation>;
export type ConfirmSuccessOrderMutationResult = Apollo.MutationResult<ConfirmSuccessOrderMutation>;
export type ConfirmSuccessOrderMutationOptions = Apollo.BaseMutationOptions<ConfirmSuccessOrderMutation, ConfirmSuccessOrderMutationVariables>;
export const ConfirmFailedOrderDocument = gql`
    mutation confirmFailedOrder($id: ID!, $reasonFailed: String) {
  confirmFailedOrder(id: $id, reasonFailed: $reasonFailed) {
    _id
  }
}
    `;
export type ConfirmFailedOrderMutationFn = Apollo.MutationFunction<ConfirmFailedOrderMutation, ConfirmFailedOrderMutationVariables>;

/**
 * __useConfirmFailedOrderMutation__
 *
 * To run a mutation, you first call `useConfirmFailedOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmFailedOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmFailedOrderMutation, { data, loading, error }] = useConfirmFailedOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reasonFailed: // value for 'reasonFailed'
 *   },
 * });
 */
export function useConfirmFailedOrderMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmFailedOrderMutation, ConfirmFailedOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmFailedOrderMutation, ConfirmFailedOrderMutationVariables>(ConfirmFailedOrderDocument, options);
      }
export type ConfirmFailedOrderMutationHookResult = ReturnType<typeof useConfirmFailedOrderMutation>;
export type ConfirmFailedOrderMutationResult = Apollo.MutationResult<ConfirmFailedOrderMutation>;
export type ConfirmFailedOrderMutationOptions = Apollo.BaseMutationOptions<ConfirmFailedOrderMutation, ConfirmFailedOrderMutationVariables>;
export const DeletePageDocument = gql`
    mutation deletePage($id: ID!) {
  deletePage(_id: $id) {
    _id
  }
}
    `;
export type DeletePageMutationFn = Apollo.MutationFunction<DeletePageMutation, DeletePageMutationVariables>;

/**
 * __useDeletePageMutation__
 *
 * To run a mutation, you first call `useDeletePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePageMutation, { data, loading, error }] = useDeletePageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePageMutation(baseOptions?: Apollo.MutationHookOptions<DeletePageMutation, DeletePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePageMutation, DeletePageMutationVariables>(DeletePageDocument, options);
      }
export type DeletePageMutationHookResult = ReturnType<typeof useDeletePageMutation>;
export type DeletePageMutationResult = Apollo.MutationResult<DeletePageMutation>;
export type DeletePageMutationOptions = Apollo.BaseMutationOptions<DeletePageMutation, DeletePageMutationVariables>;
export const CreateBlogDocument = gql`
    mutation createBlog($input: BlogInput!, $idsBlogRelated: [ID]) {
  createBlog(input: $input, idsBlogRelated: $idsBlogRelated) {
    _id
  }
}
    `;
export type CreateBlogMutationFn = Apollo.MutationFunction<CreateBlogMutation, CreateBlogMutationVariables>;

/**
 * __useCreateBlogMutation__
 *
 * To run a mutation, you first call `useCreateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogMutation, { data, loading, error }] = useCreateBlogMutation({
 *   variables: {
 *      input: // value for 'input'
 *      idsBlogRelated: // value for 'idsBlogRelated'
 *   },
 * });
 */
export function useCreateBlogMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlogMutation, CreateBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(CreateBlogDocument, options);
      }
export type CreateBlogMutationHookResult = ReturnType<typeof useCreateBlogMutation>;
export type CreateBlogMutationResult = Apollo.MutationResult<CreateBlogMutation>;
export type CreateBlogMutationOptions = Apollo.BaseMutationOptions<CreateBlogMutation, CreateBlogMutationVariables>;
export const CreatePageDocument = gql`
    mutation createPage($input: PageInput!) {
  createPage(input: $input) {
    _id
  }
}
    `;
export type CreatePageMutationFn = Apollo.MutationFunction<CreatePageMutation, CreatePageMutationVariables>;

/**
 * __useCreatePageMutation__
 *
 * To run a mutation, you first call `useCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPageMutation, { data, loading, error }] = useCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePageMutation(baseOptions?: Apollo.MutationHookOptions<CreatePageMutation, CreatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePageMutation, CreatePageMutationVariables>(CreatePageDocument, options);
      }
export type CreatePageMutationHookResult = ReturnType<typeof useCreatePageMutation>;
export type CreatePageMutationResult = Apollo.MutationResult<CreatePageMutation>;
export type CreatePageMutationOptions = Apollo.BaseMutationOptions<CreatePageMutation, CreatePageMutationVariables>;
export const UpdateBlogDocument = gql`
    mutation updateBlog($id: ID!, $input: BlogInput!, $idsBlogRelated: [ID]) {
  updateBlog(_id: $id, input: $input, idsBlogRelated: $idsBlogRelated) {
    _id
  }
}
    `;
export type UpdateBlogMutationFn = Apollo.MutationFunction<UpdateBlogMutation, UpdateBlogMutationVariables>;

/**
 * __useUpdateBlogMutation__
 *
 * To run a mutation, you first call `useUpdateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBlogMutation, { data, loading, error }] = useUpdateBlogMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      idsBlogRelated: // value for 'idsBlogRelated'
 *   },
 * });
 */
export function useUpdateBlogMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBlogMutation, UpdateBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBlogMutation, UpdateBlogMutationVariables>(UpdateBlogDocument, options);
      }
export type UpdateBlogMutationHookResult = ReturnType<typeof useUpdateBlogMutation>;
export type UpdateBlogMutationResult = Apollo.MutationResult<UpdateBlogMutation>;
export type UpdateBlogMutationOptions = Apollo.BaseMutationOptions<UpdateBlogMutation, UpdateBlogMutationVariables>;
export const UpdatePageDocument = gql`
    mutation updatePage($id: ID!, $input: PageInput!) {
  updatePage(_id: $id, input: $input) {
    _id
  }
}
    `;
export type UpdatePageMutationFn = Apollo.MutationFunction<UpdatePageMutation, UpdatePageMutationVariables>;

/**
 * __useUpdatePageMutation__
 *
 * To run a mutation, you first call `useUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageMutation, { data, loading, error }] = useUpdatePageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePageMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePageMutation, UpdatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePageMutation, UpdatePageMutationVariables>(UpdatePageDocument, options);
      }
export type UpdatePageMutationHookResult = ReturnType<typeof useUpdatePageMutation>;
export type UpdatePageMutationResult = Apollo.MutationResult<UpdatePageMutation>;
export type UpdatePageMutationOptions = Apollo.BaseMutationOptions<UpdatePageMutation, UpdatePageMutationVariables>;
export const DeleteBlogDocument = gql`
    mutation deleteBlog($ids: ID!) {
  deleteBlog(_id: $ids) {
    _id
  }
}
    `;
export type DeleteBlogMutationFn = Apollo.MutationFunction<DeleteBlogMutation, DeleteBlogMutationVariables>;

/**
 * __useDeleteBlogMutation__
 *
 * To run a mutation, you first call `useDeleteBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBlogMutation, { data, loading, error }] = useDeleteBlogMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteBlogMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBlogMutation, DeleteBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBlogMutation, DeleteBlogMutationVariables>(DeleteBlogDocument, options);
      }
export type DeleteBlogMutationHookResult = ReturnType<typeof useDeleteBlogMutation>;
export type DeleteBlogMutationResult = Apollo.MutationResult<DeleteBlogMutation>;
export type DeleteBlogMutationOptions = Apollo.BaseMutationOptions<DeleteBlogMutation, DeleteBlogMutationVariables>;
export const ChangePriorityBlogDocument = gql`
    mutation changePriorityBlog($ids: ID!) {
  changePriorityBlog(_id: $ids) {
    _id
  }
}
    `;
export type ChangePriorityBlogMutationFn = Apollo.MutationFunction<ChangePriorityBlogMutation, ChangePriorityBlogMutationVariables>;

/**
 * __useChangePriorityBlogMutation__
 *
 * To run a mutation, you first call `useChangePriorityBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePriorityBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePriorityBlogMutation, { data, loading, error }] = useChangePriorityBlogMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useChangePriorityBlogMutation(baseOptions?: Apollo.MutationHookOptions<ChangePriorityBlogMutation, ChangePriorityBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePriorityBlogMutation, ChangePriorityBlogMutationVariables>(ChangePriorityBlogDocument, options);
      }
export type ChangePriorityBlogMutationHookResult = ReturnType<typeof useChangePriorityBlogMutation>;
export type ChangePriorityBlogMutationResult = Apollo.MutationResult<ChangePriorityBlogMutation>;
export type ChangePriorityBlogMutationOptions = Apollo.BaseMutationOptions<ChangePriorityBlogMutation, ChangePriorityBlogMutationVariables>;
export const UnChangePriorityMultiBlogDocument = gql`
    mutation unChangePriorityMultiBlog($ids: [ID]) {
  unChangePriorityMultiBlog(ids: $ids) {
    _id
  }
}
    `;
export type UnChangePriorityMultiBlogMutationFn = Apollo.MutationFunction<UnChangePriorityMultiBlogMutation, UnChangePriorityMultiBlogMutationVariables>;

/**
 * __useUnChangePriorityMultiBlogMutation__
 *
 * To run a mutation, you first call `useUnChangePriorityMultiBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnChangePriorityMultiBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unChangePriorityMultiBlogMutation, { data, loading, error }] = useUnChangePriorityMultiBlogMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useUnChangePriorityMultiBlogMutation(baseOptions?: Apollo.MutationHookOptions<UnChangePriorityMultiBlogMutation, UnChangePriorityMultiBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnChangePriorityMultiBlogMutation, UnChangePriorityMultiBlogMutationVariables>(UnChangePriorityMultiBlogDocument, options);
      }
export type UnChangePriorityMultiBlogMutationHookResult = ReturnType<typeof useUnChangePriorityMultiBlogMutation>;
export type UnChangePriorityMultiBlogMutationResult = Apollo.MutationResult<UnChangePriorityMultiBlogMutation>;
export type UnChangePriorityMultiBlogMutationOptions = Apollo.BaseMutationOptions<UnChangePriorityMultiBlogMutation, UnChangePriorityMultiBlogMutationVariables>;
export const PublicBlogDocument = gql`
    mutation publicBlog($ids: ID!) {
  publicBlog(_id: $ids) {
    _id
  }
}
    `;
export type PublicBlogMutationFn = Apollo.MutationFunction<PublicBlogMutation, PublicBlogMutationVariables>;

/**
 * __usePublicBlogMutation__
 *
 * To run a mutation, you first call `usePublicBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublicBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publicBlogMutation, { data, loading, error }] = usePublicBlogMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function usePublicBlogMutation(baseOptions?: Apollo.MutationHookOptions<PublicBlogMutation, PublicBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublicBlogMutation, PublicBlogMutationVariables>(PublicBlogDocument, options);
      }
export type PublicBlogMutationHookResult = ReturnType<typeof usePublicBlogMutation>;
export type PublicBlogMutationResult = Apollo.MutationResult<PublicBlogMutation>;
export type PublicBlogMutationOptions = Apollo.BaseMutationOptions<PublicBlogMutation, PublicBlogMutationVariables>;
export const CreateServiceDocument = gql`
    mutation createService($input: ServiceInput!) {
  createService(input: $input) {
    _id
  }
}
    `;
export type CreateServiceMutationFn = Apollo.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>;

/**
 * __useCreateServiceMutation__
 *
 * To run a mutation, you first call `useCreateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceMutation, { data, loading, error }] = useCreateServiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateServiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceMutation, CreateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CreateServiceDocument, options);
      }
export type CreateServiceMutationHookResult = ReturnType<typeof useCreateServiceMutation>;
export type CreateServiceMutationResult = Apollo.MutationResult<CreateServiceMutation>;
export type CreateServiceMutationOptions = Apollo.BaseMutationOptions<CreateServiceMutation, CreateServiceMutationVariables>;
export const UpdateServiceDocument = gql`
    mutation updateService($id: ID!, $input: ServiceInput!) {
  updateService(_id: $id, input: $input) {
    _id
  }
}
    `;
export type UpdateServiceMutationFn = Apollo.MutationFunction<UpdateServiceMutation, UpdateServiceMutationVariables>;

/**
 * __useUpdateServiceMutation__
 *
 * To run a mutation, you first call `useUpdateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceMutation, { data, loading, error }] = useUpdateServiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateServiceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServiceMutation, UpdateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServiceMutation, UpdateServiceMutationVariables>(UpdateServiceDocument, options);
      }
export type UpdateServiceMutationHookResult = ReturnType<typeof useUpdateServiceMutation>;
export type UpdateServiceMutationResult = Apollo.MutationResult<UpdateServiceMutation>;
export type UpdateServiceMutationOptions = Apollo.BaseMutationOptions<UpdateServiceMutation, UpdateServiceMutationVariables>;
export const DeleteServiceDocument = gql`
    mutation deleteService($ids: ID!) {
  deleteService(_id: $ids) {
    _id
  }
}
    `;
export type DeleteServiceMutationFn = Apollo.MutationFunction<DeleteServiceMutation, DeleteServiceMutationVariables>;

/**
 * __useDeleteServiceMutation__
 *
 * To run a mutation, you first call `useDeleteServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServiceMutation, { data, loading, error }] = useDeleteServiceMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteServiceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServiceMutation, DeleteServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServiceMutation, DeleteServiceMutationVariables>(DeleteServiceDocument, options);
      }
export type DeleteServiceMutationHookResult = ReturnType<typeof useDeleteServiceMutation>;
export type DeleteServiceMutationResult = Apollo.MutationResult<DeleteServiceMutation>;
export type DeleteServiceMutationOptions = Apollo.BaseMutationOptions<DeleteServiceMutation, DeleteServiceMutationVariables>;
export const UpdateFeatureBlogDocument = gql`
    mutation updateFeatureBlog($ids: ID!) {
  updateFeatureBlog(_id: $ids) {
    _id
  }
}
    `;
export type UpdateFeatureBlogMutationFn = Apollo.MutationFunction<UpdateFeatureBlogMutation, UpdateFeatureBlogMutationVariables>;

/**
 * __useUpdateFeatureBlogMutation__
 *
 * To run a mutation, you first call `useUpdateFeatureBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFeatureBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFeatureBlogMutation, { data, loading, error }] = useUpdateFeatureBlogMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useUpdateFeatureBlogMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFeatureBlogMutation, UpdateFeatureBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFeatureBlogMutation, UpdateFeatureBlogMutationVariables>(UpdateFeatureBlogDocument, options);
      }
export type UpdateFeatureBlogMutationHookResult = ReturnType<typeof useUpdateFeatureBlogMutation>;
export type UpdateFeatureBlogMutationResult = Apollo.MutationResult<UpdateFeatureBlogMutation>;
export type UpdateFeatureBlogMutationOptions = Apollo.BaseMutationOptions<UpdateFeatureBlogMutation, UpdateFeatureBlogMutationVariables>;
export const DeleteMailContactDocument = gql`
    mutation deleteMailContact($ids: ID!) {
  deleteMailContact(_id: $ids) {
    _id
  }
}
    `;
export type DeleteMailContactMutationFn = Apollo.MutationFunction<DeleteMailContactMutation, DeleteMailContactMutationVariables>;

/**
 * __useDeleteMailContactMutation__
 *
 * To run a mutation, you first call `useDeleteMailContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMailContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMailContactMutation, { data, loading, error }] = useDeleteMailContactMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteMailContactMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMailContactMutation, DeleteMailContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMailContactMutation, DeleteMailContactMutationVariables>(DeleteMailContactDocument, options);
      }
export type DeleteMailContactMutationHookResult = ReturnType<typeof useDeleteMailContactMutation>;
export type DeleteMailContactMutationResult = Apollo.MutationResult<DeleteMailContactMutation>;
export type DeleteMailContactMutationOptions = Apollo.BaseMutationOptions<DeleteMailContactMutation, DeleteMailContactMutationVariables>;
export const UnSubscribeEmailDocument = gql`
    mutation unSubscribeEmail($ids: ID!) {
  unSubscribeEmail(_id: $ids) {
    _id
  }
}
    `;
export type UnSubscribeEmailMutationFn = Apollo.MutationFunction<UnSubscribeEmailMutation, UnSubscribeEmailMutationVariables>;

/**
 * __useUnSubscribeEmailMutation__
 *
 * To run a mutation, you first call `useUnSubscribeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnSubscribeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unSubscribeEmailMutation, { data, loading, error }] = useUnSubscribeEmailMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useUnSubscribeEmailMutation(baseOptions?: Apollo.MutationHookOptions<UnSubscribeEmailMutation, UnSubscribeEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnSubscribeEmailMutation, UnSubscribeEmailMutationVariables>(UnSubscribeEmailDocument, options);
      }
export type UnSubscribeEmailMutationHookResult = ReturnType<typeof useUnSubscribeEmailMutation>;
export type UnSubscribeEmailMutationResult = Apollo.MutationResult<UnSubscribeEmailMutation>;
export type UnSubscribeEmailMutationOptions = Apollo.BaseMutationOptions<UnSubscribeEmailMutation, UnSubscribeEmailMutationVariables>;
export const CreateMapServiceProductDocument = gql`
    mutation createMapServiceProduct($idService: ID!, $idsStockModel: [ID]!) {
  createMapServiceProduct(idService: $idService, idsStockModel: $idsStockModel) {
    _id
  }
}
    `;
export type CreateMapServiceProductMutationFn = Apollo.MutationFunction<CreateMapServiceProductMutation, CreateMapServiceProductMutationVariables>;

/**
 * __useCreateMapServiceProductMutation__
 *
 * To run a mutation, you first call `useCreateMapServiceProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMapServiceProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMapServiceProductMutation, { data, loading, error }] = useCreateMapServiceProductMutation({
 *   variables: {
 *      idService: // value for 'idService'
 *      idsStockModel: // value for 'idsStockModel'
 *   },
 * });
 */
export function useCreateMapServiceProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateMapServiceProductMutation, CreateMapServiceProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMapServiceProductMutation, CreateMapServiceProductMutationVariables>(CreateMapServiceProductDocument, options);
      }
export type CreateMapServiceProductMutationHookResult = ReturnType<typeof useCreateMapServiceProductMutation>;
export type CreateMapServiceProductMutationResult = Apollo.MutationResult<CreateMapServiceProductMutation>;
export type CreateMapServiceProductMutationOptions = Apollo.BaseMutationOptions<CreateMapServiceProductMutation, CreateMapServiceProductMutationVariables>;
export const RemoveMapServiceProductDocument = gql`
    mutation removeMapServiceProduct($idService: ID!, $idsStockModel: [ID]!) {
  removeMapServiceProduct(idService: $idService, idsStockModel: $idsStockModel)
}
    `;
export type RemoveMapServiceProductMutationFn = Apollo.MutationFunction<RemoveMapServiceProductMutation, RemoveMapServiceProductMutationVariables>;

/**
 * __useRemoveMapServiceProductMutation__
 *
 * To run a mutation, you first call `useRemoveMapServiceProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMapServiceProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMapServiceProductMutation, { data, loading, error }] = useRemoveMapServiceProductMutation({
 *   variables: {
 *      idService: // value for 'idService'
 *      idsStockModel: // value for 'idsStockModel'
 *   },
 * });
 */
export function useRemoveMapServiceProductMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMapServiceProductMutation, RemoveMapServiceProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMapServiceProductMutation, RemoveMapServiceProductMutationVariables>(RemoveMapServiceProductDocument, options);
      }
export type RemoveMapServiceProductMutationHookResult = ReturnType<typeof useRemoveMapServiceProductMutation>;
export type RemoveMapServiceProductMutationResult = Apollo.MutationResult<RemoveMapServiceProductMutation>;
export type RemoveMapServiceProductMutationOptions = Apollo.BaseMutationOptions<RemoveMapServiceProductMutation, RemoveMapServiceProductMutationVariables>;
export const DeleteUsersDocument = gql`
    mutation deleteUsers($idUsers: [ID!]!) {
  deleteUsers(idUsers: $idUsers)
}
    `;
export type DeleteUsersMutationFn = Apollo.MutationFunction<DeleteUsersMutation, DeleteUsersMutationVariables>;

/**
 * __useDeleteUsersMutation__
 *
 * To run a mutation, you first call `useDeleteUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUsersMutation, { data, loading, error }] = useDeleteUsersMutation({
 *   variables: {
 *      idUsers: // value for 'idUsers'
 *   },
 * });
 */
export function useDeleteUsersMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUsersMutation, DeleteUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUsersMutation, DeleteUsersMutationVariables>(DeleteUsersDocument, options);
      }
export type DeleteUsersMutationHookResult = ReturnType<typeof useDeleteUsersMutation>;
export type DeleteUsersMutationResult = Apollo.MutationResult<DeleteUsersMutation>;
export type DeleteUsersMutationOptions = Apollo.BaseMutationOptions<DeleteUsersMutation, DeleteUsersMutationVariables>;
export const UpdateUsersOverrideDocument = gql`
    mutation updateUsersOverride($input: NeedOverrideInfo!, $idUsers: [ID!]!) {
  updateUsersOverride(input: $input, idUsers: $idUsers)
}
    `;
export type UpdateUsersOverrideMutationFn = Apollo.MutationFunction<UpdateUsersOverrideMutation, UpdateUsersOverrideMutationVariables>;

/**
 * __useUpdateUsersOverrideMutation__
 *
 * To run a mutation, you first call `useUpdateUsersOverrideMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUsersOverrideMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUsersOverrideMutation, { data, loading, error }] = useUpdateUsersOverrideMutation({
 *   variables: {
 *      input: // value for 'input'
 *      idUsers: // value for 'idUsers'
 *   },
 * });
 */
export function useUpdateUsersOverrideMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUsersOverrideMutation, UpdateUsersOverrideMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUsersOverrideMutation, UpdateUsersOverrideMutationVariables>(UpdateUsersOverrideDocument, options);
      }
export type UpdateUsersOverrideMutationHookResult = ReturnType<typeof useUpdateUsersOverrideMutation>;
export type UpdateUsersOverrideMutationResult = Apollo.MutationResult<UpdateUsersOverrideMutation>;
export type UpdateUsersOverrideMutationOptions = Apollo.BaseMutationOptions<UpdateUsersOverrideMutation, UpdateUsersOverrideMutationVariables>;
export const UpdateUserDocument = gql`
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
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *      idUser: // value for 'idUser'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateUserTypeAdminDocument = gql`
    mutation createUserTypeAdmin($input: NewUserInfo!, $language: String) {
  createUserTypeAdmin(input: $input, language: $language) {
    _id
  }
}
    `;
export type CreateUserTypeAdminMutationFn = Apollo.MutationFunction<CreateUserTypeAdminMutation, CreateUserTypeAdminMutationVariables>;

/**
 * __useCreateUserTypeAdminMutation__
 *
 * To run a mutation, you first call `useCreateUserTypeAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserTypeAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserTypeAdminMutation, { data, loading, error }] = useCreateUserTypeAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useCreateUserTypeAdminMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserTypeAdminMutation, CreateUserTypeAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserTypeAdminMutation, CreateUserTypeAdminMutationVariables>(CreateUserTypeAdminDocument, options);
      }
export type CreateUserTypeAdminMutationHookResult = ReturnType<typeof useCreateUserTypeAdminMutation>;
export type CreateUserTypeAdminMutationResult = Apollo.MutationResult<CreateUserTypeAdminMutation>;
export type CreateUserTypeAdminMutationOptions = Apollo.BaseMutationOptions<CreateUserTypeAdminMutation, CreateUserTypeAdminMutationVariables>;
export const ImportFileStockModelDocument = gql`
    mutation importFileStockModel($input: [StockModelInput!]!) {
  importFileStockModel(input: $input)
}
    `;
export type ImportFileStockModelMutationFn = Apollo.MutationFunction<ImportFileStockModelMutation, ImportFileStockModelMutationVariables>;

/**
 * __useImportFileStockModelMutation__
 *
 * To run a mutation, you first call `useImportFileStockModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportFileStockModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importFileStockModelMutation, { data, loading, error }] = useImportFileStockModelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useImportFileStockModelMutation(baseOptions?: Apollo.MutationHookOptions<ImportFileStockModelMutation, ImportFileStockModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportFileStockModelMutation, ImportFileStockModelMutationVariables>(ImportFileStockModelDocument, options);
      }
export type ImportFileStockModelMutationHookResult = ReturnType<typeof useImportFileStockModelMutation>;
export type ImportFileStockModelMutationResult = Apollo.MutationResult<ImportFileStockModelMutation>;
export type ImportFileStockModelMutationOptions = Apollo.BaseMutationOptions<ImportFileStockModelMutation, ImportFileStockModelMutationVariables>;
export const CreateContentHistoryDocument = gql`
    mutation createContentHistory($input: InputContentHistory!) {
  createContentHistory(input: $input) {
    _id
    type
    name
    version
    idPage
    dataPage {
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
    `;
export type CreateContentHistoryMutationFn = Apollo.MutationFunction<CreateContentHistoryMutation, CreateContentHistoryMutationVariables>;

/**
 * __useCreateContentHistoryMutation__
 *
 * To run a mutation, you first call `useCreateContentHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContentHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContentHistoryMutation, { data, loading, error }] = useCreateContentHistoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContentHistoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateContentHistoryMutation, CreateContentHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContentHistoryMutation, CreateContentHistoryMutationVariables>(CreateContentHistoryDocument, options);
      }
export type CreateContentHistoryMutationHookResult = ReturnType<typeof useCreateContentHistoryMutation>;
export type CreateContentHistoryMutationResult = Apollo.MutationResult<CreateContentHistoryMutation>;
export type CreateContentHistoryMutationOptions = Apollo.BaseMutationOptions<CreateContentHistoryMutation, CreateContentHistoryMutationVariables>;
export const DeleteContentHistoryDocument = gql`
    mutation deleteContentHistory($id: ID!) {
  deleteContentHistory(_id: $id)
}
    `;
export type DeleteContentHistoryMutationFn = Apollo.MutationFunction<DeleteContentHistoryMutation, DeleteContentHistoryMutationVariables>;

/**
 * __useDeleteContentHistoryMutation__
 *
 * To run a mutation, you first call `useDeleteContentHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContentHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContentHistoryMutation, { data, loading, error }] = useDeleteContentHistoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContentHistoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContentHistoryMutation, DeleteContentHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContentHistoryMutation, DeleteContentHistoryMutationVariables>(DeleteContentHistoryDocument, options);
      }
export type DeleteContentHistoryMutationHookResult = ReturnType<typeof useDeleteContentHistoryMutation>;
export type DeleteContentHistoryMutationResult = Apollo.MutationResult<DeleteContentHistoryMutation>;
export type DeleteContentHistoryMutationOptions = Apollo.BaseMutationOptions<DeleteContentHistoryMutation, DeleteContentHistoryMutationVariables>;
export const RenameVersionDocument = gql`
    mutation renameVersion($id: ID!, $name: String!) {
  renameVersion(_id: $id, name: $name)
}
    `;
export type RenameVersionMutationFn = Apollo.MutationFunction<RenameVersionMutation, RenameVersionMutationVariables>;

/**
 * __useRenameVersionMutation__
 *
 * To run a mutation, you first call `useRenameVersionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameVersionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameVersionMutation, { data, loading, error }] = useRenameVersionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRenameVersionMutation(baseOptions?: Apollo.MutationHookOptions<RenameVersionMutation, RenameVersionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameVersionMutation, RenameVersionMutationVariables>(RenameVersionDocument, options);
      }
export type RenameVersionMutationHookResult = ReturnType<typeof useRenameVersionMutation>;
export type RenameVersionMutationResult = Apollo.MutationResult<RenameVersionMutation>;
export type RenameVersionMutationOptions = Apollo.BaseMutationOptions<RenameVersionMutation, RenameVersionMutationVariables>;
export const AppInfoDocument = gql`
    query appInfo {
  appInfo {
    version
  }
}
    `;

/**
 * __useAppInfoQuery__
 *
 * To run a query within a React component, call `useAppInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppInfoQuery(baseOptions?: Apollo.QueryHookOptions<AppInfoQuery, AppInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppInfoQuery, AppInfoQueryVariables>(AppInfoDocument, options);
      }
export function useAppInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppInfoQuery, AppInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppInfoQuery, AppInfoQueryVariables>(AppInfoDocument, options);
        }
export type AppInfoQueryHookResult = ReturnType<typeof useAppInfoQuery>;
export type AppInfoLazyQueryHookResult = ReturnType<typeof useAppInfoLazyQuery>;
export type AppInfoQueryResult = Apollo.QueryResult<AppInfoQuery, AppInfoQueryVariables>;
export const LogoutDocument = gql`
    query logout {
  logout
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const LogoutAdminDocument = gql`
    query logoutAdmin {
  logoutAdmin
}
    `;

/**
 * __useLogoutAdminQuery__
 *
 * To run a query within a React component, call `useLogoutAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutAdminQuery(baseOptions?: Apollo.QueryHookOptions<LogoutAdminQuery, LogoutAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutAdminQuery, LogoutAdminQueryVariables>(LogoutAdminDocument, options);
      }
export function useLogoutAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutAdminQuery, LogoutAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutAdminQuery, LogoutAdminQueryVariables>(LogoutAdminDocument, options);
        }
export type LogoutAdminQueryHookResult = ReturnType<typeof useLogoutAdminQuery>;
export type LogoutAdminLazyQueryHookResult = ReturnType<typeof useLogoutAdminLazyQuery>;
export type LogoutAdminQueryResult = Apollo.QueryResult<LogoutAdminQuery, LogoutAdminQueryVariables>;
export const MyInfoDocument = gql`
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
export const LoginDocument = gql`
    query login($info: LoginInput!) {
  login(info: $info) {
    token
    userId
    Status
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
export const LoginAdminDocument = gql`
    query loginAdmin($info: LoginInput!) {
  loginAdmin(info: $info) {
    token
    userId
    Status
  }
}
    `;

/**
 * __useLoginAdminQuery__
 *
 * To run a query within a React component, call `useLoginAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginAdminQuery({
 *   variables: {
 *      info: // value for 'info'
 *   },
 * });
 */
export function useLoginAdminQuery(baseOptions: Apollo.QueryHookOptions<LoginAdminQuery, LoginAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginAdminQuery, LoginAdminQueryVariables>(LoginAdminDocument, options);
      }
export function useLoginAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginAdminQuery, LoginAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginAdminQuery, LoginAdminQueryVariables>(LoginAdminDocument, options);
        }
export type LoginAdminQueryHookResult = ReturnType<typeof useLoginAdminQuery>;
export type LoginAdminLazyQueryHookResult = ReturnType<typeof useLoginAdminLazyQuery>;
export type LoginAdminQueryResult = Apollo.QueryResult<LoginAdminQuery, LoginAdminQueryVariables>;
export const GetEcomCategoriesPaginationDocument = gql`
    query getEcomCategoriesPagination($page: Int, $limit: Int, $searchInput: [EcomCategoriesSearch], $filterInput: [EcomCategoriesFilter], $sortInput: [EcomCategoriesSort]) {
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
    `;

/**
 * __useGetEcomCategoriesPaginationQuery__
 *
 * To run a query within a React component, call `useGetEcomCategoriesPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEcomCategoriesPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEcomCategoriesPaginationQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      searchInput: // value for 'searchInput'
 *      filterInput: // value for 'filterInput'
 *      sortInput: // value for 'sortInput'
 *   },
 * });
 */
export function useGetEcomCategoriesPaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetEcomCategoriesPaginationQuery, GetEcomCategoriesPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEcomCategoriesPaginationQuery, GetEcomCategoriesPaginationQueryVariables>(GetEcomCategoriesPaginationDocument, options);
      }
export function useGetEcomCategoriesPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEcomCategoriesPaginationQuery, GetEcomCategoriesPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEcomCategoriesPaginationQuery, GetEcomCategoriesPaginationQueryVariables>(GetEcomCategoriesPaginationDocument, options);
        }
export type GetEcomCategoriesPaginationQueryHookResult = ReturnType<typeof useGetEcomCategoriesPaginationQuery>;
export type GetEcomCategoriesPaginationLazyQueryHookResult = ReturnType<typeof useGetEcomCategoriesPaginationLazyQuery>;
export type GetEcomCategoriesPaginationQueryResult = Apollo.QueryResult<GetEcomCategoriesPaginationQuery, GetEcomCategoriesPaginationQueryVariables>;
export const GetEcomCategoriesPaginationTotalDocument = gql`
    query getEcomCategoriesPaginationTotal($page: Int, $limit: Int, $searchInput: [EcomCategoriesSearch], $filterInput: [EcomCategoriesFilter]) {
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
    `;

/**
 * __useGetEcomCategoriesPaginationTotalQuery__
 *
 * To run a query within a React component, call `useGetEcomCategoriesPaginationTotalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEcomCategoriesPaginationTotalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEcomCategoriesPaginationTotalQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      searchInput: // value for 'searchInput'
 *      filterInput: // value for 'filterInput'
 *   },
 * });
 */
export function useGetEcomCategoriesPaginationTotalQuery(baseOptions?: Apollo.QueryHookOptions<GetEcomCategoriesPaginationTotalQuery, GetEcomCategoriesPaginationTotalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEcomCategoriesPaginationTotalQuery, GetEcomCategoriesPaginationTotalQueryVariables>(GetEcomCategoriesPaginationTotalDocument, options);
      }
export function useGetEcomCategoriesPaginationTotalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEcomCategoriesPaginationTotalQuery, GetEcomCategoriesPaginationTotalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEcomCategoriesPaginationTotalQuery, GetEcomCategoriesPaginationTotalQueryVariables>(GetEcomCategoriesPaginationTotalDocument, options);
        }
export type GetEcomCategoriesPaginationTotalQueryHookResult = ReturnType<typeof useGetEcomCategoriesPaginationTotalQuery>;
export type GetEcomCategoriesPaginationTotalLazyQueryHookResult = ReturnType<typeof useGetEcomCategoriesPaginationTotalLazyQuery>;
export type GetEcomCategoriesPaginationTotalQueryResult = Apollo.QueryResult<GetEcomCategoriesPaginationTotalQuery, GetEcomCategoriesPaginationTotalQueryVariables>;
export const GetStockModelPaginationDocument = gql`
    query getStockModelPagination($page: Int, $limit: Int, $search: [SearchStockModelInput], $filter: [FilterStockModelInput], $sort: [SortStockModelInput], $idsDefault: [String]) {
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
    `;

/**
 * __useGetStockModelPaginationQuery__
 *
 * To run a query within a React component, call `useGetStockModelPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStockModelPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStockModelPaginationQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *      idsDefault: // value for 'idsDefault'
 *   },
 * });
 */
export function useGetStockModelPaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetStockModelPaginationQuery, GetStockModelPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStockModelPaginationQuery, GetStockModelPaginationQueryVariables>(GetStockModelPaginationDocument, options);
      }
export function useGetStockModelPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStockModelPaginationQuery, GetStockModelPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStockModelPaginationQuery, GetStockModelPaginationQueryVariables>(GetStockModelPaginationDocument, options);
        }
export type GetStockModelPaginationQueryHookResult = ReturnType<typeof useGetStockModelPaginationQuery>;
export type GetStockModelPaginationLazyQueryHookResult = ReturnType<typeof useGetStockModelPaginationLazyQuery>;
export type GetStockModelPaginationQueryResult = Apollo.QueryResult<GetStockModelPaginationQuery, GetStockModelPaginationQueryVariables>;
export const GetStockModelPaginationNameDocument = gql`
    query getStockModelPaginationName($page: Int, $limit: Int, $search: [SearchStockModelInput], $filter: [FilterStockModelInput], $sort: [SortStockModelInput], $idsDefault: [String]) {
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
    `;

/**
 * __useGetStockModelPaginationNameQuery__
 *
 * To run a query within a React component, call `useGetStockModelPaginationNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStockModelPaginationNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStockModelPaginationNameQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *      idsDefault: // value for 'idsDefault'
 *   },
 * });
 */
export function useGetStockModelPaginationNameQuery(baseOptions?: Apollo.QueryHookOptions<GetStockModelPaginationNameQuery, GetStockModelPaginationNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStockModelPaginationNameQuery, GetStockModelPaginationNameQueryVariables>(GetStockModelPaginationNameDocument, options);
      }
export function useGetStockModelPaginationNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStockModelPaginationNameQuery, GetStockModelPaginationNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStockModelPaginationNameQuery, GetStockModelPaginationNameQueryVariables>(GetStockModelPaginationNameDocument, options);
        }
export type GetStockModelPaginationNameQueryHookResult = ReturnType<typeof useGetStockModelPaginationNameQuery>;
export type GetStockModelPaginationNameLazyQueryHookResult = ReturnType<typeof useGetStockModelPaginationNameLazyQuery>;
export type GetStockModelPaginationNameQueryResult = Apollo.QueryResult<GetStockModelPaginationNameQuery, GetStockModelPaginationNameQueryVariables>;
export const GetStockModelPaginationTotalDocument = gql`
    query getStockModelPaginationTotal($page: Int, $limit: Int, $search: [SearchStockModelInput], $filter: [FilterStockModelInput]) {
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
    `;

/**
 * __useGetStockModelPaginationTotalQuery__
 *
 * To run a query within a React component, call `useGetStockModelPaginationTotalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStockModelPaginationTotalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStockModelPaginationTotalQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetStockModelPaginationTotalQuery(baseOptions?: Apollo.QueryHookOptions<GetStockModelPaginationTotalQuery, GetStockModelPaginationTotalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStockModelPaginationTotalQuery, GetStockModelPaginationTotalQueryVariables>(GetStockModelPaginationTotalDocument, options);
      }
export function useGetStockModelPaginationTotalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStockModelPaginationTotalQuery, GetStockModelPaginationTotalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStockModelPaginationTotalQuery, GetStockModelPaginationTotalQueryVariables>(GetStockModelPaginationTotalDocument, options);
        }
export type GetStockModelPaginationTotalQueryHookResult = ReturnType<typeof useGetStockModelPaginationTotalQuery>;
export type GetStockModelPaginationTotalLazyQueryHookResult = ReturnType<typeof useGetStockModelPaginationTotalLazyQuery>;
export type GetStockModelPaginationTotalQueryResult = Apollo.QueryResult<GetStockModelPaginationTotalQuery, GetStockModelPaginationTotalQueryVariables>;
export const GetStockModelBySlugProductDocument = gql`
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
    `;

/**
 * __useGetStockModelBySlugProductQuery__
 *
 * To run a query within a React component, call `useGetStockModelBySlugProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStockModelBySlugProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStockModelBySlugProductQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetStockModelBySlugProductQuery(baseOptions?: Apollo.QueryHookOptions<GetStockModelBySlugProductQuery, GetStockModelBySlugProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStockModelBySlugProductQuery, GetStockModelBySlugProductQueryVariables>(GetStockModelBySlugProductDocument, options);
      }
export function useGetStockModelBySlugProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStockModelBySlugProductQuery, GetStockModelBySlugProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStockModelBySlugProductQuery, GetStockModelBySlugProductQueryVariables>(GetStockModelBySlugProductDocument, options);
        }
export type GetStockModelBySlugProductQueryHookResult = ReturnType<typeof useGetStockModelBySlugProductQuery>;
export type GetStockModelBySlugProductLazyQueryHookResult = ReturnType<typeof useGetStockModelBySlugProductLazyQuery>;
export type GetStockModelBySlugProductQueryResult = Apollo.QueryResult<GetStockModelBySlugProductQuery, GetStockModelBySlugProductQueryVariables>;
export const GetStockModelByIdDocument = gql`
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
    `;

/**
 * __useGetStockModelByIdQuery__
 *
 * To run a query within a React component, call `useGetStockModelByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStockModelByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStockModelByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetStockModelByIdQuery(baseOptions: Apollo.QueryHookOptions<GetStockModelByIdQuery, GetStockModelByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStockModelByIdQuery, GetStockModelByIdQueryVariables>(GetStockModelByIdDocument, options);
      }
export function useGetStockModelByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStockModelByIdQuery, GetStockModelByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStockModelByIdQuery, GetStockModelByIdQueryVariables>(GetStockModelByIdDocument, options);
        }
export type GetStockModelByIdQueryHookResult = ReturnType<typeof useGetStockModelByIdQuery>;
export type GetStockModelByIdLazyQueryHookResult = ReturnType<typeof useGetStockModelByIdLazyQuery>;
export type GetStockModelByIdQueryResult = Apollo.QueryResult<GetStockModelByIdQuery, GetStockModelByIdQueryVariables>;
export const GetMapStockModelRelatedsByStockModelDocument = gql`
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
    `;

/**
 * __useGetMapStockModelRelatedsByStockModelQuery__
 *
 * To run a query within a React component, call `useGetMapStockModelRelatedsByStockModelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMapStockModelRelatedsByStockModelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMapStockModelRelatedsByStockModelQuery({
 *   variables: {
 *      idStockModel: // value for 'idStockModel'
 *   },
 * });
 */
export function useGetMapStockModelRelatedsByStockModelQuery(baseOptions: Apollo.QueryHookOptions<GetMapStockModelRelatedsByStockModelQuery, GetMapStockModelRelatedsByStockModelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMapStockModelRelatedsByStockModelQuery, GetMapStockModelRelatedsByStockModelQueryVariables>(GetMapStockModelRelatedsByStockModelDocument, options);
      }
export function useGetMapStockModelRelatedsByStockModelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMapStockModelRelatedsByStockModelQuery, GetMapStockModelRelatedsByStockModelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMapStockModelRelatedsByStockModelQuery, GetMapStockModelRelatedsByStockModelQueryVariables>(GetMapStockModelRelatedsByStockModelDocument, options);
        }
export type GetMapStockModelRelatedsByStockModelQueryHookResult = ReturnType<typeof useGetMapStockModelRelatedsByStockModelQuery>;
export type GetMapStockModelRelatedsByStockModelLazyQueryHookResult = ReturnType<typeof useGetMapStockModelRelatedsByStockModelLazyQuery>;
export type GetMapStockModelRelatedsByStockModelQueryResult = Apollo.QueryResult<GetMapStockModelRelatedsByStockModelQuery, GetMapStockModelRelatedsByStockModelQueryVariables>;
export const GetContentHomePageDocument = gql`
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
    `;

/**
 * __useGetContentHomePageQuery__
 *
 * To run a query within a React component, call `useGetContentHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentHomePageQuery({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useGetContentHomePageQuery(baseOptions: Apollo.QueryHookOptions<GetContentHomePageQuery, GetContentHomePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentHomePageQuery, GetContentHomePageQueryVariables>(GetContentHomePageDocument, options);
      }
export function useGetContentHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentHomePageQuery, GetContentHomePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentHomePageQuery, GetContentHomePageQueryVariables>(GetContentHomePageDocument, options);
        }
export type GetContentHomePageQueryHookResult = ReturnType<typeof useGetContentHomePageQuery>;
export type GetContentHomePageLazyQueryHookResult = ReturnType<typeof useGetContentHomePageLazyQuery>;
export type GetContentHomePageQueryResult = Apollo.QueryResult<GetContentHomePageQuery, GetContentHomePageQueryVariables>;
export const GetContentMenuDocument = gql`
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
    `;

/**
 * __useGetContentMenuQuery__
 *
 * To run a query within a React component, call `useGetContentMenuQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentMenuQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentMenuQuery({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useGetContentMenuQuery(baseOptions: Apollo.QueryHookOptions<GetContentMenuQuery, GetContentMenuQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentMenuQuery, GetContentMenuQueryVariables>(GetContentMenuDocument, options);
      }
export function useGetContentMenuLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentMenuQuery, GetContentMenuQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentMenuQuery, GetContentMenuQueryVariables>(GetContentMenuDocument, options);
        }
export type GetContentMenuQueryHookResult = ReturnType<typeof useGetContentMenuQuery>;
export type GetContentMenuLazyQueryHookResult = ReturnType<typeof useGetContentMenuLazyQuery>;
export type GetContentMenuQueryResult = Apollo.QueryResult<GetContentMenuQuery, GetContentMenuQueryVariables>;
export const GetContentContactDocument = gql`
    query getContentContact($language: EnumLanguage!) {
  getContentContact(language: $language) {
    _id
    language
    ourPhone
    ourAddress {
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
    `;

/**
 * __useGetContentContactQuery__
 *
 * To run a query within a React component, call `useGetContentContactQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentContactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentContactQuery({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useGetContentContactQuery(baseOptions: Apollo.QueryHookOptions<GetContentContactQuery, GetContentContactQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentContactQuery, GetContentContactQueryVariables>(GetContentContactDocument, options);
      }
export function useGetContentContactLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentContactQuery, GetContentContactQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentContactQuery, GetContentContactQueryVariables>(GetContentContactDocument, options);
        }
export type GetContentContactQueryHookResult = ReturnType<typeof useGetContentContactQuery>;
export type GetContentContactLazyQueryHookResult = ReturnType<typeof useGetContentContactLazyQuery>;
export type GetContentContactQueryResult = Apollo.QueryResult<GetContentContactQuery, GetContentContactQueryVariables>;
export const GetContentFooterDocument = gql`
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
    `;

/**
 * __useGetContentFooterQuery__
 *
 * To run a query within a React component, call `useGetContentFooterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentFooterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentFooterQuery({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useGetContentFooterQuery(baseOptions: Apollo.QueryHookOptions<GetContentFooterQuery, GetContentFooterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentFooterQuery, GetContentFooterQueryVariables>(GetContentFooterDocument, options);
      }
export function useGetContentFooterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentFooterQuery, GetContentFooterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentFooterQuery, GetContentFooterQueryVariables>(GetContentFooterDocument, options);
        }
export type GetContentFooterQueryHookResult = ReturnType<typeof useGetContentFooterQuery>;
export type GetContentFooterLazyQueryHookResult = ReturnType<typeof useGetContentFooterLazyQuery>;
export type GetContentFooterQueryResult = Apollo.QueryResult<GetContentFooterQuery, GetContentFooterQueryVariables>;
export const UsersWithPaginateDocument = gql`
    query usersWithPaginate($gridOptions: GridOption, $filterOptions: InputOptionsQueryUser) {
  usersWithPaginate(gridOptions: $gridOptions, filterOptions: $filterOptions) {
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
    `;

/**
 * __useUsersWithPaginateQuery__
 *
 * To run a query within a React component, call `useUsersWithPaginateQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersWithPaginateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersWithPaginateQuery({
 *   variables: {
 *      gridOptions: // value for 'gridOptions'
 *      filterOptions: // value for 'filterOptions'
 *   },
 * });
 */
export function useUsersWithPaginateQuery(baseOptions?: Apollo.QueryHookOptions<UsersWithPaginateQuery, UsersWithPaginateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersWithPaginateQuery, UsersWithPaginateQueryVariables>(UsersWithPaginateDocument, options);
      }
export function useUsersWithPaginateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersWithPaginateQuery, UsersWithPaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersWithPaginateQuery, UsersWithPaginateQueryVariables>(UsersWithPaginateDocument, options);
        }
export type UsersWithPaginateQueryHookResult = ReturnType<typeof useUsersWithPaginateQuery>;
export type UsersWithPaginateLazyQueryHookResult = ReturnType<typeof useUsersWithPaginateLazyQuery>;
export type UsersWithPaginateQueryResult = Apollo.QueryResult<UsersWithPaginateQuery, UsersWithPaginateQueryVariables>;
export const GetStockModelsDocument = gql`
    query getStockModels {
  getStockModels {
    _id
    code
    name
    prices {
      idPriceType
      price
    }
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
    `;

/**
 * __useGetStockModelsQuery__
 *
 * To run a query within a React component, call `useGetStockModelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStockModelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStockModelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStockModelsQuery(baseOptions?: Apollo.QueryHookOptions<GetStockModelsQuery, GetStockModelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStockModelsQuery, GetStockModelsQueryVariables>(GetStockModelsDocument, options);
      }
export function useGetStockModelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStockModelsQuery, GetStockModelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStockModelsQuery, GetStockModelsQueryVariables>(GetStockModelsDocument, options);
        }
export type GetStockModelsQueryHookResult = ReturnType<typeof useGetStockModelsQuery>;
export type GetStockModelsLazyQueryHookResult = ReturnType<typeof useGetStockModelsLazyQuery>;
export type GetStockModelsQueryResult = Apollo.QueryResult<GetStockModelsQuery, GetStockModelsQueryVariables>;
export const GetStaffPaginationDocument = gql`
    query getStaffPagination($page: Int, $limit: Int, $searchInput: [EcomCategoriesSearch], $filterInput: [EcomCategoriesFilter], $sortInput: [EcomCategoriesSort]) {
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
    `;

/**
 * __useGetStaffPaginationQuery__
 *
 * To run a query within a React component, call `useGetStaffPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStaffPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStaffPaginationQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      searchInput: // value for 'searchInput'
 *      filterInput: // value for 'filterInput'
 *      sortInput: // value for 'sortInput'
 *   },
 * });
 */
export function useGetStaffPaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetStaffPaginationQuery, GetStaffPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStaffPaginationQuery, GetStaffPaginationQueryVariables>(GetStaffPaginationDocument, options);
      }
export function useGetStaffPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStaffPaginationQuery, GetStaffPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStaffPaginationQuery, GetStaffPaginationQueryVariables>(GetStaffPaginationDocument, options);
        }
export type GetStaffPaginationQueryHookResult = ReturnType<typeof useGetStaffPaginationQuery>;
export type GetStaffPaginationLazyQueryHookResult = ReturnType<typeof useGetStaffPaginationLazyQuery>;
export type GetStaffPaginationQueryResult = Apollo.QueryResult<GetStaffPaginationQuery, GetStaffPaginationQueryVariables>;
export const GetStaffPaginationTotalDocument = gql`
    query getStaffPaginationTotal($page: Int, $limit: Int, $searchInput: [EcomCategoriesSearch], $filterInput: [EcomCategoriesFilter]) {
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
    `;

/**
 * __useGetStaffPaginationTotalQuery__
 *
 * To run a query within a React component, call `useGetStaffPaginationTotalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStaffPaginationTotalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStaffPaginationTotalQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      searchInput: // value for 'searchInput'
 *      filterInput: // value for 'filterInput'
 *   },
 * });
 */
export function useGetStaffPaginationTotalQuery(baseOptions?: Apollo.QueryHookOptions<GetStaffPaginationTotalQuery, GetStaffPaginationTotalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStaffPaginationTotalQuery, GetStaffPaginationTotalQueryVariables>(GetStaffPaginationTotalDocument, options);
      }
export function useGetStaffPaginationTotalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStaffPaginationTotalQuery, GetStaffPaginationTotalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStaffPaginationTotalQuery, GetStaffPaginationTotalQueryVariables>(GetStaffPaginationTotalDocument, options);
        }
export type GetStaffPaginationTotalQueryHookResult = ReturnType<typeof useGetStaffPaginationTotalQuery>;
export type GetStaffPaginationTotalLazyQueryHookResult = ReturnType<typeof useGetStaffPaginationTotalLazyQuery>;
export type GetStaffPaginationTotalQueryResult = Apollo.QueryResult<GetStaffPaginationTotalQuery, GetStaffPaginationTotalQueryVariables>;
export const StaffsDocument = gql`
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
    `;

/**
 * __useStaffsQuery__
 *
 * To run a query within a React component, call `useStaffsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStaffsQuery(baseOptions?: Apollo.QueryHookOptions<StaffsQuery, StaffsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StaffsQuery, StaffsQueryVariables>(StaffsDocument, options);
      }
export function useStaffsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StaffsQuery, StaffsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StaffsQuery, StaffsQueryVariables>(StaffsDocument, options);
        }
export type StaffsQueryHookResult = ReturnType<typeof useStaffsQuery>;
export type StaffsLazyQueryHookResult = ReturnType<typeof useStaffsLazyQuery>;
export type StaffsQueryResult = Apollo.QueryResult<StaffsQuery, StaffsQueryVariables>;
export const SearchDm_DonViHanhChinhDocument = gql`
    query searchDM_DonViHanhChinh($searchString: String!, $limit: Int, $idDefault: ID) {
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
    `;

/**
 * __useSearchDm_DonViHanhChinhQuery__
 *
 * To run a query within a React component, call `useSearchDm_DonViHanhChinhQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchDm_DonViHanhChinhQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchDm_DonViHanhChinhQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *      limit: // value for 'limit'
 *      idDefault: // value for 'idDefault'
 *   },
 * });
 */
export function useSearchDm_DonViHanhChinhQuery(baseOptions: Apollo.QueryHookOptions<SearchDm_DonViHanhChinhQuery, SearchDm_DonViHanhChinhQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchDm_DonViHanhChinhQuery, SearchDm_DonViHanhChinhQueryVariables>(SearchDm_DonViHanhChinhDocument, options);
      }
export function useSearchDm_DonViHanhChinhLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchDm_DonViHanhChinhQuery, SearchDm_DonViHanhChinhQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchDm_DonViHanhChinhQuery, SearchDm_DonViHanhChinhQueryVariables>(SearchDm_DonViHanhChinhDocument, options);
        }
export type SearchDm_DonViHanhChinhQueryHookResult = ReturnType<typeof useSearchDm_DonViHanhChinhQuery>;
export type SearchDm_DonViHanhChinhLazyQueryHookResult = ReturnType<typeof useSearchDm_DonViHanhChinhLazyQuery>;
export type SearchDm_DonViHanhChinhQueryResult = Apollo.QueryResult<SearchDm_DonViHanhChinhQuery, SearchDm_DonViHanhChinhQueryVariables>;
export const FindOneDonViHanhChinhDocument = gql`
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
    `;

/**
 * __useFindOneDonViHanhChinhQuery__
 *
 * To run a query within a React component, call `useFindOneDonViHanhChinhQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneDonViHanhChinhQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneDonViHanhChinhQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneDonViHanhChinhQuery(baseOptions: Apollo.QueryHookOptions<FindOneDonViHanhChinhQuery, FindOneDonViHanhChinhQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneDonViHanhChinhQuery, FindOneDonViHanhChinhQueryVariables>(FindOneDonViHanhChinhDocument, options);
      }
export function useFindOneDonViHanhChinhLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneDonViHanhChinhQuery, FindOneDonViHanhChinhQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneDonViHanhChinhQuery, FindOneDonViHanhChinhQueryVariables>(FindOneDonViHanhChinhDocument, options);
        }
export type FindOneDonViHanhChinhQueryHookResult = ReturnType<typeof useFindOneDonViHanhChinhQuery>;
export type FindOneDonViHanhChinhLazyQueryHookResult = ReturnType<typeof useFindOneDonViHanhChinhLazyQuery>;
export type FindOneDonViHanhChinhQueryResult = Apollo.QueryResult<FindOneDonViHanhChinhQuery, FindOneDonViHanhChinhQueryVariables>;
export const OrdersWithPaginateDocument = gql`
    query ordersWithPaginate($gridOptions: GridOption, $filterOptions: InputOptionsQueryOrder) {
  ordersWithPaginate(gridOptions: $gridOptions, filterOptions: $filterOptions) {
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
    `;

/**
 * __useOrdersWithPaginateQuery__
 *
 * To run a query within a React component, call `useOrdersWithPaginateQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersWithPaginateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersWithPaginateQuery({
 *   variables: {
 *      gridOptions: // value for 'gridOptions'
 *      filterOptions: // value for 'filterOptions'
 *   },
 * });
 */
export function useOrdersWithPaginateQuery(baseOptions?: Apollo.QueryHookOptions<OrdersWithPaginateQuery, OrdersWithPaginateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersWithPaginateQuery, OrdersWithPaginateQueryVariables>(OrdersWithPaginateDocument, options);
      }
export function useOrdersWithPaginateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersWithPaginateQuery, OrdersWithPaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersWithPaginateQuery, OrdersWithPaginateQueryVariables>(OrdersWithPaginateDocument, options);
        }
export type OrdersWithPaginateQueryHookResult = ReturnType<typeof useOrdersWithPaginateQuery>;
export type OrdersWithPaginateLazyQueryHookResult = ReturnType<typeof useOrdersWithPaginateLazyQuery>;
export type OrdersWithPaginateQueryResult = Apollo.QueryResult<OrdersWithPaginateQuery, OrdersWithPaginateQueryVariables>;
export const GetContentAboutUsDocument = gql`
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
    `;

/**
 * __useGetContentAboutUsQuery__
 *
 * To run a query within a React component, call `useGetContentAboutUsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentAboutUsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentAboutUsQuery({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useGetContentAboutUsQuery(baseOptions?: Apollo.QueryHookOptions<GetContentAboutUsQuery, GetContentAboutUsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentAboutUsQuery, GetContentAboutUsQueryVariables>(GetContentAboutUsDocument, options);
      }
export function useGetContentAboutUsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentAboutUsQuery, GetContentAboutUsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentAboutUsQuery, GetContentAboutUsQueryVariables>(GetContentAboutUsDocument, options);
        }
export type GetContentAboutUsQueryHookResult = ReturnType<typeof useGetContentAboutUsQuery>;
export type GetContentAboutUsLazyQueryHookResult = ReturnType<typeof useGetContentAboutUsLazyQuery>;
export type GetContentAboutUsQueryResult = Apollo.QueryResult<GetContentAboutUsQuery, GetContentAboutUsQueryVariables>;
export const GetContentPurchaseInfoDocument = gql`
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
    `;

/**
 * __useGetContentPurchaseInfoQuery__
 *
 * To run a query within a React component, call `useGetContentPurchaseInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentPurchaseInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentPurchaseInfoQuery({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useGetContentPurchaseInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetContentPurchaseInfoQuery, GetContentPurchaseInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentPurchaseInfoQuery, GetContentPurchaseInfoQueryVariables>(GetContentPurchaseInfoDocument, options);
      }
export function useGetContentPurchaseInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentPurchaseInfoQuery, GetContentPurchaseInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentPurchaseInfoQuery, GetContentPurchaseInfoQueryVariables>(GetContentPurchaseInfoDocument, options);
        }
export type GetContentPurchaseInfoQueryHookResult = ReturnType<typeof useGetContentPurchaseInfoQuery>;
export type GetContentPurchaseInfoLazyQueryHookResult = ReturnType<typeof useGetContentPurchaseInfoLazyQuery>;
export type GetContentPurchaseInfoQueryResult = Apollo.QueryResult<GetContentPurchaseInfoQuery, GetContentPurchaseInfoQueryVariables>;
export const GetContentSecurityDocument = gql`
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
    `;

/**
 * __useGetContentSecurityQuery__
 *
 * To run a query within a React component, call `useGetContentSecurityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentSecurityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentSecurityQuery({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useGetContentSecurityQuery(baseOptions?: Apollo.QueryHookOptions<GetContentSecurityQuery, GetContentSecurityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentSecurityQuery, GetContentSecurityQueryVariables>(GetContentSecurityDocument, options);
      }
export function useGetContentSecurityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentSecurityQuery, GetContentSecurityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentSecurityQuery, GetContentSecurityQueryVariables>(GetContentSecurityDocument, options);
        }
export type GetContentSecurityQueryHookResult = ReturnType<typeof useGetContentSecurityQuery>;
export type GetContentSecurityLazyQueryHookResult = ReturnType<typeof useGetContentSecurityLazyQuery>;
export type GetContentSecurityQueryResult = Apollo.QueryResult<GetContentSecurityQuery, GetContentSecurityQueryVariables>;
export const GetCustomersDocument = gql`
    query getCustomers {
  getCustomers {
    _id
    fullName
  }
}
    `;

/**
 * __useGetCustomersQuery__
 *
 * To run a query within a React component, call `useGetCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomersQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
      }
export function useGetCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export type GetCustomersQueryHookResult = ReturnType<typeof useGetCustomersQuery>;
export type GetCustomersLazyQueryHookResult = ReturnType<typeof useGetCustomersLazyQuery>;
export type GetCustomersQueryResult = Apollo.QueryResult<GetCustomersQuery, GetCustomersQueryVariables>;
export const GetSettingDocument = gql`
    query getSetting {
  getSetting {
    ecommerce {
      idWarehouse
      defaultLang
    }
  }
}
    `;

/**
 * __useGetSettingQuery__
 *
 * To run a query within a React component, call `useGetSettingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSettingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSettingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSettingQuery(baseOptions?: Apollo.QueryHookOptions<GetSettingQuery, GetSettingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSettingQuery, GetSettingQueryVariables>(GetSettingDocument, options);
      }
export function useGetSettingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSettingQuery, GetSettingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSettingQuery, GetSettingQueryVariables>(GetSettingDocument, options);
        }
export type GetSettingQueryHookResult = ReturnType<typeof useGetSettingQuery>;
export type GetSettingLazyQueryHookResult = ReturnType<typeof useGetSettingLazyQuery>;
export type GetSettingQueryResult = Apollo.QueryResult<GetSettingQuery, GetSettingQueryVariables>;
export const ReportTotalOrderDocument = gql`
    query reportTotalOrder($filter: FilterReportInput) {
  reportTotalOrder(filter: $filter) {
    totalQuantity
    totalOrderForType {
      quantity
      type
    }
  }
}
    `;

/**
 * __useReportTotalOrderQuery__
 *
 * To run a query within a React component, call `useReportTotalOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportTotalOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportTotalOrderQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useReportTotalOrderQuery(baseOptions?: Apollo.QueryHookOptions<ReportTotalOrderQuery, ReportTotalOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportTotalOrderQuery, ReportTotalOrderQueryVariables>(ReportTotalOrderDocument, options);
      }
export function useReportTotalOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportTotalOrderQuery, ReportTotalOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportTotalOrderQuery, ReportTotalOrderQueryVariables>(ReportTotalOrderDocument, options);
        }
export type ReportTotalOrderQueryHookResult = ReturnType<typeof useReportTotalOrderQuery>;
export type ReportTotalOrderLazyQueryHookResult = ReturnType<typeof useReportTotalOrderLazyQuery>;
export type ReportTotalOrderQueryResult = Apollo.QueryResult<ReportTotalOrderQuery, ReportTotalOrderQueryVariables>;
export const ReportRevenueDocument = gql`
    query reportRevenue($filter: FilterReportInput) {
  reportRevenue(filter: $filter) {
    totalRevenue
  }
}
    `;

/**
 * __useReportRevenueQuery__
 *
 * To run a query within a React component, call `useReportRevenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportRevenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportRevenueQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useReportRevenueQuery(baseOptions?: Apollo.QueryHookOptions<ReportRevenueQuery, ReportRevenueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportRevenueQuery, ReportRevenueQueryVariables>(ReportRevenueDocument, options);
      }
export function useReportRevenueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportRevenueQuery, ReportRevenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportRevenueQuery, ReportRevenueQueryVariables>(ReportRevenueDocument, options);
        }
export type ReportRevenueQueryHookResult = ReturnType<typeof useReportRevenueQuery>;
export type ReportRevenueLazyQueryHookResult = ReturnType<typeof useReportRevenueLazyQuery>;
export type ReportRevenueQueryResult = Apollo.QueryResult<ReportRevenueQuery, ReportRevenueQueryVariables>;
export const SearchUserDocument = gql`
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
    `;

/**
 * __useSearchUserQuery__
 *
 * To run a query within a React component, call `useSearchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      idDefault: // value for 'idDefault'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchUserQuery(baseOptions?: Apollo.QueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
      }
export function useSearchUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
        }
export type SearchUserQueryHookResult = ReturnType<typeof useSearchUserQuery>;
export type SearchUserLazyQueryHookResult = ReturnType<typeof useSearchUserLazyQuery>;
export type SearchUserQueryResult = Apollo.QueryResult<SearchUserQuery, SearchUserQueryVariables>;
export const SearchStaffDocument = gql`
    query searchStaff($keyWord: String, $idDefault: ID, $limit: Int, $MaChucVu: String, $idDefaults: [ID]) {
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
    `;

/**
 * __useSearchStaffQuery__
 *
 * To run a query within a React component, call `useSearchStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchStaffQuery({
 *   variables: {
 *      keyWord: // value for 'keyWord'
 *      idDefault: // value for 'idDefault'
 *      limit: // value for 'limit'
 *      MaChucVu: // value for 'MaChucVu'
 *      idDefaults: // value for 'idDefaults'
 *   },
 * });
 */
export function useSearchStaffQuery(baseOptions?: Apollo.QueryHookOptions<SearchStaffQuery, SearchStaffQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchStaffQuery, SearchStaffQueryVariables>(SearchStaffDocument, options);
      }
export function useSearchStaffLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchStaffQuery, SearchStaffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchStaffQuery, SearchStaffQueryVariables>(SearchStaffDocument, options);
        }
export type SearchStaffQueryHookResult = ReturnType<typeof useSearchStaffQuery>;
export type SearchStaffLazyQueryHookResult = ReturnType<typeof useSearchStaffLazyQuery>;
export type SearchStaffQueryResult = Apollo.QueryResult<SearchStaffQuery, SearchStaffQueryVariables>;
export const GetOrderByIdDocument = gql`
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
    `;

/**
 * __useGetOrderByIdQuery__
 *
 * To run a query within a React component, call `useGetOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
      }
export function useGetOrderByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
        }
export type GetOrderByIdQueryHookResult = ReturnType<typeof useGetOrderByIdQuery>;
export type GetOrderByIdLazyQueryHookResult = ReturnType<typeof useGetOrderByIdLazyQuery>;
export type GetOrderByIdQueryResult = Apollo.QueryResult<GetOrderByIdQuery, GetOrderByIdQueryVariables>;
export const GetQuantityOderForTypeDocument = gql`
    query getQuantityOderForType {
  getQuantityOderForType {
    quantity
    type
  }
}
    `;

/**
 * __useGetQuantityOderForTypeQuery__
 *
 * To run a query within a React component, call `useGetQuantityOderForTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityOderForTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityOderForTypeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetQuantityOderForTypeQuery(baseOptions?: Apollo.QueryHookOptions<GetQuantityOderForTypeQuery, GetQuantityOderForTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityOderForTypeQuery, GetQuantityOderForTypeQueryVariables>(GetQuantityOderForTypeDocument, options);
      }
export function useGetQuantityOderForTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityOderForTypeQuery, GetQuantityOderForTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityOderForTypeQuery, GetQuantityOderForTypeQueryVariables>(GetQuantityOderForTypeDocument, options);
        }
export type GetQuantityOderForTypeQueryHookResult = ReturnType<typeof useGetQuantityOderForTypeQuery>;
export type GetQuantityOderForTypeLazyQueryHookResult = ReturnType<typeof useGetQuantityOderForTypeLazyQuery>;
export type GetQuantityOderForTypeQueryResult = Apollo.QueryResult<GetQuantityOderForTypeQuery, GetQuantityOderForTypeQueryVariables>;
export const SearchUserNotHaveStaffDocument = gql`
    query searchUserNotHaveStaff($keyword: String, $idDefault: ID, $limit: Int, $isUpdate: Boolean) {
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
    `;

/**
 * __useSearchUserNotHaveStaffQuery__
 *
 * To run a query within a React component, call `useSearchUserNotHaveStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserNotHaveStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserNotHaveStaffQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      idDefault: // value for 'idDefault'
 *      limit: // value for 'limit'
 *      isUpdate: // value for 'isUpdate'
 *   },
 * });
 */
export function useSearchUserNotHaveStaffQuery(baseOptions?: Apollo.QueryHookOptions<SearchUserNotHaveStaffQuery, SearchUserNotHaveStaffQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUserNotHaveStaffQuery, SearchUserNotHaveStaffQueryVariables>(SearchUserNotHaveStaffDocument, options);
      }
export function useSearchUserNotHaveStaffLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUserNotHaveStaffQuery, SearchUserNotHaveStaffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUserNotHaveStaffQuery, SearchUserNotHaveStaffQueryVariables>(SearchUserNotHaveStaffDocument, options);
        }
export type SearchUserNotHaveStaffQueryHookResult = ReturnType<typeof useSearchUserNotHaveStaffQuery>;
export type SearchUserNotHaveStaffLazyQueryHookResult = ReturnType<typeof useSearchUserNotHaveStaffLazyQuery>;
export type SearchUserNotHaveStaffQueryResult = Apollo.QueryResult<SearchUserNotHaveStaffQuery, SearchUserNotHaveStaffQueryVariables>;
export const GetBlogPaginationDocument = gql`
    query getBlogPagination($page: Int, $limit: Int, $search: [SearchBlogInput], $filter: [FilterBlogInput], $sort: [SortBlogInput], $idsDefault: [String]) {
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
    `;

/**
 * __useGetBlogPaginationQuery__
 *
 * To run a query within a React component, call `useGetBlogPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogPaginationQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *      idsDefault: // value for 'idsDefault'
 *   },
 * });
 */
export function useGetBlogPaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetBlogPaginationQuery, GetBlogPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlogPaginationQuery, GetBlogPaginationQueryVariables>(GetBlogPaginationDocument, options);
      }
export function useGetBlogPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogPaginationQuery, GetBlogPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlogPaginationQuery, GetBlogPaginationQueryVariables>(GetBlogPaginationDocument, options);
        }
export type GetBlogPaginationQueryHookResult = ReturnType<typeof useGetBlogPaginationQuery>;
export type GetBlogPaginationLazyQueryHookResult = ReturnType<typeof useGetBlogPaginationLazyQuery>;
export type GetBlogPaginationQueryResult = Apollo.QueryResult<GetBlogPaginationQuery, GetBlogPaginationQueryVariables>;
export const GetServicePaginationDocument = gql`
    query getServicePagination($page: Int, $limit: Int, $search: [SearchServiceInput], $filter: [FilterServiceInput], $sort: [SortServiceInput]) {
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
    `;

/**
 * __useGetServicePaginationQuery__
 *
 * To run a query within a React component, call `useGetServicePaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicePaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicePaginationQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetServicePaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetServicePaginationQuery, GetServicePaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicePaginationQuery, GetServicePaginationQueryVariables>(GetServicePaginationDocument, options);
      }
export function useGetServicePaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicePaginationQuery, GetServicePaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicePaginationQuery, GetServicePaginationQueryVariables>(GetServicePaginationDocument, options);
        }
export type GetServicePaginationQueryHookResult = ReturnType<typeof useGetServicePaginationQuery>;
export type GetServicePaginationLazyQueryHookResult = ReturnType<typeof useGetServicePaginationLazyQuery>;
export type GetServicePaginationQueryResult = Apollo.QueryResult<GetServicePaginationQuery, GetServicePaginationQueryVariables>;
export const GetBlogPaginationTotalDocument = gql`
    query getBlogPaginationTotal($page: Int, $limit: Int, $search: [SearchBlogInput], $filter: [FilterBlogInput]) {
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
    `;

/**
 * __useGetBlogPaginationTotalQuery__
 *
 * To run a query within a React component, call `useGetBlogPaginationTotalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogPaginationTotalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogPaginationTotalQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetBlogPaginationTotalQuery(baseOptions?: Apollo.QueryHookOptions<GetBlogPaginationTotalQuery, GetBlogPaginationTotalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlogPaginationTotalQuery, GetBlogPaginationTotalQueryVariables>(GetBlogPaginationTotalDocument, options);
      }
export function useGetBlogPaginationTotalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogPaginationTotalQuery, GetBlogPaginationTotalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlogPaginationTotalQuery, GetBlogPaginationTotalQueryVariables>(GetBlogPaginationTotalDocument, options);
        }
export type GetBlogPaginationTotalQueryHookResult = ReturnType<typeof useGetBlogPaginationTotalQuery>;
export type GetBlogPaginationTotalLazyQueryHookResult = ReturnType<typeof useGetBlogPaginationTotalLazyQuery>;
export type GetBlogPaginationTotalQueryResult = Apollo.QueryResult<GetBlogPaginationTotalQuery, GetBlogPaginationTotalQueryVariables>;
export const GetServicePaginationTotalDocument = gql`
    query getServicePaginationTotal($page: Int, $limit: Int, $search: [SearchServiceInput], $filter: [FilterServiceInput]) {
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
    `;

/**
 * __useGetServicePaginationTotalQuery__
 *
 * To run a query within a React component, call `useGetServicePaginationTotalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicePaginationTotalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicePaginationTotalQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetServicePaginationTotalQuery(baseOptions?: Apollo.QueryHookOptions<GetServicePaginationTotalQuery, GetServicePaginationTotalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicePaginationTotalQuery, GetServicePaginationTotalQueryVariables>(GetServicePaginationTotalDocument, options);
      }
export function useGetServicePaginationTotalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicePaginationTotalQuery, GetServicePaginationTotalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicePaginationTotalQuery, GetServicePaginationTotalQueryVariables>(GetServicePaginationTotalDocument, options);
        }
export type GetServicePaginationTotalQueryHookResult = ReturnType<typeof useGetServicePaginationTotalQuery>;
export type GetServicePaginationTotalLazyQueryHookResult = ReturnType<typeof useGetServicePaginationTotalLazyQuery>;
export type GetServicePaginationTotalQueryResult = Apollo.QueryResult<GetServicePaginationTotalQuery, GetServicePaginationTotalQueryVariables>;
export const GetBlogByIdDocument = gql`
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
    `;

/**
 * __useGetBlogByIdQuery__
 *
 * To run a query within a React component, call `useGetBlogByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBlogByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBlogByIdQuery, GetBlogByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlogByIdQuery, GetBlogByIdQueryVariables>(GetBlogByIdDocument, options);
      }
export function useGetBlogByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogByIdQuery, GetBlogByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlogByIdQuery, GetBlogByIdQueryVariables>(GetBlogByIdDocument, options);
        }
export type GetBlogByIdQueryHookResult = ReturnType<typeof useGetBlogByIdQuery>;
export type GetBlogByIdLazyQueryHookResult = ReturnType<typeof useGetBlogByIdLazyQuery>;
export type GetBlogByIdQueryResult = Apollo.QueryResult<GetBlogByIdQuery, GetBlogByIdQueryVariables>;
export const GetServiceByIdDocument = gql`
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
    `;

/**
 * __useGetServiceByIdQuery__
 *
 * To run a query within a React component, call `useGetServiceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceByIdQuery(baseOptions: Apollo.QueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
      }
export function useGetServiceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
        }
export type GetServiceByIdQueryHookResult = ReturnType<typeof useGetServiceByIdQuery>;
export type GetServiceByIdLazyQueryHookResult = ReturnType<typeof useGetServiceByIdLazyQuery>;
export type GetServiceByIdQueryResult = Apollo.QueryResult<GetServiceByIdQuery, GetServiceByIdQueryVariables>;
export const GetPagesDocument = gql`
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
    `;

/**
 * __useGetPagesQuery__
 *
 * To run a query within a React component, call `useGetPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPagesQuery(baseOptions?: Apollo.QueryHookOptions<GetPagesQuery, GetPagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPagesQuery, GetPagesQueryVariables>(GetPagesDocument, options);
      }
export function useGetPagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPagesQuery, GetPagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPagesQuery, GetPagesQueryVariables>(GetPagesDocument, options);
        }
export type GetPagesQueryHookResult = ReturnType<typeof useGetPagesQuery>;
export type GetPagesLazyQueryHookResult = ReturnType<typeof useGetPagesLazyQuery>;
export type GetPagesQueryResult = Apollo.QueryResult<GetPagesQuery, GetPagesQueryVariables>;
export const GetPageByIdDocument = gql`
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
    `;

/**
 * __useGetPageByIdQuery__
 *
 * To run a query within a React component, call `useGetPageByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPageByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPageByIdQuery, GetPageByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPageByIdQuery, GetPageByIdQueryVariables>(GetPageByIdDocument, options);
      }
export function useGetPageByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPageByIdQuery, GetPageByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPageByIdQuery, GetPageByIdQueryVariables>(GetPageByIdDocument, options);
        }
export type GetPageByIdQueryHookResult = ReturnType<typeof useGetPageByIdQuery>;
export type GetPageByIdLazyQueryHookResult = ReturnType<typeof useGetPageByIdLazyQuery>;
export type GetPageByIdQueryResult = Apollo.QueryResult<GetPageByIdQuery, GetPageByIdQueryVariables>;
export const GetPagePaginationDocument = gql`
    query getPagePagination($page: Int, $limit: Int, $search: [SearchPageInput], $filter: [FilterPageInput], $sort: [SortPageInput]) {
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
    `;

/**
 * __useGetPagePaginationQuery__
 *
 * To run a query within a React component, call `useGetPagePaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagePaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagePaginationQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetPagePaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetPagePaginationQuery, GetPagePaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPagePaginationQuery, GetPagePaginationQueryVariables>(GetPagePaginationDocument, options);
      }
export function useGetPagePaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPagePaginationQuery, GetPagePaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPagePaginationQuery, GetPagePaginationQueryVariables>(GetPagePaginationDocument, options);
        }
export type GetPagePaginationQueryHookResult = ReturnType<typeof useGetPagePaginationQuery>;
export type GetPagePaginationLazyQueryHookResult = ReturnType<typeof useGetPagePaginationLazyQuery>;
export type GetPagePaginationQueryResult = Apollo.QueryResult<GetPagePaginationQuery, GetPagePaginationQueryVariables>;
export const GetPagePaginationTotalDocument = gql`
    query getPagePaginationTotal($page: Int, $limit: Int, $search: [SearchPageInput], $filter: [FilterPageInput]) {
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
    `;

/**
 * __useGetPagePaginationTotalQuery__
 *
 * To run a query within a React component, call `useGetPagePaginationTotalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagePaginationTotalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagePaginationTotalQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPagePaginationTotalQuery(baseOptions?: Apollo.QueryHookOptions<GetPagePaginationTotalQuery, GetPagePaginationTotalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPagePaginationTotalQuery, GetPagePaginationTotalQueryVariables>(GetPagePaginationTotalDocument, options);
      }
export function useGetPagePaginationTotalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPagePaginationTotalQuery, GetPagePaginationTotalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPagePaginationTotalQuery, GetPagePaginationTotalQueryVariables>(GetPagePaginationTotalDocument, options);
        }
export type GetPagePaginationTotalQueryHookResult = ReturnType<typeof useGetPagePaginationTotalQuery>;
export type GetPagePaginationTotalLazyQueryHookResult = ReturnType<typeof useGetPagePaginationTotalLazyQuery>;
export type GetPagePaginationTotalQueryResult = Apollo.QueryResult<GetPagePaginationTotalQuery, GetPagePaginationTotalQueryVariables>;
export const GetContentHistoryDocument = gql`
    query getContentHistory($idContent: String!, $type: EnumContentHistoryType!) {
  getContentHistory(idContent: $idContent, type: $type) {
    _id
    type
    version
    name
    idPage
    dataPage {
      title
      content
      description
      keywords
      isAddToMainMenu
      isAddToFooterMenu
      status
    }
    createdAt
    createdBy {
      username
    }
    updatedAt
    updatedBy {
      username
    }
  }
}
    `;

/**
 * __useGetContentHistoryQuery__
 *
 * To run a query within a React component, call `useGetContentHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentHistoryQuery({
 *   variables: {
 *      idContent: // value for 'idContent'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetContentHistoryQuery(baseOptions: Apollo.QueryHookOptions<GetContentHistoryQuery, GetContentHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentHistoryQuery, GetContentHistoryQueryVariables>(GetContentHistoryDocument, options);
      }
export function useGetContentHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentHistoryQuery, GetContentHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentHistoryQuery, GetContentHistoryQueryVariables>(GetContentHistoryDocument, options);
        }
export type GetContentHistoryQueryHookResult = ReturnType<typeof useGetContentHistoryQuery>;
export type GetContentHistoryLazyQueryHookResult = ReturnType<typeof useGetContentHistoryLazyQuery>;
export type GetContentHistoryQueryResult = Apollo.QueryResult<GetContentHistoryQuery, GetContentHistoryQueryVariables>;
export const GetMapBlogRelatedsByBlogDocument = gql`
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
    `;

/**
 * __useGetMapBlogRelatedsByBlogQuery__
 *
 * To run a query within a React component, call `useGetMapBlogRelatedsByBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMapBlogRelatedsByBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMapBlogRelatedsByBlogQuery({
 *   variables: {
 *      idBlog: // value for 'idBlog'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMapBlogRelatedsByBlogQuery(baseOptions: Apollo.QueryHookOptions<GetMapBlogRelatedsByBlogQuery, GetMapBlogRelatedsByBlogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMapBlogRelatedsByBlogQuery, GetMapBlogRelatedsByBlogQueryVariables>(GetMapBlogRelatedsByBlogDocument, options);
      }
export function useGetMapBlogRelatedsByBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMapBlogRelatedsByBlogQuery, GetMapBlogRelatedsByBlogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMapBlogRelatedsByBlogQuery, GetMapBlogRelatedsByBlogQueryVariables>(GetMapBlogRelatedsByBlogDocument, options);
        }
export type GetMapBlogRelatedsByBlogQueryHookResult = ReturnType<typeof useGetMapBlogRelatedsByBlogQuery>;
export type GetMapBlogRelatedsByBlogLazyQueryHookResult = ReturnType<typeof useGetMapBlogRelatedsByBlogLazyQuery>;
export type GetMapBlogRelatedsByBlogQueryResult = Apollo.QueryResult<GetMapBlogRelatedsByBlogQuery, GetMapBlogRelatedsByBlogQueryVariables>;
export const GetMapBlogRelatedsDocument = gql`
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
    `;

/**
 * __useGetMapBlogRelatedsQuery__
 *
 * To run a query within a React component, call `useGetMapBlogRelatedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMapBlogRelatedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMapBlogRelatedsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMapBlogRelatedsQuery(baseOptions?: Apollo.QueryHookOptions<GetMapBlogRelatedsQuery, GetMapBlogRelatedsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMapBlogRelatedsQuery, GetMapBlogRelatedsQueryVariables>(GetMapBlogRelatedsDocument, options);
      }
export function useGetMapBlogRelatedsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMapBlogRelatedsQuery, GetMapBlogRelatedsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMapBlogRelatedsQuery, GetMapBlogRelatedsQueryVariables>(GetMapBlogRelatedsDocument, options);
        }
export type GetMapBlogRelatedsQueryHookResult = ReturnType<typeof useGetMapBlogRelatedsQuery>;
export type GetMapBlogRelatedsLazyQueryHookResult = ReturnType<typeof useGetMapBlogRelatedsLazyQuery>;
export type GetMapBlogRelatedsQueryResult = Apollo.QueryResult<GetMapBlogRelatedsQuery, GetMapBlogRelatedsQueryVariables>;
export const GetBlogsDocument = gql`
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
    `;

/**
 * __useGetBlogsQuery__
 *
 * To run a query within a React component, call `useGetBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBlogsQuery(baseOptions?: Apollo.QueryHookOptions<GetBlogsQuery, GetBlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlogsQuery, GetBlogsQueryVariables>(GetBlogsDocument, options);
      }
export function useGetBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogsQuery, GetBlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlogsQuery, GetBlogsQueryVariables>(GetBlogsDocument, options);
        }
export type GetBlogsQueryHookResult = ReturnType<typeof useGetBlogsQuery>;
export type GetBlogsLazyQueryHookResult = ReturnType<typeof useGetBlogsLazyQuery>;
export type GetBlogsQueryResult = Apollo.QueryResult<GetBlogsQuery, GetBlogsQueryVariables>;
export const GetUsersTypeAdminDocument = gql`
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
    `;

/**
 * __useGetUsersTypeAdminQuery__
 *
 * To run a query within a React component, call `useGetUsersTypeAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersTypeAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersTypeAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersTypeAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersTypeAdminQuery, GetUsersTypeAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersTypeAdminQuery, GetUsersTypeAdminQueryVariables>(GetUsersTypeAdminDocument, options);
      }
export function useGetUsersTypeAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersTypeAdminQuery, GetUsersTypeAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersTypeAdminQuery, GetUsersTypeAdminQueryVariables>(GetUsersTypeAdminDocument, options);
        }
export type GetUsersTypeAdminQueryHookResult = ReturnType<typeof useGetUsersTypeAdminQuery>;
export type GetUsersTypeAdminLazyQueryHookResult = ReturnType<typeof useGetUsersTypeAdminLazyQuery>;
export type GetUsersTypeAdminQueryResult = Apollo.QueryResult<GetUsersTypeAdminQuery, GetUsersTypeAdminQueryVariables>;
export const GetEmailOnSubsPaginationDocument = gql`
    query getEmailOnSubsPagination($page: Int, $limit: Int, $search: [SearchEmailInput], $filter: [FilterEmailInput], $sort: [SortEmailInput]) {
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
    `;

/**
 * __useGetEmailOnSubsPaginationQuery__
 *
 * To run a query within a React component, call `useGetEmailOnSubsPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmailOnSubsPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmailOnSubsPaginationQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetEmailOnSubsPaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetEmailOnSubsPaginationQuery, GetEmailOnSubsPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmailOnSubsPaginationQuery, GetEmailOnSubsPaginationQueryVariables>(GetEmailOnSubsPaginationDocument, options);
      }
export function useGetEmailOnSubsPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmailOnSubsPaginationQuery, GetEmailOnSubsPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmailOnSubsPaginationQuery, GetEmailOnSubsPaginationQueryVariables>(GetEmailOnSubsPaginationDocument, options);
        }
export type GetEmailOnSubsPaginationQueryHookResult = ReturnType<typeof useGetEmailOnSubsPaginationQuery>;
export type GetEmailOnSubsPaginationLazyQueryHookResult = ReturnType<typeof useGetEmailOnSubsPaginationLazyQuery>;
export type GetEmailOnSubsPaginationQueryResult = Apollo.QueryResult<GetEmailOnSubsPaginationQuery, GetEmailOnSubsPaginationQueryVariables>;
export const GetMailContactPaginationDocument = gql`
    query getMailContactPagination($page: Int, $limit: Int, $search: [SearchMailContactInput], $filter: [FilterMailContactInput], $sort: [SortMailContactInput]) {
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
    `;

/**
 * __useGetMailContactPaginationQuery__
 *
 * To run a query within a React component, call `useGetMailContactPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMailContactPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMailContactPaginationQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetMailContactPaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetMailContactPaginationQuery, GetMailContactPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMailContactPaginationQuery, GetMailContactPaginationQueryVariables>(GetMailContactPaginationDocument, options);
      }
export function useGetMailContactPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMailContactPaginationQuery, GetMailContactPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMailContactPaginationQuery, GetMailContactPaginationQueryVariables>(GetMailContactPaginationDocument, options);
        }
export type GetMailContactPaginationQueryHookResult = ReturnType<typeof useGetMailContactPaginationQuery>;
export type GetMailContactPaginationLazyQueryHookResult = ReturnType<typeof useGetMailContactPaginationLazyQuery>;
export type GetMailContactPaginationQueryResult = Apollo.QueryResult<GetMailContactPaginationQuery, GetMailContactPaginationQueryVariables>;
export const GetEmailOnSubsPaginationTotalDocument = gql`
    query getEmailOnSubsPaginationTotal($page: Int, $limit: Int, $search: [SearchEmailInput], $filter: [FilterEmailInput]) {
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
    `;

/**
 * __useGetEmailOnSubsPaginationTotalQuery__
 *
 * To run a query within a React component, call `useGetEmailOnSubsPaginationTotalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmailOnSubsPaginationTotalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmailOnSubsPaginationTotalQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetEmailOnSubsPaginationTotalQuery(baseOptions?: Apollo.QueryHookOptions<GetEmailOnSubsPaginationTotalQuery, GetEmailOnSubsPaginationTotalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmailOnSubsPaginationTotalQuery, GetEmailOnSubsPaginationTotalQueryVariables>(GetEmailOnSubsPaginationTotalDocument, options);
      }
export function useGetEmailOnSubsPaginationTotalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmailOnSubsPaginationTotalQuery, GetEmailOnSubsPaginationTotalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmailOnSubsPaginationTotalQuery, GetEmailOnSubsPaginationTotalQueryVariables>(GetEmailOnSubsPaginationTotalDocument, options);
        }
export type GetEmailOnSubsPaginationTotalQueryHookResult = ReturnType<typeof useGetEmailOnSubsPaginationTotalQuery>;
export type GetEmailOnSubsPaginationTotalLazyQueryHookResult = ReturnType<typeof useGetEmailOnSubsPaginationTotalLazyQuery>;
export type GetEmailOnSubsPaginationTotalQueryResult = Apollo.QueryResult<GetEmailOnSubsPaginationTotalQuery, GetEmailOnSubsPaginationTotalQueryVariables>;
export const GetMailContactPaginationTotalDocument = gql`
    query getMailContactPaginationTotal($page: Int, $limit: Int, $search: [SearchMailContactInput], $filter: [FilterMailContactInput]) {
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
    `;

/**
 * __useGetMailContactPaginationTotalQuery__
 *
 * To run a query within a React component, call `useGetMailContactPaginationTotalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMailContactPaginationTotalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMailContactPaginationTotalQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetMailContactPaginationTotalQuery(baseOptions?: Apollo.QueryHookOptions<GetMailContactPaginationTotalQuery, GetMailContactPaginationTotalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMailContactPaginationTotalQuery, GetMailContactPaginationTotalQueryVariables>(GetMailContactPaginationTotalDocument, options);
      }
export function useGetMailContactPaginationTotalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMailContactPaginationTotalQuery, GetMailContactPaginationTotalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMailContactPaginationTotalQuery, GetMailContactPaginationTotalQueryVariables>(GetMailContactPaginationTotalDocument, options);
        }
export type GetMailContactPaginationTotalQueryHookResult = ReturnType<typeof useGetMailContactPaginationTotalQuery>;
export type GetMailContactPaginationTotalLazyQueryHookResult = ReturnType<typeof useGetMailContactPaginationTotalLazyQuery>;
export type GetMailContactPaginationTotalQueryResult = Apollo.QueryResult<GetMailContactPaginationTotalQuery, GetMailContactPaginationTotalQueryVariables>;
export const GetMapServiceProductsDocument = gql`
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
    `;

/**
 * __useGetMapServiceProductsQuery__
 *
 * To run a query within a React component, call `useGetMapServiceProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMapServiceProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMapServiceProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMapServiceProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetMapServiceProductsQuery, GetMapServiceProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMapServiceProductsQuery, GetMapServiceProductsQueryVariables>(GetMapServiceProductsDocument, options);
      }
export function useGetMapServiceProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMapServiceProductsQuery, GetMapServiceProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMapServiceProductsQuery, GetMapServiceProductsQueryVariables>(GetMapServiceProductsDocument, options);
        }
export type GetMapServiceProductsQueryHookResult = ReturnType<typeof useGetMapServiceProductsQuery>;
export type GetMapServiceProductsLazyQueryHookResult = ReturnType<typeof useGetMapServiceProductsLazyQuery>;
export type GetMapServiceProductsQueryResult = Apollo.QueryResult<GetMapServiceProductsQuery, GetMapServiceProductsQueryVariables>;
export const GetServicesDocument = gql`
    query getServices {
  getServices {
    _id
    title
  }
}
    `;

/**
 * __useGetServicesQuery__
 *
 * To run a query within a React component, call `useGetServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServicesQuery(baseOptions?: Apollo.QueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
      }
export function useGetServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
        }
export type GetServicesQueryHookResult = ReturnType<typeof useGetServicesQuery>;
export type GetServicesLazyQueryHookResult = ReturnType<typeof useGetServicesLazyQuery>;
export type GetServicesQueryResult = Apollo.QueryResult<GetServicesQuery, GetServicesQueryVariables>;
export const GetMapServiceProductsByServiceDocument = gql`
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
    `;

/**
 * __useGetMapServiceProductsByServiceQuery__
 *
 * To run a query within a React component, call `useGetMapServiceProductsByServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMapServiceProductsByServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMapServiceProductsByServiceQuery({
 *   variables: {
 *      idService: // value for 'idService'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMapServiceProductsByServiceQuery(baseOptions: Apollo.QueryHookOptions<GetMapServiceProductsByServiceQuery, GetMapServiceProductsByServiceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMapServiceProductsByServiceQuery, GetMapServiceProductsByServiceQueryVariables>(GetMapServiceProductsByServiceDocument, options);
      }
export function useGetMapServiceProductsByServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMapServiceProductsByServiceQuery, GetMapServiceProductsByServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMapServiceProductsByServiceQuery, GetMapServiceProductsByServiceQueryVariables>(GetMapServiceProductsByServiceDocument, options);
        }
export type GetMapServiceProductsByServiceQueryHookResult = ReturnType<typeof useGetMapServiceProductsByServiceQuery>;
export type GetMapServiceProductsByServiceLazyQueryHookResult = ReturnType<typeof useGetMapServiceProductsByServiceLazyQuery>;
export type GetMapServiceProductsByServiceQueryResult = Apollo.QueryResult<GetMapServiceProductsByServiceQuery, GetMapServiceProductsByServiceQueryVariables>;