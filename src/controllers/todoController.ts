import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo';
import { Types } from 'mongoose';


export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  const { text, completed } = req.body;

  try {
    const newTodo: ITodo = new Todo({ text, completed });
    const savedTodo: ITodo = await newTodo.save();
    res.status(201).json({ todo: savedTodo });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTodo = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;
  if (!Types.ObjectId.isValid(id)) {
    // If the provided ID is not a valid ObjectId, return an error
    res.status(400).json({ error: 'Invalid ID format' });
    return;
  }

  const todo: ITodo | null = await Todo.findById(id);

  try {
    const todo: ITodo | null = await Todo.findById(id);
    if (todo) {
      res.status(200).json({ todo });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;
  const { text, completed } = req.body;

  try {
    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true }
    );

    if (updatedTodo) {
      res.status(200).json({ todo: updatedTodo });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;

  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(id);

    if (deletedTodo) {
      res.status(200).json({ todo: deletedTodo });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

