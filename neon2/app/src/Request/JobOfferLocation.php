<?php
namespace Neon2\Request;

readonly class JobOfferLocation {
    public function __construct(
        public float   $latitude,
        public float   $longitude,
        public ?string $city,
        public ?string $streetName,
        public ?string $streetNumber,
        public ?string $countryCode,
        public ?string $postalCode,
    ) {}
}
