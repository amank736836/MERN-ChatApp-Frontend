import axios from "axios";
import React, { lazy, Suspense, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";
import { server } from "./constants/config";
import Username from "./pages/Username";
import { userExists, userNotExists } from "./redux/reducers/auth.reducer";
import { SocketProvider } from "./socket";

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));

const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { user, loader, isAdmin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${server}/user/me`, {
          withCredentials: true,
        });

        dispatch(userExists(data.user));

        toast.success("Welcome back!", {
          duration: 1000,
        });
      } catch (error) {
        dispatch(userNotExists());
      }
    };

    fetchUser();
  }, [dispatch]);

  return loader ? (
    <LayoutLoader />
  ) : (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} redirect="/login" />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route path="/u/:username" element={<Username />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/login"
            element={
              <ProtectRoute user={!isAdmin} redirect="/admin/dashboard">
                <AdminLogin />
              </ProtectRoute>
            }
          />

          <Route
            element={<ProtectRoute user={isAdmin} redirect="/admin/login" />}
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/chats" element={<ChatManagement />} />
            <Route path="/admin/messages" element={<MessageManagement />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
