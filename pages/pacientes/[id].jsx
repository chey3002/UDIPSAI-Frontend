/* eslint-disable @next/next/no-img-element */
import MenuWrapper from '@/components/sidebar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Card, Row, Col, Modal, message, Upload, Image } from 'antd';
import { EditOutlined, DeleteOutlined, RightOutlined, UploadOutlined } from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';
import BreadCrumbPacientes from '@/components/commons/breadCrumPaciente';
import { documentoDelete, documentoGet, pacienteById, pacienteFichaCompromisoDelete, pacienteFichaDiagnosticaDelete, pacientesActualizar, pacientesEliminar, pacientesFichaCompromiso, pacientesFichaDiagnostica, reporteGeneralPDF } from '@/utils/apiRequests';
import { DownCircleOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useUserContext } from '@/assets/useUserContext';

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

const DetailPaciente = ({ paciente }) => {
    const { t } = useTranslation('home');
    const lang = t;
    const [uploading, setUploading] = useState(false);
    const { user } = useUserContext();


    if (paciente === null) {
        return (
            <MenuWrapper setLang={true}>
                <Card>
                    <Card.Meta title={<h1>{lang('detallePaciente')}</h1>} />
                    <div>
                        <h3>{lang('noSeEncontroPaciente')}</h3>
                    </div>
                </Card>
            </MenuWrapper>
        );
    }

    const handleDelete = async (id) => {
        try {
            await pacientesEliminar(id, message);
            message.success(lang('pacienteEliminado'));
            window.location.href = '/pacientes';
        } catch (error) {
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

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);
            const resp = await pacientesFichaDiagnostica(paciente.id, formData, message);
            paciente.fichaDiagnostica = {
                id: resp.data.split(' ')[5],
            };
            window.location.reload();
        } catch (error) {
            message.error(lang('errorSubirArchivo'));
        } finally {
            setUploading(false);
        }
    };
    const handleUploadFichaCompromiso = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);
            const resp = await pacientesFichaCompromiso(paciente.id, formData, message);
            paciente.fichaCompromiso = {
                id: resp.data.split(' ')[5],
            };
            window.location.reload();
        } catch (error) {
            message.error(lang('errorSubirArchivo'));
        } finally {
            setUploading(false);
        }
    };
    const openDocument = async (documentoId) => {
        try {
            const response = await documentoGet(documentoId, message);
            if (!response) {
                message.error(lang('errorAbrirDocumento'));
                return;
            }
            const { contenido } = response.data;
            const blob = new Blob([Uint8Array.from(atob(contenido), c => c.charCodeAt(0))], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (error) {
            message.error(lang('errorAbrirDocumento'));
        }
    };


    const downloadDocument = async (documentoId) => {
        try {
            const response = await documentoGet(documentoId, message);
            if (!response) {
                message.error(lang('errorDescargarDocumento'));
                return;
            }
            const { contenido } = response.data;
            const blob = new Blob([Uint8Array.from(atob(contenido), c => c.charCodeAt(0))], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${paciente.id}-${paciente.nombresApellidos}-${paciente.cedula}.pdf`;
            a.click();
        } catch (error) {
            message.error(lang('errorDescargarDocumento'));
        }
    };

    const handleDeleteDocument = async () => {
        try {
            await pacienteFichaDiagnosticaDelete(paciente.id, message);
            message.success(lang('documentoEliminado'));
            window.location.reload();
        } catch (error) {
            message.error(lang('errorEliminarDocumento'));
        }
    };
    const handleDeleteFichaCompromiso = async () => {
        try {
            await pacienteFichaCompromisoDelete(paciente.id, message);
            message.success(lang('documentoEliminado'));
            window.location.reload();
        } catch (error) {
            message.error(lang('errorEliminarDocumento'));
        }
    };
    const showDeleteDocumentConfirm = () => {
        Modal.confirm({
            title: lang('confirmarEliminacionDocumento'),
            content: lang('seguroEliminarDocumento'),
            okText: lang('si'),
            okType: 'danger',
            cancelText: lang('no'),
            onOk() {
                handleDeleteDocument();
            },
        });
    };
    const showDeleteFichaCompromisoConfirm = () => {
        Modal.confirm({
            title: lang('confirmarEliminacionDocumento'),
            content: lang('seguroEliminarDocumento'),
            okText: lang('si'),
            okType: 'danger',
            cancelText: lang('no'),
            onOk() {
                handleDeleteFichaCompromiso();
            },
        });
    };
    const uploadProps = {
        name: 'file',
        accept: 'application/pdf',
        customRequest: ({ file }) => handleUpload(file),
        showUploadList: false,
    };
    const uploadPropsFichaCompromiso = {
        name: 'file',
        accept: 'application/pdf',
        customRequest: ({ file }) => handleUploadFichaCompromiso(file),
        showUploadList: false,
    };
    const handleReactivar = async () => {
        try {
            const formState = {
                ...paciente,
                institucionEducativa: paciente.institucionEducativa?.id,
                sede: paciente.sede?.id,
                pacienteEstado: 1,
                jornada: paciente.jornada?.id,
            }
            delete formState.id;
            await pacientesActualizar(paciente.id, formState, message);
            message.success(lang('pacienteReactivado'));
        } catch (error) {
            console.error(error);
        }

    }
    const handleDownload = async () => {
        try {
            const response = await reporteGeneralPDF(paciente.id, message);

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;

            a.download = `ficha_medica_${fichaData.paciente.nombresApellidos}_${fichaData.paciente.cedula}_${fichaData.id}.pdf`; // Nombre del archivo para descargar
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url); // Limpia la URL después de usarla

        } catch (error) {
            console.error('Error al descargar el PDF:', error);
        }
    };

    const handleOpenPDF = async () => {
        try {
            const response = await reporteGeneralPDF(paciente.id, message);


            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);

            // Abrir en una nueva pestaña o ventana
            window.open(fileURL, '_blank');

            // Limpiar el objeto URL después de abrirlo
            URL.revokeObjectURL(fileURL);
        } catch (error) {
            message.error('Error al abrir el PDF:' + error);
        }
    };
    return (
        <MenuWrapper setLang={true}>
            <BreadCrumbPacientes idPaciente={paciente.id} page={lang('VerPaciente')} />

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
                            <h1 style={{ fontSize: '24px', color: '#003a8c' }}>{lang('informacionDelPaciente_title')} {paciente.id}</h1>
                            <Row>
                                <Col>
                                    <Button onClick={handleDownload} style={{ color: "#fff", backgroundColor: "#28a745" }}>
                                        <DownCircleOutlined />
                                        {lang('DescargarReporteGeneral')}
                                    </Button>
                                </Col>
                                <Col>
                                    <Button onClick={handleOpenPDF} style={{ color: "#fff", backgroundColor: "#17a2b8" }}>
                                        <FilePdfOutlined />
                                        {lang('AbrirReporteGeneral')}
                                    </Button>
                                </Col>
                                {user?.permisos["pacientes"] && (
                                    <>
                                        {!paciente.pacienteEstado ?
                                            <Col>
                                                <Button type="primary" onClick={handleReactivar} style={{ backgroundColor: '#52c41a', color: '#fff', border: 'none' }}>
                                                    {lang('reactivar')}
                                                </Button></Col>
                                            :
                                            <Col>
                                                <DeleteButton onDelete={() => showDeleteConfirm(paciente.id)} lang={lang} />
                                            </Col>
                                        }
                                    </>
                                )}

                            </Row>
                        </div>
                    }
                />

                <Row gutter={16} style={{ marginBottom: '20px' }}>
                    <Col span={24} md={12} style={{ textAlign: 'center' }}>
                        <Image
                            src={paciente.imagen ? `data:image/jpeg;base64, ${paciente.imagen}` : 'https://www.shareicon.net/data/128x128/2016/06/25/786525_people_512x512.png'}
                            style={{
                                objectFit: 'cover',
                                borderRadius: '12px',
                                border: '3px solid #0044ff',
                                width: '100%',
                                maxWidth: '250px',
                            }}
                            preview={false}
                            width={250}
                            alt="avatar"
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <h3 style={{ color: '#003a8c' }}>{lang('informacionDelPaciente_personal')}</h3>
                        <p><strong>{lang('informacionDelPaciente_fechaApertura')}:</strong> {paciente.fechaApertura}</p>
                        {paciente.perteneceAProyecto && <p><strong>{lang('informacionDelPaciente_proyecto')}:</strong> {paciente.proyecto}</p>}
                        <p><strong>{lang('informacionDelPaciente_nombre')}:</strong> {paciente.nombresApellidos}</p>
                        <p><strong>{lang('informacionDelPaciente_ciudad')}:</strong> {paciente.ciudad}</p>
                        <p><strong>{lang('informacionDelPaciente_fechaNacimiento')}:</strong> {paciente.fechaNacimiento}</p>
                        <p><strong>{lang('informacionDelPaciente_edad')}:</strong> {paciente.edad}</p>
                        <p><strong>{lang('informacionDelPaciente_cedula')}:</strong> {paciente.cedula}</p>
                        <p><strong>{lang('informacionDelPaciente_domicilio')}:</strong> {paciente.domicilio}</p>
                        <p><strong>{lang('informacionDelPaciente_telefono')}:</strong> {paciente.telefono}</p>
                        <p><strong>{lang('informacionDelPaciente_celular')}:</strong> {paciente.celular}</p>
                        <p><strong>{lang('informacionDelPaciente_sede')}:</strong> {paciente.sede?.nombre}</p>
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: '20px' }}>
                    <Col span={24} md={12}>
                        <h3 style={{ color: '#003a8c', marginTop: '20px' }}>{lang('informacionDelPaciente_title_educativa')}</h3>
                        <p><strong>{lang('informacionDelPaciente_anioEducacion')}:</strong> {paciente.anioEducacion}</p>
                        <p><strong>{lang('informacionDelPaciente_direccionInstitucion')}:</strong> {paciente.institucionEducativa?.direccion}</p>
                        <p><strong>{lang('informacionDelPaciente_paralelo')}:</strong> {paciente.paralelo}</p>
                        <p><strong>{lang('informacionDelPaciente_perteneceInclusion')}:</strong> {paciente.perteneceInclusion}</p>
                        <p><strong>{lang('informacionDelPaciente_presentaDiscapacidad')}:</strong> {paciente.tieneDiscapacidad}</p>
                        {paciente.tieneDiscapacidad === 'si' && (
                            <>
                                <p><strong>{lang('informacionDelPaciente_portadorCarnet')}:</strong> {paciente.portadorCarnet ? 'Sí' : 'No'}</p>
                                {paciente.portadorCarnet && (
                                    <>
                                        <p><strong>{lang('informacionDelPaciente_tipoDiscapacidad')}:</strong> {paciente.tipoDiscapacidad}</p>
                                        <p><strong>{lang('informacionDelPaciente_porcentajeDiscapacidad')}:</strong> {paciente.porcentajeDiscapacidad}</p>
                                        <p><strong>{lang('informacionDelPaciente_detalleDiscapacidad')}:</strong> {paciente.detalleDiscapacidad}</p>
                                    </>
                                )}
                            </>
                        )}
                    </Col>
                    <Col span={24} md={12}>
                        <h3 style={{ color: '#003a8c', marginTop: '20px' }}>{lang('informacionDelPaciente_motivoConsulta')}</h3>
                        <p><strong>{lang('informacionDelPaciente_motivoConsulta')}:</strong> {paciente.motivoConsulta}</p>
                        <p><strong>{lang('informacionDelPaciente_observaciones')}:</strong> {paciente.observaciones}</p>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} md={24}>
                        <h3 style={{ color: '#003a8c', marginTop: '20px' }}>{lang('fichaDiagnostica')}</h3>

                        <p>{lang('descripcionFichaDiagnostica')}</p>
                        <div>
                            {!paciente.fichaDiagnostica && <Upload {...uploadProps}>
                                <Button
                                    icon={<UploadOutlined />}
                                    loading={uploading}
                                    disabled={uploading}
                                    style={{ backgroundColor: '#40a9ff', color: '#fff', border: 'none' }}
                                >
                                    {lang('Subir_Archivo')}
                                </Button>
                            </Upload>}
                            {paciente.fichaDiagnostica && (
                                <div style={{ marginTop: '20px' }}>
                                    <Button
                                        type="link"
                                        onClick={() => openDocument(paciente.fichaDiagnostica.id)}
                                        style={{ color: '#17a2b8', border: 'none' }}
                                    >
                                        {lang('abrir')}
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => downloadDocument(paciente.fichaDiagnostica.id)}
                                        style={{ marginLeft: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}
                                    >
                                        {lang('descargar')}
                                    </Button>
                                    <DeleteButton onDelete={showDeleteDocumentConfirm} lang={lang} />
                                </div>

                            )}
                        </div></Col>
                    <Col span={24} md={24}>
                        <h3 style={{ color: '#003a8c', marginTop: '20px' }}>{lang('fichaCompromiso')}</h3>

                        <p>{lang('descripcionFichaCompromiso')}</p>
                        <div>
                            {!paciente.fichaCompromiso && <Upload {...uploadPropsFichaCompromiso}>
                                <Button
                                    icon={<UploadOutlined />}
                                    loading={uploading}
                                    disabled={uploading}
                                    style={{ backgroundColor: '#40a9ff', color: '#fff', border: 'none' }}
                                >
                                    {lang('Subir_Archivo')}
                                </Button>
                            </Upload>}
                            {paciente.fichaCompromiso && (
                                <div style={{ marginTop: '20px' }}>
                                    <Button
                                        type="link"
                                        onClick={() => openDocument(paciente.fichaCompromiso.id)}
                                        style={{ color: '#17a2b8', border: 'none' }}
                                    >
                                        {lang('abrir')}
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => downloadDocument(paciente.fichaCompromiso.id)}
                                        style={{ marginLeft: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}
                                    >
                                        {lang('descargar')}
                                    </Button>
                                    <DeleteButton onDelete={showDeleteFichaCompromisoConfirm} lang={lang} />
                                </div>

                            )}
                        </div></Col>

                </Row>




            </Card>
        </MenuWrapper>
    );
};

export const getServerSideProps = async (context) => {
    const res = await pacienteById(context.query.id);
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
