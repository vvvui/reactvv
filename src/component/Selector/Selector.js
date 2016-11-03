require("./Selector.less");

import React, {Component} from 'react';

class Selector extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
        this.param = {
            addPos: com.screenWidth/20,
            itemHeight: parseInt(40 * com.screenWidth/375),
            scrollId: 0,
            data: this.props.data || []
        };
    }

    componentDidMount () {
        this.loaded = true;
        var param = this.param;
        this.scroll = this.refs.SelectorArea;
        this.scroll.addEventListener('touchstart', this.touchStart.bind(this));
        this.scroll.addEventListener('touchmove', this.touchMove.bind(this));
        this.scroll.addEventListener('touchend', this.touchEnd.bind(this));
        this.scroll.addEventListener('mousedown', this.touchStart.bind(this));
        this.scroll.addEventListener('mousemove', this.touchMove.bind(this));
        this.scroll.addEventListener('mouseup', this.touchEnd.bind(this));
        // set default value
        if (this.props.value != undefined) {
            var value = this.props.value;
            for (var i in param.data) {
                if (i == value) {
                    param.scrollId = i;
                    var moveY = param.scrollId * param.itemHeight;
                    this.moveToInit = true;
                    this.moveTo(moveY);
                }
            }
        }
    }

    touchStart (e) {
        this.animateLock = true;
        e.preventDefault();
        var event = (!e.pageX && !e.x) ? e.targetTouches[0] : e;
        var param = this.param;
        param.moveLock = true;
        param.isMove = 0;
        param.sY = event.pageY || event.y;
        param.sT = this.scroll.scrollTop || 0;
        param.lastPosY  = param.sY;
        param.sLastPosY = param.sY;
        this.startTime = (new Date()).getTime();
    }

    touchMove (e) {
        var event = (!e.pageX && !e.x) ? e.targetTouches[0] : e;
        var param = this.param;
        if (!param.moveLock) {
            return;
        }
        // vertical
        param.mY = event.pageY || event.y;
        if (Math.abs( param.mY - param.sY ) >= 0) {
            param.isMove = 1;
        }
        param.sLastPosY = param.lastPosY;
        param.lastPosY = param.mY;
        var changeY = param.sY - param.mY;
        this.scroll.scrollTop = param.sT + changeY;
    }

    touchEnd () {
        var param = this.param;
        if (!param.moveLock) {
            return;
        }
        param.moveLock = false;
        if (!param.isMove) {
            this.actionFinish();
            return;
        }
        this.endTime = (new Date()).getTime();
        var TS = 120;
        var AS = 0;
        if (/iPhone|iPad/i.test(navigator.userAgent)) {
            TS = 60;
            AS = 3;
        }
        var touchTime = TS - (this.endTime - this.startTime);
        // vertical
        var addRate = Math.abs( param.lastPosY - param.sLastPosY ) > AS ? param.lastPosY - param.sLastPosY : 0;
        if (touchTime > 0 && addRate) {
            addRate = addRate > 0 ? addRate + touchTime : addRate - touchTime;
        }
        var oY = this.scroll.scrollTop;
        oY -= parseInt(param.addPos * addRate, 10);
        // limit
        var moveY;
        var maxTopPos = (this.scroll.scrollHeight - (param.itemHeight * 3));
        moveY = oY > maxTopPos ? maxTopPos : oY;
        moveY = moveY < 0 ? 0 : moveY;
        // get select id
        var scrollId = parseInt(moveY/param.itemHeight);
        var scrollAdded = moveY % param.itemHeight;
        if (scrollAdded >= (param.itemHeight/2)) {
            scrollId += 1;
        }
        scrollId = scrollId > 0 ? scrollId : 0;
        var dataLen = param.data.length - 1;
        scrollId = scrollId < dataLen ? scrollId : dataLen;
        param.scrollId = scrollId;
        moveY = param.scrollId * param.itemHeight;
        this.moveTo(moveY);
    }

    moveTo (moveY) {
        var sTop = this.scroll.scrollTop;
        var eTop = moveY;
        var frame = 35;
        if (sTop == eTop) {
            frame = 1;
        }
        var aData = com.vvGetAnimateData(sTop, eTop, frame);
        this.aData = aData;
        this.acNum = 0;
        this.animateLock = false;
        requestAnimationFrame(this.doAnimate.bind(this));
    }

    doAnimate () {
        if (this.animateLock) {
            this.moveToInit = false;
            return;
        }
        var aData = this.aData;
        if (this.acNum >= aData.length) {
            this.actionFinish();
            return;
        }
        this.scroll.scrollTop = aData[this.acNum];
        this.acNum ++;
        requestAnimationFrame(this.doAnimate.bind(this));
    }

    actionFinish () {
        var param = this.param;
        this.setFinishStyle();
        param.data[param.scrollId].level = this.props.level || 0;
        if (this.props.callback) {
            if (this.moveToInit) {
                this.moveToInit = false;
                return;
            }
            this.props.callback(param.scrollId, param.data[param.scrollId]);
        }
    }

    setFinishStyle () {
        var param = this.param;
        param.items = this.refs.SelectorArea.childNodes[0].childNodes;
        var items = param.items;
        for (var i in param.data) {
            if (i == param.scrollId) {
                items[i].style.color = '#000000';
                items[i].style.fontSize = 16/375 + 'rem';
            } else {
                items[i].style.color = '#666666';
                items[i].style.fontSize = 14/375 + 'rem';
            }
        }
    }

    getItemDom () {
        var param = this.param;
        var itmeNum = 0;
        for (var i in param.data) {
            param.data[i].key = itmeNum;
            itmeNum ++;
        }
        return param.data.map(function(item){
            return (
                <li name="selectItem" id={item.key} key={item.key}>{item.option}</li>
            );
        }.bind(this));
    }

    renderInit () {
        if (!this.loaded || this.props.level <= this.props.playLevel) {
            return;
        }
        this.containerKey = Math.random();
        var param = this.param;
        this.refs.SelectorContent.innerHTML = '';
        param.data = this.props.data;
        var itmeNum = 0;
        for (var i in param.data) {
            param.data[i].key = itmeNum;
            itmeNum ++;
        }
        param.data.map(function(item){
            var li = document.createElement('li');
            li.innerHTML = item.option;
            li.setAttribute('id', item.key);
            this.refs.SelectorContent.appendChild(li);
        }.bind(this));
        param.scrollId = this.props.value;
        var moveY = param.scrollId * param.itemHeight;
        this.moveToInit = true;
        this.moveTo(moveY);
    }

    render() {
        this.renderInit();
        return (
            <div ref="Selector" className="Selector">
                <div ref="SelectorMask" className="SelectorMask">
                    <div className="tipText">{this.props.tipText}</div>
                </div>
                <div ref="SelectorArea" className="SelectorArea">
                    <ul key={this.containerKey} ref="SelectorContent" className="SelectorContent">
                        {this.getItemDom()}
                    </ul>
                </div>
            </div>
        );
    }

}

export default Selector;
