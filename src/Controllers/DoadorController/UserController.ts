import { Request, Response } from 'express';
import { ref, set, get, push, remove } from 'firebase/database';
import User from '../../Models/User/User';
import { db } from '../../db/firebase';

class UserController {
  constructor() {}

  async insert(req: Request, res: Response) {
    try {
      const newUser = User.fromJson(req.body);
      const refUser = ref(db, 'User');
      const newUserRef = push(refUser); // Gera uma nova chave única
      if (newUserRef.key) {
        newUser.codigo = newUserRef.key; // Atribui a chave gerada ao novo usuário
        await set(newUserRef, newUser);
        console.log(`New user added with ID: ${newUser.codigo}`); // Log do ID do novo usuário
        return res.status(200).json(newUser);
      } else {
        throw new Error("Failed to generate a unique key for the new user");
      }
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getOneById(req: Request, res: Response) {
    try {
      console.log('Request body:', req.body); // Log do corpo da requisição
      const userId: string = req.body.id; // Pega a ID do corpo da requisição
      if (!userId) {
        return res.status(400).json({ error: 'ID do usuário não fornecido' });
      }
      console.log(`Fetching user with ID: ${userId}`); // Log do ID do usuário sendo buscado
      const userRef = ref(db, `User/${userId}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const user = snapshot.val();
        console.log('User found:', user); // Log dos dados do usuário encontrado
        return res.status(200).json(user);
      } else {
        console.log(`User not found with ID: ${userId}`); // Log caso o usuário não seja encontrado
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId: string = req.params.id; // Pega a ID como string
      console.log(`Deleting user with ID: ${userId}`); // Log do ID do usuário sendo deletado
      const userRef = ref(db, `User/${userId}`);
      await remove(userRef);
      console.log(`User deleted with ID: ${userId}`); // Log de confirmação de usuário deletado
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
