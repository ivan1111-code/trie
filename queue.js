class Request {
    constructor(request, priority) {
        this.request = request
        this.priority = priority
    }
}

class PriorityQueue {
    constructor(trie) {
        this.trie = trie
        this.queue = []
    }

    enqueue(request, priority) {
        if (![0, 1].includes(priority)) {
            return "priority must be 0 or 1"
        }

        if (typeof request !== "string") {
            return "request must be a string (prefix)"
        }

        if (request.length >= 30) {
            return "request word must be less then 30 symbols"
        }

        this.queue.push(new Request(request, priority))
    }

    dequeue() {
        for (let cur = 0; cur < this.queue.length; cur++) {
            if (this.queue[cur].priority === 1) {
                const complQueue = this.queue[cur]
                this.queue.splice(cur, 1)
                this.trie.autocomplete(complQueue)
                break
            }
        }
        return ""
    }
}

module.exports = { Request, PriorityQueue }