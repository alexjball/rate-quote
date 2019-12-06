import React from "react";
import Table from "react-bootstrap/Table";

const formatRate = rate => `${Number(rate).toFixed(3)}%`;
const formatCost = cost => `$${Number(cost).toFixed()}`;

export default function RateQuoteDisplay({ quotes }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Lender</th>
          <th>Product</th>
          <th>Rate</th>
          <th>Closing Costs</th>
          <th>Monthly Payment</th>
          <th>APR</th>
        </tr>
      </thead>
      <tbody>
        {quotes.map((quote, i) => (
          <tr key={i}>
            <td>{quote.lenderName}</td>
            <td>{quote.loanType}</td>
            <td>{formatRate(quote.interestRate)}</td>
            <td>{formatCost(quote.closingCosts)}</td>
            <td>{formatCost(quote.monthlyPayment)}</td>
            <td>{formatRate(quote.apr)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
