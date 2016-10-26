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
        var param = this.param;
        this.param.items = document.getElementsByName('selectItem');
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
                if (param.data[i].value == value) {
                    param.scrollId = i;
                    var moveY = param.scrollId * param.itemHeight;
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
        if (Math.abs( param.mY - param.sY ) >= 1) {
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
        var aData = com.vvGetAnimateData(sTop, eTop, 35);
        this.aData = aData;
        this.acNum = 0;
        this.animateLock = false;
        requestAnimationFrame(this.doAnimate.bind(this));
    }

    doAnimate () {
        if (this.animateLock) {
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
        if (this.props.callback) {
            this.props.callback(param.scrollId, param.data[param.scrollId]);
        }
    }

    setFinishStyle () {
        var param = this.param;
        var items = param.items;
        for (var i in param.data) {
            if (i == param.scrollId) {
                items[i].style.color = '#000000';
                items[i].style.fontSize = '16px';
            } else {
                items[i].style.color = '#666666';
                items[i].style.fontSize = '14px';
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

    render() {
        return (
            <div ref="Selector" className="Selector">
                <div ref="SelectorMask" className="SelectorMask"></div>
                <div ref="SelectorArea" className="SelectorArea">
                    <ul ref="SelectorContent" className="SelectorContent">
                        {this.getItemDom()}
                    </ul>
                </div>
            </div>
        );
    }

}

export default Selector;
