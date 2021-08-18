import React, {Component} from "react";
import Categories from "../Categories";
import CustomerTypes from "../CustomerTypes";
import Apps, {AppsRelevant} from "../Apps";
import {showMessage} from "../../../C/common/Utils";
import Section from "../Section";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {allCategories} from "../../../M/redux/actions/categories.actions";
import {getApplicationsByCategoryId, getRelevantApplications, installApplication} from "../../../M/redux/actions/applications.actions";
import {Spin} from 'antd';
import {isNil} from 'lodash';

@connect(
    ({categories, applications}) => ({categories, applications}),
    (dispatch) => (bindActionCreators({allCategories, getApplicationsByCategoryId, getRelevantApplications, installApplication}, dispatch))
)
export default class Application extends Component {
    state = {
        category_id: null,
        customerType: null
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {category_id, customerType} = this.state;
        const {categories, applications} = this.props;
        const {fetching} = categories;
        return (
            <div className={Application.name}>
                <Section>
                    <Spin spinning={fetching}>
                        <div className="header">
                            <Categories selected={+category_id} categories={categories.data.categories}
                                        onChange={this.onCategoryChange}/>
                            <CustomerTypes selected={customerType} customerTypes={categories.data.customerTypes}
                                           onChange={this.onCustomerChange}/>
                        </div>
                        <AppsRelevant apps={applications.relevant}/>
                        <Apps apps={applications.data} onInstall={this.onInstallApp}/>
                    </Spin>
                </Section>
            </div>
        )
    }

    async componentDidMount() {
        const {categories, allCategories} = this.props;
        if (!(categories.fetched && categories.fetching)) {
            await allCategories();
        }
    }

    update = () => {
        const {category_id, customerType} = this.state;
        if (isNil(category_id)) return showMessage("Choose the Category");
        if (isNil(customerType)) return showMessage("Choose the Customer Type");

        const {getApplicationsByCategoryId, getRelevantApplications} = this.props;
        getApplicationsByCategoryId(category_id);
        getRelevantApplications({category_id, customerType});
    }
    onCategoryChange = (category_id) => {
        this.setState({category_id}, this.update);
    }
    onCustomerChange = (customerType) => {
        this.setState({customerType}, this.update);
    }
    onInstallApp = (application_id) => {
        const {installApplication} = this.props ;
        installApplication(application_id, this.update);
    }
}