import React, {Component} from "react";
import {Menu} from 'antd';
import {map} from 'lodash';
import PropTypes from "prop-types";

export default class Categories extends Component {
    static propTypes = {
        selected: PropTypes.number,
        categories: PropTypes.array,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
    }
    render() {
        const {categories, selected} = this.props;

        return (
            <div className={Categories.name}>
                {this.drawCategories(selected, categories)}
            </div>
        )
    }
    drawCategories = (selected, data) => {
        const menuItems = map(data, ({_id, name}) => (
            <Menu.Item key={_id}>
                <div className="menu-item-caption">
                    {name}
                </div>
            </Menu.Item>
        ));
        return (
            <div className="categories">
                <Menu onClick={this.onChange} selectedKeys={[selected.toString()]} mode="horizontal">
                    {menuItems}
                </Menu>
            </div>
        )
    }
    onChange = ({key: category_id}) => {
        const {onChange} = this.props;
        onChange && onChange(category_id);
    }
}