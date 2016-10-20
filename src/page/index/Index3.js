import React, {Component} from 'react';
import BackBar from '../public/BackBar/BackBar';

class Index2 extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
    }

    componentDidMount () {

    }

    clickAction () {
        this.props.changeRoute('?page=1');
    }

    render() {
        return (
            <div className="page">
                <BackBar
                    title="第3页"
                    backPage={2}
                    changeRoute={this.props.changeRoute}
                />
                <div onClick={this.clickAction.bind(this)}>33333</div>
            </div>
        );
    }

}

export default Index2;
