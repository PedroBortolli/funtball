import gif1 from '../assets/loadings/1.gif'
import gif2 from '../assets/loadings/2.gif'
import gif3 from '../assets/loadings/3.gif'
import gif4 from '../assets/loadings/4.gif'
import gif5 from '../assets/loadings/5.gif'
import gif6 from '../assets/loadings/6.gif'

const gifs = [gif1, gif2, gif3, gif4, gif5, gif6]

function loading() {
	const type = Math.floor(Math.random() * 6) + 1
	return gifs[type.toString()-1]
}

export default loading