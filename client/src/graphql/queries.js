import {gql} from '@apollo/client'

export const GET_ALL_USERS = gql`
query getAllUsers {
    users {
      id
      firstName
      lastName
      email
    }
  }  
`
export const GET_MSG = gql`
query MessagesByUser($receiverId: Int!) {
    messagesByUser(receiverId: $receiverId) {
      id
      text
      receiverId
      senderId
      createdAt
    }
  }
`