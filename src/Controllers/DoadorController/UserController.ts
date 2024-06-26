import { Request, Response } from 'express';
import {ref, set, get, child, update, remove } from 'firebase/database';
import User from '../../Models/User/User';
import { db } from '../../db/firebase';

class UserController {

  constructor() {
  }

  async insert(req: Request, res: Response) {
    try {
      const newObject = User.fromJson(req.body);
      const refUser = ref(db,'User')
      await set(refUser,newObject);
      return res.status(200).json(newObject);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getOneById(req: Request, res: Response) {
    try {
      const codigo: number = parseInt(req.params.codigo);
      const userRef = ref(db, `User/${codigo}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const user = snapshot.val();
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const codigo: number = parseInt(req.params.codigo);
      const userRef = ref(db, `User/${codigo}`);
      await remove(userRef);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
