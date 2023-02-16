describe("Bridge - Status", () => {
  it("should be able to return actual data", () => {
    cy.request("/api/v0/bridge/status").then((resp) => {
      expect(resp.status).to.eq(200);
    });
  });
});
