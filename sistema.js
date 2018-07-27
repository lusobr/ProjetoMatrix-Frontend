//Objeto Participante
function Participante() {
    this.nome = "";
    this.sobrenome = "";
    this.email = "";
    this.idade = 0;
    this.sexo = 0
    this.nota = 0
    this.aprovado = false
}

/***********************
 * Representa o sistema
 * Uma vez instanciado, deve-se usar essa mesma
 * instancia em todas as operações.
 */
function SistemaCadastro() {

    var participantes = [];

    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {
        for(var i = 0;i < participantes.length;i++){
            if(participantes[i].email === email){
                throw 'Participante já existente!';
            }
        }
        var p = new Participante();
        p.nome = nome;
        p.sobrenome = sobrenome;
        p.email = email;
        p.idade = idade;
        p.sexo = sexo;

        participantes.push(p);
    }

    function removerParticipante(email) {
        for(var i = 0;i < participantes.length; i++){
            if(participantes[i].email === email)
                participantes.splice(i,1);
        }      
    }
    function buscarParticipantesPorNome(nome){
        var acumulador = [];
        for(var i=0;i < participantes.length;i++){
            if(participantes[i].nome === nome){
                acumulador.push(participantes[i]);
            }   

        }return acumulador;
    }    
    function buscarParticipantesPorSexo(sexo){
        var acumulador = [];
        for(var i=0;i < participantes.length;i++){
            if(participantes[i].sexo === sexo){
                acumulador.push(participantes[i]);
            }   

        }return acumulador;
    }
    function buscarParticipantesAprovados(){
        var acumulador = [];
        for(var i = 0;i < participantes.length;i++){
            if(participantes[i].aprovado == true){
                acumulador.push(participantes[i]);
            }
        }return acumulador;
    }
    function buscarParticipantesReprovados(){
        var acumulador = [];
        for(var i = 0;i<participantes.length;i++){
            if(participantes[i].aprovado === false){
                acumulador.push(participantes[i]);
            }
        }return acumulador;
    }
    function obterParticipante(email){
        for(var i=0;i<participantes.length;i++){
            if(participantes[i].email === email)
                return participantes[i];
        }
    }
    function adicionarNotaAoParticipante(email,nota){
        
        for(var i=0;i < participantes.length;i++){
            if(participantes[i].email === email) {
                participantes[i].nota = nota;
            if(participantes[i].nota >= 70){
                   participantes[i].aprovado = true;
            }else{ 
               participantes[i].aprovado = false;
             }
            }
        }
    }   
    function obterMediaDasNotasDosParticipantes(){
        var media = 0;
        for(var i=0;i<participantes.length;i++){
            media = media + participantes[i].nota;
        }return (media/participantes.length);
    }
    function obterTotalDeParticipantes(){
        return participantes.length;
    }
    function verificarSeParticipanteEstaAprovado(email){
        var avaliador = false;
        for(var i=0;i<participantes.length;i++){
            if(participantes[i].email === email){
                if(participantes[i].aprovado === true)  return "Aprovado";
                 else return "Reprovado";
            }
        }
    }
    function obterQuantidadeDeParticipantesPorSexo(sexo){
        acumulador = [];
        for(var i = 0;i<participantes.length;i++){
            if(participantes[i].sexo === sexo)
                acumulador.push(participantes[i]);
        }return acumulador.length;
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