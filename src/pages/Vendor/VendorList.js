import React, { PureComponent } from 'react';
import { connect } from 'dva';

import {
    Row,
    Col,
    Input,
    Form,
    Card,
    Button,
    Select,
    Badge
} from "antd";
import moment from "moment";

import StandardSimpleTable from '@/components/StandardSimpleTable';

import {
    VENDOR_STATUS
} from "@/utils/cfg.js"

import styles from "./VendorList.less";

const FormItem = Form.Item;
const { Option } = Select;

const vendorStatusOption = [
    {
        value: VENDOR_STATUS.NORMAL,
        label: VENDOR_STATUS.toString(VENDOR_STATUS.NORMAL)
    }, {
        value: VENDOR_STATUS.DAMAGE,
        label: VENDOR_STATUS.toString(VENDOR_STATUS.DAMAGE)
    }, {
        value: VENDOR_STATUS.LACK,
        label: VENDOR_STATUS.toString(VENDOR_STATUS.LACK)
    }, {
        value: VENDOR_STATUS.SHORT,
        label: VENDOR_STATUS.toString(VENDOR_STATUS.SHORT)
    }
];
const statusMap = ['default', 'processing', 'error', 'error', 'error'];

@connect(({ vendor, loading }) => ({
    vendor,
    loading: loading.models.vendor
}))
@Form.create()
class VendorList extends PureComponent {
    state = {
        formValues: {},
        selectedRows: [],
    };

    columns = [
        {
            title: '设备编号',
            dataIndex: 'vendor_num',
            align: "center",
            render: text => <a>{text}</a>,
        },
        {
            title: '设备名称',
            dataIndex: 'vendor_name',
            align: "center"
        },
        {
            title: '货道数',
            dataIndex: 'aisle_num',
            align: "center"
        },
        {
            title: '型号',
            dataIndex: 'vendor_model',
            align: "center"
        },
        {
            title: '售货状态',
            dataIndex: 'sell_status',
            align: "center"
        },
        {
            title: '设备状态',
            dataIndex: 'vendor_status',
            // render: status => VENDOR_STATUS.toString(status),
            render: val => {
                return <Badge status={statusMap[val]} text={VENDOR_STATUS.toString(val)} />;
            },
            align: "center"
        },
        {
            title: '添加时间',
            dataIndex: 'create_time',
            render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            align: "center"
        },
        {
            title: '售货类型',
            dataIndex: 'sell_goods_type',
            align: "center"
        },
        {
            title: '二维码',
            dataIndex: 'vendor_img',
            align: "center"
        },
        {
            title: '操作',
            align: "center"
        }
    ]

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'vendor/getVendorList',
        });
    }

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });

        dispatch({
            type: 'vendor/getVendorList',
            payload: {}
        });
    };

    handleSearch = e => {
        e.preventDefault();

        const { dispatch, form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;

            const values = {
                ...fieldsValue,
            };

            console.log(values);

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'vendor/getVendorList',
                payload: values
            });
        })
    };

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows
        })
    };

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
        };

        dispatch({
            type: 'vendor/getVendorList',
            payload: params
        });

    };

    renderAdvanceForm() {
        const {
            form: { getFieldDecorator },
        } = this.props;

        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="设备状态">
                            {getFieldDecorator("vendorStatus")(
                                <Select placeholder="请选择">
                                    {vendorStatusOption.map(status =>
                                        <Option key={status.value} value={status.value}>{status.label}</Option>
                                    )}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="名称编号">
                            {getFieldDecorator('name')(<Input placeholder="名称编号" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        )
    }


    render() {
        const { vendor: { vendorList } } = this.props;
        const { selectedRows } = this.state;
        // console.log(vendorList);
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
        };


        return (
            <Card bordered={false}>
                <div className={styles.tableList}>
                    <div className={styles.tableListForm}>{this.renderAdvanceForm()}</div>
                    <div className={styles.tableListOperator} />
                    <StandardSimpleTable
                        selectedRows={selectedRows}
                        vendorList={vendorList}
                        columns={this.columns}
                        pagination={paginationProps}
                        onSelectRow={this.handleSelectRows}
                        onChange={this.handleStandardTableChange}
                    />
                </div>
            </Card>
        )
    }
}

export default VendorList;