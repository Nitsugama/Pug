// lista dos termos
const termos = ['JHIN', 'YONE', 'OLAF', 'ZERI', 'UDYR', 'FIZZ', 'LULU', 'AZIR', 'NUNU', 'ASHE', 'ORNN', 'AHRI', 'NAMI', 'PYKE', 'SHEN', 'JINX', 'GNAR', 'KLED', 'SONA', 'GYRO', 'JOJO', 'ZYRA', 'SETT', 'EKKO', 'SION', 'RYZE', 'RELL'];

// sorteio do termo
const segredo = termos[Math.floor(Math.random() * termos.length)];

// quantidade de tentativas para acertar o termo
const tentativas = segredo.length + 1;

// variável para controle do fluxo do game
let gameOver = false;

// seleção do container do jogo
const elemGame = document.querySelector("#game");

// criação do tabuleiro
const elemTabuleiro = document.createElement("div");
elemTabuleiro.id = "tabuleiro";
elemGame.appendChild(elemTabuleiro);

// cada linha do tabuleiro representa uma palavra e cada célula representa uma letra
for (let i = 0; i < tentativas; i++) {
    const elemPalavra = document.createElement('div');
    elemPalavra.className = 'palavra';
    for (let j = 0; j < segredo.length; j++) {
        const elemLetra = document.createElement('span');
        elemLetra.className = 'letra';
        elemPalavra.appendChild(elemLetra);
    };
    elemTabuleiro.appendChild(elemPalavra);
}

// posicionamento inicial do cursor da palavra
let elemPalavra = document.querySelector('.palavra');
elemPalavra.id = 'cursor-palavra';

// posicionamento inicial do cursor da letra
let elemLetra = elemPalavra.firstChild;
elemLetra.id = 'cursor-letra';

// manipulação dos eventos do teclado
document.addEventListener("keydown", (event) => {
    if (gameOver) return;

    let jotaro = null;

    if (event.key == "ArrowLeft") {
        jotaro = elemLetra.previousSibling;     

    } else if (event.key == "ArrowRight") {
        jotaro = elemLetra.nextSibling;

    } else if (event.key == "Backspace") {
        elemLetra.textContent = null;
        jotaro = elemLetra.previousSibling

    } else if (event.key == "Delete") {
        elemLetra.textContent = null;

    } else if(event.key.match(/^[a-zA-Z]$/)){
        elemLetra.textContent = event.key.toUpperCase();
        jotaro = elemLetra.nextSibling;
    }

    //atualizar o cursor
    if (jotaro != null){
        elemLetra.id = "";
        jotaro.id = "cursor-letra";
        elemLetra = jotaro;
    }

    // parametros

    if (event.key =="Enter"){
        const tentativa = elemPalavra. textContent;

        if(tentativa.length != segredo.length){
            alert('tentativa invalida');
            return
        }

        // quais letras estao na posicao certa e errada
        for (let i = 0; i<segredo.length; i++){
            const jotaro = elemPalavra.children[i];
            
            if (tentativa[i] == segredo[i]){
                jotaro.classList.add("letra-correta");
 
            //se nao existir, vai ser -', se existir pode ser 0, 1, 2 ou 3. IndexOf vai nos dizer em qual posição a letra está
            } else if (segredo.indexOf(tentativa[i]) != -1){
                jotaro.classList.add("letra-existe");
            }
        } //fim do for
        if (segredo == tentativa){
            alert("Voce venceu!");
            gameOver=true;
            elemLetra.id = ""; //remove o cursor
        } else { //fim do if
            if (elemPalavra.nextSibling != null) {
                elemPalavra.id ="";
                elemLetra.id = "";

                elemPalavra = elemPalavra.nextSibling;
                elemLetra = elemPalavra.firstChild;

                elemPalavra.id = "cursor-palavra";
                elemLetra.id = "cursor-letra";
            } else {
                gameOver = true;
                alert("Você Perdeu!");
                elemLetra.id = "";
            } //fim do else
        }
    } // fim do enter
});