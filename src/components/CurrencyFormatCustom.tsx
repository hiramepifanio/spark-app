import { NumericFormat, NumericFormatProps } from "react-number-format";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material/TextField";

interface CurrencyFormatProps {
  inputRef: (instance: Number | null) => void;
  name?: string;
  onChange: (event: { target: { name?: string; value: string } }) => void;
}

// Wrapper for MUI integration
export default function CurrencyFormatCustom(props: CurrencyFormatProps & NumericFormatProps<any>) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      allowNegative={false}
      decimalScale={2}
      fixedDecimalScale
    />
  );
};