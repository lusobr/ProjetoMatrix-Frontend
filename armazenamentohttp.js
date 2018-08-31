function ArmazenamentoHTTP() {

	function adicionar(participante) {
		return axios.post('http://matrix.avalie.net/api/participantes', participante)
			.then(function (resp) {
				return resp.data;
			})
			.catch(function (err) {
				throw err.response.data.message;
			});
	}

	function editar(participante) {
		return axios.put('http://matrix.avalie.net/api/participantes/' + participante.id, participante);
	}

	function remover(id) {
		return axios.delete('http://matrix.avalie.net/api/participantes/' + id);
	}

	function obterItem(id) {
		return axios.get('http://matrix.avalie.net/api/participantes/' + id)
			.then(function (resp) {
				return resp.data;
			});
	}

	function obterItens(chave, dado) {
		return deserializar().filter(function (participante) {
			return participante[chave] === dado;
		});
	}

	//Mantive o nome "deserializar" para ser igual ao armazenamento do LocalStorage
	function deserializar() {
		return axios.get('http://matrix.avalie.net/api/participantes/')
			.then(function (resp) {
				return resp.data;
			});
	}

	return {
		adicionar,
		editar,
		remover,
		obterItem,
		obterItens,
		deserializar
	};
}
