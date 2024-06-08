import React, { useEffect } from 'react'
import MenuWrapper from '@/components/sidebar';
import FormInstitucion from '@/components/pacientes/InstitucionEducativa/institucionEducativaForm';

export default function nuevaInstitucion() {


  return <MenuWrapper setLang={true} >
    <FormInstitucion />
  </MenuWrapper>;
}
export const metadata = {
  title: "Instituciones Educativas",
  description: "Nueva Institución Educativa",
};