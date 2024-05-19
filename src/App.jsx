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
import AdminProducts from './pages/admin-products/AdminProducts'
import AdminUsers from './pages/admin-users/AdminUsers'

function App() {
  const isAdmin = true;

  return (
    <>
        <Header />

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/register' element={ <Register/>}/>
          <Route path='/about-us' element={ <AboutUs/>}/>
          <Route path='/product-detail/:id' element={<ProductDetail/>}/>
          <Route path='*' element={<NotFound/>}/>
          {
            isAdmin && (
              <>
              <Route path='admin-product' element={<AdminProducts/>}/>
              <Route path='admin-users' element={<AdminUsers/>}/>
              </>
            ) 
          }
        </Routes>
        <Footer />
    </>
  )
}

export default App
