import { graphql, useStaticQuery } from 'gatsby';

import { ThemeVariant } from '../../providers/ThemeProvider/types';

export const useOrganizationLogosMapper = (variant: ThemeVariant) => {
  const data = useStaticQuery(graphql`
    {
      shiphero_light: file(
        relativePath: { eq: "companies/light/shiphero.png" }
      ) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      codelitt_light: file(
        relativePath: { eq: "companies/light/codelitt.png" }
      ) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      debtCollective_light: file(
        relativePath: { eq: "companies/light/debt-collective.png" }
      ) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      hundredBricks_light: file(
        relativePath: { eq: "companies/light/100ladrillos.png" }
      ) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      shiphero_dark: file(relativePath: { eq: "companies/dark/shiphero.png" }) {
        childImageSharp {
          fixed(width: 160) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      codelitt_dark: file(relativePath: { eq: "companies/dark/codelitt.png" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      debtCollective_dark: file(
        relativePath: { eq: "companies/dark/debt-collective.png" }
      ) {
        childImageSharp {
          fixed(width: 160) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      hundredBricks_dark: file(
        relativePath: { eq: "companies/dark/100ladrillos.png" }
      ) {
        childImageSharp {
          fixed(width: 160) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const oppositeVariant =
    variant === ThemeVariant.Dark ? ThemeVariant.Light : ThemeVariant.Dark;

  return {
    shiphero: data[`shiphero_${oppositeVariant}`],
    codelitt: data[`codelitt_${oppositeVariant}`],
    debtCollective: data[`debtCollective_${oppositeVariant}`],
    hundredBricks: data[`hundredBricks_${oppositeVariant}`],
  };
};
