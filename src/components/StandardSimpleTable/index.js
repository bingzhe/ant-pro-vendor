import React, { PureComponent, Fragment } from "react";
import { Table, Alert } from 'antd';
import styles from "./index.less";

class StandardTable extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedRowKeys: [],
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(pagination, filters, sorter);
        }
    };

    handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        const { onSelectRow } = this.props;
        if (onSelectRow) {
            onSelectRow(selectedRows);
        }

        this.setState({
            selectedRowKeys
        })
    };

    cleanSelectedKeys = () => {
        this.handleRowSelectChange([], []);
    };

    render() {
        const { selectedRowKeys } = this.state;
        const { vendorList = [], pagination, rowKey, ...rest } = this.props;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        };

        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => {
                return {
                    disabled: record.disabled,
                }
            }
        }

        return (
          <div className={styles.standardSimPleTable}>
            <div className={styles.tableAlert}>
              <Alert
                message={
                  <Fragment>
                                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
                    <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                                    清空
                    </a>
                  </Fragment>
                        }
                type="info"
                showIcon
              />
            </div>
            <Table
              rowKey={rowKey || 'key'}
              rowSelection={rowSelection}
              dataSource={vendorList}
              pagination={paginationProps}
              onChange={this.handleTableChange}
              {...rest}
            />
          </div>
        )

    }
}

export default StandardTable;