<?php
namespace Neon2;

readonly class StripeSecrets {
    public function __construct(
        public string $publishableKey,
        public string $secretKey,
        public string $webhookSigningSecret,
    ) {}
}
