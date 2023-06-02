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

  it("shows just thoughts for the clicked author", () => {
    cy.intercept("/thoughts", {
      fixture: "thoughts.json",
    });
    cy.visit("http://localhost:5173/");

    // 'user2click' will be last in the list
    // cy.get("ul li:last").click();
    cy.contains("user2click").click();

    // Just one thought
    cy.get("[data-cy=thought-list] li").should("have.length", 1);

    // The thought is from 'user2click'
  });
});
