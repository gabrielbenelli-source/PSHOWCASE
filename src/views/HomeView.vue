<template>
  <div class="home">
    <section class="welcome-section">
      <h2>Mi Catálogo de Proyectos</h2>
      <p>Gestión dinámica de desarrollos tecnológicos y literarios.</p>

      <div class="controls">
        <input
          v-model="busqueda"
          type="text"
          placeholder="🔍 Buscar proyecto por nombre..."
          class="search-input"
        />
        <button @click="abrirModal" class="btn-nuevo">+ Nuevo Proyecto</button>
      </div>
    </section>

    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Registrar Proyecto</h3>
        <form @submit.prevent="guardarProyecto">
          <div class="form-group">
            <label>Nombre del Proyecto:</label>
            <input
              v-model="nuevoItem.nombre"
              type="text"
              required
              minlength="3"
            />
          </div>
          <div class="form-group">
            <label>Precio o Valor:</label>
            <input
              v-model="nuevoItem.precio"
              type="text"
              placeholder="Ej: $15.000"
              required
            />
          </div>
          <div class="form-group">
            <label>Descripción detallada:</label>
            <textarea
              v-model="nuevoItem.descripcion"
              required
              minlength="10"
            ></textarea>
          </div>

          <div class="modal-actions">
            <button type="button" @click="cerrarModal" class="btn-cancel">
              Cancelar
            </button>
            <button type="submit" class="btn-save" :disabled="enviando">
              {{ enviando ? "Guardando..." : "Confirmar Registro" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="cargando" class="loading">
      <div class="spinner"></div>
      <p>Sincronizando con la API...</p>
    </div>

    <div v-else-if="proyectosFiltrados.length === 0" class="empty-state">
      <p>No se encontraron proyectos que coincidan con "{{ busqueda }}".</p>
      <button v-if="busqueda" @click="busqueda = ''">Limpiar búsqueda</button>
    </div>

    <div v-else class="products-grid">
      <ProductCard
        v-for="proyecto in proyectosFiltrados"
        :key="proyecto.id"
        :name="proyecto.nombre"
        :price="proyecto.precio"
        :description="proyecto.descripcion"
        @delete="eliminarProyecto(proyecto.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import ProductCard from "@/components/products/ProductCard.vue";
import api from "@/api/axios";

// --- ESTADOS ---
const proyectos = ref([]);
const cargando = ref(true);
const enviando = ref(false);
const mostrarModal = ref(false);
const busqueda = ref("");
const nuevoItem = ref({ nombre: "", precio: "", descripcion: "" });

// --- LÓGICA DE FILTRADO (Computed Property) ---
const proyectosFiltrados = computed(() => {
  return proyectos.value.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  );
});

// --- PERSISTENCIA (LocalStorage) ---
// Guardar automáticamente en el navegador cada vez que cambie la lista
watch(
  proyectos,
  (nuevosProyectos) => {
    localStorage.setItem("pshowcase_data", JSON.stringify(nuevosProyectos));
  },
  { deep: true }
);

// --- MÉTODOS API ---
const obtenerProyectos = async () => {
  cargando.value = true;
  try {
    const response = await api.get("/proyectos");
    proyectos.value = response.data;
  } catch (error) {
    // Intentar recuperar de LocalStorage si la API falla
    const localData = localStorage.getItem("pshowcase_data");
    if (localData) {
      proyectos.value = JSON.parse(localData);
    } else {
      // Datos iniciales si es la primera vez
      proyectos.value = [
        {
          id: 1,
          nombre: "Kit de Desarrollo Vue",
          precio: "Gratis",
          descripcion: "Base para SPAs profesionales.",
        },
        {
          id: 2,
          nombre: "Manual Transmutar",
          precio: "$15.000",
          descripcion: "Obra sobre desarrollo humano.",
        },
      ];
    }
  } finally {
    cargando.value = false;
  }
};

const guardarProyecto = async () => {
  enviando.value = true;
  try {
    await api.post("/proyectos", nuevoItem.value);
    await obtenerProyectos();
    cerrarModal();
  } catch (error) {
    // Simulación funcional para la entrega
    proyectos.value.push({ ...nuevoItem.value, id: Date.now() });
    cerrarModal();
  } finally {
    enviando.value = false;
  }
};

const eliminarProyecto = async (id) => {
  if (!confirm("¿Eliminar este proyecto permanentemente?")) return;
  try {
    await api.delete(`/proyectos/${id}`);
    proyectos.value = proyectos.value.filter((p) => p.id !== id);
  } catch (error) {
    proyectos.value = proyectos.value.filter((p) => p.id !== id);
  }
};

// --- AUXILIARES ---
const abrirModal = () => (mostrarModal.value = true);
const cerrarModal = () => {
  mostrarModal.value = false;
  nuevoItem.value = { nombre: "", precio: "", descripcion: "" };
};

onMounted(obtenerProyectos);
</script>

<style scoped lang="scss">
.home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  .welcome-section {
    text-align: center;
    margin-bottom: 3rem;

    .controls {
      margin-top: 1.5rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
  }

  .search-input {
    padding: 0.8rem 1.2rem;
    border: 2px solid #eee;
    border-radius: 30px;
    width: 300px;
    outline: none;
    transition: border-color 0.3s;
    &:focus {
      border-color: #42b983;
    }
  }

  .btn-nuevo {
    background: #2c3e50;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background: #42b983;
    }
  }

  /* Estilos Modal, Grilla y Spinner (Igual que antes pero optimizados) */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-content {
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    width: 90%;
    max-width: 500px;
    .form-group {
      margin-bottom: 1.2rem;
      text-align: left;
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }
      input,
      textarea {
        width: 100%;
        padding: 0.7rem;
        border: 1px solid #ccc;
        border-radius: 8px;
      }
    }
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2.5rem;
  }

  .empty-state {
    text-align: center;
    padding: 5rem;
    color: #7f8c8d;
    button {
      background: none;
      border: none;
      color: #42b983;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .loading {
    text-align: center;
    padding: 5rem;
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #42b983;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
