export default async function handler(req, res) {
  return res.json({
    request_headers: req.headers,
    request_method: req.method,
    request_url: req.url,
    request_query: req.query,
    request_properties: Object.getOwnPropertyNames(req).slice(0, 15),
    response_methods: Object.getOwnPropertyNames(res.__proto__).slice(0, 15)
  });
}
