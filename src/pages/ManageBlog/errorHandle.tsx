/* eslint-disable no-console */
import React from 'react'

export default class ErrorBoundary extends React.Component<{}, any> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1>
          Không load được trang, liên hệ nhân viên IT để biết thêm chi tiết hoặc{' '}
          <a
            style={{
              color: 'blue',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onClick={() => location.reload()}
          >
            reload lại page
          </a>
        </h1>
      )
    }

    return this.props.children
  }
}
