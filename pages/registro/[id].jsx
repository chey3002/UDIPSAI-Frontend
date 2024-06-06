/* eslint-disable @next/next/no-img-element */
import { useUserContext } from '@/assets/useUserContext';
import MenuWrapper from '@/components/sidebar';
import { toIndex } from '@/utils/toindex/toindex';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Button, Card, Row, Col, Modal, message } from 'antd';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

export default function DetailEspecialista({ especialista }) {
    const { user } = useUserContext();

    useEffect(() => {
        toIndex(user);
    }, [user]);

    const { t } = useTranslation('home');
    const lang = t;

    if (especialista === null) {
        return (
            <MenuWrapper setLang={true}>
                <Card>
                    <Card.Meta title={<h1>{lang('register_title')}</h1>} />
                    <div>
                        <h3>No se encontró el especialista</h3>
                    </div>
                </Card>
            </MenuWrapper>
        );
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(process.env['BASE_URL'] + `api/especialistas/eliminar/${id}`);
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

    return (
        <MenuWrapper setLang={true}>
            <Card>
                <Card.Meta title={<h1>{lang('register_title')} {especialista.cedula}</h1>} />
                <div>
                    <Row gutter={16}>
                        <Col span={8}>
                            <div className="flex justify-content-center align-content-center">
                                <img
                                    src={especialista.imagen ? `data:image/jpeg;base64, ${especialista.imagen}` : 'https://as1.ftcdn.net/v2/jpg/01/28/56/34/1000_F_128563441_kn96kL8fUOtfZlBRBV4kATepeGXuiLzI.jpg'}
                                    style={{ objectFit: 'cover', borderRadius: '15px', border: '3px solid #0044ff', marginLeft: 'auto' }}
                                    alt="avatar"
                                    width="240"
                                    height="300"
                                />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <Link href={`/registro/edit/${especialista.cedula}`}>
                                    <Button type="primary" style={{ marginRight: '5px' }}>
                                        {lang('editar')}
                                    </Button>
                                </Link>
                                <Button
                                    type="danger"
                                    onClick={() => showDeleteConfirm(especialista.cedula)}
                                    style={{ marginRight: '5px' }}
                                >
                                    <i className="bi bi-trash"></i> {lang('eliminar')}
                                </Button>
                            </div>
                        </Col>
                        <Col span={16}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Card title={lang('informacionDelEspecialista_personal')}>
                                        <p><strong>{lang('register_cedula')}</strong> {especialista.cedula}</p>
                                        <p><strong>{lang('register_primerNombre')}</strong> {especialista.primerNombre}</p>
                                        <p><strong>{lang('register_segundoNombre')}</strong> {especialista.segundoNombre}</p>
                                        <p><strong>{lang('register_primerApellido')}</strong> {especialista.primerApellido}</p>
                                        <p><strong>{lang('register_segundoApellido')}</strong> {especialista.segundoApellido}</p>
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card title={lang('informacionDelEspecialista_profesional')}>
                                        <p><strong>{lang('register_id_especialidad')}</strong> {especialista.id_especialidad}</p>
                                        <p><strong>{lang('register_esPasante')}</strong> {especialista.esPasante ? 'Sí' : 'No'}</p>
                                    </Card>
                                </Col>
                                {especialista.esPasante ? (<Col span={12}>
                                    <Card title={lang('informacionDelPasante_pasantia')}>
                                        <p><strong>{lang('informacionDelPasante_inicioPasantia')}</strong> {especialista.inicioPasantia}</p>
                                        <p><strong>{lang('informacionDelPasante_finPasantia')}</strong> {especialista.finPasantia}</p>
                                        <p><strong>{lang('informacionDelPasante_id_especialidad')}</strong> {especialista.id_especialidad}</p>
                                        <p><strong>{lang('informacionDelPasante_esPasante')}</strong> {especialista.esPasante ? 'Sí' : 'No'}</p>
                                        <p><strong>{lang('informacionDelPasante_cedulaEspecialistaAsignado')}</strong> {especialista.cedulaEspecialistaAsignado}</p>
                                    </Card>
                                </Col>) : ''
                                }

                            </Row>
                        </Col>
                    </Row>
                </div>
            </Card>
        </MenuWrapper>
    );
}

export const getServerSideProps = async (context) => {
    const res = await axios.get(process.env['HOST'] + 'api/especialistas/' + context.query.id);
    if (res.data === null) {
        return {
            props: {
                especialista: null,
            },
        };
    }
    return {
        props: {
            especialista: res.data,
        },
    };
};
