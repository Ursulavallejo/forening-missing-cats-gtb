import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getEmergencySectionQuery } from "../../../api/sections";
import styles from "./EmergencySection.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useState } from "react";
import Image from 'next/image'
import logo from '../../../../styles/assets/images/catEmergency.jpg'

type Props = {
  id: string;
};

export const EmergencySection = ({ id }: Props) => {
  const { locale } = useRouter();
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  const { loading, data } = useQuery(getEmergencySectionQuery(id), {
    variables: {
      locale: locale,
    },
  });

  const toggleOpen = (index: number) => {
    if (openFaqs.includes(index)) {
      const newList = openFaqs.filter((i: number) => i != index);
      setOpenFaqs([...newList]);
    } else {
      setOpenFaqs([...openFaqs, index]);
    }
  };

  const renderEmergencyItem = (item: any, index: number) => {
    return (
      <div style={{ width: "100%" }} key={index}>
        <div className={styles.question} onClick={() => toggleOpen(index)}>
          <p>{item.question}</p>

          <div
            className={`${styles.dot} ${
              openFaqs.includes(index) ? "" : styles.rotate
            }`}
          >
            <MdKeyboardArrowUp />
          </div>
        </div>
        <div
          className={`${styles.answer} ${
            openFaqs.includes(index) ? "" : styles.hidden
          }`}
        >
          <div>
            {item?.answer?.json && documentToReactComponents(item.answer.json)}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div></div>;

  const { header, introText, image } = data.emergencySection;

  return (
    <section className={styles.wrapper} >

      <div className={styles.left}>
{/*         <div className={styles.image}>
          <Image
            className={styles.img}
            src={image.url}
            width={500}
            height={500}
            alt="CatEmergency"
            loading="eager"
            quality={75}
            objectFit="cover"
          />

        </div> */}
        <div className={styles.logo}></div>
        <div className={styles.header}>
        <h2>{header}</h2>
        </div>
      </div>
      <div className={styles.right} >
        <div className={styles.introText}>
          {introText?.json && documentToReactComponents(introText.json)}
        </div>
        {data.emergencySection.itemsCollection.items.map((item: any, index: number) =>
          renderEmergencyItem(item, index)
        )}

      </div>

    </section>
  );
};
