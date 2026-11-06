<?php
namespace Neon2\JobBoard;

readonly class PlanBundle {
    public static function remaining(int $remainingJobOffers, string $planBundleName): self {
        return new self(true, $remainingJobOffers, $planBundleName);
    }

    public static function notOwned(): self {
        return new self(false);
    }

    private function __construct(
        public bool    $hasBundle,
        public ?int    $remainingJobOffers = null,
        public ?string $planBundleName = null,
    ) {}
}
