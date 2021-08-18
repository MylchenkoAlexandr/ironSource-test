import React, {Component} from "react";
import {Select} from 'antd';
import {map} from 'lodash';
import PropTypes from "prop-types";

export default class CustomerTypes extends Component {
    static propTypes = {
        selected: PropTypes.string,
        customerTypes: PropTypes.array,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
    }
    render() {
        const {customerTypes, selected} = this.props;
        return (
            <div className={CustomerTypes.name}>
                {this.drawCustomerTypes(selected, customerTypes)}
            </div>
        )
    }
    drawCustomerTypes = (selected, data) => {
        const items = map(data, (name, key) => (
            <Select.Option key={key} value={name}>
                {name}
            </Select.Option>
        ));
        return (
            <Select placeholder={"customer type"} defaultValue={selected} className="customer-types" onChange={this.onChange}>
                {items}
            </Select>
        )
    }
    onChange = (customerType) => {
        const {onChange} = this.props;
        onChange && onChange(customerType);
    }
}