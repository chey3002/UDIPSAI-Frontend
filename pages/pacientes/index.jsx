import MenuWrapper from '@/components/sidebar';
import { Input, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useTableSearch } from '@/utils/useTableSearch';
import Link from 'next/link';
import { useUserContext } from '@/assets/useUserContext';
import { toIndex } from '@/utils/toindex/toindex';


const fetchPacientes = async () => {
    // const { data } = await axios.get(process.env['BASE_URL'] + 'api/estudiantes')

    const data = [{ name: 'John', lastName: 'Brown', dni: 32 }, { name: 'Jim', lastName: 'Green', dni: 42 }, { name: 'Joe', lastName: 'Black', dni: 32 },]
    return { data };
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
                        title: 'Nombre',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'Apellido',
                        dataIndex: 'lastName',
                        key: 'lastName',
                    },
                    {
                        title: 'DNI',
                        dataIndex: 'dni',
                        key: 'dni',
                    },
                    {
                        title: 'Acciones',
                        key: 'actions',
                        dataIndex: 'dni',
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
