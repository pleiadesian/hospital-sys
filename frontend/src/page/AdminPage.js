import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/index'
import { Layout, List, Menu, Button, Row, Table } from "antd";
import { Link } from "react-router-dom";

const { Content, Sider } = Layout;

const columns_medicine = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: "Stock",
        dataIndex: "stock",
    },
    {
        title: 'Price/$',
        dataIndex: 'price',
    },
    {
        title: 'Update Confirmation',
        dataIndex: 'update',
    },
];

const data_medicine = [
    {
        key: '1',
        name: 'aspirin',
        stock: '12',
        price: '9.60',
        update: <Button>update</Button>,
    },
];

const columns_department = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Number',
        dataIndex: 'number',
    }
]

const data_department = [
    {
        key: '1',
        name: 'Surgical',
        number: '3',
    }
]

const columns_doctor = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Attendance date',
        dataIndex: 'attendance',
    },
    {
        title: 'Update Confirmation',
        dataIndex: 'update',
    },
]

const data_doctor = [
    {
        key: '1',
        name: 'Jim Green',
        attendance: 'Monday,Wednesday',
        update: <Button>Update</Button>,
    }
]

const columns_prescription = [
    {
        title: 'Number',
        dataIndex: 'number',
    },
    {
        title: 'Prescription Export',
        dataIndex: 'export',
    },
]

const data_prescription = [
    {
        key: '1',
        number: '1',
        export: <Button>Export</Button>,
    }
]

class DoctorPage extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider>
                    <Menu>
                        <Menu.Item key="1">
                            <Row justify="center"><h1>Admin Page</h1></Row>
                        </Menu.Item>
                        <Menu.Divider style={{margin:20}}/>
                        <Menu.Item key="2">
                            <Row justify="center"><Link to={'/admin'}><span>Medicine Info</span></Link></Row>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Row justify="center"><Link to={'/admin'}><span>Department Info</span></Link></Row>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Row justify="center"><Link to={'/admin'}><span>Doctor Info</span></Link></Row>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Row justify="center"><Link to={'/admin'}><span>Prescription Info</span></Link></Row>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{margin: '16px'}}>
                        <div id={"content"}>
                            <Grid container direction={"column"} >
                                <Grid container direction={"row"} >
                                    <Grid item xs={2} />
                                    <Grid item xs={8} >
                                        <br/><br/>
                                        <h1>Medicine Information</h1>
                                        <Table columns={columns_medicine} dataSource={data_medicine} />
                                        <br/><br/>
                                        <h1>Department Information</h1>
                                        <Table columns={columns_department} dataSource={data_department} />
                                        <br/><br/>
                                        <h1>Doctor Information</h1>
                                        <Table columns={columns_doctor} dataSource={data_doctor} />
                                        <br/><br/>
                                        <h1>Prescription Information</h1>
                                        <Table columns={columns_prescription} dataSource={data_prescription} />
                                    </Grid>
                                    <Grid item xs={2} />
                                </Grid>
                            </Grid>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default DoctorPage;