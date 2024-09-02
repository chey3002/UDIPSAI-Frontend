import MenuWrapper from '@/components/sidebar';
import { Input, Table, Modal, message, Button, Card, Row, Col, Typography, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useTableSearch } from '@/utils/useTableSearch';
import { useUserContext } from '@/assets/useUserContext';
import { especialistasActivos, especialistasDelete } from '@/utils/apiRequests';

const { Title } = Typography;

const fetchEspecialistas = async (searchVal) => {
    try {
        const formData = new FormData();
        formData.append('search', searchVal);

        const { data } = await especialistasActivos(message);

        return { data };
    } catch (error) {
        console.log(error);
    }
};

export default function IndexEspecialistas() {
    const [searchVal, setSearchVal] = useState('');
    const [origData, setOrigData] = useState([]);
    const [searchIndex, setSearchIndex] = useState([]);
    const [estadoFilter, setEstadoFilter] = useState('todos'); // Estado para el filtro de especialistas
    const { t } = useTranslation('home');
    const { user } = useUserContext();

    const lang = t;

    const handleDelete = async (id) => {
        try {
            await especialistasDelete(id, message);
            message.success(lang('especialistaEliminado'));
            window.location.href = '/registro';
        } catch (error) {
            message.error(lang('errorEliminarEspecialista'));
            console.error(error);
        }
    };

    const { filteredData, loading } = useTableSearch({
        searchVal,
        retrieve: fetchEspecialistas
    });

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            title: lang('confirmarEliminacion'),
            content: lang('seguroEliminarEspecialista'),
            okText: lang('Si'),
            okType: 'danger',
            cancelText: lang('No'),
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

    const filterDataByEstado = (data) => {
        if (estadoFilter === 'todos') return data; // Mostrar todos si el filtro es "todos"
        const isActive = estadoFilter === 'true'; // Convertir a booleano
        return data.filter(item => item.especialistaEstado === isActive);
    };

    const fetchData = async () => {
        const { data: users } = await fetchEspecialistas(searchVal);
        setOrigData(users);
        const searchInd = users.map(user => {
            const allValues = crawl(user);
            return { allValues: allValues.toString() };
        });
        setSearchIndex(searchInd);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MenuWrapper setLang={true}>
            <Card style={{ margin: '20px', padding: '20px', backgroundColor: '#fafafa', borderColor: '#d9d9d9' }}>
                <Row style={{ marginBottom: '20px' }} justify="space-between" align="middle">
                    <Col>
                        <Title level={2}>{lang('listarEspecialistas')}</Title>
                    </Col>
                    <Col>
                        <Link href='/registro/new/'>
                            {user?.permisos["pacientes"] ? (
                                <Button type="primary" icon={<i className="bi bi-plus-lg"></i>}>
                                    {lang('nuevo')}
                                </Button>
                            ) : null}
                        </Link>
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
                    <Col xs={24} sm={12}>
                        <Select
                            placeholder={lang('filtrarPorEstado')}
                            onChange={value => setEstadoFilter(value)}
                            value={estadoFilter}
                            allowClear={false}
                            size="large"
                            style={{ width: '100%' }}
                        >
                            <Select.Option value="todos">{lang('todos')}</Select.Option>
                            <Select.Option value="true">{lang('activo')}</Select.Option>
                            <Select.Option value="false">{lang('inactivo')}</Select.Option>
                        </Select>
                    </Col>
                </Row>
                <Table
                    dataSource={filterDataByEstado(filteredData)}
                    columns={[
                        {
                            title: lang('cedula'),
                            dataIndex: 'cedula',
                            key: 'cedula',
                        },
                        {
                            title: lang('primerNombre'),
                            dataIndex: 'primerNombre',
                            key: 'primerNombre',
                        },
                        {
                            title: lang('primerApellido'),
                            dataIndex: 'primerApellido',
                            key: 'primerApellido',
                        },
                        {
                            title: lang('especialidad'),
                            dataIndex: 'especialidad',
                            key: 'especialidad',
                            render: (text) => (
                                <span>
                                    {text?.area}
                                </span>
                            )
                        }, {
                            title: lang('EstadoEspecialista'),
                            dataIndex: 'especialistaEstado',
                            key: 'especialistaEstado',
                            render: (text) => (
                                <div>
                                    {text ? <span style={{ color: '#fff', backgroundColor: '#28a745', padding: '5px', borderRadius: '5px' }}>{lang('activo')}</span> : <span style={{ color: '#fff', backgroundColor: '#dc3545', padding: '5px', borderRadius: '5px' }}>{lang('inactivo')}</span>}
                                </div>
                            ),
                        }, {
                            title: lang('register_esPasante'),
                            dataIndex: 'esPasante',
                            key: 'esPasante',
                            render: (text) => (
                                <div>
                                    {text ? <span style={{ color: '#fff', backgroundColor: '#28a745', padding: '5px', borderRadius: '5px' }}>{lang('register_esPasante')}</span> : ''}
                                </div>
                            ),
                        },


                        {
                            title: lang('acciones'),
                            key: 'actions',
                            dataIndex: 'cedula',
                            render: (text) => (
                                <div>
                                    <Link href={`/registro/${text}`}>
                                        <Button type="info" icon={<i className="bi bi-person-badge-fill"></i>} style={{ marginRight: '5px', color: "#fff", backgroundColor: "#17a2b8" }}>
                                            {lang('masInformacion')}
                                        </Button>
                                    </Link>
                                    <Link href={`/registro/edit/${text}`}>
                                        <Button type="success" icon={<i className="bi bi-pencil-square"></i>} style={{ marginRight: '5px', color: "#fff", backgroundColor: "#28a745" }}>
                                            {lang('modificar')}
                                        </Button>
                                    </Link>
                                    <Button onClick={() => showDeleteConfirm(text)} type="danger" icon={<i className="bi bi-trash"></i>} style={{ marginRight: '5px', color: "#fff", backgroundColor: "#dc3545" }}>
                                        {lang('eliminar')}
                                    </Button>
                                </div>
                            ),
                        },
                    ]}
                    loading={loading}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], showQuickJumper: true }}
                    bordered
                    style={{ backgroundColor: '#fff', borderColor: '#d9d9d9' }}
                />
            </Card>
        </MenuWrapper>
    );
}
