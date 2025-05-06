import './App.css'
import AuthButtons from './components/auth/AuthButtons'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { revolutionTheme, RevolutionGlobalStyle } from './styles/revolutionTheme'
import Home from './pages/Home'
import AttractionDetail from './pages/AttractionDetail'
import AttractionMap from './pages/AttractionMap'
import PhotoWall from './pages/PhotoWall'
import PhotoDetail from './pages/PhotoDetail'

function App() {
  return (
    <Router>
      <RevolutionGlobalStyle />
      <div className="app">
        <header style={{ backgroundColor: '#c41e3a', padding: '10px 20px', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h2 style={{ color: 'white', margin: '0' }}>湖南红色革命旅游网</h2>
            </Link>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '20px', flexGrow: 1 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>首页</Link>
            <Link to="/attractions" style={{ color: 'white', textDecoration: 'none' }}>景点地图</Link>
            <Link to="/photowall" style={{ color: 'white', textDecoration: 'none' }}>照片墙</Link>
          </nav>
          <div style={{ marginLeft: 'auto' }}>
            <AuthButtons />
          </div>
        </header>

        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/attraction/:id" element={<AttractionDetail />} />
            <Route path="/attractions" element={<AttractionMap />} />
            <Route path="/photowall" element={<PhotoWall />} />
            <Route path="/photo/:id" element={<PhotoDetail />} />
          </Routes>
        </main>

        <footer style={{ backgroundColor: '#f5f5f5', padding: '20px', textAlign: 'center', marginTop: '40px' }}>
          <p>© 2023 湖南红色革命旅游网 | 弘扬革命精神，传承红色基因</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
