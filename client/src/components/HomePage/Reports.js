import React, { Component } from 'react';
import { Table, Container, Button } from "reactstrap";
import { connect } from "react-redux";
import { resolveCase, setLoading } from "../../actions/reportsActions"
class Reports extends Component {
    onResolve(_id) {
        this.props.resolveCase({ _id });
        this.props.setLoading();
    }
    renderBoard = () => {
        let { reportsData, status } = this.props.reports
        if (!status || !reportsData || reportsData.length === 0) {
            return (
                <tr>
                    <th scope="row">1</th>
                    <td>Loading</td>
                    <td>Loading</td>
                    <td>Loading</td>
                    <td>Loading</td>
                    <td>Loading</td>
                </tr>
            )
        } else {
            return (
                reportsData.map((report, key) => {
                    return (
                        <tr>
                            <th scope="row">{key + 1}</th>
                            <td>{report.registration_id}</td>
                            <td>{report.type}</td>
                            <td>{report.color}</td>
                            <td>{report.status === 'Pending' ?
                                report.officer_assigned[0].name :
                                report.status}
                            </td>
                            <td>{report.status === 'Pending' ?
                                <Button outline size="sm" onClick={() => { this.onResolve(report._id) }} >Resolve</Button> :
                                '---------'}
                            </td>
                        </tr>
                    )
                }
                ))
        }
    }
    render() {
        return (
            <Container fluid>
                <Table striped>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Registeration ID</th>
                            <th>Type</th>
                            <th>Color</th>
                            <th>Assigned To</th>
                            <th>Resolve Now</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBoard()}
                    </tbody>
                </Table>
            </Container >
        );
    }
}

const mapStateToProps = state => ({
    reports: state.reportsData.reports
});

export default connect(mapStateToProps, { setLoading, resolveCase })(Reports);