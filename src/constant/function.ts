export function numberWithCommas(money: number) {
  return money
    ?.toLocaleString('vi', { useGrouping: false, minimumFractionDigits: 0 })
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function downloadFileExcel(dataurl: string, filename: string) {
  return fetch(dataurl)
    .then((res) => res.blob())
    .then((res) => {
      if (
        res.type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
        throw new Error('Download failed')
      const url = window.URL.createObjectURL(res)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
    })
    .catch(() => {
      throw new Error('Download failed')
    })
}

export function setCookie(name: string, value: string) {
  const dayExpires = 7
  const d = new Date()
  d.setTime(d.getTime() + dayExpires * 24 * 60 * 60 * 1000)
  const expiresIn = `expires=${d.toUTCString()}`
  document.cookie = `${name}=${value};${expiresIn};path=/;`
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

export function deleteAllCookies() {
  // eslint-disable-next-line func-names
  document.cookie.split(';').forEach(function(c) { document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${  new Date().toUTCString()  };path=/`) })
}