import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import Logo from "@/assets/ucacue-logo.png";
import Image from "next/image";
import Link from "next/link";
// import { login as esp } from "@/assets/lenguajes/esp.js";
// import { login as eng } from "@/assets/lenguajes/eng.js";
import { useUserContext } from "@/assets/useUserContext";
import Router from 'next/router'
import styles from "./login.module.css";
import useTranslation from 'next-translate/useTranslation'


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
    // const [lang, setLang] = useState(esp);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const form = event.currentTarget;
        await delay(500);
        console.log(`Username: ${formData.username}, Password: ${formData.password}`);
        if (formData.username !== "admin" || formData.password !== "admin") {
            setShow(true);
        } else {
            setUser({ username: formData.username });

        }
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
            <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
                <Image className="mx-auto d-block mb-2" src={Logo} alt="logo" width={100} height={100} />
                <div className="h4 mb-2 text-center">{lang('login_title')}</div>
                {show && (
                    <Alert className="mb-2" variant="danger" onClose={() => setShow(false)} dismissible>
                        {lang('login_incorrect')}
                    </Alert>
                )}
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>{lang('login_username')}</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        placeholder={lang('login_username')}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="password">
                    <Form.Label>{lang('login_password')}</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder={lang('login_password')}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                {!loading ? (
                    <Button className="w-100" variant="primary" type="submit">
                        {lang('login_button')}
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        {lang('login_button_loading')}
                    </Button>
                )}
                <Row>
                    <Col>
                        <Row>
                            <Col xs="auto" className="p-1">
                                <Link href="/" locale="es">
                                    <span>🇪🇸</span>
                                </Link>
                            </Col>
                            <Col xs="auto" className="p-1">
                                <Link href="/" locale="en">
                                    <span>🇺🇸</span>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="d-grid justify-content-end">
                        <Link href="/registro">
                            <span>{lang('login_register')}</span>
                        </Link>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Login;
