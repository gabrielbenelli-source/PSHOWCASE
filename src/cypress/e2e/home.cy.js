describe("Catálogo de Productos - Prueba E2E", () => {
  // Antes de cada prueba, visitamos la página principal
  beforeEach(() => {
    // Asegúrate de que tu servidor de desarrollo (npm run serve) esté corriendo en este puerto
    cy.visit("http://localhost:8080");
  });

  it("debería mostrar el título del catálogo correctamente", () => {
    cy.contains("h2", "Mi Catálogo de Proyectos").should("be.visible");
  });

  it("debería permitir al usuario filtrar productos por nombre", () => {
    // 1. Buscamos el input de Element Plus por su clase interna
    // 2. Escribimos "Vue" para filtrar
    cy.get(".el-input__inner").type("Vue");

    // 3. Verificamos que aparezca el "Kit de Desarrollo Vue"
    cy.get(".product-card").should("have.length.at.least", 1);
    cy.contains("Kit de Desarrollo Vue").should("be.visible");

    // 4. Verificamos que NO aparezcan otros productos que no coinciden
    cy.contains("Manual Transmutar").should("not.exist");
  });

  it('debería abrir el modal al hacer clic en "Agregar Proyecto"', () => {
    // Hacemos clic en el botón de Element Plus
    cy.contains("button", "Agregar Proyecto").click();

    // Verificamos que el diálogo (modal) de Element Plus sea visible
    cy.get(".el-dialog").should("be.visible");
    cy.get(".el-dialog__title").should("contain", "Nuevo Proyecto");
  });
});
