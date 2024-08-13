/// <reference types="cypress" />

describe("spec", () => {
  console.clear();

  beforeEach(() => {
    cy.visit("http://localhost:5173/").then(() => {
      cy.wait(3000);
    });
  });

  it("loads correctly", () => {
    cy.get("body").should("be.visible");
    cy.get("header").should("contain", "José Espejo");
    cy.get("header").should("contain", "Front End Developer");
    cy.get(".pf-item").should("have.length.greaterThan", 0);
  });

  it("starts with window scrolled to top", () => {
    cy.window().then((win) => {
      expect(win.scrollY).to.equal(0);
    });
  });

  it("all accordions open", () => {
    cy.get(".accordion-header").each(($el) => {
      cy.wrap($el)
        .click()
        .wait(2000)
        .then(() => {
          cy.wrap($el)
            .closest(".pf-item")
            .invoke("height")
            .should("be.greaterThan", 100);
        });
    });
  });

  it("only one accordion open at a time", () => {
    cy.get(".accordion-header").each(($el, _, $list) => {
      cy.wrap($el)
        .click()
        .wait(2000)
        .then(() => {
          cy.wrap($el)
            .closest(".pf-item")
            .invoke("height")
            .should("be.greaterThan", 100);

          // Check that all other accordions are closed
          cy.wrap($list)
            .filter((_, otherEl) => otherEl !== $el[0])
            .each(($otherEl) => {
              cy.wrap($otherEl)
                .closest(".pf-item")
                .invoke("height")
                .should("be.lessThan", 40);
            });
        });
    });
  });

  it("dark mode toggles when the button is clicked", () => {
    cy.get("button")
      .contains("dark mode")
      .then(($button) => {
        if ($button.text().trim().includes("dark mode: off")) {
          cy.log("dark mode was initially off");
          cy.wrap($button)
            .click()
            .then(() => {
              cy.get("html").should("have.class", "dark");
              cy.get("html").should(
                "have.css",
                "background-color",
                "rgb(38, 38, 38)",
              );

              cy.wrap($button)
                .click()
                .then(() => {
                  cy.get("html").should("not.have.class", "dark");
                  cy.get("html").should(
                    "have.css",
                    "background-color",
                    "rgb(255, 255, 255)",
                  );
                });
            });
        } else {
          cy.log("dark mode was initially on");
          cy.wrap($button)
            .click()
            .then(() => {
              cy.get("html").should("not.have.class", "dark");
              cy.get("html").should(
                "have.css",
                "background-color",
                "rgb(255, 255, 255)",
              );
            });
        }
      });
  });
});
