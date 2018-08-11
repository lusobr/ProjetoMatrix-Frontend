function Armazenamento(chave){
    
    if(window.localStorage.getItem(chave) === null)
        window.localStorage.setItem(chave, "[]");

    function adicionar(participante){
        objParticipante = deserializar();
        objParticipante.push(participante);
        serializar(objParticipante);
    }
    
    function buscarParticipante(email){
        var objParticipante = deserializar();
        return objParticipante.reduce(filtrarParticipante, 0);

        function filtrarParticipante(dados, index){
            return dados[index].email === email;
        }
    }

    function serializar(chave,valor){
        var serializado = JSON.stringify(valor);
        window.localStorage.setItem(chave,serializado);
    }

    function deserializar(chave){
        var deserializado = JSON.parse(chave);
        window.localStorage.getItem(deserializado);
    }
    return serializar,
           deserializar,
           buscarParticipante,
           adicionar
  };