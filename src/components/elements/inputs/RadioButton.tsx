import cn from "@/utils/clsxFun"

export type CustomRadioButtonType = {
    selected: boolean,
    color: string,
    title: string,
    name: string,
    index: number,
    value: number | string,
    changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const RadioButton = ({ selected, color = "bg-primary", title, changeHandler, name, index, value }: CustomRadioButtonType) => {

    return (
        <label htmlFor={`${name}-${index}`} className='flex items-center gap-3 cursor-pointer'>

            <div className={cn(`rounded-full size-[1.1875rem] flex items-center justify-center `, {
                [color]: selected,
                "bg-gray-100": !selected
            })}>
                {selected &&
                    <div className="rounded-full size-[0.6875rem] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.5)]" />
                }
            </div>
            <p className="text-md">{title}</p>
            <input
                type="radio"
                name={name}
                id={`${name}-${index}`}
                value={value}
                onChange={changeHandler}
                checked={selected}
                hidden
            />
        </label>
    )
}

export default RadioButton