export default async function handler(req, res) {
  return res.json({
    process_methods: Object.getOwnPropertyNames(process),
    argv: process.argv,
    execArgv: process.execArgv,
    config: process.config
  });
}
