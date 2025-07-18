'use client';

import type React from 'react';
import { useState } from 'react';
import styles from './Contact.module.scss';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import { Button } from '@/components/Button/Button';
import { Loader } from '@/components/Loader/Loader';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import StaggerChildren from '@/components/Animations/StaggerChildren/StaggerChildren';
import { HoverScale } from '@/components/Animations/HoverScale/HoverScale';
import {
  FiUser,
  FiMail,
  FiMessageSquare,
  FiMapPin,
  FiPhone,
  FiSend,
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { Layout } from '@/components/Layout/Layout';
import { useTranslation } from '@/contexts/TranslationContext';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contactFormNameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contactFormEmailRequired');
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = t('contactFormEmailInvalid');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contactFormSubjectRequired');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contactFormMessageRequired');
    } else if (formData.message.length < 10) {
      newErrors.message = t('contactFormMessageTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', formData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok) {
        toast.success(t('contactFormSuccessMessage'));
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        console.error('Server error:', result);
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(
        `${t('contactFormErrorMessage')} ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className={styles.contactContainer}>
        <div className={styles.contentWrapper}>
          <FadeIn delay={0.2} direction='up' className={styles.headerSection}>
            <Title level='h1' className={styles.title} pageTitle>
              {t('contactPageTitle')}
            </Title>
            <div className={styles.description}>
              <Text as='p'>{t('contactPageDescription')}</Text>
            </div>
          </FadeIn>

          <div className={styles.contactGrid}>
            <StaggerChildren className={styles.contactInfo}>
              <HoverScale scale={1.03}>
                <FadeIn delay={0.4} direction='up'>
                  <div className={styles.infoCard}>
                    <FiMapPin className={styles.infoIcon} />
                    <Title level='h3'>{t('contactLocationTitle')}</Title>
                    <Text as='p'>
                      {t('contactLocationAddress')
                        .split('\n')
                        .map((line, index) => (
                          <span key={index}>
                            {line}
                            {index === 0 && <br />}
                          </span>
                        ))}
                    </Text>
                  </div>
                </FadeIn>
              </HoverScale>

              <HoverScale scale={1.03}>
                <FadeIn delay={0.5} direction='up'>
                  <div className={styles.infoCard}>
                    <FiPhone className={styles.infoIcon} />
                    <Title level='h3'>{t('contactPhoneTitle')}</Title>
                    <Text as='p'>{t('contactPhoneNumber')}</Text>
                  </div>
                </FadeIn>
              </HoverScale>

              <HoverScale scale={1.03}>
                <FadeIn delay={0.6} direction='up'>
                  <div className={styles.infoCard}>
                    <FiMail className={styles.infoIcon} />
                    <Title level='h3'>{t('contactEmailTitle')}</Title>
                    <Text as='p'>{t('contactEmailAddress')}</Text>
                  </div>
                </FadeIn>
              </HoverScale>
            </StaggerChildren>

            <HoverScale scale={1.01}>
              <FadeIn delay={0.7} direction='up'>
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <FiUser className={styles.inputIcon} />
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('contactFormNamePlaceholder')}
                        aria-describedby={
                          errors.name ? 'name-error' : undefined
                        }
                      />
                    </div>
                    {errors.name && (
                      <Text
                        as='span'
                        id='name-error'
                        className={styles.errorMessage}
                      >
                        {errors.name}
                      </Text>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <FiMail className={styles.inputIcon} />
                      <input
                        type='email'
                        id='email'
                        name='email'
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('contactFormEmailPlaceholder')}
                        aria-describedby={
                          errors.email ? 'email-error' : undefined
                        }
                      />
                    </div>
                    {errors.email && (
                      <Text
                        as='span'
                        id='email-error'
                        className={styles.errorMessage}
                      >
                        {errors.email}
                      </Text>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <FiMessageSquare className={styles.inputIcon} />
                      <input
                        type='text'
                        id='subject'
                        name='subject'
                        className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={t('contactFormSubjectPlaceholder')}
                        aria-describedby={
                          errors.subject ? 'subject-error' : undefined
                        }
                      />
                    </div>
                    {errors.subject && (
                      <Text
                        as='span'
                        id='subject-error'
                        className={styles.errorMessage}
                      >
                        {errors.subject}
                      </Text>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <FiMessageSquare className={styles.inputIcon} />
                      <textarea
                        id='message'
                        name='message'
                        className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t('contactFormMessagePlaceholder')}
                        aria-describedby={
                          errors.message ? 'message-error' : undefined
                        }
                      />
                    </div>
                    {errors.message && (
                      <Text
                        as='span'
                        id='message-error'
                        className={styles.errorMessage}
                      >
                        {errors.message}
                      </Text>
                    )}
                  </div>

                  <Button
                    type='submit'
                    variant='primary'
                    size='large'
                    fullWidth
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader
                          isLoading={true}
                          variant='inline'
                          size='small'
                          message=''
                        />
                        <Text as='span'>{t('contactFormSending')}</Text>
                      </>
                    ) : (
                      <>
                        <FiSend className={styles.buttonIcon} />
                        <Text as='span'>{t('contactFormSendButton')}</Text>
                      </>
                    )}
                  </Button>
                </form>
              </FadeIn>
            </HoverScale>
          </div>

          <FadeIn delay={0.9} direction='up' className={styles.mapSection}>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564750981!5m2!1sen!2s'
              width='100%'
              height='450'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='Contact Location Map'
            />
          </FadeIn>
        </div>
      </div>
    </Layout>
  );
}
