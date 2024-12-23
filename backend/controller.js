const dotenv = require('dotenv');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('./model'); 

dotenv.config(); 


const CreatePaymentIntent = async (req, res) => {
    const { items, totalAmount, email } = req.body; 
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.title,
                    },
                    unit_amount: item.price * 100, 
                },
                quantity: item.qnty, 
            })),
            mode: 'payment',
            customer_email: email,
            success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/cancel`,
        });

        
        res.json({ id: session.id });
    } catch (err) {
        console.error('Error creating checkout session:', err);
        res.status(500).send('Internal Server Error');
    }
};



const confirmPayment = async (req, res) => {
    const { session_id } = req.body; 
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items'] 
        });

        if (session.payment_status === 'paid') {
            const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

            
            const paymentData = {
                sessionId: session.id,
                orderId: orderId,  
                customerEmail: session.customer_email,
                paymentStatus: session.payment_status,
                amount: session.amount_total, 
                products: session.line_items.data.map(item => ({
                    name: item.description, 
                    quantity: item.quantity, 
                    price: item.amount_total,  
                })),
            };
        //  res.status(200).json(paymentData);
           
            const payment = new Payment(paymentData);
            await payment.save();

            
            res.status(200).json({ message: 'Payment confirmed and data saved', orderId });
        } else {
            res.status(400).json({ message: 'Payment not completed' });
        }
        
    } catch (err) {
        console.error('Error confirming payment:', err);
        res.status(500).json({ message: 'Error processing payment' });
    }
};

module.exports = {
    CreatePaymentIntent,
    confirmPayment,
};
