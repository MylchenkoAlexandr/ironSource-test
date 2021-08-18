import React, {Component} from "react";
import {map} from 'lodash';
import AppsItem from './AppsItem';
import PropTypes from "prop-types";

export default class AppsRelevant extends Component {
    static propTypes = {
        apps: PropTypes.array
    }

    constructor(props) {
        super(props);
    }
    render() {
        const {apps} = this.props;
        return (
            <div className={AppsRelevant.name}>
                <div className="wrapper">
                    {this.drawAppsRelevant(apps)}
                </div>
            </div>
        )
    }
    drawAppsRelevant = (data) => {
        return map(data, ({application_id, application_name, application_rank}) => (
            <AppsItem
                key={application_id}
                id={application_id}
                name={application_name}
                rank={application_rank}
                enabledInstallation={false}/>
        ));
    }
}