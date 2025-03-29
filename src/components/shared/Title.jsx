import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({ title = "Chat", description = "This is the chat App" }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="chat, app, react" />
      <meta name="author" content="Aman Kumar" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default Title;
