class Server {

    constructor({ express, studentsService, cors }) {
        this.express = express
        this.cors = cors
        this.app = express()
        this.studentsService = studentsService
    }

    start() {

        this.app.use(this.express.json()) // for parsing application/json
        this.app.use(this.express.urlencoded({ extended: true }))
        this.app.use(this.cors())

        this.app.post('/students', this.studentsService.create())
        this.app.get('/students', this.studentsService.list())
        this.app.get('/students/:id', this.studentsService.get())
        this.app.delete('/students/:id', this.studentsService.delete())
        this.app.put('/students/:id', this.studentsService.update())

        this.app.get('/', (req, res) => {
            res.send('UP!')
        })

        this.app.listen(process.env.PORT, () => {
            console.log(`API listening at http://localhost:${process.env.PORT}`)
        })

    }

}

module.exports = Server