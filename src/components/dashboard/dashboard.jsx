'use client'
import { useUserContext } from '@/assets/useUserContext';
import React from 'react'
import { Button } from 'react-bootstrap';

export default function Dashboard() {
  const { logout } = useUserContext();

  return <div>
    <h1>Soy un Dashboard</h1>
    <Button variant='danger' onClick={() => logout()}>Logout</Button>
  </div>;
}
