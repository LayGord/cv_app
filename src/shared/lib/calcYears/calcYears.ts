export const calcYears = (date1: string | Date, date2: string | Date = new Date()) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) {
        throw new Error('Invalid date');
    };
    let years = d2.getFullYear() - d1.getFullYear();

    const hasNotHadAnniversaryYet = d2.getMonth() < d1.getMonth() ||
        (d2.getMonth() === d1.getMonth() && d2.getDate() < d1.getDate());

    if (hasNotHadAnniversaryYet) {
        years -= 1;
    }

    return years;
};