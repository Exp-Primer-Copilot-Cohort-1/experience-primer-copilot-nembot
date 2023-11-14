// Create web server 
// 1. Create web server
// 2. Create router
// 3. Create router handlers
// 4. Register router handlers with router
// 5. Register router with server
// 6. Start server

const express = require('express');
const app = express();
const comments = require('./comments');

// 2. Create router
const commentsRouter = express.Router();

// 3. Create router handlers
// 4. Register router handlers with router
commentsRouter.get('/', (req, res) => {
    res.json(comments.getAll());
});

commentsRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.getById(id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).send(`Comment with id ${id} does not exist`);
    }
});

commentsRouter.post('/', (req, res) => {
    const newComment = req.body;
    if (newComment) {
        const addedComment = comments.addComment(newComment);
        res.status(201).json(addedComment);
    } else {
        res.status(400).send('Comment could not be added');
    }
});

commentsRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    if (comment) {
        const updatedComment = comments.updateComment(id, comment);
        res.json(updatedComment);
    } else {
        res.status(400).send('Comment could not be updated');
    }
});

commentsRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    comments.deleteComment(id);
    res.status(204).send('Comment deleted');
});

// 5. Register router with server
app.use('/comments', commentsRouter);

// 6. Start server
app.listen(3000, () => {
    console.log('Server started');
});