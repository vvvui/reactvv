require("./PopWindow.less");

import React, {Component} from 'react';

class PopWindow extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
        this.routeChildren = this.props.children;
    }

    componentDidMount () {
        this.loaded = true;
        this.PopWindow = this.refs.PopWindow;
        this.popMask = this.refs.popMask;
        this.popContent = this.refs.popContent;
        this.closeArea = this.refs.closeArea;
        this.titleArea = this.refs.titleArea;
        this.textArea = this.refs.textArea;
        this.btnArea = this.refs.btnArea;
        this.confirmBtn = this.refs.confirmBtn;
        this.clearBtn = this.refs.clearBtn;
        this.backBarArea = this.refs.backBarArea;
        this.styleInit ();
    }

    close () {
        this.hide();
        if (this.props.closeCallback) {
            this.props.closeCallback();
        }
    }

    clear () {
        this.hide();
        if (this.props.clearCallback) {
            this.props.clearCallback();
        }
    }

    confirm () {
        this.hide();
        if (this.props.confirmCallback) {
            this.props.confirmCallback();
        }
    }

    hide () {
        this.PopWindow.style.display = 'none';
        this.PopWindow.parentNode.style.overflowY = 'auto';
    }

    styleInit () {
        if (!this.loaded) {
            return;
        }
        if (!this.props.show) {
            this.hide();
            return;
        }
        // popWindow
        this.PopWindow.style.display = 'block';
        var scrollTop = this.PopWindow.parentNode.scrollTop;
        this.PopWindow.parentNode.style.overflowY = 'hidden';
        this.PopWindow.style.top = scrollTop + 'px';
        // mask
        var maskStyle = this.props.maskStyle;
        if (maskStyle && typeof maskStyle == 'object') {
            for (var i in maskStyle) {
                this.popMask.style[i] = maskStyle[i];
            }
        }
        // autoClose
        if (this.props.autoClose) {
            setTimeout(function(){
                this.close();
            }.bind(this), this.props.autoClose);
        }
        // content
        this.popContent.style.width = this.textArea.clientWidth + 'px';
        if (this.props.width) {
            this.popContent.style.width = this.props.width;
        }
        if (this.props.height) {
            this.popContent.style.height = this.props.height;
        }
        var contentStyle = this.props.contentStyle;
        if (contentStyle && typeof contentStyle == 'object') {
            for (var i in contentStyle) {
                this.popContent.style[i] = contentStyle[i];
            }
        }
        // closeArea
        this.closeArea.style.display = 'none';
        if (this.props.showClose) {
            this.closeArea.style.display = 'block';
        }
        var closeStyle = this.props.closeStyle;
        if (closeStyle && typeof closeStyle == 'object') {
            for (var i in closeStyle) {
                this.closeArea.style[i] = closeStyle[i];
            }
        }
        // titleArea
        this.titleArea.style.display = 'none';
        if (this.props.title) {
            this.titleArea.style.display = 'block';
            this.textArea.style.paddingTop = '0';
        }
        var titleStyle = this.props.titleStyle;
        if (titleStyle && typeof titleStyle == 'object') {
            for (var i in titleStyle) {
                this.titleArea.style[i] = titleStyle[i];
            }
        }
        var textAreaStyle = this.props.textAreaStyle;
        if (textAreaStyle && typeof textAreaStyle == 'object') {
            for (var i in textAreaStyle) {
                this.textArea.style[i] = textAreaStyle[i];
            }
        }
        // btnArea
        this.btnArea.style.display = 'none';
        if (this.props.clearText || this.props.confirmText) {
            this.btnArea.style.display = 'block';
        }
        if (this.props.clearText && this.props.confirmText) {
            this.confirmBtn.style.width = '50%';
            this.clearBtn.style.width = '50%';
            if (this.props.btnSwap) {
                this.clearBtn.style.borderLeft = '1px solid #eeeeee';
            } else {
                this.clearBtn.style.borderRight = '1px solid #eeeeee';
            }
        }
        if (!this.props.clearText) {
            this.clearBtn.style.display = 'none';
        }
        if (!this.props.confirmText) {
            this.confirmBtn.style.display = 'none';
        }
        var btnAreaStyle = this.props.btnAreaStyle;
        if (btnAreaStyle && typeof btnAreaStyle == 'object') {
            for (var i in btnAreaStyle) {
                this.btnArea.style[i] = btnAreaStyle[i];
            }
        }
        var clearStyle = this.props.clearStyle;
        if (clearStyle && typeof clearStyle == 'object') {
            for (var i in clearStyle) {
                this.clearBtn.style[i] = clearStyle[i];
            }
        }
        var confirmStyle = this.props.confirmStyle;
        if (confirmStyle && typeof confirmStyle == 'object') {
            for (var i in confirmStyle) {
                this.confirmBtn.style[i] = confirmStyle[i];
            }
        }
        // backBar
        this.backBarArea.style.display = 'none';
        if (this.props.showBackBar) {
            this.backBarArea.style.display = 'block';
        }
        var backBarStyle = this.props.backBarStyle;
        if (backBarStyle && typeof backBarStyle == 'object') {
            for (var i in backBarStyle) {
                this.backBarArea.style[i] = backBarStyle[i];
            }
        }
        // position set
        var contentWidth = this.popContent.clientWidth;
        var contentHeight = this.popContent.clientHeight;
        this.popContent.style.marginLeft = -(contentWidth/2) + 'px';
        this.popContent.style.marginTop = -(contentHeight/2) + 'px';
    }

    getBtnArea () {
        if (this.props.btnSwap) {
            return (
                <div ref="btnArea" className="btnArea">
                    <div
                        ref="confirmBtn"
                        className="btn"
                        onClick={this.confirm.bind(this)}
                    >
                        {this.props.confirmText}
                    </div>
                    <div
                        ref="clearBtn"
                        className="btn"
                        onClick={this.clear.bind(this)}
                    >
                        {this.props.clearText}
                    </div>
                </div>
            );
        }
        return (
            <div ref="btnArea" className="btnArea">
                <div
                    ref="clearBtn"
                    className="btn"
                    onClick={this.clear.bind(this)}
                >
                    {this.props.clearText}
                </div>
                <div
                    ref="confirmBtn"
                    className="btn"
                    onClick={this.confirm.bind(this)}
                >
                    {this.props.confirmText}
                </div>
            </div>
        );
    }

    goBack () {
        this.hide();
    }

    render() {
        this.styleInit();
        return (
            <div ref="PopWindow" className="PopWindow">
                <div ref="popMask" className="popMask"></div>
                <div ref="popContent" className="popContent">
                    <div ref="backBarArea" className="backBarArea">
                        <div className="backIcon" onClick={this.goBack.bind(this)}>
                            <b className="backArrow rt180">
                                <i className="backEm3"></i>
                                <i className="backEm2"></i>
                            </b>
                        </div>
                        {this.props.backTitle}
                    </div>
                    <div ref="closeArea" className="closeArea">
                        <div
                            className="closeIcon hairline closeResize"
                            onClick={this.close.bind(this)}
                        ></div>
                    </div>
                    <div ref="titleArea" className="titleArea">
                        {this.props.title}
                    </div>
                    <div ref="textArea" className="textArea">
                        {this.routeChildren}
                    </div>
                    {this.getBtnArea()}
                </div>
            </div>
        );
    }

}

export default PopWindow;
