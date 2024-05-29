import React, { useEffect, useState } from 'react'
import MenuWrapper from '@/components/sidebar';
import FormPaciente from '@/components/pacientes/patientForm';
import { useUserContext } from '@/assets/useUserContext';
import { toIndex } from '@/utils/toindex/toindex';
import useTranslation from 'next-translate/useTranslation'


export default function NuevoPaciente() {
    const { user } = useUserContext();

    useEffect(() => {
        toIndex(user);
    }, [user]);
    const { t } = useTranslation('home');
    const lang = t;
    return <MenuWrapper setLang={true}>
        <FormPaciente lang={lang} />
    </MenuWrapper>;
}
