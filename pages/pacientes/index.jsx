import MenuWrapper from '@/components/sidebar';
import { Input, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useTableSearch } from '@/utils/useTableSearch';
import Link from 'next/link';
import { useUserContext } from '@/assets/useUserContext';
import { toIndex } from '@/utils/toindex/toindex';
import axios from 'axios';


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
    return <MenuWrapper>
        <Card>
            <h1>Listar Pacientes</h1>
            <Input
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Buscar"
                style={{ position: "sticky" }}
            />
            <Table
                dataSource={filteredData}
                columns={[
                    {
                        title: 'Número de ficha',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: 'Nombres y Apellidos',
                        dataIndex: 'nombresApellidos',
                        key: 'nombresApellidos',
                    },
                    {
                        title: 'Cédula',
                        dataIndex: 'cedula',
                        key: 'cedula',
                    },
                    {
                        title: 'Teléfono',
                        dataIndex: 'telefono',
                        key: 'telefono',
                    },
                    {
                        title: 'Celular',
                        dataIndex: 'celular',
                        key: 'celular',
                    },
                    {
                        title: 'Acciones',
                        key: 'actions',
                        dataIndex: 'id',
                        render: (text) => (
                            <div>
                                <Link href={`/pacientes/${text}`} className='btn btn-success' variant="success" style={{ marginRight: "5px" }}>Más información</Link>
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