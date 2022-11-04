import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getHowToHelpSectionQuery } from "../../../api/sections";
import styles from "./HowToHelpSection.module.scss";
import Image from "next/image";

type Props = {
  id: string;
};

export const HowToHelpSection = ({ id }: Props) => {
  const { locale } = useRouter();

  const { loading, data } = useQuery(getHowToHelpSectionQuery(id), {
      variables: {
        locale: locale,
      },
    });
console.log('HowtoHelpSection', data)
    const renderHowtoHelpItem = (item: any, index: number) => {
      return (
    <div className={styles.itemContainer}>
    <div key={index} className={styles.item}>
             <div className={styles.imageContainer}>
               <div className={styles.image}>
                 <Image
                   src={item.image.url}
                   width={300}
                   height={300}
                   alt="imageBox"
                   objectFit="contain"
                   loading="eager"
                   quality={70}
                 />
               </div>
             </div>
             <h4>{item.title}</h4>
             <p>{item.description}</p>
           </div>
    </div>

     );
   };

     if (loading) return <div></div>;

  return (


    <section className={styles.container} id="lostCat">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>{data.howToHelpSection.title}</h2>
          <h3>{data.howToHelpSection.subTitle}</h3>
          <p>{data.howToHelpSection.description}</p>
        </div>

         <div className={styles.gridContainer}>
          {data.howToHelpSection.itemsCollection.items.map(
            (item: any, index: number) => renderHowtoHelpItem(item, index)
          )}
        </div>
      </div>
    </section>

  );
};
