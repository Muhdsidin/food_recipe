import { Route, Router, Routes } from "react-router-dom"
import Header from "./pages/components/Header/Header"
import Home from "./pages/Home/Home"
import Meal from "./pages/MealDetails/Meal"
import Catlist from "./pages/category/Catlist"
import ProtectHome from "./protectedroutes/ProtectHome"
import Signup from "./pages/signup/Signup"
import Login from "./pages/login/Login"


function App() {
 

  return (
    <>
    <Header />
    <Routes>
      <Route element={<ProtectHome />}>
      <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/meals/:id" element={<Meal />} />
      <Route path="/category/:name" element={<Catlist />} />
    </Routes>

    </>
  )
}

export default App
