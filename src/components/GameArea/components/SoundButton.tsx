import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import useSound from "use-sound";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { volumeIconStyles } from "../styles/muiStyles";
import { SoundButtonProps } from "../../../types/types";
import { memo } from "react";

function SoundButton({ soundFileName, tooltipString }: SoundButtonProps) {

    const [play] = useSound(soundFileName)

    const handlePlaySound = (e: React.MouseEvent): void => {
        e.preventDefault();
        play()
    };

    return (
        <Tooltip title={tooltipString}>
            <Button
                variant="contained"
                sx={{ ...volumeIconStyles }}
                onClick={handlePlaySound}
            >
                <VolumeUpIcon sx={{ height: '100%', width: '100%' }} />
            </Button>
        </Tooltip>
    )
}

export default memo(SoundButton)