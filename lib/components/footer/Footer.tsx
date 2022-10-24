import { useQuery } from '@apollo/client';
import { getGlobalQuery } from '../../api/pages';
import { GlobalPageModel } from '../../models/globalPageModel';
import styles from '../footer/footer.module.scss';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AiFillCopyrightCircle } from 'react-icons/ai';


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

  const {  footerContact, footerText, logoCats } =
    data.globalsCollection.items[0];
  return (
    <div className={styles.footer}>
      <div className={styles.logosWrapper}>
        <div className={styles.logoCatsWrapper}>
          <Image
            className={styles.logo}
            src={logoCats.url}
            width={200}
            height={200}
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
                 <a
                  href="https://www.instagram.com/fantabulosa_work/"
                  target={"_blank"}
                  rel={"noreferrer"}
                  className={styles.copyrightLink}>
                       <span className={styles.copyrightLogo} ><AiFillCopyrightCircle size={17}  />Created by Ursula Vallejo Janne</span>
                  </a>
      </div>
    </div>
  );
};

export default Footer;
