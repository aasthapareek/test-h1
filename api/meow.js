export default async function handler(req, res) {
  const results = {};
  
  // Test crypto capabilities
  if (typeof crypto !== 'undefined') {
    results.crypto_available = true;
    results.crypto_methods = Object.getOwnPropertyNames(crypto);
    
    // Test random generation
    try {
      const randomBytes = crypto.getRandomValues(new Uint8Array(8));
      results.random_test = Array.from(randomBytes);
    } catch (error) {
      results.random_error = error.message;
    }
  }
  
  // Test navigator object
  if (typeof navigator !== 'undefined') {
    results.navigator_info = {
      userAgent: navigator.userAgent || 'not available',
      platform: navigator.platform || 'not available',
      languages: navigator.languages || 'not available'
    };
  }
  
  return res.json(results);
}
