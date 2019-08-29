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
	'Unsaved changes': 'Alterações não salvas',
	'Saving': 'Salvando',
	'Week': 'Semana',
	'Account': 'Conta',
	'confirmed. Redirecting...': 'confirmada. Redirecionando...',
	'not confirmed...': 'não confirmada...',
	'Validating...': 'Validando...',
	'Username': 'Usuário',
	'Password': 'Senha',
	'Log in': 'Entrar',
	'Already logged in. Redirecting...': 'Já logado. Redirecionando...',
	'Repeat e-mail': 'Repita o e-mail',
	'Repeat password': 'Repita a senha',
	'Sign up': 'Registrar',
	'Please complete the captcha verification': 'Por favor complete a verificação de captcha',
	'Please choose a valid username': 'Por favor escolha um usuário válido',
	'Please provide a valid e-mail': 'Por favor coloque um e-mail válido',
	'Please choose a valid password': 'Por favor escolha uma senha válida',
	"E-mails don't match": 'E-mails diferentes',
	"Passwords don't match": 'Senhas diferentes',
	'Invalid username/password': 'Usuário/senha inválido(s)',
	'Wins': 'Vitórias',
	'Forgot password?': 'Esqueceu sua senha?',
	'E-mail registered': 'E-mail registrado',
	'Reset': 'Resetar',
	'Such e-mail is not registered on Funtball': 'Este e-mail não está registrado no Funtball',
	'An e-mail with instructions to reset your password has been sent': 'Um e-mail com instruções para resetar sua senha foi enviado',
	"Sorry, an internal error happened and it wasn't possible to reset your password": 'Desculpe, houve um erro interno e não foi possível resetar a sua senha',
	'Password successfully reseted': 'Senha resetada com sucesso',
	'Confirm': 'Confirmar',
	"Funtball isn't affiliated with the NFL in any manner. Funtball is a recreative project and non-commercial.": 'Funtball não é afiliado à NFL de modo algum. Funtball é um projeto recreativo e não comercial',
	'All the logos from the 32 teams belong exclusively to the NFL. Funtball is a non-profit purposes project.': 'Todos os logos dos 32 times pertencem exclusivamente à NFL. Funtball não possui fins lucrativos com tais marcas.'
}

function i18n(str) {
	const lang = localStorage.getItem('i18n')
	if (!lang || lang !== 'pt-br') return str
	return translations[str] || str
}

export default i18n