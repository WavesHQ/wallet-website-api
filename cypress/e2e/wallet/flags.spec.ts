describe("Wallet - Flags", () => {
  it("should be able to return actual data", () => {
    cy.request("/api/v0/settings/flags").then((resp) => {
      expect(resp.status).to.eq(200);
      expect(Array.isArray(resp.body)).eq(true);
    });
  });
});
