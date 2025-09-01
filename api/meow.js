export default async function handler(req, res) {
  const results = {};
  
  try {
    // Test module system
    results.module_info = {
      module_available: typeof module !== 'undefined',
      require_available: typeof require !== 'undefined',
      exports_available: typeof exports !== 'undefined',
      __dirname: typeof __dirname !== 'undefined' ? __dirname : 'not available',
      __filename: typeof __filename !== 'undefined' ? __filename : 'not available'
    };
    
    // Test what modules can be required
    const testModules = ['crypto', 'util', 'url', 'querystring', 'buffer'];
    results.available_modules = {};
    
    for (const mod of testModules) {
      try {
        const loadedModule = require(mod);
        results.available_modules[mod] = Object.keys(loadedModule).slice(0, 10);
      } catch (error) {
        results.available_modules[mod + '_error'] = error.message;
      }
    }
    
    // Test require.resolve for module paths
    results.module_paths = {};
    for (const mod of ['crypto', 'fs', 'path']) {
      try {
        results.module_paths[mod] = require.resolve(mod);
      } catch (error) {
        results.module_paths[mod + '_error'] = error.message;
      }
    }
    
  } catch (error) {
    results.error = error.message;
  }
  
  return res.json(results);
}
