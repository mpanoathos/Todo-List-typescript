import express from 'express';
import {getTodos,createTodo,getTodo,updateTodo,deleteTodo} from '../controllers/todoController';

const router=express.Router();

router.get('/',getTodos);
router.post('/',createTodo);
router.get('/:id',getTodo);
router.patch('/:id',updateTodo);
router.delete('/:id',deleteTodo);

export default router;




