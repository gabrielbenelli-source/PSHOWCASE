<template>
  <div class="about-container">
    <section class="profile-header">
      <div class="profile-avatar"><span>GP</span></div>
      <h1>Gabriel Alejandro Benelli Paredes</h1>
      <p class="tagline">
        Magíster en Dirección Estratégica & Administración de Proyectos
      </p>
    </section>

    <div class="about-content">
      <div class="card">
        <h3>Liderazgo y Gestión Pública</h3>
        <p>
          <strong
            >Profesional del Desarrollo Económico y Seguridad Pública</strong
          >
        </p>
        <ul>
          <li>
            Gestión de carteras de inversión y proyectos de innovación pública.
          </li>
          <li>
            Estrategias de empleabilidad, inclusión y seguridad territorial.
          </li>
          <li>Diplomado en Seguridad Ciudadana y Planificación Social.</li>
        </ul>
      </div>

      <div class="card movie-highlight">
        <h3>Producción Ejecutiva de Cine</h3>
        <p><strong>Agua Loca Films</strong></p>
        <ul>
          <li>Financiación y negociación de acuerdos con inversores.</li>
          <li>Supervisión de rodaje, postproducción y distribución.</li>
          <li>Productor de la película <strong>"Dominio Vigente"</strong>.</li>
        </ul>
      </div>

      <div class="card">
        <h3>Academia y Consultoría</h3>
        <p><strong>Docente CFT Estado Biobío</strong></p>
        <ul>
          <li>Experto en Gestión de Conflictos y Técnicas de Negociación.</li>
          <li>Metodologías grupales y análisis cualitativo comunitario.</li>
          <li>Especialista en Programas Anticorrupción del Sector Público.</li>
        </ul>
      </div>
    </div>

    <section class="contact-section">
      <h3>¿Colaboramos en un nuevo proyecto?</h3>
      <form @submit.prevent="enviarMensaje" class="contact-form">
        <input type="text" placeholder="Tu nombre" required />
        <input type="email" placeholder="Tu correo" required />
        <textarea
          placeholder="Cuéntame tu idea (Cine, Gestión Social o Tecnología)"
          rows="4"
          required
        ></textarea>
        <button type="submit">Enviar Propuesta</button>
      </form>
    </section>
  </div>
</template>
