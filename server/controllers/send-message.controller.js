const Emitter = require('../Events/events.emitter');

module.exports.sendMessageController = (req, res) => {
    const { message } = req.body;
    const reversedMessage = message.split("").reverse().join("");
    Emitter.emit('sendMessage', reversedMessage);
    res.json({success: true, reversedMessage});
};
