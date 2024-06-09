import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Row, Col, Input } from "antd";
import Logo from "@/assets/ucacue-logo.png";
import Link from "next/link";
import { useUserContext } from "@/assets/useUserContext";
import Router from 'next/router'
import styles from "./login.module.css";
import useTranslation from 'next-translate/useTranslation'
import Image from "next/image";
import axios from "axios";

const { Password } = Input;

const Login = () => {
    const { user, setUser } = useUserContext();
    const { t } = useTranslation('home');
    const lang = t;

    useEffect(() => {
        if (user) {
            Router.push('/dashboard');
        }
    }, [user]);

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        setLoading(true);
        const values = {
            cedula: formData.username,
            contrasena: formData.password
        }
        console.log(`Username: ${formData.username}, Password: ${formData.password}`);
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
        // if (formData.username === "admin" && formData.password === "admin") {
        //     setUser({
        //         ...formData,
        //         username: formData.username,
        //     });
        // }
        // const response = await axios.get(process.env['BASE_URL'] + 'api/pacientes/listar/')
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return (
        <div className={styles["sign-in__wrapper"]}>
            <div className={styles["sign-in__backdrop"]}></div>
            <Form className="shadow p-4 bg-white rounded" onFinish={handleSubmit}>
                <Image className="mx-auto d-block mb-2" src={Logo} alt="logo" width={100} height={100} />
                <div className="h4 mb-2 text-center">{lang('login_title')}</div>
                {show && (
                    <Alert className="mb-2" type="error" closable onClose={() => setShow(false)} message={lang('login_incorrect')}>

                    </Alert>
                )}
                <Form.Item className="mb-2" name="username" rules={[{ required: true, message: lang('login_username') }]}>
                    <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        placeholder={lang('login_username')}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item className="mb-2" name="password" rules={[{ required: true, message: lang('login_password') }]}>
                    <Password
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder={lang('login_password')}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Button className="w-100 mb-2" type="primary" htmlType="submit" loading={loading}>
                    {loading ? lang('login_button_loading') : lang('login_button')}
                </Button>
                <Row justify="space-between" className="mb-2">
                    <Col>
                        <Row gutter={[8, 8]}>
                            <Col className="p-1">
                                <Link href="/" locale="es">
                                    <span role="img" aria-label="Spanish Flag">🇪🇸</span>
                                </Link>
                            </Col>
                            <Col className="p-1">
                                <Link href="/" locale="en">
                                    <span role="img" aria-label="English Flag">🇺🇸</span>
                                </Link>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Form>
        </div>
    );
};

export default Login;
