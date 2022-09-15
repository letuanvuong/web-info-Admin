import { useTranslation } from 'react-i18next'

function OurFallbackComponent ({ error, componentStack, resetErrorBoundary }:any) {
  const {t}=useTranslation()
  return (
    <div>
      <h1>
          {t('notFound.textContact')}{' '}
          <a
            style={{
              color: 'blue',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onClick={() => location.reload()}
          >
            {t('notFound.textReload')}
          </a>
        </h1>
    </div>
  )
};
export default OurFallbackComponent




// import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'

// function ErrorBoundary({children}: any){

//   const { t } = useTranslation()
//   const [hasError, setHasError] = useState(false)

  // static getDerivedStateFromError() {
  //   // Update state so the next render will show the fallback UI.
  //   return { hasError: true }
  // }

  // componentDidCatch(error: any, errorInfo: any) {
  //   console.log(error, errorInfo)
  // }

//   return (
//     <>
//       {hasError && (
//         <h1>
//           {t('notFound.textContact')}{' '}
//           <a
//             style={{
//               color: 'blue',
//               cursor: 'pointer',
//               textDecoration: 'underline'
//             }}
//             onClick={() => location.reload()}
//           >
//             {t('notFound.textReload')}
//           </a>
//         </h1>
//       )}
//       {children} 
//     </>
//   )
// }

// export default ErrorBoundary
