import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} exact={true} element={<Login/>} />
        <Route path={"/dashboard"} exact={true} element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}
export default App;
