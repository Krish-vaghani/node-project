const errorhandle = (req, res) => {
  return res.json({
    status: false,
    message:
      "You are not authorized to access this resource  error handler working",
  });
};

module.exports = { errorhandle };
