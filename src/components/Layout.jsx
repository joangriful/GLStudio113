import Cursor from './Cursor'
import Navigation from './Navigation'
import './Layout.css'

export default function Layout({ children }) {
  return (
    <div className="app">
      <Cursor />
      <Navigation />
      <main>{children}</main>
    </div>
  )
}

