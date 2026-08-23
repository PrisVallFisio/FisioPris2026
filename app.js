/* =========================================================
   CLÍNICA FISIOLIFE
   script.js
   Menú + Scroll + Animaciones + Formulario Supabase
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL = "https://osaziintfxijhvaafntx.supabase.co";

const SUPABASE_KEY = "sb_publishable_DnVAK4ZFS8gBILgyuFFcuw_sJt_YQ0T";


/* =========================================================
   INICIALIZAR SUPABASE
========================================================= */

let supabaseClient = null;

if (window.supabase) {

    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

    console.log("✅ Supabase conectado correctamente");

} else {

    console.error(
        "❌ No se encontró la librería de Supabase."
    );

}


/* =========================================================
   MENÚ HAMBURGUESA
========================================================= */

const menuToggle =
    document.getElementById("menu-toggle");

const navLinks =
    document.querySelector(".nav-links");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon =
            menuToggle.querySelector("i");

        if (icon) {

            if (navLinks.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });


    /* =====================================================
       CERRAR MENÚ AL SELECCIONAR UNA OPCIÓN
    ===================================================== */

    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });

}


/* =========================================================
   HEADER AL HACER SCROLL
========================================================= */

const header =
    document.getElementById("header");


if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/* =========================================================
   SCROLL SUAVE
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const destino =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (destino) {

                e.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


/* =========================================================
   FORMULARIO DE CITAS
========================================================= */

const form =
    document.getElementById("appointmentForm");

const submitButton =
    document.getElementById("submitAppointment");


if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();


        /* =================================================
           VERIFICAR SUPABASE
        ================================================= */

        if (!supabaseClient) {

            alert(
                "❌ No se pudo conectar con Supabase."
            );

            console.error(
                "Supabase no está disponible."
            );

            return;

        }


        /* =================================================
           OBTENER CAMPOS
        ================================================= */

        const nombreInput =
            document.getElementById("nombre");

        const telefonoInput =
            document.getElementById("telefono");

        const emailInput =
            document.getElementById("email");

        const servicioInput =
            document.getElementById("servicio");

        const fechaInput =
            document.getElementById("fecha");

        const horaInput =
            document.getElementById("hora");

        const mensajeInput =
            document.getElementById("mensaje");


        /* =================================================
           VERIFICAR QUE EXISTAN LOS CAMPOS
        ================================================= */

        if (
            !nombreInput ||
            !telefonoInput ||
            !emailInput ||
            !servicioInput ||
            !fechaInput ||
            !horaInput
        ) {

            console.error(
                "❌ No se encontraron todos los campos del formulario."
            );

            alert(
                "❌ Hay un problema con el formulario.\n\n" +
                "Verifica los IDs de los campos HTML."
            );

            return;

        }


        /* =================================================
           OBTENER VALORES
        ================================================= */

        const nombre =
            nombreInput.value.trim();

        const telefono =
            telefonoInput.value.trim();

        const email =
            emailInput.value.trim();

        const servicio =
            servicioInput.value;

        const fecha =
            fechaInput.value;

        const hora =
            horaInput.value;

        const mensaje =
            mensajeInput
                ? mensajeInput.value.trim()
                : "";


        /* =================================================
           VALIDACIÓN
        ================================================= */

        if (
            !nombre ||
            !telefono ||
            !email ||
            !servicio ||
            !fecha ||
            !hora
        ) {

            alert(
                "⚠️ Por favor completa todos los campos obligatorios."
            );

            return;

        }


        /* =================================================
           VALIDAR EMAIL
        ================================================= */

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(email)) {

            alert(
                "⚠️ Ingresa un correo electrónico válido."
            );

            return;

        }


        /* =================================================
           CAMBIAR BOTÓN
        ================================================= */

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Enviando...
            `;

        }


        try {


            /* =================================================
               DATOS PARA SUPABASE
            ================================================= */

            const cita = {

                nombre: nombre,

                telefono: telefono,

                email: email,

                servicio: servicio,

                fecha_cita: fecha,

                hora_cita: hora,

                mensaje: mensaje,

                estado: "Pendiente"

            };


            console.log(
                "📤 Enviando cita:",
                cita
            );


            /* =================================================
               INSERTAR EN TABLA CITAS
            ================================================= */

            const { error } = await supabaseClient
             .from("citas")
             .insert([cita]);


            /* =================================================
               COMPROBAR ERROR
            ================================================= */

            if (error) {

                console.error(
                    "❌ Error Supabase:",
                    error
                );

                console.error(
                    "Código:",
                    error.code
                );

                console.error(
                    "Mensaje:",
                    error.message
                );

                console.error(
                    "Detalles:",
                    error.details
                );

                console.error(
                    "Hint:",
                    error.hint
                );


                alert(
                    "❌ No se pudo registrar la cita.\n\n" +
                    "Error: " +
                    error.message
                );

                return;

            }


            /* =================================================
               ÉXITO
            ================================================= */

            console.log(
                "✅ Cita registrada:",
                );


            alert(
                "✅ ¡Cita registrada correctamente!\n\n" +

                "👤 Nombre: " +
                nombre +

                "\n📋 Servicio: " +
                servicio +

                "\n📅 Fecha: " +
                fecha +

                "\n🕐 Hora: " +
                hora +

                "\n\n" +

                "Nos pondremos en contacto contigo para confirmar tu cita."
            );


            /* =================================================
               LIMPIAR FORMULARIO
            ================================================= */

            form.reset();


        } catch (error) {

            console.error(
                "❌ Error inesperado:",
                error
            );


            alert(
                "❌ Ocurrió un error inesperado.\n\n" +
                error.message
            );


        } finally {


            /* =================================================
               RESTAURAR BOTÓN
            ================================================= */

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.innerHTML = `
                    <i class="fa-solid fa-calendar-check"></i>
                    Agendar Cita
                `;

            }

        }

    });

}


/* =========================================================
   FECHA MÍNIMA
   No permite seleccionar fechas anteriores a hoy
========================================================= */

const fechaInput =
    document.getElementById("fecha");


if (fechaInput) {

    const hoy =
        new Date();

    const año =
        hoy.getFullYear();

    const mes =
        String(
            hoy.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            hoy.getDate()
        ).padStart(2, "0");

    fechaInput.min =
        `${año}-${mes}-${dia}`;

}


/* =========================================================
   ANIMACIONES AL HACER SCROLL
========================================================= */

const elementosAnimados =
    document.querySelectorAll(
        ".service-card, " +
        ".testimonial-card, " +
        ".about-image, " +
        ".about-content, " +
        ".growth-text, " +
        ".contact-form, " +
        ".contact-info"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0px)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    elementosAnimados.forEach(el => {

        el.style.opacity =
            "0";

        el.style.transform =
            "translateY(60px)";

        el.style.transition =
            "all 0.8s ease";

        observer.observe(el);

    });

}


/* =========================================================
   MENÚ ACTIVO SEGÚN LA SECCIÓN
========================================================= */

const sections =
    document.querySelectorAll("section");

const navItems =
    document.querySelectorAll(".nav-links a");


if (sections.length && navItems.length) {

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top =
                section.offsetTop - 150;

            const height =
                section.offsetHeight;

            if (
                window.scrollY >= top &&
                window.scrollY < top + height
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navItems.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

            }

        });

    });

}


/* =========================================================
   EFECTO BOTÓN HERO
========================================================= */

const heroButton =
    document.querySelector(".btn-primary");


if (heroButton) {

    heroButton.addEventListener(
        "mouseenter",
        () => {

            heroButton.style.transform =
                "scale(1.05)";

        }
    );


    heroButton.addEventListener(
        "mouseleave",
        () => {

            heroButton.style.transform =
                "scale(1)";

        }
    );

}


/* =========================================================
   AÑO AUTOMÁTICO DEL FOOTER
========================================================= */

const footer =
    document.querySelector(".footer-bottom p");


if (footer) {

    footer.innerHTML =
        `© ${new Date().getFullYear()} Clínica FisioLife | Todos los derechos reservados.`;

}


/* =========================================================
   MENSAJE DE INICIO
========================================================= */

console.log(
    "🚀 Clínica FisioLife - JavaScript cargado correctamente"
);
