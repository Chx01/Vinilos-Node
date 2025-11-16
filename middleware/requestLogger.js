const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
  ),
  transports: [new winston.transports.Console()],
});

module.exports = function requestLogger(req, res, next) {
  const start = process.hrtime.bigint();
  const { method, originalUrl } = req;
  const ip = req.ip || req.connection?.remoteAddress || '';

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1_000_000;
    const { statusCode } = res;
    logger.info(`${method} ${originalUrl} ${statusCode} ${durationMs.toFixed(2)}ms ip=${ip}`);
  });

  next();
};
