import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
} from "@/components/ui/select";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useController,
} from "react-hook-form";
type SelectProps<T extends FieldValues> = React.ComponentProps<"select"> & {
  label: string;
  control: Control<T>;
  name: Path<T>;
  options:
    | { label: string; value: string }[]
    | readonly { label: string; value: string }[];
};
export function FormSelect<T extends FieldValues>({
  className,
  label,
  control,
  name,
  options,
  ...props
}: SelectProps<T>) {
  const {
    field: test,
    fieldState,
    formState,
  } = useController({ control, name });
  return (
    <div className="flex flex-col gap-2 relative pb-4">
      <label htmlFor={props.id} className="text-sm font-medium">
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            defaultValue={field.value}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full" size="default">
              <SelectValue placeholder={label} />
              {/* {field.value} */}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {fieldState.error && (
        <p className="text-red-500 text-[13px] absolute -bottom-1.5 right-0">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}
