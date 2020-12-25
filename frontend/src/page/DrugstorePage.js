import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/index'
import { Layout, Menu, Button, Row, Table } from "antd";
import { Link } from "react-router-dom";

const { Content, Sider } = Layout;

const columns_prescription = [
    {
        title: 'Number',
        dataIndex: 'number',
    },
    {
        title: 'Prescribe state',
        dataIndex: 'prescribestate',
    },
    {
        title: 'Prescribe',
        dataIndex: 'prescribebutton',
    },
];

const data_prescription = [
    {
        key: '1',
        number: '1',
        prescribestate: 'not prescribed',
        prescribebutton: <Button>prescribe</Button>,
    },
];

class DrugstorePage extends Component {
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
                            <Row justify="center"><h1>Drugstore Page</h1></Row>
                        </Menu.Item>
                        <Menu.Divider style={{margin:20}}/>
                        <Menu.Item key="2">
                            <Row justify="center"><Link to={'/doctor'}><span>Prescription Info</span></Link></Row>
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

export default DrugstorePage;