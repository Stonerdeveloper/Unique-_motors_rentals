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

        // --- Security & Validation ---

        // 1. Sanitize Strings
        const safeName = customer_name?.replace(/[<>]/g, "").trim().slice(0, 100);
        const safeLocation = pickup_location?.replace(/[<>]/g, "").trim().slice(0, 100);
        const safeEmail = email?.trim().toLowerCase();

        // 2. Validate Required Fields
        if (!car_id || !safeName || !phone || !safeEmail || !pickup_date || !return_date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 3. Validate UUID (Basic Regex)
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(car_id)) {
            return NextResponse.json({ error: "Invalid Car ID format" }, { status: 400 });
        }

        // 4. Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(safeEmail)) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }

        // 5. Validate Dates
        const start = new Date(pickup_date);
        const end = new Date(return_date);
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
        }
        if (start < now) {
            return NextResponse.json({ error: "Pickup date cannot be in the past" }, { status: 400 });
        }
        if (end <= start) {
            return NextResponse.json({ error: "Return date must be after pickup date" }, { status: 400 });
        }
        // -----------------------------


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
            customer_name: safeName,
            phone,
            email: safeEmail,
            pickup_location: safeLocation,
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
