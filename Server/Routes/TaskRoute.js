const exp = require('express');

const {
    UpdateTask,
    DeleteTask,
    CreateTask,
    getTasks,
    checkTask

} = require("../Controllers/TaskControl");

const router = exp.Router();
const validToken =require('../Middleware/ValidateToken')

router.use(validToken)


router.route("/").get(getTasks)

router.route("/").post(CreateTask)

router.route("/:id").delete(DeleteTask)

router.route("/:id").put(UpdateTask)

router.route("/check/:id").put(checkTask)

module.exports = router;