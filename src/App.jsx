import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import LandingPage from "../src/routes/landingpage/LandingPage"
import Dashboard from "../src/routes/dashboard/Dashboard"
import Login from "../src/routes/login/Login"
import Register from "../src/routes/register/Register"

const App = () => {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<LandingPage />}/>
    <Route path="/dashboard" element={<Dashboard />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>
    </>
    ));
  return (
      <>
        <RouterProvider router={router}/>
      </>
  )
}

export default App
