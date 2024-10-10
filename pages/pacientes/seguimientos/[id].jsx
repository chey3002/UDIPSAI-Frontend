import MenuWrapper from '@/components/sidebar';
import { Input, Table, Modal, message, Button, Card, Row, Col, Form, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/assets/useUserContext';
import useTranslation from 'next-translate/useTranslation';
import BreadCrumbPacientes from '@/components/commons/breadCrumPaciente';
import { render } from '@testing-library/react';
import { EditOutlined, DeleteOutlined, RightOutlined, UploadOutlined } from '@ant-design/icons';
import { documentoGet, pacienteById, seguimientosActualizar, seguimientosCrear, seguimientosDelete, seguimientosDeleteFile, seguimientosPacienteListar, seguimientosUploadFile } from '@/utils/apiRequests';

const { TextArea } = Input;
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
const fetchSeguimientos = async (id) => {
    try {
        const { data } = await seguimientosPacienteListar(id);
        return { data };
    } catch (error) {
        //console.log(error);
        return { data: [] };
    }
};

const fetchPaciente = async (id) => {
    try {
        const { data } = await pacienteById(id);
        return { data };
    } catch (error) {
        //console.log(error);
        return { data: null };
    }
};

export const getServerSideProps = async (context) => {
    const { id } = context.params;
    const pacienteData = await fetchPaciente(id);
    const seguimientosData = await fetchSeguimientos(id);

    if (!pacienteData.data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            paciente: pacienteData.data,
            seguimientos: seguimientosData.data,
        },
    };
};

export default function IndexSeguimientos({ paciente, seguimientos }) {
    //console.log(seguimientos);

    const [seguimientosState, setSeguimientos] = useState(seguimientos);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentSeguimiento, setCurrentSeguimiento] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const { t } = useTranslation('home');
    const { user } = useUserContext();
    const [form] = Form.useForm();
    const [uploading, setUploading] = useState(false);

    const lang = t;

    useEffect(() => {
        setIsClient(true);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const { data: seguimientosData } = await fetchSeguimientos(paciente.id);
        setSeguimientos(seguimientosData);
        setLoading(false);
    };

    const showModal = (seguimiento = null) => {
        setCurrentSeguimiento(seguimiento);
        setIsModalVisible(true);
        if (seguimiento) {
            form.setFieldsValue({
                ...seguimiento,
                observacion: seguimiento.observacion,
            });
        } else {
            form.resetFields();
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const fechaActual = new Date().toISOString().split('T')[0];
            values.paciente = { id: paciente.id };
            values.fecha = fechaActual;
            values.estado = '1'
            values.especialista = { cedula: user.cedula };
            if (currentSeguimiento) {
                await seguimientosActualizar(currentSeguimiento.id, values, message);
                message.success(lang('seguimientoActualizado'));
            } else {
                await seguimientosCrear(values, message);
                message.success(lang('seguimientoCreado'));
            }
            setIsModalVisible(false);
            fetchData();
        } catch (error) {
            message.error(lang('errorGuardarSeguimiento'));
            console.error(error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async (id) => {
        try {
            await seguimientosDelete(id, message);
            message.success(lang('seguimientoEliminado'));
            fetchData();
        } catch (error) {
            message.error(lang('errorEliminarSeguimiento'));
            console.error(error);
        }
    };

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            title: lang('confirmarEliminacion'),
            content: lang('seguroEliminarSeguimiento'),
            okText: lang('si'),
            okType: 'danger',
            cancelText: lang('no'),
            onOk() {
                handleDelete(id);
            },
        });
    };
    const uploadProps = {
        name: 'file',
        accept: 'application/pdf',
        showUploadList: false,
    };
    const handleUpload = async (file, idSeguimiento) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);
            const resp = await seguimientosUploadFile(idSeguimiento, formData, message);
            message.success(lang('archivoSubido'));
            paciente.fichaDiagnostica = {
                id: resp.data.split(' ')[5],
            };
            fetchData();
        } catch (error) {
            message.error(lang('errorSubirArchivo'));
        } finally {
            setUploading(false);
        }
    };
    const openDocument = async (documentoId) => {
        try {
            const response = await documentoGet(documentoId, message);
            //console.log(response);
            if (!response) {
                //console.log('error');

                message.error(lang('errorAbrirDocumento'));
                return;
            }
            const contenido = response.data;
            //console.log(contenido);
            const binaryString = atob(contenido); // 'contenido' es la cadena base64
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (error) {
            message.error(lang('errorAbrirDocumento ' + error));
        }
    };


    const downloadDocument = async (documentoId) => {
        try {
            const response = await documentoGet(documentoId, message);
            if (!response) {
                message.error(lang('errorAbrirDocumento'));
                return;
            } const contenido = response.data;
            const binaryString = atob(contenido); // 'contenido' es la cadena base64
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${paciente.id}-${paciente.nombresApellidos}-${paciente.cedula}.pdf`;
            a.click();
        } catch (error) {
            message.error(lang('errorDescargarDocumento'));
        }
    };
    const handleDeleteDocument = async (id) => {
        try {
            await seguimientosDeleteFile(id, message);
            message.success(lang('documentoEliminado'));
            window.location.reload();
        } catch (error) {
            message.error(lang('errorEliminarDocumento'));
        }
    };
    const showDeleteDocumentConfirm = (id) => {
        Modal.confirm({
            title: lang('confirmarEliminacionDocumento'),
            content: lang('seguroEliminarDocumento'),
            okText: lang('si'),
            okType: 'danger',
            cancelText: lang('no'),
            onOk() {
                handleDeleteDocument(id);
            },
        });
    };
    const columns = [
        {
            title: lang('fecha'),
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: lang('observacion'),
            dataIndex: 'observacion',
            key: 'observacion',
        },
        {
            title: lang('cedulaEspecialista'),
            dataIndex: ['especialista', 'cedula'],
            key: 'cedulaEspecialista',
        },
        {
            title: lang('nombreEspecialista'),
            key: 'nombreEspecialista',
            render: (text, record) => (
                `${record.especialista.primerNombre} ${record.especialista.primerApellido}`
            ),
        },
        {
            title: lang('documento'),
            dataIndex: 'documento',
            key: 'documento',
            render: (text, record) => {
                //console.log(text)
                return < div >
                    {!text && <Upload {...uploadProps}
                        customRequest={({ file }) => handleUpload(file, record.id)}
                    >
                        <Button
                            icon={<UploadOutlined />}
                            loading={uploading}
                            disabled={uploading}
                            style={{ backgroundColor: '#40a9ff', color: '#fff', border: 'none' }}
                        >
                            {lang('Subir_Archivo')}
                        </Button>
                    </Upload>}
                    {text && (
                        <div style={{ marginTop: '20px' }}>
                            <Button
                                type="link"
                                onClick={() => openDocument(text.id)}
                                style={{ color: '#17a2b8', border: 'none' }}
                            >
                                {lang('abrir')}
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => downloadDocument(text.id)}
                                style={{ marginLeft: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}
                            >
                                {lang('descargar')}
                            </Button>
                            <DeleteButton onDelete={() => showDeleteDocumentConfirm(record.id)} lang={lang} />
                        </div>

                    )}
                </div >
            }

        },
        {
            title: lang('acciones'),
            key: 'actions',
            render: (text, record) => (
                isClient && record.especialista.cedula === user?.cedula && (
                    <div>
                        <Button onClick={() => showModal(record)} icon={<i className="bi bi-pencil-square"></i>} style={{ marginRight: 5, color: "#fff", backgroundColor: "#28a745" }}>
                            {lang('editar')}
                        </Button>
                        <Button onClick={() => showDeleteConfirm(record.id)} icon={<i className="bi bi-trash"></i>} style={{ marginRight: 5, color: "#fff", backgroundColor: "#dc3545" }}>
                            {lang('eliminar')}
                        </Button>
                    </div>
                )
            ),
        },
    ];

    return (
        <MenuWrapper setLang={true}>
            <BreadCrumbPacientes idPaciente={paciente.id} page={lang('SeguimientosPacientes')} />

            <Card>
                <Row style={{ marginTop: '10px' }} justify="space-between">
                    <Col>
                        <h1>{lang('listarSeguimientos')}</h1>
                    </Col>
                    <Col>
                        <Button type="primary" icon={<i className="bi bi-plus-lg"></i>} onClick={() => showModal()}>
                            {lang('nuevoSeguimiento')}
                        </Button>
                    </Col>
                </Row>
                <Table
                    dataSource={seguimientosState}
                    columns={columns}
                    loading={loading}
                    rowKey="id"
                />
            </Card>
            <Modal title={currentSeguimiento ? lang('editarSeguimiento') : lang('nuevoSeguimiento')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="observacion" label={lang('observacion')} rules={[{ required: true, message: lang('observacionRequerida') }]}>
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </MenuWrapper>
    );
}
