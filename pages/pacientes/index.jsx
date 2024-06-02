import MenuWrapper from '@/components/sidebar';
import { Input, Table, Modal, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useTableSearch } from '@/utils/useTableSearch';
import Link from 'next/link';
import { useUserContext } from '@/assets/useUserContext';
import { toIndex } from '@/utils/toindex/toindex';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import FileUploadButton from '@/components/fileUploadButton';
import DownloadTemplateButton from '@/components/downloadTemplateButton';

const fetchPacientes = async (searchVal) => {
    try {
        const formData = new FormData();
        formData.append('search', searchVal);

        const { data } = await axios.post(process.env['BASE_URL'] + 'api/pacientes/buscar', formData).catch((error) => {
            console.log(error);
        });

        return { data };
    } catch (error) {
        console.log(error);
    }
    // return res.data;
};

export default function IndexPaciente() {
    const [searchVal, setSearchVal] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [origData, setOrigData] = useState([]);
    const [searchIndex, setSearchIndex] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUserContext();
    const { t } = useTranslation('home');
    const lang = t;

    useEffect(() => {
        toIndex(user);
    }, [user]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(process.env['BASE_URL'] + `api/pacientes/eliminar/${id}`);
            message.success(lang('pacienteEliminado'));
            // Refetch or update data after deletion
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

    const crawl = (user, allValues) => {
        if (!allValues) allValues = [];
        for (var key in user) {
            if (typeof user[key] === "object") crawl(user[key], allValues);
            else allValues.push(user[key] + " ");
        }
        return allValues;
    };
    const fetchData = async () => {
        const { data: users } = await fetchPacientes(searchVal);
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
    }

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);
    return (
        <MenuWrapper setLang={true}>
            <Card>
                <Row style={{ marginTop: '10px' }}>
                    <Col sm={12} md={4} >
                        <h1>{lang('listarPacientes')}</h1>
                    </Col>
                    <Col sm={12} md={8}>
                        <Row>
                            <Col sm={12} md={'auto'} className='m-2 '>
                                <DownloadTemplateButton />
                            </Col>
                            <Col sm={12} md={'auto'} className='m-2 '>
                                <FileUploadButton />
                            </Col>

                            <Col sm={12} md={'auto'} className='m-2 '>
                                <Link href='/pacientes/new/' className='btn btn-primary' variant="primary" style={{ marginRight: "5px" }}>
                                    <i className="bi bi-plus-lg"></i> {lang('nuevo')}
                                </Link>
                            </Col>
                        </Row>
                    </Col>


                </Row>
                <Row>
                    <Col>
                        <Input
                            onChange={e => setSearchVal(e.target.value)}
                            placeholder={`${lang('buscar')}`}
                            style={{ position: "sticky" }}
                        />
                    </Col>
                    <Col>
                        <Button onClick={onSearch} className='btn btn-primary' variant="primary" style={{ marginRight: "5px" }}>
                            <i className="bi bi-search"></i> {lang('buscar')}
                        </Button>
                    </Col>
                </Row>
                <Table
                    dataSource={filteredData}
                    columns={[
                        {
                            title: `${lang('numeroDeFicha')}`,
                            dataIndex: 'id',
                            key: 'id',
                        },
                        {
                            title: `${lang('informacionDelPaciente_nombre')}`,
                            dataIndex: 'nombresApellidos',
                            key: 'nombresApellidos',
                        },
                        {
                            title: `${lang('informacionDelPaciente_cedula')}`,
                            dataIndex: 'cedula',
                            key: 'cedula',
                        },
                        {
                            title: `${lang('informacionDelPaciente_telefono')}`,
                            dataIndex: 'telefono',
                            key: 'telefono',
                        },
                        {
                            title: `${lang('informacionDelPaciente_celular')}`,
                            dataIndex: 'celular',
                            key: 'celular',
                        },
                        {
                            title: `${lang('acciones')}`,
                            key: 'actions',
                            dataIndex: 'id',
                            render: (text) => (
                                <div>
                                    <Link href={`/pacientes/${text}`} className='btn btn-info' variant="info" style={{ marginRight: "5px" }}>
                                        <i className="bi bi-person-badge-fill"></i> {lang('masInformacion')}
                                    </Link>
                                    <Link href={`/pacientes/edit/${text}`} className='btn btn-success' variant="success" style={{ marginRight: "5px" }}>
                                        <i className="bi bi-pencil-square"></i> {lang('modificar')}
                                    </Link>
                                    <Button onClick={() => showDeleteConfirm(text)} className='btn btn-danger' variant="danger" style={{ marginRight: "5px" }}>
                                        <i className="bi bi-trash"></i> {lang('eliminar')}
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
