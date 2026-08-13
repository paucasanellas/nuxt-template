export class Clock {
  now(): Date {
    return new Date()
  }

  uptimeSeconds(): number {
    return Math.round(
      process.uptime(),
    )
  }
}
