import { SeoMetadataModel } from "./SEOMetadataModel";

export type HomePageModel = {
    header: string;
    introText: any;
    seoMetadata: SeoMetadataModel;
    sectionsCollection: any;
    __typename: string;
    slug: string;
    image: any;
    buttonText: string
};