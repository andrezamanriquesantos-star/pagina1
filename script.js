// ==========================================
// 1. BANCO DE DADOS DE CRIATURAS
// ==========================================
const infoCriaturas = {
    "Degolificada": {
        elemento: "Sangue",
        vd: 160,
        vida: "240 PV",
        defesa: "24",
        perigo: "Ataques brutais contínuos e regeneração forte baseada na dor de suas vítimas."
    },
    "Aniquilador": {
        elemento: "Energia",
        vd: 340,
        vida: "520 PV",
        defesa: "38",
        perigo: "Altera a gravidade e o espaço. Dispara raios caóticos e teletransporta-se aleatoriamente."
    },
    "Carente": {
        elemento: "Morte",
        vd: 220,
        vida: "380 PV",
        defesa: "30",
        perigo: "Drena o tempo de vida e a velocidade dos agentes. Cria poças de lodo temporal paralisante."
    }
};

function detalharCriatura(nome) {
    const bicho = infoCriaturas[nome];
    const painel = document.getElementById('painelCriatura');
    painel.style.display = 'block';
    painel.innerHTML = `
        <h3 style="color: var(--vermelho-sangue)">📄 Relatório de Campo: ${nome}</h3><br>
        <p><strong>Elemento Principal:</strong> ${bicho.elemento}</p>
        <p><strong>Valor de Desafio (VD):</strong> ${bicho.vd}</p>
        <p><strong>Pontos de Vida (PV):</strong> ${bicho.vida}</p>
        <p><strong>Defesa Estática:</strong> ${bicho.defesa}</p>
        <p><strong>Análise de Risco:</strong> ${bicho.perigo}</p>
    `;
    window.location.hash = '#painelCriatura';
}

// ==========================================
// 2. GERADOR AUTOMÁTICO DE MISSÕES
// ==========================================
const locais = ["Um sanatório abandonado em Petrópolis", "Uma fábrica têxtil desativada no interior", "O subsolo de um museu histórico renomado", "Uma mansão isolada por uma forte névoa"];
const misterios = ["Pessoas desaparecendo após escutarem um som de relógio antigo", "Corpos encontrados completamente desidratados e sem marcas de corte", "Luzes piscando em padrões geométricos impossíveis que geram convulsões", "Símbolos desconhecidos surgindo sozinhos nas paredes de uma escola"];
const reviravoltas = ["O contratante da missão é o próprio Ocultista responsável", "O tempo está passando 5x mais rápido dentro do perímetro da investigação", "A criatura não quer matar, está tentando conter uma ameaça ainda maior", "As pistas coletadas eram falsas, plantadas por um agente traidor da Ordem"];

function gerarMissao() {
    const local = locais[Math.floor(Math.random() * locais.length)];
    const misterio = misterios[Math.floor(Math.random() * misterios.length)];
    const reviravolta = reviravoltas[Math.floor(Math.random() * reviravoltas.length)];
    const nexRecomendado = (Math.floor(Math.random() * 8) + 1) * 10;

    const quadro = document.getElementById('quadroMissao');
    quadro.style.display = 'block';
    quadro.innerHTML = `
        <h3 style="color: var(--ouro-conhecimento)">⚠️ NOVA MISSÃO DISPONÍVEL</h3><br>
        <p><strong>📍 Localização:</strong> ${local}.</p>
        <p><strong>🔍 O Incidente:</strong> ${misterio}.</p>
        <p><strong>🌀 Complicação Oculta:</strong> ${reviravolta}.</p>
        <p><strong>📊 NEX Recomendado:</strong> ${nexRecomendado}%</p>
    `;
}

// ==========================================
// 3. GERENCIADOR DE FICHAS (LOCALSTORAGE)
// ==========================================
let agentes = JSON.parse(localStorage.getItem('agentesOrdem')) || [];

function salvarAgente() {
    const nome = document.getElementById('nomeAgente').value.trim();
    const classe = document.getElementById('classeAgente').value;
    const nex = document.getElementById('nexAgente').value;

    if (!nome) {
        alert("Digite o nome do agente antes de cadastrar!");
        return;
    }

    const novoAgente = { id: Date.now(), nome, classe, nex };
    agentes.push(novoAgente);
    localStorage.setItem('agentesOrdem', JSON.stringify(agentes));
    
    document.getElementById('nomeAgente').value = '';
    renderizarAgentes();
}

function deletarAgente(id) {
    agentes = agentes.filter(a => a.id !== id);
    localStorage.setItem('agentesOrdem', JSON.stringify(agentes));
    renderizarAgentes();
}

function renderizarAgentes() {
    const lista = document.getElementById('listaAgentes');
    lista.innerHTML = '';
    
    if(agentes.length === 0) {
        lista.innerHTML = '<p style="color:#666;">Nenhum agente ativo na base.</p>';
        return;
    }

    agentes.forEach(agente => {
        lista.innerHTML += `
            <div class="ficha-salva">
                <button class="btn-deletar" onclick="deletarAgente(${agente.id})">❌</button>
                <strong>${agente.nome}</strong><br>
                <small>${agente.classe} | NEX ${agente.nex}%</small>
            </div>
        `;
    });
}

// ==========================================
// 4. SIMULADOR DE DADOS ATRIBUTO
// ==========================================
function rolarDadosParanormais() {
    const inputQtd = document.getElementById('qtdDados');
    let qtdDados = parseInt(inputQtd.value);

    if (qtdDados < 1) qtdDados = 1;
    if (qtdDados > 5) qtdDados = 5;

    let resultados = [];
    for (let i = 0; i < qtdDados; i++) {
        resultados.push(Math.floor(Math.random() * 20) + 1);
    }

    const maiorValor = Math.max(...resultados);
    const resultadoBox = document.getElementById('resultadoDado');
    
    let msg = `Dados: [ ${resultados.join(', ')} ]<br>`;
    if (maiorValor === 20) msg += `Resultado: <span class="destaque-dado">💥 CRÍTICO (20)</span>`;
    else if (maiorValor === 1) msg += `Resultado: <span class="destaque-dado" style="color: #444;">FALHA CRÍTICA (1)</span>`;
    else msg += `Resultado: <span class="destaque-dado">${maiorValor}</span>`;

    resultadoBox.innerHTML = msg;
}

// Carregar agentes salvos ao abrir a página
window.onload = renderizarAgentes;
