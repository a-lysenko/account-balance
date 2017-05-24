function setup(jugListCtrl, app) {
    app.get('/jug-list', getJugList);

    function getJugList(req, res) {
        jugListCtrl.getJugList()
            .then((jugList) => {
                res.send(jugList);
            });
    }
}
module.exports = {setup};