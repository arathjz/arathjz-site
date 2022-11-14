import { useStaticQuery, graphql } from 'gatsby';

import { ThemeVariant } from '../../providers/ThemeProvider/types';

export const useIconMapper = (variant: ThemeVariant) => {
  const data = useStaticQuery(graphql`
    {
      light: allFile(
        filter: {
          extension: { eq: "svg" }
          relativeDirectory: { eq: "icons/light" }
        }
      ) {
        nodes {
          publicURL
          name
        }
      }
      dark: allFile(
        filter: {
          extension: { eq: "svg" }
          relativeDirectory: { eq: "icons/dark" }
        }
      ) {
        nodes {
          publicURL
          name
        }
      }
    }
  `);

  const iconsToUse = variant === ThemeVariant.Dark ? data.light : data.dark;

  return {
    twitter: iconsToUse.nodes.find((node) => node.name === 'twitter'),
    github: iconsToUse.nodes.find((node) => node.name === 'github'),
    linkedin: iconsToUse.nodes.find((node) => node.name === 'linkedin'),
    toggleMode: iconsToUse.nodes.find((node) => node.name === 'toggle'),
  };
};
