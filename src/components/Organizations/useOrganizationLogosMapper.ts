import { graphql, useStaticQuery } from 'gatsby';

export const useOrganizationLogosMapper = () => {
  const data = useStaticQuery(graphql`
    {
      shiphero: file(relativePath: { eq: "companies/shiphero.png" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      codelitt: file(relativePath: { eq: "companies/codelitt.png" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      debtCollective: file(
        relativePath: { eq: "companies/debt-collective.png" }
      ) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      hundredBricks: file(relativePath: { eq: "companies/100ladrillos.png" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      blockdemy: file(relativePath: { eq: "companies/blockdemy.png" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return data;
};
