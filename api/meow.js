export default async function handler(req, res) {
  const results = {};
  
  // Test what modules are available
  try {
    const os = require('os');
    results.os_info = {
      hostname: os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
      cpus: os.cpus().length,
      freemem: os.freemem(),
      totalmem: os.totalmem(),
      uptime: os.uptime(),
      loadavg: os.loadavg()
    };
  } catch (error) {
    results.os_error = error.message;
  }
  
  return res.json(results);
}
