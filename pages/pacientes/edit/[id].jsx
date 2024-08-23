import { useUserContext } from '@/assets/useUserContext';
import FormPaciente from '@/components/pacientes/patientForm'
import MenuWrapper from '@/components/sidebar'
import React, { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import BreadCrumbPacientes from '@/components/commons/breadCrumPaciente';
import { pacienteById } from '@/utils/apiRequests';
import { Card, message } from 'antd';

export default function EditarPaciente({ paciente }) {

    const { t } = useTranslation('home');
    const lang = t;
    console.log(paciente);
    if (paciente === null) {
        return (
            <MenuWrapper setLang={true} >
                <Card>
                    <Card.Meta title={<h1>Detalle del Paciente</h1>} />
                    <div>
                        <h3>No se encontró el paciente</h3>
                    </div>
                </Card>
            </MenuWrapper>
        )
    }
    return (
        <MenuWrapper setLang={true} >
            <BreadCrumbPacientes idPaciente={paciente.id} page={lang('EditarPaciente')} />

            <FormPaciente paciente={paciente} />
        </MenuWrapper>
    )
}
export const getServerSideProps = async (context) => {
    const res = await pacienteById(context.query.id);
    console.log(res.data);
    if (res.data === null) {
        return {
            props: {
                paciente: null
            }
        }
    }
    return {
        props: {
            paciente: res.data
        }
    }
}