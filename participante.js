//DOM
var sistema = new SistemaCadastro(),
    edicao = false;


function cadastrar() {
    var form = document.querySelector('#formulario'),
        sexo = document.querySelector('input[name=sexo_radio]:checked').value;


    if (edicao) {
        sistema.editarParticipante(form.nome.value, form.sobrenome.value, form.email.value, form.idade.value, sexo, form.nota.value);
        window.location.reload(true);
    } else {
        try {
            sistema.adicionarParticipante(form.nome.value, form.sobrenome.value, form.email.value, form.idade.value, sexo);
            sistema.adicionarNotaAoParticipante(form.email.value, form.nota.value);
            window.location.reload(true);
        } catch (Error) {
            window.alert(Error.message);
        }
    }
    edicao = false;
};

function montarTabela() {
    sistema.buscarParticipantes().forEach(function (objeto) {
        var aprovado = "",
            sexo = "";

        if (objeto.sexo == 1)
            sexo = 'Masculino';
        else
            sexo = 'Feminino';

        if (objeto.aprovado)
            aprovado = "Aprovado";
        else
            aprovado = "Reprovado";

        document.getElementById('corpo').innerHTML += '<tr><td>' + objeto.nome + ' ' + objeto.sobrenome + '</td><td>' + objeto.idade + '</td><td>' + sexo + '</td><td>' + aprovado + '</td><td>' + '<a href="javascript:void(0)" onclick="editarCadastrado(\'' + objeto.email + '\')">Editar</a>' + ' ' + '<a href="javascript:void(0)" onclick="excluirCadastrado(\'' + objeto.email + '\')">Excluir</a>' + '</td></tr>';
    });
}

function editarCadastrado(email) {
    edicao = true;
    var participante = sistema.obterParticipante(email),
        form = document.querySelector('#formulario');

    form.nome.value = participante.nome;
    form.sobrenome.value = participante.sobrenome;
    form.email.value = participante.email;
    form.idade.value = participante.idade;
    form.nota.value = participante.nota;
    var sexo = Array.from(document.querySelectorAll('input[name=sexo_radio]:cheked')).find((element) => {
        return element.value == participante.sexo;
    });
    sexo.checked = true;
}

function excluirCadastrado(email) {
    sistema.removerParticipante(email);
    window.location.reload(true);
}

(function () {
    montarTabela();
})();