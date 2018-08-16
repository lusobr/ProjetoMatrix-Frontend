//DOM
var sistema = new SistemaCadastro(),
    aprovado = "",
    sexo = "",
    edicao = false;

function cadastrar() {
    var nome = document.getElementById('nome').value,
        sobrenome = document.getElementById('sobrenome').value,
        email = document.getElementById('email').value,
        idade = document.getElementById('idade').value,
        nota = document.getElementById('nota').value,
        sexo = document.getElementById('sexo').value;

    if (edicao) {
        sistema.editarParticipante(nome, sobrenome, email, idade, sexo, nota);
        window.location.reload(true);
    } else {
        try {
            sistema.adicionarParticipante(nome, sobrenome, email, idade, sexo);
            sistema.adicionarNotaAoParticipante(email, nota);
            window.location.reload(true);
        } catch (Error) {
            window.alert(Error.message);
        }
    }
    edicao = false;
    email = false;
};

function montarTabela() {
    sistema.buscarParticipantes().forEach(function (objeto) {
        if (objeto.sexo === 1)
            sexo = 'Masculino';
        else
            sexo = 'Feminino';

        if (objeto.aprovado)
            aprovado = "Aprovado";
        else
            aprovado = "Reprovado";

        document.getElementById('corpo').innerHTML += '<tr><td>' + objeto.nome + ' ' + objeto.sobrenome + '</td><td>' + objeto.idade + '</td><td>' + sexo + '</td><td>' + aprovado + '</td><td>'
        + '<a href="javascript:void(0)" onclick="editarCadastrado(\'' + objeto.email + '\')">Editar</a>' + ' ' + '<a href="javascript:void(0)" onclick="excluirCadastrado(\'' + objeto.email + '\')">Excluir</a>' + '</td></tr>';
    });
}

function editarCadastrado(email) {
    edicao = true;
    var participante = sistema.obterParticipante(email);

    document.getElementById('nome').value = participante.nome;
    document.getElementById('sobrenome').value = participante.sobrenome;
    document.getElementById('email').value = participante.email;
    document.getElementById('idade').value = participante.idade;
    document.getElementById('nota').value = participante.nota;
    document.getElementById('sexo').value = participante.sexo;
}

function excluirCadastrado(email) {
    sistema.removerParticipante(email);
    window.location.reload(true);
}

(function () {
    montarTabela();
})();
