<?php
namespace Neon2\Invoice;

use Neon2\Invoice;

interface CountryGate {
    /**
     * @return Invoice\Country[]
     */
    public function invoiceCountries(): array;
}
