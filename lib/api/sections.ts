import { DocumentNode, gql } from '@apollo/client';

export const getGoalSectionQuery = (id: string): DocumentNode => {
    return gql`
        query ($locale: String!) {
            goalSection(id:"${id}", locale: $locale){
                richText{json}
                image{url}
                showInNavigation
            }
        }
    `;
};

export const getLostCatSectionQuery = (id: string): DocumentNode => {
    return gql`
        query ($locale: String!) {
            lostCatSection(id: "${id}", locale: $locale){
                name
                title
                description
                text
                showInNavigation
                itemsCollection{
                    items{
                        image{url}
                        title
                        description
                    }
                }
            }
        }
    `;
};


export const getHomelessSectionQuery = (id: string): DocumentNode => {
    return gql`
        query ($locale: String!) {
            homelessSection(id: "${id}",locale: $locale){
                richText{json}
                image{url}
                buttonText
                showInNavigation
            }
        }
    `;
};


export const getHowToHelpSectionQuery = (id: string): DocumentNode => {
    return gql`
        query ($locale: String!) {
            howToHelpSection(id: "${id}", locale: $locale){
                name
                title
                subTitle
                description
                showInNavigation
                itemsCollection{
                    items{
                        image{url}
                        title
                        description
                    }
                }
            }
        }
    `;
};

//Landing Page

export const getCanHelpYouSectionQuery = (id: string): DocumentNode => {
    return gql`
        query  ($locale: String!) {
            canHelpYouSection(id: "${id}", locale: $locale){
                name
                text{json}
                image{url}
                showInNavigation
            }
        }
    `;
};

export const getEmergencySectionQuery = (id: string): DocumentNode => {
    return gql`
        query ($locale: String!) {
            emergencySection(id: "${id}", locale: $locale){
                name
                header
                image{url}
                introText{json}
                showInNavigation
                itemsCollection {
                    items{
                        question
                        answer{json}
                    }
                }
            }
        }
    `;
};

export const getContactSectionQuery = (id: string): DocumentNode => {
    return gql`
        query ($locale: String!) {
            contactSection(id: "${id}", locale: $locale){
                name
                image{url}
                title
                header
                namePlaceholder
                emailPlaceholder
                phonePlaceholder
                messageBox
                buttonText
                showInNavigation
            }
        }
    `;
};
