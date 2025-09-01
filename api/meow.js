export default async function handler(req, res) {
  const results = {};
  
  // Test performance object
  if (typeof performance !== 'undefined') {
    results.performance_available = true;
    results.performance_now = performance.now();
    results.performance_methods = Object.getOwnPropertyNames(performance);
    
    // Test timing
    const start = performance.now();
    // Small delay
    for (let i = 0; i < 100000; i++) {}
    const end = performance.now();
    results.timing_test = end - start;
  }
  
  // Test garbage collection if available
  if (typeof gc !== 'undefined') {
    results.gc_available = true;
    const memBefore = process.memoryUsage();
    gc();
    const memAfter = process.memoryUsage();
    results.gc_effect = {
      heap_before: memBefore.heapUsed,
      heap_after: memAfter.heapUsed,
      difference: memBefore.heapUsed - memAfter.heapUsed
    };
  }
  
  return res.json(results);
}
