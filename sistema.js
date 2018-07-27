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


 // Representa o sistema
 
function SistemaCadastro() {

    var participantes = [];

    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {
        
        if(obterParticipante(email) === undefined){
            var p = new Participante();
            p.nome = nome;
            p.sobrenome = sobrenome;
            p.email = email;
            p.idade = idade;
            p.sexo = sexo;

            participantes.push(p);
        }else{
            throw 'Participante já existente!';
        }
    }
    
    function removerParticipante(email) {
        
        for(var i = 0;i < participantes.length; i++){
            if(participantes[i].email === email){
                participantes.splice(i,1);
            break;
            }
        }      
    }
    
    function buscarParticipantesPorNome(nome){
        
        var acumuladorDeParticipantes = [];
        
        for(var i=0;i < participantes.length;i++){
            if(participantes[i].nome === nome){
                acumuladorDeParticipantes.push(participantes[i]);
            }   

        }return acumuladorDeParticipantes;
    }    
    
    function buscarParticipantesPorSexo(sexo){
        
        var acumuladorDeParticipantes = [];
        
        for(var i=0;i < participantes.length;i++){
            if(participantes[i].sexo === sexo){
                acumuladorDeParticipantes.push(participantes[i]);
            }   

        }return acumuladorDeParticipantes;
    }
   
    function buscarParticipantesAprovados(){
       
        var acumuladorDeParticipantes = [];
        
        for(var i = 0;i < participantes.length;i++){
            if(participantes[i].aprovado == true){
                acumuladorDeParticipantes.push(participantes[i]);
            }
        }return acumuladorDeParticipantes;
    }
   
    function buscarParticipantesReprovados(){
        
        var acumuladorDeParticipantes = [];
        
        for(var i = 0;i<participantes.length;i++){
            if(participantes[i].aprovado === false){
                acumuladorDeParticipantes.push(participantes[i]);
            }
        }return acumuladorDeParticipantes;
    }
    
    function obterParticipante(email){
       
        for(var i=0;i<participantes.length;i++){
            if(participantes[i].email === email){
                return participantes[i];
            break;
            }
        }
    }
   
    function adicionarNotaAoParticipante(email,nota){
        
        for(var i=0;i < participantes.length;i++){
            if(participantes[i].email === email) {
                participantes[i].nota = nota;
                if(participantes[i].nota >= 70){
                   participantes[i].aprovado = true;
                break;
                }else{ 
                    participantes[i].aprovado = false;
                 break;
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
        
        for(var i=0;i<participantes.length;i++){
            if(participantes[i].email === email){
                if(participantes[i].aprovado === true){     
                    return "Aprovado";
                }else{
                    return "Reprovado";
                 }
            }
        }
    }
    
    function obterQuantidadeDeParticipantesPorSexo(sexo){
        
        acumuladorDeParticipantes = [];
        
        for(var i = 0;i<participantes.length;i++){
            if(participantes[i].sexo === sexo)
                acumuladorDeParticipantes.push(participantes[i]);
        }return acumuladorDeParticipantes.length;
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