"use client"

import React from 'react'
import MenuWrapper from '@/components/sidebar';
import FormPaciente from '@/components/pacientes/patientForm';

export default function indexPaciente() {
    return <MenuWrapper>
        <FormPaciente />
    </MenuWrapper>;
}
