import { PageContainer } from "~/components/common/PageContainer";
import { PAGE_COPY } from "~/constants/content";

export default function UserProfilePage() {
    return (
        <PageContainer
            title={PAGE_COPY.userProfile.title}
            description={PAGE_COPY.userProfile.description}
        >
            <p className="text-sm text-slate-600">
                {PAGE_COPY.userProfile.body}
            </p>
        </PageContainer>
    );
}
