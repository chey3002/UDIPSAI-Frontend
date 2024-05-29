/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { use, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import FormControl from '../commons/formControl';
import FormControlDosColumnas from '../commons/formControlDosColumnas';
import axios from 'axios';

const FormPaciente = ({ paciente, lang }) => {
    const [formState, setFormState] = useState({
        id: 'Nueva Ficha',
        fechaApertura: '',
        proyecto: '',
        imagen: null,
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
        anioEducacion: '',
        direccionInstitucion: '',
        paralelo: '',
        tieneDiscapacidad: 'no', // Replace with default value of 
        portadorCarnet: false, // Replace with default value of 
        motivoConsulta: '',
        observaciones: '',
        perteneceInclusion: '',
        celular: '',
        diagnostico: ''
    });
    console.log(formState)
    useEffect(() => {
        if (paciente) {
            console.log(paciente);
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
            const base64Data = reader.result.split(",")[1]; // Eliminar el tipo MIME
            console.log(base64Data);

            setFormState({
                ...formState,
                imagen: base64Data,
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log(formState);
        if (paciente) {
            // Update
            const res = await axios.put(process.env['BASE_URL'] + 'api/pacientes/actualizar/' + formState.id, formState).
                then(() => {
                    window.location.href = '/pacientes';
                }).catch((error) => {
                    console.log(error);
                }
                );
        } else {
            // Create
            var request = { ...formState, pacienteEstado: 1 };
            //eliminar id
            delete request.id;
            const res = await axios.post(process.env['BASE_URL'] + 'api/pacientes/insertar', request).
                then((response) => {
                    console.log(response);
                    window.location.href = '/pacientes';
                }).catch((error) => {
                    console.log(error);
                }
                );
        }


    };

    return (
        <Card className='p-3'>
            <Form onSubmit={handleSubmit}>
                <h1> {lang.informacionDelPaciente_title}{formState.id}</h1>
                <h2>{lang.informacionDelPaciente_personal}</h2>
                <Form.Group controlId="fichaUnica" >
                    <Row>
                        <Col>
                            <img
                                src={formState.imagen ? `data:image/jpeg;base64, ${formState.imagen}` : 'https://as1.ftcdn.net/v2/jpg/01/28/56/34/1000_F_128563441_kn96kL8fUOtfZlBRBV4kATepeGXuiLzI.jpg'}
                                style={{ objectFit: 'cover', borderRadius: '15px', border: '3px solid #0044ff' }}
                                alt="avatar"
                                width="160"
                                height="200"
                            />
                            {/* <Form.Label>URL de la imagen</Form.Label>
                            <FormControl
                                type="text"
                                placeholder="Ingrese URL de la imagen"
                                name="imagen"
                                value={formState.imagen}
                                onChange={handleChange}
                            /> */}
                        </Col>
                        <Col md="10">
                            <Form.Label>{lang.informacionDelPaciente_fechaApertura}</Form.Label>
                            <FormControl type="date" placeholder={lang.informacionDelPaciente_fechaApertura} name="fechaApertura" value={formState.fechaApertura} onChange={handleChange} />
                            <Form.Label>{lang.informacionDelPaciente_proyecto}</Form.Label>
                            <FormControl type="text" placeholder={lang.informacionDelPaciente_proyecto} name="proyecto" value={formState.proyecto} onChange={handleChange} />
                            <Form.Label>{lang.informacionDelPaciente_subirImagen}</Form.Label>
                            <FormControl
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="bg-info text-white"
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <h2>{lang.informacionDelPaciente_datosPersonales}</h2>
                <Form.Group as={Row} controlId="datosPersonales">


                    <FormControlDosColumnas type="text" placeholder={lang.informacionDelPaciente_nombre} name="nombresApellidos" value={formState.nombresApellidos} onChange={handleChange}
                        label={lang.informacionDelPaciente_nombre} />

                    <FormControlDosColumnas type="text" placeholder={lang.informacionDelPaciente_cedula} name="cedula" value={formState.cedula} onChange={handleChange}
                        label={lang.informacionDelPaciente_cedula} />
                    <FormControlDosColumnas type="date" placeholder={lang.informacionDelPaciente_fechaNacimiento} name="fechaNacimiento" value={formState.fechaNacimiento} onChange={handleChange}
                        label={lang.informacionDelPaciente_fechaNacimiento} />
                    <FormControlDosColumnas type="text" placeholder={lang.informacionDelPaciente_edad} name="edad" value={formState.edad} onChange={handleChange}
                        label={lang.informacionDelPaciente_edad} />
                    <FormControlDosColumnas type="text" placeholder={lang.informacionDelPaciente_domicilio} name="domicilio" value={formState.domicilio} onChange={handleChange}
                        label={lang.informacionDelPaciente_domicilio} />
                    <FormControlDosColumnas type="text" placeholder={lang.informacionDelPaciente_ciudad} name="ciudad" value={formState.ciudad} onChange={handleChange}
                        label={lang.informacionDelPaciente_ciudad} />
                    <FormControlDosColumnas type="text" placeholder={lang.informacionDelPaciente_telefono} name="telefono" value={formState.telefono} onChange={handleChange}
                        label={lang.informacionDelPaciente_telefono} />
                    <FormControlDosColumnas type="text" placeholder={lang.informacionDelPaciente_celular} name="celular" value={formState.celular} onChange={handleChange}
                        label={lang.informacionDelPaciente_celular} />

                </Form.Group>
                <h2>{lang.informacionDelPaciente_discapacidad}</h2>
                <Form.Group as={Row} controlId="datosDiscapacidad">

                    <FormControlDosColumnas as="select" name="tieneDiscapacidad" value={formState.tieneDiscapacidad} onChange={handleChange}
                        label={lang.informacionDelPaciente_presentaDiscapacidad}>
                        <option value="si">Sí</option>
                        <option value="no" defaultChecked> No</option>
                    </FormControlDosColumnas>

                    <FormControlDosColumnas type="text" placeholder={lang.informacionDelPaciente_diagnostico} name="diagnostico" value={formState.diagnostico} onChange={handleChange}
                        label={lang.informacionDelPaciente_diagnostico} />

                    <Col md="6" sm="12">
                        <Form.Check type="checkbox" label={lang.informacionDelPaciente_portadorCarnet} name="portadorCarnet" checked={formState.portadorCarnet} onChange={handleChangeCheck} />
                    </Col>
                </Form.Group>
                <h2>{lang.informacionDelPaciente_title_educativa}</h2>
                <Form.Group as={Row} controlId="rightColumn">
                    <FormControlDosColumnas type="text" placeholder={lang.informacionDelPaciente_institucionEducativa} name="institucionEducativa" value={formState.institucionEducativa} onChange={handleChange}
                        label={lang.informacionDelPaciente_institucionEducativa} />
                    <FormControlDosColumnas type="text" placeholder={lang.informacionDelPaciente_direccionInstitucion} name="direccionInstitucion" value={formState.direccionInstitucion} onChange={handleChange}
                        label={lang.informacionDelPaciente_direccionInstitucion} />
                    <FormControlDosColumnas as="select" name="jornada" value={formState.jornada} onChange={handleChange}
                        label={lang.informacionDelPaciente_jornada}>
                        <option value={1}>Matutina</option>
                        <option value={2}>Despertina</option>
                    </FormControlDosColumnas>
                    <FormControlDosColumnas as="select" name="tipoInstitucion" value={formState.tipoInstitucion} onChange={handleChange}
                        label={lang.informacionDelPaciente_tipoInstitucion}>
                        <option value={1}>Fiscal</option>
                        <option value={2}>Fiscomisional</option>
                        <option value={3}>Privada</option>
                    </FormControlDosColumnas>
                    <FormControlDosColumnas type="text" placeholder={lang.informacionDelPaciente_perteneceInclusion} name="perteneceInclusion" value={formState.perteneceInclusion} onChange={handleChange}
                        label={lang.informacionDelPaciente_perteneceInclusion} />
                    <FormControlDosColumnas type="text" placeholder={lang.informacionDelPaciente_anioEducacion} name="anioEducacion" value={formState.anioEducacion} onChange={handleChange}
                        label={lang.informacionDelPaciente_anioEducacion} />
                    <FormControlDosColumnas type="text" placeholder={lang.informacionDelPaciente_paralelo} name="paralelo" value={formState.paralelo} onChange={handleChange}
                        label={lang.informacionDelPaciente_paralelo} />
                </Form.Group>
                <h2>{lang.informacionDelPaciente_title_adicional}</h2>
                <Form.Group as={Row} controlId="diagnostico">
                    <FormControlDosColumnas as="textarea" rows={3} placeholder={lang.informacionDelPaciente_motivoConsulta} name="motivoConsulta" value={formState.motivoConsulta} onChange={handleChange}
                        label={lang.informacionDelPaciente_motivoConsulta} />
                    <FormControlDosColumnas as="textarea" rows={3} placeholder={lang.informacionDelPaciente_observaciones} name="observaciones" value={formState.observaciones} onChange={handleChange}
                        label={lang.informacionDelPaciente_observaciones} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {paciente ? lang.editar : lang.guardar}
                </Button>
            </Form>
        </Card>
    );
}

export default FormPaciente;