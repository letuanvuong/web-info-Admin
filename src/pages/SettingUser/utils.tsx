import { List, StandardListItem } from '@digihcs/innos-ui3'
import { ListItemType } from '@digihcs/util/lib/enums/ListItemType'

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

export const formatPopoverData = (data: any, style: any = {}) => (
  <List
    fullHeight
    key='list'
    data={data}
    forceClosePopover
    itemKey='page-menu'
    style={{ padding: '20px 10px !important' }}
  >
    {(data: any, index: number) => (
      <StandardListItem
        data={data}
        style={style}
        title={data.text}
        iconName={data.icon}
        key={`page-menu-${index}`}
        onClick={() => data.onClick()}
        type={data.type || ListItemType.Active}
      />
    )}
  </List>
)

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
  return string
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
    // eslint-disable-next-line no-misleading-character-class
    .replace(/[\u02C6\u0306\u031B]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
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
    // console.error(err)
    setTimeout(() => {
      varCheckRef.current = false
    }, 1000)
  }
  setTimeout(() => {
    varCheckRef.current = false
  }, 1000)
  return res
}
