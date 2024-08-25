import MenuWrapper from '@/components/sidebar';
import { Input, Table, Modal, message, Button, Card, Row, Col, Form } from 'antd';
import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { sedesActualizar, sedesCrear, sedesEliminar, sedesListar } from '@/utils/apiRequests';

const { TextArea } = Input;

const fetchSedes = async () => {
    try {
        const { data } = await sedesListar(message);
        return { data };
    } catch (error) {
        console.log(error);
        return { data: [] };
    }
};

export const getServerSideProps = async (context) => {
    const sedeData = await fetchSedes();

    return {
        props: {
            sedes: sedeData.data,
        },
    };
};

export default function IndexSedes({ sedes }) {
    const [sedesState, setSedes] = useState(sedes);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentSede, setCurrentSede] = useState(null);
    const { t } = useTranslation('home');
    const [form] = Form.useForm();
    const lang = t;

    const fetchData = async () => {
        setLoading(true);
        const { data: sedesData } = await fetchSedes();
        setSedes(sedesData);
        setLoading(false);
    };

    const showModal = (sede = null) => {
        setCurrentSede(sede);
        setIsModalVisible(true);
        if (sede) {
            form.setFieldsValue({
                ...sede,
                nombre: sede.nombre,
            });
        } else {
            form.resetFields();
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            values.estado = 1;
            if (currentSede) {
                await sedesActualizar(currentSede.id, values, message);
                message.success(lang('sedeActualizada'));
            } else {
                await sedesCrear(values, message);
                message.success(lang('sedeCreada'));
            }
            setIsModalVisible(false);
            fetchData();
        } catch (error) {
            message.error(lang('errorGuardarSede'));
            console.error(error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async (id) => {
        try {
            await sedesEliminar(id, message);
            message.success(lang('sedeEliminada'));
            fetchData();
        } catch (error) {
            message.error(lang('errorEliminarSede'));
            console.error(error);
        }
    };

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            title: lang('confirmarEliminacion'),
            content: lang('seguroEliminarSede'),
            okText: lang('Si'),
            okType: 'danger',
            cancelText: lang('No'),
            onOk() {
                handleDelete(id);
            },
        });
    };

    const columns = [
        {
            title: lang('nombre'),
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: lang('estado'),
            dataIndex: 'estado',
            key: 'estado',
            render: (text, record) => (record.estado === 1 ? 'Activo' : 'Inactivo'),
        },
        {
            title: lang('acciones'),
            key: 'actions',
            render: (text, record) => (
                <div>
                    <Button onClick={() => showModal(record)} icon={<i className="bi bi-pencil-square"></i>} style={{ marginRight: 5, color: "#fff", backgroundColor: "#28a745" }}>
                        {lang('editar')}
                    </Button>
                    <Button onClick={() => showDeleteConfirm(record.id)} icon={<i className="bi bi-trash"></i>} style={{ marginRight: 5, color: "#fff", backgroundColor: "#dc3545" }}>
                        {lang('eliminar')}
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <MenuWrapper setLang={true}>
            <Card>
                <Row style={{ marginTop: '10px' }} justify="space-between">
                    <Col>
                        <h1>{lang('listarSedes')}</h1>
                    </Col>
                    <Col>
                        <Button type="primary" icon={<i className="bi bi-plus-lg"></i>} onClick={() => showModal()}>
                            {lang('nuevaSede')}
                        </Button>
                    </Col>
                </Row>
                <Table
                    dataSource={sedesState}
                    columns={columns}
                    loading={loading}
                    rowKey="id"
                />
            </Card>
            <Modal title={currentSede ? lang('editarSede') : lang('nuevaSede')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="nombre" label={lang('nombre')} rules={[{ required: true, message: lang('nombreRequerido') }]}>
                        <TextArea rows={1} />
                    </Form.Item>
                </Form>
            </Modal>
        </MenuWrapper>
    );
}
