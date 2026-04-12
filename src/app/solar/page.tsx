"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { StateCalculator } from "@/components/StateCalculator";

function SolarPageContent() {
  const searchParams = useSearchParams();
  const stateParam = searchParams.get("state");

  return <StateCalculator initialStateCode={stateParam} />;
}

export default function SolarPage() {
  return (
    <Suspense>
      <SolarPageContent />
    </Suspense>
  );
}
