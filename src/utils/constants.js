export const primaryColor = '#932704'
export const secondaryColor = '#d84c20'
export const url = 'https://funtball-backend.herokuapp.com'

export const getWeek = () => {
    const current = + new Date()
    if (current < + new Date(2020, 8, 15, 5)) return 1
    if (current < + new Date(2020, 8, 22, 5)) return 2
    if (current < + new Date(2020, 8, 29, 5)) return 3
    if (current < + new Date(2020, 9, 6, 5)) return 4
    if (current < + new Date(2020, 9, 13, 5)) return 5
    if (current < + new Date(2020, 9, 20, 5)) return 6
    if (current < + new Date(2020, 9, 29, 5)) return 7
    if (current < + new Date(2020, 10, 3, 5)) return 8
    if (current < + new Date(2020, 10, 10, 5)) return 9
    if (current < + new Date(2020, 10, 17, 5)) return 10
    if (current < + new Date(2020, 10, 24, 5)) return 11
    if (current < + new Date(2020, 11, 1, 5)) return 12
    if (current < + new Date(2020, 11, 8, 5)) return 13
    if (current < + new Date(2020, 11, 15, 5)) return 14
    if (current < + new Date(2020, 11, 22, 5)) return 15
    if (current < + new Date(2020, 11, 31, 5)) return 16
    return 17
}
