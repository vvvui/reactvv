require("./Selector.less");

import React, {Component} from 'react';
import Selector from './Selector';

class MutipleSelector extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
        this.param = {
            data: this.props.data || {},
            selectorData: [],
            resultData: [],
            resultFormat: this.props.resultFormat || [],
            format: this.props.format || []
        }
        this.playLevel = 0;
    }

    componentDidMount () {
        var param = this.param;
        param.selectorData = [];
        this.getSelectorData(0, param.data);
        this.setState({
            open: true
        });
    }

    getSelectorData (id, data) {
        var param = this.param;
        if (data.data) {
            if (param.resultData[id] || param.resultData[id] == 0) {
                data.defaultValue = param.resultData[id];
            }
            var defaultValue = data.defaultValue || 0;
            var selectData = [];
            var sourceData = data.data;
            for (var i in sourceData) {
                selectData.push({
                    option: sourceData[i].option,
                    value: sourceData[i].value
                });
            }
            param.selectorData.push({
                value: defaultValue,
                data: selectData
            });
            if (sourceData[data.defaultValue]) {
                id += 1;
                this.getSelectorData (id, sourceData[data.defaultValue]);
                if (sourceData[data.defaultValue].length == 0) {
                    param.selectorData.push({
                        value: 0,
                        data: []
                    });
                }
            }
        }
    }

    selectorCallback (id, data) {
        var param = this.param;
        param.selectorData[data.level].value = parseInt(id);
        this.setResultData(data.level);
        param.selectorData = [];
        this.getSelectorData(0, param.data);
        this.setState({
            open: true
        });
    }

    setResultData (level) {
        this.playLevel = level;
        var param = this.param;
        param.resultData = [];
        for (var i in param.selectorData) {
            if (i <= level) {
                param.resultData.push(param.selectorData[i].value);
            }
        }
    }

    getSelector () {
        var param = this.param;
        var num = 0;
        for (var i in param.selectorData) {
            param.selectorData[i].key = num;
            if (this.props.showTip) {
                param.selectorData[i].tipText = param.format[num] || '';
            }
            num ++;
        }
        var liStyle = {
            width: 100/param.selectorData.length + '%'
        }
        return param.selectorData.map(function(item){
            return (
                <li key={item.key} className="selectorItem" style={liStyle}>
                    <Selector
                        data={item.data}
                        value={item.value}
                        callback={this.selectorCallback.bind(this)}
                        level={item.key}
                        playLevel={this.playLevel}
                        format={param.format}
                        resultFormat={param.resultFormat}
                        tipText={item.tipText}
                    />
                </li>
            );
        }.bind(this));
    }

    finishAction () {
        var result = [];
        var param = this.param;
        for (var i in param.selectorData) {
            var data = param.selectorData[i].data[param.selectorData[i].value];
            result.push({
                option: data.option,
                value: data.value
            });
        }
        var optionResult = '';
        for (var i in result) {
            optionResult += result[i].option;
            if (param.format[i]) {
                optionResult += param.format[i];
            }
        }
        var valueResult = '';
        for (var i in result) {
            valueResult += result[i].value;
            if (param.resultFormat[i]) {
                valueResult += param.resultFormat[i];
            }
        }
        if (this.props.callback) {
            this.props.callback({
                optionResult: optionResult,
                valueResult: valueResult,
                result: result
            });
        }
    }

    render() {
        return (
            <div ref="MutipleSelector" className="MutipleSelector">
                <div className="titleArea">
                    <div className="rightBtn" onClick={this.finishAction.bind(this)}>完成</div>
                </div>
                <ul className="selectorArea">
                    {this.getSelector()}
                </ul>
            </div>
        );
    }

}

export default MutipleSelector;
