const connectToMongo = require('./db');
const express = require('express');
const Post = require('./models/encnoteModel')
const cors = require('cors');
var SHA512 = require("crypto-js/sha512");
const { default: mongoose } = require('mongoose');

connectToMongo();
const app = express()
const port = 8080

app.use(express.json())
app.use(cors());

app.get('*', async (req, res) => {

    urlHash = SHA512("http://127.0.0.1:3000" + req.originalUrl).toString();
    let msg = await Post.findOne({ urlHash: urlHash });
    if (msg) {
        res.send({ "encNote": msg.encNote })
    } else {
        res.send({ "encNote": "none" })
    }
})

app.post('*', async (req, res) => {
    try {
        let post = req.body
        // c / onsole.log(post)
        let { encNote, hashOfContent, urlHash, oldMsgHash } = post
        console.log(encNote, hashOfContent, urlHash, oldMsgHash)
        if (!(encNote.search("[{}$@#!=\.^&*()`\'\";%]") || hashOfContent.search("[{}$@#!=\.^&*()`\'\";%]") || urlHash.search("[{}$@#!=\.^&*()`\'\";%]"))) {
            res.status(403).json({ "message": "Nice try :)" })
        } else {
            let msg = await Post.findOne({ urlHash: urlHash });
            if (msg != null && msg["hashOfContent"] != oldMsgHash) {
                res.status(403).json("Nice try still :|")
            } else if (msg != null && msg["hashOfContent"] === oldMsgHash) {
                console.log(msg["hashOfContent"])
                await Post.findOneAndUpdate({ urlHash: urlHash }, { encNote: encNote, hashOfContent: hashOfContent })
                msg = Post.find({ urlHash: urlHash })
                console.log(msg["hashOfContent"])
                res.status(200).json({ "Action": "Successful" })
            } else {
                post = Post({ encNote: encNote, hashOfContent: hashOfContent, urlHash: urlHash })
                await post.save()
                res.json({ post })
            }
        }
    } catch (err) {
        res.status(500).json({ 'message': 'Mising parameters' })
        console.log(err);
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})