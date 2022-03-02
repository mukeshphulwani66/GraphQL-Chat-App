import { ApolloServer, gql } from 'apollo-server-express'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'
import jwt from 'jsonwebtoken'
import { WebSocketServer } from 'ws'
import express from 'express'
import { useServer } from 'graphql-ws/lib/use/ws';
import {makeExecutableSchema} from '@graphql-tools/schema'
const port  = process.env.PORT || 4000


// create express
const app = express();

const context = ({req})=>{
         const {authorization} =  req.headers
         if(authorization){
          const {userId} =  jwt.verify(authorization,process.env.JWT_SECRET)
          return {userId}
        }
}

const schema = makeExecutableSchema({typeDefs,resolvers})
// create apollo server
const apolloServer = new ApolloServer({schema,context });

// apply middleware
await apolloServer.start()
apolloServer.applyMiddleware({ app,path:"/graphql" });

const server = app.listen(port, () => {
  // create and use the websocket server
  const wsServer = new WebSocketServer({
    server,
    path: '/graphql',
  });

  useServer({ schema }, wsServer);
  console.log("Apollo and Subsription server is up")
});
