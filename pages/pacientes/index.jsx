/* eslint-disable react-hooks/exhaustive-deps */
import MenuWrapper from '@/components/sidebar';
import { Input, Table, Modal, message, Button, Card, Row, Col, Select, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUserContext } from '@/assets/useUserContext';
import { toIndex } from '@/utils/toindex/toindex';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import FileUploadButton from '@/components/fileUploadButton';
import DownloadTemplateButton from '@/components/downloadTemplateButton';

const fetchPacientes = async (searchVal, sede) => {
    const formData = new FormData();
    formData.append('search', searchVal);
    formData.append('sedeId', sede);
    console.log(formData.get('sede'));
    try {

        const { data } = await axios.post(process.env['BASE_URL'] + 'api/pacientes/buscar', formData).catch((error) => {
            console.log(error);
        });

        return { data };
    } catch (error) {
        console.log(error);
    }
};

export default function IndexPaciente() {
    const [searchVal, setSearchVal] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [origData, setOrigData] = useState([]);
    const [searchIndex, setSearchIndex] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sede, setSede] = useState('');
    const [sedes, setSedes] = useState([]);
    const { t } = useTranslation('home');
    const lang = t;


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
    const { user } = useUserContext();
    console.log(user);

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

    const crawl = (user, allValues) => {
        if (!allValues) allValues = [];
        for (var key in user) {
            if (typeof user[key] === "object") crawl(user[key], allValues);
            else allValues.push(user[key] + " ");
        }
        return allValues;
    };

    const fetchData = async () => {
        console.log(sede);
        const { data: users } = await fetchPacientes(searchVal, sede);
        setOrigData(users);
        setFilteredData(users);
        const searchInd = users.map(user => {
            const allValues = crawl(user);
            return { allValues: allValues.toString() };
        });
        setSearchIndex(searchInd);
        if (users) setLoading(false);
    };

    const onSearch = () => {
        setLoading(true);
        fetchData();
    };

    useEffect(() => {
        const fetchSedes = async () => {
            try {
                const { data: sedesData } = await axios.get(process.env['BASE_URL'] + 'api/sedes/listar').catch((error) => {
                    console.log(error);
                });
                console.log(sedesData);
                setSedes(sedesData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchSedes();
        setLoading(true);
        fetchData();
    }, []);

    return (
        <MenuWrapper setLang={true}>
            <Card>
                <Row style={{ marginTop: '10px' }} justify="space-between">
                    <Col xs={24} md="auto">
                        <h1>{lang('listarPacientes')}</h1>
                    </Col>
                    <Col xs={24} md="auto">
                        <Row gutter={[16, 16]}>
                            <Col>
                                <DownloadTemplateButton />
                            </Col>
                            <Col>
                                <FileUploadButton />
                            </Col>
                            <Col>
                                <Link href='/pacientes/new/'>
                                    <Button type="primary" icon={<i className="bi bi-plus-lg"></i>}>
                                        {lang('nuevo')}
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <Input
                            onChange={e => setSearchVal(e.target.value)}
                            placeholder={lang('buscar')}
                        />
                    </Col>
                    <Col xs={24} sm={12}>
                        <Button onClick={onSearch} type="primary" icon={<i className="bi bi-search"></i>}>
                            {lang('buscar')}
                        </Button>
                    </Col>

                </Row>
                <Row>
                    <Col >
                        <Form.Item label={lang('informacionDelPaciente_sede')}>

                            <Select name="sede" value={sede} onChange={(value) => setSede(value)} style={{ width: '200px' }}>
                                <Select.Option value="">Todos</Select.Option>
                                {sedes.map((sedemap) => (
                                    <Select.Option key={sedemap.id} value={sedemap.id}>{sedemap.nombre}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                </Row>
                <Table
                    dataSource={filteredData}
                    columns={[
                        {
                            title: lang('numeroDeFicha'),
                            dataIndex: 'id',
                            key: 'id',
                        },
                        {
                            title: lang('informacionDelPaciente_nombre'),
                            dataIndex: 'nombresApellidos',
                            key: 'nombresApellidos',
                        },
                        {
                            title: lang('informacionDelPaciente_cedula'),
                            dataIndex: 'cedula',
                            key: 'cedula',
                        },
                        {
                            title: lang('informacionDelPaciente_telefono'),
                            dataIndex: 'telefono',
                            key: 'telefono',
                        },
                        {
                            title: lang('informacionDelPaciente_sede'),
                            dataIndex: 'sede',
                            key: 'sede',
                            render: (text) => (
                                <div>
                                    {text.nombre}
                                </div>
                            ),
                        },
                        {
                            title: lang('acciones'),
                            key: 'actions',
                            dataIndex: 'id',
                            render: (text) => (
                                <div>
                                    <Link href={`/pacientes/${text}`}>
                                        <Button type="info" icon={<i className="bi bi-person-badge-fill"></i>} style={{ marginRight: 5, color: "#fff", backgroundColor: "#17a2b8" }}>
                                            {lang('masInformacion')}
                                        </Button>
                                    </Link>
                                    <Link href={`/pacientes/edit/${text}`}>
                                        <Button type="success" icon={<i className="bi bi-pencil-square"></i>} style={{ marginRight: 5, color: "#fff", backgroundColor: "#28a745" }}>
                                            {lang('modificar')}
                                        </Button>
                                    </Link>
                                    <Button onClick={() => showDeleteConfirm(text)} type="danger" icon={<i className="bi bi-trash"></i>} style={{ marginRight: 5, color: "#fff", backgroundColor: "#dc3545" }}>
                                        {lang('eliminar')}
                                    </Button>
                                </div>
                            ),
                        },
                    ]}
                    loading={loading}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], showQuickJumper: true }}
                />
            </Card>
        </MenuWrapper>
    );
}
