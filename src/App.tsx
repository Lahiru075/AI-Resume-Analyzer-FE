import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUserDetails } from './features/authSlice';

const Login = lazy(() => import('./pages/loginPage'))

function App() {

  const dispatch = useAppDispatch();
  const { loading, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {

      dispatch(fetchUserDetails());
    }
  }, [dispatch]);


  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#020617]">
         <p className="text-white">Loading your profile...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>} />

        <Routes>

          <Route path="/" element={<div>Home</div>} />

          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<div>Dashboard</div>} />

        </Routes>

    </BrowserRouter>
  )
}

export default App