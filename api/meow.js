export default async function handler(req, res) {
  const fs = require('fs');
  const results = {};
  
  try {
    // Test write access to different directories
    const testDirs = ['/tmp', '/var/task', '/opt'];
    
    for (const dir of testDirs) {
      try {
        const testFile = `${dir}/test-write-${Date.now()}.txt`;
        fs.writeFileSync(testFile, 'test content');
        fs.unlinkSync(testFile); // Clean up
        results[`write_${dir.replace('/', '')}`] = 'success';
      } catch (error) {
        results[`write_${dir.replace('/', '')}_error`] = error.message;
      }
    }
    
    // Check what's actually in the squashfs mounts
    try {
      results.var_task_contents = fs.readdirSync('/var/task');
    } catch (error) {
      results.var_task_error = error.message;
    }
    
  } catch (error) {
    results.error = error.message;
  }
  
  return res.json(results);
}
