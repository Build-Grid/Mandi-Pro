import { PageContainer } from "~/components/common/PageContainer";
import { PAGE_COPY } from "~/constants/content";

export default function ToBeDecidedPage() {
    return (
        <PageContainer
            title={PAGE_COPY.toBeDecided.title}
            description={PAGE_COPY.toBeDecided.description}
        >
            <p className="text-sm text-slate-600">
                {PAGE_COPY.toBeDecided.body}
            </p>
        </PageContainer>
    );
}
