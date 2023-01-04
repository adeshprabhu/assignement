import { Landing } from "./landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserDetail } from "./UserDetail";
function App() {
  return (
    <div className="App">
      <BrowserRouter basename={window.location.pathname || ""}>
        <Routes>
          <Route exact path="/" element={<Landing />}></Route>
          <Route path="/userDetail" element={<UserDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
