describe('Pages tests', () => {

    it('main page available', () => {
      cy.visit('http://localhost:3000/')
    })
  
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('string page available', () => {
      cy.get('a[href*="recursion"]').click()
      cy.contains('Строка')
    })
  
    it('fibonacci page available', () => {
      cy.get('a[href*="fibonacci"]').click()
      cy.contains('Последовательность Фибоначчи')
    })
  
    it('sorting page available', () => {
      cy.get('a[href*="sorting"]').click()
      cy.contains('Сортировка массива')
    })
  
    it('stack page available', () => {
      cy.get('a[href*="stack"]').click()
      cy.contains('Стек')
    })
  
    it('queue page available', () => {
      cy.get('a[href*="queue"]').click()
      cy.contains('Очередь')
    })
  
    it('list page available', () => {
      cy.get('a[href*="list"]').click()
      cy.contains('Связный список')
    })
  })