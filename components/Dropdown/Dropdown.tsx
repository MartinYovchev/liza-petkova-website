import styles from "./Dropdown.module.scss";

export type DropdownOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

type DropdownProps = {
  options: DropdownOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
};

const Dropdown = ({
  options,
  selectedValue,
  onChange,
  className,
}: DropdownProps) => {
  return (
    <div className={styles.dropdown}>
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className={styles.select}
      >
        {options.map((option) => (
          <option
            key={option.value}
            className={styles.option}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
