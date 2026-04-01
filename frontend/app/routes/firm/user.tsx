import { PageContainer } from "~/components/common/PageContainer";
import { PAGE_COPY } from "~/constants/content";

export default function FirmUserPage() {
    return (
        <PageContainer
            title={PAGE_COPY.firmUser.title}
            description={PAGE_COPY.firmUser.description}
        >
            <p className="text-sm text-slate-600">{PAGE_COPY.firmUser.body}</p>
        </PageContainer>
    );
}
