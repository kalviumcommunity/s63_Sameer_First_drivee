import Checklist from '../Models/Checklist.js';
import { validationResult } from 'express-validator';

// Get all checklist items for a user
export const getChecklistItems = async (req, res) => {
  try {
    const items = await Checklist.find({ user: req.user.id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new checklist item
export const createChecklistItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newItem = new Checklist({
      ...req.body,
      user: req.user.id
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update checklist item
export const updateChecklistItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const item = await Checklist.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!item) {
      return res.status(404).json({ message: 'Checklist item not found' });
    }
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete checklist item
export const deleteChecklistItem = async (req, res) => {
  try {
    const item = await Checklist.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!item) {
      return res.status(404).json({ message: 'Checklist item not found' });
    }
    
    res.json({ message: 'Checklist item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 