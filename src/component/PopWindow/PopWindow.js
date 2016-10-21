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

    setTheme () {
        this.theme = {};
        var theme = this.theme;
        switch (this.props.theme) {
            case 'full':
                theme.showBackBar = true;
                theme.width = "100%";
                theme.height = "100%";
                theme.contentStyle = {
                    borderRadius: '0'
                };
                theme.textAreaStyle = {
                    textAlign: 'left',
                    paddingLeft: 0,
                    paddingRight: 0
                };
                break;
            case 'toast':
                theme.autoClose = 3000;
                break;
            case 'alert':
                theme.title = '提示';
                theme.showClose = true;
                theme.confirmText = '确定';
                break;
            case 'confirm':
                theme.title = '确认信息';
                theme.clearText = '取消';
                theme.confirmText = '确定';
                theme.confirmStyle = {
                    color: '#ff6600'
                };
                break;
            default:
                break;
        }
    }

    setParam () {
        this.setTheme();
        this.param = {};
        var param = this.param;
        var props = this.props;
        var theme = this.theme;
        param.maskStyle = props.maskStyle || theme.maskStyle;
        param.autoClose = props.autoClose || theme.autoClose;
        param.width = props.width || theme.width;
        param.height = props.height || theme.height;
        param.contentStyle = props.contentStyle || theme.contentStyle;
        param.showClose = props.showClose || theme.showClose;
        param.closeStyle = props.closeStyle || theme.closeStyle;
        param.title = props.title || theme.title;
        param.titleStyle = props.titleStyle || theme.titleStyle;
        param.textAreaStyle = props.textAreaStyle || theme.textAreaStyle;
        param.confirmText = props.confirmText || theme.confirmText;
        param.clearText = props.clearText || theme.clearText;
        param.btnSwap = props.btnSwap || theme.btnSwap;
        param.btnAreaStyle = props.btnAreaStyle || theme.btnAreaStyle;
        param.clearStyle = props.clearStyle || theme.clearStyle;
        param.confirmStyle = props.confirmStyle || theme.confirmStyle;
        param.backBarStyle = props.backBarStyle || theme.backBarStyle;
        param.showBackBar = props.showBackBar || theme.showBackBar;
        param.backTitle = props.backTitle || theme.backTitle;
    }

    styleInit () {
        if (!this.loaded) {
            return;
        }
        if (!this.props.show) {
            this.hide();
            return;
        }
        this.setParam();
        var param = this.param || {};
        // popWindow
        this.PopWindow.style.display = 'block';
        var scrollTop = this.PopWindow.parentNode.scrollTop;
        this.PopWindow.parentNode.style.overflowY = 'hidden';
        this.PopWindow.style.top = scrollTop + 'px';
        // mask
        var maskStyle = param.maskStyle;
        if (maskStyle && typeof maskStyle == 'object') {
            for (var i in maskStyle) {
                this.popMask.style[i] = maskStyle[i];
            }
        }
        // autoClose
        if (param.autoClose) {
            setTimeout(function(){
                this.close();
            }.bind(this), param.autoClose);
        }
        // content
        this.popContent.style.width = this.textArea.clientWidth + 'px';
        if (param.width) {
            this.popContent.style.width = param.width;
        }
        if (param.height) {
            this.popContent.style.height = param.height;
        }
        var contentStyle = param.contentStyle;
        if (contentStyle && typeof contentStyle == 'object') {
            for (var i in contentStyle) {
                this.popContent.style[i] = contentStyle[i];
            }
        }
        // closeArea
        this.closeArea.style.display = 'none';
        if (param.showClose) {
            this.closeArea.style.display = 'block';
        }
        var closeStyle = param.closeStyle;
        if (closeStyle && typeof closeStyle == 'object') {
            for (var i in closeStyle) {
                this.closeArea.style[i] = closeStyle[i];
            }
        }
        // titleArea
        this.titleArea.style.display = 'none';
        if (param.title) {
            this.titleArea.style.display = 'block';
            this.textArea.style.paddingTop = '0';
        }
        var titleStyle = param.titleStyle;
        if (titleStyle && typeof titleStyle == 'object') {
            for (var i in titleStyle) {
                this.titleArea.style[i] = titleStyle[i];
            }
        }
        var textAreaStyle = param.textAreaStyle;
        if (textAreaStyle && typeof textAreaStyle == 'object') {
            for (var i in textAreaStyle) {
                this.textArea.style[i] = textAreaStyle[i];
            }
        }
        // btnArea
        this.btnArea.style.display = 'none';
        if (param.clearText || param.confirmText) {
            this.btnArea.style.display = 'block';
        }
        if (param.clearText && param.confirmText) {
            this.confirmBtn.style.width = '50%';
            this.clearBtn.style.width = '50%';
            if (param.btnSwap) {
                this.clearBtn.style.borderLeft = '1px solid #eeeeee';
            } else {
                this.clearBtn.style.borderRight = '1px solid #eeeeee';
            }
        }
        if (!param.clearText) {
            this.clearBtn.style.display = 'none';
        }
        if (!param.confirmText) {
            this.confirmBtn.style.display = 'none';
        }
        var btnAreaStyle = param.btnAreaStyle;
        if (btnAreaStyle && typeof btnAreaStyle == 'object') {
            for (var i in btnAreaStyle) {
                this.btnArea.style[i] = btnAreaStyle[i];
            }
        }
        var clearStyle = param.clearStyle;
        if (clearStyle && typeof clearStyle == 'object') {
            for (var i in clearStyle) {
                this.clearBtn.style[i] = clearStyle[i];
            }
        }
        var confirmStyle = param.confirmStyle;
        if (confirmStyle && typeof confirmStyle == 'object') {
            for (var i in confirmStyle) {
                this.confirmBtn.style[i] = confirmStyle[i];
            }
        }
        // backBar
        this.backBarArea.style.display = 'none';
        if (param.showBackBar) {
            this.backBarArea.style.display = 'block';
        }
        var backBarStyle = param.backBarStyle;
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
        var param = this.param || {};
        if (param.btnSwap) {
            return (
                <div ref="btnArea" className="btnArea">
                    <div
                        ref="confirmBtn"
                        className="btn"
                        onClick={this.confirm.bind(this)}
                    >
                        {param.confirmText}
                    </div>
                    <div
                        ref="clearBtn"
                        className="btn"
                        onClick={this.clear.bind(this)}
                    >
                        {param.clearText}
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
                    {param.clearText}
                </div>
                <div
                    ref="confirmBtn"
                    className="btn"
                    onClick={this.confirm.bind(this)}
                >
                    {param.confirmText}
                </div>
            </div>
        );
    }

    goBack () {
        this.hide();
    }

    render() {
        this.styleInit();
        var param = this.param || {};
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
                        {param.backTitle}
                    </div>
                    <div ref="closeArea" className="closeArea">
                        <div
                            className="closeIcon hairline closeResize"
                            onClick={this.close.bind(this)}
                        ></div>
                    </div>
                    <div ref="titleArea" className="titleArea">
                        {param.title}
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
