export enum EnumTrangQuanLyHome {
  SEO = 'SEO',
  NewProduct = 'NewProduct',
  Slider = 'Slider',
  Banner = 'Banner',
  Partner = 'Partner',
  WebIntroduce = 'WebIntroduce',
  Estimonial = 'Testimonial',
  Service = 'Service',
  Blog = 'Blog',
  OurClient = 'OurClient'
}
export type ITabStateHome = EnumTrangQuanLyHome | 'All'
// export const listTabsHome: Array<{
//   code: EnumTrangQuanLyHome | EnumTrangQuanLyHome.SEO
//     name: string
//   }> = [
//     { code: EnumTrangQuanLyHome.SEO,  name: 'Thông tin SEO' },
//     { code: EnumTrangQuanLyHome.NewProduct,  name: 'Sản phẩm mới nhất' },
//     { code: EnumTrangQuanLyHome.Slider,   name: 'Slider' },
//     { code: EnumTrangQuanLyHome.Banner,   name: 'Sub banner' }
//   ]
