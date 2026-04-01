import { PageContainer } from "~/components/common/PageContainer";
import { PAGE_COPY } from "~/constants/content";

export default function FirmManagementPage() {
    return (
        <PageContainer
            title={PAGE_COPY.firmManagement.title}
            description={PAGE_COPY.firmManagement.description}
        >
            <p className="text-sm text-slate-600">
                {PAGE_COPY.firmManagement.body}
            </p>
        </PageContainer>
    );
}
