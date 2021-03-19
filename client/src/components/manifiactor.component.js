import React, { Component } from "react";
import PharmacyContract from "../contracts/Pharmacy.json";
import MedicienContract from "../contracts/Mediciences.json";
import getWeb3 from "../getWeb3";

export default class Manifactor extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', id: '', serial: '', productiondate: 0, expiredate: 0, manfiactorid: 0, error: '', type: '', web3: null, contract: null, site: "", accounts: null, networkId: null, errorLogin: false, orders: [], medicen: [], User: null }
        this.AddMedicien = this.AddMedicien.bind(this);
        this.getMediciens = this.getMediciens.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.setState({
            User: localStorage.getItem("M")
        })
    }
    componentDidMount = async () => {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();

        this.setState({
            accounts: accounts,
            web3: web3,
            networkId: networkId
        })
    }
    async AddMedicien(eve) {
        eve.preventDefault();
        let deployedNetwork2 = MedicienContract.networks[this.state.networkId];
        let instance2 = new this.state.web3.eth.Contract(
            MedicienContract.abi,
            deployedNetwork2 && deployedNetwork2.address,
        );
        try {
            console.log(instance2);
            var x = await instance2.methods.addmedicen(this.state.name, this.state.serial, this.state.productiondate, this.state.expiredate, this.state.manfiactorid).send({ from: this.state.accounts[0], gas: 3000000 });
            console.log(x)
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Adding Medicien"
            })
        }
    }
    async getMediciens() {
        let deployedNetwork2 = MedicienContract.networks[this.state.networkId];
        let instance2 = new this.state.web3.eth.Contract(
            MedicienContract.abi,
            deployedNetwork2 && deployedNetwork2.address,
        );
        try {
            var x = await instance2.methods.getmedicienbymanf(this.state.User["id"]).send({ from: this.state.accounts[0], gas: 3000000 });
            var data = await instance2.methods.returnSearchedData().call({ from: this.state.accounts[0], gas: 3000000 });
            this.setState({
                medicen: data
            })
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Adding Medicien"
            })
        }
    }
    async confirmOrder(id, medid) {
        let deployedNetwork2 = PharmacyContract.networks[this.state.networkId];
        let instance2 = new this.state.web3.eth.Contract(
            PharmacyContract.abi,
            deployedNetwork2 && deployedNetwork2.address,
        );
        try {
            var x = await instance2.methods.confirmOrder(id).call({ from: this.state.accounts[0], gas: 3000000 });
            var xc = await instance2.methods.deleiverMedicien(medid).call({ from: this.state.accounts[0], gas: 3000000 });
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Confirm Order"
            })
        }
    }
    async getOrders() {
        let deployedNetwork2 = PharmacyContract.networks[this.state.networkId];
        let instance2 = new this.state.web3.eth.Contract(
            PharmacyContract.abi,
            deployedNetwork2 && deployedNetwork2.address,
        );
        try {
            var x = await instance2.methods.getOrderbymanfi(this.state.User["id"]).send({ from: this.state.accounts[0], gas: 3000000 });
            var data = await instance2.methods.returnSearchedOrderData().call({ from: this.state.accounts[0], gas: 3000000 });
            this.setState({
                orders: data
            })
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Get Orders"
            })
        }
    }

    render() {
        let div;
        if (this.state.errorLogin) {
            div = <div className="alert alert-danger" role="alert">
                {this.state.error}
            </div>
        }

        let mediciens_div;
        if (this.state.medicen.length != 0) {
            mediciens_div = <div className="containeer">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Serial</th>
                            <th scope="col">Production Date</th>
                            <th scope="col">Expire Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.medicen.map(i => {
                            return <tr>
                                <th scope="row">{i["id"]}</th>
                                <td>{i["name"]}</td>
                                <td>{i["serial"]}</td>
                                <td>{i["productiondate"]}</td>
                                <td>{i["expiredate"]}</td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        }
        let Orders_div;
        if (this.state.orders.length != 0) {
            Orders_div = <div className="containeer">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Medicien Id</th>
                            <th scope="col">Parmacy Id</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map(i => {
                            return <tr>
                                <th scope="row">{i["orderid"]}</th>
                                <td>{i["medicienid"]}</td>
                                <td>{i["parmacyid"]}</td>
                                <td>{i["confirmed"] ? <span></span> : <button className="btn btn-primary" onClick={this.confirmOrder(i["orderid"], i["medicienid"])}>Confirm</button>}</td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        }
        return (

            <div style={{ width: '60vw' }}>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Add Medicien</button>
                        <button className="nav-link" id="nav-contact-tab" onClick={this.getMediciens} data-bs-toggle="tab" data-bs-target="#nav-med" type="button" role="tab" aria-controls="nav-med" aria-selected="false">All Mediciens</button>
                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">All Order</button>
                    </div>
                </nav>
                {div}
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <form onSubmit={this.AddMedicien}>
                            <h3>Add Medicien</h3>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} className="form-control" placeholder="Name" />
                            </div>

                            <div className="form-group">
                                <label>Serial</label>
                                <input type="text" value={this.state.serial} onChange={e => this.setState({ serial: e.target.value })} className="form-control" placeholder="Serial" />
                            </div>

                            <div className="form-group">
                                <label>Production Date</label>
                                <input type="Date" value={this.state.productiondate} onChange={e => this.setState({ productiondate: e.target.value })} className="form-control" placeholder="Production Date" />
                            </div>

                            <div className="form-group">
                                <label>Expire Date</label>
                                <input type="Date" value={this.state.expiredate} onChange={e => this.setState({ expiredate: e.target.value })} className="form-control" placeholder="Expire Date" />
                            </div>

                            <button type="submit" className="btn btn-dark btn-lg btn-block">Save</button>
                        </form>
                    </div>
                    <div className="tab-pane fade" id="nav-med" role="tabpanel" aria-labelledby="nav-med-tab">
                        {mediciens_div}
                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        {Orders_div}
                    </div>
                </div>
            </div>
        );
    }
}