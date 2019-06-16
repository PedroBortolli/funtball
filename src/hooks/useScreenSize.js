import {useState, useEffect} from 'react'

function useScreenSize() {
	const [width, changeWidth] = useState(window.innerWidth)
	const [height, changeHeight] = useState(window.innerHeight)
	const handleResize = () => {
		changeWidth(window.innerWidth)
		changeHeight(window.innerHeight)
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	})
	return [width, height]
}

export default useScreenSize