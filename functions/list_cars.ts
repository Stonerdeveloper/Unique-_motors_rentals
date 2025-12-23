import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.5";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export default async (req: Request) => {
    const url = new URL(req.url);
    const location = url.searchParams.get("location");
    const type = url.searchParams.get("type");
    const withDriver = url.searchParams.get("with_driver");
    const maxPrice = url.searchParams.get("max_price");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let query = supabase.from("cars").select("*");
    if (location) query = query.eq("location", location);
    if (type) query = query.eq("type", type);
    if (withDriver) query = query.eq("with_driver", withDriver === "true");
    if (maxPrice) query = query.lte("price_per_day", Number(maxPrice));

    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    const { data, error } = await query;
    return new Response(JSON.stringify({ data, error }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
};
