<?php
namespace Neon2;

readonly class StripePublicKey {
    public function __construct(
        public ?string $publishableKey,
    ) {}
}
