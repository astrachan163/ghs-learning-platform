interface LogBase {
  level: 'info'|'warn'|'error';
  message: string;
  traceId?: string;
  context?: Record<string, any>;
  ts: string;
}

function emit(log: LogBase) {
  process.stdout.write(JSON.stringify(log) + '\n');
}

export const logger = {
  info: (message: string, context: any = {}) => emit({ level: 'info', message, ts: new Date().toISOString(), ...context }),
  warn: (message: string, context: any = {}) => emit({ level: 'warn', message, ts: new Date().toISOString(), ...context }),
  error: (message: string, context: any = {}) => emit({ level: 'error', message, ts: new Date().toISOString(), ...context })
};