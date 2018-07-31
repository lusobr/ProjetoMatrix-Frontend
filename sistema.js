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
        participantes.splice(participantes.findIndex(function (objetoParticipante){
            return (objetoParticipante.email === email);
        }),1);
    }      
    
    function buscarParticipantesPorNome(nome){
        return participantes.filter(function(objetoParticipante){ 
            return objetoParticipante.nome === nome;  
        });

    }    
    
    function buscarParticipantesPorSexo(sexo){
        return participantes.filter(function(objetoParticipante){
            return objetoParticipante.sexo === sexo;
        });
    
    }
   
    function buscarParticipantesAprovados(){
        return participantes.filter(function(objetoParticipante){   
            if(objetoParticipante.aprovado === true){
                return objetoParticipante;
            }  
        });
    }
   
    function buscarParticipantesReprovados(){  
        return participantes.filter(function(objetoParticipante){           
            if(objetoParticipante.aprovado === false){
                return objetoParticipante;
            }  
        });
    }
    
    function obterParticipante(email){      
        return participantes.find(function(objetoParticipante){          
            return objetoParticipante.email === email;
        });
        
    }
   
    function adicionarNotaAoParticipante(email,nota){          
        var i = 0;
        participantes.forEach(function(objetoParticipante){   
            if(objetoParticipante.email === email) {
                participantes[i].nota = nota;
                if(objetoParticipante.nota >= 70){
                    participantes[i].aprovado = true;
                }else{ 
                    participantes[i].aprovado = false;
                 }
            }
            i++;
        });
    }  
   
    function obterMediaDasNotasDosParticipantes(){ 
        var soma = 0;
        participantes.forEach(function(objetoParticipante){    
            return soma += objetoParticipante.nota;
        });      
        return soma/participantes.length;
    }
   
    function obterTotalDeParticipantes(){       
        return participantes.length;
    }
   
    function verificarSeParticipanteEstaAprovado(email){       
            return participantes.find(function(objetoParticipante){               
                if (objetoParticipante.aprovado === false)
                    return 'reprovado';
                else 
                    return 'aprovado';                   
            });
    }
    
    function obterQuantidadeDeParticipantesPorSexo(sexo){        
        return participantes.filter(function(objetoParticipante){           
            if(objetoParticipante.sexo === sexo)
                return objetoParticipante;
        }).length;
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