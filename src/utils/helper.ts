/**
 * Function to calculate the current week of the season
 * 
 * Doing so this way, instead of calculating, will prevent
 *  unneccesary document reads in the database
 */
export const getCurrentWeek = (): number => {
    const now = new Date()
    const week1 = new Date(2020, 3, 2)
    if (now < week1) {
        return 1
    }
    const week2 = new Date(2020, 3, 9)
    if (now < week2) {
        return 2
    }
    const week3 = new Date(2020, 3, 16)
    if (now < week3) {
        return 3
    }
    const week4 = new Date(2020, 3, 23)
    if (now < week4) {
        return 4
    }
    const week5 = new Date(2020, 4, 6)
    if (now < week5) {
        return 5
    }
    return 5
}