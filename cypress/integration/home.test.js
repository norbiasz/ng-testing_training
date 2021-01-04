describe('Home Page', () => {

  beforeEach(() => {
    // cypress/fixtures/courses.json
    // wskazujemy gdzie znajdują sie dane do za-mock-owania
    cy.fixture('courses.json').as('coursesJSON')
    // miedzy fixtures a route odpalamy cypress server
    cy.server()
    // wskazujemy url symuluje pobranie danych które mockujemy
    cy.route('api/courses', '@coursesJSON').as("courses")
    // wskazanie na główną stronę
    cy.visit('/');
  })

  it('should display a list of course', () => {
    // sprawdzenie czy jest taki tekst na głównej stronie
    cy.contains("All Courses")
    // czekamy aż dane załadują się
    cy.wait('@courses')
    // sprawdzenie czy mamy 9 elemenmtów
    cy.get("mat-card").should("have.length", 9)

  })
  it('should display the advanced courses', () => {
    cy.get('.mat-tab-label').should("have.length", 4)
    cy.get('.mat-tab-label').last().click()
    cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.greaterThan', 1)
    cy.get('.mat-tab-body-active .mat-card-title').first().should('contain','Angular Security Course')
  })

})
