describe("Bridge - Announcements", () => {
  it("should be able to return list of announcements", () => {
    cy.request("/api/v0/bridge/announcements").then((resp) => {
      expect(resp.status).to.eq(200);
      expect(Array.isArray(resp.body)).eq(true);
    });
  });
});
