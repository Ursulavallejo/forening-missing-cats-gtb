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
               <div className={styles.image}>
                 <Image
                 className={styles.img}
                   src={item.image.url}
                   width={300}
                   height={300}
                   alt="imageBox"
                   objectFit="cover"
                   loading="eager"
                   quality={70}
                 />
               </div>
               <div className={styles.info}>
                <h3>{item.title}</h3>
               {/*  <p>{item.description}</p> */}
                </div>


           </div>
    </div>

     );
   };

     if (loading) return <div></div>;

  return (


    <section className={styles.container} id="lostCat">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>{data.howToHelpSection.title}</h2>
          <h3 className={styles.subTitle}>{data.howToHelpSection.subTitle}</h3>
          <p className={styles.text}>{data.howToHelpSection.description}</p>
        </div>

         <div className={styles.gridContainer}>
          <div className={styles.imageSlide}>
          {data.howToHelpSection.itemsCollection.items.map(
            (item: any, index: number) => renderHowtoHelpItem(item, index)
          )}
          </div>

        </div>
      </div>
    </section>

  );
};
