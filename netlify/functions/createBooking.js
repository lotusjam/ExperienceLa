<<<<<<< HEAD
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch'; // Needed for Netlify functions

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);

    if (!body.experience_id || !body.experience_title || !body.date || !body.name || !body.phone) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        experience_id: body.experience_id,
        experience_title: body.experience_title,
        date: body.date,
        people: body.people || 1,
        name: body.name,
        phone: body.phone,
        notes: body.notes || '',
        payment_method: body.payment_method || 'cash',
        total_amount: body.total_amount,
        status: 'confirmed'
      }])
      .select();

    if (error) throw error;

    // Send Telegram notification
    const telegramMessage = `
📅 New Booking Received
🏷 Experience: ${body.experience_title}
📆 Date: ${body.date}
👥 People: ${body.people}
👤 Name: ${body.name}
📞 Phone: ${body.phone}
💰 Total: $${body.total_amount}
    `;

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown'
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, booking: data[0] })
    };
  } catch (err) {
    console.error('Booking error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
}
=======
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch'; // Needed for Netlify functions

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);

    if (!body.experience_id || !body.experience_title || !body.date || !body.name || !body.phone) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        experience_id: body.experience_id,
        experience_title: body.experience_title,
        date: body.date,
        people: body.people || 1,
        name: body.name,
        phone: body.phone,
        notes: body.notes || '',
        payment_method: body.payment_method || 'cash',
        total_amount: body.total_amount,
        status: 'confirmed'
      }])
      .select();

    if (error) throw error;

    // Send Telegram notification
    const telegramMessage = `
📅 New Booking Received
🏷 Experience: ${body.experience_title}
📆 Date: ${body.date}
👥 People: ${body.people}
👤 Name: ${body.name}
📞 Phone: ${body.phone}
💰 Total: $${body.total_amount}
    `;

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown'
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, booking: data[0] })
    };
  } catch (err) {
    console.error('Booking error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
}
>>>>>>> d8e567d57fe98c79d66e42ce174e840eb64f3063
