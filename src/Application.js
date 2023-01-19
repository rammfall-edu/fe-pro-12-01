import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { RegistrationPage } from './pages/Registration';
import { ProjectsPage } from './pages/Projects';
import { ROUTES } from './constants';
import { httpClient } from './api';
import { useAuth } from './providers/Storage/auth.hooks';

const Application = () => {
  const { authInfo } = useAuth();
  useEffect(() => {
    httpClient.defaults.headers.common.sessionid = authInfo.sessionId;
    httpClient.defaults.headers.common.accesstoken = authInfo.accessToken;
  }, [authInfo]);

  return (
    <>
      <Header />
      <Routes>
        <Route element={<LoginPage />} path={ROUTES.login} />
        <Route element={<RegistrationPage />} path={ROUTES.registration} />
        <Route element={<ProjectsPage />} path={ROUTES.dashboard} />
      </Routes>
    </>
  );
};

export default Application;
