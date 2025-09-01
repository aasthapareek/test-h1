// Test what we can actually do with these credentials
export default async function handler(req, res) {
  try {
    // Try to make AWS API calls to see what's accessible
    const response = await fetch('https://sts.amazonaws.com/', {
      method: 'POST',
      headers: {
        'Authorization': `AWS4-HMAC-SHA256 Credential=${process.env.AWS_ACCESS_KEY_ID}/...`,
        'Content-Type': 'application/x-amz-json-1.1',
        'X-Amz-Target': 'AWSSecurityTokenService.GetCallerIdentity'
      }
    });
    
    return res.json({ aws_response: await response.text() });
  } catch (error) {
    return res.json({ error: error.message });
  }
}
