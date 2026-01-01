import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUserDetails } from './features/authSlice';

const Login = lazy(() => import('./pages/loginPage'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const Layout = lazy(() => import ('./components/Layout'))
const AnalysisResume = lazy(() => import('./pages/AnalyzeResume'))
const AnalysisResult = lazy(() => import('./pages/AnalysisResult'))

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

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyze" element={<AnalysisResume />} />
          <Route path="/result" element={<AnalysisResult />} />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App