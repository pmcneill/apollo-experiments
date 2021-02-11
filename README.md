# GraphQL Samples

## Server Side

### 01-simple

A single-file implementation of the first tutorial from https://www.robinwieruch.de/graphql-apollo-server-tutorial.  Creates User and Message types with some sample data and allows for use of the GraphQL interactive sandbox to experiment.  Check out http://127.0.0.1:8999/gql.

### 02-separated

A reworking of the first app to separate out concerns into their own files.  Schemas, models, and resolvers are all written individually.  Apollo them merges them together to create the full server schema.  Try it with:

```
query {
  messages {
    id
    text
    user {
      name
    }
  }
}
```

### 03-sequelize

Sequelize models for users + messages.  db-migrate.ts will set up or update the users and messages tables, while index.ts will load user 1 (creating if it doesn't exist), then display that user's messages.  The code here is repetitive, though.  For instance, we define the column names at least three times for each model: once when defining the table, once in the model class, and a third in the attributes interface for TypeScript.  Sequelize was designed for Javascript, so there's extra effort here for TypeScript.  To make that easier, there's also...

### 04-sequelize-typescript

The sequelize-typescript module (https://www.npmjs.com/package/sequelize-typescript) makes writing models _substantially_ easier.  It uses the upcoming "decorators" in Javascript to add metadata to attributes in the model as input for a _lot_ of magic.  The models written here are much easier to write and comprehend.

### 05-apollo-sql

Everything from step 4 is incorporated into the overall Apollo example, replacing all the mocked data.  This, for example, will insert a new post:

```
mutation {
  createMessage(text: "From the console") {
    id
    text
    user {
      id
      name
    }
  }
}
```

And update a message:

```
mutation {
  updateMessage(id: 1, text: "Can I update?") {
    id
  }
}
```

### 06-batch-loading

This adds the dataloader module in and creates loaders/user.ts.  When load requests are channeled through this object, such as in resolvers/message.ts, queries will be batched together automatically.

### Registrar System Test

The "server" directory contains an evolution of the 06 example, using it as a starting point towards creating a simple registrar system backend.

### References:

* Sequelize: https://sequelize.org/master/index.html
* Apollo Server: https://www.apollographql.com/docs/apollo-server/getting-started/
* Sequelize Typescript: https://www.npmjs.com/package/sequelize-typescript
* Express: http://expressjs.com/en/guide/routing.html
* Sequelize + Apollo server tutorial: https://www.robinwieruch.de/graphql-apollo-server-
* Authentication with JWT: https://www.robinwieruch.de/graphql-apollo-server-tutorial#apollo-server-authentication


* https://blog.logrocket.com/build-a-graphql-react-app-with-typescript/
* https://github.com/ember-graphql/ember-apollo-client
