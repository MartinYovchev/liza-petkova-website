"use client";

import { useState } from "react";
import styles from "./Contact.module.scss";
import Title from "@/components/Typography/Title";
import Text from "@/components/Typography/Text";
import { Button } from "@/components/Button/Button";
import {
  FiUser,
  FiMail,
  FiMessageSquare,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
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
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", formData);

      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.headerSection}>
          <Title level="h1" className={styles.title}>
            Get in Touch
          </Title>
          <div className={styles.description}>
            <Text as="p">
              Have a question or want to work together? We'd love to hear from
              you. Fill out the form below and we'll get back to you as soon as
              possible.
            </Text>
          </div>
        </div>

        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <FiMapPin className={styles.infoIcon} />
              <Title level="h3">Our Location</Title>
              <Text as="p">
                123 Business Street, Suite 100
                <br />
                New York, NY 10001
              </Text>
            </div>

            <div className={styles.infoCard}>
              <FiPhone className={styles.infoIcon} />
              <Title level="h3">Phone Number</Title>
              <Text as="p">+1 (555) 123-4567</Text>
            </div>

            <div className={styles.infoCard}>
              <FiMail className={styles.infoIcon} />
              <Title level="h3">Email Address</Title>
              <Text as="p">contact@yourcompany.com</Text>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FiUser className={styles.inputIcon} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`${styles.input} ${
                    errors.name ? styles.inputError : ""
                  }`}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                />
              </div>
              {errors.name && (
                <span className={styles.errorMessage}>{errors.name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FiMail className={styles.inputIcon} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`${styles.input} ${
                    errors.email ? styles.inputError : ""
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                />
              </div>
              {errors.email && (
                <span className={styles.errorMessage}>{errors.email}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FiMessageSquare className={styles.inputIcon} />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={`${styles.input} ${
                    errors.subject ? styles.inputError : ""
                  }`}
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                />
              </div>
              {errors.subject && (
                <Text as="p" className={styles.errorMessage}>
                  {errors.subject}
                </Text>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FiMessageSquare className={styles.inputIcon} />
                <textarea
                  id="message"
                  name="message"
                  className={`${styles.textarea} ${
                    errors.message ? styles.inputError : ""
                  }`}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                />
              </div>
              {errors.message && (
                <Text as="p" className={styles.errorMessage}>
                  {errors.message}
                </Text>
              )}
            </div>

            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Text as="p" className={styles.loadingSpinner}>
                  Sending...
                </Text>
              ) : (
                <>
                  <FiSend className={styles.buttonIcon} />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        <div className={styles.mapSection}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564750981!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
