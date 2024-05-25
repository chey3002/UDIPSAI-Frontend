import React from 'react'
import { Form } from 'react-bootstrap'

export default function FormControl(props) {
    return <div style={{ margin: "10px 5px" }}>
        {props.label && <Form.Label>{props.label}</Form.Label>}
        <Form.Control {...props} />
    </div>
}
