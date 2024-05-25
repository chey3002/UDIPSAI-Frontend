import React from 'react'
import { Col } from 'react-bootstrap'
import FormControl from './formControl'

export default function FormControlDosColumnas(props) {
    return (
        <Col md="6" sm="12">
            <FormControl {...props} />
        </Col>
    )
}
