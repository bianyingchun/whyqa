const express = require('express');
const router = express.Router();
const fs = require('fs');
const articles = require('../data/articles.json');
const paragraphs = require('../data/paragraph.json');
const path = require('path');
router.get('/', function(req, res, next) {
    res.send('hello word!!!')
})

router.get('/articles', function(req, res, next) {
    let data = {
        articles: articles,
        err: 0
    }
    res.json(data)
})

router.get('/article_paragraphs', function(req, res, next) {
    const aid = parseInt(req.query.aid);
    const pids = articles[aid].paragraph;
    //pids是连续的，不必逐个获取，直接截取
    const start = pids[0]
    const end = start + pids.length;
    let ps = paragraphs.slice(start, end);
    let fullps = ps.filter(item => {
            return item !== null;
        })
        // console.log(pids, start, end, articles[aid].title)
    res.json({
        paragraphs: fullps,
        err: 0
    })
})

router.post('/add_qa', function(req, res, next) {
    let pid = req.body.pid;
    let qa = req.body.qa;
    let paragraph = paragraphs[pid];
    paragraph.qas.push(qa);
    let fpath = path.join(__dirname, '../data/paragraph.json')
    fs.writeFile(fpath, JSON.stringify(paragraphs), function(err, data) {
        if (err) {
            res.json({
                err: err
            })
        } else {
            res.json({
                paragraph: paragraph,
                err: 0
            })
        }
    })
})

router.post('/update_qa', function(req, res, next) {
    let pid = req.body.pid;
    let qa = req.body.qa;
    let index = req.body.index;
    let paragraph = paragraphs[pid];
    paragraph.qas[index] = qa;
    let fpath = path.join(__dirname, '../data/paragraph.json')
    fs.writeFile(fpath, JSON.stringify(paragraphs), function(err, data) {
        if (err) {
            res.json({
                err: err
            })
        } else {
            res.json({
                paragraph: paragraph,
                err: 0
            })
        }
    })
})

router.post('/delete_qa', function(req, res, next) {
    let pid = req.body.pid;
    let index = req.body.index;
    let paragraph = paragraphs[pid];
    paragraph.qas.splice(index, 1)
    let fpath = path.join(__dirname, '../data/paragraph.json')
    fs.writeFile(fpath, JSON.stringify(paragraphs), function(err, data) {
        if (err) {
            res.json({
                err: err
            })
        } else {
            res.json({
                paragraph: paragraph,
                err: 0
            })
        }
    })
})

router.post('/merge', function(req, res, next) {
    let { from, to } = req.body;

    function merge(from, to) {
        let to_p =  [to];
        let from_p = paragraphs[from];
        const len = to_p.context.length;
        to_p.context += from_p.context;
        from_p.qas.forEach(item => {
            item.answer_start += len;
            to_p.qas.push(item)
        })
        paragraphs[from] = null
        return to_p
    }
    let paragraph = merge(from, to);
    let fpath = path.join(__dirname, '../data/paragraph.json')
    fs.writeFile(fpath, JSON.stringify(paragraphs), function(err, data) {
        if (err) {
            res.json({
                err: err
            })
        } else {
            res.json({
                paragraph: paragraph,
                err: 0
            })
        }
    })
})

router.post('/togglefav', function(req, res, next) {
    let aid = req.body.aid;
    let article = articles[aid];
    article.fav = !article.fav;
    res.json({
        fav: article.fav,
        err: 0
    })
})

 
module.exports = router;
