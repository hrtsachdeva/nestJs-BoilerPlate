import * as winston from 'winston';
import 'winston-daily-rotate-file';

/* 
* Description - This service  will write the logs in a file and have a configuration for printing on conosle as well
* Author - Harshit Sachdeva 
* Date - 02-April-2022
*/

export class LoggerService {
  private logger: winston.Logger;
 
  constructor(private context: string) {
    const consoleFormat = winston.format.combine(
      winston.format.colorize({ all: true }),
      // winston.format.timestamp({ format: 'DD/MM/YYYY HH:MM:SS' }),
      winston.format.timestamp(),
      winston.format.printf(
        (info) =>
          `${info.timestamp} ${info.correlationId} [${info.level}] [${info.context}] ${info.message}`,
      ),
    );

    const transport = new winston.transports.DailyRotateFile({
      filename: '#{logs}#/dms/dms-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH-MM',
    });

    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.combine(
        winston.format.json(),
        // winston.format.prettyPrint()
      ),
      defaultMeta: { microservice: 'DMS' }, //We can provide other info as Container ID, IP Address etc
      transports: [
        transport,
        // new winston.transports.File({
        //   dirname: path.join(__dirname, '../../../log'),
        //   filename: 'prod.log',
        //   level: 'warn',
        //   // maxsize: 500 //Defines the max size of log file in bytes
        // }),

        new winston.transports.Console({
          format: consoleFormat,
          level: 'debug',
        }),

        // new winston.transports.File({
        //   dirname: path.join(__dirname, '../../../log'),
        //   filename: 'dev.log',
        //   level: 'debug',
        //   // maxsize: 500 //Defines the max size of log file in bytes
        // }),
      ],
    });
  }

  log(...message: any) {
    const correlationId = message[message.length-1];
    let finalMessage = '';
    for (let i = 0; i < message.length; i++) {

      if (typeof message[i] === "object") {
        try {
          message[i] = JSON.stringify(message[i])
        }
        catch (e) {
          console.log(message[i]);
        }

      }
      finalMessage += message[i];
    }
  
    const currentDate = new Date();
    this.logger.info(finalMessage, {
      timestamp: currentDate.toISOString(),
      context: this.context,
      correlationId: correlationId
    });
  }

  error(message: string, trace?: any, correlationId?: string) {
    const currentDate = new Date();
    try {
      trace = JSON.stringify(trace);
    }
    catch (e) {
      console.log(trace);
    }
    this.logger.error(`${message} -> (${trace || 'trace not provided !'}) -> (correlationId -> ${correlationId})`, {
      timestamp: currentDate.toISOString(),
      context: this.context,
      correlationId: correlationId
    });
  }
  warn(...message: any) {
    const correlationId = message[message.length-1];
    let finalMessage = '';
    for (let i = 0; i < message.length; i++) {
      if (typeof message[i] === "object") {
        try {
          message[i] = JSON.stringify(message[i])
        }
        catch (e) {
          console.log(message[i]);
        }
      }
      finalMessage += message[i];
    }
    const currentDate = new Date();
    this.logger.warn(finalMessage, {
      timestamp: currentDate.toISOString(),
      context: this.context,
      correlationId: correlationId
    });
  }
  debug(...message: any) {
    const correlationId = message[message.length-1];
    let finalMessage = '';
    for (let i = 0; i < message.length; i++) {
      if (typeof message[i] === "object") {
        try {
          message[i] = JSON.stringify(message[i])
        }
        catch (e) {
          console.log(message[i]);

        }
      }
      finalMessage += message[i];
    }
    const currentDate = new Date();
    this.logger.debug(finalMessage, {
      timestamp: currentDate.toISOString(),
      context: this.context,
      correlationId: correlationId
    });
  }
  verbose(...message: any) {
    const correlationId = message[message.length-1];
    let finalMessage = '';
    for (let i = 0; i < message.length; i++) {
      if (typeof message[i] === "object") {
        try {
          message[i] = JSON.stringify(message[i])
        }
        catch (e) {
          console.log(message[i]);

        }
      }
      finalMessage += message[i];
    }
    const currentDate = new Date();
    this.logger.verbose(finalMessage, {
      timestamp: currentDate.toISOString(),
      context: this.context,
      correlationId: correlationId
    });
  }
}


