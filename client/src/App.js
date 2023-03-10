import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Deshbord from "./components/Deshbord";
import Error from "./components/Error";
import Context from "./components/ContextProvider/Context";
function App() {
  return (
    <div className="App">
      <Context>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/dash" element={<Deshbord />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Context>
    </div>
  );
}

export default App;
