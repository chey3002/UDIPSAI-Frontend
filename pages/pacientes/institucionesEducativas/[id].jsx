/* eslint-disable @next/next/no-img-element */
import MenuWrapper from '@/components/sidebar';
import Link from 'next/link';
import React from 'react';
import { Button, Card, Row, Col, Modal, message } from 'antd';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

export default function DetailInstitucion({ institucion }) {
    const { t } = useTranslation('home');
    const lang = t;

    if (institucion === null) {
        return (
            <MenuWrapper setLang={true}>
                <Card>
                    <Card.Meta title={<h1>{lang('institucionNoEncontrada')}</h1>} />
                    <div>
                        <h3>No se encontró la institución educativa</h3>
                    </div>
                </Card>
            </MenuWrapper>
        );
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(process.env['BASE_URL'] + `api/instituciones/eliminar/${id}`);
            message.success(lang('institucionEliminada'));
            window.location.href = '/pacientes/institucionesEducativas';
        } catch (error) {
            message.error(lang('errorEliminarInstitucion'));
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
                <Card.Meta title={<h1>{lang('detallesInstitucion')} {institucion.nombreInstitucion}</h1>} />
                <div>
                    <Row >
                        <Col >
                            <div style={{ marginTop: '10px' }}>
                                <Link href={`/pacientes/institucionesEducativas/edit/${institucion.id}`}>
                                    <Button type="primary" style={{ marginRight: '5px' }}>
                                        {lang('editar')}
                                    </Button>
                                </Link>
                                <Button
                                    type="danger"
                                    onClick={() => showDeleteConfirm(institucion.id)}
                                    style={{ marginRight: '5px' }}
                                >
                                    <i className="bi bi-trash"></i> {lang('eliminar')}
                                </Button>
                            </div>
                        </Col>
                        <Col >
                            <Row >
                                <Col >
                                    <Card title={lang('informacionGeneral')}>
                                        <p><strong>{lang('nombreInstitucion')}</strong> {institucion.nombreInstitucion}</p>
                                        <p><strong>{lang('direccion')}</strong> {institucion.direccion}</p>
                                        <p><strong>{lang('jornada')}</strong> {institucion.jornada}</p>
                                        <p><strong>{lang('tipoInstitucion')}</strong> {institucion.tipoInstitucion}</p>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Card>
        </MenuWrapper>
    );
}

export const getServerSideProps = async (context) => {
    const res = await axios.get(process.env['HOST'] + 'api/instituciones/listar/' + context.query.id);
    if (res.data === null) {
        return {
            props: {
                institucion: null,
            },
        };
    }
    return {
        props: {
            institucion: res.data,
        },
    };
};
