import React, { Component } from 'react';
import {
    Input,
    Button,
    Col,
    Row
} from "reactstrap"
import { connect } from 'react-redux';
import {
    registerCase,
    setLoading
} from '../../actions/reportsActions';

class ReportForm extends Component {
    state = {
        options: '',
        registration_id: '',
        color: '',
        type: ''
    }
    handleType = (e) => {
        this.setState({
            type: e.target.value
        })
    }
    handleOptions = (e) => {
        this.setState({
            options: e.target.value
        })
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = e => {
        e.preventDefault();
        const { registration_id, type, color } = this.state
        if (registration_id.length === 0 || color.length === 0 || type.length === 0) {
            alert("Please enter all fields")
            return
        }
        this.props.setLoading();
        this.props.registerCase(this.state);
    };

    render() {
        return (
            <div className="jumbotron mt-5 text-center">
                <form id="searchForm" onSubmit={this.onSubmit}>
                    <div >
                        <Row >
                            <Col>
                                <select onChange={this.handleOptions} className="custom-select" id="inputGroupSelect02">
                                    <option disabled selected hidden value="">Options</option>
                                    <option selected value="FIR">File an FIR</option>
                                </select>
                            </Col>
                            <Col xs="5" >
                                <Input type="text" placeholder="Registration Certificate ID of Stolen Car" className="form-control" onChange={this.onChange} name="registration_id" />
                            </Col>
                            <Col >
                                <select onChange={this.handleType} className="custom-select" id="inputGroupSelect02">
                                    <option disabled selected hidden value="">Type</option>
                                    <option value="SUV">SUV</option>
                                    <option value="MUV">MUV</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="Crossover">Crossover</option>
                                    <option value="Convertible">Convertible</option>
                                </select>
                            </Col>
                            <Col >
                                <Input name="color" onChange={this.onChange} placeholder="Color" />
                            </Col>

                            <Col>
                                <Button type="submit" color="primary">SUBMIT</Button>
                            </Col>
                        </Row>
                    </div>
                </form>
            </div >
        );
    }
}


export default connect(
    null,
    { registerCase, setLoading }
)(ReportForm);