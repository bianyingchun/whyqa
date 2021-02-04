const express = require("express");
const router = express.Router();

router.get("/api", (req, res, next) => {
    console.log(req.query);
    status = req.query.status;
    setTimeout(() => {
        res.status(status || 200);
        res.json({ data: "请求get成功", err: 0 });
    }, 1000);
});

router.post("/api", (req, res, next) => {
    console.log(req.body);
    status = req.query.status;
    setTimeout(() => {
        res.status(status || 200);
        res.json({ data: "请求post成功", err: 0 });
    }, 1000);
});
module.exports = router;
