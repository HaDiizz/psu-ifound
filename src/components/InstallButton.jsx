import { useEffect, useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { MdOutlineInstallDesktop } from "react-icons/md";

const InstallButton = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const handleInstall = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }

  return (
    <Tooltip content="Install PSU iFound" color="primary" placement="bottom">
      <Button
        isIconOnly
        color="primary"
        aria-label="Install"
        onClick={handleInstall}
      >
        <MdOutlineInstallDesktop size={20} />
      </Button>
    </Tooltip>
  );
};

export default InstallButton;
