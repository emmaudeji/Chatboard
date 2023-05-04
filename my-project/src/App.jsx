import { Routes, Route } from "react-router-dom";
import { Heading, Auth, Home, Footer} from '../src/components/index'


function App() {
  return (
    <>
      <Heading/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
