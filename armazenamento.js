var botão = document.querySelector('#enviar').addEventListener('click',cadastrar);

function cadastrar(){
	var sistema = new SistemaCadastro();
	var nome = document.querySelector('#nome').value,
		sobrenome = document.querySelector('#sobrenome').value,
		email = document.querySelector('#email').value,
		idade = document.querySelector('#idade').value,
		sexo = document.querySelector('#sexo').value;
	
	sistema.adicionarParticipante(nome,sobrenome,email,idade,sexo);
};