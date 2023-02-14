describe("Bridge - Limits", () => {
  it("should be able to return actual data", () => {
    cy.request("/api/v0/bridge/limits").then((resp) => {
      expect(resp.status).to.eq(200);
    });
  });
});
