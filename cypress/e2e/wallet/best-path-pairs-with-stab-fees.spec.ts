describe("Wallet - Dex Stabilisation Fee", () => {
  it("should be able to return actual data", () => {
    cy.request("GET", "/api/v0/wallet/best-path-pairs-with-stab-fees", {
      network: "MainNet",
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.deep.equal([
        { tokenADisplaySymbol: "DUSD", tokenBDisplaySymbol: "DFI" },
        { tokenADisplaySymbol: "DUSD", tokenBDisplaySymbol: "dUSDT" },
        { tokenADisplaySymbol: "DUSD", tokenBDisplaySymbol: "dUSDC" },
        { tokenADisplaySymbol: "DUSD", tokenBDisplaySymbol: "dEUROC" },
      ]);
    });
  });
});
