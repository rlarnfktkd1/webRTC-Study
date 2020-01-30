import * as React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

type Props = {
  data?: any;
};

const UserList: any = ({ data: { loading, error, Post } }: { data: any }) => {
  if (error) return <ErrorMessage message="Error loading posts" />;
  if (loading) return <p>Loading...</p>;
  if (Post) {
    console.log(Post);
    return <div>123</div>;
  } else {
    console.log(Post);
    return <div>123</div>;
  }
};

const getPosts = gql`
  query getPosts($caption: String, $location: String, $author: String) {
    getPosts(caption: $caption, location: $location, author: $author) {
      id
      caption
      location
      author
      createdAt
      updatedAt
    }
  }
`;

export default graphql(getPosts, {
  options: () => ({
    variables: {
      caption: "232"
    }
  }),
  props: ({ data }) => ({
    data
  })
})(UserList);
