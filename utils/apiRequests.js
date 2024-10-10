import axios from 'axios';
//axios headers
const token = process.env['APIKEY']
axios.defaults.headers.common['access-token-udipsai'] = token
const pacientesUpload = async (formData, message) => {
    try {
        const response = await axios.post(process.env['APIURL'] + "api/pacientes/upload", formData, {
            headers: {
                'access-token-udipsai': token,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        message.error('Error al subir el archivo: ' + error.message);
        return { data: [] };
    }

}
const especialistasPasantes = async (message) => {
    try {
        const response = await axios.get(`${process.env.APIURL}api/especialistas/pasantes`);
        return response;
    } catch (error) {
        //console.log(error);
        message.error('Error al obtener los especialistas: ' + error.message)
        return { data: [] };
    }
}
const pacientesBuscar = async (formData, message) => {
    try {
        const response = await axios.post(`${process.env.APIURL}api/pacientes/buscar`, formData);
        return response;
    } catch (error) {
        //console.log(error);
        message.error('Error al buscar pacientes: ' + error.message)
        return { data: [] };
    }
};
const asignacionesBuscar = async (formData, message) => {
    try {
        const response = await axios.post(process.env['APIURL'] + 'api/asignaciones/buscar', formData);
        return response;
    } catch (error) {
        //console.log(error);
        message.error('Error al buscar pacientes: ' + error.message)
        return { data: [] };
    }
}
const sedesListar = async (message) => {
    try {
        const response = await axios.get(`${process.env.APIURL}api/sedes/listar`);
        return response;
    } catch (error) {
        //console.log(error);
        message.error('Error al obtener las sedes: ' + error.message)
        return { data: [] };
    }
};
const asignacionesPasante = async (cedula, message) => {
    try {
        const response = await axios.get(`${process.env.APIURL}api/asignaciones/pasante/${cedula}`);
        return response;
    } catch (error) {
        //console.log(error);
        message.error('Error al obtener las asignaciones del pasante: ' + error.message)
        return { data: [] };
    }
};
const asignacionesAsignar = async (pacienteId, pasanteId, message) => {
    try {
        const response = await axios.post(`${process.env.APIURL}api/asignaciones/asignar`, {
            pacienteId,
            pasanteId
        });
        return response;
    } catch (error) {
        //console.log(error);
        message.error('Error al asignar el paciente: ' + error.message)
        return { data: [] };
    }
}
const asignacionesEliminar = async (asignacionId, message, setLoading) => {
    try {
        const response = await axios.delete(`${process.env.APIURL}api/asignaciones/eliminar/${asignacionId}`);
        return response;
    } catch (error) {
        //console.log(error);
        message.error('Error al eliminar la asignación: ' + error.message)
        setLoading(false)
        return { data: [] };
    }
}
const loginAPI = async (values, setShow, setLoading, setUser) => {
    await axios.post(process.env['APIURL'] + 'api/especialistas/login', values)
        .then((response) => {
            //console.log(response);
            const usuario = { ...response.data };
            setUser({
                ...usuario,
                username: usuario.primerNombre + " " + usuario.primerApellido,
            });
        }).catch((error) => {
            //console.log(error);
            setShow(true);
            setLoading(false);
        });

}
const institucionesListar = async (message) => {
    try {
        const response = await axios.get(`${process.env['APIURL']}api/instituciones/listar`);
        return response;
    } catch (error) {
        //console.log(error);
        message.error('Error al obtener las instituciones: ' + error.message)
        return { data: [] };
    }
}
const pacientesActualizar = async (id, request, message) => {
    await axios.put(process.env['APIURL'] + 'api/pacientes/actualizar/' + id, request)
        .then(() => {
            window.location.href = '/pacientes/' + id;
        }).catch((error) => {
            //console.log(error)
            message.error('Error al actualizar el paciente: ' + error.message)
        });
}
const pacientesCrear = async (request, message) => {
    await axios.post(process.env['APIURL'] + 'api/pacientes/insertar', request)
        .then((response) => {
            //console.log(response);
            window.location.href = '/pacientes';
        }).catch((error) => {
            //console.log(error);
            message.error('Error al crear el paciente: ' + error.message);
        });
}
const institucionesActualizar = async (id, request, message) => {
    await axios.put(process.env['APIURL'] + 'api/instituciones/actualizar/' + id, request)
        .then(() => {
        }).catch((error) => {
            //console.log(error);
            message.error('Error al actualizar la institución: ' + error.message);
        });
}
const institucionesCrear = async (request, message) => {
    await axios.post(process.env['APIURL'] + 'api/instituciones/insertar', request)
        .then((response) => {
            //console.log(response);
        }).catch((error) => {
            //console.log(error);
            message.error('Error al crear la institución: ' + error.message)
        });
}
const institucionesEliminar = async (id, message) => {
    try {
        await axios.delete(`${process.env['APIURL']}api/instituciones/eliminar/${id}`);
        message.success('Institución eliminada correctamente');
    } catch (error) {
        message.error('Error al eliminar la institución: ' + error.message);
        console.error(error);
    }
}
const especialistasNoPasantesListar = async (message) => {
    try {
        const response = await axios.get(`${process.env['APIURL']}api/especialistas/activos/nopasantes`);
        return response
    } catch (error) {
        console.error('Error fetching especialistas:', error);
        message.error('Error al obtener los especialistas: ' + error.message);
        return { data: [] };
    }
}
const especialistasUpdate = async (id, request, message) => {
    await axios.put(process.env['APIURL'] + 'api/especialistas/actualizar/' + id, request)
        .then((res) => {
            //console.log(res);
            if (res.status === 200) {
                window.location.href = '/registro/' + id;

            } else {
                //console.log('Error updating especialista')
                message.error('Error al actualizar el especialista: ' + res)
            }
        }).catch((error) => {
            //console.log(error);
            message.error('Error al actualizar el especialista: ' + error.message)
        });
}
const especialistasCrear = async (request, message) => {
    await axios.post(process.env['APIURL'] + 'api/especialistas/insertar', request)
        .then((response) => {
            //console.log(response);
            window.location.href = '/registro';
        }).catch((error) => {
            //console.log(error);
        });
}
const pacienteById = async (id, message) => {
    try {
        const response = await axios.get(`${process.env['APIURL']}api/pacientes/listar/${id}`);
        return response;
    } catch (error) {
        //console.log(error);
        return { data: null };
    }
}
const pacientesEliminar = async (id, message) => {
    try {
        await axios.delete(process.env['APIURL'] + `api/pacientes/eliminar/${id}`);
        message.success('Paciente eliminado correctamente');
    } catch (error) {
        message.error('Error al eliminar el paciente: ' + error.message);
        console.error(error);
    }
}
const pacientesFichaDiagnostica = async (id, formData, message) => {
    try {
        //console.log(formData);

        const resp = await axios.post(process.env['APIURL'] + `api/pacientes/${id}/documento`, formData, {
            headers: {
                'access-token-udipsai': token,

                'Content-Type': 'multipart/form-data',
            },
        });
        //console.log(resp);

        return resp;
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        message.error('Error al subir el archivo: ' + error.message);
        return { data: [] };
    }
}
const pacientesFichaCompromiso = async (id, formData, message) => {
    try {
        const response = await axios.post(process.env['APIURL'] + `api/pacientes/${id}/fichaCompromiso`, formData, {
            headers: {
                'access-token-udipsai': token,

                'Content-Type': 'multipart/form-data',
            },

        });
        return response;
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        message.error('Error al subir el archivo: ' + error.message);
        return { data: [] };
    }
}
const documentoGet = async (documentoId, message) => {
    try {
        //console.log(documentoId);

        const response = await axios.get(process.env['APIURL'] + `api/documentos/${documentoId}/contenido`);
        //console.log(response);

        return response;
    } catch (error) {
        message.error('Error al obtener el documento: ' + error.message);
        //console.log(error);
        return null;
    }
}
const pacienteFichaDiagnosticaDelete = async (documentoId, message) => {
    try {
        //console.log(documentoId);

        await axios.delete(process.env['APIURL'] + `api/pacientes/documentos/${documentoId}`);
    } catch (error) {
        message.error('Error al eliminar el documento: ' + error.message);
        //console.log(error);
    }
}
const pacienteFichaCompromisoDelete = async (documentoId, message) => {
    try {
        await axios.delete(process.env['APIURL'] + `api/pacientes/fichaCompromiso/${documentoId}`);
    } catch (error) {
        message.error('Error al eliminar el documento: ' + error.message);
        //console.log(error);
    }
}
const historialDeCambios = async (id, message) => {
    try {
        const response = await axios.get(process.env['APIURL'] + `api/historial-cambios/listar/todos/${id}`);
        return response;
    } catch (error) {
        message.error('Error al obtener el historial de cambios: ' + error.message);
        console.error(error);
        return { data: [] };
    }
}
const especialistasById = async (id, message) => {
    //console.log(id)
    try {
        const res = await axios.get(process.env['APIURL'] + 'api/especialistas/' + id).then(async res => {
            //console.log(res)
            let especialistaAsignado = null
            if (res.data.especialistaAsignado) {
                //console.log(res.data)
                especialistaAsignado = await axios.get(process.env['APIURL'] + 'api/especialistas/' + res.data.especialistaAsignado).then(
                    res => {
                        //console.log(res.data)
                        return res.data
                    }
                )
            }
            //console.log(especialistaAsignado)
            return { ...res.data, especialistaAsignado: especialistaAsignado }

        })
        return res
    } catch (error) {
        console.error(error);
        return null;
    }
}
const especialistasActivos = async (message) => {
    try {
        const response = await axios.get(process.env['APIURL'] + 'api/especialistas/activos')
        return response;
    } catch (error) {
        console.error('Error fetching especialistas:', error);
        message.error('Error al obtener los especialistas: ' + error.message);
        return { data: [] };
    }
}
const especialistasDelete = async (id, message) => {
    try {
        await axios.delete(process.env['APIURL'] + `api/especialistas/${id}`);
    } catch (error) {
        message.error('Error al eliminar el especialista: ' + error.message);
        console.error(error);
    }
}
const fichaMedicaActualizar = async (id, request, message) => {
    try {
        await axios.put(`${process.env['APIURL']}api/fichas-medicas/${id}`, request);
    } catch (error) {
        console.error(error);
    }
}
const fichaMedicaById = async (id) => {
    try {
        const response = await axios.get(`${process.env['APIURL']}api/fichas-medicas/paciente/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const fichaMedicaPDF = async (id, message) => {
    try {
        const response = await axios.get(`${process.env['APIURL']}api/fichas-medicas/${id}/reporte`, {
            responseType: 'blob',
            headers: {
                'access-token-udipsai': token,

                'Content-Type': 'application/pdf',
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        message.error('Error al obtener el reporte de la ficha médica: ' + error.message)
        return null;
    }
}
const sedesActualizar = async (id, request, message) => {
    try {
        await axios.put(`${process.env['APIURL']}api/sedes/actualizar/${id}`, request);
    } catch (error) {
        message.error('Error al actualizar la sede: ' + error.message);
        console.error(error);
    }
}
const sedesCrear = async (request, message) => {
    try {
        await axios.post(`${process.env['APIURL']}api/sedes/insertar`, request);
    } catch (error) {
        message.error('Error al crear la sede: ' + error.message);
        console.error(error);
    }
}
const sedesEliminar = async (id, message) => {
    try {
        await axios.delete(`${process.env['APIURL']}api/sedes/eliminar/${id}`);
    } catch (error) {
        console.error(error);
    }
}
const seguimientosPacienteListar = async (id) => {
    try {
        const response = await axios.get(`${process.env['APIURL']}api/seguimientos/paciente/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return { data: [] };
    }
}
const seguimientosActualizar = async (id, request, message) => {
    try {
        await axios.put(`${process.env['APIURL']}api/seguimientos/${id}`, request);
    } catch (error) {
        message.error('Error al actualizar el seguimiento: ' + error.message);
        console.error(error);
    }
}
const seguimientosCrear = async (request, message) => {
    try {
        await axios.post(`${process.env['APIURL']}api/seguimientos`, request);

    } catch (error) {
        message.error('Error al crear el seguimiento: ' + error.message);
        console.error(error);
    }
}
const seguimientosDelete = async (id, message) => {
    try {
        await axios.delete(`${process.env['APIURL']}api/seguimientos/${id}`);
    } catch (error) {
        message.error('Error al eliminar el seguimiento: ' + error.message);
        console.error(error);
    }
}
const seguimientosUploadFile = async (id, formData, message) => {
    try {
        const response = await axios.post(process.env['APIURL'] + `api/seguimientos/${id}/documento`, formData, {
            headers: {
                'access-token-udipsai': token,

                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        message.error('Error al subir el archivo: ' + error.message);
        console.error(error);
    }
}
const seguimientosDeleteFile = async (id, message) => {
    try {
        await axios.delete(process.env['APIURL'] + `api/seguimientos/documento/${id}`);
    } catch (error) {
        message.error('Error al eliminar el archivo: ' + error.message);
        console.error(error);
    }
}
const testPaciientes = async (id, message) => {
    try {
        const response = await axios.get(process.env['APIURL'] + `api/tests/paciente/${id}`);
        return response;
    } catch (error) {
        message.error('Error al obtener los tests: ' + error.message);
        console.error(error);
        return { data: [] };
    }
}
const testSubir = async (request, message) => {
    try {
        await axios.post(process.env['APIURL'] + 'api/tests', request, {
            headers: {
                'access-token-udipsai': token,
                'Content-Type': 'multipart/form-data',
            },
        }
        );
        message.success('Test subido correctamente');

    } catch (error) {
        message.error('Error al subir el test: ' + error.message);
        console.error(error);
    }
}
const testEliminar = async (id, message) => {
    try {
        await axios.delete(process.env['APIURL'] + `api/tests/${id}`);
        message.success('Test eliminado correctamente');
    } catch (error) {
        message.error('Error al eliminar el test: ' + error.message);
        console.error(error);
    }
}
const fichaPsicologiaEducativaById = async (id) => {
    try {
        const response = await axios.get(process.env['APIURL'] + `api/psicologia-educativa/paciente/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return { data: [] };
    }
}
const fichaPsicologiaEducativaActualizar = async (id, request, message) => {
    //console.log(request);
    try {
        await axios.put(`${process.env['APIURL']}api/psicologia-educativa/${id}`, request);
    } catch (error) {
        message.error('Error al actualizar la ficha de psicología educativa: ' + error.message);
        console.error(error);
    }
}
const psicologiaEducativaPDF = async (id, message) => {
    try {
        const response = await axios.get(`${process.env['APIURL']}api/psicologia-educativa/${id}/reporte`, {
            responseType: 'blob',
            headers: {
                'access-token-udipsai': token,

                'Content-Type': 'application/pdf',
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        message.error('Error al obtener el reporte de la ficha de psicología educativa: ' + error.message)
        return null;
    }
}
const reporteGeneralPDF = async (id, message) => {
    try {
        const response = await axios.get(`${process.env['APIURL']}api/pacientes/${id}/reporte-general`, {
            responseType: 'blob',
            headers: {
                'access-token-udipsai': token,
                'Content-Type': 'application/pdf',
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        message.error('Error al obtener el reporte General del paciente: ' + error.message)
        return null;
    }
}
const fichaPsicologiaClinicaById = async (id) => {
    try {
        const response = await axios.get(process.env['APIURL'] + `api/psicologia-clinica/paciente/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return { data: [] };
    }
}
const fichaPsicologiaClinicaActualizar = async (id, request, message) => {
    //console.log(request);
    try {
        await axios.put(`${process.env['APIURL']}api/psicologia-clinica/${id}`, request);
    } catch (error) {
        message.error('Error al actualizar la ficha de psicología clínica: ' + error.message);
        console.error(error);
    }
}
const psicologiaClinicaPDF = async (id, message) => {
    try {
        const response = await axios.get(`${process.env['APIURL']}api/psicologia-clinica/${id}/reporte`, {
            responseType: 'blob',
            headers: {
                'access-token-udipsai': token,

                'Content-Type': 'application/pdf',
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        message.error('Error al obtener el reporte de la psicología clínica: ' + error.message)
        return null;
    }
}

const fichaFonoaudiologiaById = async (id) => {
    try {
        const response = await axios.get(process.env['APIURL'] + `api/fonoaudiologia/paciente/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return { data: [] };
    }
}
const fichaFonoaudiologiaActualizar = async (id, request, message) => {
    //console.log(request);
    try {
        await axios.put(`${process.env['APIURL']}api/fonoaudiologia/${id}`, request);
    } catch (error) {
        message.error('Error al actualizar la ficha de fonoaudiología: ' + error.message);
        console.error(error);
    }
}
const fonoaudiologiaPDF = async (id, message) => {
    try {
        const response = await axios.get(`${process.env['APIURL']}api/fonoaudiologia/${id}/reporte`, {
            responseType: 'blob',
            headers: {
                'access-token-udipsai': token,

                'Content-Type': 'application/pdf',
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        message.error('Error al obtener el reporte de  fonoaudiología: ' + error.message)
        return null;
    }
}
export {
    asignacionesBuscar, historialDeCambios,
    asignacionesEliminar, loginAPI,
    asignacionesPasante, asignacionesAsignar,
    especialistasById, especialistasActivos,
    especialistasCrear, pacienteById,
    especialistasDelete, fichaMedicaActualizar,
    especialistasNoPasantesListar, especialistasUpdate,
    fichaMedicaById, fichaMedicaPDF,
    institucionesCrear, institucionesEliminar,
    institucionesListar, pacientesActualizar,
    pacienteFichaDiagnosticaDelete, pacienteFichaCompromisoDelete,
    pacientesBuscar, sedesListar,
    pacientesCrear, institucionesActualizar,
    pacientesEliminar, pacientesFichaDiagnostica,
    pacientesFichaCompromiso, documentoGet,
    pacientesUpload, especialistasPasantes,
    sedesActualizar, sedesCrear,
    sedesEliminar, seguimientosPacienteListar,
    seguimientosActualizar, seguimientosCrear,
    seguimientosDelete, seguimientosUploadFile,
    seguimientosDeleteFile, testPaciientes,
    testSubir, testEliminar,
    fichaPsicologiaEducativaById, fichaPsicologiaEducativaActualizar,
    psicologiaEducativaPDF, reporteGeneralPDF,
    psicologiaClinicaPDF, fichaPsicologiaClinicaActualizar,
    fichaPsicologiaClinicaById, fichaFonoaudiologiaActualizar,
    fichaFonoaudiologiaById, fonoaudiologiaPDF
};