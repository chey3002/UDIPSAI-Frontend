'use client'
import React, { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import styles from "./register.module.css";

import Logo from "@/assets/ucacue-logo.png";
import Image from "next/image";
import Link from "next/link";
import useTranslation from 'next-translate/useTranslation'


const Register = () => {
    const [formData, setFormData] = useState({
        cedula: "",
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        id_especialidad: "",
        esPasante: false,
        password: "",
        passwordConfirm: ""
    });

    const { t } = useTranslation('home');
    const lang = t;
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const form = event.currentTarget;
        await delay(500);
        console.log(formData);
        setLoading(false);
    };

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log(name, value, type, checked);
        setFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    return (
        <div className={styles["sign-in__wrapper"]}>
            <div className={styles["sign-in__backdrop"]}></div>
            <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
                <Image className="mx-auto d-block mb-2" src={Logo} alt="logo" width={100} height={100} />
                <div className="h4 mb-2 text-center">{lang('register_title')}</div>
                {show ? (
                    <Alert className="mb-2" variant="danger" onClose={() => setShow(false)} dismissible>
                        {lang('register_error')}
                    </Alert>
                ) : null}
                <Col>
                    <Form.Group className="mb-2" controlId="cedula">
                        <Form.Label>{lang('register_cedula')}</Form.Label>
                        <Form.Control type="text" name="cedula" value={formData.cedula} placeholder={lang('register_cedula')} onChange={handleChange} required />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-2" controlId="primerNombre">
                                <Form.Label>{lang('register_primerNombre')}</Form.Label>
                                <Form.Control type="text" name="primerNombre" value={formData.primerNombre} placeholder={lang('register_primerNombre')} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-2" controlId="segundoNombre">
                                <Form.Label>{lang('register_segundoNombre')}</Form.Label>
                                <Form.Control type="text" name="segundoNombre" value={formData.segundoNombre} placeholder={lang('register_segundoNombre')} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-2" controlId="primerApellido">
                                <Form.Label>{lang('register_primerApellido')}</Form.Label>
                                <Form.Control type="text" name="primerApellido" value={formData.primerApellido} placeholder={lang('register_primerApellido')} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-2" controlId="segundoApellido">
                                <Form.Label>{lang('register_segundoApellido')}</Form.Label>
                                <Form.Control type="text" name="segundoApellido" value={formData.segundoApellido} placeholder={lang('register_segundoApellido')} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-2" controlId="id_especialidad">
                                <Form.Label>{lang('register_id_especialidad')}</Form.Label>
                                <Form.Control type="number" name="id_especialidad" value={formData.id_especialidad} placeholder={lang('register_id_especialidad')} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col className="d-flex flex-column align-items-start">
                            <Form.Group className="mb-2" controlId="esPasante">
                                <Form.Check
                                    type="checkbox"
                                    label={lang('register_esPasante')}
                                    checked={formData.esPasante}
                                    onChange={handleChange}
                                    name="esPasante"
                                />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Form.Group className="mb-2" controlId="password">
                        <Form.Label>{lang('register_password')}</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            placeholder={lang('register_password')}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="passwordConfirm">
                        <Form.Label>{lang('register_passwordConfirm')}</Form.Label>
                        <Form.Control
                            type="password"
                            name="passwordConfirm"
                            value={formData.passwordConfirm}
                            placeholder={lang('register_passwordConfirm')}
                            onChange={handleChange}
                            required
                            isInvalid={formData.password !== formData.passwordConfirm && formData.passwordConfirm !== ""}
                        />
                        <Form.Control.Feedback type="invalid">
                            Las contraseñas no coinciden
                        </Form.Control.Feedback>
                    </Form.Group>

                </Col>
                {!loading ? (
                    <Button className="w-100" variant="primary" type="submit">
                        {lang('register_button')}
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        {lang('register_button_loading')}
                    </Button>
                )}
                <Row>
                    <Col>
                        <Row>
                            <Col xs="auto" className="p-1">
                                <Link href="/registro" locale="es">
                                    <span>🇪🇸</span>
                                </Link>
                            </Col>
                            <Col xs="auto" className="p-1">
                                <Link href="/registro" locale="en">
                                    <span>🇺🇸</span>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="d-grid justify-content-end">
                        <Link href="/">
                            <span>{lang('register_login')}</span>
                        </Link>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Register;
