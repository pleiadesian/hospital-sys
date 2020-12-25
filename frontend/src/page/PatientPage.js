import React, { Component, useState } from 'react';
import Grid from '@material-ui/core/Grid/index'
import { Layout, List, Menu, Button, Row, Table, Modal } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

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

const data_prescription = [
    {
        key: '1',
        number: '1',
        receipt: <Button>receipt</Button>,
        payment: <Button>payment</Button>,
    },
];

let aid = 0;
let appointment_url = "http://202.120.40.8:30611/Entity/Udbdc8b322a1243/hospitalx/Appointment/";

class PatientPage extends Component {
    constructor(props){
        super(props);
        // TODO: register info and prescription info state
        this.state = {
            visible: false,
            data_register: [],
            data_prescription: {},
        }
        this.handleRegister = this.handleRegister.bind(this)
        this.showModal = this.showModal.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.getAppointment = this.getAppointment.bind(this)
    }

    getAppointment() {
        axios.get(appointment_url).then(res => {
                if (res.data != null && res.data.size > 0) {
                    console.log(res.data['Appointment'])
                    let data = res.data['Appointment'].map((item, index) => {
                        return {
                            key: index,
                            number: item['id'],
                            admission: item['completion'] ? 'Checked' : 'Not checked',
                            checklist: <Button disabled={!item['completion']}
                                               onClick={() => this.showModal(item['content'])}>
                                checklist
                            </Button>,
                        };
                    })
                    console.log(data)
                    this.setState({data_register: data})
                }
            })
    }

    componentWillMount() {
        this.getAppointment()
    }

    handleRegister() {
        let params = {
            "aid" : aid,
            "patientid": 1,
            "patientname": "Ray Williams",
            "completion": 0,
            "content": "",
        }
        aid += 1
        axios.post(appointment_url, params)
        this.getAppointment()
    }

    handleOk()
    {
        this.setState({visible:false})
    }

    handleCancel()
    {
        this.setState({visible:false})
    }

    showModal(text) {
        Modal.info({
            title: 'Information',
            content: text,
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
                        <Row justify="center"><Button type="primary" onClick={this.handleRegister}>Register</Button></Row>
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
                                    <Table columns={columns_register} dataSource={this.state.data_register} />
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