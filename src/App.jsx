import './App.css'
import Home from './pages/home/Home'
import Footer from './layout/footer/Footer'
import Header from './layout/header/Header'
import Login from './pages/login/Login'
import Contact from './pages/contact/Contact'
import Register from './pages/register/Register'
import AboutUs from './pages/about-us/AboutUs'
import ProductDetail from './pages/product-detail/ProductDetail'
import NotFound from './pages/not-found/NotFound'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
        <Header />
      <div className="main-container">

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/register' element={ <Register/>}/>
          <Route path='/about-us' element={ <AboutUs/>}/>
          <Route path='/product-detail/:id' element={<ProductDetail/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
        <Footer />
    </>
  )
}

export default App
