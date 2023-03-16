describe("Wallet - Dex Stabilisation Fee", () => {
  it("should be able to return actual data", () => {
    cy.request("GET", "/api/v0/wallet/best-path-pairs-with-stab-fees", {
      network: "MainNet",
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.deep.equal([
        { tokenDisplaySymbolA: "DUSD", tokenDisplaySymbolB: "DFI" },
        { tokenDisplaySymbolA: "DUSD", tokenDisplaySymbolB: "dUSDT" },
        { tokenDisplaySymbolA: "DUSD", tokenDisplaySymbolB: "dUSDC" },
        { tokenDisplaySymbolA: "DUSD", tokenDisplaySymbolB: "dEUROC" },
      ]);
      // TODO: Check if we can mock our own poolpair
    });
  });
});
