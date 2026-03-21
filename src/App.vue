<template>
  <v-app shadow>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      width="350"
      class="pa-4 bg-grey-lighten-5"
    >
      <div class="text-center mb-4">
        <v-avatar size="80" color="primary" class="mb-2">
          <span class="text-h4 white--text">GB</span>
        </v-avatar>
        <h2 class="text-h6 font-weight-bold">Gabriel Benelli</h2>
        <p class="text-caption text-primary font-weight-bold">
          Magíster en Proyectos | Vue Developer
        </p>
      </div>
      <v-divider class="mb-4"></v-divider>
      <div class="mb-4">
        <h3 class="text-subtitle-2 font-weight-bold mb-1 text-uppercase">
          Perfil
        </h3>
        <p class="text-body-2 text-justify grey-darken-3">
          Magíster en Dirección Estratégica y Administración de Proyectos.
          Experto en gestión pública e integración de capacidades técnicas en
          desarrollo Frontend con Vue.js.
        </p>
      </div>
      <div class="mb-4">
        <h3 class="text-subtitle-2 font-weight-bold mb-2 text-uppercase">
          Competencias
        </h3>
        <v-chip-group column>
          <v-chip
            v-for="tag in tags"
            :key="tag.text"
            size="small"
            :color="tag.color"
            variant="tonal"
          >
            {{ tag.text }}
          </v-chip>
        </v-chip-group>
      </div>
      <v-list density="compact">
        <v-list-subheader class="text-uppercase font-weight-bold"
          >Logros</v-list-subheader
        >
        <v-list-item
          v-for="logro in logros"
          :key="logro.title"
          :prepend-icon="logro.icon"
          :title="logro.title"
          :subtitle="logro.subtitle"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="cartDrawer"
      location="right"
      temporary
      width="400"
      class="pa-4"
    >
      <div class="d-flex align-center mb-4">
        <v-icon color="primary" class="mr-2">mdi-cart</v-icon>
        <h2 class="text-h6 font-weight-bold">Mi Carrito</h2>
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="cartDrawer = false"
        ></v-btn>
      </div>
      <v-divider class="mb-4"></v-divider>
      <v-list v-if="carrito.length > 0">
        <v-list-item
          v-for="(item, index) in carrito"
          :key="index"
          class="mb-2 border-sm rounded"
        >
          <template v-slot:prepend>
            <v-avatar rounded="lg" size="50"
              ><v-img :src="item.image"></v-img
            ></v-avatar>
          </template>
          <v-list-item-title
            class="font-weight-bold text-truncate"
            style="max-width: 180px"
            >{{ item.name }}</v-list-item-title
          >
          <v-list-item-subtitle>{{
            formatPrice(item.price)
          }}</v-list-item-subtitle>
          <template v-slot:append>
            <v-btn
              icon="mdi-delete-outline"
              size="small"
              color="error"
              variant="text"
              @click="quitarDelCarrito(index)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
      <v-alert
        v-else
        type="info"
        variant="tonal"
        text="El carrito está vacío"
      ></v-alert>
      <template v-slot:append>
        <div class="pa-4 border-t-sm bg-white">
          <div class="d-flex justify-space-between mb-4">
            <span class="text-h6">Total:</span>
            <span class="text-h6 font-weight-bold text-primary">{{
              formatPrice(totalCarrito)
            }}</span>
          </div>
          <v-btn
            block
            color="success"
            size="large"
            :disabled="carrito.length === 0"
            elevation="2"
            @click="finalizarCompra"
          >
            Finalizar Compra
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar color="primary" elevation="4" prominent>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="text-uppercase font-weight-bold">
        Gabriel Benelli <span class="font-weight-light">| Catálogo</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn
        prepend-icon="mdi-shield-account"
        color="amber-lighten-4"
        variant="text"
        class="mr-2"
        @click="adminDialog = true"
      >
        Admin
      </v-btn>
      <v-btn icon class="mr-2" @click="cartDrawer = !cartDrawer">
        <v-badge
          :content="carrito.length"
          color="red"
          :model-value="carrito.length > 0"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container>
        <v-row class="mt-4" v-if="misProductos.length > 0">
          <v-col
            v-for="producto in misProductos"
            :key="producto.id"
            cols="12"
            sm="6"
            md="4"
          >
            <ProductCard
              :producto="producto"
              @remove-product="eliminar"
              @add-to-cart="agregarAlCarrito"
            />
          </v-col>
        </v-row>
        <v-row v-else justify="center" class="mt-10">
          <v-col cols="12" sm="6" class="text-center">
            <v-icon size="100" color="grey-lighten-1"
              >mdi-package-variant-closed</v-icon
            >
            <p class="text-h6 text-grey mt-4">No hay productos disponibles.</p>
            <v-btn
              color="primary"
              variant="outlined"
              class="mt-4"
              @click="resetCatalogo"
              >Cargar productos iniciales</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="adminDialog" max-width="500">
      <v-card>
        <v-card-title class="bg-primary text-white d-flex align-center">
          Nuevo Producto
          <v-spacer></v-spacer>
          <v-btn
            icon="mdi-refresh"
            variant="text"
            size="small"
            title="Restablecer Catálogo"
            @click="resetCatalogo"
          ></v-btn>
        </v-card-title>
        <v-card-text class="pa-4">
          <v-text-field
            v-model="nuevoP.name"
            label="Nombre"
            density="compact"
          ></v-text-field>
          <v-text-field
            v-model="nuevoP.subtitle"
            label="Descripción breve"
            density="compact"
          ></v-text-field>
          <v-text-field
            v-model.number="nuevoP.price"
            label="Precio"
            type="number"
            density="compact"
          ></v-text-field>
          <v-text-field
            v-model="nuevoP.image"
            label="URL Imagen"
            density="compact"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" variant="text" @click="borrarStorage"
            >Limpiar Todo</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="adminDialog = false">Cerrar</v-btn>
          <v-btn color="primary" variant="elevated" @click="crearProducto"
            >Agregar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import ProductCard from "./components/products/ProductCard.vue";
import confetti from "canvas-confetti";

export default {
  name: "App",
  components: { ProductCard },
  data: () => ({
    drawer: false,
    cartDrawer: false,
    adminDialog: false,
    carrito: [],
    nuevoP: {
      name: "",
      price: 0,
      subtitle: "",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
    },
    tags: [
      { text: "Vue.js / JS", color: "primary" },
      { text: "Gestión Proyectos", color: "secondary" },
      { text: "Dirección Estratégica", color: "success" },
      { text: "Producción Cine", color: "orange" },
    ],
    logros: [
      {
        icon: "mdi-trophy",
        title: "Cine: Dominio Vigente",
        subtitle: "Producción Premiada",
      },
      { icon: "mdi-school", title: "UCSC / UBB", subtitle: "Docencia Social" },
    ],
    misProductos: [],
  }),
  mounted() {
    this.cargarDatos();
  },
  computed: {
    totalCarrito() {
      return this.carrito.reduce((acc, item) => acc + item.price, 0);
    },
  },
  methods: {
    // CARGA DE DATOS: Prioridad al Storage, pero con salvaguarda de 4 productos
    cargarDatos() {
      const p = localStorage.getItem("productos");
      const c = localStorage.getItem("carrito");

      const guardados = p ? JSON.parse(p) : [];

      // Si el storage está vacío o tiene menos de 4 productos (por cambio de puerto o error)
      // forzamos la carga de los originales
      if (guardados.length < 4) {
        this.resetCatalogo();
      } else {
        this.misProductos = guardados;
      }

      if (c) this.carrito = JSON.parse(c);
    },
    save() {
      localStorage.setItem("productos", JSON.stringify(this.misProductos));
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    },
    // RESTABLECER: Aquí están tus 4 productos recuperados
    resetCatalogo() {
      this.misProductos = [
        {
          id: 4,
          name: "Perro Robot",
          price: 37979,
          subtitle: "Smart Dog",
          image:
            "https://images.unsplash.com/photo-1559715541-d4fc97b8d6dd?q=80&w=774",
          features: ["LED"],
        },
        {
          id: 1,
          name: "Smartphone Pro",
          price: 899990,
          subtitle: "108MP",
          image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800",
          features: ["5G"],
        },
        {
          id: 2,
          name: "Laptop Ultra-delgada",
          price: 1249990,
          subtitle: "i7 1TB SSD",
          image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800",
          features: ["Touch ID"],
        },
        {
          id: 3,
          name: "Auriculares Noise-Cancelling",
          price: 249990,
          subtitle: "30h batería",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
          features: ["Bluetooth 5.2"],
        },
      ];
      this.save();
    },
    borrarStorage() {
      localStorage.clear();
      location.reload();
    },
    crearProducto() {
      this.misProductos.push({
        ...this.nuevoP,
        id: Date.now(),
        features: ["Nuevo"],
      });
      this.save();
      this.adminDialog = false;
      this.nuevoP = {
        name: "",
        price: 0,
        subtitle: "",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
      };
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    },
    eliminar(id) {
      this.misProductos = this.misProductos.filter((p) => p.id !== id);
      this.save();
    },
    agregarAlCarrito(producto) {
      this.carrito.push({ ...producto, cartId: Date.now() });
      this.save();
      this.cartDrawer = true;
    },
    quitarDelCarrito(index) {
      this.carrito.splice(index, 1);
      this.save();
    },
    finalizarCompra() {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#1976D2", "#4CAF50", "#FFC107"],
      });
      this.carrito = [];
      this.save();
      setTimeout(() => {
        this.cartDrawer = false;
      }, 500);
    },
    formatPrice(value) {
      return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(value);
    },
  },
};
</script>
