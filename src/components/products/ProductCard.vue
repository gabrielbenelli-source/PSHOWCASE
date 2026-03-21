<template>
  <v-card class="mx-auto my-4 pb-2" max-width="374" elevation="6" rounded="lg">
    <v-img
      :src="producto.image"
      cover
      height="220"
      class="align-end bg-grey-lighten-2"
    >
      <v-chip class="ma-3 font-weight-bold" color="primary" label size="large">
        ${{ producto.price.toLocaleString("es-CL") }}
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

    <v-card-actions class="px-4 pb-2 flex-wrap">
      <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ props }">
          <v-btn
            color="secondary"
            variant="tonal"
            prepend-icon="mdi-eye"
            rounded="pill"
            v-bind="props"
            class="mb-2"
          >
            Detalles
          </v-btn>
        </template>

        <v-card rounded="xl">
          <v-toolbar color="primary" dark title="Especificaciones"></v-toolbar>
          <v-card-text class="pa-6">
            <h3 class="text-h5 mb-4 font-weight-bold">{{ producto.name }}</h3>
            <v-list
              lines="one"
              v-if="producto.features && producto.features.length"
            >
              <v-list-item
                v-for="(feature, i) in producto.features"
                :key="i"
                prepend-icon="mdi-check-circle"
                color="success"
              >
                <v-list-item-title>{{ feature }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <p v-else class="text-grey italic">No hay detalles adicionales.</p>
          </v-card-text>
          <v-card-actions class="justify-end pa-4">
            <v-btn color="primary" variant="text" @click="dialog = false"
              >Cerrar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-spacer></v-spacer>

      <v-btn
        color="success"
        variant="elevated"
        icon="mdi-cart-plus"
        elevation="2"
        class="mb-2"
        @click="$emit('add-to-cart', producto)"
      ></v-btn>

      <v-btn
        color="error"
        variant="text"
        icon="mdi-delete-outline"
        class="mb-2"
        @click="$emit('remove-product', producto.id)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    producto: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
  }),
};
</script>
