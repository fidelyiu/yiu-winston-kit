yiu-winston-kit
===============

为 winston 日志库的打造的一些简单元件。

## 1.日志样式

以下图片展示的是式执行如下日志操作后的结果：
```js
logger.error({ context, message: "Hello Yiu!" });
logger.warn({ context, message: "Hello Yiu!" });
logger.info({ context, message: "Hello Yiu!" });
logger.http({ context, message: "Hello Yiu!" });
logger.verbose({ context, message: "Hello Yiu!" });
logger.debug({ context, message: "Hello Yiu!" });
logger.silly({ context, message: "Hello Yiu!" });
logger.error({
  context,
  message: "Hello Yiu!",
  error: new Error("Error Yiu!"),
});
```

### 1.1.Yiu

![Yiu样式](https://fidelyiu.github.io/images/yiu-winston-kit/yiu-logger.png)


### 1.2.Nest

![Nest样式](https://fidelyiu.github.io/images/yiu-winston-kit/nest-logger.png)

### 1.3.文件

```
{"context":"packages/node-test/src/index.ts","level":"error","message":"Hello Yiu!","metadata":{},"ms":"+2ms","timestamp":"2023-04-06T06:46:46.232Z"}
{"context":"packages/node-test/src/index.ts","level":"warn","message":"Hello Yiu!","metadata":{},"ms":"+1ms","timestamp":"2023-04-06T06:46:46.235Z"}
{"context":"packages/node-test/src/index.ts","level":"info","message":"Hello Yiu!","metadata":{},"ms":"+1ms","timestamp":"2023-04-06T06:46:46.237Z"}
{"context":"packages/node-test/src/index.ts","level":"http","message":"Hello Yiu!","metadata":{},"ms":"+0ms","timestamp":"2023-04-06T06:46:46.238Z"}
{"context":"packages/node-test/src/index.ts","level":"verbose","message":"Hello Yiu!","metadata":{},"ms":"+0ms","timestamp":"2023-04-06T06:46:46.239Z"}
{"context":"packages/node-test/src/index.ts","level":"debug","message":"Hello Yiu!","metadata":{},"ms":"+0ms","timestamp":"2023-04-06T06:46:46.240Z"}
{"context":"packages/node-test/src/index.ts","level":"silly","message":"Hello Yiu!","metadata":{},"ms":"+1ms","timestamp":"2023-04-06T06:46:46.241Z"}
{"context":"packages/node-test/src/index.ts","error":"Error: Error Yiu!\n    at Object.<anonymous> (E:\\Code\\yiu-winston-kit\\packages\\node-test\\index.ts:17:10)\n    at Module._compile (node:internal/modules/cjs/loader:1254:14)\n    at Module.m._compile (E:\\Code\\yiu-winston-kit\\node_modules\\.pnpm\\ts-node@10.9.1_@types+node@18.15.11_typescript@5.0.3\\node_modules\\ts-node\\src\\index.ts:1618:23)\n    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)\n    at Object.require.extensions.<computed> [as .ts] (E:\\Code\\yiu-winston-kit\\node_modules\\.pnpm\\ts-node@10.9.1_@types+node@18.15.11_typescript@5.0.3\\node_modules\\ts-node\\src\\index.ts:1621:12)\n    at Module.load (node:internal/modules/cjs/loader:1117:32)\n    at Function.Module._load (node:internal/modules/cjs/loader:958:12)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)\n    at phase4 (E:\\Code\\yiu-winston-kit\\node_modules\\.pnpm\\ts-node@10.9.1_@types+node
```


## 2.安装

```
pnpm i winston logform yiu-winston-kit
```

## 3.快速开始

```js
const context = "packages/node-test/src/index.ts";

console.log("========== yiuLogger ==========");
const logger = yiuLoggerStater({ level: "silly" });
logger.error({ context, message: "Hello Yiu!" });
logger.warn({ context, message: "Hello Yiu!" });
logger.info({ context, message: "Hello Yiu!" });
logger.http({ context, message: "Hello Yiu!" });
logger.verbose({ context, message: "Hello Yiu!" });
logger.debug({ context, message: "Hello Yiu!" });
logger.silly({ context, message: "Hello Yiu!" });
logger.error({
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

```

## 4.自定义

其核心还是使用`winston`，如果你不太清楚下面的代码，那么你应该查看[winston的文档](https://github.com/winstonjs/winston)。

其中的`YiuLogger`是为了规范日志函数的输入的，因为我不喜欢log有很多变种的入参。当然，如果你不建议你也可以不使用`YiuLogger`


```typescript
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

```
