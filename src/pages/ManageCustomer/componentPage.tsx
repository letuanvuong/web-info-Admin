import { notification, Preloader } from '@digihcs/innos-ui3'
import { Size } from '@digihcs/util/lib/enums/Size'
import React, {
  forwardRef,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer
} from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import OurFallbackComponent from 'src/components/errorHandle/OurFallbackComponent'
import { reducer } from 'src/utils/function'

import { componentPageProps, componentPageRef } from './type'

import './index.less'

type stateType = {
  objLazyComponents?: { [key: string]: any }
}

export default React.memo(
  forwardRef<componentPageRef, componentPageProps>((props, ref) => {
    const { t } = useTranslation()
    const [state, setState]: [stateType, (params: stateType) => void] =
      useReducer(reducer, {
        objLazyComponents: {}
      })

    const { childComponentPath }: { childComponentPath: string } = useParams()
    const history = useHistory()

    const componentDidMount = async () => {
      const objLazyComponentRef: { [key: string]: any } = {}
      props.dataCategories
        .filter((i) => i.type === 'his')
        .forEach((i) => {
          const Component = lazy(() => import(`src/pages/${i.page}`))
          objLazyComponentRef[i.route] = (
            <Component
              {...props}
              dataCT_Categories={{
                _id: i.key,
                CategoryName: i.title,
                PageName: i.page,
                PageType: i.type
              }}
            />
          )
        })
      setState({
        objLazyComponents: objLazyComponentRef
      })
    }

    useEffect(() => {
      if (props.dataCategories.length) {
        componentDidMount()
        props.setActive(childComponentPath)
      }
    }, [props.dataCategories])

    useEffect(() => {
      if (
        childComponentPath &&
        Object.keys(state.objLazyComponents).length &&
        !state.objLazyComponents[`/${childComponentPath}`]
      ) {
        history.push('/manage-customer')
        props.componentDidMount()
      }
    }, [childComponentPath, Object.keys(state.objLazyComponents).length])

    useImperativeHandle(ref, () => ({}))

    const render = useCallback(() => {
      if (childComponentPath && Object.keys(state.objLazyComponents).length) {
        if (state.objLazyComponents[`/${childComponentPath}`]) {
          return state.objLazyComponents[`/${childComponentPath}`]
        }
        notification.basic({
          type: 'error',
          content: t('category.msgPageNotFound')
        })
      }
      return <></>
    }, [JSON.stringify(state.objLazyComponents), childComponentPath])

    return (
      <ErrorBoundary FallbackComponent={OurFallbackComponent}>
        <Suspense
          fallback={
            <div
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Preloader size={Size.S} />
            </div>
          }
        >
          {render()}
        </Suspense>
      </ErrorBoundary>
    )
  })
)
