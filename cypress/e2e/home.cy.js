describe("Home 🏠", () => {
  it("shows a loader", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy=loading]");
  });

  it("shows a list of 4 thoughts", () => {
    cy.intercept("/thoughts", {
      fixture: "thoughts.json",
    });
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy=thought-list] li").should("have.length", 4);
  });
});
