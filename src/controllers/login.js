const User = require("../model/User");
const bcrypt = require('bcryptjs')

module.exports = {
    async pagLoginGet(req, res) {
        res.render('../views/Login', { erro: false });
    },
    async pagLoginPost(req, res) {
        // console.log(req.session)

        if (Number(req.body.EDV) == NaN)
            return res.render('../views/Login', { erro: true });


        const user = await User.findOne({
            raw: true,
            attributes: ['id', 'EDV', 'password'],
            where: {
                EDV: req.body.EDV
            }
        })
        if (user == null) {
            return res.render('../views/Login', { erro: true });
        }
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            return res.render('../views/Login', { erro: true });
        }

        session = req.session;
        session.EDV = user.EDV;

        // console.log(session)

        res.redirect('/');

    },
    async pagLogoutGet(req, res) {
        req.session.destroy();
        res.render('../views/Login', { erro: false });
    }
}