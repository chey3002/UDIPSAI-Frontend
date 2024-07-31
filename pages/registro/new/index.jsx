import React, { useEffect } from 'react'
import Register from '@/components/register/register';
import MenuWrapper from '@/components/sidebar';
import { useUserContext } from '@/assets/useUserContext';
import { toIndex } from '@/utils/toindex/toindex';
import BreadCrumbEspecialista from '@/components/commons/breadCrumbEspecialista';
import { useTranslation } from 'next-translate';

export default function Registro() {

  const { user } = useUserContext();
  const { t } = useTranslation('home');
  const lang = t;
  useEffect(() => {
    toIndex(user);
  }, [user]);
  return <MenuWrapper setLang={true} >
    <BreadCrumbEspecialista page={lang('editar')} cedula={null} />
    <Register />
  </MenuWrapper>;
}
export const metadata = {
  title: "Registro",
  description: "Registro de usuarios",
};