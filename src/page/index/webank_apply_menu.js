import React, {Component} from 'react';
require("./webank_apply.less");

class WebankApplyMenu extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
        this.menuText = [
            '基本信息',
            '驾照',
            '银行流水'
        ];
        this.pageTotal = this.props.pageTotal || 2;
        this.page = this.props.page || 1;
        //this.page = 3;
        //this.pageTotal = 4;
    }

    changeRoute (url, item) {
        if (item + 1 >= this.page) {
            //return;
        }
        this.props.changeRoute(url);
    }

    mapCircle () {
        var pageTotal = this.pageTotal;
        var circleArr = [];
        for (var i = 0; i < pageTotal; i++) {
            circleArr.push(i);
        }
        return circleArr.map(function(item){
            var style = {
                left: (item * 100/pageTotal) + '%',
                width: (100/pageTotal) + '%'
            }
            var className = 'circle circle' + item;
            if (this.page > item) {
                className = 'circle circle' + item + 'Check circleCheck';
            }
            return (
                <div key={item} className='circleItem' style={style}>
                    <div onClick={this.changeRoute.bind(this, '?page=' + (item + 1), item)} className={className}></div>
                </div>
            );
        }.bind(this));
    }

    getLineArea () {
        var lineAreaStyle = {
            left: (100/this.pageTotal)/2 + '%',
            width: 100 - (100/this.pageTotal) + '%'
        };
        var lineStyle = {
            width: (this.page - 1) * 100/(this.pageTotal - 1) + '%'
        };
        return (
            <div className="lineArea" style={lineAreaStyle}>
                <div className="line" style={lineStyle}></div>
            </div>
        );
    }

    mapText () {
        var pageTotal = this.pageTotal;
        var textArr = [];
        for (var i = 0; i < pageTotal; i++) {
            textArr.push(i);
        }
        return textArr.map(function(item){
            var className = 'text';
            var style = {
                width: 100/pageTotal + '%',
                left: item * (100/pageTotal) + '%'
            };
            if (this.page > item) {
                className = 'text textCheck';
            }
            return (
                <div key={item} className={className} style={style}>
                    {this.menuText[item]}
                </div>
            );
        }.bind(this));
    }

    render() {
        return (
            <div className="WebankApplyMenu">
                <div className="circleArea">
                    {this.mapCircle()}
                </div>
                {this.getLineArea()}
                <div className="textArea">
                    {this.mapText()}
                </div>
            </div>
        );
    }

}

export default WebankApplyMenu;
