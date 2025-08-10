/*Light box certificaciones*/

document.addEventListener("DOMContentLoaded", function() {
    const lightbox = document.getElementById("lightbox");
    const imagenAmpliada = document.getElementById("imagen-ampliada");
    const cerrar = document.querySelector(".cerrar");

    document.querySelectorAll("#certificacion img").forEach(img => {
        img.addEventListener("click", function() {
            lightbox.style.display = "block";
            imagenAmpliada.src = this.src;
        });
    });

    cerrar.addEventListener("click", function() {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
});