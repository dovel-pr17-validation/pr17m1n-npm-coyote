<?php
namespace Neon2;

readonly class AcceptanceTest {
    public function isTestMode(): bool {
        return env('ACCEPTANCE_TEST', 'production') === 'acceptance';
    }
}
