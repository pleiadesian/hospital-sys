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
        title: 'Medicine Name',
        dataIndex: 'medicinename',
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
        medicinename: "temp",
        payment: <Button>payment</Button>,
    },
];

let aid = 0;
let appointment_url = "http://202.120.40.8:30611/Entity/Udbdc8b322a1243/hospitalx/Appointment/";
let prescription_url = "http://202.120.40.8:30611/Entity/Udbdc8b322a1243/hospitalx/Prescription/";

class PatientPage extends Component {
    constructor(props){
        super(props);
        // TODO: register info and prescription info state
        this.state = {
            visible: false,
            data_register: [],
            data_prescription: [],
        }
        this.handleRegister = this.handleRegister.bind(this)
        this.showModal = this.showModal.bind(this)
        this.getInformation = this.getInformation.bind(this)
    }

    handlePayment(id) {
        this.showModal()
        axios.get(prescription_url + id).then(res => {
            let data = res.data
            data['payed'] = 1
            axios.put(prescription_url + id, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(() => this.getInformation())
        })
    }

    getInformation() {
        axios.get(appointment_url).then(res => {
                let data_appointment = {}
                let data_prescription = {}
                if (res.data != null && res.data['Appointment'] !== undefined) {
                    data_appointment = res.data['Appointment'].map((item, index) => {
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
                    axios.get(prescription_url).then(res => {
                        if (res.data != null && res.data['Prescription'] !== undefined) {
                            data_prescription = res.data['Prescription'].map((item, index) => {
                                return {
                                    key: index,
                                    number: item['aid'],
                                    medicinename: item['medicinename'],
                                    payment:
                                        <Button disabled={item['payed']} onClick={() => this.handlePayment(item['id'])}>
                                            pay
                                        </Button>
                                }
                            })
                        }
                        this.setState({data_register: data_appointment, data_prescription: data_prescription})
                    })
                }
            })
    }

    componentWillMount() {
        this.getInformation()
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
        this.getInformation()
    }

    showModal(text) {
        Modal.info({
            title: 'Confirmation',
            content: "Confirm your payment",
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
                                    <br/><br/>
                                    <h1>Register Information</h1>
                                    <Table columns={columns_register} dataSource={this.state.data_register} />
                                    <br/><br/>
                                    <h1>Prescription Information</h1>
                                    <Table columns={columns_prescription} dataSource={this.state.data_prescription} />
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