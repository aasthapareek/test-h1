export default async function handler(req, res) {
  return res.json({
    memory_usage: process.memoryUsage(),
    resource_usage: process.resourceUsage?.() || 'not available',
    hrtime: process.hrtime(),
    cpu_usage: process.cpuUsage(),
    node_versions: process.versions
  });
}
