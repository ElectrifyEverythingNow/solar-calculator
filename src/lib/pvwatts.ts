interface PVWattsParams {
  systemCapacityKw: number;
  address: string;
}

interface PVWattsResponse {
  outputs: {
    ac_annual: number;
    solrad_annual: number;
  };
  errors?: { error: string }[];
}

export async function fetchPVWattsEstimate(
  params: PVWattsParams
): Promise<{ annualKwh: number } | { error: string }> {
  const apiKey = process.env.NEXT_PUBLIC_NREL_API_KEY;
  if (!apiKey) {
    return { error: "Zip code refinement is temporarily unavailable. The estimate above uses state-level averages." };
  }

  const url = new URL("https://developer.nrel.gov/api/pvwatts/v8.json");
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("system_capacity", String(params.systemCapacityKw));
  url.searchParams.set("module_type", "1");
  url.searchParams.set("losses", "20");
  url.searchParams.set("array_type", "0");
  url.searchParams.set("tilt", "20");
  url.searchParams.set("azimuth", "180");
  url.searchParams.set("address", params.address);

  try {
    const res = await fetch(url.toString());
    if (!res.ok) {
      return { error: `PVWatts API error: ${res.status}` };
    }
    const data: PVWattsResponse = await res.json();
    if (data.errors && data.errors.length > 0) {
      return { error: data.errors[0].error };
    }
    return { annualKwh: data.outputs.ac_annual };
  } catch (e) {
    return { error: "Failed to connect to PVWatts API" };
  }
}
