import { CommonHisComponent, notification } from '@digihcs/innos-ui3'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import Logo from 'src/assets/images/logo-sunny-horizontal.png'
import i18n from 'src/config/i18n'
import { LocalStorageItemKeys, setCookie } from 'src/constant'
import { AuthContext } from 'src/context'
import { LOGIN } from 'src/graphql-definition'
import {
  EnumLanguage,
  useGetContentMenuQuery
} from 'src/graphql-definition/webinfo-service.generated'
import useAuthLazyQuery from 'src/hooks/apollo/useAuthLazyQuery'
import { getUrlImage } from 'src/utils/uploadFile'

const LoginForm: React.FunctionComponent = () => {
  const { dispatchAuthAction } = useContext(AuthContext)
  const { push } = useHistory()
  const { t } = useTranslation()
  const [loginError, setLoginError] = useState(false)
  const [queryLogin, { data, error }] = useAuthLazyQuery(LOGIN, {
    fetchPolicy: 'no-cache'
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: dataContentMenu, refetch: refetchContentMenu } =
    useGetContentMenuQuery({
      fetchPolicy: 'network-only',
      variables: {
        language: i18n.language === 'vi' ? EnumLanguage.Vi : EnumLanguage.En
      }
    })
  const logo = dataContentMenu?.getContentMenu?.linkLogo
  // on Receive Data
  useEffect(() => {
    // eslint-disable-next-line no-console
    if (data) {
      notification.bar({
        title: t('loginpage.SUCCESS'),
        type: 'success',
        placement: 'bottomRight',
        theme: 'pharmacy'
      })

      window.localStorage.setItem(
        LocalStorageItemKeys.HEADER_TOKEN_KEY,
        data.login.token
      )

      setCookie(LocalStorageItemKeys.ADMIN_TOKEN_KEY, data.login.token)

      dispatchAuthAction({
        type: 'SWITCH_AUTH_STATE',
        payload: { state: true }
      })

      push('/')
    }
  }, [data, dispatchAuthAction, push, t])
  // on Error
  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      // notification.bar({
      //   title: t('loginpage.USER_NOT_EXIST'),
      //   type: 'error',
      //   placement: 'bottomRight',
      //   theme: 'pharmacy'
      // })
      setLoginError(true)
    }
  }, [error, t])
  const onSubmitLoginHandle = useCallback(
    (param: any) => {
      queryLogin({
        variables: {
          info: {
            username: param?.username,
            password: param?.password
          }
        }
      })
    },
    [queryLogin]
  )

  const handleChange = () => {
    setLoginError(false)
  }
  return (
    <div style={{ height: '100vh', width: '100vw' }} className='login'>
      <CommonHisComponent.LoginPage
        onLogin={onSubmitLoginHandle}
        errorMessage={
          (error?.graphQLErrors?.[0] as any)?.code === 'USER_LOCKED'
            ? t('loginpage.USER_LOCKED')
            : t('loginpage.USER_NOT_EXIST')
        }
        showError={loginError}
        logo={logo ? getUrlImage(logo) : Logo}
        onChange={handleChange}
      />
    </div>
  )
}

export default LoginForm
