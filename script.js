// ==========================================
// BANCO DE DADOS DO BESTIÁRIO
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
    if (!painel) return;
    
    painel.style.display = 'block';
    painel.innerHTML = `
        <h3 style="color: #990000">📄 Relatório Oculto: ${nome}</h3><br>
        <p><strong>Elemento Base:</strong> ${bicho.elemento}</p>
        <p><strong>Valor de Desafio (VD):</strong> ${bicho.vd}</p>
        <p><strong>Pontos de Vida (PV):</strong> ${bicho.vida}</p>
        <p><strong>Defesa de Alvo:</strong> ${bicho.defesa}</p>
        <p><strong>Comportamento Hostil:</strong> ${bicho.perigo}</p>
    `;
    window.location.hash = '#painelCriatura';
}

// ==========================================
// SIMULADOR DE DADOS ORDEM PARANORMAL
// ==========================================
function rolarDadosParanormais() {
    const inputQtd = document.getElementById('qtdDados');
    const resultadoBox = document.getElementById('resultadoDado');
    if (!inputQtd || !resultadoBox) return;

    let qtdDados = parseInt(inputQtd.value);

    // Proteções estruturais para limites do RPG
    if (qtdDados < 1) qtdDados = 1;
    if (qtdDados > 5) qtdDados = 5;

    let resultados = [];
    for (let i = 0; i < qtdDados; i++) {
        resultados.push(Math.floor(Math.random() * 20) + 1);
    }

    const maiorValor = Math.max(...resultados);
    
    let msg = `Dados Rolados: [ ${resultados.join(', ')} ]<br>`;
    if (maiorValor === 20) {
        msg += `Resultado Final: <span class="destaque-dado">💥 CRÍTICO! (20)</span>`;
    } else if (maiorValor === 1) {
        msg += `Resultado Final: <span class="destaque-dado" style="color: #444;">FALHA CRÍTICA (1)</span>`;
    } else {
        msg += `Resultado Final: <span class="destaque-dado">${maiorValor}</span>`;
    }

    resultadoBox.innerHTML = msg;
}
