import "console-error";
import "console-info";
import "console-warn";

const getCurrentDateTime = () => {
  const now = new Date();

  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const year = now.getFullYear();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};

export class Logger {
  #_showDate = false;
  #_service = "";

  constructor({ service = "", showDate = false }) {
    this.#_service = service;
    this.#_showDate = showDate;
  }

  #processMessage(message = "", sensorId = "") {
    let log = message;

    if (this.#_service) {
      log = `[${this.#_service}] ${log}`;
    }

    if (sensorId) {
      log = `${log} (sensorId: ${sensorId})`;
    }

    if (this.#_showDate) {
      log = `${getCurrentDateTime()} ${log}`;
    }

    return log;
  }

  info(message = "", sensorId = "") {
    const log = this.#processMessage(message, sensorId);
    console.info(log);
  }

  error(message = "", sensorId = "") {
    const log = this.#processMessage(message, sensorId);
    console.error(log);
  }

  warn(message = "", sensorId = "") {
    const log = this.#processMessage(message, sensorId);
    console.warn(log);
  }

  log(message = "", sensorId = "") {
    const log = this.#processMessage(message, sensorId);
    console.log(log);
  }
}
