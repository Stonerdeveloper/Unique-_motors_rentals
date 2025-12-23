import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.5";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export default async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    const { car_id, driver_id, customer_name, phone, email, pickup_location, pickup_date, return_date } = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // fetch car price
    const { data: car, error: carErr } = await supabase.from("cars").select("price_per_day").eq("id", car_id).single();
    if (carErr) return new Response(JSON.stringify({ error: carErr.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

    const days = (new Date(return_date).getTime() - new Date(pickup_date).getTime()) / (1000 * 60 * 60 * 24);
    const total_price = Number(car.price_per_day) * Math.ceil(days);

    const { data: booking, error: bookingErr } = await supabase.from("bookings").insert({
        car_id,
        driver_id: driver_id || null,
        customer_name,
        phone,
        email,
        pickup_location,
        pickup_date,
        return_date,
        total_price,
        payment_status: "pending",
        booking_status: "pending",
    }).select().single();

    if (bookingErr) return new Response(JSON.stringify({ error: bookingErr.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

    // Here you would normally create a Paystack/Flutterwave checkout URL.
    // For demo purposes we return a placeholder URL.
    const checkoutUrl = `https://pay.example.com/checkout?amount=${total_price}&ref=${booking.id}`;

    return new Response(JSON.stringify({ booking_id: booking.id, checkout_url: checkoutUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
};
