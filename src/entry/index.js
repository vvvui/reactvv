require('../common.less');
require('../page/index/index.less');

import Common from '../common';
window.com = new Common();

import React from 'react';
import {render} from 'react-dom';
import Index from '../page/index/Index';

render(<Index/>, document.getElementById('app'));
