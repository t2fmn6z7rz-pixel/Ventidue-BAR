// ========================================
// VENTIDUE BAR - Main JavaScript
// ========================================

let currentLanguage = 'en';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderDrinks();
    setupLanguageSelector();
    setupMenuTabs();
});

// ========================================
// LANGUAGE SWITCHING
// ========================================

function setupLanguageSelector() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update all text elements with data attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Re-render drinks to update language
    renderDrinks();
    
    // Save language preference
    localStorage.setItem('ventidue-language', lang);
}

// ========================================
// MENU RENDERING
// ========================================

function renderDrinks() {
    renderDrinksCategory('classics');
    renderDrinksCategory('popular');
}

function renderDrinksCategory(category) {
    const grid = document.getElementById(`${category}-grid`);
    if (!grid) return;
    
    const drinks = drinksData[category];
    
    grid.innerHTML = drinks.map(drink => {
        const name = currentLanguage === 'it' ? drink.nameIt : drink.name;
        const description = currentLanguage === 'it' ? drink.descriptionIt : drink.description;
        const italianName = currentLanguage === 'it' ? '' : `<p class="drink-name-it">${drink.nameIt}</p>`;
        
        return `
            <div class="drink-card">
                <h3>${name}</h3>
                ${italianName}
                <p>${description}</p>
                <div class="drink-price">€6.00</div>
            </div>
        `;
    }).join('');
}

// ========================================
// MENU TABS
// ========================================

function setupMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const categories = document.querySelectorAll('.menu-category');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            
            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            categories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding category
            tab.classList.add('active');
            document.querySelector(`[data-category="${category}"]`).classList.add('active');
        });
    });
}

// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// RESTORE LANGUAGE PREFERENCE
// ========================================

const savedLanguage = localStorage.getItem('ventidue-language');
if (savedLanguage && savedLanguage !== 'en') {
    const langBtn = document.querySelector(`[data-lang="${savedLanguage}"]`);
    if (langBtn) {
        langBtn.click();
    }
}