import Navbar from "./Navbar"
import Info from "./pages/Info"
import Home from "./pages/Home"
import Nacenit from "./pages/Nacenit"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nacenit" element={<Nacenit />} /> 
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>
    </>
  )
}

export default App
