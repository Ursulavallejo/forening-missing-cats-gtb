
//import { GridSection } from "../components/Sections/GridSection/GridSection";

const sectionsMap = new Map<string, Function>([
 // ["GridSection", (id: string) => <GridSection key={id} id={id} />],

]);

export const getSection = (typename: string, id: string): JSX.Element => {
  return sectionsMap.has(typename) ? sectionsMap.get(typename)(id) : null;
};
