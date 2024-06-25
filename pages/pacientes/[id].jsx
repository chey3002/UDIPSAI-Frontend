/* eslint-disable @next/next/no-img-element */
import { useUserContext } from '@/assets/useUserContext';
import MenuWrapper from '@/components/sidebar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Card, Row, Col, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

const buttonStyle = {
    marginRight: '10px',
    marginBottom: '10px',
    color: '#fff',
};

const EditButton = ({ pacienteId, lang }) => (
    <Link href={`/pacientes/edit/${pacienteId}`}>
        <Button type="primary" icon={<EditOutlined />} style={buttonStyle}>
            {lang('editar')}
        </Button>
    </Link>
);

const DeleteButton = ({ onDelete, lang }) => (
    <Button
        type="danger"
        icon={<DeleteOutlined />}
        onClick={onDelete}
        style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
    >
        {lang('eliminar')}
    </Button>
);

const SeguimientosButton = ({ onClick, lang }) => (
    <Button
        type="default"
        icon={<RightOutlined />}
        onClick={onClick}
        style={{ ...buttonStyle, backgroundColor: '#edb100' }}
    >
        {lang('irASeguimientos')}
    </Button>
);

const TestsButton = ({ onClick, lang }) => (
    <Button
        type="default"
        icon={<RightOutlined />}
        onClick={onClick}
        style={{ ...buttonStyle, backgroundColor: '#28a745' }}
    >
        {lang('irATests')}
    </Button>
);

const DetailPaciente = ({ paciente }) => {
    const { t } = useTranslation('home');
    const lang = t;
    const router = useRouter();

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

    const goToSeguimientos = () => {
        router.push(`/pacientes/seguimientos/${paciente.id}`);
    };

    const goToTests = () => {
        router.push(`/pacientes/tests/${paciente.id}`);
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
                            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
                                <EditButton pacienteId={paciente.id} lang={lang} />
                                <DeleteButton onDelete={() => showDeleteConfirm(paciente.id)} lang={lang} />
                                <SeguimientosButton onClick={goToSeguimientos} lang={lang} />
                                <TestsButton onClick={goToTests} lang={lang} />
                            </div>
                        </Col>
                        <Col span={16}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Card title={lang('informacionDelPaciente_personal')}>
                                        <p><strong>{lang('informacionDelPaciente_fechaApertura')}</strong> {paciente.fechaApertura}</p>
                                        {paciente.perteneceAProyecto?<>
                                            <p><strong>{lang('informacionDelPaciente_proyecto')}</strong> {paciente.proyecto}</p>
                                            </>:<></>}
                                        
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

export default DetailPaciente;
