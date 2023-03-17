describe("Wallet - Dex Stabilisation Fee", () => {
  it("should be able to return actual data", () => {
    cy.request({
      method: "GET",
      url: "/api/v0/wallet/dex-stab-fees",
      qs: {
        tokenADisplaySymbol: "DUSD",
        tokenBDisplaySymbol: "DFI",
        network: "TestNet",
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.deep.equal({ fee: "5.00" });
    });
  });

  it("should throw 400 error if params are invalid", () => {
    cy.request({
      method: "GET",
      url: "/api/v0/wallet/dex-stab-fees",
      qs: {
        // missing `tokenBDisplaySymbol`
        tokenADisplaySymbol: "DUSD",
        network: "TestNet",
      },
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(400);
      expect(resp.body).to.deep.equal({
        error: "Required fields: tokenADisplaySymbol, tokenBDisplaySymbol",
      });
    });
  });
});
