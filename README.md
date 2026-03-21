🚀 Vue Product Showcase - SPA Catálogo

Este proyecto es una Single Page Application (SPA) de alto rendimiento desarrollada con Vue 3 para el ecosistema de E-commerce. La aplicación funciona como un catálogo interactivo que centraliza la lógica de negocio mediante una arquitectura robusta, consumo de APIs REST y validación de flujos mediante pruebas automatizadas.

🛠️ Stack Tecnológico y Arquitectura

    Core: Vue.js 3 (Composition & Options API)

    UI Framework: Vuetify 3 (Material Design System)

    Estado Global: Vuex 4 (Arquitectura modular para productos y favoritos)

    HTTP Client: Axios para integración con API externa

    Testing: Cypress (E2E Testing) para garantizar la calidad del software

    Code Quality: ESLint + Prettier (Configuración de consistencia de código)

📋 Cumplimiento de Requerimientos Técnicos
1. Arquitectura de Componentes y Ciclo de Vida

    Estructura modular: App, Header, Footer y ProductList.

    Componente atómico reutilizable: <ProductCard>.

    Gestión de hooks de ciclo de vida (mounted) para la hidratación inicial de datos.

2. Integración de Datos y Manejo de Errores

    Implementación de Axios para peticiones asíncronas.

    Control de estados de UI mediante directivas de Vue:

        v-if para estados de Loading.

        Gestión de errores de red.

        Manejo de vistas vacías (Empty States).

3. Gestión de Estado con Vuex

    Arquitectura centralizada de datos.

    Actions: Despacho de peticiones asíncronas.

    Getters: Lógica de filtrado dinámico de productos por categoría y búsqueda.

4. Quality Assurance (QA)

    Cypress (E2E): Pruebas de integración para validar el renderizado de productos y la interactividad del usuario.

    Configuración de entornos globales para compatibilidad de herramientas de testing.

5. Diseño Responsivo y UI Profesional

    Uso exhaustivo de Vuetify 3 y su sistema de Grid (v-row, v-col).

    Optimización de carga con v-img (lazy load).

    Iconografía avanzada mediante Material Design Icons (MDI).

⚙️ Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

    Clonar el repositorio:
    Bash

    git clone https://github.com/tu-usuario/pshowcase.git
    cd pshowcase

    Instalar dependencias:
    Bash

    npm install --legacy-peer-deps

    Ejecutar servidor de desarrollo:
    Bash

    npm run serve

    Calidad de código y Pruebas:
    Bash

    # Corregir formato automáticamente
    npm run lint -- --fix

    # Abrir el panel de Cypress para pruebas E2E
    npx cypress open

💡 Decisiones de Ingeniería

    Vuetify 3: Elegido por su robustez en componentes predefinidos, lo que acelera el tiempo de desarrollo manteniendo una estética profesional y responsive.

    Escalabilidad: La organización modular en src/components/ permite que el proyecto crezca sin comprometer la mantenibilidad.

    Reactividad: El uso de Vuex asegura una "única fuente de verdad", haciendo que los filtros sean instantáneos en toda la aplicación.

✒️ Autor
Gabriel Benelli Paredes
Desarrollador de Aplicaciones Front-End con Framework Vue