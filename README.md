# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Início Rápido](#2-início-rápido)
    - [Instalando Dependências](#21-instalando-dependências)
    - [Variáveis de Ambiente](#22-variáveis-de-ambiente)
    - [Migrations](#23-migrations)
- [Autenticação](#3-autenticação)
- [Endpoints](#4-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://zod.dev/)

A URL base da aplicação:
https://motors-shop-b4yd.onrender.com/

---

## 2. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 2.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 2.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 2.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---
## 3. Autenticação
[ Voltar para o topo ](#tabela-de-conteúdos)


Por enquanto, não foi implementada autenticação.

---

## 4. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - [POST - /users](#11-criação-de-usuário)
    - [GET - /users](#12-listando-usuários)
	- [GET - /users/:id](#13-listar-usuário-por-id)
 - [PATCH - /users/:id](#14-atualizando-usuário)
 - [DELETE - /users/:id](#15-apagando-usuário)
- [Products](#2-products)
- [Cart](#3-cart)
- [Users](#4-buys)

---

## 1. **Users**
[ Voltar para os Endpoints ](#4-endpoints)

O objeto User é definido como:

| Campo        | Tipo   | Descrição                                        |
| -------------|---------|-------------------------------------------------|
| id           | string  | Identificador único do usuário                  |
| name         | string  | O nome do usuário.                              |
| email        | string  | O e-mail do usuário.                            |
| password     | string  | A senha de acesso do usuário                    |
| abbreviation | string  | Abreviação do nome do usuário.                  |
| cpf          | string  | O cpf do usuário.                               |
| phone        | string  | O número do telefone usuário.                   |
| birthday     | string  | Data de aniversário do usuário.                 |
| descripition | string  | Descrição sobre o usuário.                      |
| seller       | boolean | Booleano se o usuário é um vendedor.            |
| address      | address | Endereço do usuário.                            |
| createdAt    | date    | Data de criação da conta.                       |
| updatedAt    | date    | Data de atualização da conta.                   |
| deletedAt    | date    | Data de remoção da conta.                       |


### Endpoints

| Método   | Rota       | Descrição                                           |
|----------|------------|-----------------------------------------------------|
| POST     | /users     | Criação de um usuário.                              |
| GET      | /users     | Lista todos os usuários                             |
| GET      | /users/:id | Lista um usuário usando seu ID como parâmetro       |
| PATCH    | /users/:id | Atualizando um usuário usando seu ID como parâmetro.|
| DELETE   | /users/:id | Deletando um usuário usando seu ID como parâmetro.  |

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#4-endpoints)

### `/users`

### Exemplo de Request:
```
POST /users
Host: https://motors-shop-b4yd.onrender.com/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
 {
        "name": "John Doe",
        "email": "john1@example.com",
        "cpf": "12345678111",
        "phone": "1234567890",
        "birthday": "1990-01-01",
        "descripition": "User description",
        "password": "password123",
        "seller": true,
        "admin": false,
        "address": {
         "cep": "string",
		"state": "string",
		"city": "string",
		"number": "string",
		"complement": "string"
        }
    }
```

### Schema de Validação com Zod:
```javascript
const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(150),
  abbreviation: z.string().max(2),
  email: z.string().max(150).email(),
  cpf: z.string().max(11),
  phone: z.string().max(50),
  birthday: z.string(),
  descripition: z.string(),
  password: z.string().max(150),
  seller: z.boolean(),
  resetCode: z.string().max(8).nullable(),
  admin: z.boolean().default(false),
  address: addressCreateSchema,
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  deletedAt: z.string().or(z.date()).nullable(),
});

const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  abbreviation: true,
  resetCode: true,
});
```
OBS.: Chaves não presentes no schema/no userSchema.omit serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": 2,
	"name": "John Doe",
	"abbreviation": "JD",
	"email": "john1@example.com",
	"cpf": "12345678111",
	"phone": "1234567890",
	"birthday": "1990-01-01",
	"descripition": "User description",
	"seller": true,
	"admin": false,
	"address": {
		"cep": "string",
		"state": "string",
		"city": "string",
		"number": "string",
		"complement": "string"
	},
	"createdAt": "2023-07-06",
	"updatedAt": "2023-07-06",
	"deletedAt": null
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Email already registered. |
| 409 Conflict   | Cpf already registered.   |

---

### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users`

### Exemplo de Request:
```
GET /users
Host: https://motors-shop-b4yd.onrender.com/
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": 1,
		"name": "John Doe",
		"abbreviation": "JD",
		"email": "john@example.com",
		"cpf": "12345678151",
		"phone": "1234567890",
		"birthday": "1990-01-01",
		"descripition": "User description",
		"seller": true,
		"admin": false,
		"address": {
			"cep": "string",
			"state": "string",
			"city": "string",
			"number": "string",
			"complement": "string"
		},
		"createdAt": "2023-07-06",
		"updatedAt": "2023-07-06",
		"deletedAt": null
	},
	{
		"id": 2,
		"name": "John Doe",
		"abbreviation": "JD",
		"email": "john1@example.com",
		"cpf": "12345678111",
		"phone": "1234567890",
		"birthday": "1990-01-01",
		"descripition": "User description",
		"seller": true,
		"admin": false,
		"address": {
			"cep": "string",
			"state": "string",
			"city": "string",
			"number": "string",
			"complement": "string"
		},
		"createdAt": "2023-07-06",
		"updatedAt": "2023-07-06",
		"deletedAt": null
	}
]
```

### Possíveis Erros:
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar Usuário por ID**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users/:id`

### Exemplo de Request:
```
GET /users/1
Host: https://motors-shop-b4yd.onrender.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": 1,
	"name": "John Doo",
	"abbreviation": "JD",
	"email": "john@example.com",
	"cpf": "123456789",
	"phone": "1234567890",
	"birthday": "1990-01-01",
	"descripition": "sim",
	"seller": true,
	"admin": false,
	"address": {
		"cep": "47800",
		"state": "Bahia",
		"city": "Barreiras",
		"number": "35",
		"complement": "Sim"
	},
	"createdAt": "2023-07-04",
	"updatedAt": "2023-07-04",
	"deletedAt": null
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found  | User not found. |

---

### 1.4. **Atualizar Usuário**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users/:id`

### Exemplo de Request:
```
PATCH /users/1
Host: https://motors-shop-b4yd.onrender.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
{
	"name": "John"
}

```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": 1,
	"name": "John",
	"abbreviation": "J",
	"email": "john@example.com",
	"cpf": "123456789",
	"phone": "1234567890",
	"birthday": "1990-01-01",
	"descripition": "sim",
	"seller": true,
	"admin": false,
	"address": {
		"cep": "47800",
		"state": "Bahia",
		"city": "Barreiras",
		"number": "35",
		"complement": "Sim"
	},
	"createdAt": "2023-07-04",
	"updatedAt": "2023-07-06",
	"deletedAt": null
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found  | User not found. |

---

### 1.5. **Deletar Usuário**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users/:id`

### Exemplo de Request:
```
PATCH /users/1
Host: https://motors-shop-b4yd.onrender.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found  | User not found. |
