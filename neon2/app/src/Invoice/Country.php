<?php
namespace Neon2\Invoice;

readonly class Country {
    public function __construct(
        public string $countryCode,
        public string $countryName,
    ) {}
}
