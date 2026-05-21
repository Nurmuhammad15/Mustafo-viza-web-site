document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ВЫПАДАЮЩИЕ МЕНЮ (DROPDOWNS) — hover-based
    // ==========================================

    const dropdowns = [
        {
            toggleId: 'services-toggle',
            dropdownId: 'services-dropdown'
        },
        {
            toggleId: 'countries-toggle',
            dropdownId: 'countries-dropdown'
        },
        {
            toggleId: 'visa-types-toggle',
            dropdownId: 'visa-types-dropdown'
        }
    ];

    // Функция закрытия всех дропдаунов
    function closeAllDropdowns() {
        dropdowns.forEach(({ toggleId, dropdownId }) => {
            const toggle = document.getElementById(toggleId);
            const dropdown = document.getElementById(dropdownId);
            if (toggle && dropdown) {
                toggle.classList.remove('dropdown-active');
                dropdown.classList.remove('active');
            }
        });
    }

    // Вешаем hover на каждый nav__item.dropdown
    dropdowns.forEach(({ toggleId, dropdownId }) => {
        const toggle = document.getElementById(toggleId);
        const dropdown = document.getElementById(dropdownId);
        if (!toggle || !dropdown) return;

        const parentLi = toggle.closest('li');
        if (!parentLi) return;

        // Открываем при наведении мышки на li
        parentLi.addEventListener('mouseenter', () => {
            closeAllDropdowns();
            toggle.classList.add('dropdown-active');
            dropdown.classList.add('active');
        });

        // Закрываем когда мышка уходит с li (включая dropdown внутри)
        parentLi.addEventListener('mouseleave', () => {
            toggle.classList.remove('dropdown-active');
            dropdown.classList.remove('active');
        });

        // Клик по toggle тоже работает (для мобильных/тач)
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isActive = dropdown.classList.contains('active');
            closeAllDropdowns();
            if (!isActive) {
                toggle.classList.add('dropdown-active');
                dropdown.classList.add('active');
            }
        });
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', () => {
        closeAllDropdowns();
    });


    // ==========================================
    // 2. МОБИЛЬНОЕ БУРГЕР-МЕНЮ
    // ==========================================
    const burgerBtn = document.getElementById('burger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            burgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const isDropdownToggle = ['services-toggle', 'countries-toggle'].includes(link.id);
                if (!isDropdownToggle) {
                    burgerBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
                burgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }


    // ==========================================
    // 3. СЛАЙДЕР ОТЗЫВОВ (REVIEWS SLIDER)
    // ==========================================
    const slides = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.reviews-slider__dots .dot');
    let currentSlide = 0;

    if (slides.length > 0 && dots.length > 0) {
        function showSlide(index) {
            if (index >= slides.length) currentSlide = 0;
            if (index < 0) currentSlide = slides.length - 1;

            slides.forEach(slide => slide.style.display = 'none');
            dots.forEach(dot => dot.classList.remove('active'));

            slides[currentSlide].style.display = 'block';
            dots[currentSlide].classList.add('active');
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        showSlide(currentSlide);

        setInterval(() => {
            currentSlide++;
            showSlide(currentSlide);
        }, 5000);
    }


    // ==========================================
    // 4. ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРНЫХ ССЫЛОК
    // ==========================================
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const isDropdownToggle = ['services-toggle', 'countries-toggle'].includes(this.id);
            if (isDropdownToggle) return;

            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});


    // ==========================================
    // 5. MORPH CARD TRANSITION
    // ==========================================
    const morphCards = document.querySelectorAll('.morph-card');
    const morphOverlay = document.getElementById('morph-overlay');
    const morphImg = document.getElementById('morph-overlay-img');

    morphCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const img = this.dataset.img;
            const rect = this.getBoundingClientRect();

            // Сбрасываем без transition
            morphImg.style.transition = 'none';
            morphImg.style.backgroundImage = `url('${img}')`;
            morphImg.style.top = rect.top + 'px';
            morphImg.style.left = rect.left + 'px';
            morphImg.style.width = rect.width + 'px';
            morphImg.style.height = rect.height + 'px';
            morphImg.style.borderRadius = '18px';
            morphImg.style.opacity = '1';
            morphImg.style.filter = 'brightness(1)';

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // Включаем плавный transition
                    morphImg.style.transition = [
                        'top 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
                        'left 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
                        'width 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
                        'height 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
                        'border-radius 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
                        'filter 0.75s ease'
                    ].join(', ');

                    morphImg.style.top = '0';
                    morphImg.style.left = '0';
                    morphImg.style.width = '100vw';
                    morphImg.style.height = '100vh';
                    morphImg.style.borderRadius = '0';
                    morphImg.style.filter = 'brightness(1.08)';

                    sessionStorage.setItem('morphImg', img);

                    setTimeout(() => {
                        window.location.href = href;
                    }, 780);
                });
            });
        });
    });
