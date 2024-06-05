import React, { useEffect } from 'react'
import Register from '@/components/register/register';
import MenuWrapper from '@/components/sidebar';
import { useUserContext } from '@/assets/useUserContext';
import { toIndex } from '@/utils/toindex/toindex';

export default function Registro() {

  const { user } = useUserContext();

  useEffect(() => {
    toIndex(user);
  }, [user]);
  return <MenuWrapper setLang={true} >
    <Register />
  </MenuWrapper>;
}
export const metadata = {
  title: "Registro",
  description: "Registro de usuarios",
};