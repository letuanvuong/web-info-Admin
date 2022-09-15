import { createContext } from 'react'

interface AppMainLayoutContextProps {
  collapse: () => void
}

const AppMainLayoutContext = createContext<AppMainLayoutContextProps>({
  collapse: () => {}
})

export default AppMainLayoutContext
