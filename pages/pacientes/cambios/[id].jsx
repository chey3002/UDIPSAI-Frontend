import React from 'react';
import { Table, Typography, Collapse, message, Card } from 'antd';
import MenuWrapper from '@/components/sidebar';
import BreadCrumbPacientes from '@/components/commons/breadCrumPaciente';
import useTranslation from 'next-translate/useTranslation';
import { historialDeCambios } from '@/utils/apiRequests';

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
    // Imprime el valor y el valor a comparar
    console.log(value, compareValue, value !== compareValue);

    // Verifica si ambos valores son objetos
    if (typeof value === 'object' && value !== null && typeof compareValue === 'object' && compareValue !== null) {
        // Obtiene las claves de ambos objetos
        const valueKeys = Object.keys(value);
        const compareValueKeys = Object.keys(compareValue);

        // Verifica si las claves son diferentes
        if (valueKeys.length !== compareValueKeys.length) {
            return true;
        }

        // Compara los valores de las claves en ambos objetos
        return valueKeys.some(key => isDifferent(value[key], compareValue[key]));
    } else {
        // Si no son objetos, compara los valores directamente
        return value !== compareValue;
    }
};
const typeofValue = (value) => {
    return typeof value;
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
                            <span >
                                {renderValue(text === null ? 'null' : typeofValue(text) === 'object' ? text : text.toString())}
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
        return (
            <MenuWrapper setLang={true}>
                <Card>
                    <Card.Meta title={<h1>{t('Cambios')}</h1>} />
                    <div>
                        <h3>{t('NoSeEncontroPaciente')}</h3>
                    </div>
                </Card>
            </MenuWrapper>
        )
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
            <Card>

                <BreadCrumbPacientes idPaciente={paciente.id} page={lang('Cambios')} />
                <Card.Meta title={<h1>{lang('Cambios')}</h1>} />
                <Table columns={columns} dataSource={cambios} rowKey="id" pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], showQuickJumper: true }}
                />
            </Card>
        </MenuWrapper>
    );
};

export const getServerSideProps = async (context) => {
    const res = await historialDeCambios(context.query.id, message);
    console.log(res.data);

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
