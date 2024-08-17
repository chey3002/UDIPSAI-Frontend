
import axios from 'axios';
const pacientesUpload = async (formData, message) => {
    try {
        const response = await axios.post(process.env['BASE_URL'] + "api/pacientes/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        message.error('Error al subir el archivo: ' + error.message);
    }

}
const especialistasPasantes = async (message) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}api/especialistas/pasantes`);
        return response;
    } catch (error) {
        console.log(error);
        message.error('Error al obtener los especialistas: ' + error.message)
    }
}
const pacientesBuscar = async (formData, message) => {
    try {
        const response = await axios.post(`${process.env.BASE_URL}api/pacientes/buscar`, formData);
        return response;
    } catch (error) {
        console.log(error);
        message.error('Error al buscar pacientes: ' + error.message)
    }
};
const sedesListar = async (message) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}api/sedes/listar`);
        return response;
    } catch (error) {
        console.log(error);
        message.error('Error al obtener las sedes: ' + error.message)
    }
};
const asignacionesPasante = async (cedula, message) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}api/asignaciones/pasante/${cedula}`);
        return response;
    } catch (error) {
        console.log(error);
        message.error('Error al obtener las asignaciones del pasante: ' + error.message)
    }
};
const asignacionesAsignar = async (pacienteId, pasanteId, message) => {
    try {
        const response = await axios.post(`${process.env.BASE_URL}api/asignaciones/asignar`, {
            pacienteId,
            pasanteId
        });
        return response;
    } catch (error) {
        console.log(error);
        message.error('Error al asignar el paciente: ' + error.message)
    }
}
const asignacionesEliminar = async (asignacionId, message, setLoading) => {
    try {
        const response = await axios.delete(`${process.env.BASE_URL}api/asignaciones/eliminar/${asignacionId}`);
        return response;
    } catch (error) {
        console.log(error);
        message.error('Error al eliminar la asignación: ' + error.message)
        setLoading(false)
    }
}
const loginAPI = async (values, setShow, setLoading, setUser) => {
    await axios.post(process.env['BASE_URL'] + 'api/especialistas/login', values)
        .then((response) => {
            console.log(response);
            const usuario = { ...response.data };
            setUser({
                ...usuario,
                username: usuario.primerNombre + " " + usuario.primerApellido,
            });
        }).catch((error) => {
            console.log(error);
            setShow(true);
            setLoading(false);
        });

}
const institucionesListar = async (message) => {
    try {
        const response = await axios.get(`${process.env['BASE_URL']}api/instituciones/listar`);
        return response;
    } catch (error) {
        console.log(error);
        message.error('Error al obtener las instituciones: ' + error.message)
    }
}
const pacientesActualizar = async (id, request, message) => {
    await axios.put(process.env['BASE_URL'] + 'api/pacientes/actualizar/' + id, request)
        .then(() => {
            window.location.href = '/pacientes'
        }).catch((error) => {
            console.log(error)
            message.error('Error al actualizar el paciente: ' + error.message)
        });
}
const pacientesCrear = async (request, message) => {
    await axios.post(process.env['BASE_URL'] + 'api/pacientes/insertar', request)
        .then((response) => {
            console.log(response);
            window.location.href = '/pacientes';
        }).catch((error) => {
            console.log(error);
            message.error('Error al crear el paciente: ' + error.message);
        });
}
export {
    pacientesUpload, especialistasPasantes,
    pacientesBuscar, sedesListar,
    asignacionesPasante, asignacionesAsignar,
    asignacionesEliminar, loginAPI,
    institucionesListar, pacientesActualizar,
    pacientesCrear
};