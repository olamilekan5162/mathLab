import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import LandingPage from "../src/routes/landingpage/LandingPage"
import Dashboard from "../src/routes/dashboard/Dashboard"
import Login from "../src/routes/login/Login"
import Register from "../src/routes/register/Register"

const App = () => {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "register",
      element: <Register />
    },
    {
      path: "dashboard/:displayName",
      element: <Dashboard />
    },
    
    ])
  return (
        <RouterProvider router={router}/>
  )
}

export default App
