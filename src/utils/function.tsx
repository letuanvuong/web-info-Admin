/* eslint-disable unicorn/better-regex */
/* eslint-disable operator-assignment */
/* eslint-disable no-bitwise */
/* eslint-disable prefer-const */
/* eslint-disable one-var */
/* eslint-disable no-misleading-character-class */
import { range } from 'lodash'

export const currency = 'VND'

export function parseError(err: any) {
  if (err && err.message && /^Network error:/.test(err.message)) {
    return 'Error connect'
  }

  const message =
    err?.graphQLErrors?.map((er: any) => er.message).join(',') ||
    err?.message ||
    'Có lỗi xảy ra'
  return message
}

export function reducer(prevState: any, state: any) {
  return {
    ...prevState,
    ...state
  }
}

export function formatNumber(number: any) {
  return `${number || number === 0 ? number : ''}`.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ','
  )
}

export function formatNumberDot(number: number, maxFixed: number = 3) {
  return number?.toLocaleString('en', { maximumFractionDigits: maxFixed })
}

export function formatNumberDotThousand(number: number, maxFixed: number = 0) {
  return (number / 1000).toLocaleString('en', {
    maximumFractionDigits: maxFixed
  })
}

export function hiddenName(name: string) {
  if (!name) return name
  const names = name.trim().split(/\s/)
  const namesFormated = names.map(
    (d) =>
      `${d[0]}${range(d.length - 1)
        .map(() => '*')
        .join('')}`
  )
  return namesFormated.join(' ')
}

export function formatNumberDotCustom(number: number, roundNumber: number) {
  return number.toLocaleString('en', { maximumFractionDigits: roundNumber })
}

function rgba2hex(orig: string) {
  let a,
    rgb: any = orig
      .replace(/\s/g, '')
      .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = ((rgb && rgb[4]) || '').trim(),
    hex = rgb
      ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
        (rgb[2] | (1 << 8)).toString(16).slice(1) +
        (rgb[3] | (1 << 8)).toString(16).slice(1)
      : orig

  if (alpha !== '') {
    a = alpha
  } else {
    a = 1
  }
  // multiply before convert to HEX
  a = ((a * 255) | (1 << 8)).toString(16).slice(1)
  hex = hex + a

  return hex
}

export const genColorOpacity = (number: number) =>
  Array.from(Array(number).keys()).map(
    (d, index) =>
      `#${rgba2hex(
        `rgba(15, 87, 204, ${0.5 + (1 - index / number) * (1 - 0.5)})`
      )}`
  )

export const checkDevices = () => {
  if (
    /android|webos|blackberry|iemobile|opera mini|windows phone/i.test(
      navigator.userAgent
    )
  ) {
    return 'android'
  }
  if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
    return 'ios'
  }

  return 'web'
}

export function filterOptsDefault(input: string, option: any) {
  if (!option?.data) {
    if (typeof option?.children === 'string') {
      return (
        option?.children?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0 ||
        toUnsigned(option?.children)
          ?.toLowerCase()
          ?.indexOf(toUnsigned(input)?.toLowerCase()) >= 0
      )
    }
    return (
      option?.children?.props?.children
        ?.toLowerCase()
        ?.indexOf(input?.toLowerCase()) >= 0 ||
      toUnsigned(option?.children?.props?.children)
        ?.toLowerCase()
        ?.indexOf(toUnsigned(input)?.toLowerCase()) >= 0
    )
  }
  const text_escaped = (input || '').replace(/[$()*+.?[\\\]^{|}]/g, '\\$&')
  const regExp = new RegExp(text_escaped, 'siu')
  return regExp.test(option?.data) || regExp.test(toUnsigned(option?.data))
}

export function toUnsigned(string: string) {
  if (!string) {
    return ''
  }
  return (
    string
      .replace(/[àáâãăạảấầẩẫậắằẳẵặ]/g, 'a')
      .replace(/[ÀÁÂÃĂẠẢẤẦẨẪẬẮẰẲẴẶ]/g, 'A')
      .replace(/[òóôõơọỏốồổỗộớờởỡợ]/g, 'o')
      .replace(/[ÒÓÔÕƠỌỎỐỒỔỖỘỚỜỞỠỢ]/g, 'O')
      .replace(/[èéêẹẻẽếềểễệ]/g, 'e')
      .replace(/[ÈÉÊẸẺẼẾỀỂỄỆ]/g, 'E')
      .replace(/[ùúũưụủứừửữự]/g, 'u')
      .replace(/[ÙÚŨƯỤỦỨỪỬỮỰ]/g, 'U')
      .replace(/[ìíĩỉị]/g, 'i')
      .replace(/[ÌÍĨỈỊ]/g, 'I')
      .replace(/[ýỳỵỷỹ]/g, 'y')
      .replace(/[ÝỲỴỶỸ]/g, 'Y')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[\u0300\u0301\u0303\u0309\u0323]/g, '')
      .replace(/[\u02C6\u0306\u031B]/g, '')
      // .replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

export async function base64ToFile(
  base64: any,
  fileName: string,
  type: string
) {
  const res = await fetch(base64)
  return new File([await res.blob()], fileName, { type: type || 'image/png' })
}

export async function checkDoubleClick(
  varCheckRef: { current: Boolean },
  callback: Function,
  variableCallback: Array<any> = []
) {
  let res
  if (varCheckRef.current === true) {
    return
  }
  varCheckRef.current = true
  try {
    res = await callback(...variableCallback)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    setTimeout(() => {
      varCheckRef.current = false
    }, 1000)
  }
  setTimeout(() => {
    varCheckRef.current = false
  }, 1000)
  return res
}

export const getValueOffilter = (filter: any) => {
  switch (filter?.filterType) {
    case 'text':
      return filter?.filter
    case 'set':
      return filter?.values
    case 'date':
      return filter?.dateFrom
    default:
      return filter?.filter
  }
}

// eslint-disable-next-line no-useless-escape
export const REGEX_SLUG: RegExp = /^[a-zA-Z0-9\-]+$/
export const REGEX_PRICE: RegExp = /^\d+(,\d{1,2})?$/
export const removeVietnameseTones = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  str = str.replace(/Đ/g, 'D')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ')
  str = str.trim()
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    // eslint-disable-next-line no-useless-escape
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ''
  )
  return str
}

export function generateSlug(name: string) {
  const handleString: any = removeVietnameseTones(name.trim()).toLowerCase()
  const slug = `${handleString.replace(/ /g, '-')}`
  return slug
}
