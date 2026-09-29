class TrieNode {
    constructor(char) {
        this.char = char
        this.freq = 0
        this.isEnd = false
        this.children = []
    }
}

class TrieRoot {
    constructor() {
        this.freq = 0
        this.isEnd = false
        this.children = []
    }
}

class Trie {
    constructor() {
        this.root = new TrieRoot()
    }

    throwAllWords(words) {
        for (let { word, freq } of words) {
            this.throwWord(word, freq)
        }
        console.log("all valid words was added")
    }

    throwWord(word, freq) {

        let errorDec = { errorMessage: "", isError: false }
        if (typeof word !== "string") {
            errorDec.errorMessage += `symbol <${JSON.stringify(word)}> is not a string! | `
            errorDec.isError = true
        } if (word.length < 1) {
            errorDec.errorMessage += `symbol <${word}> is not a word | `
            errorDec.isError = true
        } if (typeof freq !== "number") {
            errorDec.errorMessage += `value of atribute freq must be a number: freq: <${freq}> | `
            errorDec.isError = true
        } if (freq < 0) {
            errorDec.errorMessage += `freq <${freq}> less then 0 | `
            errorDec.isError = true
        } if (this.searchWord(word) === true) {
            errorDec.errorMessage += `word <${word}> already exist | `
            errorDec.isError = true
        } if (errorDec.isError) {
            console.log(`(throw word error, <data object> {word: ${word}, freq: ${freq}}) ${errorDec.errorMessage}\n`)
            return
        }

        let curNode = this.root

        for (let char of word) {

            let isCharExist = false

            for (let childNode of curNode.children) {
                if (childNode.char === char) {
                    curNode = childNode
                    isCharExist = true
                }
            }

            if (!isCharExist) {
                const newNode = new TrieNode(char)
                curNode.children.push(newNode)
                curNode = newNode
            }
            
            curNode.freq += freq
        }

        curNode.isEnd = true

        console.log(`(throw word success, <data object> {word: ${word}, freq: ${freq}} was added)`)
        return
    }

    searchWord(word) {
        let curNode = this.root

        for (let char of word) {

            let isChar = false

            for (let childNode of curNode.children) {
                if (childNode.char === char) {
                    curNode = childNode
                    isChar = true
                }
            }

            if (!isChar) {
                return false
            }
        }

        return curNode.isEnd
    }

    autocompleteONE(prefix) {
        let curNode = this.root

        for (let char of prefix) {

            let isChar = false

            for (let childNode of curNode.children) {
                if (childNode.char === char) {
                    curNode = childNode
                    isChar = true
                }
            }

            if (!isChar) {
                return false
            }
        }
    
        let word = prefix

        while (!curNode.isEnd) {

            let maxFreq = curNode.children[0].freq

            for (let childNode of curNode.children) {
                if (childNode.freq >= maxFreq) {
                    maxFreq = childNode.freq
                    curNode = childNode
                }
            }
        
            word += curNode.char
        }

        return word
    }

    clearTrie() {
        this.root = new TrieRoot()
    }
}

module.exports = { Trie, TrieRoot, TrieNode }