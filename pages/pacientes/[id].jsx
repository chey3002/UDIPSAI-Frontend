/* eslint-disable @next/next/no-img-element */
import { useUserContext } from '@/assets/useUserContext';
import MenuWrapper from '@/components/sidebar'
import { toIndex } from '@/utils/toindex/toindex';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Row } from 'react-bootstrap'
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation'


export default function DetailPaciente({ paciente }) {
    const { user } = useUserContext();

    useEffect(() => {
        toIndex(user);
    }, [user]);
    const { t } = useTranslation('home');
    const lang = t;
    if (paciente === null) {
        return (
            <MenuWrapper setLang={true} >
                <Card>
                    <Card.Header>
                        <h1>Detalle del Paciente</h1>
                    </Card.Header>
                    <Card.Body>
                        <h3>No se encontró el paciente</h3>
                    </Card.Body>
                </Card>
            </MenuWrapper>
        )
    }
    return (
        <MenuWrapper setLang={true} >
            <Card>
                <Card.Header>
                    <h1>{lang('informacionDelPaciente_title')} {paciente.id}</h1>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <div className="col-md-3">
                            <Row className='flex justify-content-center align-content-center'>
                                <img src={paciente.imagen ? `data:image/jpeg;base64, ${paciente.imagen}` : 'https://as1.ftcdn.net/v2/jpg/01/28/56/34/1000_F_128563441_kn96kL8fUOtfZlBRBV4kATepeGXuiLzI.jpg'}
                                    style={{ objectFit: 'cover', borderRadius: '15px', border: '3px solid #0044ff', marginLeft: "auto" }}
                                    alt="avatar"
                                    width="240"
                                    height="300" />
                            </Row>
                            <Row style={{
                                marginTop: "10px"
                            }}>
                                <Link href={`/pacientes/edit/${paciente.id}`} className='btn btn-success' variant="success" style={{ marginRight: "5px" }}>{lang('editar')}</Link>
                                <Link href="/pacientes" className='btn btn-danger' variant="danger" style={{ marginTop: "10px" }}>{lang('eliminar')}</Link>
                            </Row>
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-6">
                                    <Card>
                                        <CardHeader>
                                            <h3>{lang('informacionDelPaciente_personal')}</h3>
                                        </CardHeader>
                                        <CardBody>
                                            <p><strong>{lang('informacionDelPaciente_fechaApertura')}</strong> {paciente.fechaApertura}</p>
                                            <p><strong>{lang('informacionDelPaciente_proyecto')} </strong> {paciente.proyecto}</p>
                                            <p><strong>{lang('informacionDelPaciente_nombre')}</strong> {paciente.nombresApellidos}</p>
                                            <p><strong>{lang('informacionDelPaciente_ciudad')}</strong> {paciente.ciudad}</p>
                                            <p><strong>{lang('informacionDelPaciente_fechaNacimiento')}</strong> {paciente.fechaNacimiento}</p>
                                            <p><strong>{lang('informacionDelPaciente_edad')}</strong> {paciente.edad}</p>
                                            <p><strong>{lang('informacionDelPaciente_cedula')}</strong> {paciente.cedula}</p>
                                            <p><strong>{lang('informacionDelPaciente_domicilio')}</strong> {paciente.domicilio}</p>
                                            <p><strong>{lang('informacionDelPaciente_telefono')}</strong> {paciente.telefono}</p>
                                            <p><strong>{lang('informacionDelPaciente_celular')}</strong> {paciente.celular}</p>
                                        </CardBody>
                                    </Card>

                                </div>
                                <div className="col-md-6">
                                    <Card>
                                        <CardHeader>
                                            <h3>{lang('informacionDelPaciente_title_educativa')}</h3>
                                        </CardHeader>
                                        <CardBody>
                                            <p><strong>{lang('informacionDelPaciente_institucionEducativa')}</strong> {paciente.institucionEducativa}</p>
                                            <p><strong>{lang('informacionDelPaciente_tipoInstitucion')}</strong> {paciente.tipoInstitucion}</p>
                                            <p><strong>{lang('informacionDelPaciente_jornada')}</strong> {paciente.jornada}</p>
                                            <p><strong>{lang('informacionDelPaciente_anioEducacion')}</strong> {paciente.anioEducacion}</p>
                                            <p><strong>{lang('informacionDelPaciente_direccionInstitucion')}</strong> {paciente.direccionInstitucion}</p>
                                            <p><strong>{lang('informacionDelPaciente_paralelo')}</strong> {paciente.paralelo}</p>
                                            <p><strong>{lang('informacionDelPaciente_presentaDiscapacidad')}</strong> {paciente.tieneDiscapacidad}</p>
                                            <p><strong>{lang('informacionDelPaciente_diagnostico')}</strong> {paciente.portadorCarnet ? 'Sí' : 'No'}</p>
                                            <p><strong>{lang('informacionDelPaciente_title_adicional')}</strong> {paciente.diagnostico}</p>
                                            <p><strong>{lang('informacionDelPaciente_perteneceInclusion')}</strong> {paciente.perteneceInclusion}</p>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div className="col-md-6">
                                    <Card>
                                        <CardHeader>
                                            <h3>{lang('informacionDelPaciente_motivoConsulta')}</h3>
                                        </CardHeader>
                                        <CardBody>
                                            <p><strong>{lang('informacionDelPaciente_observaciones')}</strong> {paciente.motivoConsulta}</p>
                                            <p><strong>{lang('informacionDelPaciente_perteneceInclusion')}</strong> {paciente.observaciones}</p>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>


                        </div>
                    </Row>
                </Card.Body>
            </Card>
        </MenuWrapper>
    )
}
export const getServerSideProps = async (context) => {
    const res = await axios.get(process.env['HOST'] + 'api/pacientes/listar/' + context.query.id)
    if (res.data === null) {
        return {
            props: {
                paciente: null
            }
        }
    }
    return {
        props: {
            paciente: res.data
        }
    }
}