import { useUserContext } from '@/assets/useUserContext';
import FormPaciente from '@/components/pacientes/patientForm'
import MenuWrapper from '@/components/sidebar'
import { toIndex } from '@/utils/toindex/toindex';
import React, { useEffect, useState } from 'react'
import { informacionDelPaciente as esp } from "@/assets/lenguajes/esp.js";
import { informacionDelPaciente as eng } from "@/assets/lenguajes/eng.js";
import { Card } from 'react-bootstrap';

export default function EditarPaciente({ paciente }) {
    const { user } = useUserContext();

    useEffect(() => {
        toIndex(user);
    }, [user]);
    const [lang, setLang] = useState(esp);
    if (paciente === null) {
        return (
            <MenuWrapper setLang={setLang} esp={esp} eng={eng}>
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
        <MenuWrapper setLang={setLang} esp={esp} eng={eng}>
            <FormPaciente paciente={paciente} lang={lang} />
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
            tipoInstitucion: 2,
            jornada: 2,
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