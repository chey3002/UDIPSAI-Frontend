import MenuWrapper from '@/components/sidebar';
import { Input, Table, Modal, message, Button, Card, Row, Col, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/assets/useUserContext';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import BreadCrumbPacientes from '@/components/commons/breadCrumPaciente';

const { TextArea } = Input;

const fetchSeguimientos = async (id) => {
    try {
        const { data } = await axios.get(`${process.env['BASE_URL']}api/seguimientos/paciente/${id}`);
        return { data };
    } catch (error) {
        console.log(error);
        return { data: [] };
    }
};

const fetchPaciente = async (id) => {
    try {
        const { data } = await axios.get(`${process.env['BASE_URL']}api/pacientes/listar/${id}`);
        return { data };
    } catch (error) {
        console.log(error);
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
    const [seguimientosState, setSeguimientos] = useState(seguimientos);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentSeguimiento, setCurrentSeguimiento] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const { t } = useTranslation('home');
    const { user } = useUserContext();
    const [form] = Form.useForm();
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
                await axios.put(`${process.env['BASE_URL']}api/seguimientos/${currentSeguimiento.id}`, values);
                message.success(lang('seguimientoActualizado'));
            } else {
                await axios.post(`${process.env['BASE_URL']}api/seguimientos`, values);
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
            await axios.delete(`${process.env['BASE_URL']}api/seguimientos/${id}`);
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
