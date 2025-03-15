"use client";

import React, { useState, FormEvent } from "react";
import TextInput from "../../atoms/TextInput/TextInput";
import TextArea from "../../atoms/TextArea/TextArea";
import Button from "../../atoms/Button/Button";
import "./contact-form.scss";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setValues(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear error when field is edited
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!values.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!values.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!values.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (validate()) {
      setIsSubmitting(true);

      try {
        const formData = new FormData(e.currentTarget);
        const formObject: Record<string, string> = {};
        formData.forEach((value, key) => {
          formObject[key] = value as string;
        });

        const response = await fetch("https://formspree.io/f/xwplpleb", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObject),
        });

        if (response.ok) {
          console.log("Form submitted successfully");
          setSuccessMessage("Thank you! Your message has been sent.");
          setValues({ firstName: "", lastName: "", email: "", message: "" });
          setSubmitted(false);
          setIsSubmitted(true);
        } else {
          console.error("Error submitting form");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form
      className="ch-container"
      onSubmit={handleSubmit}
      noValidate
      action="https://formspree.io/f/xwplpleb"
      method="POST"
    >
      {/* Honeypot Field */}
      <input type="text" name="_gotcha" style={{ display: "none" }} />

      <div className="ch-row">
        <div className="ch-col-xs-12 ch-col-sm-12 ch-col-md-6 ch-col-lg-6 ch-col-xl-6">
          <TextInput
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            required
            value={values.firstName}
            onChange={handleChange}
            error={submitted ? errors.firstName : undefined}
          />
        </div>
        <div className="ch-col-xs-12 ch-col-sm-12 ch-col-md-6 ch-col-lg-6 ch-col-xl-6">
          <TextInput
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            required
            value={values.lastName}
            onChange={handleChange}
            error={submitted ? errors.lastName : undefined}
          />
        </div>
      </div>
      <div className="ch-row">
        <div className="ch-col-12">
          <TextInput
            id="email"
            name="email"
            label="Email"
            type="email"
            required
            value={values.email}
            onChange={handleChange}
            error={submitted ? errors.email : undefined}
          />
        </div>
      </div>
      <div className="ch-row">
        <div className="ch-col-12">
          <TextArea
            id="message"
            name="message"
            label="Message"
            rows={4}
            required
            value={values.message}
            onChange={handleChange}
            error={submitted ? errors.message : undefined}
          />
        </div>
      </div>

      {successMessage &&
        <div className="ch-row">
          <div className="ch-col-12">
            <p className="success-message">{successMessage}</p>
          </div>
        </div>
      }

      <div className="ch-row">
        <div className="ch-col-xs-12 ch-col-sm-12 ch-col-md-6 ch-offset-md-6 ch-col-lg-6 ch-offset-lg-6 ch-col-xl-6 ch-offset-xl-6">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || isSubmitted}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;