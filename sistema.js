//Objeto Participante
function Participante() {
    this.nome = "";
    this.sobrenome = "";
    this.email = "";
    this.idade = 0;
    this.sexo = 0;
    this.nota = 0;
    this.aprovado = false;
}


// Representa o sistema

function SistemaCadastro() {
    const armazenamento = new Armazenamento("participantes");

    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {
        if (obterParticipante(email) === undefined) {
            var p = new Participante();
            p.nome = nome;
            p.sobrenome = sobrenome;
            p.email = email;
            p.idade = idade;
            p.sexo = sexo;

            armazenamento.adicionar(p);
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
        armazenamento.editar("email", participante);
    }
    function removerParticipante(email) {
        armazenamento.remover('email', email);
    }

    function buscarParticipantes() {
        return armazenamento.deserializar();
    }

    function buscarParticipantesPorNome(nome) {
        return armazenamento.obterItem('nome',nome);
    }

    function buscarParticipantesPorSexo(sexo) {
        return armazenamento.obterItem('sexo',sexo);
    }

    function buscarParticipantesAprovados() {
        return armazenamento.obterItem('aprovado',true);
    }

    function buscarParticipantesReprovados() {
        return armazenamento.obterItem('aprovado',false);
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
        armazenamento.editar("email", item);
    }

    function obterMediaDasNotasDosParticipantes() {
        return armazenamento.deserializar.reduce(function (somas, objetoParticipante) {
            return somas + objetoParticipante.nota;
        }, 0) / obterTotalDeParticipantes;
    }

    function obterTotalDeParticipantes() {
        return armazenamento.deserializar().length;
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
