import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Verification email sent", response);
  } catch (error) {
    console.error("Can't verify email", error);
    throw new Error("Failed to send verification email", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email, name }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "05ba1952-5b5e-4c5e-8885-df8aef776593",
      template_variables: {
        company_info_name: "Lost and Found",
        name: name,
        company_info_address: "University of Ilorin",
        company_info_city: "Ilorin",
        company_info_country: "Nigeria",
      },
    });

    console.log("Welcome email sent", response);
  } catch (error) {
    console.error("Can't send welcome email", error);
    throw new Error("Failed to send welcome email", error);
  }
};


export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}" , resetURL),
      category: "Password Reset",
    });

    

    console.log("Password reset email sent", response);
  } catch (error) {
    console.error("Can't reset password", error);
    throw new Error("Failed to send password reset email", error);
  }
}