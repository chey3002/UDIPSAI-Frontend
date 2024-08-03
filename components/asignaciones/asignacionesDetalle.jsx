'use client';
import React, { useState, useEffect } from 'react';
import { Input, Select, Table, Button, Card, message, Row, Col, Divider } from 'antd';
import axios from 'axios';
import { useUserContext } from '@/assets/useUserContext';

const AssignmentDetails = ({ pasanteSeleccionado, handlePasanteDeselect, lang }) => {
    const { user } = useUserContext();
    const [searchVal, setSearchVal] = useState('');
    const [sede, setSede] = useState(user?.sede.id);
    const [sedes, setSedes] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [asignaciones, setAsignaciones] = useState([]);

    useEffect(() => {
        fetchSedes();
    }, []);

    useEffect(() => {
        if (pasanteSeleccionado) {
            fetchAsignaciones(pasanteSeleccionado.cedula);
            fetchPacientes();
        }
    }, [pasanteSeleccionado]);

    const fetchPacientes = async () => {
        const formData = new FormData();
        formData.append('search', searchVal);
        formData.append('sedeId', sede);
        try {
            const { data } = await axios.post(`${process.env.BASE_URL}api/pacientes/buscar`, formData);
            setPacientes(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSedes = async () => {
        try {
            const { data } = await axios.get(`${process.env.BASE_URL}api/sedes/listar`);
            setSedes(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAsignaciones = async (cedula) => {
        try {
            const { data } = await axios.get(`${process.env.BASE_URL}api/asignaciones/pasante/${cedula}`);
            setAsignaciones(data);
        } catch (error) {
            console.log(error);
        }
    };

    const asignarPaciente = async (pacienteId) => {
        try {
            await axios.post(`${process.env.BASE_URL}api/asignaciones/asignar`, {
                pacienteId,
                pasanteId: pasanteSeleccionado.cedula,
            });
            message.success('Asignación realizada con éxito');
            fetchAsignaciones(pasanteSeleccionado.cedula);
        } catch (error) {
            console.log(error);
            message.error('Error al realizar la asignación');
        }
    };

    const eliminarAsignacion = async (asignacionId) => {
        try {
            await axios.delete(`${process.env.BASE_URL}api/asignaciones/eliminar/${asignacionId}`);
            message.success('Asignación eliminada con éxito');
            fetchAsignaciones(pasanteSeleccionado.cedula);
        } catch (error) {
            console.log(error);
            message.error('Error al eliminar la asignación');
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <Card style={{ marginBottom: '20px', backgroundColor: '#e6f7ff', borderColor: '#91d5ff' }}>
                <Row>
                    <Col span={8}>
                        <p><strong>{lang('Cédula')}:</strong> {pasanteSeleccionado.cedula}</p>
                        <p><strong>{lang('nombre')}:</strong> {pasanteSeleccionado.primerNombre} {pasanteSeleccionado.primerApellido}</p>
                    </Col>
                    <Col span={8}>
                        <p><strong>{lang("especialidad")}:</strong> {pasanteSeleccionado.especialidad.area}</p>
                    </Col>
                    <Col span={8}>
                        <Button type="primary" danger onClick={handlePasanteDeselect}>{lang("Deseleccionar_Pasante")}</Button>
                    </Col>
                </Row>
            </Card>

            <Divider orientation="left">{lang("Buscar_Paciente")}</Divider>
            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col span={12}>
                    <Input.Search
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                        placeholder={lang("Buscar_Paciente")}
                        onSearch={fetchPacientes}
                    />
                </Col>
                <Col span={8}>
                    <Select value={sede} onChange={value => setSede(value)} style={{ width: '100%' }}>
                        <Select.Option value="">{lang('todos')}</Select.Option>
                        {sedes.map(s => (
                            <Select.Option key={s.id} value={s.id}>{s.nombre}</Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>

            <Table
                dataSource={pacientes}
                rowKey="id"
                style={{ marginBottom: '20px' }}
                bordered
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], showQuickJumper: true }}

            >
                <Table.Column title={lang("Ficha")} dataIndex="id" key="id" />
                <Table.Column title={lang("nombre")} dataIndex="nombresApellidos" key="nombre" />
                <Table.Column title={lang("Ciudad")} dataIndex="ciudad" key="ciudad" />
                <Table.Column title={lang("Sede")} dataIndex={['sede', 'nombre']} key="sede" />
                <Table.Column title={lang("Cédula")} dataIndex="cedula" key="cedula" />
                <Table.Column title={lang("Fecha_de_Nacimiento")} dataIndex="fechaNacimiento" key="fechaNacimiento" />
                <Table.Column
                    title={lang("acciones")}
                    key="acciones"
                    render={(text, record) => (
                        <Button type="primary" onClick={() => asignarPaciente(record.id)}>{lang("Asignar")}</Button>
                    )}
                />
            </Table>

            <Divider orientation="left">{lang("Pacientes_Asignados")}</Divider>
            <Table
                dataSource={asignaciones}
                rowKey="id"
                bordered
            >
                <Table.Column title={lang("Ficha")} dataIndex={['paciente', 'id']} key="id" />
                <Table.Column title={lang("nombre")} dataIndex={['paciente', 'cedula']} key="cedula" />
                <Table.Column title={lang("Ciudad")} dataIndex={['paciente', 'nombresApellidos']} key="nombre" />
                <Table.Column title={lang("Sede")} dataIndex={['paciente', 'ciudad']} key="ciudad" />
                <Table.Column title={lang("Cédula")} dataIndex={['paciente', 'sede', 'nombre']} key="sede" />
                <Table.Column title={lang("Fecha_de_Nacimiento")} dataIndex={['paciente', 'fechaNacimiento']} key="fechaNacimiento" />
                <Table.Column
                    title={lang("acciones")}
                    key="acciones"
                    render={(text, record) => (
                        <Button type="primary" danger onClick={() => eliminarAsignacion(record.id)}>{lang("eliminar")}</Button>
                    )}
                />
            </Table>
        </div>
    );
};

export default AssignmentDetails;
