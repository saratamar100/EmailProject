import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import { UserContext } from "./components/UserProvider";
import { useContext } from "react";
import UserLayout from "./components/UserLayout";
import InboxPage from "./components/InboxPage";
//import SignupPage from "./components/SignupPage";

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        {user && (
          <Route path="/" element={<UserLayout />}>
            <Route path="/inbox" element={<InboxPage />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
