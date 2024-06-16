import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './authComponents/Signup';
import Login from './authComponents/Login';
import Home from './userComponents/Home';
import UpdateUser from './userComponents/UpdateUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/updateUser' element={<UpdateUser />} />
    </Routes>
  </BrowserRouter>
);
