import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/index'
import { Layout, Menu, Button, Row, Table } from "antd";
import { Link } from "react-router-dom";

const { Content, Sider } = Layout;

const columns_admission = [
    {
        title: 'Number',
        dataIndex: 'number',
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: 'Admission state',
        dataIndex: 'admission',
    },
    {
        title: 'Check',
        dataIndex: 'check',
    },
];

const data_admission = [
    {
        key: '1',
        number: '1',
        name: 'John Brown',
        admission: 'not checked',
        check: <Button>check</Button>,
    },
];

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
                            <Row justify="center"><h1>Doctor Page</h1></Row>
                        </Menu.Item>
                        <Menu.Divider style={{margin:20}}/>
                        <Menu.Item key="2">
                            <Row justify="center"><Link to={'/doctor'}><span>Admission Info</span></Link></Row>
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
                                        <h1>Admission Information</h1>
                                        <Table columns={columns_admission} dataSource={data_admission} />
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