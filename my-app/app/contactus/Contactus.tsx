"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import React, { useState } from "react";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default function Contactus() {
  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", { firstName, lastName, email, message });
      setIsMessageSent(true);
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  return (
    <div className="p-8 rounded-lg shadow-md flex dark:shadow-gray-600">
      <div className="w-1/2 pr-6">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm text-naivyBlue dark:text-glowGreen">
              First Name:
            </label>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.firstName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-sm text-naivyBlue dark:text-glowGreen">
              Last Name:
            </label>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-sm text-naivyBlue dark:text-glowGreen">
              Email:
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-sm text-naivyBlue dark:text-glowGreen">
              Your message...
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows="4"
            />
          </div>
          <Button type="submit" variant={"outline"}>
            Submit
          </Button>
        </form>
        {isMessageSent && (
          <p className="text-green-600 mt-2">Message sent successfully!</p>
        )}
      </div>

      <div className="w-px bg-gray-300 mx-2" />

      <div className="w-1/2 px-2 bg-naivySky dark:bg-slate-950 rounded-lg">
        <div className="text-lg font-medium mb-4 text-white">
          Ways of Contact us
        </div>
        <ul className="text-sm space-y-2 text-white dark:">
          <li>InfintySport@gmail.com</li>
          <li>03-914-2400</li>
        </ul>
      </div>
    </div>
  );
}
