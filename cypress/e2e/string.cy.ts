import { DELAY_IN_MS } from '../../src/constants/delays';

describe('String page is working correctly', () => {
  it('String page available', () => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('if input is empty, button is disabled', () => {
    cy.get('input').clear();
    cy.contains('Развернуть').should('be.disabled');
  });
  it('if input is not empty, button is enabled', () => {
    cy.get('input').type('hello');
    cy.contains('Развернуть').should('not.be.disabled');
    cy.get('input').clear();
  });

  it('recursion of string working correctly', () => {
    cy.get('input').type('hello');
    cy.contains('Развернуть').as('button');
    cy.get('@button').click();

    cy.get('@button').find('[class*=loader]');
    cy.get('[class*=circle_circle]').as('circle');

    cy.get('@circle').each((el, index) => {
      if (index === 0) expect(el).to.contain('h');
      if (index === 1) expect(el).to.contain('e');
      if (index === 2) expect(el).to.contain('l');
      if (index === 3) expect(el).to.contain('l');
      if (index === 4) expect(el).to.contain('o');

      if (index === 0 || index === 4) {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      }
    });

    cy.wait(DELAY_IN_MS);

    cy.get('@circle').each((el, index) => {
      if (index === 0 || index === 4) {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
      }
    });

    cy.wait(DELAY_IN_MS);

    cy.get('@circle').each((el, index) => {
      if (index === 1 || index === 3) {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      }
      if (index === 1) expect(el).to.contain('e');
      if (index === 3) expect(el).to.contain('l');
    });

    cy.wait(DELAY_IN_MS);

    cy.get('@circle').each((el, index) => {
        if (index === 2) {
          cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
          expect(el).to.contain('l');
        }
    });

    cy.wait(DELAY_IN_MS);

    cy.get('@circle').each((el, index) => {
        if (index === 2) {
          cy.wrap(el).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
          expect(el).to.contain('l');
        }
    });

    cy.get('[class*=circle_content]').each((el) => {
      cy.wrap(el).find('[class*=circle_modified]');
    });

    cy.get('input').clear()
  });
});
