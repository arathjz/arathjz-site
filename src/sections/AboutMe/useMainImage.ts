import { graphql, useStaticQuery } from 'gatsby';

export const useMainImage = () => {
  const { mainImage } = useStaticQuery(graphql`
    {
      mainImage: file(relativePath: { eq: "main-picture.jpeg" }) {
        childImageSharp {
          fixed(width: 350) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return {
    mainImage,
  };
};
