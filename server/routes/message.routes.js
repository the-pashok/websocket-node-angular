const Emitter = require("events");
let emitter = new Emitter();

module.exports = (router) => {

  router.post('/send-message', (req, res) => {
    const message = req.body.message;
    const reversedMessage = message.split("").reverse().join("");
    emitter.emit('sendMessage', reversedMessage);
    res.json({success: true, message: req.body.message, reversedMessage});
  });

  return router;
};
