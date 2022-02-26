module.exports = {
  siteMetadata: {
    title: `Arath Jimenez`,
    description: `Arath Jimenez website`,
    author: `@arathjz`,
    siteUrl: `https://arathjz.com/`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Arath Jimenez`,
    //     short_name: `arathjz`,
    //     start_url: `/`,
    //     display: `standalone`,
    //     icon: '',
    //   },
    // },
  ],
};
