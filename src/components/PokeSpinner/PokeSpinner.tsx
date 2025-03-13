import Lottie from "lottie-react";
import pokeball from "./pokeball.json"

export default function PokeSpinner() {
    return (
        <Lottie
            animationData={pokeball}
            loop={true}
            style={{ width: "100%" }}
        />
    );
}