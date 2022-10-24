import { gql, DocumentNode } from '@apollo/client';


export const getHomePageQuery = (): DocumentNode => {
  return gql`
    query ($locale: String!) {
      homePageCollection(limit: 1, locale: $locale){
        items{
          header
          subTitle
          introText{json}
          image{url}
        }
        
      }
    }
  `;
};

export const getGlobalQuery = (): DocumentNode => {
  return gql`
    query ($locale: String!) {
        globalsCollection(limit: 1, locale: $locale){
          items{
            header
            logo {
              url
              size
              width
              height
              fileName
            }
            footerText {
              json
            }
            footerContact {
              json
            }
            logoCats{
              url
              size
              width
              height
              fileName              
            }
          }
        }
      }
  `;
};


/*export const getHomePageQuery = (): DocumentNode => {
  return gql`
    query ($locale: String!) {
      homePageCollection(limit: 1, locale: $locale) {
        items {
          header
          introText {
            json
          }
          image {
            url
          }
          seoMetadata {
            title
            description
            ogTitle
            ogDescription
            ogImage {
              url
            }
            hidePageFromSearchEngines
            excludeLinksFromSearchRankings
          }
          sectionsCollection {
            items {
              __typename
              sys {
                id
              }
            }
          }
        }
      }
    }
  `;
};*/
