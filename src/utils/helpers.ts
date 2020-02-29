/**
 * Static Weekly Dates
 */
export const week1 = new Date(2020, 3, 2);
export const week2 = new Date(2020, 3, 9);
export const week3 = new Date(2020, 3, 16);
export const week4 = new Date(2020, 3, 23);
export const week5 = new Date(2020, 4, 6);

/**
 * Function to calculate the current week of the season
 * 
 * Doing so this way, instead of calculating, will prevent
 *  unneccesary document reads in the database
 */
export const getCurrentWeek = (): number => {
    const now = new Date();
    if (now < week1) {
        return 1;
    }
    if (now < week2) {
        return 2;
    }
    if (now < week3) {
        return 3;
    }
    if (now < week4) {
        return 4;
    }
    if (now < week5) {
        return 5;
    }
    return 5;
}

/**
 * Returns true if two arrays are equal (shallow)
 */
export const arraysEqual = (a: any[], b: any[]) => {
    if (a === b) {
        return true;
    }
    if (a == null || b == null) {
        return false;
    }
    if (a.length != b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}

export const dateToString = (date: Date) => {
    if (!date) {
        return 'Date Unknown';
    }
    const timeFormat: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleTimeString('en-US', timeFormat);
}