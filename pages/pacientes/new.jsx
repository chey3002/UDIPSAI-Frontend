"use client"

import React, { useEffect } from 'react'
import MenuWrapper from '@/components/sidebar';
import FormPaciente from '@/components/pacientes/patientForm';
import { useUserContext } from '@/assets/useUserContext';
import { toIndex } from '@/utils/toindex/toindex';

export default function NuevoPaciente() {
    const { user } = useUserContext();

    useEffect(() => {
        toIndex(user);
    }, [user]);
    return <MenuWrapper>
        <FormPaciente />
    </MenuWrapper>;
}
