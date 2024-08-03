import MenuWrapper from '@/components/sidebar';
import { Input, Table, Modal, message, Button, Card, Row, Col, Form, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useTableSearch } from '@/utils/useTableSearch';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const fetchInstituciones = async () => {
    try {
        const { data } = await axios.get(`${process.env['BASE_URL']}api/instituciones/listar`);
        return { data };
    } catch (error) {
        console.log(error);
        return { data: [] };
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
    const [searchVal, setSearchVal] = useState('');
    const { t } = useTranslation('home');
    const [form] = Form.useForm();

    const { filteredData, loading: searchLoading } = useTableSearch({
        searchVal,
        retrieve: fetchInstituciones,
        data: institucionesState,
    });

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
                    <Button key={"1"} onClick={() => showModal(record)} icon={<i className="bi bi-pencil-square"></i>} style={{ marginRight: 5, color: "#fff", backgroundColor: "#28a745" }}>
                        {lang('editar')}
                    </Button>
                    <Button key={"2"} onClick={() => showDeleteConfirm(record.id)} icon={<i className="bi bi-trash"></i>} style={{ marginRight: 5, color: "#fff", backgroundColor: "#dc3545" }}>
                        {lang('eliminar')}
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <MenuWrapper setLang={true}>
            <Card style={{ margin: '20px', padding: '20px', backgroundColor: '#fafafa', borderColor: '#d9d9d9' }}>
                <Row style={{ marginBottom: '20px' }} justify="space-between" align="middle">
                    <Col>
                        <Title level={2}>{lang('listarInstituciones')}</Title>
                    </Col>
                    <Col>
                        <Button type="primary" icon={<i className="bi bi-plus-lg"></i>} onClick={() => showModal()}>
                            {lang('nuevo')}
                        </Button>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                    <Col xs={24} sm={12}>
                        <Input
                            onChange={e => setSearchVal(e.target.value)}
                            placeholder={lang('buscar')}
                            size="large"
                        />
                    </Col>
                </Row>
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    loading={loading || searchLoading}
                    rowKey="id"
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], showQuickJumper: true }}
                    bordered
                    style={{ backgroundColor: '#fff', borderColor: '#d9d9d9' }}
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
