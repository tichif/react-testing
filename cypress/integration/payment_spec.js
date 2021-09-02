const { v4: uuid4 } = require("uuid");

describe("Payment", () => {
  it("user can make payment", () => {
    // login
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /sign in/i }).click();

    // check account balance
    let oldBalance;
    cy.get("[data-test=sidenav-user-balance]").then(($balance) => (oldBalance = $balance.text()));
    // .then((balance) => console.log(balance));

    // click on Pay button
    cy.findByText(/new/i).click();

    // search for user
    cy.findByRole("textbox").type("Devon Becker");
    cy.findByText(/devon becker/i).click();

    // add amount and note and click pay
    const amount = "5.00";
    cy.findByPlaceholderText(/amount/i).type(amount);
    const description = uuid4();
    cy.findByPlaceholderText(/add a note/i).type(description);
    cy.findByRole("button", { name: /pay/i }).click();

    // return to transactions
    cy.findByText(/return to transactions/i).click();

    // go to personal payments
    cy.findByRole("tab", { name: /mine/i }).click();

    // click on payment
    cy.findByText(description).click({ force: true });

    // verify if payment was made
    cy.findByText(`-$${amount}`).should("be.visible");
    cy.findByText(description).should("be.visible");

    // verify if payment amount was deducted
    cy.get("[data-test=sidenav-user-balance]").then(($balance) => {
      const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
      const convertedNewBalance = parseFloat($balance.text().replace(/\$|,/g, ""));

      expect(convertedOldBalance - convertedNewBalance).to.equal(parseFloat(amount));
    });
  });
});
