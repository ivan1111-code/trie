const { trie, queue } = require("./init")
const { printTrieService } = require("./modules/trieService")

printTrieService(trie, "./utils/trie.json")

const autocompleteWord = trie.autocompleteONE("b")
console.log(autocompleteWord)
