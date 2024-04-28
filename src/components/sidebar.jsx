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
import { Container } from 'react-bootstrap';
const themes = {
    dark: {
        sidebar: {
            backgroundColor: '#b9282c',
            color: '#FFF',
        },
        menu: {
            menuContent: '#841b3a',
            icon: '#59d0ff',
            hover: {
                backgroundColor: '#9e2233',
                color: '#FFf',
            },
            disabled: {
                color: '#fff',
            },
        },
    },
};
export default function MenuWrapper({ children }) {
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
    return (
        <>
            <div style={{
                display: 'flex', height: "100vh", position: "sticky"
            }}>
                <Sidebar
                    width="200px"
                    image="https://static.vecteezy.com/system/resources/thumbnails/013/449/642/original/abstract-high-tech-database-glowing-background-digital-technology-circuit-board-bg-3d-loop-animation-futuristic-digital-abstract-motion-graphics-abstract-futuristic-data-analysis-background-free-video.jpg"
                    breakPoint="none"
                    backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, 0.9)}
                    rootStyles={{
                        color: themes[theme].sidebar.color,
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ flex: 1, marginBottom: '32px' }}>
                            <Menu menuItemStyles={menuItemStyles}>
                                <Link href="/" ><div style={{ display: "grid", justifyContent: "center" }}><Image src={logo} width="200" alt="UcacueLogo"></Image> </div></Link>
                                <SubMenu label="Pacientes">
                                    <MenuItem component={<Link href="/" />}>Listar</MenuItem>
                                    <MenuItem component={<Link href="/" />}>Crear</MenuItem>
                                </SubMenu>
                                <SubMenu label="Especialistas">
                                    <MenuItem component={<Link href="/" />}>Listar</MenuItem>
                                    <MenuItem component={<Link href="/" />}>Crear</MenuItem>
                                </SubMenu>
                                <SubMenu label="Soy un menú">
                                    <MenuItem component={<Link href="/" />}>Listar</MenuItem>
                                    <MenuItem component={<Link href="/" />}>Crear</MenuItem>
                                </SubMenu>
                            </Menu>

                        </div>
                    </div>
                </Sidebar>
                <main style={{ height: "100vh", width: "100%", overflow: "auto" }}>
                    <Container style={{ marginTop: "50px" }}>
                        {children}
                    </Container>
                </main>
            </div>
        </>
    )
}
