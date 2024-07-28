import React, { useEffect, useState } from 'react'
import MenuWrapper from '@/components/sidebar';
import FormPaciente from '@/components/pacientes/patientForm';
import { useUserContext } from '@/assets/useUserContext';
import { toIndex } from '@/utils/toindex/toindex';
import useTranslation from 'next-translate/useTranslation'
import BreadCrumbPacientes from '@/components/commons/breadCrumPaciente';


export default function NuevoPaciente() {

    const { t } = useTranslation('home');
    const lang = t;
    return <MenuWrapper setLang={true}>
        <BreadCrumbPacientes idPaciente={null} page={lang('NuevoPaciente')} />

        <FormPaciente lang={lang} />
    </MenuWrapper>;
}
