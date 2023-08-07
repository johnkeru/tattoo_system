export const dateconverter = (dateToConvert) => {
    const date = new Date(dateToConvert);
    const now = new Date();
    const timeDifferenceInSeconds = Math.floor((now - date) / 1000);

    if (timeDifferenceInSeconds < 60) {
        return 'Just now';
    } else if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
        const days = Math.floor(timeDifferenceInSeconds / 86400);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    }
}

export function formatDateToCustomFormat(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${month}/${day}/${year}`;
}
