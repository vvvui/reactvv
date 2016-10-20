require("./ScrollArea.less");

import React, {Component} from 'react';

class VerticalScroll extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
        this.routeChildren = this.props.children;
    }

    componentDidMount () {
        this.param = {
            addPos: com.screenWidth/10
        };
        if (this.props.lockDefault) {
            return;
        }
        this.scroll = this.refs.VerticalScrollContent;
        this.scroll.addEventListener('touchstart', this.touchStart.bind(this));
        this.scroll.addEventListener('touchmove', this.touchMove.bind(this));
        this.scroll.addEventListener('touchend', this.touchEnd.bind(this));
        this.scroll.addEventListener('mousedown', this.touchStart.bind(this));
        this.scroll.addEventListener('mousemove', this.touchMove.bind(this));
        this.scroll.addEventListener('mouseup', this.touchEnd.bind(this));
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
        if (Math.abs( param.mY - param.sY ) >= 10) {
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
        var scrollPadding = this.props.scrollPadding || 0;
        var maxTopPos = (this.scroll.scrollHeight - scrollPadding - (this.props.height || 0));
        moveY = oY > maxTopPos ? maxTopPos : oY;
        moveY = moveY < 0 ? 0 : moveY;
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
            return;
        }
        this.scroll.scrollTop = aData[this.acNum];
        this.acNum ++;
        requestAnimationFrame(this.doAnimate.bind(this));
    }

    styleInit () {
        var VerticalScrollStyle = {};
        if (this.props.width) {
            VerticalScrollStyle.width = this.props.width;
        }
        if (this.props.height) {
            VerticalScrollStyle.height = this.props.height;
        }
        this.VerticalScrollStyle = VerticalScrollStyle;
    }

    render() {
        this.styleInit();
        return (
            <div className="VerticalScroll" style={this.VerticalScrollStyle}>
                <div ref="VerticalScrollContent" className="VerticalScrollContent">
                    {this.routeChildren}
                </div>
            </div>
        );
    }

}

class HorizentalScroll extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
        this.routeChildren = this.props.children;
    }

    componentDidMount () {
        this.param = {
            addPos: com.screenWidth/10
        };
        if (this.props.lockDefault) {
            return;
        }
        this.scroll = this.refs.HorizentalScrollContent;
        this.scroll.addEventListener('touchstart', this.touchStart.bind(this));
        this.scroll.addEventListener('touchmove', this.touchMove.bind(this));
        this.scroll.addEventListener('touchend', this.touchEnd.bind(this));
        this.scroll.addEventListener('mousedown', this.touchStart.bind(this));
        this.scroll.addEventListener('mousemove', this.touchMove.bind(this));
        this.scroll.addEventListener('mouseup', this.touchEnd.bind(this));
    }

    touchStart (e) {
        this.animateLock = true;
        e.preventDefault();
        var event = (!e.pageX && !e.x) ? e.targetTouches[0] : e;
        var param = this.param;
        param.moveLock = true;
        param.isMove = 0;
        param.sX = event.pageX || event.x;
        param.sL = this.scroll.scrollLeft || 0;
        param.lastPosX  = param.sX;
        param.sLastPosX = param.sX;
        this.startTime = (new Date()).getTime();
    }

    touchMove (e) {
        var event = (!e.pageX && !e.x) ? e.targetTouches[0] : e;
        var param = this.param;
        if (!param.moveLock) {
            return;
        }
        // vertical
        param.mX = event.pageX || event.x;
        if (Math.abs( param.mX - param.sX ) >= 10) {
            param.isMove = 1;
        }
        param.sLastPosX = param.lastPosX;
        param.lastPosX = param.mX;
        var changeX = param.sX - param.mX;
        this.scroll.scrollLeft = param.sL + changeX;
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
        var addRate = Math.abs( param.lastPosX - param.sLastPosX ) > AS ? param.lastPosX - param.sLastPosX : 0;
        if (touchTime > 0 && addRate) {
            addRate = addRate > 0 ? addRate + touchTime : addRate - touchTime;
        }
        var oX = this.scroll.scrollLeft;
        oX -= parseInt(param.addPos * addRate, 10);
        // limit
        var moveX;
        var scrollPadding = this.props.scrollPadding || 0;
        var maxLeftPos = (this.scroll.scrollWidth - scrollPadding - (this.props.width || 0));
        moveX = oX > maxLeftPos ? maxLeftPos : oX;
        moveX = moveX < 0 ? 0 : moveX;
        this.moveTo(moveX);
    }

    moveTo (moveX) {
        var sLeft = this.scroll.scrollLeft;
        var eLeft = moveX;
        var aData = com.vvGetAnimateData(sLeft, eLeft, 35);
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
            return;
        }
        this.scroll.scrollLeft = aData[this.acNum];
        this.acNum ++;
        requestAnimationFrame(this.doAnimate.bind(this));
    }

    styleInit () {
        var HorizentalScrollStyle = {};
        if (this.props.width) {
            HorizentalScrollStyle.width = this.props.width;
        }
        if (this.props.height) {
            HorizentalScrollStyle.height = this.props.height;
        }
        this.HorizentalScrollStyle = HorizentalScrollStyle;
    }

    render() {
        this.styleInit();
        return (
            <div className="HorizentalScroll" style={this.HorizentalScrollStyle}>
                <div ref="HorizentalScrollContent" className="HorizentalScrollContent">
                    {this.routeChildren}
                </div>
            </div>
        );
    }

}

export {
    VerticalScroll,
    HorizentalScroll
};
