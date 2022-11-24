import { useQuery } from '@apollo/client';
import { getGlobalQuery } from '../../api/pages';
import { GlobalPageModel } from '../../models/globalPageModel';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsInstagram, BsFacebook } from 'react-icons/bs';
import { MdOutlineLanguage } from 'react-icons/md';



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
  <>
   <section className="top-nav">
   <div className="imgWrapper">
          <Image
            src={logo.url}
            alt="logoMissingCats"
            width="500"
            height="500"
            className="img"
            loading="eager"
            quality={70}
          />
        <div className="navTitle" >
        {header}
        </div>
        </div>
      <input id="menu-toggle" type="checkbox" />
      <label className='menu-button-container' htmlFor="menu-toggle">
      <div className='menu-button'></div>
    </label>
    <ul className="menu">
        <li className={router.asPath == "/" ? "active" : ""}>
        <Link href="/">
                   {router.locale == 'sv' ? 'om förening' : 'about us'}
              </Link></li>
        <li className={router.asPath == "/wehelp" ? "active" : ""}>
        <Link href="/wehelp" >
                {router.locale == 'sv' ? 'vi hjälper' : 'we help'}</Link></li>
        <li className={router.asPath == "/contact" ? "active" : ""}>
        <Link href="/contact" >
                {router.locale == 'sv' ? 'kontakt' : 'contact'}</Link></li>
      <li><a
        href="https://www.instagram.com/missing_cats_goteborg/"
        target={"_blank"}
        rel={"noreferrer"}
        className="instagramLink">
        <span className="instagramLogo" ><BsInstagram size={28}  /></span>
        </a>
        <a
                href="https://www.facebook.com/groups/1744014935878518/"
                target={"_blank"}
                rel={"noreferrer"}
                className="facebookLink">
                <span className="facebookLogo" ><BsFacebook size={28}  /></span>
                </a>
        </li>

       <li>

       <Link
                href={router.asPath}
                locale={router.locale == 'sv' ? 'en' : 'sv'} >


               <h4> {router.locale == 'sv' ? 'English' : 'Svenska'}</h4>



        </Link>
       </li>
      </ul>
    </section>


 </>

  );
  };


  export default Navbar;
