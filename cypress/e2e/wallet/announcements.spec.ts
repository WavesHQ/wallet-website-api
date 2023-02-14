describe("Wallet - Announcements", () => {
  it("should be able to return actual data", () => {
    cy.request("/api/v0/announcements").then((resp) => {
      expect(resp.status).to.eq(200);
      expect(Array.isArray(resp.body)).eq(true);
    });
  });
});
