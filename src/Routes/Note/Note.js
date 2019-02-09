import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { GET_NOTE } from "../../queries";
import { Link } from "react-router-dom";
import MarkdownRenderer from "react-markdown-renderer";
import styled from "styled-components";

const TitleComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
  margin: 0;
  padding: 0;
`;
const Button = styled.button``;

export default class Note extends React.Component {
  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    console.log(id);
    return (
      <Query query={GET_NOTE} variables={{ id }}>
        {({ data }) =>
          data.note ? (
            <Fragment>
              <TitleComponent>
                <Title>{data.note && data.note.title}</Title>
                <Link to={`/edit/${data.note.id}`}>
                  <Button>Edit</Button>
                </Link>
              </TitleComponent>
              <MarkdownRenderer markdown={data.note.content} />
            </Fragment>
          ) : null
        }
      </Query>
    );
  }
}
