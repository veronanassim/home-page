
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
        this.rtlStylesheet = null;
        this.init();
    }

    init() {
        // Initialize dropdown functionality
        const dropdownToggle = document.getElementById('langDropdown');
        const dropdownMenu = document.querySelector('.dropdown-menu');

        if (dropdownToggle && dropdownMenu) {
            // Toggle dropdown
            dropdownToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    dropdownMenu.classList.remove('show');
                }
            });

            // Handle language selection
            const languageOptions = dropdownMenu.querySelectorAll('.dropdown-item');
            languageOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    const lang = e.target.getAttribute('data-lang');
                    this.switchLanguage(lang);
                });
            });
        }
        this.rtlStylesheet = document.querySelector('link[href="assets/scss/rtl.css"]');
        if (this.rtlStylesheet) {
            // Initially disable the RTL stylesheet
            this.rtlStylesheet.disabled = true;
        }


        // Initialize with saved language
        this.switchLanguage(this.currentLang);
    }

    switchLanguage(lang) {
        // Update active state in dropdown
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-lang') === lang);
        });

        // Update current language display
        const currentLangElement = document.getElementById('currentLang');
        if (currentLangElement) {
            currentLangElement.textContent = lang.toUpperCase();
        }

        // Handle RTL stylesheet
        if (this.rtlStylesheet) {
            this.rtlStylesheet.disabled = lang !== 'ar';
        }

        // Update document direction
        document.body.classList.toggle('rtl', lang === 'ar');
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update translations
        this.updateTranslations(lang);

        // Save preference
        localStorage.setItem('preferredLanguage', lang);
        this.currentLang = lang;

        // Close dropdown
        document.querySelector('.dropdown-menu')?.classList.remove('show');
    }

    updateTranslations(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }
}

// Initialize the language switcher
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});