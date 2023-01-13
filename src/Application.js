import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { RegistrationPage } from './pages/Registration';
import { ProjectsPage } from './pages/Projects';

const Application = () => {
  const [authInfo, setAuthInfo] = useState(
    localStorage.authInfo ? JSON.parse(localStorage.authInfo) : {}
  );

  useEffect(() => {
    localStorage.authInfo = JSON.stringify(authInfo);
  }, [authInfo]);

  const logout = () => {
    setAuthInfo({});
  };

  return (
    <>
      <Header isLoggedIn={authInfo.sessionId} handleLogout={logout} />
      <Routes>
        <Route
          element={<LoginPage saveAuthInfo={setAuthInfo} />}
          path="/login"
        />
        <Route element={<RegistrationPage />} path="/register" />
        <Route
          element={<ProjectsPage authInfo={authInfo} />}
          path="/dashboard"
        />
      </Routes>
    </>
  );
};

export default Application;
