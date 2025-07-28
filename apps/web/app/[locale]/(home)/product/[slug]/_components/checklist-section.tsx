import Image from "next/image";
import { CheckIcon } from "lucide-react";

interface ChecklistItem {
    id: string;
    text: string;
    icon?: string;
}

const ChecklistSection = ({ checklist, t }: { checklist: ChecklistItem[]; t: any }) => {
    if (!checklist?.length) return null;

    return (
        <div className="p-4 space-y-3">
            <h2 className="text-2xl font-bold text-foreground">
                { t("checklist_title") }
            </h2>
            { checklist.map((item) => (
                <div key={ item.id } className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-full flex-shrink-0">
                        { item.icon ? (
                            <Image
                                src={ item.icon }
                                alt={ item.text }
                                width={ 20 }
                                height={ 20 }
                                className="size-5"
                            />
                        ) : (
                            <CheckIcon className="w-3 h-3 text-white" />
                        ) }
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                        { item.text }
                    </span>
                </div>
            )) }
        </div>
    );
};

export default ChecklistSection;
