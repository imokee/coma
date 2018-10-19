
import React from 'react';
import { render } from 'react-dom';
import App from './App'

import 'antd-mobile/dist/antd-mobile.css'; 

const renderDom = Component => {
    render(
        <Component />,
        document.getElementById('app-container')
    );
}
renderDom(App);