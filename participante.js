//DOM
var sistema = new SistemaCadastro(),
    aprovado = "",
    sexo = "";

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

function montarTabela() {
    sistema.buscarParticipantes().forEach(function (objeto, index) {
        if (objeto.sexo === 1)
            sexo = 'Masculino';
        else
            sexo = 'Feminino';

        if (objeto.aprovado)
            aprovado = "Aprovado";
        else
            aprovado = "Reprovado";

        document.getElementById('corpo').innerHTML += '<tr><td>' + objeto.nome + ' ' + objeto.sobrenome + '</td><td>' + objeto.idade + '</td><td>' + sexo + '</td><td>' + aprovado + '</td></tr>';
    });
}

(function() {
    montarTabela();
})();