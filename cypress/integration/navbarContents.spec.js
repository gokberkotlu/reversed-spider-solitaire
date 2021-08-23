/// <reference types="cypress" />

describe('navbar items', () => {

    beforeEach(() => {
        cy.visit("/")
    })

    it('should get timer which has content 00:00:00 at the beginning', () => {
        cy.get(".timer-container").contains("span", "00:00:00").should("be.visible")
    })

    it('should get score which has content 500 at the beginning', () => {
        cy.get(".score-container").contains("span", "500").should("be.visible")
    })

    it('should get highscore which has content 0 at the beginning', () => {
        cy.get(".navbar-container").contains("span", "High Score: 0").should("be.visible")
    })

    it('should get Undo button', () => {
        cy.get(".undo-container").find(".navbar-btn").contains("span", "Undo").should("be.visible")
    })

    it('should decrease score by 1 when clicked Undo button', () => {
        // Score is decreased by 1 from 500 point with adding 10 card pack from remaining cards
        cy.get(".add-new-cards").last().click()
        // Score is decreased by 1 from 499 point by clicking Undo button
        cy.get(".undo-container").find(".navbar-btn").contains("span", "Undo").click()
        cy.get(".score-container").contains("span", "498").should("be.visible")
    })

    it('should undo last move', () => {
        // Add 10 card pack from remaining cards
        cy.get(".add-new-cards").last().click()
        // Undo adding new card pack and get 54 cards as game started
        cy.get(".undo-container").find(".navbar-btn").contains("span", "Undo").click()
        cy.get(".card").should('have.length', 54)
    })

    it('should get New button to restart the game', () => {
        cy.get(".new-container").find(".navbar-btn").contains("span", "New").should("be.visible")
    })

    it('should reset timer by clicking New button', () => {
        cy.get(".new-container").find(".navbar-btn").contains("span", "New").click()
        cy.get(".timer-container").contains("span", "00:00:00").should("be.visible")
    })

    it('should reset score by clicking New button', () => {
        cy.get(".new-container").find(".navbar-btn").contains("span", "New").click()
        cy.get(".score-container").contains("span", "500").should("be.visible")
    })

    it('should start new game by clicking New button and get 54 cards on game table', () => {
        // Add 10 card pack from remaining cards
        cy.get(".add-new-cards").last().click()
        // Add 10 card pack from remaining cards again
        cy.get(".add-new-cards").last().click()
        cy.get(".new-container").find(".navbar-btn").contains("span", "New").click()
        // Get the card number on the table at beginning
        cy.get(".card").should('have.length', 54)
    })
})