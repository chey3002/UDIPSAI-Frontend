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
    SettingOutlined,
    LogoutOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import logo from '@/assets/images/logo_institucion.png'
import { useUserContext } from '@/assets/useUserContext';
import { usePathname } from 'next/navigation'
import useTranslation from 'next-translate/useTranslation'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const { Header, Sider, Content } = Layout;

export default function MenuWrapper({ children }) {
    const { logout, user } = useUserContext();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation('home');
    const lang = t;
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

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
                {
                    key: '2',
                    icon: <UserOutlined />,
                    label: <Link style={{ color: 'fff', textDecoration: 'none' }} href="/pacientes/new">{lang('nuevo')}</Link>,
                },
            ]
        },
        {
            key: '3',
            icon: <SettingOutlined />,
            label: <Link style={{ color: 'fff', textDecoration: 'none' }} href="/registro/">Listar</Link>,
        },

        {
            key: '4',
            icon: <SettingOutlined />,
            label: <Link style={{ color: 'fff', textDecoration: 'none' }} href="/dashboard/">Crear</Link>,
        },
        {
            key: '5',
            icon: <UserOutlined />,
            label: <Link style={{ color: 'fff', textDecoration: 'none' }} href="/dashboard/">Listar</Link>,
        },
        {
            key: '6',
            icon: <UserOutlined />,
            label: <Link style={{ color: 'fff', textDecoration: 'none' }} href="/dashboard/">Crear</Link>,
        }
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

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ padding: 0, background: '#fff', position: 'fixed', left: 0, zIndex: 1, minHeight: '100vh' }}>
                <div style={{ display: 'grid', justifyContent: 'center', margin: '16px 0' }}>
                    <Link href="/dashboard/">
                        <Image src={logo} width={collapsed ? 80 : 200} alt="UcacueLogo" />
                    </Link>
                </div>
                <Menu mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
                <Header className="site-layout-background" style={{ padding: 0, background: '#fff', zIndex: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
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
                    <Spin spinning={!hydrated}>
                        {children}
                    </Spin>

                </Content>
            </Layout>
        </Layout>
    );
}
