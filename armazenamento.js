function Armazenamento(key) {
    var storage = window.localStorage;

    if (capturarDado() === null) {
        storage.setItem(key, "[]");
    }

    function adicionar(dado) {
        var array = capturarDado();
        array.push(dado);
        atualizarOuInserirDado(array);
    }
    function editar(chave, dado) {
        var array = capturarDado();
        var index = array.findIndex(function (objecto) {
            return objecto[chave] === dado[chave];
        });
        array[index] = dado;
        atualizarOuInserirDado(array);
    }
    function obterItem(chave, dado) {
        return capturarDado().find(function (objecto) {
            return objecto[chave] === dado;
        })
    }
    function capturarDado() {
        return JSON.parse(storage.getItem(key));
    }
    function atualizarOuInserirDado(dado) {
        storage.setItem(key, JSON.stringify(dado));
    }

    return {
        capturarDado,
        atualizarOuInserirDado,
        obterItem,
        editar,
        adicionar
    }
}