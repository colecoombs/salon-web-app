import React from 'react';
import { NavbarDark } from './NavbarDark.jsx';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <NavbarDark />
      <Outlet />
    </>
  );
}