import {
    Layout,
    Menu,
    Button,
    Dropdown,
    Spin,
} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    BookOutlined,
    HomeOutlined,
    SettingOutlined,
    LogoutOutlined,
    GlobalOutlined,
    ShopOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import logo from '@/assets/images/logo_institucion.png';
import { useUserContext } from '@/assets/useUserContext';
import { usePathname } from 'next/navigation';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { toIndex } from '@/utils/toindex/toindex';

const { Header, Sider, Content } = Layout;

export default function MenuWrapper({ children }) {
    const { logout, user } = useUserContext();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation('home');
    const lang = t;
    const [hydrated, setHydrated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Define the media query for screen size md and smaller
    const isMdOrSmaller = useMediaQuery({ query: '(max-width: 992px)' });

    useEffect(() => {
        toIndex(user);
    }, [user]);

    useEffect(() => {
        setHydrated(true);
        // Automatically collapse the sidebar when the screen is md or smaller
        if (isMdOrSmaller) {
            setCollapsed(true);
        }
        setLoading(false); // Simulate content load completion
    }, [isMdOrSmaller]);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const menuItems = [
        {
            key: '0',
            icon: <UserOutlined />,
            label: <span>{lang('pacientes')}</span>,
            children: [
                {
                    key: '1',
                    icon: <UserOutlined />,
                    label: <Link style={{ color: 'fff', textDecoration: 'none' }} href="/pacientes/">{lang('listarPacientes')}</Link>,
                },
                user?.permisos["pacientes"] ? {
                    key: '2',
                    icon: <UserOutlined />,
                    label: <Link style={{ color: 'fff', textDecoration: 'none' }} href="/pacientes/new">{lang('nuevo')}</Link>,
                } : null,
                user?.permisos["institucionesEducativas"] ? {
                    key: '7',
                    icon: <HomeOutlined />,
                    label: <Link style={{ color: 'fff', textDecoration: 'none' }} href="/pacientes/institucionesEducativas">{lang('institucionesEducativas')}</Link>,

                } : null
            ]
        },
        user?.permisos["especialistas"] ? {
            key: '3',
            icon: <BookOutlined />,
            label: <span>{lang('especialistas')}</span>,
            children: [
                {
                    key: '4',
                    icon: <SettingOutlined />,
                    label: <Link style={{ color: 'fff', textDecoration: 'none' }} href="/registro/">{lang('listarEspecialistas')}</Link>,
                },
                {
                    key: '5',
                    icon: <UserOutlined />,
                    label: <Link style={{ color: 'fff', textDecoration: 'none' }} href="/registro/new">{lang('nuevo')}</Link>,
                },
            ]
        } : null,
        user?.permisos["sede"] ? {
            key: '6',
            icon: <ShopOutlined />,
            label: <Link style={{ color: 'fff', textDecoration: 'none' }} href="/sedes/">{lang('sedes')}</Link>
        } : null
    ];

    const languageMenu = (
        <Menu>
            <Menu.Item key="1">
                <Link href={pathname} locale="es">
                    <span>🇪🇸 Español</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link href={pathname} locale="en">
                    <span>🇺🇸 English</span>
                </Link>
            </Menu.Item>
        </Menu>
    );

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                collapsedWidth={isMdOrSmaller ? 0 : 80} // Hide sidebar completely on md and smaller screens
                style={{
                    padding: 0,
                    background: '#fff',
                    position: 'fixed',
                    left: 0,
                    zIndex: 1,
                    minHeight: '100vh',
                    width: isMdOrSmaller && collapsed ? 0 : 200, // Hide sidebar completely on md and smaller screens
                    transition: 'width 0.2s'
                }}
            >
                <div style={{ display: 'grid', justifyContent: 'center', margin: '16px 0' }}>
                    <Link href="/dashboard/">
                        <Image src={logo} width={collapsed ? 80 : 200} alt="UcacueLogo" />
                    </Link>
                </div>
                <Menu mode="vertical" defaultSelectedKeys={['1']} items={menuItems} />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: isMdOrSmaller && collapsed ? 0 : (collapsed ? 80 : 200) }}>
                <Header className="site-layout-background" style={{ padding: 0, background: '#fff', zIndex: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                        style: { marginLeft: "10px" },
                    })}
                    <div style={{ float: 'right', marginRight: '16px' }}>
                        <Dropdown overlay={languageMenu}>
                            <Button icon={<GlobalOutlined />} />
                        </Dropdown>
                        {hydrated && user && (
                            <span style={{ marginLeft: '16px' }}>{user.username}</span>
                        )}
                        <Button
                            type="primary"
                            danger
                            icon={<LogoutOutlined />}
                            onClick={logout}
                            style={{ marginLeft: '16px' }}
                        >
                            {lang('salir')}
                        </Button>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, zIndex: 0, height: '100%', overflow: 'auto' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
