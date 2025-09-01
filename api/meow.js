export default async function handler(req, res) {
  try {
    // Test AWS STS GetCallerIdentity to see what role/permissions we have
    const region = process.env.AWS_REGION || 'us-east-1';
    const accessKey = process.env.AWS_ACCESS_KEY_ID;
    const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
    const sessionToken = process.env.AWS_SESSION_TOKEN;
    
    // Simple AWS API call to identify our role
    const timestamp = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '');
    const date = timestamp.substr(0, 8);
    
    const response = await fetch(`https://sts.${region}.amazonaws.com/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-amz-json-1.1',
        'X-Amz-Target': 'AWSSecurityTokenService.GetCallerIdentity',
        'X-Amz-Security-Token': sessionToken
      },
      body: '{}'
    });
    
    const result = await response.text();
    
    return res.json({
      aws_identity: result,
      credentials_info: {
        has_access_key: !!accessKey,
        has_secret_key: !!secretKey,
        has_session_token: !!sessionToken,
        region: region
      }
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
}
