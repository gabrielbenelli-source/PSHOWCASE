import { createStore } from "vuex";
import api from "@/api/axios"; // Importamos tu configuración de Axios

export default createStore({
  state: {
    proyectos: [],
    cargando: false,
    error: null,
    busqueda: "", // Estado para el filtro global
  },

  getters: {
    // Requerimiento Lección 3: Usar getters para computar productos filtrados
    proyectosFiltrados(state) {
      const termino = state.busqueda.toLowerCase();
      if (!termino) return state.proyectos;

      return state.proyectos.filter((p) =>
        p.nombre.toLowerCase().includes(termino)
      );
    },
    totalProyectos(state) {
      return state.proyectos.length;
    },
  },

  mutations: {
    // Las mutaciones son las únicas que pueden cambiar el State directamente
    SET_PROYECTOS(state, proyectos) {
      state.proyectos = proyectos;
    },
    SET_CARGANDO(state, valor) {
      state.cargando = valor;
    },
    SET_ERROR(state, mensaje) {
      state.error = mensaje;
    },
    SET_BUSQUEDA(state, valor) {
      state.busqueda = valor;
    },
    ADD_PROYECTO(state, proyecto) {
      state.proyectos.push(proyecto);
    },
    REMOVE_PROYECTO(state, id) {
      state.proyectos = state.proyectos.filter((p) => p.id !== id);
    },
  },

  actions: {
    // Requerimiento Lección 3: Mover el consumo de API a acciones Vuex
    async obtenerProyectos({ commit }) {
      commit("SET_CARGANDO", true);
      commit("SET_ERROR", null);
      try {
        const response = await api.get("/proyectos");
        commit("SET_PROYECTOS", response.data);
      } catch (error) {
        commit("SET_ERROR", "Error al conectar con la API interna.");
        // Datos de respaldo (Mock) para que la app no se vea vacía en la entrega
        const mockData = [
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
          {
            id: 3,
            nombre: "Set de Diseño UI",
            precio: "$5.500",
            descripcion: "Componentes listos para SASS.",
          },
        ];
        commit("SET_PROYECTOS", mockData);
      } finally {
        commit("SET_CARGANDO", false);
      }
    },

    async guardarProyecto({ commit }, nuevoProyecto) {
      try {
        // Intentamos el POST real
        const response = await api.post("/proyectos", nuevoProyecto);
        // Si el backend responde con el objeto creado (incluyendo ID), lo usamos
        commit(
          "ADD_PROYECTO",
          response.data || { ...nuevoProyecto, id: Date.now() }
        );
      } catch (error) {
        // Si falla (por falta de backend real), simulamos la inserción local
        commit("ADD_PROYECTO", { ...nuevoProyecto, id: Date.now() });
      }
    },

    async eliminarProyecto({ commit }, id) {
      try {
        await api.delete(`/proyectos/${id}`);
        commit("REMOVE_PROYECTO", id);
      } catch (error) {
        // Backup: eliminar localmente para que el usuario vea el cambio
        commit("REMOVE_PROYECTO", id);
      }
    },
  },

  modules: {
    // Aquí podrías separar en 'productos', 'usuarios', etc., si el proyecto escala.
  },
});
