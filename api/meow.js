export default async function handler(req, res) {
  try {
    // Test what AWS services we can access with these credentials
    const tests = {};
    
    // Test 1: Try to list S3 buckets (common permission)
    try {
      const s3Response = await fetch('https://s3.amazonaws.com/', {
        method: 'GET',
        headers: {
          'Authorization': `AWS ${process.env.AWS_ACCESS_KEY_ID}:signature`,
          'X-Amz-Security-Token': process.env.AWS_SESSION_TOKEN
        }
      });
      tests.s3_access = {
        status: s3Response.status,
        headers: Object.fromEntries(s3Response.headers.entries()),
        body: await s3Response.text()
      };
    } catch (error) {
      tests.s3_error = error.message;
    }
    
    // Test 2: Try Lambda list functions
    try {
      const lambdaResponse = await fetch('https://lambda.us-east-1.amazonaws.com/2015-03-31/functions', {
        method: 'GET',
        headers: {
          'X-Amz-Security-Token': process.env.AWS_SESSION_TOKEN
        }
      });
      tests.lambda_access = {
        status: lambdaResponse.status,
        body: await lambdaResponse.text()
      };
    } catch (error) {
      tests.lambda_error = error.message;
    }
    
    return res.json({
      aws_tests: tests,
      environment_check: {
        has_credentials: !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY),
        region: process.env.AWS_REGION
      }
    });
    
  } catch (error) {
    return res.json({ error: error.message });
  }
}
