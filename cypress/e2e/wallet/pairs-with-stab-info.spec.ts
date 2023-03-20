describe("Wallet - Poolpairs with Dex Stabilisation Fee", () => {
  it("should be able to return actual data from MainNet", () => {
    cy.request(
      "GET",
      "/api/v0/wallet/pairs-with-stab-info?network=MainNet"
    ).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.length).to.be.greaterThan(0);
      expect(resp.body[0]).to.have.all.keys(
        "tokenADisplaySymbol",
        "tokenBDisplaySymbol",
        "dexStabilizationFee",
        "highFeeScanUrl"
      );
      expect(resp.body[0].highFeeScanUrl).to.not.contain("?network=");
      // TODO: Check if we can mock our own poolpair
    });
  });

  it("should be able to return actual data from TestNet", () => {
    cy.request(
      "GET",
      "/api/v0/wallet/pairs-with-stab-info?network=TestNet"
    ).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.length).to.be.greaterThan(0);
      expect(resp.body[0]).to.have.all.keys(
        "tokenADisplaySymbol",
        "tokenBDisplaySymbol",
        "dexStabilizationFee",
        "highFeeScanUrl"
      );
      expect(resp.body[0].highFeeScanUrl).to.contain("?network=TestNet");
    });
  });
});
