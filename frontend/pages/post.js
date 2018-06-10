import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Nav from "../components/Nav.js";
import { Config } from "../config.js";

class Post extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const res = await fetch(
      `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`
    );
    const post = await res.json();
    return { post };
  }

  render() {
    if (!this.props.post.title) return <Error statusCode={404} />;
    // console.log(this.props.post.acf);
    return (
      <Layout>
        <Nav menu={this.props.headerMenu} />
        <h1>{this.props.post.title.rendered}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.post.content.rendered
          }}
        />
      </Layout>
    );
  }
}

export default PageWrapper(Post);
