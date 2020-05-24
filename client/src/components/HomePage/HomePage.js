import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import ReportForm from './ReportForm';
import Reports from './Reports';
import { fetchReports } from "../../actions/reportsActions"

export class HomePage extends Component {
    componentDidMount() {
        this.props.fetchReports()
    }
    render() {
        const { loading } = this.props;
        return (
            <div className="container">
                <ReportForm />
                {loading ? <Spinner /> : <Reports />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.reportsData.loading
});

export default connect(mapStateToProps, { fetchReports })(HomePage);