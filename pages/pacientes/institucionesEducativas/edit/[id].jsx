import { useUserContext } from '@/assets/useUserContext';
import MenuWrapper from '@/components/sidebar'
import { toIndex } from '@/utils/toindex/toindex';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation'
import Register from '@/components/register/register';
import FormInstitucion from '@/components/pacientes/InstitucionEducativa/institucionEducativaForm';

export default function EditarInstitucionEducativa({ institucioneducativa }) {

    const { t } = useTranslation('home');
    const lang = t;
    if (institucioneducativa === null) {
        return (
            <MenuWrapper setLang={true} >
                <Card>
                    <Card.Meta title={<h1>Detalle la institución</h1>} />
                    <div>
                        <h3>No se encontró la institución educativa</h3>
                    </div>
                </Card>
            </MenuWrapper>
        )
    }
    return (
        <MenuWrapper setLang={true} >
            <FormInstitucion institucion={institucioneducativa} />
        </MenuWrapper>
    )
}
export const getServerSideProps = async (context) => {
    const res = await axios.get(process.env['HOST'] + 'api/instituciones/listar/' + context.query.id)
    console.log(res.data);
    if (res.data === null) {
        return {
            props: {
                institucioneducativa: null
            }
        }
    }
    return {
        props: {
            institucioneducativa: res.data
        }
    }
}