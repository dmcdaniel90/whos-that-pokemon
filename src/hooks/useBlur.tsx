import { useEffect, useState } from "react";

export default function useBlur({ image }: { image: HTMLImageElement }): { image: HTMLImageElement, toggleBlur: () => void } {
    const [isBlurred, setIsBlurred] = useState(true);

    useEffect(() => {
        if (isBlurred) {
            image.style.filter = 'blur(10px)';
        } else {
            image.style.filter = 'blur(0px)';
        }
    }, [isBlurred, image]);

    const toggleBlur = (): void => {
        setIsBlurred(!isBlurred);
    }

    return { image, toggleBlur }
}