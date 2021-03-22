/* eslint-disable */
/// <reference path="../types.d.ts" />

describe('tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders initial state correctly', () => {
    cy.dataCy("searchContainer").should('exist')
    cy.dataCy("searchInput").type('hello')
    cy.dataCy("newFormButton").click()
    
    cy.dataCy("searchContainer").should('not.exist')
    cy.dataCy("searchInput").should('not.exist')    
    cy.dataCy("homeButton").should('exist')
    cy.dataCy("homeButton").click()

    cy.dataCy("searchContainer").should('exist')
  })

})

export {}
