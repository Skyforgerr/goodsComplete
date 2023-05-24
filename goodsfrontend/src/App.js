import './App.css';
import ResponsiveAppBar from './components/Appbar';
import { Routes, Route } from "react-router-dom";
import Main from './pages/main';
import Profile from './pages/profile';
import Registration from './pages/registration';
import Admin from './pages/admin';
import Products from './pages/products';
import {Login} from './pages/login';
import {NewProduct} from './pages/newproduct';
import Query from './pages/query';
import Cart from './pages/cart';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/list" element={<Admin/>}/>
        <Route path="/goods/view" element={<Products/>}/>
        <Route path="/authenticate" element={<Login/>}/>
        <Route path="/goods/add" element={<NewProduct/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/goods/search" element={<Query/>}/>
        <Route path="/goods/del" element={<Products/>}/>
        <Route path="/api/v1/auth/cart" element={<Cart/>}/>
        <Route path="/api/v1/auth/deletecart" element={<Cart/>}/>
      </Routes>
    </div>
  );
}

export default App;
