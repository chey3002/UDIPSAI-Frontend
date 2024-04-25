'use client'
import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {  Card } from 'react-bootstrap';

export default function Home() {

    const [estudiante, setEstudiante] = React.useState({
      cedula: "",
      ciclo: "",
      nombre_completo: "",
      unidad_academica: ""
    })

    const handleChange = (e) => {
      setEstudiante({ ...estudiante, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(estudiante)

    }

    return (
      <main>
        <Card style={{ padding: "10px" }}>

          <h2>Ingresar nuevo estudiante</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formCedula">
              <Form.Label>Nro de cédula</Form.Label>
                <Form.Control disabled readOnly defaultValue={estudiante.cedula} name="cedula" type="text" placeholder="Ingrese el número de cédula del estudiante" />
                :
                <Form.Control defaultValue={estudiante.cedula} name="cedula" type="text" placeholder="Ingrese el número de cedula del estudiante" onChange={handleChange} />
              

            </Form.Group>
            <Form.Group className="mb-3" controlId="formCiclo">
              <Form.Label>Ciclo</Form.Label>
              <Form.Control defaultValue={estudiante.ciclo} name="ciclo" type="number" placeholder="Ingrese el ciclo del estudiante" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control defaultValue={estudiante.nombre_completo} name="nombre_completo" type="text" placeholder="Ingrese el nombre completo del estudiante" onChange={handleChange} />
              <Form.Text className="text-muted">
                Dos nombres, y dos apellidos.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUnidadAcademica">
              <Form.Label>Unidad Académica</Form.Label>
              <Form.Control defaultValue={estudiante.unidad_academica} name="unidad_academica" type="text" placeholder="Ingrese el la unidad académica a la cual pertenece el estudiante" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
             Registrar
            </Button>
          </Form>
        </Card>
      </main>
    );
}
