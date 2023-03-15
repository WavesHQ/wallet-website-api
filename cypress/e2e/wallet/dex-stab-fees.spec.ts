describe("Wallet - Dex Stabilisation Fee", () => {
  it("should be able to return actual data", () => {
    cy.request("GET", "/api/v0/wallet/dex-stab-fees", {
      tokenADisplaySymbol: "DUSD",
      tokenBDisplaySymbol: "DFI",
      network: "TestNet",
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.deep.equal(5);
    });
  });
});
