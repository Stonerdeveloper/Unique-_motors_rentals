import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.5";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export default async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    const signature = req.headers.get("paystack-signature") || "";
    const payload = await req.text();
    // In a real implementation you would verify the signature using your Paystack secret.
    // For this demo we just parse the JSON.
    let event;
    try {
        event = JSON.parse(payload);
    } catch (e) {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Example handling of a successful charge
    if (event.event === "charge.success") {
        const { reference, amount, status } = event.data;
        // Find the payment record by reference (assuming we stored it)
        const { data: payment, error } = await supabase
            .from("payments")
            .select("id, booking_id")
            .eq("reference", reference)
            .single();
        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 400 });
        }
        // Update payment status
        await supabase.from("payments").update({ status: "completed" }).eq("id", payment.id);
        // Update booking status
        await supabase.from("bookings").update({ payment_status: "paid", booking_status: "confirmed" }).eq("id", payment.booking_id);
    }

    return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
};
