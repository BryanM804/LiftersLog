import { useEffect, useRef, useState } from "react";

type ItemPickerProps = {
    placeholder?: string;
    options: Array<string>;
    selected: string;
    setSelected: (s: string) => void;
}

function ItemPicker({ placeholder, options, selected, setSelected }: ItemPickerProps) {

    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null)

    // Close if you click/touch outside of the menu
    useEffect(() => {
        function outsideClickHandler(e: TouchEvent | MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("touchstart", outsideClickHandler)
        document.addEventListener("mousedown", outsideClickHandler)

        return () => {
            document.removeEventListener("touchstart", outsideClickHandler)
            document.removeEventListener("mousedown", outsideClickHandler)
        }
    }, [])

    function pickOption(option: string) {
        setSelected(option)
        setOpen(false)
    }

    return (
        <>
            <div
                ref={menuRef}
                className={`dropdownPickerMenu ${open && " openDropdown"}`}
            >
                <button 
                    onClick={() => setOpen(true)}
                    className="dropdownMenuButton"
                >
                {
                    selected && selected != "" ? selected :
                        placeholder ? <span className="darkFont">{placeholder}</span> : "Select"
                }
                </button>
                {
                    open &&
                    <ul className="dropdownList">
                    {
                        options.map((option) =>
                            <li className="dropdownOption" key={option} onClick={() => pickOption(option)}>{option}</li>
                        )
                    }
                    </ul>
                }
            </div>
        </>
    )
}

export default ItemPicker