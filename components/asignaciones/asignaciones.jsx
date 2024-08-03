'use client';
import React, { useState, useEffect } from 'react';
import { Input, Select, Table, Button, Card, message, Row, Col, Divider } from 'antd';
import axios from 'axios';
import { useUserContext } from '@/assets/useUserContext';
import { useTableSearch } from '@/utils/useTableSearch';

const Assignments = ({ pasanteSeleccionado, handlePasanteSelect }) => {
    const fetchEspecialistas = async () => {
        try {
            const { data } = await axios.get(`${process.env.BASE_URL}api/especialistas/pasantes`);
            setEspecialistas(data);
            return { data };
        } catch (error) {
            console.log(error);
        }
    };

    const { user } = useUserContext();
    const [searchVal, setSearchVal] = useState('');
    const [sede, setSede] = useState(user?.sede.id);
    const [sedes, setSedes] = useState([]);
    const [especialistas, setEspecialistas] = useState([]);
    const { filteredData, loading } = useTableSearch({
        searchVal,
        retrieve: fetchEspecialistas
    });

    useEffect(() => {
        fetchSedes();
    }, []);

    const fetchSedes = async () => {
        try {
            const { data } = await axios.get(`${process.env.BASE_URL}api/sedes/listar`);
            setSedes(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            {!pasanteSeleccionado ? (
                <>
                    <Card style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#e6f7ff', borderColor: '#91d5ff' }}>
                        <Row gutter={[16, 16]} align="middle">
                            <Col span={16}>
                                <Input
                                    value={searchVal}
                                    onChange={e => setSearchVal(e.target.value)}
                                    placeholder="Buscar especialista"
                                    size="large"
                                />
                            </Col>
                            <Col span={8}>
                                <Select
                                    value={sede}
                                    onChange={value => setSede(value)}
                                    style={{ width: '100%' }}
                                    placeholder="Seleccionar sede"
                                    size="large"
                                >
                                    <Select.Option value="">Todos</Select.Option>
                                    {sedes.map(s => (
                                        <Select.Option key={s.id} value={s.id}>{s.nombre}</Select.Option>
                                    ))}
                                </Select>
                            </Col>
                        </Row>
                    </Card>

                    <Table
                        dataSource={filteredData}
                        loading={loading}
                        rowKey="cedula"
                        onRow={(record) => ({
                            onClick: () => handlePasanteSelect(record)
                        })}
                        bordered
                        style={{ backgroundColor: '#fff', borderColor: '#d9d9d9' }}
                    >
                        <Table.Column title="Cédula" dataIndex="cedula" key="cedula" />
                        <Table.Column title="Primer Nombre" dataIndex="primerNombre" key="primerNombre" />
                        <Table.Column title="Primer Apellido" dataIndex="primerApellido" key="primerApellido" />
                        <Table.Column title="Especialidad" dataIndex={['especialidad', 'area']} key="especialidad" />
                        <Table.Column title="Especialista Asignado" dataIndex="especialistaAsignado" key="especialistaAsignado" />
                    </Table>
                </>
            ) : (
                null
            )}
        </div>
    );
};

export default Assignments;
