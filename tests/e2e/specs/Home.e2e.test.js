/* Home end-to-end tests
 *
 * @group e2e/front-end
 */

describe("Test Home view", () => {
  it("Visits the home view url", () => {
    cy.visit("/");
    cy.contains("Taskbox");
  });
});
