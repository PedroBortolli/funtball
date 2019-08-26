const translations = {
	'Points': 'Pontos',
	'Dashboard': 'Jogos',
	'Login': 'Entrar',
	'Logoff': 'Sair',
	'Welcome to Funtball!': 'Bem vindo ao Funtball!',
	'You are logged in as': 'Você está logado como',
	"Funtball is a new pick 'em styled fantasy football game under development": 'Funtball é um novo jogo estilo fantasy football sob desenvolvimento',
	"Score points by correctly choosing the winner of every game from the upcoming football season": 'Pontue escolhendo corretamente o vencedor de cada jogo da próxima temporada de football',
	"Points may also be gained by correctly guessing the score difference of a given game": 'Pontos também podem ser obtidos ao acertar a diferença entre os placares de um jogo',
	"Play smart! Sacrifice points to double up the reward obtained from a correctly guessed game": 'Jogue sabiamente! Sacrifique pontos para dobrar os pontos de um jogo escolhido corretamente',
	'Funtball is open source - feel free to contribute': 'Funtball é open source - sinta-se à vontade para contribuir',
	'Follow me on Twitter for updates about Funtball': 'Siga-me no Twitter para notícias sobre Funtball'
}

function i18n(str) {
	const lang = localStorage.getItem('i18n')
	if (!lang || lang !== 'pt-br') return str
	return translations[str] || str
}

export default i18n