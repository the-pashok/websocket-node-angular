module.exports = (router) => {

  router.post('/send-message', (req, res) => {
    const message = req.body.message;
    const reversedMessage = message.split("").reverse().join("");
    res.json({success: true, message: req.body.message, reversedMessage});
  });

  return router;
};
