export default async function handler(req, res) {
  const results = {};
  
  try {
    // Test DNS resolution
    const dns = require('dns').promises;
    results.dns_available = true;
    
    // Resolve a few domains
    const testDomains = ['google.com', 'vercel.com', 'github.com'];
    results.dns_results = {};
    
    for (const domain of testDomains) {
      try {
        const addresses = await dns.resolve4(domain);
        results.dns_results[domain] = addresses.slice(0, 3); // First 3 IPs
      } catch (error) {
        results.dns_results[domain + '_error'] = error.message;
      }
    }
    
  } catch (error) {
    results.dns_error = error.message;
  }
  
  // Test network interfaces if available
  try {
    const os = require('os');
    results.network_interfaces = os.networkInterfaces();
  } catch (error) {
    results.network_error = error.message;
  }
  
  return res.json(results);
}
