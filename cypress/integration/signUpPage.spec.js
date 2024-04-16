describe("Test SignUpPage", () => {
  beforeEach(() => {
    cy.visit("/sign-up");
  });

  it("should be able to sign-up as a tenant when giving valid inputs", () => {
    cy.log("Start user-information form");
    cy.get("#firstname-input").type("Max");
    cy.get("#lastname-input").type("Muster");
    cy.get("#email-input").type("max.muster@example.com");
    cy.get("#password-input").type("PASSwort123!");
    cy.get("#password-confirmation-input").type("PASSwort123!");
    cy.get("[type=submit]").click();
    cy.log("End user-information form");

    cy.log("Start user-type form");
    cy.get("[type=radio]").first().check();
    cy.get("[type=submit]").click();
    cy.log("End user-type form");

    cy.log("Start tenant form");
    cy.get("#birthdate-input").type("2000-01-01");
    cy.get("#phone-number-input\\.phoneNumber").type("+41790000000");
    cy.get("#phone-number-input\\.countryCode").contains("CH");
    cy.get("#address-input-street").type("Musterstrasse 1");
    cy.get("#address-input-postCode").type("1000");
    cy.get("#address-input-city").type("Musterstadt");
    cy.get("#address-input-country").type("Schweiz");
    cy.get("[type=submit]").click();
    cy.log("End tenant form");

    cy.log("Start consent form");
    cy.get("#terms-of-use-input").click();
    cy.get("#privacy-policy-input").click();
    cy.get("[type=submit]").click();
    cy.log("End consent form");
  });
});
