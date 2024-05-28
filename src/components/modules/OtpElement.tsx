import { useEffect, useRef } from "react";

type PartialInputProps = Pick<
    React.ComponentPropsWithoutRef<"input">,
    "className" | "style"
>;

type Props = {
    /**
     * full value of the otp input, up to {size} characters
     */
    value: string;
    onChange(value: string): void;
    /**
     * Number of characters/input for this component
     */
    size?: number;
    /**
     * Validation pattern for each input.
     * e.g: /[0-9]{1}/ for digits only or /[0-9a-zA-Z]{1}/ for alphanumeric
     */
    validationPattern?: RegExp;
} & PartialInputProps;


const OtpInput = (props: Props) => {
    const {
        //Set the default size to 6 characters
        size = 5,
        //Default validation is digits
        validationPattern = /[0-9]{1}/,
        value,
        onChange,
        className,
        ...restProps
    } = props;

    // Create an array based on the size.
    const arr = new Array(size).fill("-");


    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const elem = e.target;
        const val = e.target.value;
        // check if the value is valid
        if (!validationPattern.test(val) && val !== "") return;

        // change the value of the upper state using onChange
        const valueArr = value.split("");
        valueArr[index] = val;
        const newVal = valueArr.join("").slice(0, 6);
        onChange(newVal);

        //focus the next element if there's a value
        if (val) {
            const next = elem.nextElementSibling as HTMLInputElement | null;
            next?.focus();
        }
    };
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const current = e.currentTarget;
        if (e.key === "ArrowLeft" || e.key === "Backspace") {
          const prev = current.previousElementSibling as HTMLInputElement | null;
          prev?.focus();
          prev?.setSelectionRange(0, 1);
          return;
        }
    
        if (e.key === "ArrowRight") {
          const prev = current.nextSibling as HTMLInputElement | null;
          prev?.focus();
          prev?.setSelectionRange(0, 1);
          return;
        }
      };

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef?.current?.focus()
    }, [])

    return (
        <div className="grid grid-cols-5  gap-2" dir="ltr">
            {/* Map through the array and render input components */}
            {arr.map((_, index) => {
                return (
                    <input
                        ref={index === 0 ? inputRef : null}
                        key={index}
                        {...restProps}
                        /**
                         * Add some styling to the input using daisyUI + tailwind.
                         * Allows the user to override the className for a different styling
                         */
                        className={className || `border border-gray-300 text-center size-[3.75rem] rounded-lg`}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern={validationPattern.source}
                        onKeyUp={handleKeyUp}
                        maxLength={6}
                        onChange={(e) => handleInputChange(e, index)}
                        value={value.at(index) ?? ""}
                    />
                );
            })}
        </div>
    );
};

export default OtpInput;