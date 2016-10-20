require("./BackBar.less");

import React, {Component} from 'react';

class BackBar extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
    }

    changeRoute (url) {
        this.props.changeRoute(url);
    }

    goBack () {
        if (this.props.backPage) {
            this.changeRoute('?page=' + this.props.backPage);
        }
    }

    getBackIon () {
        if (!this.props.backPage) {
            return;
        }
        return (
            <div className="backIcon" onClick={this.goBack.bind(this)}>
                <b className="backArrow rt180">
                    <i className="backEm3"></i>
                    <i className="backEm2"></i>
                </b>
            </div>
        );
    }

    render() {
        var backStyle = {};
        if (this.props.noBottom) {
            backStyle.borderBottom = 'none';
        }
        return (
            <div className="backBar" style={backStyle}>
                {this.getBackIon()}
                {this.props.title}
            </div>
        );
    }

}

export default BackBar;
