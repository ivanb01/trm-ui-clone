// This will allow TypeScript to recognize the new Cypress command
declare namespace Cypress {
  interface Chainable {
    multiSelect(selector: string, text: string): void;
    multiSelectAll(selector: string, parent?: string): void;
    selectFirstOption(selector: string): void;
    selectLastOption(selector: string): void;
  }
}
