import React, { Component } from "react";
import PharmacyContract from "../contracts/Pharmacy.json";
import MainifactorContract from "../contracts/Mainifactors.json";
import getWeb3 from "../getWeb3";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', pass: '', type: '', web3: null, contract: null, site: "P", accounts: null, networkId: null, errorLogin: false }
        this.onSiteChanged = this.onSiteChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.site);
        switch (this.state.site) {
            case "P":
                let deployedNetwork2 = PharmacyContract.networks[this.state.networkId];
                let instance2 = new this.state.web3.eth.Contract(
                    PharmacyContract.abi,
                    deployedNetwork2 && deployedNetwork2.address,
                );
                var x = await instance2.methods.login(this.state.username, this.state.pass).call({ from: this.state.accounts[0], gas: 3000000 });
                console.log(x)
                if (x["deleted"]) {
                    this.setState({
                        errorLogin: true,
                        username: "",
                        pass: ""
                    })
                }
                else {
                    localStorage.setItem('P', x);
                    this.setState({
                        errorLogin: false
                    })
                    this.props.history.push('/pharmacy');
                }
                break;
            case "M":
                let deployedNetwork22 = MainifactorContract.networks[this.state.networkId];
                let instance22 = new this.state.web3.eth.Contract(
                    MainifactorContract.abi,
                    deployedNetwork22 && deployedNetwork22.address,
                );
                var x = await instance22.methods.login(this.state.username, this.state.pass).call({ from: this.state.accounts[0], gas: 3000000 });
                console.log(x)
                if (x["deleted"]) {
                    this.setState({
                        errorLogin: true,
                        username: "",
                        pass: ""
                    })
                }
                else {
                    localStorage.setItem('M', x);
                    this.setState({
                        errorLogin: false
                    })
                    this.props.history.push('/manifactor');
                }
                break;

            case "A":
                console.log("admin")
                this.props.history.push('/admin');
                if (this.state.usernam == "admin" && this.state.pass == "admin") {

                } else {
                    this.setState({
                        errorLogin: false
                    })
                }
                break;
        }

        // await instance2.methods.regiter("ramy", ("ramy"), ("ramy")).send({ from:this.state.accounts[0], gas: 3000000 });

    }
    onSiteChanged(e) {
        console.log(e)
        this.setState({
            site: e.currentTarget.value
        });
    }
    render() {
        let div;
        if (this.state.errorLogin) {
            div = <div className="alert alert-danger" role="alert">
                Wrong UserName Or Password Please Try Again With Real Data
          </div>
        }
        return (
            <div className="viwe">
                <form onSubmit={this.handleSubmit} >

                    <h3>Log in</h3>
                    {div}
                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" className="form-control" placeholder="Enter email" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={this.state.pass} onChange={e => this.setState({ pass: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <input className="input-radio" id="1s" type="radio" name="site_name"
                            value="P"
                            onChange={this.onSiteChanged} defaultChecked="checked" />
                        <label htmlFor="1s">Pharmacy</label>
                        <input className="input-radio" id="2s" type="radio" name="site_name"
                            value="M"
                            onChange={this.onSiteChanged} />
                        <label htmlFor="2s">Manifactor</label>
                        <input className="input-radio" id="3s" type="radio" name="site_name"
                            value="A"
                            onChange={this.onSiteChanged} />
                        <label htmlFor="3s">Admin</label>
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                    {/* <p className="forgot-password text-right">
    Forgot <a href="#">password?</a>
</p> */}
                </form>

            </div>);
    }
}