/* eslint-disable @next/next/no-img-element */
import { useUserContext } from '@/assets/useUserContext';
import MenuWrapper from '@/components/sidebar';
import Link from 'next/link';
import React from 'react';
import { Button, Card, Row, Col, Modal, message } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import BreadCrumbEspecialista from '@/components/commons/breadCrumbEspecialista';
import { DeleteOutlined } from '@ant-design/icons';
import { especialistasById, especialistasDelete, especialistasUpdate } from '@/utils/apiRequests';

const buttonStyle = {
    marginRight: '10px',
    marginBottom: '10px',
};

const DeleteButton = ({ onDelete, lang }) => (
    <Button
        type="default"
        icon={<DeleteOutlined />}
        onClick={onDelete}
        style={{ ...buttonStyle, backgroundColor: '#ff4d4f', color: '#fff', border: 'none' }}
    >
        {lang('eliminar')}
    </Button>
);

export default function DetailEspecialista({ especialista }) {
    console.log(especialista);
    const { t } = useTranslation('home');
    const lang = t;

    if (especialista === null) {
        return (
            <MenuWrapper setLang={true}>
                <Card>
                    <Card.Meta title={<h1>{lang('register_title')}</h1>} />
                    <div>
                        <h3>{lang('noSeEncontroEspecialista')}</h3>
                    </div>
                </Card>
            </MenuWrapper>
        );
    }

    const handleDelete = async (id) => {
        try {
            await especialistasDelete(id, message);
            message.success(lang('especialistaEliminado'));
            window.location.href = '/registro';
        } catch (error) {
            message.error(lang('errorEliminarEspecialista'));
            console.error(error);
        }
    };

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            title: lang('confirmarEliminacion'),
            content: lang('seguroEliminar'),
            okText: lang('si'),
            okType: 'danger',
            cancelText: lang('no'),
            onOk() {
                handleDelete(id);
            },
        });
    };
    const handleReactivar = async () => {
        try {
            const formState = {
                cedula: especialista.cedula,
                primerNombre: especialista.primerNombre,
                segundoNombre: especialista.segundoNombre,
                primerApellido: especialista.primerApellido,
                segundoApellido: especialista.segundoApellido,
                especialidadId: especialista.especialidad ? especialista.especialidad?.id : null,
                esPasante: especialista.esPasante,
                inicioPasantia: especialista.inicioPasantia,
                finPasantia: especialista.finPasantia,
                especialistaAsignado: especialista.especialistaAsignado?.cedula,
                imagen: especialista.imagen,
                contrasena: especialista.contrasena,
                contrasenaConfirm: especialista.contrasena,
                sede: especialista.sede?.id || null,
                especialistaEstado: 1,
            };
            console.log(formState);
            await especialistasUpdate(formState.cedula, formState, message);
            // await pacientesActualizar();
            message.success(lang('pacienteReactivado'));
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <MenuWrapper setLang={true}>
            <BreadCrumbEspecialista page={lang('especialista')} cedula={especialista.cedula} />
            <Card
                style={{
                    margin: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Card.Meta
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h1 style={{ fontSize: '24px', color: '#008000' }}>{lang('informacion_especialista')} {especialista.cedula}</h1>
                            {!especialista.especialistaEstado ? <div>
                                <Button type="primary" onClick={handleReactivar} style={{ backgroundColor: '#52c41a', color: '#fff', border: 'none' }}>

                                    Reactivar
                                </Button>
                            </div> : <div>
                                <DeleteButton onDelete={() => showDeleteConfirm(especialista.cedula)} lang={lang} />
                            </div>}
                        </div>
                    }
                />

                <Row gutter={16} style={{ marginBottom: '20px' }}>
                    <Col span={24} md={12} style={{ textAlign: 'center' }}>
                        <img
                            src={especialista.imagen ? `data:image/jpeg;base64, ${especialista.imagen}` : 'https://www.shareicon.net/data/128x128/2016/06/25/786525_people_512x512.png'}
                            style={{
                                objectFit: 'cover',
                                borderRadius: '12px',
                                border: '3px solid #2e6f40',
                                width: '100%',
                                maxWidth: '240px',
                            }}
                            alt="avatar"
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <Col span={24} md={12}>
                            <h3 style={{ color: '#008000', marginTop: '20px' }}>{lang('informacionDelEspecialista_personal')}</h3>
                            <p><strong>{lang('register_cedula')}:</strong> {especialista.cedula}</p>
                            <p><strong>{lang('register_primerNombre')}:</strong> {especialista.primerNombre}</p>
                            <p><strong>{lang('register_segundoNombre')}:</strong> {especialista.segundoNombre}</p>
                            <p><strong>{lang('register_primerApellido')}:</strong> {especialista.primerApellido}</p>
                            <p><strong>{lang('register_segundoApellido')}:</strong> {especialista.segundoApellido}</p>
                        </Col>

                    </Col>
                </Row>
                <Row gutter={16}>

                    <Col span={24} md={12}>
                        <h3 style={{ color: '#008000', marginTop: '20px' }}>{lang('informacionDelEspecialista_profesional')}</h3>

                        <p><strong>{lang('register_id_especialidad')}:</strong> {especialista.especialidad?.area}</p>
                        <p><strong>{lang('informacionDelPaciente_sede')}:</strong> {especialista.sede?.nombre}</p>
                        <p><strong>{lang('register_esPasante')}:</strong> {especialista.esPasante ? 'Sí' : 'No'}</p>
                    </Col>
                    {especialista.esPasante && (
                        <Col span={24} md={12}>
                            <h3 style={{ color: '#008000', marginTop: '20px' }}>{lang('informacionDelPasante_pasantia')}</h3>

                            <p><strong>{lang('informacionDelPasante_inicioPasantia')}:</strong> {especialista.inicioPasantia}</p>
                            <p><strong>{lang('informacionDelPasante_finPasantia')}:</strong> {especialista.finPasantia}</p>
                            <p><strong>{lang('informacionDelPasante_cedulaEspecialistaAsignado')}:</strong> {especialista.especialistaAsignado.cedula}</p>
                            <p><strong>{lang('informacionDelPasante_NombresEspecialistaAsignado')}:</strong> {especialista.especialistaAsignado.primerNombre + " " + especialista.especialistaAsignado.segundoNombre + " " + especialista.especialistaAsignado.primerApellido + " " + especialista.especialistaAsignado.segundoApellido}</p>

                        </Col>
                    )}
                </Row>
            </Card>
        </MenuWrapper>
    );
}

export const getServerSideProps = async (context) => {
    const res = await especialistasById(context.query.id, message);
    if (res === null) {
        return {
            props: {
                especialista: null,
            },
        };
    }
    return {
        props: {
            especialista: res,
        },
    };
};
