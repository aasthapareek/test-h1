export default async function handler(req, res) {
  try {
    const results = {};
    
    // Test EC2 metadata service (might be accessible from Lambda)
    try {
      const metadataResponse = await fetch('http://169.254.169.254/latest/meta-data/', {
        timeout: 3000,
        headers: {
          'X-aws-ec2-metadata-token-ttl-seconds': '21600'
        }
      });
      results.metadata = {
        status: metadataResponse.status,
        body: await metadataResponse.text()
      };
    } catch (error) {
      results.metadata_error = error.message;
    }
    
    // Test what process/container info we can gather
    results.runtime_info = {
      lambda_runtime_dir: process.env.LAMBDA_RUNTIME_DIR,
      lambda_task_root: process.env.LAMBDA_TASK_ROOT,
      handler: process.env._HANDLER,
      aws_execution_env: process.env.AWS_EXECUTION_ENV,
      aws_lambda_function_name: process.env.AWS_LAMBDA_FUNCTION_NAME,
      aws_lambda_function_version: process.env.AWS_LAMBDA_FUNCTION_VERSION
    };
    
    return res.json(results);
    
  } catch (error) {
    return res.json({ error: error.message });
  }
}
