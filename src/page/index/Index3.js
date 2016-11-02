import React, {Component} from 'react';
import BackBar from '../public/BackBar/BackBar';
import {VerticalScrollPage} from '../../component/ScrollPage/ScrollPage';

class Index3 extends Component {

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
                <VerticalScrollPage
                    height={300}
                >
                    <div className="VerticalScrollPageItem">
                        <ul>
                            <li className="item">1-1</li>
                            <li className="item">1-2</li>
                            <li className="item">1-3</li>
                            <li className="item">1-4</li>
                            <li className="item">1-5</li>
                        </ul>
                    </div>
                    <div className="VerticalScrollPageItem">
                        <ul>
                            <li className="item">2-1</li>
                            <li className="item">2-2</li>
                            <li className="item">2-3</li>
                            <li className="item">2-4</li>
                            <li className="item">2-5</li>
                        </ul>
                    </div>
                    <div className="VerticalScrollPageItem">
                        <ul>
                            <li className="item">3-1</li>
                            <li className="item">3-2</li>
                            <li className="item">3-3</li>
                            <li className="item">3-4</li>
                            <li className="item">3-5</li>
                        </ul>
                    </div>
                </VerticalScrollPage>
            </div>
        );
    }

}

export default Index3;
