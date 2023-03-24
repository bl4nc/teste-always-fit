# :muscle: Teste Always Fit

## :pushpin: Desafio proposto

Criar um frontend e backend para um todolist.

### :no_good: O que foi usado para execução do projeto

- Nodets com express para backend.
- Html CSS JS vanilla para frontend.

#### 💻 Pré-requisitos

##### :game_die: Banco de Dados

- É nescessario rodar o arquivo **bd.sql** para criar as tabelas necessarias no banco de dados.

##### :see_no_evil: Backend

- É necessario renomear o arquivo **.env.example** para **.env** .
- Ápos renomear o **.env** é preciso colocar os valores corretos das variaveis dentro do arquivo.
- Rode o comando abaixo instalar as dependencias do backend:

```shell
 npm i
```

- Para executar a api basta rodar o comando abaixo:

```shell
npm run dev
```

##### :eyes: Frontend

- Com o backend rodando na porta 3333 frontend automatico o ente já está funcional, basta executar o index.html.

### :star: Rotas backend

##### Inserir task

**Método** : `POST`
**URL** : `/todo`
**Parâmetros Obrigatórios** : body

```json
{
  "task": "Example..."
}
```

**Retorno** : `JSON` </br>
**Status Code** : `200`</br>
**Response**:

```json
{
  "success":true,
  "message": "Task inserida."
}
```

---

##### Deletar Task

**Método** : `DELETE`
**URL** : `/todo`
**Parâmetros Obrigatórios** : Query

- É necessário enviar o id na url da requisição:

```url
/todo/1111-1111-1111-1111-1111
```

**Retorno** : `JSON` </br>
**Status Code** : `200`</br>
**Response**:

```json
{
    "success": true,
    "message": "Task deletada."
}
```

---

##### Atualizar task

**Método** : `PUT`
**URL** : `/todo`
**Parâmetros Obrigatórios** : Query e Body

- É necessário enviar o id na url da requisição:

```url
/todo/1111-1111-1111-1111-1111
```

- Body

```json
{
 "task":"example task",
 "description":"task description"
}
```
**Retorno** : `JSON` </br>
**Status Code** : `200`</br>
**Response**:

```json
{
    "success": true,
	"message": "Task atualizada"
}
```
---
##### Finalizar task

**Método** : `PUT`
**URL** : `/todo`
**Parâmetros Obrigatórios** : Query

- É necessário enviar o id na url da requisição:

```url
/todo/1111-1111-1111-1111-1111
```

**Retorno** : `JSON` </br>
**Status Code** : `200`</br>
**Response**:

```json
{
    "success": true,
    "message": "Task finalizada."
}
```

