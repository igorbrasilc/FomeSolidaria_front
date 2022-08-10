import { useRef } from "react";

export default function useDebounce(delay = 500, notDelayInFirstTime = true) {
    const isFirstTime = useRef(notDelayInFirstTime);
    const debouncing = useRef()
}