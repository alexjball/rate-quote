import RateQuoteClient, { PropertyType, Occupancy } from "./RateQuoteClient";

window.fetch = jest.fn();

const validQuotes = [
  {
    lenderName: "TFB Federal Credit Union",
    loanType: "7/1 ARM",
    interestRate: 4.375,
    closingCosts: 5500,
    monthlyPayment: 2246.7836598083213,
    apr: 4.47814617857375
  },
  {
    lenderName: "TFB Federal Credit Union",
    loanType: "10/1 ARM",
    interestRate: 4.5,
    closingCosts: 5500,
    monthlyPayment: 2280.083894216485,
    apr: 4.6039110474557665
  }
];

describe("RateQuoteClient", () => {
  it("fetches loans", async () => {
    process.env.REACT_APP_API_KEY = "key1";

    const endpoint = "https://www.example.com/query",
      client = new RateQuoteClient(endpoint),
      loanSize = 450000,
      creditScore = 680,
      propertyType = PropertyType.SingleFamily,
      occupancy = Occupancy.Primary,
      expectedRequest = { loanSize, creditScore, propertyType, occupancy },
      expectedQuotes = validQuotes;

    fetch.mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ rateQuotes: expectedQuotes })
    });

    const quotes = client.getRateQuotes(expectedRequest);
    await expect(quotes).resolves.toEqual(expectedQuotes);

    expect(fetch.mock.calls[0][0].toString().startsWith(endpoint)).toBeTruthy();

    const req = fetch.mock.calls[0][0].searchParams;
    expect(req.get("loanSize")).toEqual(String(loanSize));
    expect(req.get("creditScore")).toEqual(String(creditScore));
    expect(req.get("propertyType")).toEqual(String(propertyType));
    expect(req.get("occupancy")).toEqual(String(occupancy));

    expect(fetch.mock.calls[0][1].headers.Authorization).toEqual(
      process.env.REACT_APP_API_KEY
    );
  });

  it("rejects if not 200", async () => {
    fetch.mockResolvedValue({
      status: 500,
      json: jest.fn().mockRejectedValue()
    });

    const client = new RateQuoteClient("https://example.com");
    const quotes = client.getRateQuotes({});
    await expect(quotes).rejects.toThrow();
  });
});
