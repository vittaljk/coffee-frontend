import * as moment from 'moment';

export const getFormattedDateObject = (date: string, format: DateObjectFormat): Object => {
    switch (format) {
        case 'full': {
            const dateToFormat = moment(date).format('DD-MM-YY').split('-');
            return { day: dateToFormat[0], month: dateToFormat[1], year: dateToFormat[2] };
        }
        case 'month_year': {
            const dateToFormat = moment(date).format('MM-YY').split('-');
            return { month: dateToFormat[0], year: dateToFormat[1] };
        }
        case 'year': {
            return { year: date.slice(-2) };
        }
    }
}

type DateObjectFormat = 'full' | 'month_year' | 'year'

export const getLocalISODateString = (): string => {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
}
