// Questions anti-robot « décalées » du formulaire de contact.
// Pas une sécurité forte (les réponses sont dans le code client) : ça filtre les robots génériques,
// en complément du pot de miel, du délai minimal et (si activé) de Turnstile.

export type HumanCheckOption = { value: string; label: string };

export type HumanCheck = {
  id: string;
  question: string;
  answer: string;
  options: [HumanCheckOption, HumanCheckOption];
  rightMessage: string;
  wrongMessage: string;
};

export const HUMAN_CHECKS: HumanCheck[] = [
  {
    id: "terre",
    question: "La Terre est…",
    answer: "ronde",
    options: [
      { value: "ronde", label: "Ronde" },
      { value: "plate", label: "Plate" },
    ],
    rightMessage: "Bravo, Galilée serait fier de vous.",
    wrongMessage: "Hmm… la NASA aimerait vous dire deux mots. Essayez l’autre réponse ?",
  },
  {
    id: "chat",
    question: "Un chat, ça fait…",
    answer: "miaou",
    options: [
      { value: "miaou", label: "Miaou" },
      { value: "meuh", label: "Meuh" },
    ],
    rightMessage: "Exact. Et il réclame déjà ses croquettes.",
    wrongMessage: "Ça, c’est une vache déguisée en chat. L’autre réponse, peut-être ?",
  },
  {
    id: "calcul",
    question: "2 + 2 = ?",
    answer: "4",
    options: [
      { value: "4", label: "4" },
      { value: "22", label: "22" },
    ],
    rightMessage: "Imparable. Les maths ne mentent pas.",
    wrongMessage: "Presque ! Enfin… pas vraiment. Retentez votre chance.",
  },
  {
    id: "soleil",
    question: "Le soleil se lève à l'…",
    answer: "est",
    options: [
      { value: "est", label: "Est" },
      { value: "ouest", label: "Ouest" },
    ],
    rightMessage: "Parfait, vous êtes du matin !",
    wrongMessage: "Là, c’est plutôt le coucher de soleil. Essayez l’autre ?",
  },
];

export function findHumanCheck(id: string): HumanCheck | undefined {
  return HUMAN_CHECKS.find((c) => c.id === id);
}

export function isHumanCheckValid(id: string | undefined, answer: string | undefined): boolean {
  if (!id || !answer) return false;
  return findHumanCheck(id)?.answer === answer;
}
