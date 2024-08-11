import './App.css'
import Home from './pages/home/Home'
import Footer from './layout/footer/Footer'
import Header from './layout/header/Header'
import Login from './pages/login/Login'
import Contact from './pages/contact/Contact'
import AboutUs from './pages/about-us/AboutUs'
import ProductDetail from './pages/product-detail/ProductDetail'
import NotFound from './pages/not-found/NotFound'
import { Route, Routes } from 'react-router-dom'
import AdminProducts from './pages/admin-products/AdminProducts'
import AdminUsers from './pages/admin-users/AdminUsers'
import UserGuard from './services/guard/UserGuard'
import AdminOrders from './pages/adminOrders/AdminOrders'
import MyOrders from './pages/my-orders/MyOrders'
import AdminCarousel from './pages/admin-carousel/AdminCarousel'
import AdminTicket from './pages/adminTickets/AdminTicket'
import MyTickets from './pages/my-tickets/MyTickets'

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/product-detail/:id' element={<ProductDetail />} />
        <Route path='/my-orders' element={<MyOrders />}></Route>
        <Route path='/my-tickets' element={<MyTickets />}></Route>
        <Route path='/admin-product' element={
          <UserGuard>
            <AdminProducts />
          </UserGuard>
        } />

        <Route path='/admin-users' element={
          <UserGuard>
            <AdminUsers />
          </UserGuard>
        } />

        <Route path='/admin-orders' element={
          <UserGuard>
            <AdminOrders />
          </UserGuard>
        } />
        <Route path='/admin-carousel' element={
          <UserGuard>
            <AdminCarousel />
          </UserGuard>
        } />
        <Route path='/admin-tickets' element={
          <UserGuard>
            <AdminTicket />
          </UserGuard>
        } />
        <Route path='*' element={<NotFound />} />
      </Routes>


      <Footer />
    </>
  )
}

export default App
