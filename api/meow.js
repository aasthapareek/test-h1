export default async function handler(req, res) {
  const results = {};
  
  try {
    const path = require('path');
    const fs = require('fs');
    
    // Test path operations
    results.path_info = {
      separator: path.sep,
      delimiter: path.delimiter,
      current_dir: __dirname,
      filename: __filename,
      resolve_test: path.resolve('.', 'test'),
      join_test: path.join('/var', 'task', 'api')
    };
    
    // Test file stats on accessible paths
    const testPaths = ['/var/task', '/tmp', '/opt', '/var/runtime'];
    results.path_stats = {};
    
    for (const testPath of testPaths) {
      try {
        const stats = fs.statSync(testPath);
        results.path_stats[testPath] = {
          isDirectory: stats.isDirectory(),
          size: stats.size,
          mode: stats.mode,
          uid: stats.uid,
          gid: stats.gid
        };
      } catch (error) {
        results.path_stats[testPath + '_error'] = error.message;
      }
    }
    
  } catch (error) {
    results.error = error.message;
  }
  
  return res.json(results);
}
