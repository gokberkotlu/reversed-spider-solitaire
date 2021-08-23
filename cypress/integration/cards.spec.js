/// <reference types="cypress" />

describe('game cards on the game table', () => {

    beforeEach(() => {
        cy.visit("/")
    })

    it('should have 54 cards at the beginning of game', () => {
        cy.get(".card").should('have.length', 54)
    })

    it('should not have reversed card at the end of card units', () => {
        cy.get(".card-holder-unit").each($el => {
            cy.wrap($el).get(".card-template").last().should("not.have.class", "card-back")
        })
    })
})