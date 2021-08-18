import React, {Component} from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";

export default class Section extends Component {
    static propTypes = {
        id: PropTypes.string,
        className: PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {id, children, className} = this.props;
        return (
            <div id={id} className={ClassNames(Section.name, className)}>
                {children}
            </div>
        )
    }
}


