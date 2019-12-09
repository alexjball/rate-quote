import React, { Component } from "react";
import { PropertyType, Occupancy } from "./RateQuoteClient";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./SearchForm.css";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loanSize: 50000,
      creditScore: 700,
      propertyType: PropertyType.SingleFamily,
      occupancy: Occupancy.Primary
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      this.props.onQuoteRequested(this.state);
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="search-form">
        <Row>
          <Col>
            <Form.Group controlId="loanSize">
              <Form.Label>Loan Size</Form.Label>
              <Form.Control
                required
                min={0}
                max={10e6}
                value={this.state.loanSize}
                type="number"
                onChange={e => this.setState({ loanSize: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="creditScore">
              <Form.Label>Credit Score</Form.Label>
              <Form.Control
                required
                min={300}
                max={800}
                value={this.state.creditScore}
                type="number"
                onChange={e => this.setState({ creditScore: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="propertyType">
              <Form.Label>Property Type</Form.Label>
              <Form.Control
                as="select"
                value={this.state.propertyType}
                onChange={e => this.setState({ propertyType: e.target.value })}
              >
                <option>{PropertyType.SingleFamily}</option>
                <option>{PropertyType.Condo}</option>
                <option>{PropertyType.Townhouse}</option>
                <option>{PropertyType.MultiFamily}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="occupancy">
              <Form.Label>Occupancy</Form.Label>
              <Form.Control
                as="select"
                value={this.state.occupancy}
                onChange={e => this.setState({ occupancy: e.target.value })}
              >
                <option>{Occupancy.Primary}</option>
                <option>{Occupancy.Secondary}</option>
                <option>{Occupancy.Investment}</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Quote Rates
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
