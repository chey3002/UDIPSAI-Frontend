import MenuWrapper from '@/components/sidebar';
import { Input, Table, Modal, message, Button, Card, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

const fetchInstituciones = async (searchVal) => {
    try {
        formData.append('sede', '');
        const { data } = await axios.get(process.env['BASE_URL'] + 'api/instituciones/listar').catch((error) => {
            console.log(error);
        });
        return { data };
    } catch (error) {
        console.log(error);
    }
};

export default function IndexInstituciones() {
    const [searchVal, setSearchVal] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [origData, setOrigData] = useState([]);
    const [searchIndex, setSearchIndex] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation('home');
    const lang = t;

    const handleDelete = async (id) => {
        try {
            await axios.delete(process.env['BASE_URL'] + `api/instituciones/eliminar/${id}`);
            message.success(lang('institucionEliminada'));
            window.location.href = '/pacientes/institucionesEducativas';
        } catch (error) {
            message.error(lang('errorEliminarInstitucion'));
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

    const crawl = (institucion, allValues) => {
        if (!allValues) allValues = [];
        for (var key in institucion) {
            if (typeof institucion[key] === "object") crawl(institucion[key], allValues);
            else allValues.push(institucion[key] + " ");
        }
        return allValues;
    };

    const fetchData = async () => {
        const { data: instituciones } = await fetchInstituciones(searchVal);
        setOrigData(instituciones);
        setFilteredData(instituciones);
        const searchInd = instituciones.map(institucion => {
            const allValues = crawl(institucion);
            return { allValues: allValues.toString() };
        });
        setSearchIndex(searchInd);
        if (instituciones) setLoading(false);
    };

    const onSearch = () => {
        setLoading(true);
        fetchData();
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    return (
        <MenuWrapper setLang={true}>
            <Card>
                <Row style={{ marginTop: '10px' }} justify="space-between">
                    <Col xs={6} md="auto">
                        <h1>{lang('listarInstituciones')}</h1>
                    </Col>
                    <Col>
                        <Link href='/pacientes/institucionesEducativas/new/'>
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
                    <Col xs={24} sm={12}>
                        <Button onClick={onSearch} type="primary" icon={<i className="bi bi-search"></i>}>
                            {lang('buscar')}
                        </Button>
                    </Col>
                </Row>
                <Table
                    dataSource={filteredData}
                    columns={[
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
                            title: lang('jornada'),
                            dataIndex: 'jornada',
                            key: 'jornada',
                            render: (text) => (
                                <span>{text == 1 ? 'Matutina' : text == 2 ? 'Vespertina' : 'Otro'}</span>
                            )
                        },
                        {
                            title: lang('tipoInstitucion'),
                            dataIndex: 'tipoInstitucion',
                            key: 'tipoInstitucion',
                            render: (text) => (
                                <span>{text == 1 ? 'Fiscal' : text == 2 ? 'Fiscomisional' : text == 3 ? 'Particular' : 'Otro'}</span>
                            )
                        },
                        {
                            title: lang('acciones'),
                            key: 'actions',
                            dataIndex: 'id',
                            render: (text) => (
                                <div>
                                    <Link href={`/pacientes/institucionesEducativas/${text}`}>
                                        <Button type="info" icon={<i className="bi bi-person-badge-fill"></i>} style={{ marginRight: 5, color: "#fff", backgroundColor: "#17a2b8" }}>
                                            {lang('masInformacion')}
                                        </Button>
                                    </Link>
                                    <Link href={`/pacientes/institucionesEducativas/edit/${text}`}>
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
