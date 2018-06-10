import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper.js";
import Nav from "../components/Nav.js";
import { Config } from "../config.js";

const headerImageStyle = {
  marginTop: 50,
  marginBottom: 50
};

class Index extends Component {
  static async getInitialProps(context) {
    const pageRes = await fetch(
      `${Config.apiUrl}/wp-json/postlight/v1/page?slug=welcome`
    );
    const page = await pageRes.json();
    const postsRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed`);
    const posts = await postsRes.json();
    const pagesRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages?_embed`);
    return { page, posts };
  }

  render() {
    const posts = this.props.posts.map((post, index) => {
      console.log(post);
      return (
        <li key={post.id} className="post">
          <Link
            as={`/post/${post.slug}`}
            href={`/post?slug=${post.slug}&apiRoute=post`}
          >
            <a>{post.title.rendered}</a>
          </Link>
        </li>
      );
    });

    return (
      <Layout>
        <Nav menu={this.props.headerMenu} />
        <ul className="post-list">{posts}</ul>
      </Layout>
    );
  }
}

export default PageWrapper(Index);
