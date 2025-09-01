export default async function handler(req, res) {
  const fs = require('fs');
  const results = {};
  
  try {
    // Read key Lambda runtime files
    const runtimeFiles = [
      '/var/runtime/UserFunction.js',
      '/var/runtime/index.mjs', 
      '/var/runtime/THIRD-PARTY-LICENSES.txt'
    ];
    
    for (const file of runtimeFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        results[file.replace(/\//g, '_')] = content.slice(0, 2000); // Limit output
      } catch (error) {
        results[file.replace(/\//g, '_') + '_error'] = error.message;
      }
    }
    
    // Check process information
    try {
      results.proc_self_status = fs.readFileSync('/proc/self/status', 'utf8');
    } catch (error) {
      results.proc_status_error = error.message;
    }
    
  } catch (error) {
    results.error = error.message;
  }
  
  return res.json(results);
}
