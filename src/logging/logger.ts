import { time } from "../util/exports"

/**
 * 
 * Log to the console.
 *
 */
export function log(...args: any) {

    let string = ""
    let object: Object[] = []
    let prefix = `[WEB] [${time().timeFormat}] `

    args.forEach((member: any) => {

        if (typeof (member) == 'object') object.push(member)
        else string += " " + String(member)

    })

    string = string.trim()

    let chalk = {

        red: (string: string) => { return "\x1b[38;2;255;90;90m" + string + "\x1b[0m" },
        dred: (string: string) => { return "\x1b[38;2;222;0;0m" + string + "\x1b[0m" },
        green: (string: string) => { return "\x1b[38;2;44;222;139m" + string + "\x1b[0m" },
        dgreen: (string: string) => { return "\x1b[38;2;0;176;94m" + string + "\x1b[0m" },
        blue: (string: string) => { return "\x1b[38;2;43;156;232m" + string + "\x1b[0m" },
        yellow: (string: string) => { return "\x1b[38;2;233;233;62m" + string + "\x1b[0m" }

    }

    if (object.length) {
        object.forEach(object => console.debug(object))
    }

    if (/(^)(.*?)(?=$)/gm.test(string)) {

        let message = ''

        let lines = string.match(/(^)(.*?)(?=$)/gm)

        if (lines?.length) {

            message += lines[0]

            lines.forEach(line => {

                if (line == message) return;
                if (line.startsWith('red')) message += '\n' + line.substring(3).trim()
                else if (line.startsWith('dred') || line.startsWith('blue')) message += '\n' + line.substring(4).trim()
                else if (line.startsWith('green')) message += '\n' + line.substring(5).trim()
                else if (line.startsWith('yellow')) message += '\n' + line.substring(6).trim()
                else message += '\n' + line.trim()

            })

        }

        if (message.startsWith('dred')) {
            message = message.substring(4).trim()
            // tslint:disable-next-line:no-console
            return console.debug(chalk.dred(prefix + message))
        }
        else if (string.startsWith('red')) {
            message = message.substring(3).trim()
            // tslint:disable-next-line:no-console
            return console.debug(chalk.red(prefix + message))
        }
        else if (message.startsWith('yellow')) {
            message = message.substring(6).trim()
            // tslint:disable-next-line:no-console
            return console.debug(chalk.yellow(prefix + message))
        }
        else if (message.startsWith('blue')) {
            message = message.substring(4).trim()
            // tslint:disable-next-line:no-console
            return console.debug(chalk.blue(prefix + message))
        }
        else if (message.startsWith('green')) {
            message = message.substring(5).trim()
            // tslint:disable-next-line:no-console
            return console.debug(chalk.green(prefix + message))
        }
        // tslint:disable-next-line:no-console
        else return console.debug(prefix + message)

    } else {

        if (string.startsWith('dred')) {
            string = string.substring(4).trim()
            // tslint:disable-next-line:no-console
            return console.debug(chalk.dred(prefix + string))
        }
        else if (string.startsWith('red')) {
            string = string.substring(3).trim()
            // tslint:disable-next-line:no-console
            return console.debug(chalk.red(prefix + string))
        }
        else if (string.startsWith('yellow')) {
            string = string.substring(6).trim()
            // tslint:disable-next-line:no-console
            return console.debug(chalk.yellow(prefix + string))
        }
        else if (string.startsWith('blue')) {
            string = string.substring(4).trim()
            // tslint:disable-next-line:no-console
            return console.debug(chalk.blue(prefix + string))
        }
        else if (string.startsWith('green')) {
            string = string.substring(5).trim()
            // tslint:disable-next-line:no-console
            return console.debug(chalk.green(prefix + string))
        }
        // tslint:disable-next-line:no-console
        else return console.debug(prefix + string)

    }


}