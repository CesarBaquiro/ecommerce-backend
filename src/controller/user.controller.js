import { userModel } from "../models/user.model.js";
import { faker } from "@faker-js/faker";

export class UserController {
  static async getAll(req, res) {
    try {
      const users = await userModel.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener los usuarios",
        details: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener el usuario", details: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.findByIdAndDelete(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({
        error: "Error al eliminar el usuario",
        details: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { first_name, last_name, email, age, password } = req.body;

      const user = await userModel.findByIdAndUpdate(
        id,
        {
          first_name,
          last_name,
          email,
          age,
          password,
        },
        { new: true }
      ); // `new: true` devuelve el usuario actualizado

      res.json(user);
    } catch (error) {
      res.status(500).json({
        error: "Error al actualizar el usuario",
        details: error.message,
      });
    }
  }

  // Método para crear un usuario mock
  static async createMock(req, res) {
    try {
      const name = faker.person.firstName().toLowerCase();
      const lastname = faker.person.lastName().toLowerCase();
      const age = faker.number.int({ min: 0, max: 90 });
      const role = faker.helpers.arrayElement(['user', 'admin']);  // Selecciona aleatoriamente entre 'user' y 'admin'
      const data = {
        first_name: name,
        last_name: lastname,
        email: `${name}.${lastname}@coder.com`,
        age: age,
        password: "coder123",
        role: role
      };
      const one = await userModel.create(data);
      return res.status(201).json({
        response: one,
        message: "USER CREATED",
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al crear el usuario mock",
        details: error.message,
      });
    }
  }

  // Método para crear múltiples usuarios mock
  static async createMocks(req, res) {
    try {
      const { quantity } = req.params;
      for (let i = 0; i < quantity; i++) {
        const name = faker.person.firstName().toLowerCase();
        const lastname = faker.person.lastName().toLowerCase();
        const age = faker.number.int({ min: 0, max: 90 });
        const role = faker.helpers.arrayElement(['user', 'admin']);  // Selecciona aleatoriamente entre 'user' y 'admin'
        const data = {
          first_name: name,
          last_name: lastname,
          email: `${name}.${lastname}@coder.com`,
          age: age,
          password: "coder123",
          role: role
        };
        await userModel.create(data);
      }
      return res.status(201).json({
        message: `${quantity} MOCK USERS CREATED`,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al crear usuarios mock",
        details: error.message,
      });
    }
  }

     // Método para crear 50 usuarios mock
  static async mockingUsers(req, res) {
    try {
      const quantity = 50;  // Fija la cantidad en 50 usuarios
      const createdUsers = [];  // Para almacenar los usuarios creados

      for (let i = 0; i < quantity; i++) {
        const name = faker.person.firstName().toLowerCase();
        const lastname = faker.person.lastName().toLowerCase();
        const age = faker.number.int({ min: 0, max: 90 });
        const role = faker.helpers.arrayElement(['user', 'admin']);  // Selecciona aleatoriamente entre 'user' y 'admin'
        const data = {
          first_name: name,
          last_name: lastname,
          email: `${name}.${lastname}@coder.com`,
          age: age,
          password: 'coder123',
          role: role,
        };

        // Crear el usuario y guardar en la base de datos
        const createdUser = await userModel.create(data);

        // Almacenar el usuario creado en la lista
        createdUsers.push(createdUser);

        // Imprimir el usuario creado en consola con el formato que MongoDB devolvería
        console.log('Usuario creado:', createdUser);
      }

      // Responder con el mensaje de éxito y los usuarios creados
      return res.status(201).json({
        message: `${quantity} MOCK USERS CREATED`,
        users: createdUsers,  // Incluir los usuarios creados en la respuesta
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Error al crear usuarios mock',
        details: error.message,
      });
    }
  }

  static async generateData(req, res) {
    try {
      const { users, pets } = req.body;

      // Validar que 'users' y 'pets' son números positivos
      if (isNaN(users) || isNaN(pets) || users <= 0 || pets < 0) {
        return res.status(400).json({
          error: "El parámetro 'users' debe ser un número positivo y 'pets' no puede ser negativo.",
        });
      }

      const generatedUsers = [];

      // Generar los usuarios
      for (let i = 0; i < users; i++) {
        const name = faker.person.firstName().toLowerCase();
        const lastname = faker.person.lastName().toLowerCase();
        const age = faker.number.int({ min: 18, max: 80 });
        const role = faker.helpers.arrayElement(['user', 'admin']); // Seleccionar aleatorio entre 'user' y 'admin'

        // Generar las mascotas para el usuario (si 'pets' es 0, el campo será null)
        const petsList = pets > 0
          ? Array.from({ length: pets }, () => faker.animal.type()) // Crear un arreglo de mascotas
          : null; // Si no hay mascotas, el campo se pone como null

        const data = {
          first_name: name,
          last_name: lastname,
          email: `${name}.${lastname}@coder.com`,
          age: age,
          password: "coder123",
          role: role,
          pets: petsList, // Asignar la lista de mascotas
        };

        // Crear el usuario en la base de datos
        const createdUser = await userModel.create(data);
        generatedUsers.push(createdUser); // Agregar el usuario creado a la lista
      }

      return res.status(201).json({
        message: `${users} users with ${pets} pets have been created.`,
        users: generatedUsers, // Devuelve los usuarios creados
      });
    } catch (error) {
      console.error("Error generating data:", error);
      res.status(500).json({
        error: "Error al generar los datos",
        details: error.message,
      });
    }
  }
}
