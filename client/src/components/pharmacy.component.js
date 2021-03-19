import React, { Component } from "react";
import PharmacyContract from "../contracts/Pharmacy.json";
import MainifactorContract from "../contracts/Mainifactors.json";
import MedicienContract from "../contracts/Mediciences.json";
import getWeb3 from "../getWeb3";

export default class pharmacy extends Component {
    constructor(props) {
        super(props);
        this.state = { orders: [], medicen: [], Mymedicen: [], User: null, web3: null, contract: null, site: "", accounts: null, networkId: null, errorLogin: false }
        this.getAllMediciens = this.getAllMediciens.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.recieveOrder = this.recieveOrder.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.MyMedicen = this.MyMedicen.bind(this);
        this.setState({
            User: localStorage.getItem("P")
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
      await this.getAllMediciens();

    }
    async getAllMediciens() {
        console.log("medicien")
        let deployedNetwork2 = MedicienContract.networks[this.state.networkId];
        let instance2 = new this.state.web3.eth.Contract(
            MedicienContract.abi,
            deployedNetwork2 && deployedNetwork2.address,
        );
        try {
            var x = await instance2.methods.get_nonorderd_nonconfirmed_medicien().send({ from: this.state.accounts[0], gas: 3000000 });
            console.log(x)
            var data = await instance2.methods.returnSearchedData().call({ from: this.state.accounts[0], gas: 3000000 });
            console.log(data)
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
    async getOrders() {
        let deployedNetwork2 = PharmacyContract.networks[this.state.networkId];
        let instance2 = new this.state.web3.eth.Contract(
            PharmacyContract.abi,
            deployedNetwork2 && deployedNetwork2.address,
        );
        try {
            var x = await instance2.methods.getOrderbypharma(this.state.User["id"]).send({ from: this.state.accounts[0], gas: 3000000 });
            var data = await instance2.methods.returnSearchedOrderData().call({ from: this.state.accounts[0], gas: 3000000 });
            this.setState({
                orders: data
            })
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Adding Medicien"
            })
        }
    }
    async recieveOrder(orderid, medid) {
        let deployedNetwork12 = MedicienContract.networks[this.state.networkId];
        let medi_contract = new this.state.web3.eth.Contract(
            MedicienContract.abi,
            deployedNetwork12 && deployedNetwork12.address,
        );
        var medicen = await medi_contract.methods.getmedicien(medid).call({ from: this.state.accounts[0], gas: 3000000 });
        let deployedNetwork2 = PharmacyContract.networks[this.state.networkId];
        let pharma_contract = new this.state.web3.eth.Contract(
            PharmacyContract.abi,
            deployedNetwork2 && deployedNetwork2.address,
        );
        try {
            var x = await pharma_contract.methods.recieveOrder(orderid).send({ from: this.state.accounts[0], gas: 3000000 });
            var xx = await medi_contract.methods.deleiverMedicien(medid).send({ from: this.state.accounts[0], gas: 3000000 });
            var ddd = await pharma_contract.methods.addmedicen(medicen["name"], medicen["serial"], medicen["productiondate"], medicen["expiredate"], medicen["manfiactorid"], this.state.User["id"]).send({ from: this.state.accounts[0], gas: 3000000 });
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Adding Medicien"
            })
        }
    }
    async addOrder(medid, manfid) {
        let deployedNetwork2 = PharmacyContract.networks[this.state.networkId];
        let instance2 = new this.state.web3.eth.Contract(
            PharmacyContract.abi,
            deployedNetwork2 && deployedNetwork2.address,
        );
        try {
            var x = await instance2.methods.addOrder(medid, manfid, this.state.User["id"]).send({ from: this.state.accounts[0], gas: 3000000 });
            let deployedNetwork12 = MedicienContract.networks[this.state.networkId];
            let instance12 = new this.state.web3.eth.Contract(
                MedicienContract.abi,
                deployedNetwork12 && deployedNetwork12.address,
            );
            var xx = await instance12.methods.OrderMedicien(medid).send({ from: this.state.accounts[0], gas: 3000000 });
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Adding Medicien"
            })
        }
    }
    async MyMedicen(){
        let deployedNetwork2 = MedicienContract.networks[this.state.networkId];
        let instance2 = new this.state.web3.eth.Contract(
            MedicienContract.abi,
            deployedNetwork2 && deployedNetwork2.address,
        );
        try {
            var x = await instance2.methods.getmedicienbyPharma(this.state.User["id"]).send({ from: this.state.accounts[0], gas: 3000000 });
            var data = await instance2.methods.returnSearchedMedicienData().call({ from: this.state.accounts[0], gas: 3000000 });
            this.setState({
                Mymedicen: data
            })
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Adding Medicien"
            })
        }
    }

    render() {
        let mediciens_div;
        if (this.state.medicen.length != 0) {
            mediciens_div = <div className="containeer">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Manfiactor Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Serial</th>
                            <th scope="col">Production Date</th>
                            <th scope="col">Expire Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.medicen.map(i => {
                            return <tr>
                                <th scope="row">{i["id"]}</th>
                                <th scope="row">{i["manfiactorid"]}</th>
                                <td>{i["name"]}</td>
                                <td>{i["serial"]}</td>
                                <td>{i["productiondate"]}</td>
                                <td>{i["expiredate"]}</td>
                                <td><button className="btn btn-primary" onClick={this.addOrder}>Add Order</button></td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        }
        let Mymediciens_div;
        if (this.state.Mymedicen.length != 0) {
            Mymediciens_div = <div className="containeer">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Manfiactor Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Serial</th>
                            <th scope="col">Production Date</th>
                            <th scope="col">Expire Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Mymedicen.map(i => {
                            return <tr>
                                <th scope="row">{i["id"]}</th>
                                <th scope="row">{i["manfiactorid"]}</th>
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
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Medicien Id</th>
                            <th scope="col">Parmacy Id</th>
                            <th scope="col">Confirmed</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map(i => {
                            return <tr>
                                <th scope="row">{i["orderid"]}</th>
                                <td>{i["medicienid"]}</td>
                                <td>{i["parmacyid"]}</td>
                                <td>{i["confirmed"]}</td>
                                <td>
                                    {
                                        i["confirmed"] && i["recieved"] ?
                                            <span></span> :
                                            ((i["confirmed"] && !i["recieved"]) ?
                                                <button className="btn btn-primary" onClick={this.recieveOrder()}>Recieve Order</button>
                                                : <span></span>)

                                    }
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        }
        return (
            <div className="viwe">
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link" id="nav-contact-tab" onClick={this.getAllMediciens} data-bs-toggle="tab" data-bs-target="#nav-med" type="button" role="tab" aria-controls="nav-med" aria-selected="false">All Aviable Mediciens</button>
                        <button class="nav-link" id="nav-profile-tab" onClick={this.getOrders} data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">All Order</button>
                        <button class="nav-link" id="nav-profile-tab" onClick={this.MyMedicen} data-bs-toggle="tab" data-bs-target="#nav-mediciens" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">My Medicenes</button>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-med" role="tabpanel" aria-labelledby="nav-med-tab">
                        {mediciens_div}
                    </div>
                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        {Orders_div}
                    </div>
                    <div class="tab-pane fade" id="nav-mediciens" role="tabpanel" aria-labelledby="nav-profile-tab">
                        {Mymediciens_div}
                    </div>
                </div>
            </div>
        );
    }
}