import QRCode from "react-qr-code";
import useTranslation from "next-translate/useTranslation";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Panel from "../../atoms/Panel/Panel";
import Heading from "../../atoms/Heading/Heading";
import Button from "../../atoms/Button/Button";
import Divider from "../../atoms/Divider/Divider";

interface QRCodePanelProps {
  id: string;
  link: string;
}

const ShareRealEstatePanel = ({ id, link }: QRCodePanelProps) => {
  const { t } = useTranslation();

  const downloadQRCode = () => {
    const svg = document.getElementById(id);
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qr-code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <Panel
      header={
        <Heading as="h2" variant="h4">
          {t("realEstates:text.shareRealEstate")}
        </Heading>
      }
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="inline-flex justify-center mb-4">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore  */}
          <QRCode id={id} value={link} size={180} />
        </div>
        <Button onClick={downloadQRCode} size="xs" fill>
          <p>{t("realEstates:text.downloadQrCode")}</p>
        </Button>
        <Divider text={t("common:text.or")} />
        <div className="flex flex-wrap justify-center space-x-4">
          <EmailShareButton url={link}>
            <EmailIcon round size={32} />
          </EmailShareButton>
          <WhatsappShareButton url={link}>
            <WhatsappIcon round size={32} />
          </WhatsappShareButton>
          <FacebookShareButton url={link}>
            <FacebookIcon round size={32} />
          </FacebookShareButton>
        </div>
      </div>
    </Panel>
  );
};

export default ShareRealEstatePanel;
