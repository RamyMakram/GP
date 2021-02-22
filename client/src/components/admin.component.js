import React, { Component } from "react";

export default class admin extends Component {
    render() {
        return (
            <div>
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Add Pharmacy</button>
                        <button class="nav-link" id="nav-contact-tab" onClick={this.getMediciens} data-bs-toggle="tab" data-bs-target="#nav-med" type="button" role="tab" aria-controls="nav-med" aria-selected="false">Add Manifiactor</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Manage Pharmacy</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Manage Manifiactor</button>
                    </div>
                </nav>
                {/* {div}
            <div class="tab-content" id="nav-tabContent"> 
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
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
                <div class="tab-pane fade" id="nav-med" role="tabpanel" aria-labelledby="nav-med-tab">
                    {mediciens_div}
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    {Orders_div}
                </div>
            </div>
        */}
            </div>
        );
    }
}