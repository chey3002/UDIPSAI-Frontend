"use client"

import React, { useEffect, useState } from 'react'
import MenuWrapper from '@/components/sidebar';
import FormPaciente from '@/components/pacientes/patientForm';
import { useUserContext } from '@/assets/useUserContext';
import { toIndex } from '@/utils/toindex/toindex';
import { informacionDelPaciente as esp } from "@/assets/lenguajes/esp.js";
import { informacionDelPaciente as eng } from "@/assets/lenguajes/eng.js";

export default function NuevoPaciente() {
    const { user } = useUserContext();

    useEffect(() => {
        toIndex(user);
    }, [user]);
    const [lang, setLang] = useState(esp);

    return <MenuWrapper setLang={setLang} esp={esp} eng={eng}>
        <FormPaciente lang={lang} />
    </MenuWrapper>;
}
