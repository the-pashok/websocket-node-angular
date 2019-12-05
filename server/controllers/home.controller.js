module.exports.homeController = (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/client/index.html'));
};
