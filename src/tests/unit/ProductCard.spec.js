import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ProductCard from "@/components/products/ProductCard.vue";

describe("ProductCard.vue", () => {
  it("debe renderizar el nombre y el precio correctamente", () => {
    const wrapper = mount(ProductCard, {
      props: {
        name: "Manual Transmutar",
        price: "$15.000",
        description: "Obra sobre desarrollo humano",
      },
    });

    // Verificamos que el texto exista en el componente
    expect(wrapper.text()).toContain("Manual Transmutar");
    expect(wrapper.text()).toContain("$15.000");
  });

  it('debe emitir el evento "delete" al hacer clic en eliminar', async () => {
    const wrapper = mount(ProductCard, {
      props: { name: "Test", price: "0", description: "Test" },
    });

    // Buscamos el botón de eliminar y simulamos el click
    await wrapper.find(".btn-delete").trigger("click");

    // Verificamos que el evento se haya disparado
    expect(wrapper.emitted()).toHaveProperty("delete");
  });
});
