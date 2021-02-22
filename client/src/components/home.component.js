import React, { Component } from "react";
import PharmacyContract from "../contracts/Pharmacy.json";
import MainifactorContract from "../contracts/Mainifactors.json";
import getWeb3 from "../getWeb3"

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', pass: '', type: '', web3: null, contract: null, site: "", accounts: null, networkId: null, errorLogin: false }
        this.onSiteChanged = this.onSiteChanged.bind(this);
        this.login = this.login.bind(this);
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
    render() {
        return (
            <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="author" content="colorlib.com" />
                    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
                    <link href="../assets/css/main.css" rel="stylesheet" />
                </head>
                <body>
                    <div class="s130">
                        <form>
                            <div class="inner-form">
                                <div class="input-field first-wrap">
                                    <div class="svg-wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                        </svg>
                                    </div>
                                    <input id="search" type="text" placeholder="What are you looking for?" />
                                </div>
                                <div class="input-field second-wrap">
                                    <button class="btn-search" type="button">SEARCH</button>
                                </div>
                            </div>
                            <span class="info">ex. Game, Music, Video, Photography</span>
                        </form>
                    </div>
                    <script src="../assets/js/extention/choices.js"></script>
                </body>
            </html>

        );
    }
}