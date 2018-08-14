//DOM
var sistema = new SistemaCadastro();

function cadastrar() {

    var nome = document.getElementById('nome').value,
        sobrenome = document.getElementById('sobrenome').value,
        email = document.getElementById('email').value,
        idade = document.getElementById('idade').value,
        nota = document.getElementById('nota').value,
        sexo = document.getElementById('sexo').value;

    sistema.adicionarParticipante(nome, sobrenome, email, idade, sexo);
    sistema.adicionarNotaAoParticipante(email, nota);
    window.location.reload(true);
};
