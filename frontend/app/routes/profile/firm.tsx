import { PageContainer } from "~/components/common/PageContainer";
import { PAGE_COPY } from "~/constants/content";

export default function FirmProfilePage() {
    return (
        <PageContainer
            title={PAGE_COPY.firmProfile.title}
            description={PAGE_COPY.firmProfile.description}
        >
            <p className="text-sm text-slate-600">
                {PAGE_COPY.firmProfile.body}
            </p>
        </PageContainer>
    );
}
