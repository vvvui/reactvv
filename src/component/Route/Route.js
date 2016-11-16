require("./Route.less");

import React, {Component} from 'react';

class Route extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
        this.getChildren();
    }

    componentDidMount () {
        this.loaded = true;
        this.parseRoute(com.locationSearch);
        window.addEventListener("orientationchange", function(e) {
            setTimeout(function(){
                this.pageInit();
            }.bind(this), 100);
        }.bind(this), false);
    }

    getChildren () {
        this.routeChildren = this.props.children;
    }

    parseRoute (urlSearch) {
        if (!this.loaded) {
            return;
        }
        var page = com.getQueryString('page', urlSearch) || (this.props.defaultPage || 1);
        page = parseInt(page) > this.routeChildren.length ? this.routeChildren.length : page;
        page = page > 0 ? page : 0;
        this.showPage = page;
        this.pageInit();
    }

    showAnimateRoute () {
        var animate = this.props.animate || false;
        if (!animate || !this.showPage) {
            return;
        }
        this.toPage = com.getQueryString('page', this.props.urlSearch) || 1;
        this.toPage = parseInt(this.toPage);
        this.toPage = this.toPage > 0 ? this.toPage : 0;
        this.toPage = this.toPage > this.routeChildren.length ? this.routeChildren.length : this.toPage;
        if (this.toPage == this.showPage) {
            return;
        }
        this.animateAction();
    }

    animateAction () {
        this.animating = true;
        var toLeftSize = parseInt(200/100 * com.screenWidth);
        this.derection = this.toPage > this.showPage ? 1 : -1;
        for (var i = 0; i < this.routeChildren.length; i++) {
            var id = i + 1;
            var ref = 'page' + id;
            this.refs[ref].style.zIndex = 0;
            if (id == this.showPage) {
                continue;
            }
            if (id == this.toPage) {
                this.refs[ref].style.zIndex = 1;
                this.refs[ref].style.left = this.derection > 0 ? toLeftSize + 'px' : 0;
                continue;
            }
            this.refs[ref].style.left = (com.screenWidth * 3) + 'px';
        }
        this.animateFrame = 20;
        var toPageStart = this.refs.wrapper.scrollLeft;
        var toPageEnd;
        if (this.derection > 0) {
            toPageEnd = toLeftSize;
        } else {
            toPageEnd = 0;
        }
        var toPageData = com.vvGetAnimateData(toPageStart, toPageEnd, this.animateFrame, com.vvTween.Circ.easeInOut);
        this.toPageData = toPageData;
        this.acNum = 0;
        //this.aStartTime = (new Date().getTime());
        requestAnimationFrame(this.doAnimate.bind(this));
    }

    doAnimate () {
        if (this.acNum >= this.toPageData.length) {
            this.animating = false;
            this.showPage = this.toPage;
            this.pageInit();
            return;
        }
        //var aEndTime = (new Date().getTime());
        //if (aEndTime - this.aStartTime > 0) {
            this.refs.wrapper.scrollLeft = this.toPageData[this.acNum];
            this.acNum ++;
            //this.aStartTime = aEndTime;
        //}
        requestAnimationFrame(this.doAnimate.bind(this));
    }

    pageInit () {
        if (!this.routeChildren.length) {
            return;
        }
        this.refs.wrapper.scrollLeft = com.screenWidth;
        var leftSize = com.screenWidth;
        for (var i = 0; i < this.routeChildren.length; i++) {
            var id = i + 1;
            var ref = 'page' + id;
            if (id == this.showPage) {
                this.refs[ref].style.left = leftSize + 'px';
                continue;
            }
            this.refs[ref].style.left = (com.screenWidth * 3) + 'px';
        }
    }

    showChildren () {
        if (!this.routeChildren) {
            return (
                <div className="wrapper">no page set</div>
            );
        }
        if (!this.routeChildren.length) {
            var childNum = 1;
            var ref = 'page' + childNum;
            return (
                <div ref={ref} key={childNum} className="wrapperPage">
                    {this.routeChildren}
                </div>
            );
        }
        var childNum = 0;
        return this.routeChildren.map(function(item) {
            childNum ++;
            var ref = 'page' + childNum;
            return (
                <div ref={ref} key={childNum} className="wrapperPage">
                    {item}
                </div>
            );

        }.bind(this));
    }

    render() {
        this.showAnimateRoute();
        return (
            <div ref="wrapper" className="wrapper">
                <div className="wrapperContent">
                    {this.showChildren()}
                </div>
            </div>
        );
    }

}

export default Route;
