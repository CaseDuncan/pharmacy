import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './common/footer/Footer';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Products  from './components/products/Products';
import SideBar from './components/dashboard/SideBar';


function App() {
  return (
    <div className="App">      
      <Routes>
        <Route path='/' exact element={<Login/>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<SideBar/>}/>
        <Route path='/products' element={<Products/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
