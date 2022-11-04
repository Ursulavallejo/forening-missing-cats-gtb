import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getHomelessSectionQuery } from "../../../api/sections";
import styles from "./HomelessSection.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

type Props = {
  id: string;
};

export const HomelessSection = ({ id }: Props) => {
  const { locale } = useRouter();

    const { loading, data } = useQuery(getHomelessSectionQuery(id), {
      variables: {
        locale: locale,
      },
    });

    console.log('HomelessSection', data)

      if (loading) return <div></div>;

        return (
    <div className={styles.container} id="info">
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Image
            className={styles.img}
            src={data.homelessSection.image.url}
            width={2000}
            height={1000}
            alt="workerPhoto"
            loading="eager"
            quality={95}
            objectFit="cover"
          />
        </div>
        <div className={styles.right}>
          {data.homelessSection?.richText?.json &&
            documentToReactComponents(
              data.homelessSection.richText.json
            )}
        </div>
      </div>
    </div>

   );
 };
