/**
 * Função que simula a rolagem de Atributo do sistema Ordem Paranormal.
 * No sistema, você joga uma quantidade de dados d20 igual ao seu atributo.
 * O resultado final é o MAIOR valor obtido entre os dados rolados.
 */
function rolarDadosParanormais() {
    // Captura a quantidade de dados informada pelo usuário
    const inputQtd = document.getElementById('qtdDados');
    let qtdDados = parseInt(inputQtd.value);

    // Validação simples para evitar abusos no input
    if (qtdDados < 1) qtdDados = 1;
    if (qtdDados > 5) qtdDados = 5;

    let resultados = [];
    
    // Rola os dados d20
    for (let i = 0; i < qtdDados; i++) {
        let rolagem = Math.floor(Math.random() * 20) + 1;
        resultados.push(rolagem);
    }

    // No sistema, o resultado é o maior valor tirado
    const maiorValor = Math.max(...resultados);

    // Monta a resposta textual na tela
    const resultadoBox = document.getElementById('resultadoDado');
    
    let mensagemHTML = `Dados rolados: [ ${resultados.join(', ')} ]<br>`;
    
    if (maiorValor === 20) {
        mensagemHTML += `Resultado Final: <span class="destaque-dado">💥 CRÍTICO! (20)</span>`;
    } else if (maiorValor === 1) {
        mensagemHTML += `Resultado Final: <span class="destaque-dado" style="color: #555;">Desastre Puro (1)</span>`;
    } else {
        mensagemHTML += `Resultado Final: <span class="destaque-dado">${maiorValor}</span>`;
    }

    resultadoBox.innerHTML = mensagemHTML;
}
