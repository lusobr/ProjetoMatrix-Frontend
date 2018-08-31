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

    function adicionarParticipante(nome, sobrenome, email, idade, sexo, nota) {

        var p = new Participante();
        p.nome = nome;
        p.sobrenome = sobrenome;
        p.email = email;
        p.idade = idade;
        p.sexo = sexo;
        p.nota = nota;
        p.aprovado = p.nota >= 70;

        return armazenamento.adicionar(p);
    }

    function editarParticipante(id, nome, sobrenome, idade, sexo, nota) {
        return obterParticipante(id)
            .then(function (objeto) {
                objeto.nome = nome;
                objeto.sobrenome = sobrenome;
                objeto.idade = idade;
                objeto.sexo = sexo;
                objeto.nota = nota;
                objeto.aprovado = objeto.nota >= 70
                return armazenamento.editar(objeto);
            });
    }
    function removerParticipante(id) {
        return armazenamento.remover(id);
    }

    function buscarParticipantes() {
        return armazenamento.deserializar();
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

    function obterParticipante(id) {
        return armazenamento.obterItem(id);
    }

    function obterMediaDasNotasDosParticipantes() {
        return buscarParticipantes.reduce(function (somas, objetoParticipante) {
            return somas + objetoParticipante.nota;
        }, 0) / obterTotalDeParticipantes;
    }

    function obterTotalDeParticipantes() {
        return armazenamento.deserializar().length;
    }

    function verificarSeParticipanteEstaAprovado(id) {
        return obterParticipante(id).aprovado;
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
        obterMediaDasNotasDosParticipantes,
        obterTotalDeParticipantes,
        verificarSeParticipanteEstaAprovado,
        obterQuantidadeDeParticipantesPorSexo,
        buscarParticipantes,
        editarParticipante
    };
}
