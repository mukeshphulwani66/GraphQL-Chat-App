import {gql} from '@apollo/client'

export const MSG_SUB = gql`
subscription Subscription {
    messageAdded {
      id
      text
      receiverId
      senderId
      createdAt
    }
  }
`