import React from "react";
import en_US from 'antd/lib/locale/en_US';
import moment from 'moment';
import {Provider} from "react-redux";
import {factory} from "../../M/redux";
import {ConfigProvider} from "antd"
import 'moment/locale/ru';

const Main = ({children}) => {
    moment.locale('en');
    return (
        <Provider store={factory()}>
            <ConfigProvider locale={en_US}>
                {children}
            </ConfigProvider>
        </Provider>
    )
}

export default Main;