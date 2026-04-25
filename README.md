# logger-standard 🚀

A flexible and feature-rich logging utility for Node.js applications.

## Features ✨

- 🎨 **Service Prefixes** - Tag logs with service names
- 📅 **Timestamps** - Optional timestamp display
- 🎯 **Log Levels** - Control verbosity (debug, info, warn, error)
- 🚀 **Emojis** - Optional visual indicators (disabled by default)
- 📊 **Structured Logging** - JSON output for log aggregation
- 📏 **Indentation** - Hierarchical log formatting
- 👶 **Child Loggers** - Create scoped loggers
- 📈 **Metrics** - Built-in metrics logging
- 🎨 **Colored Output** - Using console-error, console-info, console-warn

## Installation

```bash
npm install logger-standard
```

## Quick Start

```js
import { Logger } from 'logger-standard';

// Basic usage (no emojis, backward compatible)
const logger = new Logger({ service: 'my-app' });

logger.info('Server started');
// [my-app] Server started

logger.error('Connection failed');
// [my-app] Connection failed
```

## API

### Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `service` | string | `""` | Service name prefix |
| `showDate` | boolean | `false` | Show timestamps |
| `useEmojis` | boolean | `false` | Enable emoji indicators |
| `logLevel` | string | `"info"` | Minimum log level (`debug`, `info`, `warn`, `error`) |
| `indentLevel` | number | `0` | Initial indentation level |
| `prefix` | string | `""` | Additional prefix |

### Basic Methods

```js
logger.log(message, sensorId?)      // Generic log
logger.debug(message, sensorId?)    // Debug level
logger.info(message, sensorId?)     // Info level
logger.warn(message, sensorId?)     // Warning level
logger.error(message, sensorId?)    // Error level
```

### Emoji Methods (require `useEmojis: true`)

```js
logger.success(message)             // ✅ Success (if emojis enabled)
logger.failure(message)             // ❌ Failure (if emojis enabled)
logger.warning(message)             // ⚠️  Warning (if emojis enabled)
logger.start(message)               // 🚀 Start (if emojis enabled)
logger.stop(message)                // 🛑 Stop (if emojis enabled)
logger.step(message, important?)    // → or ⭐ Step (if emojis enabled)
```

### Advanced Methods

```js
logger.indent(level)                // Set indentation level
logger.child({ prefix })            // Create child logger
logger.json(data)                   // Structured JSON log
logger.metric(key, value, unit?)    // Metrics logging
```

## Usage Examples

### Basic Usage (No Emojis)

```js
import { Logger } from 'logger-standard';

const logger = new Logger({
  service: 'api',
  showDate: true
});

logger.info('Server started on port 3000');
// 04/05/2026 10:30:15 [api] Server started on port 3000

logger.warn('High memory usage detected');
// 04/05/2026 10:30:16 [api] High memory usage detected

logger.error('Database connection failed');
// 04/05/2026 10:30:17 [api] Database connection failed
```

### With Emojis (Optional)

```js
import { Logger } from 'logger-standard';

const logger = new Logger({
  service: 'pipeline',
  useEmojis: true  // Enable emojis
});

logger.start('Starting campaign pipeline');
// 🚀 [pipeline] Starting campaign pipeline

logger.step('Research phase', true);
// ⭐ [pipeline] Research phase

logger.success('ICP generated');
// ✅ [pipeline] ICP generated

logger.failure('API rate limited');
// ❌ [pipeline] API rate limited
```

### With Indentation

```js
const logger = new Logger({ service: 'leads' });

logger.info('Processing leads');
logger.indent(1).info('Loading from file');
logger.indent(2).info('Found 100 leads');
logger.indent(1).info('Filtering by score');
logger.indent(0).info('Complete');

// Output:
// [leads] Processing leads
// [leads]    Loading from file
// [leads]       Found 100 leads
// [leads]    Filtering by score
// [leads] Complete
```

### With Log Levels

```js
const logger = new Logger({
  service: 'api',
  logLevel: 'warn'  // Only show warn and error
});

logger.debug('Debug info');         // Not shown
logger.info('Request received');    // Not shown
logger.warn('Slow query detected'); // [api] Slow query detected
logger.error('Connection failed');  // [api] Connection failed
```

### Child Loggers

```js
const apiLogger = new Logger({ service: 'api' });

const authLogger = apiLogger.child({ prefix: 'auth' });
const dbLogger = apiLogger.child({ prefix: 'db' });

authLogger.info('User authenticated');
// [api] [auth] User authenticated

dbLogger.warn('Connection pool low');
// [api] [db] Connection pool low
```

### Structured Logging

```js
const logger = new Logger({ service: 'analytics' });

logger.json({
  event: 'user_signup',
  userId: 'usr_123',
  plan: 'premium',
  referrer: 'google'
});

// Output (JSON):
// {"timestamp":"2026-04-05T10:30:15.000Z","service":"analytics","event":"user_signup","userId":"usr_123","plan":"premium","referrer":"google"}
```

### Metrics Logging

```js
const logger = new Logger({ service: 'api' });

logger.metric('response_time', 145, 'ms');
logger.metric('memory_usage', 512, 'MB');
logger.metric('active_connections', 42);

// Output (with emojis disabled):
// [api] METRIC response_time=145ms
// [api] METRIC memory_usage=512MB
// [api] METRIC active_connections=42

// With emojis enabled:
// 📊 [api] METRIC response_time=145ms
```

### Sensor ID Tracking

```js
const logger = new Logger({ service: 'iot' });

logger.info('Temperature reading', 'sensor-001');
// [iot] Temperature reading (sensorId: sensor-001)

logger.error('Connection lost', 'sensor-042');
// [iot] Connection lost (sensorId: sensor-042)
```

## Log Levels

Control verbosity by setting the log level:

- `debug` - Detailed debugging information
- `info` - General informational messages (default)
- `warn` - Warning messages
- `error` - Error messages

```js
const logger = new Logger({ logLevel: 'warn' });

logger.debug('Debug');  // Not shown (level too low)
logger.info('Info');    // Not shown (level too low)
logger.warn('Warning'); // Shown
logger.error('Error');  // Shown
```

## Migration from 1.x

Version 2.0 is fully **backward compatible**. Your existing code works unchanged:

```js
// v1.x code works perfectly
const logger = new Logger({ service: 'app', showDate: true });
logger.info('Hello');
logger.error('Error');

// New features are opt-in
const enhancedLogger = new Logger({
  service: 'app',
  showDate: true,
  useEmojis: true,     // NEW: Enable emojis
  logLevel: 'debug'    // NEW: Set log level
});
```

**Breaking changes**: None! All new features are optional.

## Why logger-standard?

- ✅ **Zero dependencies** (except colored console packages)
- ✅ **Lightweight** (~200 LOC)
- ✅ **Flexible** - Use only what you need
- ✅ **Backward compatible** - Safe to upgrade
- ✅ **Clean code** - All functions ≤7 lines
- ✅ **Production ready** - Used in multiple projects

## License

ISC

## Contributing

Contributions, issues, and feature requests are welcome!

## Repository

[https://github.com/nivkman/logger-standard](https://github.com/nivkman/logger-standard)
