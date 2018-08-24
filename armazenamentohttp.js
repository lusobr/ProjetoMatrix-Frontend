function ArmazenamentoHTTP() {

	function getHTTP() {
		var dados = [];
		$.ajax({
			type: "GET",
			url: 'http://matrix.avalie.net/api/participantes/',
			dataType: 'json',
			async: false,
			success: function (data) {
				dados = data;
			}
		});
		return dados;
	}

	function postHTTP(dado) {
		var participante = serializar(dado);
		$.ajax({
			type: "POST",
			url: 'http://matrix.avalie.net/api/participantes/',
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			data: participante,
			async: false,
			success: function () {
				window.alert('participante adicionado com sucesso!');
			}
		});
	}

	function putHTTP(chave, dado) {
		var participante = serializar(dado);
		$.ajax({
			type: "PUT",
			url: 'http://matrix.avalie.net/api/participantes/' + dado.id,
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			data: participante,
			async: false
		});
	}

	function deleteHTTP(chave, dado) {
		var participante = obterItem(chave, dado);
		$.ajax({
			type: "DELETE",
			url: 'http://matrix.avalie.net/api/participantes/' + participante.id,
			dataType: 'json',
			async: false
		});
	}

	function obterItem(chave, dado) {
		return getHTTP().find(function (objeto) {
			return objeto[chave] === dado;
		})
	}

	function obterItens(chave, dado) {
		return getHTTP().filter(function (objeto) {
			return objeto[chave] === dado;
		});
	}

	function serializar(dado) {
		return JSON.stringify(dado);
	}
	return {
		postHTTP,
		obterItem,
		putHTTP,
		getHTTP,
		obterItem,
		serializar,
		deleteHTTP,
		obterItens
	}
};
