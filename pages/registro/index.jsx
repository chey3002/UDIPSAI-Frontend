import MenuWrapper from '@/components/sidebar';
import { Input, Table, Modal, message, Button, Card, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useTableSearch } from '@/utils/useTableSearch';
import { useUserContext } from '@/assets/useUserContext';

const fetchEspecialistas = async (searchVal) => {
    try {
        const formData = new FormData();
        formData.append('search', searchVal);

        // const { data } = await axios.post(process.env['BASE_URL'] + 'api/especialistas/listar', formData).catch((error) => {
        const { data } = await axios.get(process.env['BASE_URL'] + 'api/especialistas/activos').catch((error) => {
            console.log(error);
        });
        console.log(data);
        return { data };
    } catch (error) {
        console.log(error);
    }
};

export default function IndexEspecialistas() {
    const [searchVal, setSearchVal] = useState('');
    const [origData, setOrigData] = useState([]);
    const [searchIndex, setSearchIndex] = useState([]);
    const { t } = useTranslation('home');
    const { user } = useUserContext();

    const lang = t;



    const handleDelete = async (id) => {
        try {
            await axios.delete(process.env['BASE_URL'] + `api/especialistas/${id}`);
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
        const { data: users } = await fetchEspecialistas(searchVal);
        setOrigData(users);
        const searchInd = users.map(user => {
            const allValues = crawl(user);
            return { allValues: allValues.toString() };
        });
        setSearchIndex(searchInd);
    };

    const onSearch = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MenuWrapper setLang={true}>
            <Card>
                <Row style={{ marginTop: '10px' }} justify="space-between">
                    <Col xs={6} md="auto">
                        <h1>{lang('listarEspecialistas')}</h1>
                    </Col>
                    <Col>
                        <Link href='/registro/new/'>
                            <Button type="primary" icon={<i className="bi bi-plus-lg"></i>}>
                                {lang('nuevo')}
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <Input
                            onChange={e => setSearchVal(e.target.value)}
                            placeholder={lang('buscar')}
                        />
                    </Col>
                </Row>
                <Table
                    dataSource={filteredData}
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
                        },
                        {
                            title: lang('acciones'),
                            key: 'actions',
                            dataIndex: 'cedula',
                            render: (text) => (
                                <div>
                                    <Link href={`/registro/${text}`}>
                                        <Button type="info" icon={<i className="bi bi-person-badge-fill"></i>} style={{ marginRight: 5, color: "#fff", backgroundColor: "#17a2b8" }}>
                                            {lang('masInformacion')}
                                        </Button>
                                    </Link>
                                    {user?.permisos["pacientes"] ? <Link href={`/registro/edit/${text}`}>
                                        <Button type="success" icon={<i className="bi bi-pencil-square"></i>} style={{ marginRight: 5, color: "#fff", backgroundColor: "#28a745" }}>
                                            {lang('modificar')}
                                        </Button>
                                    </Link> : null}
                                    {user?.permisos["pacientes"] ? <Button onClick={() => showDeleteConfirm(text)} type="danger" icon={<i className="bi bi-trash"></i>} style={{ marginRight: 5, color: "#fff", backgroundColor: "#dc3545" }}>
                                        {lang('eliminar')}
                                    </Button> : null}
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
