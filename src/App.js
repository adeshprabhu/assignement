import { Landing } from "./landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserDetail } from "./UserDetail";

import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandler } from "./ErrorHandler";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={window.location.pathname || ""}>
        <ErrorBoundary FallbackComponent={ErrorHandler}>
          <Routes>
            <Route exact path="/" element={<Landing />}></Route>
            <Route exact path="/userDetail" element={<UserDetail />}></Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
