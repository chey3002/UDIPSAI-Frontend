import MenuWrapper from '@/components/sidebar';
import { Input, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useTableSearch } from '@/utils/useTableSearch';
import Link from 'next/link';
import { useUserContext } from '@/assets/useUserContext';
import { toIndex } from '@/utils/toindex/toindex';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation'


const fetchPacientes = async () => {

    console.log(process.env['BASE_URL'] + 'api/pacientes/listar');
    try {
        const { data } = await axios.get(process.env['BASE_URL'] + 'api/pacientes/listar').catch((error) => {
            console.log(error);
        }
        );

        return { data };
    } catch (error) {
        console.log(error);
    }
    // return res.data;

};
export default function IndexPaciente() {
    const [searchVal, setSearchVal] = useState(null);

    const { filteredData, loading } = useTableSearch({
        searchVal,
        retrieve: fetchPacientes
    });
    const { user } = useUserContext();

    useEffect(() => {
        toIndex(user);
    }, [user]);
    const { t } = useTranslation('home');
    const lang = t;
    return <MenuWrapper setLang={true}>
        <Card>
            <Row style={{ marginTop: '10px' }}>
                <Col sm={12} md={10}>
                    <h1>{lang('listarPacientes')}</h1>
                </Col>
                <Col sm={12} md={2}>
                    <Link href='/pacientes/new/' className='btn btn-primary' variant="primary" style={{ marginRight: "5px" }}><i class="bi bi-plus-lg"></i> {lang('nuevo')}</Link>
                </Col>
            </Row>
            <Input
                onChange={e => setSearchVal(e.target.value)}
                placeholder={`${lang('buscar')}`}
                style={{ position: "sticky" }}
            />
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
                        title: `${lang('informacionDelPaciente_telefono')}}`,
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
                                <Link href={`/pacientes/${text}`} className='btn btn-info' variant="info" style={{ marginRight: "5px" }}><i class="bi bi-person-badge-fill"></i>{lang('masInformacion')}</Link>
                                <Link href={`/pacientes/edit/${text}`} className='btn btn-success' variant="success" style={{ marginRight: "5px" }}><i class="bi bi-pencil-square"></i> {lang('modificar')}</Link>
                            </div>
                        ),
                    },
                ]}
                loading={loading}
                pagination={{ defaultPageSize: 25, showSizeChanger: true, pageSizeOptions: ['25', '50', '100'] }}
            />
        </Card>
    </MenuWrapper>;
}