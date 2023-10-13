describe("Wallet - Announcements", () => {
  it("should be able to return actual data", () => {
    cy.fixture("announcements").then((announcementsData) => {
      cy.request("/api/v0/announcements").then((resp) => {
        expect(resp.status).to.eq(200);
        expect(Array.isArray(resp.body)).eq(true);
        expect(resp.body).to.deep.equal(announcementsData);
      });
    });
  });
});
