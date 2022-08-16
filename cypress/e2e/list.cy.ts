describe('List page is working correctly', () => {
  it('list page is available', () => {
    cy.visit('http://localhost:3000/list');
  });

  it('check buttons initial state if inputs is empty', () => {
    cy.get('[data-cy="value-input"]').clear();
    cy.get('[data-cy="index-input"]').clear();

    cy.get('[data-cy="add-to-head"]').should('be.disabled');
    cy.get('[data-cy="add-to-tail"]').should('be.disabled');
    cy.get('[data-cy="remove-from-head"]').should('not.be.disabled');
    cy.get('[data-cy="remove-from-tail"]').should('not.be.disabled');

    cy.get('[data-cy="add-by-index"]').should('be.disabled');
    cy.get('[data-cy="remove-by-index"]').should('be.disabled');
  });

  it('checking the rendering of the default list', () => {
    cy.get('[class*=circle_content]').as('circle');

    cy.get('@circle').each((el, index) => {
      if (index === 0) {
        expect(el).to.contain('42');
        expect(el).to.contain('0');
        expect(el).to.contain('head');
      }
      if (index === 1) {
        expect(el).to.contain('0');
        expect(el).to.contain('1');
      }
      if (index === 2) {
        expect(el).to.contain('1');
        expect(el).to.contain('2');
      }
      if (index === 3) {
        expect(el).to.contain('0');
        expect(el).to.contain('3');
      }
      if (index === 4) {
        expect(el).to.contain('24');
        expect(el).to.contain('tail');
        expect(el).to.contain('4');
      }
    });
  });

  it('adding items to the head of the list working correctly', () => {
    cy.get('[data-cy="value-input"]').type('2');
    cy.get('[data-cy="add-to-head"]').click();
    cy.get('[class*=circle_content]').as('circle');

    cy.wait(3000);

    cy.get('@circle').each((el, index) => {
      if (index === 0) {
        expect(el).to.contain('2');
        expect(el).to.contain('0');
        expect(el).to.contain('head');
      }
    });
  });

  it('removing items from the head of the list working correctly', () => {
    cy.get('[data-cy="remove-from-head"]').click();
    cy.get('[class*=circle_content]').as('circle');

    cy.wait(3000);

    cy.get('@circle').each((el, index) => {
      if (index === 0) {
        expect(el).to.contain('0');
        expect(el).to.contain('42');
        expect(el).to.contain('head');
      }
    });
  });

  it('adding items to the tail of the list working correctly', () => {
    cy.get('[data-cy="value-input"]').type('2');
    cy.get('[data-cy="add-to-tail"]').click();
    cy.get('[class*=circle_content]').as('circle');

    cy.wait(3000);

    cy.get('@circle').each((el, index) => {
      if (index === 5) {
        expect(el).to.contain('2');
        expect(el).to.contain('5');
        expect(el).to.contain('tail');
      }
    });
  });

  it('removing items from the tail of the list working correctly', () => {
    cy.get('[data-cy="remove-from-tail"]').click();
    cy.get('[class*=circle_content]').as('circle');

    cy.wait(3000);

    cy.get('@circle').each((el, index) => {
      if (index === 4) {
        expect(el).to.contain('4');
        expect(el).to.contain('24');
        expect(el).to.contain('tail');
      }
    });
  });

  it('adding items by index', () => {
    cy.get('[data-cy="value-input"]').type('10');
    cy.get('[data-cy="index-input"]').type('3');
    cy.get('[data-cy="add-by-index"]').click();

    cy.wait(5000);

    cy.get('[class*=circle_content]').as('circle');
    cy.get('@circle').each((el, index) => {
      if (index === 0) {
        expect(el).to.contain('42');
        expect(el).to.contain('0');
      }
      if (index === 1) {
        expect(el).to.contain('0');
        expect(el).to.contain('1');
      }
      if (index === 2) {
        expect(el).to.contain('1');
        expect(el).to.contain('2');
      }

      if (index === 3) {
        expect(el).to.contain('10');
        expect(el).to.contain('3');
      }
    });
  });

  it('removing items by index', () => {
    cy.get('[data-cy="index-input"]').type('3');
    cy.get('[data-cy="remove-by-index"]').click();

    cy.wait(6000);

    cy.get('[class*=circle_content]').as('circle');
    cy.get('@circle').each((el, index) => {
      if (index === 0) {
        expect(el).to.contain('42');
        expect(el).to.contain('0');
      }
      if (index === 1) {
        expect(el).to.contain('0');
        expect(el).to.contain('1');
      }
      if (index === 2) {
        expect(el).to.contain('1');
        expect(el).to.contain('2');
      }

      if (index === 3) {
        expect(el).to.contain('0');
        expect(el).to.contain('3');
      }
    });
  });
});
