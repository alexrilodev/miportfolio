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
        return;
    }
    
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = translations[key];

        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } 
            else if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translation);
            } 
            else {
                element.innerHTML = translation;
            }
        }
    });
};

// 3. Inicialización y Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Detectar idioma del navegador, fallback a 'es'
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
    const initialLang = localStorage.getItem('lang') || browserLang;
    setLanguage(initialLang);

    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newLang = button.getAttribute('data-lang');
            setLanguage(newLang);
        });
    });
});
