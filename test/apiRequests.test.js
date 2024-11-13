// import axios from 'axios';
// import {
//     pacientesUpload,
//     especialistasPasantes,
//     pacientesBuscar,
//     asignacionesBuscar,
//     sedesListar,
//     asignacionesPasante,
//     asignacionesAsignar,
//     asignacionesEliminar,
//     loginAPI,
//     institucionesListar,
//     pacientesActualizar,
//     pacientesCrear,
//     institucionesActualizar,
//     institucionesCrear,
//     institucionesEliminar,
//     especialistasNoPasantesListar,
//     especialistasUpdate,
//     especialistasCrear,
//     pacienteById,
//     pacientesEliminar,
//     pacientesFichaDiagnostica,
//     pacientesFichaCompromiso,
//     documentoGet,
//     pacienteFichaDiagnosticaDelete,
//     pacienteFichaCompromisoDelete,
//     historialDeCambios,
//     especialistasById,
//     especialistasActivos,
//     especialistasDelete,
//     fichaMedicaActualizar,
//     fichaMedicaById,
//     fichaMedicaPDF,
//     sedesActualizar,
//     sedesCrear,
//     sedesEliminar,
//     seguimientosPacienteListar,
//     seguimientosActualizar,
//     seguimientosCrear,
//     seguimientosDelete,
//     seguimientosUploadFile,
//     seguimientosDeleteFile,
//     testPaciientes,
//     testSubir,
//     testEliminar,
//     fichaPsicologiaEducativaById,
//     fichaPsicologiaEducativaActualizar,
//     psicologiaEducativaPDF,
//     reporteGeneralPDF,
//     psicologiaClinicaPDF,
//     fichaPsicologiaClinicaActualizar,
//     fichaPsicologiaClinicaById,
//     fichaFonoaudiologiaActualizar,
//     fichaFonoaudiologiaById,
//     fonoaudiologiaPDF
// } from '../utils/apiRequests';

// jest.mock('axios');

// describe('API Requests', () => {
//     let message;

//     beforeEach(() => {
//         message = {
//             error: jest.fn(),
//             success: jest.fn(),
//         };
//     });

//     describe('pacientesUpload', () => {
//         it('should upload pacientes successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await pacientesUpload(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(
//                 process.env['APIURL'] + "api/pacientes/upload",
//                 formData,
//                 {
//                     headers: {
//                         'access-token-udipsai': process.env['APIKEY'],
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 }
//             );
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when uploading pacientes', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await pacientesUpload(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(
//                 process.env['APIURL'] + "api/pacientes/upload",
//                 formData,
//                 {
//                     headers: {
//                         'access-token-udipsai': process.env['APIKEY'],
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 }
//             );
//             expect(message.error).toHaveBeenCalledWith('Error al subir el archivo: ' + error.message);
//         });
//     });

//     describe('especialistasPasantes', () => {
//         it('should fetch especialistas pasantes successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await especialistasPasantes(message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/pasantes`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when fetching especialistas pasantes', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await especialistasPasantes(message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/pasantes`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener los especialistas: ' + error.message);
//         });
//     });

//     describe('pacientesBuscar', () => {
//         it('should search pacientes successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await pacientesBuscar(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/buscar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when searching pacientes', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await pacientesBuscar(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/buscar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al buscar pacientes: ' + error.message);
//         });
//     });

//     describe('asignacionesBuscar', () => {
//         it('should search asignaciones successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await asignacionesBuscar(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(process.env['APIURL'] + 'api/asignaciones/buscar', formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when searching asignaciones', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await asignacionesBuscar(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(process.env['APIURL'] + 'api/asignaciones/buscar', formData);
//             expect(message.error).toHaveBeenCalledWith('Error al buscar pacientes: ' + error.message);
//         });
//     });

//     describe('sedesListar', () => {
//         it('should list sedes successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await sedesListar(message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/sedes/listar`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when listing sedes', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await sedesListar(message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/sedes/listar`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener las sedes: ' + error.message);
//         });
//     });
//     describe('asignacionesPasante', () => {
//         it('should fetch asignaciones pasante successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await asignacionesPasante(1, message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/asignaciones/pasante/1`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when fetching asignaciones pasante', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await asignacionesPasante(1, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/asignaciones/pasante/1`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener las asignaciones del pasante: ' + error.message);
//         });
//     });
//     describe('asignacionesAsignar', () => {
//         it('should assign paciente successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await asignacionesAsignar(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/asignaciones/asignar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when assigning paciente', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await asignacionesAsignar(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/asignaciones/asignar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al asignar paciente: ' + error.message);
//         });
//     });
//     describe('asignacionesEliminar', () => {
//         it('should delete asignacion successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await asignacionesEliminar(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/asignaciones/eliminar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when deleting asignacion', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await asignacionesEliminar(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/asignaciones/eliminar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al eliminar asignación: ' + error.message);
//         });
//     });
//     describe('loginAPI', () => {
//         it('should login successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await loginAPI(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/login`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when logging in', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await loginAPI(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/login`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al iniciar sesión: ' + error.message);
//         });
//     });
//     describe('institucionesListar', () => {
//         it('should list instituciones successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await institucionesListar(message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/instituciones/listar`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when listing instituciones', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await institucionesListar(message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/instituciones/listar`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener las instituciones: ' + error.message);
//         });
//     });
//     describe('pacientesActualizar', () => {
//         it('should update paciente successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await pacientesActualizar(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/actualizar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when updating paciente', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await pacientesActualizar(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/actualizar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al actualizar paciente: ' + error.message);
//         });
//     });
//     describe('pacientesCrear', () => {
//         it('should create paciente successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await pacientesCrear(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/crear`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when creating paciente', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await pacientesCrear(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/crear`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al crear paciente: ' + error.message);
//         });
//     });
//     describe('institucionesActualizar', () => {
//         it('should update institucion successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await institucionesActualizar(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/instituciones/actualizar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when updating institucion', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await institucionesActualizar(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/instituciones/actualizar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al actualizar institución: ' + error.message);
//         });
//     })
//     describe('institucionesCrear', () => {
//         it('should create institucion successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await institucionesCrear(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/instituciones/crear`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when creating institucion', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await institucionesCrear(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/instituciones/crear`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al crear institución: ' + error.message);
//         });
//     });
//     describe('institucionesEliminar', () => {
//         it('should delete institucion successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await institucionesEliminar(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/instituciones/eliminar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when deleting institucion', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await institucionesEliminar(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/instituciones/eliminar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al eliminar institución: ' + error.message);
//         });
//     });
//     describe('especialistasNoPasantesListar', () => {
//         it('should list especialistas no pasantes successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await especialistasNoPasantesListar(message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/nopasantes`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when listing especialistas no pasantes', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await especialistasNoPasantesListar(message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/nopasantes`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener los especialistas: ' + error.message);
//         });
//     });
//     describe('especialistasUpdate', () => {
//         it('should update especialista successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await especialistasUpdate(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/actualizar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when updating especialista', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await especialistasUpdate(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/actualizar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al actualizar especialista: ' + error.message);
//         });
//     });
//     describe('especialistasCrear', () => {
//         it('should create especialista successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await especialistasCrear(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/crear`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when creating especialista', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await especialistasCrear(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/crear`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al crear especialista: ' + error.message);
//         });
//     });
//     describe('pacienteById', () => {
//         it('should get paciente by id successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await pacienteById(1, message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/1`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when getting paciente by id', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await pacienteById(1, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/1`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener el paciente: ' + error.message);
//         });
//     });
//     describe('pacientesEliminar', () => {
//         it('should delete paciente successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await pacientesEliminar(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/eliminar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when deleting paciente', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await pacientesEliminar(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/eliminar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al eliminar paciente: ' + error.message);
//         });
//     });
//     describe('pacientesFichaDiagnostica', () => {
//         it('should get paciente ficha diagnostica successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await pacientesFichaDiagnostica(1, message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/fichadiagnostica/1`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when getting paciente ficha diagnostica', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await pacientesFichaDiagnostica(1, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/fichadiagnostica/1`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener la ficha diagnostica: ' + error.message);
//         });
//     });
//     describe('pacientesFichaCompromiso', () => {
//         it('should get paciente ficha compromiso successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await pacientesFichaCompromiso(1, message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/fichacompromiso/1`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when getting paciente ficha compromiso', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await pacientesFichaCompromiso(1, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/fichacompromiso/1`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener la ficha compromiso: ' + error.message);
//         });
//     });
//     describe('documentoGet', () => {
//         it('should get documento successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await documentoGet(1, message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/documento/1`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when getting documento', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await documentoGet(1, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/documento/1`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener el documento: ' + error.message);
//         });
//     });
//     describe('pacienteFichaDiagnosticaDelete', () => {
//         it('should delete paciente ficha diagnostica successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await pacienteFichaDiagnosticaDelete(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/fichadiagnostica/eliminar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when deleting paciente ficha diagnostica', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await pacienteFichaDiagnosticaDelete(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/fichadiagnostica/eliminar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al eliminar la ficha diagnostica: ' + error.message);
//         });
//     });
//     describe('pacienteFichaCompromisoDelete', () => {
//         it('should delete paciente ficha compromiso successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await pacienteFichaCompromisoDelete(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/fichacompromiso/eliminar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when deleting paciente ficha compromiso', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await pacienteFichaCompromisoDelete(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/pacientes/fichacompromiso/eliminar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al eliminar la ficha compromiso: ' + error.message);
//         });
//     });
//     describe('historialDeCambios', () => {
//         it('should get historial de cambios successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await historialDeCambios(1, message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/historial/1`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when getting historial de cambios', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await historialDeCambios(1, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/historial/1`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener el historial de cambios: ' + error.message);
//         });
//     });
//     describe('especialistasById', () => {
//         it('should get especialista by id successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await especialistasById(1, message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/1`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when getting especialista by id', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await especialistasById(1, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/1`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener el especialista: ' + error.message);
//         });
//     });
//     describe('especialistasActivos', () => {
//         it('should list especialistas activos successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await especialistasActivos(message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/activos`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when listing especialistas activos', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await especialistasActivos(message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/activos`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener los especialistas: ' + error.message);
//         });
//     });
//     describe('especialistasDelete', () => {
//         it('should delete especialista successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await especialistasDelete(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/eliminar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when deleting especialista', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await especialistasDelete(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/especialistas/eliminar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al eliminar especialista: ' + error.message);
//         });
//     });
//     describe('fichaMedicaActualizar', () => {
//         it('should update ficha medica successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await fichaMedicaActualizar(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/fichamedica/actualizar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when updating ficha medica', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await fichaMedicaActualizar(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/fichamedica/actualizar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al actualizar la ficha médica: ' + error.message);
//         });
//     });
//     describe('fichaMedicaById', () => {
//         it('should get ficha medica by id successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await fichaMedicaById(1, message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/fichamedica/1`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when getting ficha medica by id', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await fichaMedicaById(1, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/fichamedica/1`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener la ficha médica: ' + error.message);
//         });
//     });
//     describe('fichaMedicaPDF', () => {
//         it('should get ficha medica pdf successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await fichaMedicaPDF(1, message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/fichamedica/pdf/1`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when getting ficha medica pdf', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await fichaMedicaPDF(1, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/fichamedica/pdf/1`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener el PDF de la ficha médica: ' + error.message);
//         });
//     });
//     describe('sedesActualizar', () => {
//         it('should update sede successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await sedesActualizar(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/sedes/actualizar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when updating sede', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await sedesActualizar(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/sedes/actualizar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al actualizar la sede: ' + error.message);
//         });
//     });
//     describe('sedesCrear', () => {
//         it('should create sede successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await sedesCrear(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/sedes/crear`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when creating sede', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await sedesCrear(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/sedes/crear`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al crear la sede: ' + error.message);
//         });
//     });
//     describe('sedesEliminar', () => {
//         it('should delete sede successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await sedesEliminar(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/sedes/eliminar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when deleting sede', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await sedesEliminar(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/sedes/eliminar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al eliminar la sede: ' + error.message);
//         });
//     });
//     describe('seguimientosPacienteListar', () => {
//         it('should list seguimientos paciente successfully', async () => {
//             const response = { data: 'success' };
//             axios.get.mockResolvedValue(response);

//             const result = await seguimientosPacienteListar(1, message);

//             expect(result).toEqual(response);
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/seguimientos/paciente/1`);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when listing seguimientos paciente', async () => {
//             const error = new Error('Network Error');
//             axios.get.mockRejectedValue(error);

//             const result = await seguimientosPacienteListar(1, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.get).toHaveBeenCalledWith(`${process.env.APIURL}api/seguimientos/paciente/1`);
//             expect(message.error).toHaveBeenCalledWith('Error al obtener los seguimientos: ' + error.message);
//         });
//     });
//     describe('seguimientosCrear', () => {
//         it('should create seguimiento successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await seguimientosCrear(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/seguimientos/crear`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when creating seguimiento', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await seguimientosCrear(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/seguimientos/crear`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al crear el seguimiento: ' + error.message);
//         });
//     });
//     describe('seguimientosDelete', () => {
//         it('should delete seguimiento successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await seguimientosDelete(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/seguimientos/eliminar`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when deleting seguimiento', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await seguimientosDelete(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/seguimientos/eliminar`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al eliminar el seguimiento: ' + error.message);
//         });
//     });
//     describe('seguimientosUploadFile', () => {
//         it('should upload file successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await seguimientosUploadFile(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/seguimientos/upload`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when uploading file', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await seguimientosUploadFile(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/seguimientos/upload`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al subir el archivo: ' + error.message);
//         });
//     });
//     describe('seguimientosDeleteFile', () => {
//         it('should delete file successfully', async () => {
//             const formData = new FormData();
//             const response = { data: 'success' };
//             axios.post.mockResolvedValue(response);

//             const result = await seguimientosDeleteFile(formData, message);

//             expect(result).toEqual(response);
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/seguimientos/deletefile`, formData);
//             expect(message.error).not.toHaveBeenCalled();
//         });

//         it('should handle error when deleting file', async () => {
//             const formData = new FormData();
//             const error = new Error('Network Error');
//             axios.post.mockRejectedValue(error);

//             const result = await seguimientosDeleteFile(formData, message);

//             expect(result).toEqual({ data: [] });
//             expect(axios.post).toHaveBeenCalledWith(`${process.env.APIURL}api/seguimientos/deletefile`, formData);
//             expect(message.error).toHaveBeenCalledWith('Error al eliminar el archivo: ' + error.message);
//         });
//     });



// });
