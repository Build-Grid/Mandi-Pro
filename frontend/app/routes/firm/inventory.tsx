import { PageContainer } from "~/components/common/PageContainer";
import { PAGE_COPY } from "~/constants/content";

export default function FirmInventoryPage() {
    return (
        <PageContainer
            title={PAGE_COPY.firmInventory.title}
            description={PAGE_COPY.firmInventory.description}
        >
            <p className="text-sm text-slate-600">
                {PAGE_COPY.firmInventory.body}
            </p>
        </PageContainer>
    );
}
