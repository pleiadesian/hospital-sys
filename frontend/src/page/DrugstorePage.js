import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/index'
import { Layout, Menu, Button, Row, Table } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

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

let medicine_url = "http://202.120.40.8:30611/Entity/Udbdc8b322a1243/hospitalx/Medicine/";
let prescription_url = "http://202.120.40.8:30611/Entity/Udbdc8b322a1243/hospitalx/Prescription/";

class DrugstorePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data_prescription: [],
        }
        this.handlePrescribe = this.handlePrescribe.bind(this)
    }

    handlePrescribe(pid, mid) {
        // stock decline in medicine table
        axios.get(prescription_url + "?Prescription.medicineid=" + mid).then(res => {
            let params = res.data['Medicine'][0]
            params['stock'] -= 1
            if (params['stock'] >= 0) {
                axios.put(prescription_url + pid, params, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                })
                // record prescribed in prescription table
                axios.get(prescription_url + pid).then(res => {
                    let presc_params = res.data
                    presc_params['prescribed'] = 1
                    axios.put(prescription_url + pid, presc_params, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    })
                })
            } else {
                alert("This medicine has used up!")
            }
        })
    }

    componentWillMount() {
        axios.get(prescription_url).then(res => {
            console.log(res.data)
            if (res.data != null && res.data.size > 0) {
                let data = res.data['Prescription'].map((item, index) => {
                    return {
                        key: index,
                        number: item['aid'],
                        prescribestate: item['prescribed'] ? "prescribed" : "not prescribed",
                        prescribebutton:
                            <Button disabled={item['prescribed']}
                                    onClick={() => this.handlePrescribe(item['id'], item['medicineid'])}>
                                prescribe
                            </Button>
                    }
                })
            }
        })
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

export default DrugstorePage;