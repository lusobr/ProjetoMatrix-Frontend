//DOM
var sistema = new SistemaCadastro(),
    edicao = false,
    idDoParticipante = 0;

function cadastrar() {
    var form = document.querySelector('#formulario'),
        sexo = document.querySelector('input[name=sexo_radio]:checked').value;

    if (edicao) {
        sistema.editarParticipante(
            idDoParticipante,
            form.nome.value,
            form.sobrenome.value,
            form.idade.value,
            sexo,
            form.nota.value
        )
            .then(function () {
                window.alert("Edição concluida!");
                window.location.reload(true);
            });
    } else {

        sistema.adicionarParticipante(
            form.nome.value,
            form.sobrenome.value,
            form.email.value,
            form.idade.value,
            sexo,
            form.nota.value
        )
            .then(function () {
                window.alert("Participante adicionado!");
                window.location.reload(true);
            })
            .catch(function (result) {
                window.alert(result);
                window.location.reload(true);
            });
    }
    event.preventDefault();
    event.stopPropagation();
    edicao = false;
    window.scrollTo(0, 0);
};

function montarTabela() {
    sistema.buscarParticipantes()
        .then(function (participantes) {
            participantes.forEach(function (participante) {
                var aprovado = "",
                    sexo = "";

                if (participante.sexo == 1)
                    sexo = 'Masculino';
                else
                    sexo = 'Feminino';

                if (participante.aprovado)
                    aprovado = "Aprovado";
                else
                    aprovado = "Reprovado";

                document.getElementById('corpo').innerHTML += '<tr><td>' + participante.nome + ' ' + participante.sobrenome + '</td><td>' + participante.idade + '</td><td>' + sexo + '</td><td>' + aprovado + '</td><td>' + '<a href="javascript:void(0)" onclick="editarCadastrado(\'' + participante.id + '\')">Editar</a>' + ' ' + '<a href="javascript:void(0)" onclick="excluirCadastrado(\'' + participante.id + '\')">Excluir</a>' + '</td></tr>';
            })
        });
}

function editarCadastrado(id) {
    edicao = true;
    idDoParticipante = id;
    var form = document.querySelector('#formulario');

    sistema.obterParticipante(id)
        .then(function (participante) {
            form.nome.value = participante.nome;
            form.sobrenome.value = participante.sobrenome;
            form.email.value = participante.email;
            form.email.setAttribute('disabled', true);
            form.idade.value = participante.idade;
            form.nota.value = participante.nota;
            var sexo = Array.from(document.querySelectorAll('input[name=sexo_radio]:checked')).find((element) => {
                return element.value == participante.sexo;
            });
        });
    window.scrollTo(0, 0);
}

function excluirCadastrado(id) {
    sistema.removerParticipante(id)
        .then(function () {
            window.alert("Participante removido!")
            window.location.reload(true);
            window.scrollTo(0, 0);
        });
}

(function () {
    montarTabela();
})();