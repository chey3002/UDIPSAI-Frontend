import { useUserContext } from '@/assets/useUserContext';
import MenuWrapper from '@/components/sidebar'
import { toIndex } from '@/utils/toindex/toindex';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation'
import Register from '@/components/register/register';

export default function EditarEspecialista({ especialista }) {

    const { t } = useTranslation('home');
    const lang = t;
    if (especialista === null) {
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
            <Register especialista={especialista} />
        </MenuWrapper>
    )
}
export const getServerSideProps = async (context) => {
    const res = await axios.get(process.env['HOST'] + 'api/especialistas/' + context.query.id).then(async res => {
        let especialistaAsignado = null
        if (res.data.especialistaAsignado) {
            console.log(res.data.especialistaAsignado)
            especialistaAsignado = await axios.get(process.env['HOST'] + 'api/especialistas/' + res.data.especialistaAsignado).then(
                res => {
                    console.log(res.data)
                    return res.data
                }
            )
        }
        console.log(especialistaAsignado)
        return { ...res.data, especialistaAsignado: especialistaAsignado }

    })
    console.log(res);
    if (res.data === null) {
        return {
            props: {
                especialista: null
            }
        }
    }

    return {
        props: {
            especialista: { ...res }
        }
    }
}