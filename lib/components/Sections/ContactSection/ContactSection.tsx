import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { getContactSectionQuery } from "../../../api/sections";
import styles from "./ContactSection.module.scss";
import Image from 'next/image'

type Props = {
  id: string;
};

export const ContactSection = ({ id }: Props) => {
  const { locale } = useRouter();

  const { loading, data } = useQuery(getContactSectionQuery(id), {
    variables: {
      locale: locale,
    },
  });

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  //   Form validation state

  const [errors, setErrors] = useState<any>({});

  // Setting success or failure messages states

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  if (loading) return <div></div>;
  // Validation check method

  const handleValidation = () => {
    let tempErrors: any = {};
    let isValid = true;

    if (fullName.length <= 0) {
      tempErrors["fullName"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (phone.length <= 0) {
      tempErrors["phone"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    return isValid;
  };

  //   Handling form submit

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({
          email: email,
          fullName: fullName,
          phone: phone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        setShowSuccessMessage(false);
        setShowFailureMessage(true);

        return;
      }

      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      // Reset form fields
      setFullName("");
      setEmail("");
      setCompany("");
    }
  };

  return (
    <>
      <section className={styles.container} id="contact">
        <div className={styles.wrapper}>
          <div className={styles.headerContainer}>
            <h1>{data.contactSection.title}</h1>
          </div>

        <div className={styles.image}>
          <Image
            className={styles.img}
            src={data.contactSection.image.url}
            width={500}
            height={500}
            alt="redPhoneCat"
            loading="eager"
            quality={75}
            objectFit="cover"
          />
        </div>

          <form className={styles.contactUs} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <p className={styles.styleContact}>
                {data.contactSection.header}
              </p>
              <input
                id="name-field"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                className={styles.field}
                placeholder={data.contactSection.namePlaceholder}
              />
              {errors?.fullName && <p>Name cannot be empty.</p>}
            </div>
            <div className={styles.formGroup}>
              <p className={styles.styleContact}>
                {data.contactSection.companyText}
              </p>
              <input
                id="phone-field"
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className={styles.field}
                placeholder={data.contactSection.phonePlaceholder}
              />
              {errors?.phone && <p>Phone cannot be empty.</p>}
            </div>
            <div className={styles.formGroup}>
              <p className={styles.styleContact}>
                {data.contactSection.emailText}{" "}
              </p>
              <input
                id="email-field"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className={styles.field}
                placeholder={data.contactSection.emailPlaceholder}
              />
              {errors?.email && <p>Email cannot be empty.</p>}
            </div>

            <button type="submit" className={styles.buttonStyle}>
              {data.contactSection.buttonText}
            </button>
            <div>
              {showSuccessMessage && (
                <p className={styles.colorGreen}>Thank you! Your Message has been delivered.</p>
              )}

              {showFailureMessage && (
                <p className={styles.colorError}>Oops! Something went wrong, please try again.</p>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
