import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Resume from './Pages/Resume/Resume';
import Coverletter from './Pages/CoverLetter/Coverletter';
import Nav from './Component/Nav/Nav';
import Bubbles from './Component/Bubble/Bubble';
import Login from './Pages/Auth/login';
import { Toaster } from 'sonner';
import Register from './Pages/Auth/Register';

const AppLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === '/Login' || location.pathname === '/Register';

  return (
    <>
      <Toaster richColors position="top-center" />
      {!isAuthPage && <Nav />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Resume' element={<Resume />} />
        <Route path='/Coverletter' element={<Coverletter />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
      {!isAuthPage && <Bubbles />}
    </>
  );
};
const App = () => {
  return (
    <BrowserRouter>
      {/* <Toaster richColors position="top-center" /> */}
      <AppLayout />
    </BrowserRouter>
  );
};
export default App;
