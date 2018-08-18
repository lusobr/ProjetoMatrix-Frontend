function Armazenamento(key) {
    var storage = window.localStorage;

    if (deserializar() === null) {
        storage.setItem(key, "[]");
    }

    function adicionar(dado) {
        var array = deserializar();
        array.push(dado);
        serializar(array);
    }

    function editar(chave, dado) {
        var array = deserializar();
        var index = array.findIndex(function (objecto) {
            return objecto[chave] === dado[chave];
        });
        array[index] = dado;
        serializar(array);
    }

    function remover(chave, dado) {
        var participante = deserializar(),
            index = participante.findIndex(function (objeto) {
                return objeto[chave] === dado;
            });
        
            participante.splice(index,1);
            serializar(participante);
    }

    function obterItem(chave, dado) {
        return deserializar().find(function (objecto) {
            return objecto[chave] === dado;
        })
    }

    function deserializar() {
        return JSON.parse(storage.getItem(key));
    }

    function serializar(dado) {
        storage.setItem(key, JSON.stringify(dado));
    }

    return {
        obterItem,
        editar,
        adicionar,
        remover,
        deserializar
    }
}