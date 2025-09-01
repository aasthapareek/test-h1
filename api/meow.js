export default async function handler(req, res) {
  const results = {};
  
  // Get all environment variables
  results.environment = process.env;
  
  // Get process information
  results.process_info = {
    version: process.version,
    platform: process.platform,
    arch: process.arch,
    pid: process.pid,
    ppid: process.ppid,
    cwd: process.cwd()
  };
  
  return res.status(200).json(results);
}
