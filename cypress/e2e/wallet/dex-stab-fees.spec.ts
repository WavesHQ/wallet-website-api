describe("Wallet - Dex Stabilisation Fee", () => {
  it("should be able to return actual data", () => {
    cy.request({
      method: "Post",
      url: "/api/v0/wallet/dex-stab-fees",
      qs: {
        tokenDisplaySymbolA: "DUSD",
        tokenDisplaySymbolB: "DFI",
        network: "TestNet",
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.deep.equal({ fee: "5.00" });
    });
  });
});
