import { useQuery } from '@apollo/client';
import { getGlobalQuery } from '../../api/pages';
import { GlobalPageModel } from '../../models/globalPageModel';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsInstagram, BsFacebook } from 'react-icons/bs';


type Props = {
  data: GlobalPageModel;
};


const Navbar = () => {
  const router = useRouter();

  const { data, loading } = useQuery(getGlobalQuery(), {
      variables: {
        locale: router.locale,
      },
    });

  if (loading || !data?.globalsCollection?.items[0]) return null;

  const { logo, header } = data.globalsCollection.items[0];

  return (
  <div className={styles.containerNav}>
   <div className={styles.wrapperNav} >

  <div className={styles.imgWrapper}>
          <Image
            src={logo.url}
            alt="logoMissingCats"
            width="329"
            height="442"
            className={styles.img}
            loading="eager"
            quality={70}
          />
        <div className={styles.navTitle} >
        {header}
        </div>
        </div>


  <nav className={styles.nav}>
  <div className={styles.linkItem}>
  <Link href="/" >
  {router.locale == 'sv' ? 'om förening' : 'about us'}</Link>
  </div>
  <div className={styles.linkItem}>
    <Link href="/help" >
    {router.locale == 'sv' ? 'vi hjälper' : 'we help'}</Link>
    </div>
    <div className={styles.linkItem}>
    <Link href="/contact" >
    {router.locale == 'sv' ? 'kontakt' : 'contact'}</Link>
     </div>
         <a
          href="https://www.instagram.com/missing_cats_goteborg/"
          target={"_blank"}
          rel={"noreferrer"}
          className={styles.instagramLink}>
               <span className={styles.instagramLogo} ><BsInstagram size={28}  /></span>
          </a>
         <a
          href="https://www.facebook.com/groups/1744014935878518/"
          target={"_blank"}
          rel={"noreferrer"}
          className={styles.facebookLink}>
               <span className={styles.facebookLogo} ><BsFacebook size={28}  /></span>
          </a>

  </nav>
  </div>



  </div>
  );
  };


  export default Navbar;
