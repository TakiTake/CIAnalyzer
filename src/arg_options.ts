import path from 'path'

type Argv = {
  [x: string]: unknown
}

export class ArgumentOptions {
  onlyServices?: string[]
  debug: boolean
  configPath: string
  configDir: string
  onlyExporters?: string[]
  logLevel: "debug" | "info"
  keepAlive: boolean
  maxConcurrentRequests?: number

  constructor(argv: Argv) {
    this.configPath = path.resolve(argv['c'] as string)
    this.onlyServices = argv['only-services'] as string[]
    this.debug = argv['debug'] || process.env['CI_ANALYZER_DEBUG'] ? true : false
    this.configDir = path.dirname(this.configPath)
    this.onlyExporters = argv['only-exporters'] as string[]
    this.logLevel = (argv['v'] as number > 0) ? 'debug' : 'info'
    this.keepAlive = argv['keepalive'] as boolean
    this.maxConcurrentRequests = (argv['max-concurrent-requests'] as number > 0)
      ? argv['max-concurrent-requests'] as number
      : undefined
  }
}