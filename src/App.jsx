import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./protected/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./protected/auth/Welcome";
import NotesList from "./protected/notes/NotesList";
import UsersList from "./protected/users/UsersList";

function App() {
  return (
    <Routes>
      {" "}
      // this parent route will wrap all routes
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>
          {/* Here all protected routes  */}
          <Route index element={<Welcome />} />

          <Route path="notes">
            <Route index element={<NotesList />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>
        </Route>
        {/* End Dash */}
      </Route>
    </Routes>
  );
}

export default App;
