const fs = require("fs")
const { Trie } = require("./modules/trie")
const { PriorityQueue } = require("./modules/queue")

const trie = new Trie()

const { words } = JSON.parse(fs.readFileSync("./utils/words.json"))

trie.throwAllWords(words)

const queue = new PriorityQueue(trie)

module.exports = { trie, queue }