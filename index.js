const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/taskdb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

app.get("/tasks", async (_req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json({
      success: true,
      count: task.length,
      data: task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
});
app.get("/greet/:name", (req, res) => {
  res.send("hello " + req.params.name);
});
function validateTask(req, res, next) {
  if (req.body.title !== undefined) {
    if (typeof req.body.title !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid title!", field: "title" });
    }
    if (req.body.title.trim().length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Title is empty!", field: "title" });
    }
  }

  if (req.body.status !== undefined) {
    if (typeof req.body.status !== "boolean") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status!", field: "status" });
    }
  }

  next();
}

async function checkTaskExist(req, res, next) {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send("Not found!");
    }
    req.task = task;
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "Error found" });
  }
}

app.post("/tasks/create", validateTask, async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = await Task.create({ title });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: "server error" });
  }
});
app.patch("/tasks/update/:id", checkTaskExist, validateTask, async (req, res) => {
  if (req.body.title !== undefined) req.task.title = req.body.title;
  if (req.body.status !== undefined) req.task.status = req.body.status;
  await req.task.save();
  res.status(200).json({
    success: true,
    message: "Updated ",
    data: req.task,
  });
});
app.get("/tasks/getById/:id",checkTaskExist,async(req,res)=>{
  // const task=await Task.findById(req.params.id);
 
    return res.json({data:req.task,status:200});
  
});
app.delete("/tasks/delete/:id", checkTaskExist, async (req, res) => {
  try{
   await req.task.deleteOne();
  res.json({ success: true, message: "Task removed successfully" });
  }
  catch(err){
    res.status(500).json({success:false,message:"server error"});
  }
  
});
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
