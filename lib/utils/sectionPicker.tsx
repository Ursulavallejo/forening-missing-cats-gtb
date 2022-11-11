import { GoalSection } from "../components/Sections/GoalSection/GoalSection";
import { LostCatSection } from "../components/Sections/LostCatSection/LostCatSection";
import { HomelessSection } from "../components/Sections/HomelessSection/HomelessSection";
import { HowToHelpSection } from "../components/Sections/HowToHelpSection/HowToHelpSection";
import { CanHelpYouSection } from "../components/Sections/CanHelpYouSection/CanHelpYouSection";
import { EmergencySection } from "../components/Sections/EmergencySection/EmergencySection";
import { ContactSection } from "../components/Sections/ContactSection/ContactSection";


const sectionsMap = new Map<string, Function>([
 // ["GoalSection", (id: string) => <GoalSection key={id} id={id} />],
 // ["LostCatSection", (id: string) => <LostCatSection key={id} id={id} />],
 // ["HomelessSection", (id: string) => <HomelessSection key={id} id={id} />],
 // ["HowToHelpSection", (id: string) => <HowToHelpSection key={id} id={id} />],
 // ["CanHelpYouSection", (id: string) => <CanHelpYouSection key={id} id={id} />],
 // ["EmergencySection", (id: string) => <EmergencySection key={id} id={id} />],
 // ["ContactSection", (id: string) => <ContactSection key={id} id={id} />],


]);

export const getSection = (typename: string, id: string): JSX.Element => {
  return sectionsMap.has(typename) ? sectionsMap.get(typename)(id) : null;
};
