"use client"
import React from 'react'
import Login from '@/components/login/login';
import Dashboard from '@/components/dashboard/dashboard';
import { useUserContext } from '@/assets/useUserContext';
import MenuWrapper from '@/components/sidebar';

export default function Home() {
  const { user } = useUserContext();

  return <>
    {user ? <MenuWrapper><Dashboard /></MenuWrapper> : <Login />}
  </>;
}
