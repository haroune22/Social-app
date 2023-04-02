import { useContext, useState } from 'react'
import './Style.scss'
import Login from './Pages/Login/Login'
import './App.css'
import Register from './Pages/Register/Register'
import {BrowserRouter as Router,
  Outlet,
  createBrowserRouter,
  RouterProvider,
  Navigate,
  }from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Leftbar from './Components/Leftbar/Leftbar'
import { Rightbar } from './Components/Rightbar/Rightbar'
import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/Profile'
import {DarkmodeContext} from './Context/DarkmodeContext'
import { AuthContext } from './Context/AuthContext'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'



function App() {
  const {currentUser }=useContext(AuthContext)
  const {darkmode}=useContext(DarkmodeContext)
  const queryClient = new QueryClient()

  const Layout = ()=>{
    return(
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkmode ? "dark":"light"}`}>
        <Navbar/>
        <div style={{display:"flex"}}>
          <Leftbar/>
          <div style={{flex:'6'}}>
          <Outlet/>
          </div>
          <Rightbar/>
        </div>
      </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to={"/Login"}/>
    }
    return children
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute> 
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/Register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App
