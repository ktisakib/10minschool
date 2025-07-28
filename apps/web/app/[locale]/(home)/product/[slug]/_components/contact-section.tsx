import Link from "next/link";
import { PhoneIcon } from "lucide-react";

const ContactSection = ({ t }: { t: any }) => (
    <div className="pt-2 flex justify-between items-center">
        <div className="text-gray-400 text-sm mb-2">
            { t("cta_info") }
        </div>
        <Link
            href="tel:16910"
            className="flex items-center gap-2 text-green-600 font-semibold text-base hover:underline"
        >
            <PhoneIcon className="w-4 h-4 fill-primary stroke-0" />
            { t("cta_call") }
        </Link>
    </div>
);

export default ContactSection;
