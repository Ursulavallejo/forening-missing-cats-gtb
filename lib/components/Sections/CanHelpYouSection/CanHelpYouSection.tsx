import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getCanHelpYouSectionQuery } from "../../../api/sections";
import styles from "./CanHelpYouSection.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { INLINES, BLOCKS } from "@contentful/rich-text-types";
import { GiPawHeart } from "react-icons/gi";
import Link from "next/link";

type Props = {
  id: string;
};

export const CanHelpYouSection = ({ id }: Props) => {
  const { locale } = useRouter();

  const { loading, data } = useQuery(getCanHelpYouSectionQuery(id), {
    variables: {
      locale: locale,
    },
  });
  //console.log('CanHelpYouSection', data)

  if (loading) return <div></div>;

  const renderUlItem = (item: any, index: number) => {
    return (
      <div className={styles.ulWrapper} key={index}>
        <div className={styles.dot}>
          <GiPawHeart size='30px' />{" "}
        </div>
        <div>{item?.content[0]?.content[0]?.value}</div>
      </div>
    );
  };

  const options = {
    renderNode: {
      [BLOCKS.UL_LIST]: (node: any) => {
        return <ul> {node.content.map(renderUlItem)} </ul>;
      },
    },
  };

  return (
    <div className={styles.container} >
      <div className={styles.wrapper}>

       <div className={styles.left}>
          {data.canHelpYouSection?.text?.json &&
            documentToReactComponents(
              data.canHelpYouSection.text.json,
              options
            )}
        </div>

         <div className={styles.right}>
                  <Image
                    className={styles.img}
                    src={data.canHelpYouSection.image.url}
                    width={500}
                    height={500}
                    alt="WomanCat"
                    loading="eager"
                    quality={75}
                    objectFit="cover"
                  />
                </div>
      </div>
    </div>
  );
};
