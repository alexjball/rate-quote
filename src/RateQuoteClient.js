export let PropertyType = {
  SingleFamily: "SingleFamily",
  Condo: "Condo",
  Townhouse: "Townhouse",
  MultiFamily: "MultiFamily"
};

export let Occupancy = {
  Primary: "Primary",
  Secondary: "Secondary",
  Investment: "Investment"
};

const defaultEndpoint =
  "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes";

export default class RateQuoteClient {
  constructor(endpointUrl) {
    this.endpointUrl = endpointUrl || defaultEndpoint;
  }

  getRateQuotes({ loanSize, creditScore, propertyType, occupancy }) {
    const url = new URL(this.endpointUrl),
      params = { loanSize, creditScore, propertyType, occupancy };

    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );

    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: process.env.REACT_APP_API_KEY
      }
    }).then(response => {
      if (response.status !== 200) {
        throw Error(`${response.status} error fetching rate quote`);
      }
      return response.json().then(res => res.rateQuotes);
    });
  }
}
