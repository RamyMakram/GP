import React, { Component } from 'react';

class Loading extends Component {
    render() {
        return (
            <div className="loadinger">
                <div className="col-12">
                    <img src={require('../assets/images/loading.gif')} />
                    <p>Loading Please Be Patient</p>
                </div>
            </div>
        );
    }
}

export default Loading;