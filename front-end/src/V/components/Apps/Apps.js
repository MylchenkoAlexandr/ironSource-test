import React, {Component} from "react";
import {map} from 'lodash';
import AppsItem from './AppsItem';
import PropTypes from "prop-types";

export default class Apps extends Component {
    static propTypes = {
        apps: PropTypes.array,
        onInstall: PropTypes.func
    }

    constructor(props) {
        super(props);
    }
    render() {
        const {apps} = this.props;
        return (
            <div className={Apps.name}>
                <div className="wrapper">
                    {this.drawApps(apps)}
                </div>
            </div>
        )
    }
    drawApps = (data) => {
        return map(data, ({application_id, application_name, application_rank}) => (
            <AppsItem
                key={application_id}
                id={application_id}
                name={application_name}
                rank={application_rank}
                enabledInstallation={true}
                onInstall={this.onChange}/>
        ));
    }
    onChange = (id) => {
        const {onInstall} = this.props;
        onInstall && onInstall(id);
    }
}