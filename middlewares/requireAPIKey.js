const requireAPIKey = (req, res, next) => {
  if (!req.query.apiKey) {
    res.send("API key is missing");
    return;
  } else {
    next();
  }
};

module.exports = requireAPIKey;
