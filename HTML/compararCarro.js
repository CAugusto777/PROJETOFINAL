// Dados dos carros com especificações detalhadas
const carrosData = {
    1: {
        nome: "Mercedes AMG GT Black Series",
        ano: 2021,
        valor: "R$ 2.500.000",
        velocidadeFinal: "325 km/h",
        aceleracao: "3.2 segundos",
        cor: "Preto Obsidiana",
        imagem: "/IMG/2021-Mercedes-AMG-GT-Black-Series-009-2160-scaled.jpg"
    },
    2: {
        nome: "Lamborghini Huracán STO",
        ano: 2021,
        valor: "R$ 3.200.000",
        velocidadeFinal: "310 km/h",
        aceleracao: "3.0 segundos",
        cor: "Verde Mantis",
        imagem: "/IMG/2021-lamborghini-huraca-n-sto-112-1628181687.jpg"
    },
    3: {
        nome: "Porsche 911 Carrera T",
        ano: 2023,
        valor: "R$ 950.000",
        velocidadeFinal: "291 km/h",
        aceleracao: "4.3 segundos",
        cor: "Branco Carrara",
        imagem: "/IMG/Porsche 911 Carrera T parked in a courtyard.jpg"
    },
    4: {
        nome: "Ferrari SF90 Stradale",
        ano: 2022,
        valor: "R$ 4.800.000",
        velocidadeFinal: "340 km/h",
        aceleracao: "2.5 segundos",
        cor: "Laranja Papaya",
        imagem: "/IMG/1034306-2048x1152.jpg"
    },
    5: {
        nome: "Audi R8 V10 Plus",
        ano: 2020,
        valor: "R$ 1.800.000",
        velocidadeFinal: "330 km/h",
        aceleracao: "3.1 segundos",
        cor: "Cinza Nardo",
        imagem: "/IMG/globalcarro.jpg"
    },
    6: {
        nome: "Lamborghini Aventador SVJ",
        ano: 2019,
        valor: "R$ 5.500.000",
        velocidadeFinal: "350 km/h",
        aceleracao: "2.8 segundos",
        cor: "Verde Scandal",
        imagem: "/IMG/lambo.png"
    },
    7: {
        nome: "Porsche 911 Turbo S",
        ano: 2023,
        valor: "R$ 1.650.000",
        velocidadeFinal: "330 km/h",
        aceleracao: "2.7 segundos",
        cor: "Azul Gentian",
        imagem: "/IMG/porsheLogo.png"
    },
    8: {
        nome: "Mercedes-Benz SLS AMG",
        ano: 2020,
        valor: "R$ 2.200.000",
        velocidadeFinal: "317 km/h",
        aceleracao: "3.7 segundos",
        cor: "Prata Iridium",
        imagem: "/IMG/2021-Mercedes-AMG-GT-Black-Series-009-2160-scaled.jpg"
    }
};

// Array para armazenar os carros selecionados
let carrosSelecionados = [];

// Selecionar elementos do DOM
const checkboxes = document.querySelectorAll('.carro-checkbox');
const compararBtn = document.getElementById('compararBtn');
const modal = document.getElementById('modalComparacao');
const closeBtn = document.querySelector('.close-btn');
const carroCards = document.querySelectorAll('.carro-card');

// Adicionar event listeners aos checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const carroId = parseInt(this.getAttribute('data-carro'));
        const carroCard = this.closest('.carro-card');
        
        if (this.checked) {
            // Verificar se já existem 2 carros selecionados
            if (carrosSelecionados.length >= 2) {
                this.checked = false;
                alert('Você só pode selecionar 2 carros para comparar!');
                return;
            }
            
            carrosSelecionados.push(carroId);
            carroCard.classList.add('selected');
        } else {
            // Remover o carro da lista de selecionados
            const index = carrosSelecionados.indexOf(carroId);
            if (index > -1) {
                carrosSelecionados.splice(index, 1);
            }
            carroCard.classList.remove('selected');
        }
        
        // Atualizar o estado do botão comparar
        atualizarBotaoComparar();
    });
});

// Adicionar event listener aos cards para facilitar a seleção
carroCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Não fazer nada se o clique foi no checkbox
        if (e.target.type === 'checkbox') {
            return;
        }
        
        const checkbox = this.querySelector('.carro-checkbox');
        checkbox.click();
    });
});

// Função para atualizar o estado do botão comparar
function atualizarBotaoComparar() {
    const infoText = document.querySelector('.info-text');
    
    if (carrosSelecionados.length === 2) {
        compararBtn.disabled = false;
        infoText.textContent = '2 carros selecionados - Clique para comparar';
        infoText.style.color = '#667eea';
    } else if (carrosSelecionados.length === 1) {
        compararBtn.disabled = true;
        infoText.textContent = 'Selecione mais 1 carro para comparar';
        infoText.style.color = '#666';
    } else {
        compararBtn.disabled = true;
        infoText.textContent = 'Selecione exatamente 2 carros para comparar';
        infoText.style.color = '#666';
    }
}

// Event listener para o botão comparar
compararBtn.addEventListener('click', function() {
    if (carrosSelecionados.length === 2) {
        mostrarComparacao();
    }
});

// Função para mostrar a comparação no modal
function mostrarComparacao() {
    const carro1 = carrosData[carrosSelecionados[0]];
    const carro2 = carrosData[carrosSelecionados[1]];
    
    // Preencher os dados do primeiro carro
    const carroA = document.getElementById('carroA');
    carroA.innerHTML = `
        <img src="${carro1.imagem}" alt="${carro1.nome}">
        <h3>${carro1.nome}</h3>
        <div class="spec-item">
            <span class="spec-label">Ano:</span>
            <span class="spec-value">${carro1.ano}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Valor:</span>
            <span class="spec-value">${carro1.valor}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Velocidade Final:</span>
            <span class="spec-value">${carro1.velocidadeFinal}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">0 a 100 km/h:</span>
            <span class="spec-value">${carro1.aceleracao}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Cor:</span>
            <span class="spec-value">${carro1.cor}</span>
        </div>
    `;
    
    // Preencher os dados do segundo carro
    const carroB = document.getElementById('carroB');
    carroB.innerHTML = `
        <img src="${carro2.imagem}" alt="${carro2.nome}">
        <h3>${carro2.nome}</h3>
        <div class="spec-item">
            <span class="spec-label">Ano:</span>
            <span class="spec-value">${carro2.ano}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Valor:</span>
            <span class="spec-value">${carro2.valor}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Velocidade Final:</span>
            <span class="spec-value">${carro2.velocidadeFinal}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">0 a 100 km/h:</span>
            <span class="spec-value">${carro2.aceleracao}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Cor:</span>
            <span class="spec-value">${carro2.cor}</span>
        </div>
    `;
    
    // Mostrar o modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll do body
}

// Event listener para fechar o modal
closeBtn.addEventListener('click', function() {
    fecharModal();
});

// Fechar o modal ao clicar fora dele
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        fecharModal();
    }
});

// Função para fechar o modal
function fecharModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll do body
}

// Fechar modal com a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        fecharModal();
    }
});
