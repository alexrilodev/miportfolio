// lang.js

// 1. Definir la función para cargar los datos
const fetchTranslations = async (lang) => {
    try {
        const response = await fetch(`./lang_${lang}.json`);
        if (!response.ok) {
            throw new Error(`Error loading translation file for ${lang}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not load translations:", error);
        return null;
    }
};

// 2. Función para aplicar las traducciones
const setLanguage = async (lang) => {
    const translations = await fetchTranslations(lang);
    if (!translations) {
        return; // Detener si falla la carga
    }
    
    // Almacena el idioma actual
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);

    // Itera sobre todos los elementos con el atributo data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = translations[key];

        if (translation) {
            // Si es un input o botón con atributo "value", actualizar ese valor
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } 
            // Si tiene placeholder
            else if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translation);
            } 
            // Para el resto, usa innerHTML
            else {
                element.innerHTML = translation;
            }
        }
    });

    // Manejar atributos específicos, como los enlaces de CV
    // (Ejemplo para los atributos 'href' y 'data-translate' en el HTML)
    const cvEsLink = document.querySelector('[data-translate="download_cv_es"]');
    const cvEnLink = document.querySelector('[data-translate="download_cv_en"]');
    
    // Si necesitas cambiar el 'href' de los enlaces de CV basados en el idioma, 
    // lo harías aquí. Por ahora, solo actualizamos el texto que ya se hizo arriba.
    
};


// 3. Inicialización y Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Cargar el idioma guardado, o usar 'es' por defecto
    const initialLang = localStorage.getItem('lang') || 'es';
    setLanguage(initialLang);

    // Configurar los botones de idioma
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            // El texto del botón (ES o EN) se usa como identificador del idioma
            const newLang = button.getAttribute('data-lang');
            setLanguage(newLang);
        });
    });
});