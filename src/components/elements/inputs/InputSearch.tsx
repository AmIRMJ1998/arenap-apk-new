import MagnifierIcon from "@/components/icons/menu/MagnifierIcon"

const InputSearch = ({ value, changeHandler }: { value: string, changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {


      return (
            <div className="bg-gray-100 rounded-xl w-full flex items-center">
                  <input className="bg-gray-100 h-[2.5rem] rtl:pr-4 ltr:pl-4 rounded-xl w-[calc(100%-2.8125rem)]" value={value} onChange={changeHandler} type="text" placeholder={"جستجو"} />

                  <div className="flex justify-center w-[2.8125rem]">
                        <MagnifierIcon active={false} />
                  </div>
            </div>
      )
}


export default InputSearch