import { ApolloProvider } from '@apollo/client'
import client from 'src/config/graphql'
import AcexisProvider from 'src/provider/AcexisProvider'
import AppConfigContextProvider from 'src/provider/AppConfigContextProvider'
import AuthContextProvider from 'src/provider/AuthContextProvider'
import AppRouter from 'src/router'

import 'src/config/i18n'
import 'src/style/index.less'
import 'antd/dist/antd.css'
import './i18n.less'

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <AuthContextProvider>
      <AppConfigContextProvider>
        <AcexisProvider>
          <AppRouter />
        </AcexisProvider>
      </AppConfigContextProvider>
    </AuthContextProvider>
  </ApolloProvider>
)

export default App
