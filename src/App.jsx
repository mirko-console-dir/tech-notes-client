import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./protected/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./protected/auth/Welcome";
import NotesList from "./protected/notes/NotesList";
import UsersList from "./protected/users/UsersList";
import EditUser from "./protected/users/EditUser";
import EditNote from "./protected/notes/EditNote";
import NewNote from "./protected/notes/NewNote";
import NewUserForm from "./protected/users/NewUserForm";

function App() {
  return (
    <Routes>
      {/* this parent route will wrap all routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>
          {/* Here all protected routes  */}
          <Route index element={<Welcome />} />

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="new" element={<NewUserForm />} />
          </Route>

          <Route path="notes">
            <Route index element={<NotesList />} />
            <Route path=":id" element={<EditNote />} />
            <Route path="new" element={<NewNote />} />
          </Route>
        </Route>
        {/* End Dash */}
      </Route>
    </Routes>
  );
}

export default App;
