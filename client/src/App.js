import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Manifactor from "./components/manifiactor.component";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// class App extends Component {
//     state = { storageValue: 0, web3: null, accounts: null, contract: null };

//     componentDidMount = async () => {
//         try {
//             // Get network provider and web3 instance.
//             const web3 = await getWeb3();

//             // Use web3 to get the user's accounts.
//             const accounts = await web3.eth.getAccounts();

//             // Get the contract instance.
//             const networkId = await web3.eth.net.getId();
//             const deployedNetwork = SimpleStorageContract.networks[networkId];
//             const instance = new web3.eth.Contract(
//                 SimpleStorageContract.abi,
//                 deployedNetwork && deployedNetwork.address,
//             );
//             const deployedNetwork2 = PharmacyContract.networks[networkId];
//             const instance2 = new web3.eth.Contract(
//                 PharmacyContract.abi,
//                 deployedNetwork2 && deployedNetwork2.address,
//             );


//             // Set web3, accounts, and contract to the state, and then proceed with an
//             // example of interacting with the contract's methods.
//             this.setState({ web3, accounts, cone: instance2, contract: instance }, this.runExample);
//         } catch (error) {
//             // Catch any errors for any of the above operations.
//             alert(
//                 `Failed to load web3, accounts, or contract. Check console for details.`,
//             );
//             console.error(error);
//         }
//     };

//     runExample = async () => {
//         const { web3,accounts, cone, contract } = this.state;
//         console.log(cone)

//         await cone.methods.regiter("ramy",("ramy"),("ramy")).send({ from: accounts[0],gas:3000000 });
//          var x = await cone.methods.login(("ramy"),("ramy")).call({ from: accounts[0],gas:3000000 });
//          console.log(x)
//         // var sx = await cone.methods.returnSearchedMedicienData().call({ from: accounts[0] });
//         // console.log(sx)
//         // const web3 = await getWeb3();

//         // const networkId = await web3.eth.net.getId();
//         // const deployedNetwork = SimpleStorageContract.networks[networkId];
//         // const instance = new web3.eth.Contract(
//         //   SimpleStorageContract.abi,
//         //   deployedNetwork && deployedNetwork.address,
//         // );
//         // Stores a given value, 5 by default.
//         await contract.methods.set(5).send({ from: accounts[0] });

//         // Get the value from the contract to prove it worked.
//         const response = await contract.methods.get().call();

//         // Update state with the result.
//         this.setState({ storageValue: response });
//     };

//     render() {
//         if (!this.state.web3) {
//             return <div>Loading Web3, accounts, and contract...</div>;
//         }
//         return (
//             <div className="App">
//                 <h1>Good to Go!</h1>
//                 <p>Your Truffle Box is installed and ready.</p>
//                 <h2>Smart Contract Example</h2>
//                 <p>
//                     If your contracts compiled and migrated successfully, below will show
//                     a stored value of 5 (by default).
//         </p>
//                 <p>
//                     Try changing the value stored on <strong>line 40</strong> of App.js.
//         </p>
//                 <div>The stored value is: {this.state.storageValue}</div>
//             </div>
//         );
//     }
// }
function App() {
    return (<Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>RemoteStack</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  
        <div className="outer">
          <div className="inner">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/manifactor" component={Manifactor} />
            </Switch>
          </div>
        </div>
      </div></Router>
    );
  }
export default App;
