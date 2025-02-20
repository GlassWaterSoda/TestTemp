const express = require('express')
const app = express ()
const morgan = require('morgan')

//Built in middleware to handle or parse json data
app.use(express.json())

// Built in middleware to handle form data
app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'))

let users = []

app.post("/users", (req,res)=>{
    const user = {id: users.length + 1, ...req.body}
    users.push(user)
    res.status(201).json({message:"user Create", user})
})

app.get("/users", (req,res)=>{
    res.json(users)
})

// Get Single User (GET)
app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.json(user);
});

// Update User (PUT)
app.put("/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ message: "User not found!" });

    Object.assign(user, req.body);
    res.json({ message: "User updated!", user });
});

// Delete User (DELETE)
app.delete("/users/:id", (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.json({ message: "User deleted!" });
});


const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
