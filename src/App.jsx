import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Collections from './pages/Collections'
import Concerts from './pages/Concerts'
import FashionEvents from './pages/FashionEvents'

// Obtener el basename para GitHub Pages (debe coincidir con el base en vite.config.js)
const repoName = import.meta.env.VITE_REPO_NAME || 'GLStudio113'
const basename = import.meta.env.MODE === 'production' ? `/${repoName}` : ''

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/concerts" element={<Concerts />} />
          <Route path="/fashion-events" element={<FashionEvents />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

