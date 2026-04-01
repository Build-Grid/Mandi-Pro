import { PageContainer } from "~/components/common/PageContainer";
import { PAGE_COPY } from "~/constants/content";

export default function DashboardPage() {
    return (
        <PageContainer
            title={PAGE_COPY.dashboard.title}
            description={PAGE_COPY.dashboard.description}
        >
            <p className="text-sm text-slate-600">{PAGE_COPY.dashboard.body}</p>
        </PageContainer>
    );
}
