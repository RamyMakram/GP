import React, { Component } from "react";
import PharmacyContract from "../contracts/Pharmacy.json";
import MainifactorContract from "../contracts/Mainifactors.json";
import getWeb3 from "../getWeb3"

export default class admin extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', pass: '', name: '', web3: null, contract: null, site: "", accounts: null, networkId: null, errorLogin: false }
        this.AddPharmacy = this.AddPharmacy.bind(this);
        this.AddManficator = this.AddManficator.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount = async () => {
        const web3 = await getWeb3();
        console.log(web3)
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();

        this.setState({
            accounts: accounts,
            web3: web3,
            networkId: networkId
        })
    }
    async AddPharmacy(event) {
        event.preventDefault();

        let deployedNetwork2 = PharmacyContract.networks[this.state.networkId];
        let instance2 = new this.state.web3.eth.Contract(
            PharmacyContract.abi,
            deployedNetwork2 && deployedNetwork2.address,
        );
        try {
            var x = await instance2.methods.regiter(this.state.username, this.state.pass, this.state.name).send({ from: this.state.accounts[0], gas: 3000000 });
            console.log(x)
            // var xc = await instance2.methods.deleiverMedicien(medid).call({ from: this.state.accounts[0], gas: 3000000 });
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Confirm Order"
            })
        }
    }
    async AddManficator(event) {
        event.preventDefault();
console.log(event)
debugger
        let deployedNetwork2 = MainifactorContract.networks[this.state.networkId];
        let instance2 = new this.state.web3.eth.Contract(
            MainifactorContract.abi,
            deployedNetwork2 && deployedNetwork2.address,
        );
        try {
            var x = await instance2.methods.regiter(this.state.username, this.state.pass, this.state.name).send({ from: this.state.accounts[0], gas: 3000000 });
            console.log(x)
            // var xc = await instance2.methods.deleiverMedicien(medid).call({ from: this.state.accounts[0], gas: 3000000 });
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Confirm Order"
            })
        }
    }
    render() {
        return (
            <div>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Add Pharmacy</button>
                        <button className="nav-link" id="nav-contact-tab" onClick={this.getMediciens} data-toggle="tab" data-target="#nav-med" type="button" role="tab" aria-controls="nav-med" aria-selected="false">Add Manifiactor</button>
                        <button className="nav-link" id="nav-profile-tab" data-toggle="tab" data-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Manage Pharmacy</button>
                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Manage Manifiactor</button>
                    </div>
                </nav>
                {/* {div} */}
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <form onSubmit={this.AddPharmacy}>
                            <h3>Add Farmacy</h3>
                            <div className="form-group">
                                <label>username</label>
                                <input type="text" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} className="form-control" placeholder="Name" />
                            </div>

                            <div className="form-group">
                                <label>password</label>
                                <input type="text" value={this.state.pass} onChange={e => this.setState({ pass: e.target.value })} className="form-control" placeholder="Serial" />
                            </div>

                            <div className="form-group">
                                <label>name</label>
                                <input type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} className="form-control" placeholder="Production Date" />
                            </div>

                            <button type="submit" className="btn btn-dark btn-lg btn-block">Save</button>
                        </form>
                    </div>
                    <div className="tab-pane fade  show active" id="nav-med" role="tabpanel" aria-labelledby="nav-med-tab">
                        <form onSubmit={this.AddManficator}>
                            <h3>Add Manifactor</h3>
                            <div className="form-group">
                                <label>username</label>
                                <input type="text" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} className="form-control" placeholder="Name" />
                            </div>

                            <div className="form-group">
                                <label>password</label>
                                <input type="text" value={this.state.pass} onChange={e => this.setState({ pass: e.target.value })} className="form-control" placeholder="Serial" />
                            </div>

                            <div className="form-group">
                                <label>name</label>
                                <input type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} className="form-control" placeholder="Production Date" />
                            </div>

                            <button type="submit" className="btn btn-dark btn-lg btn-block">Save Manif</button>
                        </form>
                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        {/* {Orders_div} */}
                    </div>
                </div>
            </div>
        );
    }
}