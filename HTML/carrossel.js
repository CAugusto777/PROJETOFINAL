document.addEventListener('DOMContentLoaded', () => {
    // 1. SELEÇÃO DOS ELEMENTOS (com classes corrigidas)
    const carouselContainer = document.querySelector('.carrosel');
    const carouselImages = document.querySelector('.carousel-images');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const images = document.querySelectorAll('.carousel-images img');

    if (!carouselContainer || images.length <= 1) {
        if(prevButton) prevButton.style.display = 'none';
        if(nextButton) nextButton.style.display = 'none';
        return;
    }

    // 2. CONFIGURAÇÕES
    let currentIndex = 0;
    const totalImages = images.length;
    const slideInterval = 2000; // Alterado para 2 segundos
    let autoSlideTimer;

    // 3. FUNÇÃO PRINCIPAL PARA ATUALIZAR A POSIÇÃO
    function updateCarousel() {
        // Usa a largura do container do carrossel como base
        const imageWidth = carouselContainer.clientWidth;
        carouselImages.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
    }

    // 4. FUNÇÕES DE NAVEGAÇÃO
    function showRandomSlide() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * totalImages);
        } while (newIndex === currentIndex);
        currentIndex = newIndex;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    }

    // 5. FUNÇÕES DE CONTROLE DO SLIDE AUTOMÁTICO
    function startAutoSlide() {
        autoSlideTimer = setInterval(showRandomSlide, slideInterval);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideTimer);
    }
    
    function resetTimer() {
        stopAutoSlide();
        startAutoSlide();
    }

    // 6. EVENTOS DE CLIQUE E INTERAÇÃO
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });
    
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    // 7. INICIALIZAÇÃO
    updateCarousel(); // Ajusta a imagem inicial
    startAutoSlide();
    window.addEventListener('resize', updateCarousel);
});
