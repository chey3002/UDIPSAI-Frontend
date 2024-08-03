import React from 'react';
import { Table, Typography, Collapse } from 'antd';
import axios from 'axios';
import MenuWrapper from '@/components/sidebar';
import BreadCrumbPacientes from '@/components/commons/breadCrumPaciente';
import useTranslation from 'next-translate/useTranslation';

const { Text } = Typography;
const { Panel } = Collapse;

const renderValue = (value) => {

    if (typeof value === 'object' && value !== null) {
        return (
            <Table
                dataSource={Object.keys(value).map((key, index) => ({
                    key: index,
                    field: key,
                    value: value[key],
                }))}
                columns={[
                    { title: 'Field', dataIndex: 'field', key: 'field' },
                    { title: 'Value', dataIndex: 'value', key: 'value', render: renderValue },
                ]}
                pagination={false}
                showHeader={false}
                rowKey="field"
            />
        );
    } else {
        return value;
    }
};
const isDifferent = (value, compareValue) => {
    console.log(value, compareValue, value !== compareValue);

    if (typeof value === 'object' && value !== null) {
        return Object.keys(value).some(key => isDifferent(value[key], compareValue[key]));
    } else {
        return value !== compareValue;
    }
}
const renderJsonCell = (jsonString, compareJsonString) => {
    try {
        const jsonObject = jsonString ? JSON.parse(jsonString) : {};
        const compareJsonObject = compareJsonString ? JSON.parse(compareJsonString) : {};

        return (
            <Table
                dataSource={Object.keys(jsonObject).map((key, index) => ({
                    key: index,
                    field: key,
                    value: jsonObject[key],
                }))}
                columns={[
                    { title: 'Field', dataIndex: 'field', key: 'field' },
                    {
                        title: 'Value',
                        dataIndex: 'value',
                        key: 'value',
                        render: (text, record) => (
                            <span style={{ backgroundColor: isDifferent(record.value, record.value) ? 'yellow' : 'inherit' }}>
                                {renderValue(text)}
                            </span>
                        )
                    },
                ]}
                pagination={{ defaultPageSize: 5, showSizeChanger: false, pageSizeOptions: ['10', '25', '50', '100'], showQuickJumper: false }}
                showHeader={false}
                rowKey="field"
            />
        );
    } catch (e) {
        return <Text code>{jsonString}</Text>;
    }
};

export default function HistorialCambiosTable({ cambios, paciente }) {
    const { t } = useTranslation('home');
    const lang = t;
    if (!cambios) {
        return <h1>No hay datos disponibles.</h1>;
    }

    const columns = [
        { title: lang('Entidad'), dataIndex: 'entidad', key: 'entidad' },
        {
            title: lang('Fecha_de_Cambio'), dataIndex: 'fechaCambio', key: 'fechaCambio',
            render: (text) => {
                const date = new Date(text);
                return date.toLocaleString();
            }
        },
        { title: lang('Operación'), dataIndex: 'operacion', key: 'operacion' },
        {
            title: lang('Valor_Anterior'),
            dataIndex: 'valorAnterior',
            key: 'valorAnterior',
            render: (text, record) => (
                <Collapse>
                    <Panel header={lang('Valor_Anterior')} key="1">
                        {renderJsonCell(record.valorAnterior, record.valorNuevo)}
                    </Panel>
                </Collapse>
            ),
        },
        {
            title: lang('Valor_Nuevo'),
            dataIndex: 'valorNuevo',
            key: 'valorNuevo',
            render: (text, record) => (
                <Collapse>
                    <Panel header={lang('Valor_Nuevo')} key="1">
                        {renderJsonCell(record.valorNuevo, record.valorAnterior)}
                    </Panel>
                </Collapse>
            ),
        },
    ];

    return (
        <MenuWrapper setLang={true}>
            <BreadCrumbPacientes idPaciente={paciente.id} page={lang('Cambios')} />
            <Table columns={columns} dataSource={cambios} rowKey="id" pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], showQuickJumper: true }}
            />
        </MenuWrapper>
    );
};

export const getServerSideProps = async (context) => {
    const res = await axios.get(process.env['HOST'] + 'api/historial-cambios/listar/' + context.query.id);
    if (res.data === null) {
        return {
            props: {
                cambios: null,
                paciente: { id: context.query.id }
            },
        };
    }
    return {
        props: {
            cambios: res.data,
            paciente: { id: context.query.id }
        },
    };
};
