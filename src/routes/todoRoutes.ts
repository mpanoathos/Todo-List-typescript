import express from 'express';
import {getTodos,createTodo,getTodo,updateTodo,deleteTodo} from '../controllers/todoController';

const router=express.Router();

router.get('/',getTodos);
router.get('/',createTodo);
router.get('/:id',getTodo);
router.get('/:id',updateTodo);
router.get('/:id',deleteTodo);

export default router;




