import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const FormPaciente = () => {
    const [formState, setFormState] = useState({
        fechaApertura: '',
        nombresApellidos: '',
        ciudad: '',
        fechaNacimiento: '',
        edad: '',
        cedula: '',
        domicilio: '',
        barrio: '',
        telefono: '',
        celular: '',
        institucionEducativa: '',
        tipoInstitucion: '', // Replace with default value of TipoInstitucion
        sector: '',
        jornada: '', // Replace with default value of Jornada
        telefonoInstitucion: '',
        anioEduacion: '', // Replace with default value of TipoNivelEduacion
        paralelo: '',
        perteneceInclusion: '', // Replace with default value of Inclusion
        tieneDiscapacidad: '', // Replace with default value of Discapacidad
        portadorCarnet: '', // Replace with default value of PortadorCarnet
        diagnostico: '',
        motivoConsulta: '',
        observaciones: '',
        nombreExaminador: '',
        anotaciones: ''
    });

    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log(formState);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Actualizar datos del paciente</h1>
            <Form.Group controlId="fichaUnica">
                <Form.Label>FICHA UNICA</Form.Label>
                <Form.Control type="text" placeholder="Fecha de apertura de la ficha" name="fechaApertura" value={formState.fechaApertura} onChange={handleChange} />
                <Form.Control type="text" placeholder="Nombre del examinador" name="nombreExaminador" value={formState.nombreExaminador} onChange={handleChange} />
            </Form.Group>
            <Row>
                <Form.Group as={Col} controlId="leftColumn">
                    <Form.Control type="text" placeholder="Nombres y Apellidos" name="nombresApellidos" value={formState.nombresApellidos} onChange={handleChange} />
                    <Form.Control type="text" placeholder="Domicilio" name="domicilio" value={formState.domicilio} onChange={handleChange} />
                    <Form.Control type="text" placeholder="Ciudad" name="ciudad" value={formState.ciudad} onChange={handleChange} />
                    <Form.Control type="text" placeholder="Teléfono Domicilio" name="telefono" value={formState.telefono} onChange={handleChange} />
                    <Form.Control as="select" name="tieneDiscapacidad" value={formState.tieneDiscapacidad} onChange={handleChange}>
                        <option>Presenta Discapacidad: Sí</option>
                        <option>Presenta Discapacidad: No</option>
                    </Form.Control>
                    <Form.Control as="select" name="tipoDiscapacidad" value={formState.tipoDiscapacidad} onChange={handleChange}>
                        <option>Tipo de discapacidad: ...</option>
                        {/* Add other options here */}
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="rightColumn">
                    <Form.Control type="text" placeholder="Número de Identificación DEL ESTUDIANTE" name="cedula" value={formState.cedula} onChange={handleChange} />
                    <Form.Control type="text" placeholder="Edad" name="edad" value={formState.edad} onChange={handleChange} />
                    <Form.Control type="text" placeholder="Barrio sector domicilio" name="barrio" value={formState.barrio} onChange={handleChange} />
                    <Form.Check type="checkbox" label="Portador del Carnet" name="portadorCarnet" checked={formState.portadorCarnet} onChange={handleChange} />
                    <Form.Control type="text" placeholder="Cédula" name="cedula" value={formState.cedula} onChange={handleChange} />
                    {/* Add other fields here */}
                </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default FormPaciente;