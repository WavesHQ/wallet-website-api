describe("Wallet - Flags", () => {
  it("should be able to return actual data", () => {
    cy.fixture("flags").then((flagsData) => {
      cy.request("/api/v0/settings/flags").then((resp) => {
        expect(resp.status).to.eq(200);
        expect(Array.isArray(resp.body)).eq(true);
        expect(resp.body).to.deep.equal(flagsData);
      });
    });
  });
});
