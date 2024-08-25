import { useUserContext } from '@/assets/useUserContext';
import MenuWrapper from '@/components/sidebar'
import { toIndex } from '@/utils/toindex/toindex';
import React, { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Register from '@/components/register/register';
import BreadCrumbEspecialista from '@/components/commons/breadCrumbEspecialista';
import { Card, message } from 'antd';
import { especialistasById } from '@/utils/apiRequests';

export default function EditarEspecialista({ especialista }) {

    const { t } = useTranslation('home');
    const lang = t;
    if (especialista === null) {
        return (
            <MenuWrapper setLang={true} >
                <Card>
                    <Card.Meta title={<h1>{lang('edit_especialista_title')}</h1>} />
                    <div>
                        <h3>{lang('noSeEncontroEspecialista')}</h3>
                    </div>
                </Card>
            </MenuWrapper>
        )
    }
    return (
        <MenuWrapper setLang={true} >
            <BreadCrumbEspecialista page={lang('editar')} cedula={especialista.cedula} />
            <Register especialista={especialista} />
        </MenuWrapper>
    )
}
export const getServerSideProps = async (context) => {
    const res = await especialistasById(context.query.id, message);
    console.log(res);
    if (res === null) {
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