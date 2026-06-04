import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactFormEmailProps {
  senderName: string;
  senderEmail: string;
  message: string;
}

export const ContactFormEmail = ({
  senderName,
  senderEmail,
  message,
}: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>Nouveau message depuis votre portfolio</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Nouveau message de {senderName}</Heading>
        <Text style={paragraph}>
          Vous avez reçu un nouveau message via le formulaire de contact de votre portfolio.
        </Text>
        <Text style={paragraph}>
          <strong>De :</strong> {senderName}
        </Text>
        <Text style={paragraph}>
          <strong>Email :</strong> {senderEmail}
        </Text>
        <Text style={paragraph}>
          <strong>Message :</strong>
          <br />
          {message}
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ContactFormEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const heading = {
  fontSize: "32px",
  fontWeight: "bold",
  textAlign: "center" as const,
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};