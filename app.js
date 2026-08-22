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


/*=========================================================
    FORMULARIO
==========================================================*/

const form=document.getElementById("appointmentForm");

form.addEventListener("submit",function(e){

    e.preventDefault();

    const inputs=form.querySelectorAll("input");

    let valido=true;

    inputs.forEach(input=>{

        if(input.value.trim()==""){

            valido=false;

        }

    });

    if(!valido){

        alert("Por favor complete todos los campos obligatorios.");

        return;

    }

    alert("✅ Su solicitud fue enviada correctamente. Nos comunicaremos con usted muy pronto.");

    form.reset();

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
