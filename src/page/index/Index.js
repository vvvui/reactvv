import React, {Component} from 'react';
import Route from '../../component/Route/Route';
import Index1 from './Index1';
import Index2 from './Index2';
import Index3 from './Index3';

class Index extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
    }

    componentDidMount () {

    }

    changeRoute (url) {
        this.urlSearch = url;
        this.setState({
            open: true
        });
    }

    render() {
        var roteProps = {
            animate: true,
            urlSearch: this.urlSearch
        }
        return (
            <Route {...roteProps}>
                <Index1 changeRoute={this.changeRoute.bind(this)}/>
                <Index2 changeRoute={this.changeRoute.bind(this)}/>
                <Index3 changeRoute={this.changeRoute.bind(this)}/>
            </Route>
        );
    }

}

export default Index;
