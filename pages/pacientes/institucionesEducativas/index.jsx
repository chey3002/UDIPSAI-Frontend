import MenuWrapper from '@/components/sidebar';
import { Input, Table, Modal, message, Button, Card, Row, Col, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

const { TextArea } = Input;
const { Option } = Select;

const fetchInstituciones = async () => {
    try {
        const { data } = await axios.get(`${process.env['BASE_URL']}api/instituciones/listar`);
        return { data };
    } catch (error) {
        console.log(error);
        return { data: [] };
    }
};

const fetchInstitucion = async (id) => {
    try {
        const { data } = await axios.get(`${process.env['BASE_URL']}api/instituciones/listar/${id}`);
        return { data };
    } catch (error) {
        console.log(error);
        return { data: null };
    }
};

export const getServerSideProps = async (context) => {
    const institucionData = await fetchInstituciones();

    return {
        props: {
            instituciones: institucionData.data,
        },
    };
};

export default function IndexInstituciones({ instituciones }) {
    const [institucionesState, setInstituciones] = useState(instituciones);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentInstitucion, setCurrentInstitucion] = useState(null);
    const { t } = useTranslation('home');
    const [form] = Form.useForm();
    const lang = t;

    const fetchData = async () => {
        setLoading(true);
        const { data: institucionesData } = await fetchInstituciones();
        setInstituciones(institucionesData);
        setLoading(false);
    };

    const showModal = (institucion = null) => {
        setCurrentInstitucion(institucion);
        setIsModalVisible(true);
        if (institucion) {
            form.setFieldsValue({
                ...institucion,
                nombreInstitucion: institucion.nombreInstitucion,
                direccion: institucion.direccion,
                tipoInstitucion: institucion.tipoInstitucion,
                institucionEstado: institucion.institucionEstado,
            });
        } else {
            form.resetFields();
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            values.institucionEstado = 1;
            if (currentInstitucion) {
                await axios.put(`${process.env['BASE_URL']}api/instituciones/actualizar/${currentInstitucion.id}`, values);
                message.success(lang('institucionActualizada'));
            } else {
                await axios.post(`${process.env['BASE_URL']}api/instituciones/insertar`, values);
                message.success(lang('institucionCreada'));
            }
            setIsModalVisible(false);
            fetchData();
        } catch (error) {
            message.error(lang('errorGuardarInstitucion'));
            console.error(error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env['BASE_URL']}api/instituciones/eliminar/${id}`);
            message.success(lang('institucionEliminada'));
            fetchData();
        } catch (error) {
            message.error(lang('errorEliminarInstitucion'));
            console.error(error);
        }
    };

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            title: lang('confirmarEliminacion'),
            content: lang('seguroEliminarInstitucion'),
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
            title: lang('nombreInstitucion'),
            dataIndex: 'nombreInstitucion',
            key: 'nombreInstitucion',
        },
        {
            title: lang('direccion'),
            dataIndex: 'direccion',
            key: 'direccion',
        },
        {
            title: lang('tipoInstitucion'),
            dataIndex: 'tipoInstitucion',
            key: 'tipoInstitucion',
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
                        <h1>{lang('listarInstituciones')}</h1>
                    </Col>
                    <Col>
                        <Button type="primary" icon={<i className="bi bi-plus-lg"></i>} onClick={() => showModal()}>
                            {lang('nuevo')}
                        </Button>
                    </Col>
                </Row>
                <Table
                    dataSource={institucionesState}
                    columns={columns}
                    loading={loading}
                    rowKey="id"
                />
            </Card>
            <Modal title={currentInstitucion ? lang('editarInstitucion') : lang('nuevaInstitucion')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="nombreInstitucion" label={lang('nombreInstitucion')} rules={[{ required: true, message: lang('nombreInstitucionRequerido') }]}>
                        <TextArea rows={1} />
                    </Form.Item>
                    <Form.Item name="direccion" label={lang('direccion')} rules={[{ required: true, message: lang('direccionRequerida') }]}>
                        <TextArea rows={1} />
                    </Form.Item>
                    <Form.Item name="tipoInstitucion" label={lang('tipoInstitucion')} rules={[{ required: true, message: lang('tipoInstitucionRequerido') }]}>
                        <Select placeholder={lang('seleccionarTipoInstitucion')}>
                            <Option value="Fiscal">{lang('fiscal')}</Option>
                            <Option value="Fiscomisional">{lang('fiscomisional')}</Option>
                            <Option value="Privada">{lang('privada')}</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </MenuWrapper>
    );
}
