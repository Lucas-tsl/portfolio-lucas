import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
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
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nouveau message de {senderName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={heading}>Nouveau message via le portfolio</Heading>
            <Text style={text}>
              <strong>Nom :</strong> {senderName}
            </Text>
            <Text style={text}>
              <strong>Email :</strong> {senderEmail}
            </Text>
            <Hr style={hr} />
            <Text style={text}>
              <strong>Message :</strong>
            </Text>
            <Text style={messageText}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const section = { padding: "0 48px" };

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const text = { margin: "0 0 10px 0", textAlign: "left" as const, color: "#333", fontSize: "16px", lineHeight: "24px" };

const messageText = { ...text, whiteSpace: "pre-wrap" as const };

const hr = { borderColor: "#e6ebf1", margin: "20px 0" };