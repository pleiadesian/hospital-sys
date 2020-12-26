import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/index'
import {Layout, Menu, Button, Row, Table, Modal, Input, Select} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const { Content, Sider } = Layout;
const { Option } = Select;

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

let pid = 0;
let appointment_url = "http://202.120.40.8:30611/Entity/Udbdc8b322a1243/hospitalx/Appointment/";
let medicine_url = "http://202.120.40.8:30611/Entity/Udbdc8b322a1243/hospitalx/Medicine/";
let prescription_url = "http://202.120.40.8:30611/Entity/Udbdc8b322a1243/hospitalx/Prescription/";

class DoctorPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data_admission: [],
        }
        this.getAppointment = this.getAppointment.bind(this)
        this.handleCheckTextChange = this.handleCheckTextChange.bind(this)
        this.handleModalOk = this.handleModalOk.bind(this)
        this.showModal = this.showModal.bind(this)
        this.handlePrescChange = this.handlePrescChange.bind(this)
    }

    getAppointment() {
        axios.get(appointment_url).then(res => {
                if (res.data != null && res.data['Appointment'] !== undefined) {
                    let data = res.data['Appointment'].map((item, index) => {
                        return {
                            key: index,
                            number: item['id'],
                            name: item['patientname'],
                            admission: item['completion'] ? 'checked' : 'not checked',
                            check:
                                <Button disabled={item['completion']} onClick={() => this.showModal(item['id'])}>
                                    checklist
                                </Button>,
                        };
                    })
                    this.setState({data_admission: data})
                }
            })
    }

    componentWillMount() {
        this.getAppointment()
    }

    handleCheckTextChange(id, event) {
        axios.get(appointment_url + id)
            .then(res => {
                let params = res.data
                params['content'] = event.target.value
                axios.put(appointment_url + id, params, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                })
            })
    }

    handlePrescChange(id, value) {
        let params = {}
        let mid = value
        axios.get(medicine_url + "?Medicine.mid=" + mid)
            .then(res => {
                params['medicinename'] = res.data['Medicine'][0]['name']
                params['medicineprice'] = res.data['Medicine'][0]['price']
                axios.get(prescription_url + "?Prescription.aid=" + id)
                    .then(res => {
                        let put_params = res.data['Prescription'][0]
                        console.log(put_params)
                        put_params['medicineid'] = parseInt(mid)
                        put_params['medicinename'] = params['medicinename']
                        put_params['medicineprice'] = params['medicineprice']
                        axios.put(prescription_url + put_params['id'], put_params, {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        })
                    })
            })
    }

    handleModalOk(id) {
        // finish checking and prescribing
        axios.get(appointment_url + id)
            .then(res => {
                let params = res.data
                params['completion'] = 1
                axios.put(appointment_url + id, params, {headers: {'Content-Type': 'application/json;charset=UTF-8'},})
                    .then(() => {this.getAppointment()})
            })
    }

    showModal(id) {
        // create a new prescription for this admission id
        let params = {
            "pid": pid,
            "aid": id,
            "patientid": 1,
            "medicineid": 0,
            "payed": 0,
            "prescribed": 0,
        }
        pid += 1
        axios.get(medicine_url + "?Medicine.mid=" + params['medicineid'])
            .then(res => {
                console.log(res.data)
                console.log(res.data['Medicine'][0])
                params['medicinename'] = res.data['Medicine'][0]['name']
                params['medicineprice'] = res.data['Medicine'][0]['price']
                console.log(params)
                axios.post(prescription_url, params).then(() => {
                    // show modal and wait for doctor checking and prescribing
                    Modal.info({
                        title: 'Checklist',
                        content:
                            <>
                                <Input placeholder="Enter check result"
                                       onChange={(event) => this.handleCheckTextChange(id, event)}
                                />
                                {/*<Input placeholder="Enter prescription"*/}
                                {/*       onChange={(event) => this.handlePrescTextChange(id, event)}*/}
                                {/*/>,*/}
                                <Select defaultValue="0" onChange={(value) => this.handlePrescChange(id, value)}>
                                    <Option value="0">Aspirin</Option>
                                    <Option value="1">Astragalus</Option>
                                    <Option value="2">Codonopsis</Option>
                                </Select>
                            </>,
                        onOk: () => this.handleModalOk(id),
                    })
                })
            })
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
                                        <Table columns={columns_admission} dataSource={this.state.data_admission} />
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