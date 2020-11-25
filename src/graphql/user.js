import { gql } from "@apollo/client";

/**
 * Records to select from user
 */
const userPayload = `
  id
  username
  email
  fullName
  image
  imagePublicId
  coverImage
  coverImagePublicId
  createdAt
  bio
`;

/**
 * Gets authenticated user
 */
export const GET_AUTH_USER = gql`
  query {
    getAuthUser {
      ${userPayload}
    }
  }
`;
