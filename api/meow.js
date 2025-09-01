export default async function handler(req, res) {
  const fs = require('fs');
  const results = {};
  
  try {
    // Explore the rust directory
    results.rust_contents = fs.readdirSync('/opt/rust');
    
    // Check if we can access any system directories
    const systemDirs = ['/var', '/var/runtime', '/var/lang'];
    for (const dir of systemDirs) {
      try {
        results[`${dir.replace(/\//g, '_')}_contents`] = fs.readdirSync(dir).slice(0, 10);
      } catch (error) {
        results[`${dir.replace(/\//g, '_')}_error`] = error.message;
      }
    }
    
    // Check what we can read from /proc if it exists
    try {
      results.proc_contents = fs.readdirSync('/proc').slice(0, 10);
    } catch (error) {
      results.proc_error = error.message;
    }
    
  } catch (error) {
    results.error = error.message;
  }
  
  return res.json(results);
}
