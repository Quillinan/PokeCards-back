# PokeCards - Backend

### Descrição do projeto

Bem-vindo ao PokeCards, o lugar onde os treinadores se encontram para trocar, comprar e vender as cartas Pokémon mais raras e poderosas! Este é um marketplace dedicado exclusivamente ao fascinante mundo das cartas Pokémon, proporcionando uma plataforma intuitiva e segura para a comunidade Pokémon.

#

### Rotas do projeto:

<!--
<details>
</details>

<summary>
</summary>
-->
<details>   
    <summary>POST <code>/signup</code></summary>

- Cria um usuário.

- Entrada:
  ```ts
  {
    name: string;
    email: string;
    password: string;
  }
  ```
- Saída:

  ```ts
  {
  "status": 201,
  "message": "Usuário criado"
  }
  ```

    </details>

    <details>   
      <summary>POST <code>/signin</code></summary>

- Realiza o Login do usuário

- Entrada:
  ```ts
  {
    name: string; OR email: string;
    password: string;
  }
  ```
- Saída:

  ```ts
  {
  "status": 200,
  "message": "Usuário logado"
  }
  ```

    </details>

<details>   
    <summary>POST <code>/add-card</code></summary>

- Cria uma carta.

- Entrada:
  ```ts
  Authorization: Bearer SEU_TOKEN_AQUI
  {
    name: string;
    value: number;
  }
  ```
- Saída:

  ```ts
  {
    name: string;
    value: number;
    ownerId: number;
    sold: boolean;
  }
  ```

  </details>

  <details>   
    <summary>POST <code>/add-to-cart</code></summary>

- Adiciona uma carta ao carrinho do usuário

- Entrada:
  ```ts
  Authorization: Bearer SEU_TOKEN_AQUI
  {}
  ```
- Saída:

  ```ts
  {
  "status": 200,
  "message": "Card adicionado ao carrinho com sucesso"
  }
  ```

   </details>

     <details>   
    <summary>POST <code>/checkout</code></summary>

- Finaliza a compra da sessão

- Entrada:
  ```ts
  Authorization: Bearer SEU_TOKEN_AQUI
  {}
  ```
- Saída:

  ```ts
  {
  "status": 200,
  "message": "Compra finalizada com sucesso"
  }
  ```

   </details>

#

### Tecnologias

- JavaScript
- Node(versão 18.16.1)
- MongoDB
- jsonwebtoken, bcrypt

#

### Como rodar o projeto

- Clone o repositório
- Executar os comandos na pasta do projeto:

  ```js
  - npm i
  - npm start
  ```

#

### Deploy do projeto

`https://pokecard-api.onrender.com`
