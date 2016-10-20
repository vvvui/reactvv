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
        var showPage = this.showPage - 1;
        var toPage = this.toPage - 1;
        this.animateFrame = 15;
        this.derection = this.toPage > this.showPage ? 1 : -1;
        var showPageStart = 0;
        var showPageEnd = this.derection > 0 ? -this.derection * 100 : -this.derection * com.screenWidth;
        var showPageData = com.vvGetAnimateData(showPageStart, showPageEnd, this.animateFrame);
        var toPageStart = this.derection * com.screenWidth;
        var toPageEnd = 0;
        var toPageData = com.vvGetAnimateData(toPageStart, toPageEnd, this.animateFrame);
        this.showPageData = showPageData;
        this.toPageData = toPageData;
        this.acNum = 0;
        this.pageInit();
        requestAnimationFrame(this.doAnimate.bind(this));
    }

    doAnimate () {
        if (this.acNum >= this.showPageData.length) {
            this.animating = false;
            this.showPage = this.toPage;
            return;
        }
        this.refs['page' + this.showPage].style.left = this.showPageData[this.acNum] + 'px';
        this.refs['page' + this.toPage].style.left = this.toPageData[this.acNum] + 'px';;
        this.acNum ++;
        requestAnimationFrame(this.doAnimate.bind(this));
    }

    pageInit () {
        for (var i = 0; i < this.routeChildren.length; i++) {
            var id = i + 1;
            var ref = 'page' + id;
            this.refs[ref].style.zIndex = 0;
            if (id == this.showPage) {
                continue;
            }
            if (id == this.toPage) {
                this.refs[ref].style.zIndex = 1;
                this.refs[ref].style.left = this.derection ? '100%' : '-100%';
                continue;
            }
            this.refs[ref].style.left = '200%';
        }
    }

    showChildren () {
        if (!this.routeChildren) {
            return (
                <div className="wrapper">no page set</div>
            );
        }
        if (!this.routeChildren.length) {
            return this.routeChildren;
        }
        var childNum = 0;
        return this.routeChildren.map(function(item) {
            childNum ++;
            var ref = 'page' + childNum;
            return (
                <div ref={ref} key={childNum} className="page">
                    {item}
                </div>
            );

        }.bind(this));
    }

    render() {
        this.showAnimateRoute();
        return (
            <div ref="wrapper" className="wrapper">
                {this.showChildren()}
            </div>
        );
    }

}

export default Route;
