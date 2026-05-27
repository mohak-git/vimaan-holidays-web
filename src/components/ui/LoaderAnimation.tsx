import Rive from "@rive-app/react-webgl2";

const RIVE_ANIM_URL = "/loader.riv";

export default function LoaderAnimation() {
    return <Rive src={RIVE_ANIM_URL} />;
}
