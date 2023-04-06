import { createLogger, transports } from "winston";
import { format, Format } from "logform";
import { errStack, PrintfYiu, PrintfNest, YiuLogger } from "yiu-winston-kit";

const commonFormat: Format[] = [
  format.timestamp(),
  format.ms(),
  format.splat(),
  format.metadata({
    fillExcept: [
      "timestamp",
      "level",
      "context",
      "message",
      "ms",
      "splat",
      "error",
    ],
  }),
];

const winstonLogger = createLogger({
  level: "error",
  transports: [
    new transports.File({
      format: format.combine(...commonFormat, errStack(), format.json()),
      filename: "app.log",
    }),
    new transports.Console({
      format: format.combine(...commonFormat, new PrintfYiu().printf()),
    }),
    new transports.Console({
      format: format.combine(...commonFormat, new PrintfNest().printf()),
    }),
  ],
});

const yiuLogger = new YiuLogger(winstonLogger);

yiuLogger.log({
  level: "error",
  message: "Hello Yiu!",
  context: "custom.ts",
});
