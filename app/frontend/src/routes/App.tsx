import { BrowserRouter, Routes, Route } from "react-router";
import { Login, Registration, Feed } from "../pages";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  // Replace this with a real authentication state later
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route
          path="/feed"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Feed />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;