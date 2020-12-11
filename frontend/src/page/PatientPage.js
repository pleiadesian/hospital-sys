import React, { Component, useState } from 'react';
import Grid from '@material-ui/core/Grid/index'
import { Layout, List, Menu, Button, Row, Table, Modal } from "antd";
import { Link } from "react-router-dom";

const { Content, Sider } = Layout;

const columns_register = [
    {
        title: 'Number',
        dataIndex: 'number',
    },
    {
        title: 'Admission state',
        dataIndex: 'admission',
    },
    {
        title: 'Checklist Detail',
        dataIndex: 'checklist',
    }
];

const columns_prescription = [
    {
        title: 'Number',
        dataIndex: 'number',
    },
    {
        title: 'Medicine Receipt',
        dataIndex: 'receipt',
    },
    {
        title: 'Payment',
        dataIndex: 'payment',
    },
];

const data_register = [
    {
        key: '1',
        number: '1',
        admission: 'Not checked',
        checklist: <Button disabled={true}>checklist</Button>,
    },
];

const data_prescription = [
    {
        key: '1',
        number: '1',
        receipt: <Button>receipt</Button>,
        payment: <Button>payment</Button>,
    },
];

class PatientPage extends Component {
    constructor(props){
        super(props);
        // TODO: register info and prescription info state
        this.state = {
            visible: false,
        }
        this.handleregister = this.handleregister.bind(this)
        this.showModal = this.showModal.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    componentWillMount() {
        // TODO: get register info and prescription info
        // var url="http://202.120.40.8:30741/message/"+this.props.type+"/1";
        // axios.get(url).then(
        //     function(response)
        //     {
        //         this.setState({messages:response.data});
        //     }.bind(this)
        // )
    }

    handleregister() {
        // TODO: axios.post register info and flush page
        this.setState({visible: true})
    }

    showModal(){
        this.setState({visible: true})
    }

    handleOk()
    {
        this.setState({visible:false})
    }

    handleCancel()
    {
        this.setState({visible:false})
    }

    info(text) {
        Modal.info({
            title: '123',
            content: (
                <Button>{text}</Button>
            ),
            onOk() {},
        })
    }

    render() {
        return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider>
                <Menu>
                    <Menu.Item key="1">
                        <Row justify="center"><h1>Patient Page</h1></Row>
                    </Menu.Item>
                    <Menu.Divider style={{margin:20}}/>
                    <Menu.Item key="2">
                        <Row justify="center"><Button type="primary" onClick={() => this.info("test")}>Register</Button></Row>
                    </Menu.Item>
                    <Menu.Divider style={{margin:20}}/>
                    <Menu.Item key="3">
                        <Row justify="center"><Link to={'/'}><span>Register Info</span></Link></Row>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Row justify="center"><Link to={'/'}><span>Prescription Info</span></Link></Row>
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
                                    {/*<Modal title="Information" visible={this.state.visible}*/}
                                    {/*       onOk={this.handleOk} onCancel={this.handleCancel}*/}
                                    {/*/>*/}
                                    <br/><br/>
                                    <h1>Register Information</h1>
                                    <Table columns={columns_register} dataSource={data_register} />
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

export default PatientPage;