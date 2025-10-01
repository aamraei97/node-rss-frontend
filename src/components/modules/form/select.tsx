import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useController,
} from "react-hook-form";

type optionType = | { label: string; value: string, image?: string }[]
  | readonly { label: string; value: string, image?: string }[]
type SelectProps<T extends FieldValues> = React.ComponentProps<"select"> & {
  label: string;
  control: Control<T>;
  name: Path<T>;
  options?: optionType
  groups?: { label: string; options: optionType }[];
};
export function FormSelect<T extends FieldValues>({
  className,
  label,
  control,
  name,
  options,
  groups,
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
              {options && (
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="flex items-center gap-2">
                      {option.image && <img src={option.image} alt={option.label} className="w-4 h-4 " />}
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
              {groups &&
                groups.map((group) => (
                  <SelectGroup key={group.label} >
                    <>
                      <SelectLabel>{group.label}</SelectLabel>
                      {group.options.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="flex items-center gap-2">
                          {option.image && <img src={option.image} alt={option.label} className="w-6 h-6 " />}
                          {option.label}
                        </SelectItem>
                      ))}
                    </>

                  </SelectGroup>
                ))
              }
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
