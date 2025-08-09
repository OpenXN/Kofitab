// I know that, I could use console.log in each function,
// but with this I dont need to format it each time, and easier to export it.

type LogLevel = "INFO" | "DEBUG" | "WARN" | "ERROR" | "FATAL";

const Log = {
  Info: (message: string) => log("INFO", message),
  Debug: (message: string) => log("DEBUG", message),
  Warn: (message: string) => log("WARN", message),
  Error: (message: string) => log("ERROR", message),
  Fatal: (message: string) => log("FATAL", message),
};

function log(level: LogLevel, message: string): void {
  switch (level) {
    case "INFO":
      console.info(`[${level}] ${message}`);
      break;

    case "DEBUG":
      console.debug(`[${level}] ${message}`);
      break;

    case "WARN":
      console.warn(`[${level}] ${message}`);
      break;

    case "ERROR":
    case "FATAL":
      console.error(`[${level}] ${message}`);
      break;

    default:
      console.log(`[${level}] ${message}`);
      break;
  }
}

function addDebugConsole() {
  const debugConsole = document.createElement("div");
  debugConsole.id = "debug-console";

  document.body.append(debugConsole);
}

export { Log, addDebugConsole };
