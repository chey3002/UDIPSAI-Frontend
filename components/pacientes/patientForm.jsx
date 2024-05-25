import React, { use, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import FormControl from '../commons/formControl';
import FormControlDosColumnas from '../commons/formControlDosColumnas';

const FormPaciente = ({ paciente }) => {
    const [formState, setFormState] = useState({
        id: 'Nueva',
        fechaApertura: '',
        proyectoAlQuePertence: '',
        imagenUrl: 'https://as1.ftcdn.net/v2/jpg/01/28/56/34/1000_F_128563441_kn96kL8fUOtfZlBRBV4kATepeGXuiLzI.jpg',
        nombresApellidos: '',
        ciudad: '',
        fechaNacimiento: '',
        edad: '',
        cedula: '',
        domicilio: '',
        telefono: '',
        institucionEducativa: '',
        tipoInstitucion: 1, // Replace with default value of
        jornada: 1, // Replace with default value of 
        anioEduacion: '',
        direccionInstitucion: '',
        paralelo: '',
        tieneDiscapacidad: 'no', // Replace with default value of 
        portadorCarnet: false, // Replace with default value of 
        motivoConsulta: '',
        observaciones: '',
        educacionInclusiva: '',
        celular: '',
        tipoDiscapacidad: ''
    });
    useEffect(() => {
        if (paciente) {
            setFormState({
                ...formState,
                ...paciente
            });
        }
    }, []);
    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    };
    const handleChangeCheck = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.checked
        });
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);

            setFormState({
                ...formState,
                imagenUrl: reader.result,
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log(formState);
    };

    return (
        <Card className='p-3'>
            <Form onSubmit={handleSubmit}>
                <h1>Inegreso de nuevo paciente</h1>
                <h2>Datos del Paciente</h2>
                <Form.Group controlId="fichaUnica" >
                    <Row>
                        <Col>
                            <img
                                src={formState.imagenUrl}
                                style={{ objectFit: 'cover', borderRadius: '15px', border: '3px solid #0044ff' }}
                                alt="avatar"
                                width="160"
                                height="200"
                            />
                            <p className="text-star">Ficha Médica: {formState.id}</p>
                            {/* <Form.Label>URL de la imagen</Form.Label>
                            <FormControl
                                type="text"
                                placeholder="Ingrese URL de la imagen"
                                name="imagenUrl"
                                value={formState.imagenUrl}
                                onChange={handleChange}
                            /> */}

                        </Col>
                        <Col md="10">
                            <Form.Label>Fecha de apertura de ficha</Form.Label>
                            <FormControl type="date" placeholder="Fecha de apertura de la ficha" name="fechaApertura" value={formState.fechaApertura} onChange={handleChange} />
                            <Form.Label>Proyecto al que pertenece</Form.Label>
                            <FormControl type="text" placeholder="Proyecto al que pertenece" name="proyectoAlQuePertence" value={formState.proyectoAlQuePertence} onChange={handleChange} />
                            <Form.Label>Subir imagen</Form.Label>
                            <FormControl
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="bg-info text-white"
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <h2>Datos Personales</h2>
                <Form.Group as={Row} controlId="datosPersonales">


                    <FormControlDosColumnas type="text" placeholder="Nombres y Apellidos" name="nombresApellidos" value={formState.nombresApellidos} onChange={handleChange}
                        label="Nombres y apellidos" />

                    <FormControlDosColumnas type="text" placeholder="Cédula/pasaporte" name="cedula" value={formState.cedula} onChange={handleChange}
                        label="Cedula/pasaporte" />
                    <FormControlDosColumnas type="date" placeholder="Fecha de nacimiento" name="fechaNacimiento" value={formState.fechaNacimiento} onChange={handleChange}
                        label="Fecha de nacimiento" />
                    <FormControlDosColumnas type="text" placeholder="Edad" name="edad" value={formState.edad} onChange={handleChange}
                        label="Edad" />
                    <FormControlDosColumnas type="text" placeholder="Domicilio" name="domicilio" value={formState.domicilio} onChange={handleChange}
                        label="Domicilio" />
                    <FormControlDosColumnas type="text" placeholder="Ciudad" name="ciudad" value={formState.ciudad} onChange={handleChange}
                        label="Ciudad" />
                    <FormControlDosColumnas type="text" placeholder="Teléfono Domicilio" name="telefono" value={formState.telefono} onChange={handleChange}
                        label="Teléfono Domicilio" />
                    <FormControlDosColumnas type="text" placeholder="Celular" name="celular" value={formState.celular} onChange={handleChange}
                        label="Celular" />

                </Form.Group>
                <h2>Discapacidad</h2>
                <Form.Group as={Row} controlId="datosDiscapacidad">

                    <FormControlDosColumnas as="select" name="tieneDiscapacidad" value={formState.tieneDiscapacidad} onChange={handleChange}
                        label="Presenta discapacidad">
                        <option value="si">Sí</option>
                        <option value="no" defaultChecked> No</option>
                    </FormControlDosColumnas>

                    <FormControlDosColumnas type="text" placeholder="Tipo de discapacidad" name="tipoDiscapacidad" value={formState.tipoDiscapacidad} onChange={handleChange}
                        label="Tipo de discapacidad" />

                    <Col md="6" sm="12">
                        <Form.Label>¿Es portador de carnet?</Form.Label>
                        <Form.Check type="checkbox" label="Portador del Carnet" name="portadorCarnet" checked={formState.portadorCarnet} onChange={handleChangeCheck} />
                    </Col>
                </Form.Group>
                <h2>Institución educativa</h2>
                <Form.Group as={Row} controlId="rightColumn">
                    <FormControlDosColumnas type="text" placeholder="Institución Educativa" name="institucionEducativa" value={formState.institucionEducativa} onChange={handleChange}
                        label="Institución Educativa" />
                    <FormControlDosColumnas type="text" placeholder="Dirección" name="direccionInstitucion" value={formState.direccionInstitucion} onChange={handleChange}
                        label="Dirección" />
                    <FormControlDosColumnas as="select" name="jornada" value={formState.jornada} onChange={handleChange}
                        label="Jornada">
                        <option value={1} defaultChecked>Matutina</option>
                        <option value={2}>Despertina</option>
                    </FormControlDosColumnas>
                    <FormControlDosColumnas as="select" name="tipoInstitucion" value={formState.tipoInstitucion} onChange={handleChange}
                        label="Tipo de insitución">
                        <option value={1} defaultChecked>Fiscal</option>
                        <option value={2}>Fiscomisional</option>
                        <option value={3}>Privada</option>
                    </FormControlDosColumnas>
                    <FormControlDosColumnas type="text" placeholder="Teléfono Institución" name="educacionInclusiva" value={formState.educacionInclusiva} onChange={handleChange}
                        label="Educación Inclusiva" />
                    <FormControlDosColumnas type="text" placeholder="Año de educación" name="anioEduacion" value={formState.anioEduacion} onChange={handleChange}
                        label="Año de educación" />
                    <FormControlDosColumnas type="text" placeholder="Paralelo" name="paralelo" value={formState.paralelo} onChange={handleChange}
                        label="Paralelo" />
                </Form.Group>
                <h2>Diagnóstico</h2>
                <Form.Group as={Row} controlId="diagnostico">
                    <FormControlDosColumnas as="textarea" rows={3} placeholder="Motivo de la consulta" name="motivoConsulta" value={formState.motivoConsulta} onChange={handleChange}
                        label="Motivo de la consulta" />
                    <FormControlDosColumnas as="textarea" rows={3} placeholder="Observaciones" name="observaciones" value={formState.observaciones} onChange={handleChange}
                        label="Observaciones" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Card>
    );
}

export default FormPaciente;