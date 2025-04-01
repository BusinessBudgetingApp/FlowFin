"use client";

import MainContentPendapatan from "@/components/pendapatan/MainContentPendapatan";
import { withAuth } from "@/lib/withAuth";

function PendapatanPage() {
    return (
        <>
            <MainContentPendapatan />
        </>
    );
}

export default withAuth(PendapatanPage);