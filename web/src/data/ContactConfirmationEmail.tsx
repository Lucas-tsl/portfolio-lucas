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

interface ContactConfirmationEmailProps {
  name: string;
}

export const ContactConfirmationEmail = ({
  name,
}: ContactConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirmation de votre prise de contact</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Merci pour votre message, {name} !</Heading>
        <Text style={paragraph}>
          J'ai bien reçu votre demande de contact. Je reviens vers vous dans les plus brefs délais.
        </Text>
        <Text style={paragraph}>
          À très bientôt,
          <br />
          Lucas Troteseil
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ContactConfirmationEmail;

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};