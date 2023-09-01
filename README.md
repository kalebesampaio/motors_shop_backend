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


---


## 2. **Annoucements**
[ Voltar para os Endpoints ](#4-endpoints)

O objeto Annoucement é definido como:

| Campo        | Tipo   | Descrição                                        |
| -------------|---------|-------------------------------------------------|
| id           | string  | Identificador único do anúncio.                 |
| model        | string  | O modelo do automóvel.                          |
| type         | string  | O tipo do automóvel.                            |
| description  | string  | A descrição sobre o automóvel.                  |
| km           | number  | Quilômetros rodados do automóvel.               |
| year         | number  | Ano de lançamneto do automóvel.                 |
| default_img  | string  | url da imagem do automóvel.                     |
| price        | number  | Preço do automóvel.                             |
| isActive     | boolean | Booleano se o anúncio esta ativo.               |
| user         | user    | Usuário dono do anúncio.                        |
| images       | string[]| Lista de imagens do automóvel.                  |
| comments     | comment | Comentarios do anúncio.                         |



### Endpoints

| Método   | Rota               | Descrição                                           |
|----------|--------------------|-----------------------------------------------------|
| POST     | /announcements     | Criação de um anúncio.                              |
| GET      | /announcements     | Lista todos os anúncios.                            |
| GET      | /announcements/:id | Lista um anúncio usando seu ID como parâmetro       |
| PATCH    | /announcements/:id | Atualizando um anúncio usando seu ID como parâmetro.|
| DELETE   | /announcements/:id | Deletando um anúncio usando seu ID como parâmetro.  |

---

### 1.1. **Criação de Anúncio**

[ Voltar para os Endpoints ](#4-endpoints)

### `/announcements`

### Exemplo de Request:
```
POST /announcements
Host: https://motors-shop-b4yd.onrender.com/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"model": "Cruze Sport6 RS",
	"type": "car",
	"description": "urpreenda-se com o Cruze Sport6 RS! O novo carro hatch esportivo da Chevrolet com teto solar, motor turbo e Wi-Fi nativo. Solicite já uma proposta!",
	"km": 0,
	"year": 2023,
	"price": 168990,
	"default_img": "https://s2-autoesporte.glbimg.com/g8dubgf3FrWCjymAI8rF8g6_ELU=/0x0:1400x788/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/v/2/6nnNywQUO0q7f8OOJtPw/chevrolet-cruze-sport6-rs-2022-2.jpg",
	"images":["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScFCCcodj8qVcVFP-aeI0-nhTL1PZN-G2Wn7FchZv3i9waxSEm-AtHv8yOI8Ci35Sg5vQ&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48dYR9N9SybK1LUH9GvJaYsH9tUnZbiJCjo8zzVWVhGKZBBv4jcDW8cZOfvA48EjOTVo&usqp=CAU"]
	
}
```

### Schema de Validação com Zod:
```javascript
const annoucementSchema = z.object({
  id: z.number().positive(),
  model: z.string().max(150),
  type: z.string().max(150),
  description: z.string(),
  km: z.number(),
  year: z.number().positive(),
  default_img: z.string(),
  price: z.number().positive(),
  isActive: z.boolean().default(true),
  user: userReturnSchema,
  images: z.string().array(),
  comments: commentSchema.array(),
});

const annoucementCreateSchema = annoucementSchema.omit({
  id: true,
  isActive: true,
  comments: true,
  user: true,
});
```
OBS.: Chaves não presentes no schema/presentes no annoucementSchema.omit serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": 3,
	"model": "Cruze Sport6 RS",
	"type": "moto",
	"description": "urpreenda-se com o Cruze Sport6 RS! O novo carro hatch esportivo da Chevrolet com teto solar, motor turbo e Wi-Fi nativo. Solicite já uma proposta!",
	"km": 0,
	"year": 2023,
	"default_img": "https://s2-autoesporte.glbimg.com/g8dubgf3FrWCjymAI8rF8g6_ELU=/0x0:1400x788/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/v/2/6nnNywQUO0q7f8OOJtPw/chevrolet-cruze-sport6-rs-2022-2.jpg",
	"price": 168990,
	"isActive": true,
	"user": {
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
	"images": [
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScFCCcodj8qVcVFP-aeI0-nhTL1PZN-G2Wn7FchZv3i9waxSEm-AtHv8yOI8Ci35Sg5vQ&usqp=CAU",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48dYR9N9SybK1LUH9GvJaYsH9tUnZbiJCjo8zzVWVhGKZBBv4jcDW8cZOfvA48EjOTVo&usqp=CAU"
	],
	"comments": []
}
```

### Possíveis Erros:
| Código do Erro  | Descrição            |
|-----------------|----------------------|
| 401 Unauthorized| Missing bearer token.|
| 401 Unauthorized| User is not a seller.|

---

### 1.2. **Listando Anúncios**

[ Voltar aos Endpoints ](#4-endpoints)

### `/announcements`

### Exemplo de Request:
```
GET /announcements
Host: https://motors-shop-b4yd.onrender.com
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
		"model": "Cruze Sport6 RS",
		"type": "car",
		"description": "urpreenda-se com o Cruze Sport6 RS! O novo carro hatch esportivo da Chevrolet com teto solar, motor turbo e Wi-Fi nativo. Solicite já uma proposta!",
		"km": 500,
		"year": 2023,
		"default_img": "https://s2-autoesporte.glbimg.com/g8dubgf3FrWCjymAI8rF8g6_ELU=/0x0:1400x788/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/v/2/6nnNywQUO0q7f8OOJtPw/chevrolet-cruze-sport6-rs-2022-2.jpg",
		"price": 168990,
		"isActive": true,
		"user": {
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
			"createdAt": "2023-07-06",
			"updatedAt": "2023-07-06",
			"deletedAt": null
		},
		"images": [
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScFCCcodj8qVcVFP-aeI0-nhTL1PZN-G2Wn7FchZv3i9waxSEm-AtHv8yOI8Ci35Sg5vQ&usqp=CAU",
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48dYR9N9SybK1LUH9GvJaYsH9tUnZbiJCjo8zzVWVhGKZBBv4jcDW8cZOfvA48EjOTVo&usqp=CAU"
		],
		"comments": []
	},
	{
		"id": 3,
		"model": "Cruze Sport6 RS",
		"type": "moto",
		"description": "urpreenda-se com o Cruze Sport6 RS! O novo carro hatch esportivo da Chevrolet com teto solar, motor turbo e Wi-Fi nativo. Solicite já uma proposta!",
		"km": 0,
		"year": 2023,
		"default_img": "https://s2-autoesporte.glbimg.com/g8dubgf3FrWCjymAI8rF8g6_ELU=/0x0:1400x788/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/v/2/6nnNywQUO0q7f8OOJtPw/chevrolet-cruze-sport6-rs-2022-2.jpg",
		"price": 168990,
		"isActive": true,
		"user": {
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
			"createdAt": "2023-07-06",
			"updatedAt": "2023-07-06",
			"deletedAt": null
		},
		"images": [
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScFCCcodj8qVcVFP-aeI0-nhTL1PZN-G2Wn7FchZv3i9waxSEm-AtHv8yOI8Ci35Sg5vQ&usqp=CAU",
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48dYR9N9SybK1LUH9GvJaYsH9tUnZbiJCjo8zzVWVhGKZBBv4jcDW8cZOfvA48EjOTVo&usqp=CAU"
		],
		"comments": []
	}
]
```

### Possíveis Erros:
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar Anúncio por ID**

[ Voltar aos Endpoints ](#4-endpoints)

### `/announcements/:id`

### Exemplo de Request:
```
GET /announcements/1
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
	"model": "Cruze Sport6 RS",
	"type": "car",
	"description": "urpreenda-se com o Cruze Sport6 RS! O novo carro hatch esportivo da Chevrolet com teto solar, motor turbo e Wi-Fi nativo. Solicite já uma proposta!",
	"km": 500,
	"year": 2023,
	"default_img": "https://s2-autoesporte.glbimg.com/g8dubgf3FrWCjymAI8rF8g6_ELU=/0x0:1400x788/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/v/2/6nnNywQUO0q7f8OOJtPw/chevrolet-cruze-sport6-rs-2022-2.jpg",
	"price": 168990,
	"isActive": true,
	"user": {
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
		"createdAt": "2023-07-06",
		"updatedAt": "2023-07-06",
		"deletedAt": null
	},
	"images": [
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScFCCcodj8qVcVFP-aeI0-nhTL1PZN-G2Wn7FchZv3i9waxSEm-AtHv8yOI8Ci35Sg5vQ&usqp=CAU",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48dYR9N9SybK1LUH9GvJaYsH9tUnZbiJCjo8zzVWVhGKZBBv4jcDW8cZOfvA48EjOTVo&usqp=CAU"
	],
	"comments": []
}
```

### Possíveis Erros:
| Código do Erro  | Descrição               |
|-----------------|-------------------------|
| 404 Not Found   | Announcements not found.|
| 401 Unauthorized| Missing bearer token.   |

---

### 1.4. **Atualizar Anúncio**

[ Voltar aos Endpoints ](#4-endpoints)

### `/announcements/:id`

### Exemplo de Request:
```
PATCH /announcements/1
Host: https://motors-shop-b4yd.onrender.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                                      |
|-------------|-------------|------------------------------------------------|
| id          | number      | Identificador único do anúncio (Announcements) |

### Corpo da Requisição:
```json
{
"price": 168990
}

```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": 1,
	"model": "Cruze Sport6 RS",
	"type": "car",
	"description": "urpreenda-se com o Cruze Sport6 RS! O novo carro hatch esportivo da Chevrolet com teto solar, motor turbo e Wi-Fi nativo. Solicite já uma proposta!",
	"km": 500,
	"year": 2023,
	"default_img": "https://s2-autoesporte.glbimg.com/g8dubgf3FrWCjymAI8rF8g6_ELU=/0x0:1400x788/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/v/2/6nnNywQUO0q7f8OOJtPw/chevrolet-cruze-sport6-rs-2022-2.jpg",
	"price": 168990,
	"isActive": true,
	"user": {
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
		"createdAt": "2023-07-06",
		"updatedAt": "2023-07-06",
		"deletedAt": null
	},
	"images": [
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScFCCcodj8qVcVFP-aeI0-nhTL1PZN-G2Wn7FchZv3i9waxSEm-AtHv8yOI8Ci35Sg5vQ&usqp=CAU",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48dYR9N9SybK1LUH9GvJaYsH9tUnZbiJCjo8zzVWVhGKZBBv4jcDW8cZOfvA48EjOTVo&usqp=CAU"
	],
	"comments": []
}
```

### Possíveis Erros:
| Código do Erro  | Descrição               |
|-----------------|-------------------------|
| 404 Not Found   | Announcements not found.|
| 401 Unauthorized| Missing bearer token.   |


---

### 1.5. **Deletar Anúncio**

[ Voltar aos Endpoints ](#4-endpoints)

### `/announcements/:id`

### Exemplo de Request:
```
PATCH /announcements/1
Host: https://motors-shop-b4yd.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                                      |
|-------------|-------------|------------------------------------------------|
| id          | number      | Identificador único do Anúncio (announcements) |

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
| Código do Erro  | Descrição               |
|-----------------|-------------------------|
| 404 Not Found   | Announcements not found.|
| 401 Unauthorized| Missing bearer token.   |

---


## 2. **Login**
[ Voltar para os Endpoints ](#4-endpoints)

### Endpoints

| Método   | Rota               | Descrição                                           |
|----------|--------------------|-----------------------------------------------------|
| POST     | /login             | Faz o login do usuário.                             |

---

### 1.1. **Login do Usuário**

[ Voltar para os Endpoints ](#4-endpoints)

### `/login`

### Exemplo de Request:
```
POST /login
Host: https://motors-shop-b4yd.onrender.com/
Authorization: 
Content-type: application/json
```

### Corpo da Requisição:
```json
{
 "email": "john@example.com",
 "password": "password123"
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTY4ODY1NjIzMCwiZXhwIjoxNjg4NzQyNjMwLCJzdWIiOiIxIn0.n3ro-2srzeDCsIs0VBZYRoCpmkHUJuuzvFv9T0pHgYs"
}
```

### Possíveis Erros:
| Código do Erro  | Descrição            |
|-----------------|----------------------|
| 404 Not Found   | User not found.      |

---


