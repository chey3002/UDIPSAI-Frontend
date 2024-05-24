import React, { useEffect } from 'react'
import Login from '@/components/login/login';
import Dashboard from '@/components/dashboard/dashboard';
import { useUserContext } from '@/assets/useUserContext';
import MenuWrapper from '@/components/sidebar';
import { redirect } from 'next/navigation';

export default function Home() {


  return <>
    <Login />
  </>;
}
