import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Control, Controller, FieldValues, Path, useController } from "react-hook-form"
type InputProps<T extends FieldValues> = React.ComponentProps<"textarea"> & {
	label: string
	control: Control<T>
	name: Path<T>
}
export function FormTextarea<T extends FieldValues>({ className, label, control, name, ...props }: InputProps<T>) {
	const { field, fieldState } = useController({ control, name })
	return (
		<div className={cn("flex flex-col gap-2 relative pb-4", className)}>
			<label htmlFor={props.id} className="text-sm font-medium">
				{label}
			</label>
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<Textarea
						{...field}
						{...props}
						className={cn("bg-white", fieldState.error && "border-red-500 focus-visible:border-red-500")}
					/>
				)}
			/>
			{fieldState.error && (
				<p className="text-red-500 text-sm absolute -bottom-2.5 right-0">{fieldState.error.message}</p>
			)}
		</div>
	)
}
