'use client'

import FormPaciente from '@/components/pacientes/patientForm';
import MenuWrapper from '@/components/sidebar';
import { Input, Table } from 'antd';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useTableSearch } from '@/utils/useTableSearch';


const fetchPacientes = async () => {
    // const { data } = await axios.get(process.env['BASE_URL'] + 'api/estudiantes')

    const data = [{ name: 'John', lastName: 'Brown', dni: 32 }, { name: 'Jim', lastName: 'Green', dni: 42 }, { name: 'Joe', lastName: 'Black', dni: 32 },]
    return { data };
}; export default function IndexPaciente() {
    const [searchVal, setSearchVal] = useState(null);

    const { filteredData, loading } = useTableSearch({
        searchVal,
        retrieve: fetchPacientes
    });
    return <MenuWrapper>
        <div>
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
                        render: () => (
                            <div>
                                <Button variant="success" style={{ marginRight: "5px" }}>Editar</Button>
                                <Button variant="danger">Eliminar</Button>
                            </div>
                        ),
                    },
                ]}
                loading={loading}
                pagination={{ defaultPageSize: 25, showSizeChanger: true, pageSizeOptions: ['25', '50', '100'] }}
            />
        </div>
    </MenuWrapper>;
}
