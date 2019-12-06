import React, { Component } from "react";
import SearchForm from "./SearchForm";
import RateQuoteClient from "./RateQuoteClient";
import RateQuoteDisplay from "./RateQuoteDisplay";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.rateQuoteClient = new RateQuoteClient();
    this.state = {};
  }

  requestQuotes({ creditScore, occupancy, loanSize, propertyType }) {
    this.rateQuoteClient
      .getRateQuotes({
        creditScore,
        occupancy,
        loanSize,
        propertyType
      })
      .then(quotes => {
        this.setState({ quotes });
      })
      .catch(reason => {
        console.error("Couldn't request quotes", reason);
      });
  }

  render() {
    const quotes = this.state.quotes;
    return (
      <div>
        <SearchForm
          onQuoteRequested={formInfo => this.requestQuotes(formInfo)}
        />
        {!!quotes && <RateQuoteDisplay quotes={quotes} />}
      </div>
    );
  }
}

export default App;
