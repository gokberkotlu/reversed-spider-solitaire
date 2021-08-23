/// <reference types="cypress" />

describe('cards to add new cards into game table', () => {

    beforeEach(() => {
        cy.visit("/")
    })

    it('should have 5 reversed cards to add remaining cards at beginning', () => {
        cy.get(".add-new-cards").should('have.length', 5)
    })

    it('should have 4 reversed cards to add remaining cards after clicking last of them', () => {
        cy.get(".add-new-cards").last().click()
        cy.get(".add-new-cards").should('have.length', 4)
    })

    it('should trigger timer to start after clicking last add new card element', () => {
        cy.get(".add-new-cards").last().click()
        cy.wait(1000)
        cy.get(".timer-container").contains("span", "00:00:01").should("be.visible")
    })

    it('should decrease score by one clicking last add new card element because of a move has been made', () => {
        cy.get(".add-new-cards").last().click()
        cy.wait(1000)
        cy.get(".score-container").contains("span", "499").should("be.visible")
    })
})