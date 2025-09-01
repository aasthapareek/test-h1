export default async function handler(req, res) {
  const fs = require('fs');
  const results = {};
  
  try {
    // Test access to the IPC socket
    const ipcPath = process.env.VERCEL_IPC_PATH;
    if (ipcPath) {
      try {
        const stats = fs.statSync(ipcPath);
        results.ipc_socket = {
          exists: true,
          isSocket: stats.isSocket(),
          mode: stats.mode,
          size: stats.size
        };
      } catch (error) {
        results.ipc_socket_error = error.message;
      }
    }
    
    // Check /tmp directory contents
    try {
      results.tmp_contents = fs.readdirSync('/tmp');
    } catch (error) {
      results.tmp_error = error.message;
    }
    
    // Test library directories
    try {
      results.opt_contents = fs.readdirSync('/opt').slice(0, 5);
    } catch (error) {
      results.opt_error = error.message;
    }
    
  } catch (error) {
    results.error = error.message;
  }
  
  return res.json(results);
}
