import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactConfirmationEmailProps {
  name: string;
}

export const ContactConfirmationEmail = ({
  name,
}: ContactConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirmation de réception de votre message</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={heading}>Bonjour {name},</Heading>
            <Text style={text}>
              J'ai bien reçu votre message via mon portfolio et je vous en remercie.
            </Text>
            <Text style={text}>
              Je prendrai le temps de le lire attentivement et je reviendrai vers vous dans les plus brefs délais.
            </Text>
            <Text style={text}>
              Cordialement,
              <br />
              Lucas Troteseil
            </Text>
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

const heading = { fontSize: "24px", letterSpacing: "-0.5px", lineHeight: "1.3", fontWeight: "400", color: "#484848", padding: "17px 0 0" };

const text = { margin: "0 0 10px 0", textAlign: "left" as const, color: "#333", fontSize: "16px", lineHeight: "24px" };