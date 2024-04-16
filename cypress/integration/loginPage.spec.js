describe("Test LoginPage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should be able to login wehen entering valid credentials", () => {
    cy.log("Enter email");
    cy.get("input[name=email]").type("aschvin00@gmail.com");
    cy.log("Enter password");
    cy.get("input[name=password]").type("Password123$");
    cy.log("Check remember me");
    cy.get("input[name=rememberMe]").check();
    cy.get("button[type=submit]").click();

    cy.url().should("eq", "http://localhost:3000/dashboard");
    cy.getCookie("auth_token").should("exist");
  });

  it("should show error when entering invalid credentials", () => {
    cy.get("input[name=email]").type("invalid@example.com");
    cy.get("input[name=password]").type("BadPassword123$");
    cy.get("button[type=submit]").click();
    cy.getByTestId("login-error", { timeout: 2500 }).should("exist");
  });
});
