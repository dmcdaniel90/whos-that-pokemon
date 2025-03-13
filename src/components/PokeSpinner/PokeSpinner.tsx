import Lottie from "lottie-react";
import pokeball from "./pokeball.json"

export default function PokeSpinner() {
    return (

        <Lottie
            animationData={pokeball}
            loop={true}
            style={{ width: 200, height: 200, marginLeft: "auto", marginRight: "auto" }}
        />
    );
}