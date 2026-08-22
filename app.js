/*=========================================================
            CLÍNICA FISIOLIFE
            script.js
==========================================================*/


/*=========================================================
        MENÚ HAMBURGUESA
==========================================================*/

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if(navLinks.classList.contains("active")){

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    }else{

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/*=========================================================
    CERRAR MENÚ AL HACER CLICK
==========================================================*/

document.querySelectorAll(".nav-links a").forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/*=========================================================
        HEADER SCROLL
==========================================================*/

const header = document.getElementById("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>60){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});


/*=========================================================
        SCROLL SUAVE
==========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const destino=document.querySelector(this.getAttribute("href"));

        if(destino){

            destino.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/* =====================================================
   FISIOLIFE
   JAVASCRIPT - FORMULARIO DE CITAS CON SUPABASE
===================================================== */


/* =====================================================
   CONFIGURACIÓN SUPABASE
===================================================== */

// ⚠️ REEMPLAZA ESTOS DOS VALORES POR LOS DE TU PROYECTO

const SUPABASE_URL = "https://TU-PROYECTO.supabase.co";

const SUPABASE_KEY = "TU_PUBLISHABLE_KEY";


/* =====================================================
   CARGAR LIBRERÍA SUPABASE
===================================================== */

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =====================================================
   FORMULARIO
===================================================== */

const form = document.getElementById("appointmentForm");

const submitButton = document.getElementById("submitAppointment");


/* =====================================================
   ENVIAR CITA
===================================================== */

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();


        /* ---------------------------------------------
           OBTENER DATOS
        --------------------------------------------- */

        const nombre = document
            .getElementById("nombre")
            .value
            .trim();

        const telefono = document
            .getElementById("telefono")
            .value
            .trim();

        const email = document
            .getElementById("email")
            .value
            .trim();

        const servicio = document
            .getElementById("servicio")
            .value;

        const fecha = document
            .getElementById("fecha")
            .value;

        const hora = document
            .getElementById("hora")
            .value;

        const mensaje = document
            .getElementById("mensaje")
            .value
            .trim();


        /* ---------------------------------------------
           VALIDACIÓN
        --------------------------------------------- */

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


        /* ---------------------------------------------
           CAMBIAR ESTADO DEL BOTÓN
        --------------------------------------------- */

        submitButton.disabled = true;

        submitButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Enviando...
        `;


        try {


            /* -----------------------------------------
               INSERTAR EN SUPABASE
            ----------------------------------------- */

            const { data, error } = await supabaseClient
                .from("citas")
                .insert([

                    {

                        nombre: nombre,

                        telefono: telefono,

                        email: email,

                        servicio: servicio,

                        fecha_cita: fecha,

                        hora_cita: hora,

                        mensaje: mensaje,

                        estado: "Pendiente"

                    }

                ])
                .select();


            /* -----------------------------------------
               COMPROBAR ERROR
            ----------------------------------------- */

            if (error) {

                console.error(
                    "Error Supabase:",
                    error
                );

                alert(
                    "❌ No se pudo registrar la cita.\n\n" +
                    "Por favor intenta nuevamente."
                );

                return;

            }


            /* -----------------------------------------
               ÉXITO
            ----------------------------------------- */

            alert(
                "✅ ¡Cita registrada correctamente!\n\n" +

                "Servicio: " +
                servicio +

                "\nFecha: " +
                fecha +

                "\nHora: " +
                hora +

                "\n\n" +

                "Nos pondremos en contacto contigo para confirmar tu cita."
            );


            /* -----------------------------------------
               LIMPIAR FORMULARIO
            ----------------------------------------- */

            form.reset();


        } catch (error) {


            console.error(
                "Error:",
                error
            );


            alert(
                "❌ Ocurrió un error inesperado."
            );


        } finally {


            /* -----------------------------------------
               RESTAURAR BOTÓN
            ----------------------------------------- */

            submitButton.disabled = false;

            submitButton.innerHTML = `
                <i class="fa-solid fa-calendar-check"></i>
                Agendar Cita
            `;

        }

    });

}


/* =====================================================
   FECHA MÍNIMA
   Evita seleccionar fechas anteriores a hoy
===================================================== */

const fechaInput = document.getElementById("fecha");

if (fechaInput) {

    const hoy = new Date();

    const año = hoy.getFullYear();

    const mes = String(
        hoy.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        hoy.getDate()
    ).padStart(2, "0");

    fechaInput.min =
        `${año}-${mes}-${dia}`;

}


/* =====================================================
   MENÚ HAMBURGUESA
===================================================== */

const menuToggle =
    document.getElementById("menu-toggle");

const navLinks =
    document.querySelector(".nav-links");


if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "active"
            );


            const icon =
                menuToggle.querySelector("i");


            if (
                navLinks.classList.contains("active")
            ) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            } else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }
    );


    /* ---------------------------------------------
       CERRAR MENÚ AL SELECCIONAR
    --------------------------------------------- */

    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );


                    const icon =
                        menuToggle.querySelector("i");


                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }
            );

        });

}


/* =====================================================
   HEADER AL HACER SCROLL
===================================================== */

const header =
    document.getElementById("header");


if (header) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 60) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }
    );

}


/* =====================================================
   SCROLL SUAVE
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (e) {

                const destino =
                    document.querySelector(
                        this.getAttribute("href")
                    );


                if (destino) {

                    e.preventDefault();

                    destino.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });

/*=========================================================
        ANIMACIÓN AL HACER SCROLL
==========================================================*/

const elementos=document.querySelectorAll(

".service-card,.testimonial-card,.about-image,.about-content,.growth-text,.contact-form,.contact-info"

);

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0px)";

}

});

},{

threshold:.15

});


elementos.forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(60px)";

el.style.transition="all .8s ease";

observer.observe(el);

});


/*=========================================================
        MENÚ ACTIVO
==========================================================*/

const sections=document.querySelectorAll("section");
const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

const height=section.clientHeight;

if(scrollY>=top){

current=section.getAttribute("id");

}

});

navItems.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});


/*=========================================================
        EFECTO BOTÓN HERO
==========================================================*/

const heroButton=document.querySelector(".btn-primary");

heroButton.addEventListener("mouseenter",()=>{

heroButton.style.transform="scale(1.05)";

});

heroButton.addEventListener("mouseleave",()=>{

heroButton.style.transform="scale(1)";

});


/*=========================================================
        AÑO AUTOMÁTICO FOOTER
==========================================================*/

const footer=document.querySelector(".footer-bottom p");

if(footer){

footer.innerHTML=`© ${new Date().getFullYear()} Clínica FisioLife | Todos los derechos reservados.`;

}
