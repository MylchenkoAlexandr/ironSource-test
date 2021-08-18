import React, {PureComponent} from "react";
import {Button} from 'antd';
import PropTypes from "prop-types";

export default class AppsItem extends PureComponent {
    static defaultProps = {
        enabledInstallation: true
    }
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        rank: PropTypes.number,
        enabledInstallation: PropTypes.bool,
        onInstall: PropTypes.func
    }

    constructor(props) {
        super(props);
    }
    render() {
        const {name, rank, enabledInstallation} = this.props;
        return (
            <div className={AppsItem.name}>
                <div className="app-info">
                    <div key="name">
                        <span>name:</span>
                        {name}
                    </div>
                    <div key="rank">
                        <span>rank:</span>
                        {rank}
                    </div>
                </div>
                { enabledInstallation && <Button type="primary" onClick={this.onChange}>
                    install
                </Button> }
            </div>
        )
    }
    onChange = () => {
        const {id, onInstall} = this.props;
        onInstall && onInstall(id);
    }
}