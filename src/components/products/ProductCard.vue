<template>
  <v-card class="mx-auto my-4 pb-2" max-width="374" elevation="6" rounded="lg">
    <v-img
      cover
      height="220"
      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      class="align-end"
    >
      <v-chip
        class="ma-3 font-weight-bold"
        color="primary"
        label
        size="large"
        elevation="4"
      >
        ${{ producto.price }}
      </v-chip>
    </v-img>

    <v-card-item>
      <v-card-title class="text-h6 font-weight-bold text-primary">
        {{ producto.name }}
      </v-card-title>
    </v-card-item>

    <v-card-text>
      <div class="text-subtitle-1 text-grey-darken-1">
        {{ producto.subtitle }}
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-2"></v-divider>

    <v-card-actions class="d-flex justify-space-between px-4 pb-2">
      <v-btn
        color="secondary"
        variant="tonal"
        prepend-icon="mdi-eye"
        rounded="pill"
        class="px-4"
      >
        Ver detalles
      </v-btn>

      <v-btn
        color="error"
        variant="text"
        icon="mdi-delete-outline"
        @click="$emit('remove-product', producto.id)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    // Recibimos el objeto 'producto' desde App.vue
    producto: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Estilo para que el título no se corte de forma brusca */
.v-card-title {
  line-height: 1.2;
  margin-bottom: 4px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
