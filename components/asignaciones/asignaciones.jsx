'use client';
import React, { useState, useEffect } from 'react';
import { Input, Table, Card, Row, Col } from 'antd';
import axios from 'axios';
import { useTableSearch } from '@/utils/useTableSearch';

const Assignments = ({ pasanteSeleccionado, handlePasanteSelect, lang }) => {
    const fetchEspecialistas = async () => {
        try {
            const { data } = await axios.get(`${process.env.BASE_URL}api/especialistas/pasantes`);
            setEspecialistas(data);
            return { data };
        } catch (error) {
            console.log(error);
        }
    };

    const [searchVal, setSearchVal] = useState('');
    const [especialistas, setEspecialistas] = useState([]);
    const { filteredData, loading } = useTableSearch({
        searchVal,
        retrieve: fetchEspecialistas
    });

    useEffect(() => {
    }, []);

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            {!pasanteSeleccionado ? (
                <>
                    <Card style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#e6f7ff', borderColor: '#91d5ff' }}>
                        <Row gutter={[16, 16]} align="middle">
                            <Col span={24}>
                                <Input
                                    value={searchVal}
                                    onChange={e => setSearchVal(e.target.value)}
                                    placeholder={lang("Buscar_especialista")}
                                    size="large"
                                />
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
                        <Table.Column title={lang("Cédula")} dataIndex="cedula" key="cedula" />
                        <Table.Column title={lang("Primer_Nombre")} dataIndex="primerNombre" key="primerNombre" />
                        <Table.Column title={lang("Primer_Apellido")} dataIndex="primerApellido" key="primerApellido" />
                        <Table.Column title={lang("especialidad")} dataIndex={['especialidad', 'area']} key="especialidad" />
                        <Table.Column title={lang("Especialista_Asignado")} dataIndex="especialistaAsignado" key="especialistaAsignado" />
                    </Table>
                </>
            ) : (
                null
            )}
        </div>
    );
};

export default Assignments;
