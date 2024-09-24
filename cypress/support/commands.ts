/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add('multiSelect', (selector, text) => {
  cy.get(`.ant-select${selector}`).click();
  cy.get(`.ant-select${selector} .ant-select-selection-search input`)
    .invoke('attr', 'id')
    .then((selElm) => {
      const dropDownSelector = `#${selElm}_list`;
      cy.get(dropDownSelector)
        .next()
        .find('.ant-select-item-option-content')
        .contains(text)
        .click({ force: true });
    });
});
// @ts-ignore
Cypress.Commands.add('selectFirstOption', (selector) => {
  cy.get(`.ant-select${selector}`).click();
  cy.get(`.ant-select${selector} .ant-select-selection-search input`)
    .invoke('attr', 'id')
    .then((selElm) => {
      const dropDownSelector = `#${selElm}_list`;
      cy.get(dropDownSelector)
        .next()
        .find('.ant-select-item-option-content')
        .first()
        .click({ force: true });
    });
});
Cypress.Commands.add('selectLastOption', (selector) => {
  cy.get(`.ant-select${selector}`).click();
  cy.get(`.ant-select${selector} .ant-select-selection-search input`)
    .invoke('attr', 'id')
    .then((selElm) => {
      const dropDownSelector = `#${selElm}_list`;
      cy.get(dropDownSelector)
        .next()
        .find('.ant-select-item-option-content')
        .last()
        .click({ force: true });
    });
});
// @ts-ignore
Cypress.Commands.add('multiSelectAll', (selector, parent) => {
  cy.get(`${parent} .ant-select${selector}`).click();
  cy.get(`${parent} .ant-select${selector} .ant-select-selection-search input`)
    .invoke('attr', 'id')
    .then((selElmId) => {
      // Change variable name to selElmId
      const dropDownSelector = `#${selElmId}_list`;
      cy.get(dropDownSelector)
        .next()
        .find('.ant-select-item-option-content')
        .each(($option) => {
          // Change variable name to $option
          cy.wrap($option).scrollIntoView().click({ force: true }); // Scroll option into view before clicking
        });
    });
});
