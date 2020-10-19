class StudentsServices {

    constructor({ studentModel }) {
        this.studentModel = studentModel
    }

    create() {
        return async (req, res) => {
            try {
                const student = this.studentModel.build(req.body)
                await student.save()
                return res.json(student.dataValues)
            } catch (error) {
                console.error(error)
                return res.status(500).end()
            }
        }
    }

    list() {
        return async (req, res) => {
            try {
                const students = await this.studentModel.findAll()
                return res.json(students.map(student => student.dataValues))
            } catch (error) {
                console.error(error)
                return res.status(500).end()
            }
        }
    }

    delete() {
        return async (req, res) => {
            try {
                await this.studentModel.destroy({ where: { id: req.params.id }})
                return res.status(200).end()
            } catch (error) {
                console.error(error)
                return res.status(500).end()
            }
        }
    }

    update() {
        return async (req, res) => {
            try {
                console.log(req.params)
                await this.studentModel.update(
                    req.body,
                    { where: { id: req.params.id } }
                )
                return res.status(200).end()
            } catch (error) {
                console.error(error)
                return res.status(500).end()
            }
        }
    }

    get() {
        return async (req, res) => {
            try {
                const student = await this.studentModel.findOne({ where: { id: req.params.id }})
                if (!student) {
                    return res.status(404).end()
                }
                return res.json(student.dataValues)
            } catch (error) {
                console.error(error)
                return res.status(500).end()
            }
        }
    }

}

module.exports = StudentsServices