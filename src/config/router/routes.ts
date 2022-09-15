/**
 * Dinh nghia cau hinh cua tung route.
 * @property {string} page - Ten cua component duoc cau hinh duoi thu muc pages, gia tri phai giong voi
 * ten duoc dinh nghia trong thu muc page
 * @property {boolean} exact - Chi dinh co phai la "partial match hay khong". @see https://reactrouter.com/web/api/Route/exact-bool
 * @property {string} path - path truy cap tren trinh duyet
 */
export interface IRoute {
  page: string
  exact?: boolean
  path: string
  name: string
}

type RestrictedRoute = 'login'
/**
 * @description
 * Dinh nghia nhung route chi nhung nguoi chua dang nhap moi xem duoc
 *
 * Vi du: /login
 * Nếu đã đăng nhập thì sẽ chuyển hướng tới trang chủ /dashboard
 */
export const restrictedRoutes: Readonly<Record<RestrictedRoute, IRoute>> = {
  login: {
    name: 'Đăng nhập',
    page: 'login',
    exact: true,
    path: '/login'
  }
}

type PublicRoute = string
/**
 * @description
 * Ding nghia nhung route cho ca nhung nguoi chua dang nhap va nhung nguoi da
 * dang nhap co the xem duoc
 */
export const publicRoutes: Readonly<Record<PublicRoute, IRoute>> = {}

export type ProtectedRoute = 'dashboard' | 'managePage' | 'manageOrder' | 'manageProduct' | 'manageCustomer' | 'manageStaff' | 'pageSetting' | 'manageBlog' | 'manageService' | 'manageSystem'
/**
 * @description
 * Dinh nghia nhung route chi danh cho nhung nguoi da nhap thi moi duoc truy cap
 * Vi du: setting
 * Nếu chưa đăng nhập sẽ bị đẩy về trang /login
 */
export const protectedRoutes: Readonly<Record<ProtectedRoute, IRoute>> = {
  dashboard: {
    name: 'Trang chủ',
    page: 'dashboard',
    exact: false,
    path: '/dashboard'
  },
  managePage: {
    page: 'ManagePage',
    exact: false,
    path: '/manage-page',
    name: 'Manage Page'
  },
  pageSetting: {
    page: 'PageSetting',
    exact: false,
    path: '/setting',
    name: 'Setting'
  },
  manageStaff: {
    page: 'ManageStaff',
    exact: true,
    path: '/manage-staff',
    name: 'Manage Staff'
  },
  manageCustomer: {
    page: 'ManageCustomer',
    exact: false,
    path: '/manage-customer',
    name: 'Manage Customer'
  },
  manageOrder: {
    page: 'ManageOrder',
    exact: true,
    path: '/manage-order',
    name: 'Manage Order'
  },
  manageProduct: {
    page: 'ManageProduct',
    exact: false,
    path: '/manage-product',
    name: 'Manage Product'
  },
  manageBlog: {
    page: 'ManageBlog',
    exact: false,
    path: '/manage-blog',
    name: 'Manage Blog'
  },
  manageService: {
    page: 'ManageService',
    exact: false,
    path: '/manage-service',
    name: 'Manage Service'
  },
  manageSystem: {
    page: 'ManageSystem',
    exact: false,
    path: '/system',
    name: 'System'
  }

}
