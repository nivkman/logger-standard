import "console-error";
import "console-info";
import "console-warn";

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

const EMOJIS = {
  success: '✅',
  failure: '❌',
  warning: '⚠️ ',
  step: '→',
  important: '⭐',
  metric: '📊',
  start: '🚀',
  stop: '🛑'
};

function padZero(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  return `${month}/${day}/${date.getFullYear()}`;
}

function formatTime(date) {
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

function getCurrentDateTime() {
  const now = new Date();
  return `${formatDate(now)} ${formatTime(now)}`;
}

function getIndentation(level) {
  return "   ".repeat(level);
}

function addServicePrefix(message, service) {
  return service ? `[${service}] ${message}` : message;
}

function addPrefix(message, prefix) {
  return prefix ? `[${prefix}] ${message}` : message;
}

function addSensorId(message, sensorId) {
  return sensorId ? `${message} (sensorId: ${sensorId})` : message;
}

function addTimestamp(message, timestamp) {
  return timestamp ? `${timestamp} ${message}` : message;
}

function addEmoji(message, emoji, useEmojis) {
  return useEmojis && emoji ? `${emoji} ${message}` : message;
}

function shouldLog(messageLevel, currentLevel) {
  const msgLevel = LOG_LEVELS[messageLevel] || LOG_LEVELS.info;
  const curLevel = LOG_LEVELS[currentLevel] || LOG_LEVELS.info;
  return msgLevel >= curLevel;
}

export class Logger {
  #_service = "";
  #_showDate = false;
  #_useEmojis = false;
  #_logLevel = "info";
  #_indentLevel = 0;
  #_prefix = "";

  constructor(options = {}) {
    this.#_service = options.service || "";
    this.#_showDate = options.showDate || false;
    this.#_useEmojis = options.useEmojis || false;
    this.#_logLevel = options.logLevel || "info";
    this.#_indentLevel = options.indentLevel || 0;
    this.#_prefix = options.prefix || "";
  }

  #getChildOptions(prefix) {
    return {
      service: this.#_service,
      showDate: this.#_showDate,
      useEmojis: this.#_useEmojis,
      logLevel: this.#_logLevel,
      indentLevel: this.#_indentLevel,
      prefix
    };
  }

  child(options = {}) {
    const childOptions = this.#getChildOptions(options.prefix || "");
    return new Logger(childOptions);
  }

  indent(level) {
    this.#_indentLevel = level;
    return this;
  }

  #shouldLog(messageLevel) {
    return shouldLog(messageLevel, this.#_logLevel);
  }

  #applyFormatting(message, emoji, sensorId) {
    let log = addEmoji(message, emoji, this.#_useEmojis);
    log = addServicePrefix(log, this.#_service);
    log = addPrefix(log, this.#_prefix);
    return addSensorId(log, sensorId);
  }

  #buildMessage(message, emoji = "", sensorId = "") {
    const formatted = this.#applyFormatting(message, emoji, sensorId);
    const timestamp = this.#_showDate ? getCurrentDateTime() : "";
    const withTimestamp = addTimestamp(formatted, timestamp);
    return getIndentation(this.#_indentLevel) + withTimestamp;
  }

  debug(message = "", sensorId = "") {
    if (!this.#shouldLog('debug')) return;
    console.log(this.#buildMessage(message, "", sensorId));
  }

  info(message = "", sensorId = "") {
    if (!this.#shouldLog('info')) return;
    console.info(this.#buildMessage(message, "", sensorId));
  }

  warn(message = "", sensorId = "") {
    if (!this.#shouldLog('warn')) return;
    console.warn(this.#buildMessage(message, "", sensorId));
  }

  error(message = "", sensorId = "") {
    if (!this.#shouldLog('error')) return;
    console.error(this.#buildMessage(message, "", sensorId));
  }

  log(message = "", sensorId = "") {
    console.log(this.#buildMessage(message, "", sensorId));
  }

  success(message = "", sensorId = "") {
    if (!this.#shouldLog('info')) return;
    console.log(this.#buildMessage(message, EMOJIS.success, sensorId));
  }

  failure(message = "", sensorId = "") {
    if (!this.#shouldLog('error')) return;
    console.error(this.#buildMessage(message, EMOJIS.failure, sensorId));
  }

  warning(message = "", sensorId = "") {
    if (!this.#shouldLog('warn')) return;
    console.warn(this.#buildMessage(message, EMOJIS.warning, sensorId));
  }

  step(message = "", important = false, sensorId = "") {
    if (!this.#shouldLog('info')) return;
    const emoji = important ? EMOJIS.important : EMOJIS.step;
    console.log(this.#buildMessage(message, emoji, sensorId));
  }

  start(message = "", sensorId = "") {
    if (!this.#shouldLog('info')) return;
    console.log(this.#buildMessage(message, EMOJIS.start, sensorId));
  }

  stop(message = "", sensorId = "") {
    if (!this.#shouldLog('info')) return;
    console.log(this.#buildMessage(message, EMOJIS.stop, sensorId));
  }

  json(data = {}) {
    if (!this.#shouldLog('info')) return;
    const output = {
      timestamp: new Date().toISOString(),
      service: this.#_service,
      ...data
    };
    console.log(JSON.stringify(output));
  }

  metric(key, value, unit = "") {
    if (!this.#shouldLog('info')) return;
    const valueStr = unit ? `${value}${unit}` : value;
    const message = `METRIC ${key}=${valueStr}`;
    console.log(this.#buildMessage(message, EMOJIS.metric));
  }
}
