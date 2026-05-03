type Props = {
    sidebarCollapsed: boolean;
    activeCrumbs: string[];
};

export default function SidebarFooter({
    sidebarCollapsed,
    activeCrumbs,
}: Props) {
    if (sidebarCollapsed) return null;

    return (
        <div className="mt-auto rounded-lg border border-stone-200 bg-stone-50 p-2.5 text-xs text-stone-600 leading-tight">
            <p className="font-medium text-stone-700">Active</p>
            <p className="mt-1 text-stone-500">{activeCrumbs.join(" / ")}</p>
        </div>
    );
}
