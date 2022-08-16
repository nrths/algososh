import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

const reviewDefaultStyle = (el) => {
  cy.get(el)
    .find('[class*=circle_circle]')
    .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
};

const reviewChangingStyle = (el) => {
  cy.get(el)
    .find('[class*=circle_circle]')
    .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
};

describe('Stack page is working correctly', () => {
  it('Stack page available', () => {
    cy.visit('http://localhost:3000/stack');
  });

  it('if input is empty, add-button is disabled', () => {
    cy.get('input').clear();
    cy.get('[data-cy="add"]').should('be.disabled');
  });
  it('if input is not empty, add-button is enabled', () => {
    cy.get('input').type('as');
    cy.get('[data-cy="add"]').should('not.be.disabled');
    cy.get('input').clear();
  });

  it('adding items to stack working correctly', () => {
    cy.get('[data-cy="add"]').as('add');

    cy.get('input').type('as');
    cy.get('@add').click();

    cy.get('[class*=circle_content]').as('circle');

    cy.get('@circle')
      .should('have.length', 1)
      .each((el, index) => {
        if (index === 0) {
          expect(el).to.contain('as');
          reviewChangingStyle(el);
        }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle')
      .should('have.length', 1)
      .each((el, index) => {
        if (index === 0) {
          expect(el).to.contain('as');
          expect(el).to.contain('0');
          expect(el).to.contain('top');
          reviewDefaultStyle(el);
        }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type('ad');
    cy.get('@add').click();

    cy.get('@circle')
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0) {
          expect(el).to.contain('as');
          expect(el).to.contain('0');
          reviewDefaultStyle(el);
        }
        if (index === 1) {
          expect(el).to.contain('ad');
          expect(el).to.contain('1');
          expect(el).to.contain('top');
          reviewChangingStyle(el);
        }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle')
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0) {
          expect(el).to.contain('as');
          expect(el).to.contain('0');
          reviewDefaultStyle(el);
        }

        if (index === 1) {
          expect(el).to.contain('top');
          expect(el).to.contain('ad');
          expect(el).to.contain('1');
          reviewDefaultStyle(el);
        }
    });

    cy.get('@add').should('be.disabled');
    cy.get('[data-cy="remove"]').should('not.be.disabled');
    cy.get('[data-cy="clear"]').should('not.be.disabled');
  });

  it('removing items from stack working correctly', () => {
    cy.get('[data-cy="add"]').as('add');
    cy.get('[data-cy="remove"]').as('remove');

    cy.get('[class*=circle_content]').as('circle');

    cy.get('@circle')
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0) {
          expect(el).to.contain('as');
          expect(el).to.contain('0');
          reviewDefaultStyle(el);
        }

        if (index === 1) {
          expect(el).to.contain('top');
          expect(el).to.contain('ad');
          expect(el).to.contain('1');
          reviewDefaultStyle(el);
        }
    });

    cy.get('@remove').click();

    cy.get('@circle')
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0) {
          expect(el).to.contain('as');
          expect(el).to.contain('0');
          reviewDefaultStyle(el);
        }

        if (index === 1) {
          expect(el).to.contain('top');
          expect(el).to.contain('ad');
          expect(el).to.contain('1');
          reviewChangingStyle(el);
        }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle')
      .should('have.length', 1)
      .each((el) => {
        expect(el).to.contain('as');
        expect(el).to.contain('0');
        expect(el).to.contain('top');
        reviewDefaultStyle(el);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@remove').click();
    cy.get('@circle').should('have.length', 0);

    cy.get('@add').should('be.disabled');
    cy.get('@remove').should('be.disabled');
    cy.get('[data-cy="clear"]').should('be.disabled');
  });

  it('stack clearing working correctly', () => {
    cy.get('[data-cy="add"]').as('add')
    cy.get('[data-cy="remove"]').as('remove')
    cy.get('[data-cy="clear"]').as('clear')
    
    cy.get('input').type('as')
    cy.get('@add').click()
    cy.get('input').type('ad')
    cy.get('@add').click()
    cy.get('input').type('af')
    cy.get('@add').click()

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@clear').click()
    cy.get('[class*=circle_content]')
      .each((el) => {
        reviewChangingStyle(el);
    });
    cy.get('[class*=circle_content]').should('have.length', 0)

    cy.get('@add').should('be.disabled')
    cy.get('@remove').should('be.disabled')
    cy.get('@clear').should('be.disabled')
  })
});
