<?php
namespace Neon2\JobBoard;

class PaymentIntent {
    public function __construct(
        public string $paymentId,
        public int    $paymentPriceBase,
        public int    $paymentPriceVat,
        public string $paymentPricingPlan,
    ) {}
}
