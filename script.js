// Ambil semua elemen yang dibutuhkan
const posts = document.querySelectorAll('.post-item');
const mainHeader = document.querySelector('header h1');
const tagHeader = document.getElementById('tag-header');
const tagTitle = document.getElementById('tag-title');
const resetBtn = document.getElementById('reset-filter');
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const themeToggle = document.getElementById('theme-toggle');

// --- Logika Filter Tag ala Saugi ---
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cat-link')) {
        const targetCategory = e.target.innerText.trim();
        
        posts.forEach(post => {
            const categories = post.getAttribute('data-category').split(' ');
            if (categories.includes(targetCategory)) {
                post.style.display = 'flex'; // Tampilkan yang cocok
            } else {
                post.style.display = 'none'; // Sembunyikan yang tidak cocok
            }
        });

        if(mainHeader) mainHeader.style.display = 'none';
        if(tagHeader) tagHeader.style.display = 'block';
        if(tagTitle) tagTitle.innerText = `Tag: ${targetCategory}`;
        window.scrollTo(0, 0);
    }
});

if(resetBtn) {
    resetBtn.addEventListener('click', () => {
        posts.forEach(post => post.style.display = 'flex');
        tagHeader.style.display = 'none';
        mainHeader.style.display = 'block';
    });
}

// --- Logika Navigasi & Tema (Tetap Sama) ---
if(hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('active');
        hamburger.innerHTML = menu.classList.contains('active') ? '✕' : '☰';
    });
}

document.addEventListener('click', (e) => {
    if (menu && !menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove('active');
        hamburger.innerHTML = '☰';
    }
});

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.innerHTML = isDark ? '🌙' : '☀️';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if(themeToggle) themeToggle.innerHTML = '☀️';
}
