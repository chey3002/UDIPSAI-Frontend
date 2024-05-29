import { useUserContext } from '@/assets/useUserContext';
import FormPaciente from '@/components/pacientes/patientForm'
import MenuWrapper from '@/components/sidebar'
import { toIndex } from '@/utils/toindex/toindex';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation'

export default function EditarPaciente({ paciente }) {
    const { user } = useUserContext();

    useEffect(() => {
        toIndex(user);
    }, [user]);
    const { t } = useTranslation('home');
    const lang = t;
    if (paciente === null) {
        return (
            <MenuWrapper setLang={true} >
                <Card>
                    <Card.Header>
                        <h1>Detalle del Paciente</h1>
                    </Card.Header>
                    <Card.Body>
                        <h3>No se encontró el paciente</h3>
                    </Card.Body>
                </Card>
            </MenuWrapper>
        )
    }
    return (
        <MenuWrapper setLang={true} >
            <FormPaciente paciente={paciente} lang={lang} />
        </MenuWrapper>
    )
}
export const getServerSideProps = async (context) => {
    const res = await axios.get(process.env['HOST'] + 'api/pacientes/listar/' + context.query.id)
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