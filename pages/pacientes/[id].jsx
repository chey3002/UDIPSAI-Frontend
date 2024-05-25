import { useUserContext } from '@/assets/useUserContext';
import MenuWrapper from '@/components/sidebar'
import { toIndex } from '@/utils/toindex/toindex';
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Card, Row } from 'react-bootstrap'

export default function DetailPaciente({ paciente }) {
    const { user } = useUserContext();

    useEffect(() => {
        toIndex(user);
    }, [user]);
    if (paciente === null) {
        return (
            <MenuWrapper>
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
        <MenuWrapper>
            <Card>
                <Card.Header>
                    <h1>Ficha Única: {paciente.id}</h1>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <div className="col-md-3">
                            <Row className='flex justify-content-center align-content-center'>
                                <img src={paciente.imagenUrl} style={{ objectFit: 'cover', borderRadius: '15px', border: '3px solid #0044ff', marginLeft: "auto" }}
                                    alt="avatar"
                                    width="240"
                                    height="300" />
                            </Row>
                            <Row style={{
                                marginTop: "10px"
                            }}>
                                <Link href={`/pacientes/edit/${paciente.id}`} className='btn btn-success' variant="success" style={{ marginRight: "5px" }}>Editar</Link>
                                <Link href="/pacientes" className='btn btn-danger' variant="danger" style={{ marginTop: "10px" }}>Delete</Link>
                            </Row>
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-6">
                                    <h3>Información Personal</h3>
                                    <p><strong>Nombre:</strong> {paciente.nombresApellidos}</p>
                                    <p><strong>Ciudad:</strong> {paciente.ciudad}</p>
                                    <p><strong>Fecha de Nacimiento:</strong> {paciente.fechaNacimiento}</p>
                                    <p><strong>Edad:</strong> {paciente.edad}</p>
                                    <p><strong>Cédula:</strong> {paciente.cedula}</p>
                                    <p><strong>Domicilio:</strong> {paciente.domicilio}</p>
                                    <p><strong>Teléfono:</strong> {paciente.telefono}</p>
                                    <p><strong>Celular:</strong> {paciente.celular}</p>
                                </div>
                                <div className="col-md-6">
                                    <h3>Información Educativa</h3>
                                    <p><strong>Institución Educativa:</strong> {paciente.institucionEducativa}</p>
                                    <p><strong>Tipo de Institución:</strong> {paciente.tipoInstitucion}</p>
                                    <p><strong>Jornada:</strong> {paciente.jornada}</p>
                                    <p><strong>Año de Educación:</strong> {paciente.anioEduacion}</p>
                                    <p><strong>Dirección de la Institución:</strong> {paciente.direccionInstitucion}</p>
                                    <p><strong>Paralelo:</strong> {paciente.paralelo}</p>
                                    <p><strong>Discapacidad:</strong> {paciente.tieneDiscapacidad}</p>
                                    <p><strong>Portador de Carnet:</strong> {paciente.portadorCarnet ? 'Sí' : 'No'}</p>
                                    <p><strong>Tipo de Discapacidad:</strong> {paciente.tipoDiscapacidad}</p>
                                </div>
                            </div>
                            <h3>Información Adicional</h3>
                            <p><strong>Motivo de Consulta:</strong> {paciente.motivoConsulta}</p>
                            <p><strong>Observaciones:</strong> {paciente.observaciones}</p>
                            <p><strong>Educación Inclusiva:</strong> {paciente.educacionInclusiva}</p>
                        </div>
                    </Row>
                </Card.Body>
            </Card>
        </MenuWrapper>
    )
}
export const getServerSideProps = async (context) => {
    // const res = await axios.get(process.env['HOST'] + 'api/estudiantes/' + context.query.id)
    /* con el siguiente formato:
        const [formState, setFormState] = useState({
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
                    */
    const res = {
        data: [{
            id: context.query.id,
            fechaApertura: '2021-09-01',
            proyectoAlQuePertence: 'Proyecto 1',
            imagenUrl: 'https://i.pravatar.cc/300',
            nombresApellidos: 'Juan Perez',
            ciudad: 'Quito',
            fechaNacimiento: '2000-01-01',
            edad: '21',
            cedula: '1723456789',
            domicilio: 'Calle 1',
            telefono: '022345678',
            institucionEducativa: 'Colegio 1',
            tipoInstitucion: 1,
            jornada: 1,
            anioEduacion: '10',
            direccionInstitucion: 'Calle 2',
            paralelo: 'A',
            tieneDiscapacidad: 'no',
            portadorCarnet: false,
            motivoConsulta: 'Consulta',
            observaciones: 'Observaciones',
            educacionInclusiva: 'Si',
            celular: '0998765432',
            tipoDiscapacidad: 'Ninguna'
        }]

    }
    if (res.data === null) {
        return {
            props: {
                paciente: null
            }
        }
    }
    return {
        props: {
            paciente: res.data[0]
        }
    }
}