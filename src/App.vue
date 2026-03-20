<template>
  <v-app>
    <v-app-bar color="primary" elevation="4" prominent>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title class="text-uppercase font-weight-bold">
        Gabriel Benelli
        <span class="font-weight-light">| Catálogo Digital</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container>
        <v-row class="mt-4">
          <v-col
            v-for="producto in misProductos"
            :key="producto.id"
            cols="12"
            sm="6"
            md="4"
          >
            <ProductCard :producto="producto" @remove-product="eliminar" />
          </v-col>
        </v-row>

        <v-row v-if="misProductos.length === 0" justify="center" class="mt-10">
          <v-col cols="6">
            <v-alert type="info" variant="tonal" border="start">
              No quedan productos en el catálogo actual.
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer class="bg-grey-darken-4 text-center d-flex flex-column py-6">
      <div class="white--text pt-0">
        {{ new Date().getFullYear() }} —
        <strong>Gabriel Benelli - Desarrollador Vue</strong>
      </div>
      <v-divider class="my-2" color="white" width="100%"></v-divider>
      <div class="grey--text text--lighten-1">
        Soluciones digitales personalizadas | Santiago, Chile
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import ProductCard from "./components/products/ProductCard.vue";

export default {
  name: "App",
  components: {
    ProductCard,
  },
  data: () => ({
    // Datos sincronizados con las propiedades de ProductCard.vue
    misProductos: [
      {
        id: 1,
        name: "Smartphone Pro",
        price: 899,
        subtitle: "Cámara de 108MP y pantalla AMOLED",
      },
      {
        id: 2,
        name: "Laptop Ultra-delgada",
        price: 1200,
        subtitle: "Procesador de última generación y 1TB SSD",
      },
      {
        id: 3,
        name: "Auriculares Noise-Cancelling",
        price: 250,
        subtitle: "Cancelación activa de ruido, 30h batería",
      },
    ],
  }),
  methods: {
    eliminar(id) {
      this.misProductos = this.misProductos.filter((p) => p.id !== id);
    },
  },
};
</script>

<style>
/* Estilos globales para una visualización más nítida */
body {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Transición suave para las tarjetas */
.v-col {
  transition: all 0.3s ease;
}
</style>
