class ThemeSlider {
    constructor() {
        this.slider = document.querySelector('#themeSlider');
        this.thumb = document.querySelector('#sliderThumb');
        this.darkIcon = document.querySelector('.dark-icon');
        this.lightIcon = document.querySelector('.light-icon');
        this.isDarkMode = true;
        
        this.init();
    }

    init() {
        this.slider.addEventListener('click', () => this.toggleTheme());
        this.updateSlider(true);
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        const container = document.querySelector('.theme-slider-container');
        const screenWidth = window.innerWidth;
        
        if (screenWidth < 960) {
            container.style.display = 'none';
        } else {
            container.style.display = 'flex';
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('light-mode');
        this.updateSlider(this.isDarkMode);
    }

    updateSlider(isDark) {
        const position = isDark ? '0px' : '40px';
        this.thumb.style.left = position;
        
        if (isDark) {
            this.darkIcon.classList.remove('hidden');
            this.lightIcon.classList.add('hidden');
        } else {
            this.darkIcon.classList.add('hidden');
            this.lightIcon.classList.remove('hidden');
        }
        
        const track = document.querySelector('.slider-track');
        if (isDark) {
            track.style.background = 'var(--color-background)';
        } else {
            track.style.background = 'var(--color-surface, #ffffff)';
        }
    }
}

class LanguageButton {
    constructor() {
        this.button = document.querySelector('#languageButton');
        this.languageText = document.querySelector('.language-text');
        this.isEnglish = true;
        
        this.init();
    }

    init() {
        this.button.addEventListener('click', () => this.toggleLanguage());
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        const container = document.querySelector('.language-button-container');
        const screenWidth = window.innerWidth;
        
        if (screenWidth < 960) {
            container.style.display = 'none';
        } else {
            container.style.display = 'flex';
        }
    }

    toggleLanguage() {
        this.isEnglish = !this.isEnglish;
        this.updateLanguage(this.isEnglish);
        this.updateButton();
    }

    updateButton() {
        if (this.isEnglish) {
            this.languageText.textContent = 'EN';
        } else {
            this.languageText.textContent = 'FR';
        }
    }

    updateLanguage(isEnglish) {
        const elements = document.querySelectorAll('[data-en][data-fr]');
        elements.forEach(element => {
            if (isEnglish) {
                element.textContent = element.getAttribute('data-en');
            } else {
                element.textContent = element.getAttribute('data-fr');
            }
        });
        
        document.documentElement.lang = isEnglish ? 'en' : 'fr';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeSlider();
    new LanguageButton();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const startPosition = window.pageYOffset;
                const targetPosition = target.offsetTop - 80;
                const distance = targetPosition - startPosition;
                const duration = 1500;
                let start = null;
                
                function easeInOutCubic(t) {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const easedProgress = easeInOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + distance * easedProgress);
                    
                    if (progress < 1) {
                        requestAnimationFrame(animation);
                    }
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
});
