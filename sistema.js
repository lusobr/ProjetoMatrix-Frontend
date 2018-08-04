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
    var participantes = [];

    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {
        if (obterParticipante(email) === undefined) {
            var p = new Participante();
            p.nome = nome;
            p.sobrenome = sobrenome;
            p.email = email;
            p.idade = idade;
            p.sexo = sexo;

            participantes.push(p);
        } else {
            throw 'Participante já existente!';
        }
    }

    function removerParticipante(email) {
        participantes.splice(participantes.findIndex(function (objetoParticipante) {
            return (objetoParticipante.email === email);
        }), 1);
    }

    function buscarParticipantesPorNome(nome) {
        return participantes.filter(function (objetoParticipante) {
            return objetoParticipante.nome === nome;
        });

    }

    function buscarParticipantesPorSexo(sexo) {
        return participantes.filter(function (objetoParticipante) {
            return objetoParticipante.sexo === sexo;
        });

    }

    function buscarParticipantesAprovados() {
        return participantes.filter(function (objetoParticipante) {
            if (objetoParticipante.aprovado) {
                return objetoParticipante;
            }
        });
    }

    function buscarParticipantesReprovados() {
        return participantes.filter(function (objetoParticipante) {
            if (objetoParticipante.aprovado === false) {
                return objetoParticipante;
            }
        });
    }

    function obterParticipante(email) {
        return participantes.find(function (objetoParticipante) {
            return objetoParticipante.email === email;
        });

    }

    function adicionarNotaAoParticipante(email, nota) {
        index = participantes.findIndex(function (objetoParticipante) {
            return objetoParticipante.email === email;
        });
        participantes[index].nota = nota;
        if (participantes[index].nota >= 70)
            participantes[index].aprovado = true;
        else
            participantes[index].aprovado = false;
    }

    function obterMediaDasNotasDosParticipantes() {
        return participantes.reduce(function (somas, objetoParticipante) {
            return somas + objetoParticipante.nota;
        }, 0) / participantes.length;
    }

    function obterTotalDeParticipantes() {
        return participantes.length;
    }

    function verificarSeParticipanteEstaAprovado(email) {
        return obterParticipante(email).aprovado;
    }

    function obterQuantidadeDeParticipantesPorSexo(sexo) {
        return buscarParticipantesPorSexo(sexo).length;
    }

    function imprimirParticipantes() {
        return participantes;
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
        obterQuantidadeDeParticipantesPorSexo
    };
}