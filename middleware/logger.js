//custom middleware
module.exports = format => {
  return (request, response, next) => {
    const { ip, method, url } = request;
    const agent = request.get("Use-Agent");

    if (format === "short") {
      console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    } else {
      console.log(`${ip} ${method} ${url} ${agent}`);
    }
    next();
  };
};
