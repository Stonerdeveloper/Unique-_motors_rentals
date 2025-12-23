import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { car_id, driver_id, customer_name, phone, email, pickup_location, pickup_date, return_date } = body;

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error("Server Error: Missing Supabase Keys");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        // Fetch Car details
        const { data: car, error: carErr } = await supabase
            .from("cars")
            .select("price_per_day")
            .eq("id", car_id)
            .single();

        if (carErr || !car) {
            console.error("Car Fetch Error:", carErr);
            return NextResponse.json({ error: "Car not found or unavailable" }, { status: 400 });
        }

        // Calculate Price
        const startDate = new Date(pickup_date);
        const endDate = new Date(return_date);
        const dayDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
        const days = Math.max(1, Math.ceil(dayDiff));
        const total_price = Number(car.price_per_day) * days;

        // Insert Booking
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

        if (bookingErr) {
            console.error("Booking Insert Error:", bookingErr);
            return NextResponse.json({ error: "Failed to create booking record" }, { status: 500 });
        }

        // Generate Payment URL
        const checkoutUrl = `https://pay.uniquemotors.ng/checkout?amount=${total_price}&ref=${booking.id}`;

        return NextResponse.json({
            booking_id: booking.id,
            checkout_url: checkoutUrl,
            message: "Booking created successfully"
        }, { status: 200 });

    } catch (error) {
        console.error("Booking API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error during booking" },
            { status: 500 }
        );
    }
}
