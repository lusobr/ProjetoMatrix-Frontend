//Objeto Participante
function Participante() {
    this.nome = "";
    this.sobrenome = "";
    this.email = "";
    this.idade = 0;
    this.sexo = 0;
    this.nota = 0;
    this.aprovado = false;
    this.id = 0;
}


// Representa o sistema

function SistemaCadastro() {
    var armazenamento = new ArmazenamentoHTTP();

    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {
        if (obterParticipante(email) === undefined) {
            var p = new Participante();
            p.nome = nome;
            p.sobrenome = sobrenome;
            p.email = email;
            p.idade = idade;
            p.sexo = sexo;

            armazenamento.postHTTP(p);
        } else {
            throw new Error('participante já existente!');
        }
    }

    function editarParticipante(nome, sobrenome, email, idade, sexo, nota) {
        var participante = obterParticipante(email);
        participante.nome = nome;
        participante.sobrenome = sobrenome;
        participante.idade = idade;
        participante.sexo = sexo;
        alterarNota(participante, nota);
        armazenamento.putHTTP("email", participante);
    }
    function removerParticipante(email) {
        armazenamento.deleteHTTP('email', email);
    }

    function buscarParticipantes() {
        return armazenamento.getHTTP();
    }

    function buscarParticipantesPorNome(nome) {
        return armazenamento.obterItens('nome', nome);
    }

    function buscarParticipantesPorSexo(sexo) {
        return armazenamento.obterItens('sexo', sexo);
    }

    function buscarParticipantesAprovados() {
        return armazenamento.obterItens('aprovado', true);
    }

    function buscarParticipantesReprovados() {
        return armazenamento.obterItens('aprovado', false);
    }

    function obterParticipante(email) {
        return armazenamento.obterItem("email", email);

    }
    function alterarNota(item, nota) {
        item.nota = nota;
        item.aprovado = item.nota >= 70;
    }

    function adicionarNotaAoParticipante(email, nota) {
        var item = obterParticipante(email);
        alterarNota(item, nota);
        armazenamento.putHTTP("email", item);
    }

    function obterMediaDasNotasDosParticipantes() {
        return buscarParticipantes.reduce(function (somas, objetoParticipante) {
            return somas + objetoParticipante.nota;
        }, 0) / obterTotalDeParticipantes;
    }

    function obterTotalDeParticipantes() {
        return armazenamento.getHTTP().length;
    }

    function verificarSeParticipanteEstaAprovado(email) {
        return obterParticipante(email).aprovado;
    }

    function obterQuantidadeDeParticipantesPorSexo(sexo) {
        return buscarParticipantesPorSexo(sexo).length;
    }


    return {
        adicionarParticipante,
        removerParticipante,
        buscarParticipantesPorNome,
        buscarParticipantesPorSexo,
        buscarParticipantesAprovados,
        buscarParticipantesReprovados,
        obterParticipante,
        adicionarNotaAoParticipante,
        obterMediaDasNotasDosParticipantes,
        obterTotalDeParticipantes,
        verificarSeParticipanteEstaAprovado,
        obterQuantidadeDeParticipantesPorSexo,
        buscarParticipantes,
        editarParticipante
    };
}
