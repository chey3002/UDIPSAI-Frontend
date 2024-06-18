/* eslint-disable @next/next/no-img-element */
import { useUserContext } from '@/assets/useUserContext';
import MenuWrapper from '@/components/sidebar';
import { toIndex } from '@/utils/toindex/toindex';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Button, Card, Row, Col, Modal, message } from 'antd';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

export default function DetailPaciente({ paciente }) {
    console.log(paciente);

    const { t } = useTranslation('home');
    const lang = t;

    if (paciente === null) {
        return (
            <MenuWrapper setLang={true}>
                <Card>
                    <Card.Meta title={<h1>Detalle del Paciente</h1>} />
                    <div>
                        <h3>No se encontró el paciente</h3>
                    </div>
                </Card>
            </MenuWrapper>
        );
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(process.env['BASE_URL'] + `api/pacientes/eliminar/${id}`);
            message.success(lang('pacienteEliminado'));
            window.location.href = '/pacientes';
        } catch (error) {
            message.error(lang('errorEliminarPaciente'));
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
                <Card.Meta title={<h1>{lang('informacionDelPaciente_title')} {paciente.id}</h1>} />
                <div>
                    <Row gutter={16}>
                        <Col span={8}>
                            <div className="flex justify-content-center align-content-center">
                                <img
                                    src={paciente.imagen ? `data:image/jpeg;base64, ${paciente.imagen}` : 'https://as1.ftcdn.net/v2/jpg/01/28/56/34/1000_F_128563441_kn96kL8fUOtfZlBRBV4kATepeGXuiLzI.jpg'}
                                    style={{ objectFit: 'cover', borderRadius: '15px', border: '3px solid #0044ff', marginLeft: 'auto' }}
                                    alt="avatar"
                                    width="240"
                                    height="300"
                                />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <Link href={`/pacientes/edit/${paciente.id}`}>
                                    <Button type="primary" style={{ marginRight: '5px' }}>
                                        {lang('editar')}
                                    </Button>
                                </Link>
                                <Button
                                    type="danger"
                                    onClick={() => showDeleteConfirm(paciente.id)}
                                    style={{ marginRight: '5px' }}
                                >
                                    <i className="bi bi-trash"></i> {lang('eliminar')}
                                </Button>
                            </div>
                        </Col>
                        <Col span={16}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Card title={lang('informacionDelPaciente_personal')}>
                                        <p><strong>{lang('informacionDelPaciente_fechaApertura')}</strong> {paciente.fechaApertura}</p>
                                        <p><strong>{lang('informacionDelPaciente_proyecto')}</strong> {paciente.proyecto}</p>
                                        <p><strong>{lang('informacionDelPaciente_nombre')}</strong> {paciente.nombresApellidos}</p>
                                        <p><strong>{lang('informacionDelPaciente_ciudad')}</strong> {paciente.ciudad}</p>
                                        <p><strong>{lang('informacionDelPaciente_fechaNacimiento')}</strong> {paciente.fechaNacimiento}</p>
                                        <p><strong>{lang('informacionDelPaciente_edad')}</strong> {paciente.edad}</p>
                                        <p><strong>{lang('informacionDelPaciente_cedula')}</strong> {paciente.cedula}</p>
                                        <p><strong>{lang('informacionDelPaciente_domicilio')}</strong> {paciente.domicilio}</p>
                                        <p><strong>{lang('informacionDelPaciente_telefono')}</strong> {paciente.telefono}</p>
                                        <p><strong>{lang('informacionDelPaciente_celular')}</strong> {paciente.celular}</p>
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card title={lang('informacionDelPaciente_title_educativa')}>
                                        <p><strong>{lang('informacionDelPaciente_institucionEducativa')}</strong> {paciente.institucionEducativa.nombreInstitucion}</p>
                                        <p><strong>{lang('informacionDelPaciente_tipoInstitucion')}</strong> {paciente.institucionEducativa.tipoInstitucion}</p>
                                        <p><strong>{lang('informacionDelPaciente_jornada')}</strong> {paciente.jornada.nombreJornada}</p>
                                        <p><strong>{lang('informacionDelPaciente_anioEducacion')}</strong> {paciente.anioEducacion}</p>
                                        <p><strong>{lang('informacionDelPaciente_direccionInstitucion')}</strong> {paciente.institucionEducativa.direccion}</p>
                                        <p><strong>{lang('informacionDelPaciente_paralelo')}</strong> {paciente.paralelo}</p>
                                        <p><strong>{lang('informacionDelPaciente_presentaDiscapacidad')}</strong> {paciente.tieneDiscapacidad}</p>
                                        <p><strong>{lang('informacionDelPaciente_portadorCarnet')}</strong> {paciente.portadorCarnet ? 'Sí' : 'No'}</p>
                                        <p><strong>{lang('informacionDelPaciente_diagnostico')}</strong> {paciente.diagnostico}</p>
                                        <p><strong>{lang('informacionDelPaciente_perteneceInclusion')}</strong> {paciente.perteneceInclusion}</p>
                                    </Card>
                                </Col>
                                <Col span={24}>
                                    <Card title={lang('informacionDelPaciente_motivoConsulta')}>
                                        <p><strong>{lang('informacionDelPaciente_motivoConsulta')}</strong> {paciente.motivoConsulta}</p>
                                        <p><strong>{lang('informacionDelPaciente_observaciones')}</strong> {paciente.observaciones}</p>
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
    const res = await axios.get(process.env['HOST'] + 'api/pacientes/listar/' + context.query.id);
    if (res.data === null) {
        return {
            props: {
                paciente: null,
            },
        };
    }
    return {
        props: {
            paciente: res.data,
        },
    };
};
