require("./ScrollPage.less");

import React, {Component} from 'react';

class VerticalScrollPage extends Component {

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
        this.contentInit();
        this.scroll = this.refs.VerticalScrollPage;
        this.scroll.addEventListener('touchstart', this.touchStart.bind(this));
        this.scroll.addEventListener('touchmove', this.touchMove.bind(this));
        this.scroll.addEventListener('touchend', this.touchEnd.bind(this));
        this.scroll.addEventListener('mousedown', this.touchStart.bind(this));
        this.scroll.addEventListener('mousemove', this.touchMove.bind(this));
        this.scroll.addEventListener('mouseup', this.touchEnd.bind(this));
    }

    contentInit () {
        var param = this.param;
        param.showPage = param.showPage || (this.props.showPage || 0);
        this.scrollLi = this.refs['li' + param.showPage];
        this.scrollLiContent = this.refs['content' + param.showPage];
        var scrollClientHeight = this.scrollLiContent.clientHeight > this.scrollLi.clientHeight ? this.scrollLiContent.clientHeight : this.scrollLi.clientHeight;
        param.liMaxScrollTop = scrollClientHeight - this.scrollLi.clientHeight;
        param.liMinScrollTop = 0;
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
        param.sLT = this.scrollLi.scrollTop || 0;
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

        var liScrolltop = param.sLT + changeY;
        var contentScrollTop = 0;
        if (liScrolltop > param.liMaxScrollTop) {
            contentScrollTop = liScrolltop - param.liMaxScrollTop;
            this.scroll.scrollTop = param.sT + contentScrollTop;
        } else if (liScrolltop < param.liMinScrollTop) {
            contentScrollTop = liScrolltop - param.liMinScrollTop;
            this.scroll.scrollTop = param.sT + contentScrollTop;

        } else {
            this.scrollLi.scrollTop = liScrolltop;
        }

    }

    touchEnd () {
        var param = this.param;
        if (!param.moveLock) {
            return;
        }
        param.moveLock = false;
        var contentScrollTop = this.scroll.scrollTop;
        var showPageTop = param.showPage * this.scroll.clientHeight;
        if (Math.abs(contentScrollTop - showPageTop) > 30) {
            this.showPageChange();
        } else {
            this.scroll.scrollTop = showPageTop;
            this.liScrollTo ();
        }
        param.moveLock = false;
    }

    showPageChange () {
        var param = this.param;
        var contentScrollTop = this.scroll.scrollTop;
        var showPageTop = param.showPage * this.scroll.clientHeight;
        param.showPage = contentScrollTop > showPageTop ? param.showPage + 1 : param.showPage - 1;
        this.SmoveTo(param.showPage * this.scroll.clientHeight);
    }

    liScrollTo () {
        var param = this.param;
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
        var oY = this.scrollLi.scrollTop;
        oY -= parseInt(param.addPos * addRate, 10);
        // limit
        var moveY;
        var scrollPadding = this.props.scrollPadding || 0;
        var maxTopPos = (this.scrollLi.scrollHeight - scrollPadding - (this.props.height || 0));
        moveY = oY > maxTopPos ? maxTopPos : oY;
        moveY = moveY < 0 ? 0 : moveY;
        this.moveTo(moveY);
    }

    moveTo (moveY) {
        var sTop = this.scrollLi.scrollTop;
        var eTop = moveY;
        var aData = com.vvGetAnimateData(sTop, eTop, 20);
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
        this.scrollLi.scrollTop = aData[this.acNum];
        this.acNum ++;
        requestAnimationFrame(this.doAnimate.bind(this));
    }

    SmoveTo (moveY) {
        this.SmoveY = moveY;
        var sTop = this.scroll.scrollTop;
        var eTop = moveY;
        var aData = com.vvGetAnimateData(sTop, eTop, 50);
        this.aData = aData;
        this.acNum = 0;
        this.animateLock = false;
        requestAnimationFrame(this.SdoAnimate.bind(this));
    }

    SdoAnimate () {
        if (this.animateLock) {
            this.scroll.scrollTop = this.SmoveY;
            this.contentInit();
            return;
        }
        var aData = this.aData;
        if (this.acNum >= aData.length) {
            this.contentInit();
            return;
        }
        this.scroll.scrollTop = aData[this.acNum];
        this.acNum ++;
        requestAnimationFrame(this.SdoAnimate.bind(this));
    }

    styleInit () {
        var VerticalScrollPageStyle = {};
        if (this.props.width) {
            VerticalScrollPageStyle.width = this.props.width;
        }
        if (this.props.height) {
            VerticalScrollPageStyle.height = this.props.height;
        }
        this.VerticalScrollPageStyle = VerticalScrollPageStyle;
    }

    getLiDom () {
        if (!this.routeChildren.length) {
            return (
                <li ref="content0" className="VerticalScrollPageLi">
                    <div className="VerticalScrollPageLiContent">
                        {this.routeChildren}
                    </div>
                </li>
            );
        }
        var items = [];
        for (var i = 0; i < this.routeChildren.length; i++) {
            items.push({
                key: i,
                liFef: 'li' + i,
                ref: 'content' + i,
                item: this.routeChildren[i]
            });
        }
        return items.map (function(item) {
            return (
                <li key={item.key} ref={item.liFef} className="VerticalScrollPageLi">
                    <div ref={item.ref} className="VerticalScrollPageLiContent">
                        {item.item}
                    </div>
                </li>
            );
        }.bind(this));
    }

    render() {
        this.styleInit();
        return (
            <div ref="VerticalScrollPage" className="VerticalScrollPage" style={this.VerticalScrollPageStyle}>
                <div ref="VerticalScrollPageContent" className="VerticalScrollPageContent">
                    <ul ref="VerticalScrollPageUl" className="VerticalScrollPageUl">
                        {this.getLiDom()}
                    </ul>
                </div>
            </div>
        );
    }

}

export {
    VerticalScrollPage
};
