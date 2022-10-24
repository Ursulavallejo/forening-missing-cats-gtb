import { useQuery } from '@apollo/client';
import { getGlobalQuery } from '../../api/pages';
import { GlobalPageModel } from '../../models/globalPageModel';
import styles from '../footer/footer.module.scss';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {
  data: GlobalPageModel;
};

const Footer = () => {
  const { locale } = useRouter();
  const { data, loading } = useQuery(getGlobalQuery(), {
    variables: {
      locale: locale,
    },
  });

  if (loading || !data?.globalsCollection?.items[0]) return null;

  const { logo, footerContact, footerText } =
    data.globalsCollection.items[0];
  return (
    <div className={styles.footer}>
      <div className={styles.logosWrapper}>
        <div className={styles.logoCatsContainer}>
          <Image
            className={styles.logo}
            src={logo.url}
            width={227}
            height={91}
            alt="logoCats"
            loading="eager"
            quality={70}
          />
        </div>
        <div className={styles.logoSocial}>

        </div>
      </div>

      <div style={{ fontSize: '12px' }} className={styles.copyright}>
        {documentToReactComponents(footerText.json)}
      </div>
      <div className={styles.contacts}>
        {documentToReactComponents(footerContact.json)}
      </div>
    </div>
  );
};

export default Footer;
