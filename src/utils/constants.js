export const primaryColor = '#932704'
export const secondaryColor = '#d84c20'
export const url = 'http://localhost:5000'

export const getWeek = () => {
    const current = + new Date()
    if (current < + new Date(2019, 8, 10, 5)) return 1
    if (current < + new Date(2019, 8, 17, 5)) return 2
    if (current < + new Date(2019, 8, 24, 5)) return 3
    if (current < + new Date(2019, 9, 1, 5)) return 4
    if (current < + new Date(2019, 9, 8, 5)) return 5
    if (current < + new Date(2019, 9, 15, 5)) return 6
    if (current < + new Date(2019, 9, 22, 5)) return 7
    if (current < + new Date(2019, 9, 29, 5)) return 8
    if (current < + new Date(2019, 10, 5, 5)) return 9
    if (current < + new Date(2019, 10, 12, 5)) return 10
    if (current < + new Date(2019, 10, 19, 5)) return 11
    if (current < + new Date(2019, 10, 26, 5)) return 12
    if (current < + new Date(2019, 11, 3, 5)) return 13
    if (current < + new Date(2019, 11, 10, 5)) return 14
    if (current < + new Date(2019, 11, 17, 5)) return 15
    if (current < + new Date(2019, 11, 24, 5)) return 16
    return 17
}
