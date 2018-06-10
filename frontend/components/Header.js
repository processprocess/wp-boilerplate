import React, { Component } from "react";
import Link from "next/link";
import Head from "next/head";
import stylesheet from "../src/styles/main.scss";

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Head>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>B/R Branded Content</title>
      </Head>
    );
  }
}

export default Header;
