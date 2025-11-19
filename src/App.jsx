import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Collections from './pages/Collections'
import Concerts from './pages/Concerts'
import FashionEvents from './pages/FashionEvents'

function App() {
  return (
    <BrowserRouter>
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

