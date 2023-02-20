export class Time {
    date: Date | null = null;
    second: number;
    minute: number;
    hour: number;
    day: number;
    month: number;
    year: number;
    epoch: number;
    dateString: string;
    timeFormat: string;
    dateFormat: string;
    fullTime: string;

    constructor(value: number | void) {

        if (value) {

            if (isNaN(value)) throw new Error('Value is not a number.')

            const date = new Date(value);

            this.date = date;
            this.second = date.getSeconds()
            this.minute = date.getMinutes()
            this.hour = date.getHours()
            this.day = date.getDate()
            this.month = date.getMonth() + 1
            this.year = date.getFullYear()
            this.epoch = date.getTime()
            this.dateString = date.toDateString()

            const d = this.hour == 12 ? 'PM'
                : this.hour > 12 ? 'PM'
                    : 'AM';

            const h = this.hour == 12 || (this.hour > 9 && this.hour < 12) ? `${this.hour}`
                : this.hour > 12 ? this.hour - 12 > 9 ? `${this.hour - 12}`
                    : `0${this.hour - 12}`
                    : `0${this.hour}`

            const m = String(this.minute).length == 2 ? this.minute
                : `0${this.minute}`;

            const s = String(this.second).length == 2 ? this.second
                : `0${this.second}`

            this.timeFormat = `${h}:${m}:${s}-${d} EST`;
            this.dateFormat = `${this.month}-${this.day}-${this.year}`
            this.fullTime = this.dateFormat + ' ' + this.timeFormat


        } else {

            const date = new Date();

            this.second = date.getSeconds()
            this.minute = date.getMinutes()
            this.hour = date.getHours()
            this.day = date.getDate()
            this.month = date.getMonth() + 1
            this.year = date.getFullYear()
            this.epoch = date.getTime()
            this.dateString = date.toDateString()

            const d = this.hour == 12 ? 'PM'
                : this.hour > 12 ? 'PM'
                    : 'AM';

            const h = this.hour == 12 || (this.hour > 9 && this.hour < 12) ? `${this.hour}`
                : this.hour > 12 ? this.hour - 12 > 9 ? `${this.hour - 12}`
                    : `0${this.hour - 12}`
                    : `0${this.hour}`

            const m = String(this.minute).length == 2 ? this.minute
                : `0${this.minute}`;

            const s = String(this.second).length == 2 ? this.second
                : `0${this.second}`

            this.timeFormat = `${h}:${m}:${s}-${d} EST`;
            this.dateFormat = `${this.month}-${this.day}-${this.year}`
            this.fullTime = this.dateFormat + ' ' + this.timeFormat

        }

    }

}

export function time(value: number | void) {

    return new Time(value);

}