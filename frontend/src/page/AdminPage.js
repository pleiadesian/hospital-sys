import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/index'
import {Layout, List, Menu, Button, Row, Table, Modal, Select} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "antd/es/input/Search";

const { Content, Sider } = Layout;
const { Option } = Select;

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

let medicine_url = "http://202.120.40.8:30611/Entity/Udbdc8b322a1243/hospitalx/Medicine/";
let schedule_url = "http://202.120.40.8:30611/Entity/Udbdc8b322a1243/hospitalx/Schedule/";
let prescription_url = "http://202.120.40.8:30611/Entity/Udbdc8b322a1243/hospitalx/Prescription/";

class DoctorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_medicine: [],
            data_docter: [],
            data_prescription: [],
        }
        this.handleStockChange = this.handleStockChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleScheduleChange = this.handleScheduleChange.bind(this)
        this.showMedicineModal = this.showMedicineModal.bind(this)
        this.showDoctorModal = this.showDoctorModal.bind(this)
        this.getInformation = this.getInformation.bind(this)
    }

    getInformation() {
        let data_medicine = {}
        let data_docter = {}
        let data_prescription = {}
        axios.get(medicine_url).then(res => {
            data_medicine = res.data['Medicine'].map((item, index) => {
                return {
                    key: index,
                    name: item['name'],
                    stock: item['stock'],
                    price: item['price'],
                    update:
                        <Button onClick={() => this.showMedicineModal(item['id'])}>
                            update
                        </Button>
                }
            })
            axios.get(schedule_url).then(res => {
                if (res.data != null && res.data['Schedule'] !== undefined) {
                    data_doctor = res.data['Schedule'].map((item, index) => {
                        return {
                            key: index,
                            name: item['doctorname'],
                            attendance: item['day'],
                            update: 
                                <Button onClick={() => this.showDoctorModal(item['id'])}>
                                    update
                                </Button>
                        }
                    })
                }
                axios.get(prescription_url).then(res => {
                    if (res.data != null && res.data['Prescription'] !== undefined) {
                        data_prescription = res.data['Prescription'].map((item, index) => {
                            return {
                                key: index,
                                export: 
                                    <Button onClick={() => this.showPrescriptionModal(item)}>
                                        export
                                    </Button>
                            }
                        })
                    }
                })
            })
        })
    }

    componentWillMount() {
        this.getInformation()
    }

    handleStockChange(id, value) {
        if (!(parseInt(value) > 0))
            alert("Wrong stock format!")
        else
            axios.get(medicine_url + id).then(res => {
                let params = res.data
                params['stock'] = parseInt(value)
                axios.put(medicine_url + id, params, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(() => this.getInformation())
            })
    }

    handlePriceChange(id, value) {
        if (!(parseFloat(value) > 0.0))
            alert("Wrong price format!")
        else
            axios.get(medicine_url + id).then(res => {
                let params = res.data
                params['price'] = parseFloat(value)
                axios.put(medicine_url + id, params, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(() => this.getInformation())
            })
    }

    showPrescriptionModal(item) {
        Modal.info({
            title: 'Prescription Info',
            content:
            <>
                <p>number:{item['aid']}</p>
                <p>patientID:{item['patientid']}</p>
                <p>medicine:{item['medicinename']}</p>
                <p>payed:{item['payed'] ? "true" : "false"}</p>
                <p>prescribed:{item['prescribed'] ? "true" : "false"}</p>
            </>
        })
    }

    showMedicineModal(id) {
        Modal.info({
            title: 'Update Medicine Info',
            content:
                <>
                    <span>stock:</span>
                    <Search
                        placeholder="input stock"
                        enterButton="Update"
                        onSearch={(value) => this.handleStockChange(id, value)}
                    />
                    <span>price:</span>
                    <Search
                        placeholder="input price"
                        enterButton="Update"
                        onSearch={(value) => this.handlePriceChange(id, value)}
                    />
                </>,
            onOk() {}
        })
    }

    handleScheduleChange(id, value) {
        axios.get(schedule_url + id).then(res => {
            let params = res.data
            params['day'] = value.join(',')
            axios.put(schedule_url + id, params, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(() => this.getInformation())
        })
    }

    showDoctorModal(id) {
        Modal.info({
            title: 'Update Schedule Info',
            content:
                <Select
                    mode="tags"
                    onChange={(value) => this.handleScheduleChange(id, value)}
                    style={{ width: '100%' }}
                >
                    <Option key="Monday">Monday</Option>
                    <Option key="Tuesday">Tuesday</Option>
                    <Option key="Wednesday">Wednesday</Option>
                    <Option key="Thursday">Thursday</Option>
                    <Option key="Friday">Friday</Option>
                </Select>
        })
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
                                        <Table columns={columns_medicine} dataSource={this.state.data_medicine} />
                                        <br/><br/>
                                        <h1>Department Information</h1>
                                        <Table columns={columns_department} dataSource={data_department} />
                                        <br/><br/>
                                        <h1>Doctor Information</h1>
                                        <Table columns={columns_doctor} dataSource={this.state.data_doctor} />
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

export default DoctorPage;