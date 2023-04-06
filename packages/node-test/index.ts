import { yiuLoggerStater, nestLoggerStater } from "yiu-winston-kit";

const context = "packages/node-test/src/index.ts";

console.log("========== yiuLogger ==========");
const yiuLogger = yiuLoggerStater({ level: "silly" });
yiuLogger.error({ context, message: "Hello Yiu!" });
yiuLogger.warn({ context, message: "Hello Yiu!" });
yiuLogger.info({ context, message: "Hello Yiu!" });
yiuLogger.http({ context, message: "Hello Yiu!" });
yiuLogger.verbose({ context, message: "Hello Yiu!" });
yiuLogger.debug({ context, message: "Hello Yiu!" });
yiuLogger.silly({ context, message: "Hello Yiu!" });
yiuLogger.error({
  context,
  message: "Hello Yiu!",
  error: new Error("Error Yiu!"),
});

console.log("========== nestLogger ==========");
const nestLogger = nestLoggerStater({ level: "silly", silent: true });
nestLogger.error({ context, message: "Hello Yiu!" });
nestLogger.warn({ context, message: "Hello Yiu!" });
nestLogger.info({ context, message: "Hello Yiu!" });
nestLogger.http({ context, message: "Hello Yiu!" });
nestLogger.verbose({ context, message: "Hello Yiu!" });
nestLogger.debug({ context, message: "Hello Yiu!" });
nestLogger.silly({ context, message: "Hello Yiu!" });
nestLogger.error({
  context,
  message: "Hello Yiu!",
  error: new Error("Error Yiu!"),
});
