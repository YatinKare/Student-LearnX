// export const prerender = true;

export const PRICING_PLANS = [
    {
        id: "free",
        name: "Free",
        description: "A free plan to get you started!",
        price: "$0",
        priceIntervalName: "per month",
        stripe_price_id: null,
        features: ["5 Interactive Presentations", "Fast Performance"],
    },
    {
        id: "pro",
        name: "Pro",
        description:
            "Get unlimited Presntations and faster access to new features",
        price: "$3",
        priceIntervalName: "per month",
        stripe_price_id: "price_1NkdZCHMjzZ8mGZnRSjUm4yA",
        stripe_product_id: "prod_OXj1CcemGMWOlU",
        features: [
            "Everything in Free",
            "Unlimited Presntations",
            "Fast Customer Support",
        ],
    },
]
