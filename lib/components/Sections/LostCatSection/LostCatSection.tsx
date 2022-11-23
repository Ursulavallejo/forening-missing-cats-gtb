import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getLostCatSectionQuery } from "../../../api/sections";
import styles from "./LostCatSection.module.scss";
import Image from "next/image";

type Props = {
  id: string;
};

export const LostCatSection = ({ id }: Props) => {
  const { locale } = useRouter();

  const { loading, data } = useQuery(getLostCatSectionQuery(id), {
      variables: {
        locale: locale,
      },
    });

    const renderLostCatItem = (item: any, index: number) => {
      return (
    <div className={styles.itemContainer}>
    <div key={index} className={styles.item}>
               <div className={styles.imageContainer}>
                 <Image
                   src={item.image.url}
                   width={300}
                   height={300}
                   alt="imageBox"
                   objectFit="contain"
                   loading="eager"
                   quality={70}
                   className={styles.image}

                 />
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
          <h2>{data.lostCatSection.title}</h2>
          <p>{data.lostCatSection.description}</p>
        </div>

         <div className={styles.gridContainer}>
          {data.lostCatSection.itemsCollection.items.map(
            (item: any, index: number) => renderLostCatItem(item, index)
          )}
        </div>
      </div>
    </section>

  );
};
