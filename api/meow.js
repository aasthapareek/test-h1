export default async function handler(req, res) {
  const fs = require('fs');
  const results = {};
  
  try {
    // Check the rapid-client.node file (binary runtime component)
    try {
      const rapidStats = fs.statSync('/var/runtime/rapid-client.node');
      results.rapid_client = {
        size: rapidStats.size,
        isFile: rapidStats.isFile(),
        mode: rapidStats.mode
      };
    } catch (error) {
      results.rapid_client_error = error.message;
    }
    
    // Look for any AWS or Lambda config files
    const configPaths = [
      '/var/runtime/runtime-release',
      '/proc/self/cgroup',
      '/proc/self/mountinfo'
    ];
    
    for (const path of configPaths) {
      try {
        results[path.replace(/\//g, '_')] = fs.readFileSync(path, 'utf8');
      } catch (error) {
        results[path.replace(/\//g, '_') + '_error'] = error.message;
      }
    }
    
  } catch (error) {
    results.error = error.message;
  }
  
  return res.json(results);
}
