import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getHomelessSectionQuery } from "../../../api/sections";
import styles from "./HomelessSection.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

type Props = {
  id: string;
};

export const HomelessSection = ({ id }: Props) => {

const [showQr, setShowQr] = useState<boolean>(false);

  const { locale } = useRouter();

    const { loading, data } = useQuery(getHomelessSectionQuery(id), {
      variables: {
        locale: locale,
      },
    });

    console.log('HomelessSection', data)

      if (loading) return <div></div>;

  const openQr = () => {
    setShowQr(!showQr)
  }

        return (
    <div className={styles.container} id="info">

        <div className={styles.imgContainer} >
          <Image
            className={styles.img}
            src={data.homelessSection.image.url}
            width={2500}
            height={1700}
            alt="catBedPhoto"
            loading="eager"
            quality={95}
            objectFit="cover"
          />
        </div>
        <div className={styles.textContainer}>
          {data.homelessSection?.richText?.json &&
            documentToReactComponents(
              data.homelessSection.richText.json
            )}
        </div>
         <button
          className={styles.donateBtn}
          onClick={() => openQr()}
          >
          {data.homelessSection.buttonText}</button>

          {showQr &&

          <div className={styles.qrWrapper}>
          <IoCloseOutline className={styles.closeQr} onClick={() => openQr()}/>

                    <Image
                      src={data.homelessSection.qr.url}
                      width={350}
                      height={350}
                      alt="Qr"
                      loading="eager"
                      quality={95}
                      objectFit="contain"
                    />
          </div>
              }
    </div>

   );
 };
