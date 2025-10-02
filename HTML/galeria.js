// Variável para controlar o slide atual
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

// Função para mostrar um slide específico
function showSlide(index) {
    // Remover classe active de todos os slides e dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Adicionar classe active ao slide e dot atual
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Função para ir para o próximo slide
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

// Função para ir para o slide anterior
function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
}

// Função para ir para um slide específico
function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

// Auto-play do carrossel (opcional - a cada 5 segundos)
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pausar auto-play quando o mouse estiver sobre o carrossel
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
}

// Suporte para navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Função para lidar com a seleção de arquivos
function handleFileSelect(event) {
    const files = event.target.files;
    const fileInfo = document.getElementById('fileInfo');
    
    if (files.length === 0) {
        fileInfo.textContent = '';
        fileInfo.classList.remove('success');
        return;
    }
    
    // Criar mensagem com informações dos arquivos
    let message = '';
    if (files.length === 1) {
        message = `1 foto selecionada: ${files[0].name}`;
    } else {
        message = `${files.length} fotos selecionadas`;
    }
    
    fileInfo.textContent = message;
    fileInfo.classList.add('success');
    
    // Aqui você pode adicionar lógica para fazer upload das fotos
    // Por exemplo, usando FormData e fetch para enviar para um servidor
    console.log('Arquivos selecionados:', files);
    
    // Exemplo de como você poderia processar os arquivos:
    /*
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('photos', files[i]);
    }
    
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Upload bem-sucedido:', data);
        fileInfo.textContent = 'Fotos enviadas com sucesso!';
    })
    .catch(error => {
        console.error('Erro no upload:', error);
        fileInfo.textContent = 'Erro ao enviar fotos. Tente novamente.';
        fileInfo.classList.remove('success');
    });
    */
}

// Suporte para drag and drop (opcional)
const uploadContainer = document.querySelector('.upload-container');
if (uploadContainer) {
    uploadContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadContainer.style.opacity = '0.8';
    });

    uploadContainer.addEventListener('dragleave', () => {
        uploadContainer.style.opacity = '1';
    });

    uploadContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadContainer.style.opacity = '1';
        
        const files = e.dataTransfer.files;
        const fileInput = document.getElementById('fileInput');
        fileInput.files = files;
        
        // Disparar o evento change manualmente
        const event = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(event);
    });
}
