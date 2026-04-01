import { PageContainer } from "~/components/common/PageContainer";
import { PAGE_COPY } from "~/constants/content";

export default function TradeEntryPage() {
    return (
        <PageContainer
            title={PAGE_COPY.tradeEntry.title}
            description={PAGE_COPY.tradeEntry.description}
        >
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                {PAGE_COPY.tradeEntry.body}
            </div>
        </PageContainer>
    );
}
