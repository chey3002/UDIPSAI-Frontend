'use client'
import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
    menuClasses,
} from 'react-pro-sidebar';
import Link from 'next/link';
import logo from '@/assets/images/logo_institucion.png'
import Image from 'next/image';
import { Container, Button, Navbar } from 'react-bootstrap';
import { useUserContext } from '@/assets/useUserContext';
import { usePathname } from 'next/navigation'
import useTranslation from 'next-translate/useTranslation'
import { use, useEffect, useState } from 'react';


const themes = {
    dark: {
        sidebar: {
            backgroundColor: '#00ccff',
            color: '#FFF',
        },
        menu: {
            menuContent: '#001b66',
            icon: '#59d0ff',
            hover: {
                backgroundColor: '#00ffbb',
                color: '#000',
            },
            disabled: {
                color: '#fff',
            },
        },
    },
};
export default function MenuWrapper({ children, setLang }) {
    const { logout, user } = useUserContext();
    const pathname = usePathname()
    const theme = 'dark'
    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    const menuItemStyles = {
        root: {
            fontSize: '13px',
            fontWeight: 400,
        },
        icon: {
            color: themes[theme].menu.icon,
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
        },
        SubMenuExpandIcon: {
            color: '#b6b7b9',
        },
        subMenuContent: ({ level }) => ({
            backgroundColor:
                level === 0
                    ? hexToRgba(themes[theme].menu.menuContent, 1)
                    : 'transparent',
        }),
        button: {
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
            '&:hover': {
                backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, 0.8),
                color: themes[theme].menu.hover.color,
            },
        },
        label: ({ open }) => ({
            fontWeight: open ? 600 : undefined,
        }),
    };
    const { t } = useTranslation('home');
    const lang = t;
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);


    return (
        <>
            <div style={{
                display: 'flex', height: "100vh", position: "sticky"
            }}>
                <Sidebar
                    width="200px"
                    image="https://img.freepik.com/free-vector/modern-halftone-pattern-background_1035-18855.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1708214400&semt=ais"
                    breakPoint="none"
                    backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, 0.5)}
                    rootStyles={{
                        color: themes[theme].sidebar.color,
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ flex: 1, marginBottom: '32px' }}>
                            <Menu menuItemStyles={menuItemStyles}>
                                <Link href="/dashboard/" ><div style={{ display: "grid", justifyContent: "center" }}><Image src={logo} width="200" alt="UcacueLogo"></Image> </div></Link>
                                <SubMenu label={`${lang('pacientes')}`}>
                                    <MenuItem component={<Link href="/pacientes/" />}>{lang('listarPacientes')}</MenuItem>
                                    <MenuItem component={<Link href="/pacientes/new" />}>{lang('nuevo')}</MenuItem>
                                </SubMenu>
                                <SubMenu label="Especialistas">
                                    <MenuItem component={<Link href="/registro/" />}>Listar</MenuItem>
                                    <MenuItem component={<Link href="/dashboard/" />}>Crear</MenuItem>
                                </SubMenu>
                                <SubMenu label="Soy un menú">
                                    <MenuItem component={<Link href="/dashboard/" />}>Listar</MenuItem>
                                    <MenuItem component={<Link href="/dashboard/" />}>Crear</MenuItem>
                                </SubMenu>
                            </Menu>

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: "25px", }}>
                            {setLang ? <Link href={pathname} locale="es" style={{ color: "#fff" }}>
                                <span>🇪🇸</span>
                            </Link> : ""}
                            {setLang ? <Link href={pathname} locale="en" style={{ color: "#fff" }}>
                                <span>🇺🇸</span>
                            </Link> : ""}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: "25px" }}>
                            <Button style={{ color: "#fff", width: "98%", fontWeight: "500", fontSize: "1.5rem", border: "5px solid #dc3545" }}
                                variant='outline-danger'
                                onClick={() => logout()}>{lang('salir')}</Button>

                        </div>
                    </div>

                </Sidebar >
                <main style={{ height: "100vh", width: "100%", overflow: "auto" }}>
                    <Container style={{}}>
                        <Navbar className="bg-body-tertiary">
                            <Container>
                                <Navbar.Brand href="#home">UDIPSAI</Navbar.Brand>
                                <Navbar.Toggle />
                                <Navbar.Collapse className="justify-content-end">
                                    {hydrated ? <Navbar.Text>
                                        {user ? user.username : ""}
                                    </Navbar.Text> : ""}
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                        {children}
                    </Container>
                </main>
            </div >
        </>
    )
}
