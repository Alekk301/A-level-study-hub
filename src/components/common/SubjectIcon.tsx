import {
  Binary,
  BriefcaseBusiness,
  FlaskConical,
  Sigma,
  type LucideProps,
} from "lucide-react";

const icons = {
  "9709": Sigma,
  "9618": Binary,
  "9609": BriefcaseBusiness,
  "9701": FlaskConical,
};

export function SubjectIcon({
  code,
  ...props
}: LucideProps & { code: string }) {
  const Icon = icons[code as keyof typeof icons] ?? Sigma;
  return <Icon aria-hidden="true" {...props} />;
}
