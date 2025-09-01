export default async function handler(req, res) {
  return res.json({
    global_keys: Object.keys(global).slice(0, 20),
    console_methods: Object.getOwnPropertyNames(console),
    buffer_available: typeof Buffer !== 'undefined',
    timers: {
      setTimeout: typeof setTimeout,
      setInterval: typeof setInterval,
      setImmediate: typeof setImmediate
    }
  });
}
