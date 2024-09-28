```md
# 📝 node-logger
A simple and flexible logging utility for Node.js applications. 🚀

## 📦 Installation

```bash
npm install node-logger
```

## 🚀 Usage

```javascript
import { Logger } from 'node-logger';

// Create a new logger instance
const logger = new Logger({
  service: 'MyService',
  showDate: true
});

// Basic logging
logger.info('This is an info message');
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.log('This is a regular log message');

// Logging with sensor ID
logger.info('Temperature reading', 'TEMP001');
```

## 🛠️ API

### Constructor

```javascript
new Logger(options)
```

- `options.service` (string): Prefix for all log messages. Default: ''
- `options.showDate` (boolean): Include timestamp in log messages. Default: false

### Methods

- `info(message, sensorId)`: Log an info message ℹ️
- `error(message, sensorId)`: Log an error message ❌
- `warn(message, sensorId)`: Log a warning message ⚠️
- `log(message, sensorId)`: Log a regular message 📢

All methods accept two parameters:
- `message` (string): The message to log
- `sensorId` (string, optional): An identifier for the source of the log

## 📄 Output Format

The log output format is as follows:

```
[Timestamp (if enabled)] [Service Name] Message (sensorId: SensorID)
```

## 🔗 Dependencies

This package relies on the following npm packages for colored console output:
- console-error
- console-info
- console-warn

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 👨‍💻👩‍💻

## 🐛 Issues

If you encounter any problems or have any questions, please open an issue in the [GitHub repository](https://github.com/nivkman/node-logger/issues).

## 📜 License

This project is licensed under the ISC License.

## 🏠 Repository

[https://github.com/nivkman/node-logger](https://github.com/nivkman/node-logger)
```
