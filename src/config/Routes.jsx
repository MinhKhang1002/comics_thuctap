import React, { useEffect } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Login from "../components/login/Login";
import ReadComic from "../components/readcomic/ReadComic";
import ForgotPassword from "../components/login/ForgotPassword";
import SignUp from "../components/login/SignUp";
import { useRecoilState } from "recoil";
import { access_token, username } from "../store/login";
import EditUser from "../pages/EditUser";
import EditPassword from "../components/edit-password/EditPassword";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Index from "../components/Admin/index";

const PATHS = {
  SIGNUP: "/signup",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
};

const routeHome = [
  {
    exact: true,
    path: PATHS.LOGIN,
    component: Login,
  },
  {
    exact: true,
    path: PATHS.SIGNUP,
    component: SignUp,
  },
  {
    exact: true,
    path: PATHS.FORGOT_PASSWORD,
    component: ForgotPassword,
  },
];

const Router = () => {
  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const [user, setUser] = useRecoilState(username);
  useEffect(() => {
    setAccessToken(sessionStorage.getItem("token"));
  }, []);

  return (
    <>
      <Routes>
        {/* <Route path="/admin" element={<Index></Index>} /> */}

        <Route path="/login" element={<Login></Login>} />
        <Route path="" element={<Login></Login>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-pasword" element={<ForgotPassword />} />
      </Routes>
      {accessToken && user.role === 0 ? (
        <>
          <Header />
          <Routes>
            <Route
              path="/:comics/search/:keyword"
              element={
                accessToken ? <Catalog></Catalog> : <Navigate to="/login" />
              }
            />

            <Route
              path="/comics"
              element={
                accessToken ? <Catalog></Catalog> : <Navigate to="/login" />
              }
            />
            <Route
              path="/book/detail/:endpoint/:chapter"
              element={
                accessToken ? <ReadComic></ReadComic> : <Navigate to="/login" />
              }
            />
            <Route
              path="/book/detail/:endpoint"
              element={
                accessToken ? <Detail></Detail> : <Navigate to="/login" />
              }
            />

            {/* <Route path="/book/detail/:endpoint" element={<Detail></Detail>} />      sửa detail */}
            <Route
              path="/home"
              element={accessToken ? <Home></Home> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={accessToken ? <Home></Home> : <Login></Login>}
            />
            <Route
              path="/edit"
              element={
                accessToken ? <EditUser></EditUser> : <Navigate to="/login" />
              }
            />

            <Route
              path="/change-password"
              element={accessToken ? <EditPassword></EditPassword> : ""}
            />
            <Route
              path="*"
              element={accessToken ? <Home></Home> : <Navigate to="/login" />}
            />

            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-pasword" element={<ForgotPassword />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          {accessToken && user.role === 1 ? (
            <Routes>
              <Route path="/admin" element={<Index></Index>} />
              {/* <Route path="/a" element={<Login></Login>} /> */}
            </Routes>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};
export { routeHome, PATHS };
export default Router;
