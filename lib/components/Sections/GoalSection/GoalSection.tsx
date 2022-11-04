import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getGoalSectionQuery } from "../../../api/sections";
import styles from "./GoalSection.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { INLINES, BLOCKS } from "@contentful/rich-text-types";
import Link from "next/link";

type Props = {
  id: string;
};

export const GoalSection = ({ id }: Props) => {
  const { locale } = useRouter();

  const { loading, data } = useQuery(getGoalSectionQuery(id), {
    variables: {
      locale: locale,
    },
  });
console.log('SectionGOAL', data)

  if (loading) return <div></div>;

  const renderUlItem = (item: any, index: number) => {
    return (
      <div className={styles.ulWrapper} key={index}>
        <div className={styles.dot}>
          <MdOutlineKeyboardArrowRight />{" "}
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
    <div className={styles.container} id="info">
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Image
            className={styles.img}
            src={data.goalSection.image.url}
            width={600}
            height={600}
            alt="workerPhoto"
            loading="eager"
            quality={75}
            objectFit="cover"
          />
        </div>
        <div className={styles.right}>
          {data.goalSection?.richText?.json &&
            documentToReactComponents(
              data.goalSection.richText.json,
              options
            )}
        </div>
      </div>
    </div>
  );
};
