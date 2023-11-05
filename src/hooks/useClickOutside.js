import { useEffect } from "react";

function UseClickOutside(
    ref,
    toggleVisibility,
    submitWhenClickOutside = false,
    handleAction = () => { },
    toggleState = false,
) {
    useEffect(() => {
        const timeOfEffect = performance.now();

        const handleOutsideClick = e => {
            if (timeOfEffect > e.timeStamp) {
                return;
            }

            if (ref?.current && !ref?.current.contains(e.target)) {
                toggleVisibility();
                if (submitWhenClickOutside === true && toggleState === true) {
                    handleAction(e);
                }
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("visibilitychange", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("visibilitychange", handleOutsideClick);
        };
    }, [ref, toggleVisibility, handleAction]);
}

export default UseClickOutside;
