import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Fibonacci page is working correctly', () => {
  it('Fibonacci page available', () => {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('if input is empty, button is disabled', () => {
    cy.get('input').clear();
    cy.contains('Рассчитать').should('be.disabled');
  });
  it('if input is not empty, button is enabled', () => {
    cy.get('input').type('5');
    cy.contains('Рассчитать').should('not.be.disabled');
    cy.get('input').clear();
  });

  it('fibonacci sequence generates correctly', () => {
    cy.get('input').type('5')
    cy.contains('Рассчитать').as('button')
    cy.get('@button').click()

    cy.get('[class*=circle_circle]').as('circle')

    cy.get('@circle').should('have.length', 1)
    .each((el, index) => {
        if (index === 0) expect(el).to.contain('1')
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 2)
    .each((el, index) => {
        if (index === 0) expect(el).to.contain('1')
        if (index === 1) expect(el).to.contain('1')
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 3)
    .each((el, index) => {
        if (index === 0) expect(el).to.contain('1')
        if (index === 1) expect(el).to.contain('1')
        if (index === 2) expect(el).to.contain('2')
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 4)
    .each((el, index) => {
        if (index === 0) expect(el).to.contain('1')
        if (index === 1) expect(el).to.contain('1')
        if (index === 2) expect(el).to.contain('2')
        if (index === 3) expect(el).to.contain('3')
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 5)
    .each((el, index) => {
        if (index === 0) expect(el).to.contain('1')
        if (index === 1) expect(el).to.contain('1')
        if (index === 2) expect(el).to.contain('2')
        if (index === 3) expect(el).to.contain('3')
        if (index === 4) expect(el).to.contain('5')
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 6)
    .each((el, index) => {
        if (index === 0) expect(el).to.contain('1')
        if (index === 1) expect(el).to.contain('1')
        if (index === 2) expect(el).to.contain('2')
        if (index === 3) expect(el).to.contain('3')
        if (index === 4) expect(el).to.contain('5')
        if (index === 5) expect(el).to.contain('8')
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('input').should('have.value', '')
  })
});
