import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar' 
import Header from './Header'  

function Layout() {
  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout