import Dropdown, { DropdownOption } from "../Dropdown/Dropdown";

import EnFlag from "../../public/placeholder.svg";
import BgFlag from "../../public/placeholder.svg";

type Language = "en" | "bg";

interface LanguageSwitcherProps {
  value: Language;
  onChange: (lang: Language) => void;
  className?: string;
}

const options: DropdownOption[] = [
  { label: "English", value: "en", icon: EnFlag },
  { label: "Български", value: "bg", icon: BgFlag },
];

const LanguageSwitcher = ({
  value,
  onChange,
  className,
}: LanguageSwitcherProps) => {
  return (
    <Dropdown
      className={className}
      options={options}
      selectedValue={value}
      onChange={(val) => onChange(val as Language)}
    />
  );
};

export default LanguageSwitcher;
